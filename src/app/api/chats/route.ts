import { NextRequest } from "next/server";
import qs from "qs";
import { Chat } from "~/models/chat";
import { connectToDatabase } from "~/utils/mongoDb";
import { getServerResponse } from "~/utils/serverResponse";

connectToDatabase();

export async function GET(req: NextRequest) {
  try {
    const rawParams = req.url.split("?")[1];
    const { chatId } = qs.parse(rawParams);

    if (!chatId) {
      throw new Error("Missing params");
    }

    const chat = await Chat.findById(chatId);

    return getServerResponse(chat);
  } catch (error) {
    return getServerResponse(
      { error: (error as any)?.message },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { aiRole, metadataId } = body;

    if (!aiRole || !metadataId) {
      throw new Error("Missing params");
    }

    const newChat = new Chat(body);
    const saved = await newChat.save();

    return getServerResponse(saved);
  } catch (error) {
    return getServerResponse(
      { error: (error as any)?.message },
      {
        status: 500,
      }
    );
  }
}
