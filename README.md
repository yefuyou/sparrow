# sparrow

本项目是基于掘金课程[可视化入门：从 0 到 1 开发一个图表库](https://juejin.cn/book/7031893648145186824)进行的简易图表库开发


## 安装

```js
npm install sparrow-mini
```

## 🔨 示例

```js
import { plot } from 'sparrow-mini/plot';

plot({
  type: 'interval',
  data: sports,
  // 将数据的 sold 字段转换成百分比形式
  transforms: [(data) => {
    const sum = data.reduce((total, d) => total + d.sold, 0);
    return data.map(({ genre, sold }) => ({ genre, sold: sold / sum }));
  }],
  // 使用两个坐标系变换：transpose 和 polar
  coordinates: [{ type: 'transpose' }, { type: 'polar' }],
  // 使用一个统计变换 stackY
  statistics: [{ type: 'stackY' }],
  // 设置 x 通道使用的比例尺的 padding 属性
  // interval 的 x 通道必须使用 band 比例尺，所以有 padding 属性
  scales: {
    x: { padding: 0 },
  },
  guides: {
    x: { display: false }, // 不显示 x 方向的坐标轴
    y: { display: false }, // 不显示 y 方向的坐标轴
  },
  encodings: {
    y: 'sold', // y 通道和 sold 属性绑定
    fill: 'genre', // fill 通道和 genre 属性绑定
  },
  // 设置饼图的样式
  styles: {
    stroke: '#000', 
    strokeWidth: 2,
  },
})
```

![image.png](https://pic7.58cdn.com.cn/nowater/webim/big/n_v2dc4c03af03f74584af8c488a82a5bf7d.png)

