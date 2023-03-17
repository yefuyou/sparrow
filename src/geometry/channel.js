export function createChannel({
  name,
  optional = true,
  ...rest
}) {
  return { name, optional, ...rest };
}
// 属性的名称；	values 里面是否需要该属性对应的值； 需要使用的比例尺

export function createChannels(options = {}) {
  return {
    x: createChannel({ name: 'x', optional: false }),
    y: createChannel({ name: 'y', optional: false }),
    stroke: createChannel({ name: 'stroke' }),
    fill: createChannel({ name: 'fill' }),
    ...options,
  };
}
