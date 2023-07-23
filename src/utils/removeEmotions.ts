export const removeEmotions = (inputString: string): string => {
  // Use regular expression to match any occurrence of text within square brackets
  const pattern = /\[[^\]]*\]/g;
  return inputString.replace(pattern, '');
};
