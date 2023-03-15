// src/scale/time.js

import { createLinear } from './linear';

export function createTime({ domain, ...rest }) {
  // 定义函数进行转换
  const transform = (x) => x.getTime();
  const transformedDomain = domain.map(transform);
  const linear = createLinear({ domain: transformedDomain, ...rest });
  const scale = (x) => linear(transform(x));

  scale.nice = (tickCount) => linear.nice(tickCount);
  scale.ticks = (tickCount) => linear.ticks(tickCount).map((d) => new Date(d));

  return scale;
}
// 映射规则：y= a*getTime(time)+b,主体思想：转换为格林威治时间后即为linear处理问题