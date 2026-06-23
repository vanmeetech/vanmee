import { parseSTL } from "../../engine/stl";
import { runDFM } from "../../engine/dfm";
import { calculateCost } from "../../engine/cost";

export async function POST({ request }) {

  try {

    const form = await request.formData();
    const file = form.get("file");

    if (!file) {
      return new Response(JSON.stringify({
        error: "no file"
      }));
    }

    const buffer = await file.arrayBuffer();

    const model = parseSTL(buffer);
    const dfm = runDFM(model);
    const cost = calculateCost(model, dfm);

    return new Response(JSON.stringify({
      model,
      dfm,
      cost,
      status: "ok"
    }));

  } catch (e) {

    return new Response(JSON.stringify({
      error: "system_error",
      detail: e.message
    }));
  }
}