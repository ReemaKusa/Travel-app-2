//src\client\__test__\calculateDayDifference.test.js

const { calculateDayDifference } = require('../js/calculateDayDifference');

test('check for day difference at client side', () => {

    expect(calculateDayDifference('2021-02-05', '2021-02-16')).toBe(11);
    expect(calculateDayDifference('2021-02-05', '2021-02-16')).not.toBe(31);

});