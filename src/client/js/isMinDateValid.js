//src\client\js\isMinDateValid.js

import { getCurrentDate } from './getCurrentDate.js';

export function isMinDateValid(inputDate) {
    return inputDate >= getCurrentDate();
}