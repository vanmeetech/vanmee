import { defineConfig } from "astro/config";
import react from "@astrojs/react";

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  output: "static",
  site: "https://vanmee.cn",
  base: "/",
  trailingSlash: "always",
  integrations: [react()],
  adapter: cloudflare()
});