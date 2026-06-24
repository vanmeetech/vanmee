export function runDFM(model) {

  let score = 100;
  let issues = [];

  if (model.triangles > 60000) {
    score -= 15;
    issues.push("模型复杂度过高");
  }

  if (model.surface > 9000) {
    score -= 10;
    issues.push("表面积过大");
  }

  if (model.bbox.x > 500 ||
      model.bbox.y > 500 ||
      model.bbox.z > 500) {
    score -= 20;
    issues.push("尺寸超限");
  }

  return {
    score: Math.max(score, 0),
    issues
  };
}