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

// new Date("YYYY-MM-DD") parses as UTC midnight, which can land on the
// wrong local calendar day. Use this instead for any date string produced
// by getDateFormatted, so it's parsed as local midnight.
export const parseLocalDate = (dateString) => {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
};