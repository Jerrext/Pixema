export const checkEmptyValue = (data: any, value: string) => {
  return data ? value : "Empty";
};

export const getUkFormatDate = (date: string) => {
  const now = new Date(date);

  const dateOptions: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  const newDate = new Intl.DateTimeFormat("en-UK", dateOptions);

  return newDate.format(now);
};

export const getWordWithCapitalLetter = (word: string) => {
  return word[0].toUpperCase() + word.slice(1);
};

export const getMoneyFormat = (number: number) => {
  return "$" + number.toLocaleString("ru-RU");
};
