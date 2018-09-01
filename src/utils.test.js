import * as Utils from './utils';

jest.mock('./web3');

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

test('getUniqueAddressesIsContract', async () => {
  const res = await Utils.getUniqueAddressesIsContract([
    { to: 'a', from: 'b' },
    { to: 'c', from: 'd' }
  ]);
  expect(res).toEqual({ a: false, b: false, c: true, d: false });
});

test('getNumUncles', () => {
  const numUncles = Utils.getNumUncles([
    { uncles: [] },
    { uncles: ['hash1', 'hash2'] },
    { uncles: ['hash1', 'hash2'] }
  ]);
  expect(numUncles).toEqual(4);

  const numUncles2 = Utils.getNumUncles([{ uncles: [] }]);
  expect(numUncles2).toEqual(0);
});

test('getContractTxPercentage', () => {
  const contractTxPercentage = Utils.getContractTxPercentage(
    [{ from: 'a', to: 'b' }],
    { a: true, b: false, c: false }
  );
  expect(contractTxPercentage).toEqual(100);

  const contractTxPercentage2 = Utils.getContractTxPercentage(
    [{ from: 'a', to: 'b' }, { from: 'b', to: 'c' }],
    { a: true, b: false, c: false }
  );
  expect(contractTxPercentage2).toEqual(50);

  const contractTxPercentage3 = Utils.getContractTxPercentage(
    [
      { from: 'a', to: 'b' },
      { from: 'b', to: 'c' },
      { from: 'a', to: 'c' },
      { from: 'a', to: 'c' }
    ],
    { a: true, b: false, c: false }
  );
  expect(contractTxPercentage3).toEqual(75);
});
