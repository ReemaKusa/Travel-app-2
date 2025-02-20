//src\client\js\calculateDayDifference.js

export function calculateDayDifference(date1, date2) {

    let timestamp1 = new Date(date1).getTime();
    let timestamp2 = new Date(date2).getTime();

    // Milliseconds in a single day
    const millisecondsPerDay = 86400000;

    // Compute and return the difference in days
    return Math.floor((timestamp2 - timestamp1) / millisecondsPerDay);

}