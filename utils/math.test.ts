import { add, multiply, divide } from './math';

describe('Math utilities', () => {
  describe('add', () => {
    test('adds two positive numbers correctly', () => {
      expect(add(2, 3)).toBe(5);
    });

    test('adds negative numbers correctly', () => {
      expect(add(-2, -3)).toBe(-5);
    });

    test('adds mixed numbers correctly', () => {
      expect(add(5, -3)).toBe(2);
    });
  });

  describe('multiply', () => {
    test('multiplies two numbers correctly', () => {
      expect(multiply(3, 4)).toBe(12);
    });

    test('handles zero multiplication', () => {
      expect(multiply(5, 0)).toBe(0);
    });

    test('multiplies negative numbers', () => {
      expect(multiply(-2, -3)).toBe(6); // Fixed: negative * negative = positive
    });
  });

  describe('divide', () => {
    test('divides two numbers correctly', () => {
      expect(divide(10, 2)).toBe(5);
    });

    test('throws error on division by zero', () => {
      expect(() => divide(5, 0)).toThrow('Division by zero');
    });

    test('handles decimal division', () => {
      expect(divide(7, 2)).toBe(3.5); // Fixed: 7/2 = 3.5
    });
  });
});