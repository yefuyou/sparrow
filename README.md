# sparrow

本项目是基于掘金课程[可视化入门：从 0 到 1 开发一个图表库](https://juejin.cn/book/7031893648145186824)进行的简易图表库开发


## 安装

```js
npm install sparrow-mini
```

## 🔨 示例

```js
import { plot } from '@sparrow-vis/plot';
const sports = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];

plot({
  type: 'interval', // 指定节点的种类是 interval
  data: sports, // 指定数据
  encodings: {
    x: 'genre', // 指定 x 通道由数据的 genre 属性决定
    y: 'sold', // 指定 y 通道由数据的 sold 属性决定
  },
});
```

![image.png](https://pic7.58cdn.com.cn/nowater/webim/big/n_v2dc4c03af03f74584af8c488a82a5bf7d.png)

