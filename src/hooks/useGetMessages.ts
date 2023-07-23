"use client";

import { useState } from "react";

export function useGetMessages() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const getData = async ({ chatId }: { chatId: string }) => {
    setIsLoading(true);
    setData(null);
    setError(null);
    try {
      const response = await fetch(`/api/messages?chatId=${chatId}`, {
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
