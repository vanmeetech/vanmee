import { calculateCost } from '../../engine/costModel';

export async function POST({ request }) {

  const data = await request.json();

  const quote = calculateCost(data.model, data.dfm);

  return new Response(JSON.stringify({
    quote
  }));
}