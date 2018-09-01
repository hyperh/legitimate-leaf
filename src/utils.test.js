import * as Utils from './utils';

// eslint-disable-next-line no-undef
jasmine.DEFAULT_TIMEOUT_INTERVAL = 60 * 1000;

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

test('getSenderTotals', () => {
  const totals = Utils.getSenderTotals([
    { from: 'a', value: '100' },
    { from: 'a', value: '1000' },
    { from: 'a', value: '5000' },
    { from: 'b', value: '200' },
    { from: 'c', value: '123' }
  ]);
  expect(totals).toEqual({
    a: '6100',
    b: '200',
    c: '123'
  });
});
