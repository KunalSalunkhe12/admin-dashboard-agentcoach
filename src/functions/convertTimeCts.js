
   export const convertToCSTSimple = (timeString, hoursToSubtract, minutesToSubtract) => {
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
  
    // Subtract the specified hours and minutes
    date.setHours(date.getHours() - hoursToSubtract);
    date.setMinutes(date.getMinutes() - minutesToSubtract);
  
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
  
