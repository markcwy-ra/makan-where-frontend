const formatToAmPm = (string) => {
  const timeArray = string.split(":");
  let hour = Number(timeArray[0]);
  let minute = timeArray[1];
  let amPm = "AM";
  if (hour > 11 && hour < 24) {
    amPm = "PM";
  }
  if (hour > 12) {
    hour -= 12;
  }
  return `${hour}:${minute} ${amPm}`;
};

const capitalise = (string) => {
  const letters = string.split("");
  letters[0] = letters[0].toUpperCase();
  return letters.join("");
};

export { formatToAmPm, capitalise };
