export const capitalize = (str = "") =>
  typeof str === "string"
    ? str.charAt(0).toUpperCase() + str.slice(1)
    : "";

export const capitalizeAll = (str = "") =>
  typeof str === "string"
    ? str.replace(/\b\w/g, (char) => char.toUpperCase())
    : "";

export const appendLeadingZeroes = (number) =>
  String(number).padStart(2, "0");

export const getDateFormatted = (date) =>
  [
    date.getFullYear(),
    appendLeadingZeroes(date.getMonth() + 1),
    appendLeadingZeroes(date.getDate()),
  ].join("-");