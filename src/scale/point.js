// src/scale/point.js

import { createBand } from './band';

export function createPoint(options) {
  return createBand({ ...options, padding: 1 });
}
// 主要用于散点图，相当于padding取1的band。调用band计算即可
