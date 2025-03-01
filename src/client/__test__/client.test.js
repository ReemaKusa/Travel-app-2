// src/client/__test__/client.test.js

import { calculateDayDifference } from '../js/calculateDayDifference';
import { isMinDateValid } from '../js/isMinDateValid';
import { getCurrentDate } from '../js/getCurrentDate';

test('check for day difference at client side', () => {
    expect(calculateDayDifference('2021-02-05', '2021-02-16')).toBe(11);
    expect(calculateDayDifference('2021-02-05', '2021-02-16')).not.toBe(31);
});

test('check if min date is valid', () => {
    const today = getCurrentDate();
    expect(isMinDateValid(today)).toBe(true);
    expect(isMinDateValid('2020-01-01')).toBe(false);
});