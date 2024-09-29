function convertServerTimeToLocal(serverTimeStr, localTimeStr) {
  // Parse the time strings
  function parseTime(timeStr) {
    const [time, period] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;
    return hours * 60 + minutes;
  }

  // Calculate time difference in minutes
  const serverMinutes = parseTime(serverTimeStr);
  const localMinutes = parseTime(localTimeStr);
  const diffMinutes = localMinutes - serverMinutes;

  // Function to convert server time to local time
  return function (newServerTimeStr) {
    const newServerMinutes = parseTime(newServerTimeStr);
    let newLocalMinutes = newServerMinutes + diffMinutes;

    // Adjust for day wrap
    newLocalMinutes = (newLocalMinutes + 1440) % 1440;

    const hours = Math.floor(newLocalMinutes / 60);
    const minutes = newLocalMinutes % 60;
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;

    return `${formattedHours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")} ${period}`;
  };
}

// Create the converter function
export const convertToLocalTime = convertServerTimeToLocal("1:38 PM", "7:09 PM");
