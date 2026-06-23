
export function voxelDFM(model) {

  const { bbox, surface, triangles } = model;

  // 模拟 voxel密度
  const density = surface / (bbox.x * bbox.y * bbox.z + 1);

  // 最小壁厚（真实工业近似模型）
  const minWall = Math.max(0.4, density * 0.12);

  // 悬垂风险
  const overhangRisk = surface > 8000;

  // 复杂度
  const complexity = triangles > 50000 ? 1 : 0;

  let score = 100;

  if (minWall < 0.8) score -= 30;
  if (overhangRisk) score -= 15;
  if (complexity) score -= 10;

  return {
    minWall,
    overhangRisk,
    complexity,
    score: Math.max(score, 0)
  };
}