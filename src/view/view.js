import { computeFlexViews } from './flex';
import { computeFacetViews } from './facet';
import { computeLayerViews } from './layer';
import { descendants, group } from '../utils';

// root:描述视图树的嵌套对象
// 该函数有两个参数，第一个参数是一个描述视图树的嵌套对象，第二个参数是一个对象，该对象的每一个值是一个支持的视图计算函数。该函数返回一个数组，数组的每一个元素是一个元组。
export function createViews(root, computes = {
  layer: computeLayerViews,
  //图层，用于用于在一个区域中绘制多个几何元素
  col: computeFlexViews,
  row: computeFlexViews,
  //弹性盒子，用于将区域划分为子区域，不同的子区域拥有不同的视图
  // col:子节点竖直排列
  // row:子节点水平排列
  facet: computeFacetViews,
}) {
  // 获得视图树的所有节点
  const nodes = descendants(root);
  // 计算根节点视图区域大小
  const { width = 640, height = 480, x = 0, y = 0 } = root;
  const rootView = { width, height, x, y };

  // 根据节点索引视图  
  const nodeView = new Map([[root, rootView]]);

  for (const node of nodes) {
    const view = nodeView.get(node);
    const { children = [], type } = node;
    const computeChildrenViews = computes[type];
    if (computeChildrenViews) {
      // 计算孩子节点的区域大小      
      const childrenViews = computeChildrenViews(view, node);
      if (computeChildrenViews !== computeFacetViews) {
        // 如果不是分面节点，孩子节点和计算出来的区域一一对应
        for (const [i, child] of Object.entries(children)) {
          nodeView.set(child, childrenViews[i]);
        }
      } else {
        for (const child of children) {
          for (const view of childrenViews) {
            nodeView.set({ ...child }, view);
          }
        }
      }
    }
  }

// 将计算好的视图根据区域去分组
  const key = (d) => `${d.x}-${d.y}-${d.width}-${d.height}`;
  const keyViews = group(Array.from(nodeView.entries()), ([, view]) => key(view));
  return Array.from(keyViews.values()).map((views) => {
    const view = views[0][1];
    const nodes = views.map((d) => d[0]);
    return [view, nodes];
  });
}
// 返回值为一个元组