export const trimText = (text) => {
  if (text === null || text === undefined) {
    return "";
  }

  return text.toString().trim().toLowerCase();
};
