//src\client\js\getCurrentDate.js

export function getCurrentDate() {

    let currentDate = new Date();
    let year = currentDate.getFullYear();

    // Extract and format month
    let month = currentDate.getMonth() + 1;
    let formattedMonth = month < 10 ? `0${month}` : month;

    // Extract and format day
    let day = currentDate.getDate();
    let formattedDay = day < 10 ? `0${day}` : day;

    // Construct formatted date string
    return `${year}-${formattedMonth}-${formattedDay}`;

}