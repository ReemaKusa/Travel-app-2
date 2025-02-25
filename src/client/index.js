//src\client\index.js

import { handleFormSubmission } from './js/handleFormSubmission';
import { getCurrentDate } from './js/getCurrentDate';
import { isMinDateValid } from './js/isMinDateValid';
import { calculateDayDifference } from './js/calculateDayDifference';
import { printButton } from './js/printButton';
import { closeButton } from './js/closeButton';

import './styles/style.scss';

export {
    handleFormSubmission,
    getCurrentDate,
    isMinDateValid,
    calculateDayDifference,
    printButton,
    closeButton
}