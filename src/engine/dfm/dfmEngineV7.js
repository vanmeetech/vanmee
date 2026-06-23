import { computeWallThickness } from "../core/sdfEngine";
import { detectFeatures } from "../core/featureDetector";

export function runDFM_V7(geometry) {

  const wall = computeWallThickness(geometry);
  const feat = detectFeatures(geometry);

  let score = 100;
  let issues = [];

  // 壁厚约束（真实工业规则）
  if (wall.minWallThickness < 0.8) {
    score -= 35;
    issues.push("壁厚不足（注塑/打印风险）");
  }

  // 孔结构
  if (feat.holes > 20) {
    score -= 15;
    issues.push("孔结构复杂");
  }

  // 锐边
  if (feat.sharpEdges > 50) {
    score -= 10;
    issues.push("尖锐边缘过多");
  }

  return {
    score: Math.max(score, 0),
    wall,
    feat,
    issues
  };
}