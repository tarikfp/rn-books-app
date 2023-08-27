import { getWindowHeight, getWindowWidth } from '~utils/layout';

// Mock Dimensions from 'react-native'
jest.mock('react-native', () => ({
  Dimensions: {
    get: jest.fn(() => ({ width: 375, height: 667 })), // Mock screen dimensions
  },
}));

describe('getWindowWidth function', () => {
  it('should calculate window width correctly for percentage (number)', () => {
    const result = getWindowWidth(50);
    expect(result).toBe(375 * 0.5); // 50% of width
  });

  it('should calculate window width correctly for percentage (string)', () => {
    const result = getWindowWidth('25%');
    expect(result).toBe(375 * 0.25); // 25% of width
  });
});

describe('getWindowHeight function', () => {
  it('should calculate window height correctly for percentage (number)', () => {
    const result = getWindowHeight(75);
    expect(result).toBe(667 * 0.75); // 75% of height
  });

  it('should calculate window height correctly for percentage (string)', () => {
    const result = getWindowHeight('40%');
    expect(result).toBe(667 * 0.4); // 40% of height
  });
});
