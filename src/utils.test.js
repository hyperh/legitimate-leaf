import * as Utils from './utils';

jest.mock('./web3');

describe('getTotalWeiTransferred', () => {
  test('should return total wei transferred', () => {
    const total = Utils.getTotalWeiTransferred([
      { value: '100' },
      { value: '200' }
    ]);
    expect(total).toBe('300');
  });
});

describe('getReceiverTotals', () => {
  test('should return an object where keys are addresses from "to" field with values as total wei received', () => {
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
});

describe('getSenderTotals', () => {
  test('should return an object where keys are addresses from "from" field with values as total wei sent', () => {
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
});

describe('getUniqueAddressesIsContract', () => {
  test('should return an object where keys are addresses and values are boolean', async () => {
    const res = await Utils.getUniqueAddressesIsContract([
      { to: 'a', from: 'b' },
      { to: 'c', from: 'd' }
    ]);
    expect(res).toEqual({ a: false, b: false, c: true, d: false });
  });
});

describe('getNumUncles', () => {
  test('should return proper number of uncles', () => {
    const numUncles = Utils.getNumUncles([
      { uncles: ['hash1', 'hash2'] },
      { uncles: ['hash1', 'hash2'] }
    ]);
    expect(numUncles).toEqual(4);
  });

  test('should return proper number of uncles even with empty arrays', () => {
    const numUncles = Utils.getNumUncles([
      { uncles: [] },
      { uncles: ['hash1', 'hash2'] },
      { uncles: ['hash1', 'hash2'] }
    ]);
    expect(numUncles).toEqual(4);
  });
});

describe('getContractTxPercentage', () => {
  test('should return proper percentage of contract transactions', () => {
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
});

describe('getNumEvents', () => {
  test('should return proper number of events', () => {
    const numEvents = Utils.getNumEvents([
      { logs: ['a', 'b'] },
      { logs: ['a', 'b'] }
    ]);

    expect(numEvents).toEqual(4);
  });

  test('should return proper number of events even with null receipts and empty log arrays', () => {
    const numEvents = Utils.getNumEvents([
      { logs: [] },
      null,
      { logs: ['a', 'b'] },
      { logs: ['a', 'b'] },
      null
    ]);

    expect(numEvents).toEqual(4);
  });
});

describe('getNumContractsCreated', () => {
  test('should return proper number of contracts created', () => {
    const numContractsCreated = Utils.getNumContractsCreated([
      { contractAddress: '0xcontract' },
      { contractAddress: '0xcontract2' },
      { contractAddress: null },
      null
    ]);
    expect(numContractsCreated).toEqual(2);
  });
});
