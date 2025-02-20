//src\client\js\isMinDateValid.js

export function isMinDateValid(inputDate) {
    return inputDate >= Client.getCurrentDate();
}
