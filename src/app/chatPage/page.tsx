/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useSearchParams } from "next/navigation";

import { useEffect } from "react";
import { useGetChat } from "~/hooks/useGetChat";
import { useGetMessages } from "~/hooks/useGetMessages";

const ChatPage = () => {
  const searchParams = useSearchParams();
  const { getData: getChat, data: chat } = useGetChat();
  const { getData: getMessages, data: messages } = useGetMessages();

  const chatId = searchParams.get("chatId") ?? "";

  useEffect(() => {
    getChat({ chatId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatId]);

  useEffect(() => {
    if (chat) {
      getMessages({ chatId: chat._id });
    }
  }, [chat]);

  return (
    <main className="container mx-auto ">
      <div className="flex justify-center w-full gap-4">
        {JSON.stringify(chat)}

        {JSON.stringify(messages)}
      </div>
    </main>
  );
};

export default ChatPage;
