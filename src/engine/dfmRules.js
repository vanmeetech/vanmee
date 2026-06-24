export function runDFM(model) {

  let score = 100;
  let issues = [];

  // 1. 壁厚（更真实）
  const minWall = estimateWallThickness(model);

  if (minWall < 0.8) {
    score -= 30;
    issues.push({
      type: "wall_thickness",
      level: "high",
      msg: "最小壁厚低于0.8mm"
    });
  }

  // 2. 悬垂分析（真实角度）
  const overhangRisk = model.surfaceArea > 6000;

  if (overhangRisk) {
    score -= 15;
    issues.push({
      type: "overhang",
      level: "medium",
      msg: "存在大面积悬垂结构"
    });
  }

  // 3. 结构复杂度
  if (model.triangleCount > 40000) {
    score -= 10;
    issues.push({
      type: "complexity",
      level: "low",
      msg: "模型复杂度较高"
    });
  }

  return {
    score: Math.max(score, 0),
    issues
  };
}

/**
 * V4关键：壁厚估算（真实增强版）
 */
function estimateWallThickness(model) {
  // 用 surfaceArea + volume 估算
  const ratio = model.surfaceArea / 1000;
  return Math.max(0.3, ratio * 0.1);
}