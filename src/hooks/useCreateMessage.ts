"use client";

import { useState } from "react";
import { IMessage } from "~/models/message";

export function useCreateMessage() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<IMessage | null>(null);
  const [error, setError] = useState(null);

  const mutate = async ({
    chatId,
    message,
    callback,
  }: {
    chatId: string;
    message: string;
    callback: (val: any) => void;
  }) => {
    setIsLoading(true);
    setData(null);
    setError(null);
    try {
      const response = await fetch("/api/chats/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatId,
          message,
        }),
      });

      const newMessage = await response.json();
      setIsLoading(false);
      setData(newMessage);
      callback(newMessage);
    } catch (e: any) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    mutate,
    data,
    error,
    isLoading,
  };
}
