export function calculateCost(model, dfm) {

  const material = model.surface * 0.02;
  const machine = model.bbox.z * 2;
  const labor = 80;

  const risk = (100 - dfm.score) / 100;

  const total = (material + machine + labor) * (1 + risk * 0.3);

  return {
    material: material.toFixed(2),
    machine: machine.toFixed(2),
    labor,
    total: total.toFixed(2)
  };
}