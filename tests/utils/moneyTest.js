import {formatCurrency} from '../../scripts/utils/money.js';

describe('test suite: formatCurrency', () => {
  it('converts cents into dollars', () => {
    expect(formatCurrency(2095)).toEqual('Rs.20.95');
  });

  it('works with 0', () => {
    expect(formatCurrency(0)).toEqual('Rs.0.00');
  });

  it('rounds up to the nearest cent', () => {
    expect(formatCurrency(2000.5)).toEqual('Rs.20.01');
  });
});