import { area as pathArea, line as pathLine, ring as pathRing } from './d';

export function ring(renderer, { cx, cy, r1, r2, ...styles }) {
  const ring = renderer.path({ ...styles, d: pathRing([[cx, cy], [r1, r2]]), stroke: 'none' });
  const innerStroke = renderer.circle({ ...styles, fill: 'none', r: r1, cx, cy });
  const outerStroke = renderer.circle({ ...styles, fill: 'none', r: r2, cx, cy });
  return [innerStroke, ring, outerStroke];
}

export function contour(renderer, { points, ...styles }) {
  const end = points.length;
  const mid = end / 2;
    // 用一条 path 绘制等高线本身
  const contour = renderer.path({ d: pathArea(points), ...styles, stroke: 'none' });
   // 用一条 path 绘制外边框
  const outerStroke = renderer.path({ d: pathLine(points.slice(0, mid)), ...styles, fill: 'none' });
   // 用一条 path 绘制内边框
  const innerStroke = renderer.path({ d: pathLine(points.slice(mid, end)), ...styles, fill: 'none' });
  return [innerStroke, contour, outerStroke];
}
