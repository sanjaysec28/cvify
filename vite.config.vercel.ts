// Vercel-only Vite config for TanStack Start.
// Used by `vercel.json` via `buildCommand: "vite build --config vite.config.vercel.ts"`.
// Does NOT replace the default vite.config.ts which is used by the Lovable preview.
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";

interface BuildOptionsWithInputs {
  rolldownOptions?: { input?: unknown };
  rollupOptions?: { input?: unknown };
}

export default defineConfig({
  plugins: [
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tailwindcss(),
    tanstackStart(),
    nitro(),
    viteReact(),
    {
      name: "fix-rollup-options",
      configEnvironment(name, options) {
        if (options.build) {
          const b = options.build as unknown as BuildOptionsWithInputs;
          if (b.rolldownOptions?.input && !b.rollupOptions?.input) {
            b.rollupOptions = {
              ...b.rollupOptions,
              input: b.rolldownOptions.input,
            };
          }
        }
      },
    },
  ],
});
