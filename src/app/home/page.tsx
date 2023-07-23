"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useCreateChat } from "~/hooks/useCreateChat";

const Home = () => {
  const router = useRouter();
  const { mutate, data, isLoading } = useCreateChat();

  useEffect(() => {
    if (data) {
      router.push(`/chatPage?chatId=${data._id}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <main className="container mx-auto ">
      <div className="flex justify-center w-full gap-4">
        <button
          onClick={() => mutate({ metadataId: "1", aiRole: "buyer" })}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Create Chat"}
        </button>
      </div>
    </main>
  );
};

export default Home;
