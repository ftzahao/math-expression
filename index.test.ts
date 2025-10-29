import { test, expect } from 'bun:test'
import MathExpressionParser from '.'

test('0.1 + 0.1 = 0.2', () => {
  expect(MathExpressionParser('0.1 + 0.1')).toBe('0.2')
})

test('0.1+ 0.1 = 0.2', () => {
  expect(MathExpressionParser('0.1 + 0.1')).toBe('0.2')
})

test('0.1 +0.1 = 0.2', () => {
  expect(MathExpressionParser('0.1 + 0.1')).toBe('0.2')
})

test('0.1 + 0.1 / (2 * 100) = 0.1005', () => {
  expect(MathExpressionParser('0.1 + 0.1 / (2 * 100)')).toBe('0.1005')
})

test('0.1 + (0.1 / 2) * 100 = 5.1', () => {
  expect(MathExpressionParser('0.1 + (0.1 / 2) * 100')).toBe('5.1')
})

test('1 + 2 * 3 - 4 / 5 = 6.2', () => {
  expect(MathExpressionParser('1 + 2 * 3 - 4 / 5')).toBe('6.2')
})

test('(1 + 2) * (3 - 4) / 5 = -0.6', () => {
  expect(MathExpressionParser('(1 + 2) * (3 - 4) / 5')).toBe('-0.6')
})

test('10 / 2 + 3 * (4 - 1) = 14', () => {
  expect(MathExpressionParser('10 / 2 + 3 * (4 - 1)')).toBe('14')
})

test('0.5 * 0.2 + 0.3 / 0.1 = 3.1', () => {
  expect(MathExpressionParser('0.5 * 0.2 + 0.3 / 0.1')).toBe('3.1')
})

test('100 - (20 + 30) * 2 = 0', () => {
  expect(MathExpressionParser('100 - (20 + 30) * 2')).toBe('0')
})

test('3 + 4 * 2 / (1 - 5) = 1', () => {
  expect(MathExpressionParser('3 + 4 * 2 / (1 - 5)')).toBe('1')
})

test('0.333 + 0.667 = 1', () => {
  expect(MathExpressionParser('0.333 + 0.667')).toBe('1')
})

test('5 * (0.2 + 0.3) = 2.5', () => {
  expect(MathExpressionParser('5 * (0.2 + 0.3)')).toBe('2.5')
})
