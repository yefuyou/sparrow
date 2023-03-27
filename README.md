# sparrow

本项目是基于掘金课程[可视化入门：从 0 到 1 开发一个图表库](https://juejin.cn/book/7031893648145186824)进行的简易图表库开发

3.28更新 昨天面试的美团，在面试的过程中面试官很认真地看了我的readme文件，感到内心十分惭愧，决定逐步更新我的readme并且把我没有做完的工程化相关工作做了。

## 在按课程操作过程遇到的问题&bug

1. `cross-env DEBUG_MODE=1 npx jest`报错

   使用`npm run test`或者`npm run test-live即可`

​	**在这里被面试官问了，你知不知道npx和npm的区别555**

​	简单来说，npm 是一个 node 包管理器，npx 是一个 Node 包执行器。

​	NPM 是 Node 包管理器。NPM 内置在 Node.js 中，通过命令行工具 CLI 来和线上 NPM 	数据库进行交互，这个数据库被称为 NPM Register，NPX 是一个 Node 包执行器，该 	Node 包可以是本地也可以是远程的。允许开发者在无	需安装的情况下执行任意 	Node 包。

2. git提交报错 `husky - pre-commit hook exited with code 1 (error)`

​	其实还是本地不能运行脚本的问题

## 项目相关的环境配置以及技术选型

### SVG和Canvas 2D的区别

SVG 的优点是方便交互，因为它也有 DOM 结构，可以方便地监听事件。但是性能方面却有所影响：如果我们要绘制的图形非常复杂，这些元素节点的数量就会非常多。而节点数量多，就会大大增加 DOM 树渲染和重绘所需要的时间。

相比来说，Canvas 交互实现就不太容易，因为对每个图形的拾取（判断鼠标点位置在哪个图形上）需要开发者自己实现（很多渲染引擎会解决这个问题，我们后面会看到），但是它的绘制性能却相对较优。

所以当数据量不大且侧重交互的情况，用 SVG 比较合适；当数据量较大的时候用 Canvas 比较合适。

**Sparrow 将选择 SVG 而不是 Canvas2D 来作为绘图技术，这是因为 Sparrow 对性能没有要求，同时 SVG 相对于 Canvas2D 更好测试一点（SVG 有 DOM 结构，可以直接检查 DOM 来进行调试）。**

### echarts与其他图表库的横向对比

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fff4706e9f6f4c92baf8f726ee1b2608~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp?)

垂直方向是按照抽象程度来分类的，越底层的工具抽象程度越低，灵活性越强，易用性越差；越高层的工具抽象程度越高，易用性越强。水平方向是按照归属来分类的，左边的工具是来自于 AntV 技术栈的工具，右边的工具是来自于社区优秀的开源工具。

#### 渲染引擎

首先是渲染引擎，渲染引擎会对浏览器的原生 API 进行封装，主要目的是为了简化我们绘制图形的流程。（化了最后的数据绘制流程，没有简化我们的数据处理流程，或者一些通用功能（坐标轴，图例这些））

#### 低级可视化模块

渲染引擎会对浏览器的原生 API 进行封装，主要目的是为了简化我们绘制图形的流程。各个流程仍强依赖于人的参与。

#### 可视化语法

可视化语法就能大幅度减少人的参与，同时保持相对可观的灵活性。

可视化语法的开山鼻祖可以说是：**图形语法**，目前前端有名的在可视化语法这一层级的工具 [G2](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fantvis%2FG2)，[Vega-Lite](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fvega%2Fvega-lite) 等都或多或少借鉴它的思想。

#### 高级可视化绘制模块

高级可视化绘制模块和可视化语层级一样，都不会显式指明可视化图表的类型，但是这些模块不一定是所有图表都通用的，同时在不同的可视化工具中功能也不一样。







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

#### reduce方法

**`reduce()`** 方法对数组中的每个元素按序执行一个由您提供的 **reduce**函数，每一次运行 **reducer** 会将先前元素的计算结果作为参数传入，最后将其结果汇总为单个返回值。

第一次执行回调函数时，不存在“上一次的计算结果”。
`arr.reduce(callback,[initialValue])`
reduce 为数组中的每一个元素依次执行回调函数，不包括数组中被删除或从未被赋值的元素，接受四个参数：初始值（或者上一次回调函数的返回值），当前元素值，当前索引，调用 reduce 的数组。

callback （执行数组中每个值的函数，包含四个参数）

    1、previousValue （上一次调用回调返回的值，或者是提供的初始值（initialValue））
    2、currentValue （数组中当前被处理的元素）
    3、index （当前元素在数组中的索引）
    4、array （调用 reduce 的数组）

initialValue （作为第一次调用 callback 的第一个参数。）

## 几何图形-Geometry

### **`Object.entries()`**

**`Object.entries()`**方法返回一个给定对象自身可枚举属性的键值对数组，其排列与使用 [`for...in`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...in) 循环遍历该对象时返回的顺序一致（区别在于 for-in 循环还会枚举原型链中的属性）。

###   `const isOrdinal = !!scale.bandWidth;`

双非运算符，强制将变量转为Boolean类型

## api设计

Sparrow 最终只暴露出一个函数：`plot`。该函数根据指定的 options 渲染图表并且返回一个渲染好的 SVG 元素。函数签名可以用 TypeScript 简单地如下定义：

```js
plot(options: SPSpec): SVGSVGElement
```

至于这个 options 的结构用 TypeScript 可以简单地如下定义：

```ts
type SPSpec = SPNode;

type SPNode = {
  type?: string;
  data?: any[],
  scales?: Recode<ChannelTypes, Scale>,
  transforms?: Transform[],
  statistics?: Statistic[],
  encodings?: Recode<ChannelTypes, Encode>,
  guides?: Recode<ChannelTypes, Guide>,
  styles?: Record<string, string>
  children?: SPNode[];
  paddingLeft?: number,
  paddingRight?: number,
  paddingTop?: number,
  paddingBottom?: number,
}
```

每一个节点的 type 除了上一章提到的 layer、col、row 这些**容器节点**之外，还可以是所有几何元素的类型：interval、area、text 等等，这些被称为**视图节点**，当然上一章提到的 facet 节点也算是一个视图节点。容器节点可以有 children 属性，但是视图节点不能有 children 属性。

下面对上面的节点的一些属性进行解释：

- data：任意类型的数据。
- scales：比例尺的配置，比如：`{type: 'ordinal', range: ['red', 'yellow']}`
- transforms：数据预处理配置，比如：`data => data.sort()`
- statistics：统计函数配置，比如：`{type: 'stackY'}`
- encodings：指定几何元素的每个通道用什么编码，比如：`{x: 'genre', y: 'sold'}`
- guides：指定辅助组件的配置，比如：`{type: 'axisY', display: false}`
- styles：指定几何元素的样式，比如：`{strokeWidth: 10}`
- paddingLeft：几何图形区域到整个图表区域的左边距。
- paddingRight：几何图形区域到整个图表区域的右边距。
- paddingTop：几何图形区域到整个图表区域的上边距。
- paddingBottom：几何图形区域到整个图表区域的下边距。