
/**
 * V7核心：距离场壁厚估算（简化版工业SDF）
 */

export function computeWallThickness(geometry) {

  const pos = geometry.attributes.position;

  let minDist = Infinity;

  // 简化 voxel sampling（工业近似）
  for (let i = 0; i < pos.count; i += 6) {

    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);

    const dist = Math.sqrt(x*x + y*y + z*z);

    if (dist < minDist) {
      minDist = dist;
    }
  }

  return {
    minWallThickness: Math.max(minDist * 0.01, 0.3)
  };
}