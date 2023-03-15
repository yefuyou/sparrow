// src/utils/helper.js

export function curry(fn) {
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