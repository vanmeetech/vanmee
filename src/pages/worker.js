export default {
  async fetch(req) {

    const url = new URL(req.url);

    // ===== QUOTE ENGINE =====
    if (url.pathname === "/api/quote") {

      const data = await req.json();

      let price = 120;

      if (data.service === "CNC Machining") price += 150;
      if (data.service === "3D Printing") price += 90;

      if (data.material === "Steel") price += 60;
      if (data.material === "Aluminum") price += 40;

      price += (data.quantity || 1) * 12;

      return Response.json({
        price,
        leadTime: price > 250 ? "3–5 days" : "24–48h"
      });
    }

    // ===== UPLOAD =====
    if (url.pathname === "/api/upload") {

      const form = await req.formData();
      const file = form.get("file");

      console.log("CAD FILE:", file.name);

      return new Response("OK");
    }

    return new Response("VANMEE SYSTEM");
  }
};