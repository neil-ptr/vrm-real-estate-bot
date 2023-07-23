import { useRef, useState } from 'react';

interface MessagesProps {
  messageHistory: { source: string; text: string }[];
  onSend: (message: string) => void;
}

const Messages = ({ messageHistory, onSend }: MessagesProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    onSend(message);
    if (inputRef.current) {
      inputRef.current.value = '';
      setMessage('');
    }
  };

  return (
    <div className="h-screen flex flex-col p-8">
      <div className="grow overflow-y-auto pb-4">
        {messageHistory.map((message, index) => {
          let className = 'bg-pink-500 text-white w-fit-content';
          if (message.source === 'bot') {
            className = 'bg-zinc-500 text-white w-fit-content';
          }
          return (
            <div
              key={index}
              className={`w-full flex pb-2 ${
                message.source === 'user' ? 'justify-start' : 'justify-end'
              }`}
            >
              <div className={`p-2 rounded-md ${className}`}>
                {message.text}
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
        <button
          className="rounded-md bg-purple-500 px-2"
          type="submit"
          onClick={() => {
            handleSubmit();
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Messages;
