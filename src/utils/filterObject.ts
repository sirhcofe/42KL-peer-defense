export const filterObject = (obj, ...args) => ({
  ...args.reduce((res, key) => ({ ...res, [key]: obj[key] }), {}),
});

export function convertDateToDays(dateString) {
  let dateParts = dateString.split("/");
  let day = parseInt(dateParts[0], 10);
  let month = parseInt(dateParts[1], 10) - 1;
  let year = parseInt(dateParts[2], 10);
  let inputDate = new Date(year, month, day);
  let today = new Date();
  let timeDifference = today.getTime() - inputDate.getTime();
  let daysSinceToday = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  return daysSinceToday;
}
