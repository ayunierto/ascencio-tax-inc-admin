export const capitalizeFirstWord = (word: string) => {
  if (word.length === 0) {
    return '';
  }

  const firstLetter = word.charAt(0).toUpperCase();

  const restOfWord = word.slice(1);

  return firstLetter + restOfWord;
};
