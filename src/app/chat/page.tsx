'use client';

import { useCallback, useContext, useEffect, useState } from 'react';
import Messages from '~/components/Messages';
import VrmViewer from '~/components/VrmViewer';
import { emotionsConfig } from '~/config';
import { ViewerContext } from '~/context/vrmContext';
import { parseMessage } from '~/utils/parseMessage';
import { useSearchParams } from 'next/navigation';

interface MessageHistoryItem {
  message: string;
  source: 'user' | 'bot';
}

export default function Page() {
  const [messageHistory, setMessageHistory] = useState<MessageHistoryItem[]>(
    []
  );
  const searchParams = useSearchParams();

  const model = searchParams.get('model') || '';

  const { viewer } = useContext(ViewerContext);

  // idk why this is necessary but it on first call to this function returns empty array
  window.speechSynthesis.getVoices();

  const getVoice = useCallback(() => {
    let voice = 'Samantha';
    switch (model) {
      case '1':
        voice = 'Google UK English Female';
        break;
      case '2':
        voice = 'Samantha';
        break;
      case '3':
        voice = 'Google UK English Male';
        break;
      default:
        voice = 'Samantha';
        break;
    }
    return (
      window.speechSynthesis.getVoices().find((v) => v.voiceURI === voice) ||
      window.speechSynthesis.getVoices()[0]
    );
  }, [model]);

  // react to new chat responses from the server
  useEffect(() => {
    if (messageHistory.length && messageHistory[messageHistory.length - 1]) {
      const newestMessage = messageHistory[messageHistory.length - 1];
      const [emotions, messages] = parseMessage(newestMessage.message);

      if (!emotions.length || !messages.length) return;

      viewer.speakStart();

      for (let i = 0; i < emotions.length; i++) {
        const speech = new SpeechSynthesisUtterance(messages[i]);

        speech.voice = getVoice();

        const emotion = emotionsConfig[emotions[i]];
        if (!emotion) continue;

        speech.onstart = () => {
          viewer.setEmotion(emotions[i]);
        };

        speech.onend = () => {
          if (i >= emotions.length - 1) {
            viewer.speakStop();
          }
        };

        speech.pitch = emotion.pitch;
        speech.rate = emotion.rate;

        window.speechSynthesis.speak(speech);
      }
    }
  }, [getVoice, messageHistory, viewer]);

  const handleSend = (message: string) => {
    setMessageHistory([
      ...messageHistory,
      {
        source: 'bot',
        message:
          '[happy] i very happy [sad] i very sad [angry] i very angry [neutral] i very neutral [relaxed] I very relaxed', // TODO: replace with message
      },
    ]);
  };

  return (
    <main className="grid grid-cols-[13fr_7fr] h-screen w-screen">
      <div className="relative">
        <VrmViewer model={model} />
      </div>
      <Messages
        messageHistory={[
          { source: 'user', text: 'Hello there!' },
          { source: 'bot', text: 'Hi! How can I assist you?' },
          { source: 'user', text: 'I need help with a programming problem.' },
          { source: 'bot', text: "Sure, I'll do my best to help you." },
          { source: 'user', text: "Thanks, here's the problem..." },
          { source: 'bot', text: 'Got it. Let me take a look.' },
          { source: 'bot', text: 'Alright, I have a solution for you.' },
          { source: 'user', text: 'That worked perfectly! Thanks a lot!' },
          {
            source: 'bot',
            text: "You're welcome! If you have any more questions, feel free to ask.",
          },
          { source: 'user', text: 'Hello there!' },
          { source: 'bot', text: 'Hi! How can I assist you?' },
          { source: 'user', text: 'I need help with a programming problem.' },
          { source: 'bot', text: "Sure, I'll do my best to help you." },
          { source: 'user', text: "Thanks, here's the problem..." },
          { source: 'bot', text: 'Got it. Let me take a look.' },
          { source: 'bot', text: 'Alright, I have a solution for you.' },
          { source: 'user', text: 'That worked perfectly! Thanks a lot!' },
          {
            source: 'bot',
            text: "You're welcome! If you have any more questions, feel free to ask.",
          },
          { source: 'user', text: 'Hello there!' },
          { source: 'bot', text: 'Hi! How can I assist you?' },
          { source: 'user', text: 'I need help with a programming problem.' },
          { source: 'bot', text: "Sure, I'll do my best to help you." },
          { source: 'user', text: "Thanks, here's the problem..." },
          { source: 'bot', text: 'Got it. Let me take a look.' },
          { source: 'bot', text: 'Alright, I have a solution for you.' },
          { source: 'user', text: 'That worked perfectly! Thanks a lot!' },
          {
            source: 'bot',
            text: "You're welcome! If you have any more questions, feel free to ask.",
          },
          { source: 'user', text: 'Hello there!' },
          { source: 'bot', text: 'Hi! How can I assist you?' },
          { source: 'user', text: 'I need help with a programming problem.' },
          { source: 'bot', text: "Sure, I'll do my best to help you." },
          { source: 'user', text: "Thanks, here's the problem..." },
          { source: 'bot', text: 'Got it. Let me take a look.' },
          { source: 'bot', text: 'Alright, I have a solution for you.' },
          { source: 'user', text: 'That worked perfectly! Thanks a lot!' },
          {
            source: 'bot',
            text: "You're welcome! If you have any more questions, feel free to ask.",
          },
        ]}
        onSend={handleSend}
      />
    </main>
  );
}
