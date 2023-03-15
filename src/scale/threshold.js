export function createThreshold({ domain, range }) {
  // domin内存储的为分割值，range为可选的分割区间，区间-1=分割值数量
  const n = Math.min(domain.length, range.length - 1);
  return (x) => {
    const index = domain.findIndex((v) => x < v);
    return range[index === -1 ? n : index];
  };
};
// 自定义分割值离散比例尺
