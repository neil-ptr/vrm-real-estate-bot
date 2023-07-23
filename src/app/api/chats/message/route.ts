import { NextRequest } from "next/server";
import { PromptTemplate } from "langchain";
import { ConversationChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { BufferMemory, ChatMessageHistory } from "langchain/memory";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
  SystemMessagePromptTemplate,
} from "langchain/prompts";
import { AIMessage, HumanMessage } from "langchain/schema";

import { getServerResponse } from "~/utils/serverResponse";
import { connectToDatabase } from "~/utils/mongoDb";
import { Chat } from "~/models/chat";
import { Message } from "~/models/message";

import type { IMessage } from "~/models/message";
import {
  getCharacterBackground,
  getPlaceMetadata,
  getPrompt,
} from "~/utils/prompts";

connectToDatabase();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { chatId, message } = body;

    if (!chatId || !message) {
      throw new Error("Missing params");
    }

    const chat = await Chat.findById(chatId);

    if (!chat) {
      throw new Error("Missing params");
    }

    let pastMessages = [] as Partial<IMessage>[];
    const messages = await Message.find({ chatId }).sort({
      createdAt: "ascending",
    });

    if (messages?.length > 0) {
      pastMessages = messages;
    }

    const userMessage = {
      chatId,
      from: "user",
      text: message,
      createdAt: new Date().getTime(),
    } as IMessage;
    const newUserMessage = new Message(userMessage);
    await newUserMessage.save();

    pastMessages.push(userMessage);

    const chatHistory = pastMessages.map((msg) =>
      msg.from === "user"
        ? new HumanMessage(msg.text ?? "")
        : new AIMessage(msg.text ?? "")
    );

    const memory = new BufferMemory({
      chatHistory: new ChatMessageHistory(chatHistory),
      inputKey: "input",
      memoryKey: "history",
      returnMessages: true,
    });

    const { aiRole, metadataId } = chat;
    const promptTemplate = await PromptTemplate.fromTemplate(
      getPrompt(aiRole)
    ).format({
      background: getCharacterBackground(aiRole),
      ...getPlaceMetadata(aiRole, metadataId),
    });

    const prompt = ChatPromptTemplate.fromPromptMessages([
      SystemMessagePromptTemplate.fromTemplate(promptTemplate),
      new MessagesPlaceholder("history"),
    ]);

    const llm = new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      modelName: "gpt-4",
      verbose: true,
    });

    const chain = new ConversationChain({
      memory,
      llm,
      prompt,
    });

    const output = await chain.call({ input: message });

    const aiMessage = {
      chatId,
      from: "ai",
      text: output.response,
      createdAt: new Date().getTime(),
    } as IMessage;
    const newAiMessage = new Message(aiMessage);
    await newAiMessage.save();
    pastMessages.push(aiMessage);

    return getServerResponse(output, {
      status: 201,
    });
  } catch (error) {
    return getServerResponse(
      { error: (error as any)?.message },
      {
        status: 500,
      }
    );
  }
}
