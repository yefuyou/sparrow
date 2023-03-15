// src/scale/quantize.js

import { createThreshold } from './threshold';

export function createQuantize({ domain: [d0, d1], range, ...rest }) {
  const n = range.length - 1;
  const step = (d1 - d0) / (n + 1);
  const quantizeDomain = new Array(n).fill(0).map((_, i) => step * (i + 1));
  return createThreshold({ domain: quantizeDomain, range, ...rest });
}
// Quantize 比例尺会根据数据的范围帮我们选择分割值，从而把定义域分成间隔相同的组。
