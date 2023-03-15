// src/coordinate/cartesian.js
import { curry } from '../utils';
import { scale, translate } from './transforms';

function coordinate(transformOptions, canvasOptions) {
  // canvasOptions为画布特征
  const {
    x, y, width, height,
  } = canvasOptions;
  return [
    scale(width, height),
    translate(x, y),
  ];
}

export const cartesian = curry(coordinate);
// 笛卡尔系变换