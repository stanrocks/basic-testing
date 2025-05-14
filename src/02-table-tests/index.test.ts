import { simpleCalculator, Action } from './index';

const validInputTestCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: -3, b: 2, action: Action.Add, expected: -1 },
  { a: 0, b: 2, action: Action.Add, expected: 2 },
  { a: NaN, b: 2, action: Action.Add, expected: NaN },
  { a: 5, b: 3, action: Action.Subtract, expected: 2 },
  { a: 3, b: 5, action: Action.Subtract, expected: -2 },
  { a: 1, b: 1, action: Action.Subtract, expected: 0 },
  { a: 1, b: -4, action: Action.Subtract, expected: 5 },
  { a: 1, b: 0, action: Action.Subtract, expected: 1 },
  { a: NaN, b: 0, action: Action.Subtract, expected: NaN },
  { a: 1, b: 3, action: Action.Multiply, expected: 3 },
  { a: 2, b: 3, action: Action.Multiply, expected: 6 },
  { a: -4, b: 2, action: Action.Multiply, expected: -8 },
  { a: 0, b: 3, action: Action.Multiply, expected: 0 },
  { a: NaN, b: 3, action: Action.Multiply, expected: NaN },
  { a: 3, b: 1, action: Action.Divide, expected: 3 },
  { a: 6, b: 3, action: Action.Divide, expected: 2 },
  { a: -12, b: 4, action: Action.Divide, expected: -3 },
  { a: 5, b: 0, action: Action.Divide, expected: Infinity },
  { a: NaN, b: 2, action: Action.Divide, expected: NaN },
  { a: 0, b: 0, action: Action.Divide, expected: NaN },
  { a: 2, b: 1, action: Action.Exponentiate, expected: 2 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 2, b: -1, action: Action.Exponentiate, expected: 0.5 },
  { a: 0, b: 1, action: Action.Exponentiate, expected: 0 },
  { a: NaN, b: 2, action: Action.Exponentiate, expected: NaN },
];

const invalidInputTestCases = [
  { a: null, b: 2, action: Action.Add },
  { a: '2', b: 2, action: Action.Add },
  { a: {}, b: 2, action: Action.Add },
  { a: null, b: 2, action: Action.Subtract },
  { a: '2', b: 2, action: Action.Subtract },
  { a: {}, b: 2, action: Action.Subtract },
  { a: null, b: 2, action: Action.Multiply },
  { a: '2', b: 2, action: Action.Multiply },
  { a: {}, b: 2, action: Action.Multiply },
  { a: null, b: 2, action: Action.Divide },
  { a: '2', b: 2, action: Action.Divide },
  { a: {}, b: 2, action: Action.Divide },
  { a: null, b: 2, action: Action.Exponentiate },
  { a: '2', b: 2, action: Action.Exponentiate },
  { a: {}, b: 2, action: Action.Exponentiate },
  { a: 1, b: 2, action: '%' },
];

describe.each(validInputTestCases)(
  'simpleCalculator, valid input cases',
  ({ a, b, action, expected }) => {
    test(`${a} ${action} ${b} returns ${expected}`, () => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    });
  },
);

describe.each(invalidInputTestCases)(
  'simpleCalculator, invalid input cases',
  ({ a, b, action }) => {
    test(`${a} ${action} ${b} returns null`, () => {
      expect(simpleCalculator({ a, b, action })).toBeNull();
    });
  },
);
