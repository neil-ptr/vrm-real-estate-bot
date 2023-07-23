import { parseMessage } from './parseMessage';

describe('parseMessage', () => {
  it('it should parse message', () => {
    const message = '[happy]Hello, [sad]world![neutral]';
    const [emotions, messages] = parseMessage(message);

    expect(emotions).toEqual(['happy', 'sad', 'neutral']);
    expect(messages).toEqual(['Hello, ', 'world!']);
  });

  it('should handle emotions with special characters', () => {
    const message = '[happy]Emotion with special characters: @#%^&*![neutral]';
    const [emotions, messages] = parseMessage(message);

    expect(emotions).toEqual(['happy', 'neutral']);
    expect(messages).toEqual(['Emotion with special characters: @#%^&*!']);
  });

  it('should handle a message with no content', () => {
    const message = '';
    const [emotions, messages] = parseMessage(message);

    expect(emotions).toEqual([]);
    expect(messages).toEqual([]);
  });
});
