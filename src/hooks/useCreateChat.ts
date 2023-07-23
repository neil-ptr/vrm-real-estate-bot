"use client";

import { useState } from "react";
import { IChat } from "~/models/chat";

export function useCreateChat() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<IChat | null>(null);
  const [error, setError] = useState(null);

  const mutate = async ({ metadataId, aiRole }: Partial<IChat>) => {
    setIsLoading(true);
    setData(null);
    setError(null);
    try {
      const response = await fetch("/api/chats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          metadataId,
          aiRole,
        }),
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
    mutate,
    data,
    error,
    isLoading,
  };
}
