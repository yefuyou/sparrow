export function createChannel({
  name,
  optional = true,
  ...rest
}) {
  return { name, optional, ...rest };
}


export function createChannels(options = {}) {
  return {
    x: createChannel({ name: 'x', optional: false }), // x 坐标
    y: createChannel({ name: 'y', optional: false }), // y 坐标
    stroke: createChannel({ name: 'stroke' }), // 边框颜色
    fill: createChannel({ name: 'fill' }), // 填充颜色
    ...options,
  };
}
// name: 属性的名字
// optional:values 里面是否需要该属性对应的值
// scale:需要使用的比例尺