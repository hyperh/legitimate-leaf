import * as Utils from './utils';

test('getTotalWeiTransferred', () => {
  const total = Utils.getTotalWeiTransferred([
    { value: '100' },
    { value: '200' }
  ]);
  expect(total).toBe('300');
});

// test('main should run', async () => {
//   const res = await Utils.main();
//   console.log(res);
// });
