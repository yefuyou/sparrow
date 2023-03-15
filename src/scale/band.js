import { createOrdinal } from './ordinal';
import { band } from './utils';

export function createBand(options) {
  const { bandRange, bandWidth, step } = band(options);
  // 借助ordinal比例尺实现
  const scale = createOrdinal({ ...options, range: bandRange });

  scale.bandWidth = () => bandWidth;
  scale.step = () => step;

  return scale;
}
