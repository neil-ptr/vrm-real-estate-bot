import { useRef, useState } from "react";
import { IMessage } from "~/models/message";
import { removeEmotions } from "~/utils/removeEmotions";

interface MessagesProps {
  messageHistory: Partial<IMessage>[];
  onSend: (message: string) => void;
  isLoadingCreateMessage: boolean;
}

const Messages = ({ messageHistory, onSend, isLoadingCreateMessage }: MessagesProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    onSend(message);
    if (inputRef.current) {
      inputRef.current.value = "";
      setMessage("");
    }
  };

  return (
    <div className="h-screen flex flex-col p-8">
      <div className="grow overflow-y-auto pb-4">
        {messageHistory.map((message, index) => {
          let m = message as any;
          if (m.response) {
            message.text = m.response;
            message.from = "ai";
          }

          let className = "bg-violet-700 text-white w-fit-content";
          if (message.from === "ai") {
            className = "bg-zinc-500 text-white w-fit-content";
          }

          return (
            <div
              key={index}
              className={`w-full flex pb-2 ${message.from === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`p-2 rounded-md w-3/4 ${className}`}>
                {message.from === "ai" ? removeEmotions(message.text ?? "") : message.text}
              </div>
            </div>
          );
        })}
      </div>
      <form
        className="flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input
          ref={inputRef}
          type="text"
          placeholder="ask something..."
          className="bg-zinc-600 rounded-md outline-none p-2 grow"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <button className="rounded-md bg-violet-700 px-2" type="submit" disabled={isLoadingCreateMessage}>
          {isLoadingCreateMessage ? "loading..." : "Send"}
        </button>
      </form>
    </div>
  );
};

export default Messages;
