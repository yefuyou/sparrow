import { createViews } from '../view';
import { createRenderer } from '../renderer';
import { createCoordinate } from '../coordinate';
import { create } from './create';
import { inferScales, applyScales } from './scale';
import { initialize } from './geometry';
import { inferGuides } from './guide';
import { bfs, identity, map, assignDefined } from '../utils';

export function plot(root) {
  const { width = 640, height = 480, renderer: plugin } = root;
  const renderer = createRenderer(width, height, plugin);
  // 将配置从容器节点流向视图节点
  flow(root);
  // 将视图树转换成视图树组
  const views = createViews(root);
  for (const [view, nodes] of views) {
    const { transform = identity, ...dimensions } = view;
    const geometries = [];
    const scales = {};
    const guides = {};
    let coordinates = [];
    const chartNodes = nodes.filter(({ type }) => isChartNode(type));
    // 合并同一区域的所拥有视图的配置
    for (const options of chartNodes) {
      const {
        scales: s = {},
        guides: g = {},
        coordinates: c = [],
        transforms = [],
        paddingLeft, paddingRight, paddingBottom, paddingTop,
        ...geometry
      } = options;
      assignDefined(scales, s); // 合并 scales 配置
      assignDefined(guides, g); // 合并 guides 配置
      // 合并 padding 等配置
      assignDefined(dimensions, { paddingLeft, paddingRight, paddingBottom, paddingTop });
      if (c) coordinates = c; // 使用最后一个视图的坐标系
      // 收集该区域的所有几何图形
      geometries.push({ ...geometry, transforms: [transform, ...transforms] });
    }
    plotView({ renderer, scales, guides, geometries, coordinates, ...dimensions });
  }
  return renderer.node();
}

function plotView({
  renderer,
  scales: scalesOptions,
  guides: guidesOptions,
  coordinates: coordinateOptions,
  geometries: geometriesOptions,
  width, height, x, y,
  paddingLeft = 45, paddingRight = 45, paddingBottom = 45, paddingTop = 65,
}) {
  const geometries = geometriesOptions.map(initialize);
  const channels = geometries.map((d) => d.channels);
  const scaleDescriptors = inferScales(channels, scalesOptions);
  const guidesDescriptors = inferGuides(scaleDescriptors, { x, y, paddingLeft }, guidesOptions);

  const scales = map(scaleDescriptors, create);
  const guides = map(guidesDescriptors, create);

  const transforms = inferCoordinates(coordinateOptions).map(create);
  const coordinate = createCoordinate({
    x: x + paddingLeft,
    y: y + paddingTop,
    width: width - paddingLeft - paddingRight,
    height: height - paddingTop - paddingBottom,
    transforms,
  });

  for (const [key, guide] of Object.entries(guides)) {
    const scale = scales[key];
    guide(renderer, scale, coordinate);
  }

  for (const { index, geometry, channels, styles } of geometries) {
    const values = applyScales(channels, scales);
    geometry(renderer, index, scales, values, styles, coordinate);
  }
}
//判断是视图节点还是容器节点
function isChartNode(type) {
  switch (type) {
    case 'layer': case 'col': case 'row': return false;
    default:
      return true;
  }
}

function flow(root) {
  bfs(root, ({ type, children, ...options }) => {
    if (isChartNode(type)) return;
    if (!children || children.length === 0) return;
    const keyDescriptors = [
      'o:encodings', 'o:scales', 'o:guides', 'o:styles',
      'a:coordinates', 'a:statistics', 'a:transforms', 'a:data',
    ];
    for (const child of children) {
      for (const descriptor of keyDescriptors) {
        const [type, key] = descriptor.split(':');
        if (type === 'o') {
          child[key] = { ...options[key], ...child[key] };
        } else {
          child[key] = child[key] || options[key];
        }
      }
    }
  });
}

function inferCoordinates(coordinates) {
  return [...coordinates, { type: 'cartesian' }];
}
