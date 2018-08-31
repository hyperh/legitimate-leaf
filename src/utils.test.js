import * as Utils from './utils';

test('getTotalWeiTransferred', () => {
  const total = Utils.getTotalWeiTransferred([
    { value: '100' },
    { value: '200' }
  ]);
  expect(total).toBe('300');
});

test('getReceiverTotals', () => {
  const totals = Utils.getReceiverTotals([
    { to: 'a', value: '100' },
    { to: 'a', value: '1000' },
    { to: 'a', value: '5000' },
    { to: 'b', value: '200' },
    { to: 'c', value: '123' }
  ]);
  expect(totals).toEqual({
    a: '6100',
    b: '200',
    c: '123'
  });
});

// test('main should run', async () => {
//   const res = await Utils.main();
//   console.log(res);
// });