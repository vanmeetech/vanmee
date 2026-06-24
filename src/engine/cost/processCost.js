
export function costV7(geometry, dfm) {

  const volume = geometry.boundingBox
    ? geometry.boundingBox.max.x * geometry.boundingBox.max.y * geometry.boundingBox.max.z
    : 1000;

  const base = volume * 0.02;

  const complexityFactor = (100 - dfm.score) / 100;

  const total = base * (1 + complexityFactor * 0.5);

  return {
    base: base.toFixed(2),
    complexity: complexityFactor.toFixed(2),
    total: total.toFixed(2)
  };
}