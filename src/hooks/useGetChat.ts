"use client";

import { useState } from "react";
import { IChat } from "~/models/chat";

export function useGetChat() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<IChat | null>(null);
  const [error, setError] = useState(null);

  const getData = async ({ chatId }: { chatId: string }) => {
    setIsLoading(true);
    setData(null);
    setError(null);
    try {
      const response = await fetch(`/api/chats?chatId=${chatId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const chat = await response.json();
      setIsLoading(false);
      setData(chat);
    } catch (e: any) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    getData,
    data,
    error,
    isLoading,
  };
}
