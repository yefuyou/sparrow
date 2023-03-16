import { compose } from '../utils';

export function createCoordinate({
  transforms: coordinates = [],
  ...canvasOptions
}) {
  // coordinates 是坐标系变换函数
  // 它们是已经接受了 transformOptions 的柯里化函数
  // 它们还需要我们传入 canvasOptions
  // 它们返回一个由基本变换构成的数组，所以在复合前需要通过 flat 把数组拍平
  // [[transpose, reflect], [transpose, reflect]]
  // -> [transpose, reflect, transpose, reflect]
  const transforms = coordinates.flatMap((coordinate) => coordinate(canvasOptions));
  // 某些场景需要获得坐标系的种类信息
  const types = transforms.map((d) => d.type());
  const output = compose(...transforms);
  const { x, y, width, height } = canvasOptions;

  output.isPolar = () => types.indexOf('polar') !== -1;
  // 判断是否转置
  // 只有是奇数个 'transpose' 的时候才是转置
  // 这里使用了异或：a ^ b， 只有当 a 和 b 值不相同的时候才为 true，否者为 false  
  output.isTranspose = () => types.reduce((is, type) => is ^ (type === 'transpose'), false);
  output.center = () => [x + width / 2, y + height / 2];
  // 获得坐标系画布的中心
  return output;
}
