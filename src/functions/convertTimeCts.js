export function convertToCST(timeString) {
    // Parse the input time string
    const [time, period] = timeString.split(' ');
    const [hours, minutes] = time.split(':');

    // Create a Date object for today with the given time
    const date = new Date();
    date.setHours(period === 'PM' ? parseInt(hours) + 12 : parseInt(hours));
    date.setMinutes(parseInt(minutes));
    date.setSeconds(0);

    // Convert to CST
    const options = {
        timeZone: 'America/Chicago',
        hour12: true,
        hour: 'numeric',
        minute: '2-digit',
    };

    const cstTime = date.toLocaleString('en-US', options);
    return cstTime;
}

// Example usage:
const result = convertToCST("5:09 AM");
console.log(result); // Should output something like "12:08 AM" (may vary based on daylight saving time)

