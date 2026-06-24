import { analyzeSTL } from "./stlParser";
import { runDFM } from "./dfmRules";
import { calculateCost } from "./costModel";

/**
 * V4 Industrial RFQ Pipeline
 */
export async function processRFQ(buffer, material = "SLA_Standard") {

  // 1. 几何分析
  const model = analyzeSTL(buffer);

  // 2. DFM分析
  const dfm = runDFM(model);

  // 3. 成本计算
  const cost = calculateCost(model, dfm, material);

  // 4. 工业评分（新增）
  const industrialScore = calculateIndustrialScore(dfm, model);

  return {
    model,
    dfm,
    cost,
    industrialScore
  };
}

/**
 * V4 工业评分（比V3更真实）
 */
function calculateIndustrialScore(dfm, model) {

  let score = dfm.score;

  // 尺寸复杂度惩罚
  const complexity = model.surfaceArea / 10000;

  if (complexity > 1) score -= 10;
  if (complexity > 2) score -= 20;

  // 三角面复杂度
  if (model.triangleCount > 50000) score -= 10;

  return Math.max(0, Math.min(100, score));
}