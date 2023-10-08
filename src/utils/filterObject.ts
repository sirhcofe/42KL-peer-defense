export const filterObject = (obj, ...args) => ({
  ...args.reduce((res, key) => ({ ...res, [key]: obj[key] }), {}),
});

export const filterArrayObject = (arrObj, ...args) => {
  return arrObj.map((data) => filterObject(data, ...args));
};

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

export function convertDownload(jsonObject) {
  const jsonString = JSON.stringify(jsonObject);

  // Create a Blob from the JSON string
  const blob = new Blob([jsonString], { type: "application/json" });
  const objURL = URL.createObjectURL(blob);

  // Create a download link
  const a = document.createElement("a");
  a.href = objURL;
  a.download = "data.json";
  a.style.display = "none";

  // Append the link to the body and trigger a click event
  document.body.appendChild(a);
  a.click();

  // Clean up by removing the link
  URL.revokeObjectURL(objURL);
  document.body.removeChild(a);
}
