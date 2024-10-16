// Function to add hours and minutes to a given time
export function addTime(timeString, hoursToAdd, minutesToAdd) {
  // Parse the time string
  const [time, period] = timeString.split(' ');
  let [hours, minutes] = time.split(':').map(Number);

  // Convert to 24-hour format if necessary
  if (period.toLowerCase() === 'pm' && hours !== 12) {
    hours += 12;
  } else if (period.toLowerCase() === 'am' && hours === 12) {
    hours = 0;
  }

  // Create a Date object (using an arbitrary date)
  const date = new Date(2023, 0, 1, hours, minutes);

  // Add the specified hours and minutes
  date.setHours(date.getHours() + hoursToAdd);
  date.setMinutes(date.getMinutes() + minutesToAdd);

  // Format the result back to 12-hour format
  let resultHours = date.getHours();
  const resultMinutes = date.getMinutes().toString().padStart(2, '0');
  const resultPeriod = resultHours >= 12 ? 'PM' : 'AM';

  if (resultHours > 12) {
    resultHours -= 12;
  } else if (resultHours === 0) {
    resultHours = 12;
  }

  return `${resultHours}:${resultMinutes} ${resultPeriod}`;
}

// Example usage
// const givenTime = '9:41 AM';
// const hoursToAdd = 5;
// const minutesToAdd = 2;
// const result = addTime(givenTime, hoursToAdd, minutesToAdd);

// console.log(`Original time: ${givenTime}`);
// console.log(`Time after adding ${hoursToAdd} hours and ${minutesToAdd} minutes: ${result}`);