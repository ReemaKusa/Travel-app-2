//src\client\js\calculateDayDifference.js

export function calculateDayDifference(date1, date2) {

    let timestamp1 = new Date(date1).setHours(0, 0, 0, 0);
    let timestamp2 = new Date(date2).setHours(0, 0, 0, 0);

    const millisecondsPerDay = 86400000;

    // Compute the difference in full days
    return Math.floor((timestamp2 - timestamp1) / millisecondsPerDay);
}