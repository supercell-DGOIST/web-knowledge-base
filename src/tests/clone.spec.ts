import { expect, test } from 'vitest';
import clone from '../utils/clone';

const map = new Map();
map.set('key', 'value');
map.set('ConardLi', 'code测试');

const set = new Set();
set.add('ConardLi');
set.add('code测试');

const target = {
  field1: 1,
  field2: undefined,
  field3: {
    child: 'child',
  },
  field4: [2, 4, 8],
  empty: null,
  map,
  set,
  bool: true,
  num: 2,
  str: '2',
  symbol: Symbol(1),
  date: new Date(),
  reg: /\d+/,
  error: new Error(),
  func1: () => {
    console.log('code测试');
  },
  func2: function (a: number, b: number) {
    return a + b;
  },
};

test('测试克隆函数', () => {
  expect(clone(target)).not.toBe(target);
});
