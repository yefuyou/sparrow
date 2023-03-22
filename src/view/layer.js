export function computeLayerViews(box, node) {
  const { children = [] } = node;
  // 把自己的区域大小返回作为孩子节点的区域
  return new Array(children.length).fill(0).map(() => ({ ...box }));
}
