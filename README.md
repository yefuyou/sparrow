# sparrow
## 主要功能

- 绘制基本图形：支持 `rect`、`circle`、`line`、`path`、`text`、`ring` 这几种基本图形的绘制。
- 进行坐标系变换：支持 `translate`，`scale`，`rotate` 这三种变换，同时可以使用类似 `Canvas2D` 的 `save` 和 `restore` 去管理坐标系变换的状态。

```js
import { createRenderer } from 'renderer'; 

// 创建渲染器
const renderer = createRenderer(600, 400);

// 绘制基本图形 
renderer.rect({
  x: 10, 
  y: 10, 
  width: 50, 
  height: 50, 
  fill: 'red', 
});

// 坐标变换 
renderer.save(); 
renderer.scale(2, 2); 
renderer.rect({ 
  x: 10, 
  y: 10, 
  width: 50, 
  height: 50 
}); 
renderer.restore();
```

