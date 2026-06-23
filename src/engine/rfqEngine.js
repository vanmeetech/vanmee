import { parseSTL } from "./stlParser";
import { runDFM } from "./dfmRules";
import { calculateCost } from "./costModel";

export function runRFQ(buffer) {

  const model = parseSTL(buffer);
  const dfm = runDFM(model);
  const cost = calculateCost(model, dfm);

  return {
    model,
    dfm,
    cost,
    status: "ok"
  };
}