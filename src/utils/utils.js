export const transDateForm = (date, option = '-') => {
  if (!date) return undefined;

  if (Array.isArray(option)) {
    const trans =
      date.substring(0, 4) +
      `${option[0]}` +
      date.substring(4, 6) +
      `${option[1]}` +
      date.substring(6) +
      `${option[2]}`;

    return trans;
  } else {
    const trans = date.substring(0, 4) + `${option}` + date.substring(4, 6) + `${option}` + date.substring(6);

    return trans;
  }
};

export const getExpirationDate = () => {
  let today = new Date();
  today.setDate(today.getDate() - 10);

  const year = today.getFullYear().toString();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');

  return year + month + day;
};
