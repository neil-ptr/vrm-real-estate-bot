import { Emotion, EmotionMessages } from '~/types';

const isEmotion = (emotion: string): emotion is Emotion => {
  return ['neutral', 'happy', 'sad', 'angry', 'relaxed', 'end'].includes(
    emotion as Emotion
  );
};

export const parseMessage = (message: string): EmotionMessages => {
  const n = message.length;
  const emotions: Emotion[] = [];
  const sentences = [];
  let i = 0;
  while (i < n) {
    if (message[i] === '[') {
      i++;
      const emotion = [];

      while (i < n && message[i] !== ']') {
        emotion.push(message[i]);
        i++;
      }

      const curEmotion = emotion.join('') as Emotion;

      if (isEmotion(curEmotion)) {
        emotions.push(curEmotion as Emotion);
      }
      i++;
    } else {
      const sentence = [];
      while (i < n && message[i] !== '[') {
        sentence.push(message[i]);
        i++;
      }
      sentences.push(sentence.join(''));
    }
  }

  return [emotions, sentences];
};
