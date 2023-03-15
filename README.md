# sparrow

本项目是基于掘金课程[可视化入门：从 0 到 1 开发一个图表库](https://juejin.cn/book/7031893648145186824)进行的简易图表库开发

### 遇到的问题&bug

1. `cross-env DEBUG_MODE=1 npx jest`报错

   使用`npm run test`或者`npm run test-live即可`
   
2. git提交报错 `husky - pre-commit hook exited with code 1 (error)`

[(53条消息) 使用pre commit钩子再git commit时报错“husky - pre-commit hook exited with code 1 (error)”_仙女爱吃鱼的博客-CSDN博客](https://blog.csdn.net/weixin_38318244/article/details/126184481)

## scale部分计算

1. 使用对数减少误差

```js
let step1 = 10 ** Math.floor(Math.log(step0) / Math.LN10);
```



1. `m**n = m^n`

**幂赋值**（**`\**=`**）运算符将左侧变量的值设置为右操作数的幂次方。

2. 下面的函数返回以 `x` 为底 `y` 的对数（即 logx y）：

   ```js
   function getBaseLog(x, y) {
       return Math.log(y) / Math.log(x);
   }
   ```



2. `getTime()`:**`getTime()`** 方法返回一个时间的格林威治时间数值。

   

### :black_nib:测试用例修改（小册内vs仓库）



1. linear比例尺拆分interpolateNumber方法至单独文件
2. util从单个文件扩展至模块

## coordinate坐标轴

### 函数式编程

一等公民：一等公民（First Class）的意思是：在函数式编程中，函数是一等公民。

需要注意的是，这里的“一等”和我们平常理解的高人一等的“一等”不太一样，这里是指函数和其他基本数据类型（数值，字符串等）一样，没有什么特殊的地方。我们可以把函数存储在数组中，将它作为参数或者返回值，将它赋值给变量等等。

```js
// 支持三个数的加法
const add = (x, y, z) => x + y + z;

// ❌ 和上面的写法保持不一致
const logAddWithDelay = logfiy((x, y, z) => add(x, y, z));

// ✅  和上面的写法保持一致
const logAdd = logify(add);
```

纯函数：纯函数就是当输入参数保持一致的情况下返回结果也保持一致的函数。

```js
const b = 1;

// 不是纯函数
// 参数 a 相同的情况下，返回结果依赖全局变量 b
const impureAdd = (a) => a + b;

// 是纯函数
// 参数 a, b 相同的下，返回的结果一定相同
const pureAdd = (a, b) = a + b;
```

纯函数意味着函数没有副作用（Side Effect）。副作用是在函数计算过程中改变了系统的状态或者和函数外部的世界有交互，它包括但不限于下面几种。

```js
// 打印日志
console.log('hello world');

// 发起 http 请求
axios.post(/*...*/);

// 查询 DOM
document.getElementById('container');

// 访问外部或者系统变量
const width = window.innerWidth;

// 可变（mutation）
const a = [3, 2, 1];
a.sort(); // sort 是不纯的，因为它改变了 a 的值
a // [1, 2, 3]

//...
```

一个纯函数拥有以下的有优点：

- 便携性：一方面意味着这个函数容易理解，因为它的所有依赖都体现在参数里面。另一方面，意味着这个函数可以在任何地方运行，因为它需要的东西都是通过参数传递的。但是在面向对象编程中却不是这样，Erlang 的创建者 Joe Armstrong 说："在面向对象编程的世界里，我想要一个香蕉，却得到了一片丛林"
- 可测试：我们只用给函数输入然后断言输出即可，不需要提供额外的状态。
- 可并行运行：因为不会访问外部变量，所以不会访问共享的内存，从而不会出现竞争。
- 可缓存：可以根据输入将输出缓存下来，下面是一个简单的实现。

```js
const memoize = (f) => {
  const cache = {};
  return (...args) => {
    const key = JSON.stringify(args);
    cache[key] = cache[key] || f(...args);
    return cache[key];
  };
};

const squareNumber = memoize(x => x * x);
quareNumber(3); // 9, 
quareNumber(3); // 9, 返回缓存的的 9
squareNumber(4); // 16
squareNumber(4); // 16, 返回缓存的的 16
```

- 引用透明（Referentially Transparent）：一段代码可以被它的计算后的值所替换而不改变程序的行为，那么它就是引用透明的。这个特性在重构代码的过程或者帮助我们理解代码非常有用。参考下面的例子。

```js
const impureMultiply = (a, b) => {
  console.log('multiply'); 
  return a * b;
}
const pureMultiply = (a, b) => a * b;

// pureMultiply 是引用透明的
// 如果 a = 2, c = 3，pureMutiply(a, c) 被替换成 6 = pureMutiply(2, 3)
// const pureFn = (a, b, c) => add(6 + pureMultiply(a, b));
// 函数的行为没有改变，所以是引用透明的
const pureFn = (a, b, c) => add(pureMultiply(a, c) + pureMultiply(a, b));

// impureMultiply 不是引用透明的
// 如果 a = 2, c = 3，impureMultiply(a, c) 被替换成 6 = pureMutiply(2, 3)
// const impureFn = (a, b, c) => add(6 + impureMultiply(a, b));
// 这样会打印一次 'multiply'，改变了程序行为，所以不是引用透明的
const impureFn = (a, b, c) => add(impureMultiply(a, c) + impureMultiply(a, b));
// 根据乘法结合律：a * b + a * c = a * (b + c) 可以对 pureFn 函数重构化简
const pureFn = pureMultiply(a, add(b, c));

// 但是如果对 impureFn 函数按照相同方法化简就会有问题
// 'multiply' 这样就只会被打印一次了！！！
const impureFn = (a, b, c) => impureMultiply(a, add(b, c));
```

### 函数柯里化（Currying）

函数柯里化（Currying）的概念很简单：我们可以用少于期望数量的参数去调用一个函数，这个函数返回一个接受剩下参数的函数。

```js
const add = curry((x, y, z) => x + y + z);
add(1)(2, 3); //6
add(1, 2)(3); // 6
add(1, 2, 3); // 6
// 将第一个参数固定为 1
const add1 = add(1);

add1(2, 3) // 6 
add1(3, 4) // 8

// 变成一个单参数的函数
const add1 = add(1, 0);
const add2 = add(2, 0);
const add3 = add(3, 0);

// 复合成一个函数
const add6 = x => add1(add2(add3(x)));

add6(1); // 7
add6(2); // 8
```

知道了 `curry` 函数的用途，那么接下来我们就来实现一个简单的版本。

```js
function curry(fn) {
  // 获得函数参数的数量
  const arity = fn.length;
  return function curried(...args) {
    // 如果当前收集到的参数数量大于需要的数量，那么执行该函数
    if (args.length >= arity) return fn(...args);
    // 否者，将传入的参数收集起来
    // 下面的写法类似于
    // return (...args1) => curried(...args, ...args1);
    return curried.bind(null, ...args);
  };
}
```

最后说一下可以发现柯里化后的函数非常契合纯函数的输入一个输出一个的特点：接受一个参数，返回一个接受剩余参数的函数。

### 函数复合（Compose）

当一个值要经过多个函数转换，才能变成另外一个值，就可以把这些函数合成一个函数。这样，这个值就只用通过复合后的函数转换一次，就可以获得对应结果了。我们希望实现一个 `compose` 函数来自动帮助我们方便得合成函数，期望的使用方式如下。

```js
// 满足 Pointfreee，没有描述处理的数据
const add6 = compose(add1, add2, add3);
add6(1); // 7
```

这样的写法不仅合成很方便，并且也满足了 Pointfree 这种风格：代码中不用描述数据。这样的风格可以让我们移除不必要的函数命名，也能保证函数的通用性。

```js
// 不是 Pointfree, x 就是数据
const add6 = x => add3(add2(add1(x)));

// 不是 Pointfree, x 就是数据
const add6 = x => compose(add1, add2, add3)(x);
```

## 坐标系理论

其实坐标系本质上也是一个函数，和比例尺的不同的是：比例尺是将数据映射为视觉元素的属性，坐标系是将视觉元素的位置属性映射为在画布上的坐标。坐标系这个函数的函数签名如下:

```ts
// 输入是一个点，这个点的两个维度都是在 [0, 1] 的范围内
// 输入是一个点，这个点是可以直接绘制到画布坐标上的点
(point: [number, number]) => [number, number]
```

具体的使用看下面的这个例子。

```js
import { createLinear } from "./scale";
import { createCoordinate, transpose, cartesian } from './coordinate';

// 我们希望绘制一个散点图来看下面数据的分布
const data = [
  { height: 180, weight: 150 },
  { height: 163, weight: 94 },
  { height: 173, weight: 130 }
];

// 将数据的 height 映射为点的 x 属性（这里注意 range 是 [0, 1]）
const scaleX = createLinear({
  domain: [163, 180],
  range: [0, 1]
});

// 将数据的 width 映射为点的 y 属性（这里注意 range 是 [0, 1]）
const scaleY = createLinear({
  domain: [94, 150],
  range: [0, 1],
})

// 创建一个坐标系
const coordinate = createCoordinate({
  // 指定画布的起点和宽高
  x: 0,
  y: 0,
  width: 600,
  height: 400,
  // 一系列坐标系变换
  transforms: [
    transpose(),
    cartesian(),
  ]
});

for (const { height, weight } of data) {
  // 通过比例尺将数据的 height 和 weight 属性
  // 分别映射为点的 x 和 y 属性
  const attributeX = scaleX(height);
  const attributeY = scaleY(weight);
  
  // 将点的 x 和 y 属性
  // 映射为最后的画布坐标
  const [x, y] = coordinate([attributeX, attributeY]);
  
  // 绘制点
  point(x, y);
}
```

就像上面的这个例子中坐标系的创建方式一样，每一个坐标系都包含两个部分：**画布的位置和大小**和**一系列坐标系变换函数**。

比如上面的坐标系的画布就是一个从 `(0, 0)` 开始，宽为600，高400的矩形，如下图。

![20211216223918.jpg](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4f6ed8e137d04e9685b1594d63958d3c~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp?)

上面的坐标系包含两个坐标系变换：`transpose` 和 `cartesian`，现在我们不用知道他们具体含义，只用知道它们会把一个统计意义上的点，转换成画布上的点。

统计意义上的点是指：点的两个维度都被归一化了，都在 `[0, 1]` 的范围之内。这样在将点在真正绘制到画布上的之前，我们不用考虑它们的绝对大小，只用关心它们相对大小

### 坐标系变换

坐标系变换会据画布的位置和大小，以及基本变换本身需要的参数去生成一个由基本变换构成的数组。所以所有的坐标系变换都应该接受两个参数：`transformOptions` 和 `canvasOptions`，然后返回一个数组。我们首先通过笛卡尔坐标系变换来理解这个概念。