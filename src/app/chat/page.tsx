"use client";

import { useCallback, useContext, useEffect, useRef, useState } from "react";
import Messages from "~/components/Messages";
import VrmViewer from "~/components/VrmViewer";
import { emotionsConfig } from "~/config";
import { ViewerContext } from "~/context/vrmContext";
import { parseMessage } from "~/utils/parseMessage";
import { useSearchParams } from "next/navigation";
import { useGetMessages } from "~/hooks/useGetMessages";
import { useGetChat } from "~/hooks/useGetChat";
import { useEvaluateChat } from "~/hooks/useEvaluateChat";
import { useCreateMessage } from "~/hooks/useCreateMessage";
import { IMessage } from "~/models/message";
import Link from "next/link";
import { options } from "~/constant/metadata";
import characters from "~/constant/characters";
import { EvaluateModal } from "~/components/EvaluateModal";

interface MessageHistoryItem {
  message: string;
  source: "user" | "bot";
}

export default function Page() {
  const searchParams = useSearchParams();
  const [isOpened, setIsOpened] = useState(false);

  // const model = searchParams.get('model') || '';

  const [message, setMessage] = useState("");
  const messageCount = useRef(0);

  const { getData: getChat, data: chat } = useGetChat();
  const { getData: getMessages, data: messages, setData: setMessages } = useGetMessages();
  const { mutate: sendMessage, isLoading: isLoadingCreateMessage } = useCreateMessage();
  const { mutate: evaluateConversation, data: evaluateResponse, isLoading: isLoadingEvaluateChat } = useEvaluateChat();

  const model = characters[chat?.aiRole || "tenant"].background.modelId;

  const chatId = searchParams.get("chatId") ?? "";

  useEffect(() => {
    getChat({ chatId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatId]);

  useEffect(() => {
    if (chat) {
      // fetchedMessages.current = true;
      getMessages({ chatId: chat._id });
    }
  }, [chat]);

  useEffect(() => {
    if (evaluateResponse) {
      setIsOpened(true);
    }
  }, [evaluateResponse]);

  const { viewer } = useContext(ViewerContext);

  // idk why this is necessary but it on first call to this function returns empty array
  // window?.speechSynthesis.getVoices();

  const getVoice = useCallback(() => {
    let voice = "Samantha";
    switch (model) {
      case "1":
        voice = "Google UK English Female";
        break;
      case "2":
        voice = "Samantha";
        break;
      case "3":
        voice = "Google UK English Male";
        break;
      default:
        voice = "Samantha";
        break;
    }
    return (
      window.speechSynthesis.getVoices().find((v) => v.voiceURI === voice) || window.speechSynthesis.getVoices()[0]
    );
  }, [model]);

  // react to new chat responses from the server
  useEffect(() => {
    // if (!messages || messageCount.current !== messages.length + 1) return;
    if (typeof window === "undefined") return;

    if (messages && messages.length && window?.speechSynthesis) {
      let newestMessage = messages[messages.length - 1] as any;

      if (newestMessage.response) {
        newestMessage.text = newestMessage.response;
      }

      const [emotions, messageSentences] = parseMessage(newestMessage.text ?? "");

      if (!emotions.length || !messageSentences.length) return;

      for (let i = 0; i < emotions.length; i++) {
        const speech = new SpeechSynthesisUtterance(messageSentences[i]);
        speech.voice = getVoice();

        const emotion = emotionsConfig[emotions[i]];
        if (!emotion) continue;

        speech.onstart = () => {
          viewer.speakStart();
          viewer.setEmotion(emotions[i]);
        };

        speech.onend = () => {
          if (i >= emotions.length - 1) {
            viewer.speakStop();
          }
        };

        speech.pitch = emotion.pitch;
        speech.rate = emotion.rate;

        window.speechSynthesis.speak(speech);
      }
    }
  }, [getVoice, messages, viewer]);

  const handleSend = async (message: string) => {
    const newMessage = {
      chatId,
      from: "user",
      text: message,
      createdAt: new Date().getTime(),
    } as Partial<IMessage>;
    await setMessages([...(messages ?? []), newMessage]);
    sendMessage({
      chatId,
      message,
      callback: (m) => {
        setMessages([...(messages ?? []), newMessage, m]);
        setMessage("");
      },
    });
  };

  const metadata = options.find((metadata) => metadata.id === chat?.metadataId);

  return (
    <>
      <main className="grid grid-cols-[13fr_7fr] h-screen w-screen relative bg-gradient-to-b from-[#583386] to-[#15162c]">
        <div className="absolute top-8 left-8 z-20">
          <Link className="text-lg cursor-pointer p-4 bg-white text-black rounded-md" href="/">
            Back
          </Link>
        </div>
        <div className="relative">
          <VrmViewer
            model={model}
            metadata={options.find((metadata) => metadata.id === chat?.metadataId) as any}
            evaluate={() => {
              evaluateConversation({ chatId });
            }}
            isLoadingEvaluateChat={isLoadingEvaluateChat}
          />
          {metadata ? (
            <div className="absolute grid gap-2 bottom-8 left-8 max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden p-3 text-black">
              <h2 className="text-xl font-semibold mb-2">Client Information</h2>
              <p>
                <strong>Role:</strong> {metadata.role}
              </p>

              <p>
                <strong>Area:</strong> {metadata.area}
              </p>
              <p>
                <strong>Budget:</strong> {metadata.budget}
              </p>
              <p>
                <strong>Rooms:</strong> {metadata.rooms}
              </p>
              <p>
                <strong>Bathrooms:</strong> {metadata.bathrooms}
              </p>
            </div>
          ) : null}
          <button
            disabled={isLoadingEvaluateChat}
            onClick={() => {
              evaluateConversation({ chatId });
            }}
            className="absolute bottom-8 px-4 right-8 rounded-lg bg-white text-black py-2 mt-2 cursor-pointer z-20"
          >
            {isLoadingEvaluateChat ? "Evaluating..." : "Evaluate"}
          </button>
        </div>

        <Messages
          messageHistory={messages ?? []}
          onSend={(message) => handleSend(message)}
          isLoadingCreateMessage={isLoadingCreateMessage}
        />
      </main>
      {evaluateResponse && <EvaluateModal evaluation={evaluateResponse} isOpen={isOpened} setIsOpen={setIsOpened} />}
    </>
  );
}
