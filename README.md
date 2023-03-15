# sparrow

本项目是基于掘金课程[可视化入门：从 0 到 1 开发一个图表库](https://juejin.cn/book/7031893648145186824)进行的简易图表库开发

## day1-环境配置初探

### 遇到的问题

1. `cross-env DEBUG_MODE=1 npx jest`报错

   使用`npm run test`或者`npm run test-live即可`



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

