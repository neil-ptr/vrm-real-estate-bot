import { removeEmotions } from './removeEmotions';

describe('removeOccurrencesInBrackets', () => {
  it('should remove all occurrences of text within square brackets', () => {
    const input = '[happy] hi how are there. [sad] some other stuff.';
    const expectedOutput = ' hi how are there.  some other stuff.';
    const result = removeEmotions(input);
    expect(result).toBe(expectedOutput);
  });

  it('should handle empty input string', () => {
    const input = '';
    const expectedOutput = '';
    const result = removeEmotions(input);
    expect(result).toBe(expectedOutput);
  });

  it('should handle input with no brackets', () => {
    const input = 'Hello, this is a test.';
    const expectedOutput = 'Hello, this is a test.';
    const result = removeEmotions(input);
    expect(result).toBe(expectedOutput);
  });
});
