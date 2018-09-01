export default {
  eth: {
    getCode: jest
      .fn()
      .mockReturnValueOnce('0x')
      .mockReturnValueOnce('0x0')
      .mockReturnValueOnce('0xsomecontract')
      .mockReturnValueOnce('0x')
  }
};
