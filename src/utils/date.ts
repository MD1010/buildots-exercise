export const formatDate = (underscoreStringDate: string) => {
  const parts = underscoreStringDate.split("_");

  const year = parts[0].slice(0, 4);
  const month = parts[0].slice(4, 6);
  const day = parts[0].slice(6, 8);

  const hour = parts[1].slice(0, 2);
  const minute = parts[1].slice(2, 4);
  const seconds = parts[1].slice(4, 6);

  const formattedDate = `${day}/${month}/${year} ${hour}:${minute}:${seconds}`;

  return formattedDate;
};

export const getLatestDateString = (dates: string[]) => {
  let maxDate = dates[0];
  for (const date of dates) {
    if (new Date(date) > new Date(maxDate)) {
      maxDate = date;
    }
  }
  return maxDate;
};
