"use client";

import { useState } from "react";
import { IMessage } from "~/models/message";

export function useEvaluateChat() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<{
    rating: number;
    reasons: string[];
    suggestions: string[];
  } | null>(null);
  const [error, setError] = useState(null);

  const mutate = async ({ chatId }: { chatId: string }) => {
    setIsLoading(true);
    setData(null);
    setError(null);
    try {
      const response = await fetch("/api/chats/evaluate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatId,
        }),
      });

      const evaluation = await response.json();
      setIsLoading(false);
      setData(evaluation);
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
