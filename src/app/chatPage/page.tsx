/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { set } from "mongoose";
import { useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";
import { EvaluateModal } from "~/components/EvaluateModal";
import { useCreateMessage } from "~/hooks/useCreateMessage";
import { useEvaluateChat } from "~/hooks/useEvaluateChat";
import { useGetChat } from "~/hooks/useGetChat";
import { useGetMessages } from "~/hooks/useGetMessages";
import { IMessage } from "~/models/message";

const ChatPage = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [message, setMessage] = useState("");
  const searchParams = useSearchParams();
  const { getData: getChat, data: chat } = useGetChat();
  const {
    getData: getMessages,
    data: messages,
    setData: setMessages,
  } = useGetMessages();
  const { mutate: sendMessage, isLoading: isLoadingCreateMessage } =
    useCreateMessage();
  const {
    mutate: evaluateConversation,
    data: evaluateResponse,
    isLoading: isLoadingEvaluateChat,
  } = useEvaluateChat();

  const chatId = searchParams.get('chatId') ?? '';

  useEffect(() => {
    getChat({ chatId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatId]);

  useEffect(() => {
    if (chat) {
      getMessages({ chatId: chat._id });
    }
  }, [chat]);

  useEffect(() => {
    if (evaluateResponse) {
      setIsOpened(true);
    }
  }, [evaluateResponse]);

  return (
    <main className="container mx-auto ">
      <div className="flex flex-col justify-center gap-8">
        <div>
          <h1>Chat</h1>
          {JSON.stringify(chat)}
        </div>
        <div>
          <h1>Messages</h1>
          {JSON.stringify(messages)}
        </div>
        <div>
          {chatId ? (
            <>
              <h1>New Message</h1>
              <input
                type="text"
                className="text-black"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                disabled={isLoadingCreateMessage}
                onClick={async () => {
                  const newMessage = {
                    chatId,
                    from: 'user',
                    text: message,
                    createdAt: new Date().getTime(),
                  } as Partial<IMessage>;
                  await setMessages([...(messages ?? []), newMessage]);
                  sendMessage({
                    chatId,
                    message,
                    callback: (m) => {
                      setMessages([...(messages ?? []), newMessage, m]);
                      setMessage('');
                    },
                  });
                }}
              >
                {isLoadingCreateMessage ? 'loading...' : 'Send'}
              </button>
            </>
          ) : null}
        </div>
        <div>
          {chatId ? (
            <>
              <h1>Evaluate Conversation</h1>
              <button
                disabled={isLoadingEvaluateChat}
                onClick={() => {
                  evaluateConversation({ chatId });
                }}
              >
                Evaluate
              </button>
              {isLoadingEvaluateChat && <p>Loading...</p>}
              {evaluateResponse && JSON.stringify(evaluateResponse)}
              {evaluateResponse && (
                <EvaluateModal
                  evaluation={evaluateResponse}
                  isOpen={isOpened}
                  setIsOpen={setIsOpened}
                />
              )}
            </>
          ) : null}
        </div>
      </div>
    </main>
  );
};

export default ChatPage;
