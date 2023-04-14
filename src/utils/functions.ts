export const getWordWithCapitalLetter = (word: string) => {
  return word[0].toUpperCase() + word.slice(1);
};

export const getMoneyFormat = (number: number) => {
  return "$" + number.toLocaleString("ru-RU");
};
