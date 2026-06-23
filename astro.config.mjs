import { defineConfig } from "astro/config";
import react from "@astrojs/react";

export default defineConfig({
  output: "static",
  site: "https://vanmee.cn",
  base: "/",
  trailingSlash: "always",
  integrations: [react()]
});