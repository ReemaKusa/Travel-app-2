//src\client\__test__\mockAPI.test.js

const mockData = require('../../server/mockAPI');

test('verify mockAPI data on the server', () => {

    expect(mockData.title).toBe('test json response');
    expect(mockData.message).toMatch(/testing/);
    expect(mockData.time.length).toBe(3);

});