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
  define: {
    "import.meta.env.VITE_FIREBASE_API_KEY": JSON.stringify(
      process.env.VITE_FIREBASE_API_KEY || process.env.FIREBASE_API_KEY || "",
    ),
    "import.meta.env.VITE_FIREBASE_AUTH_DOMAIN": JSON.stringify(
      process.env.VITE_FIREBASE_AUTH_DOMAIN || process.env.FIREBASE_AUTH_DOMAIN || "",
    ),
    "import.meta.env.VITE_FIREBASE_PROJECT_ID": JSON.stringify(
      process.env.VITE_FIREBASE_PROJECT_ID || process.env.FIREBASE_PROJECT_ID || "",
    ),
    "import.meta.env.VITE_FIREBASE_STORAGE_BUCKET": JSON.stringify(
      process.env.VITE_FIREBASE_STORAGE_BUCKET || process.env.FIREBASE_STORAGE_BUCKET || "",
    ),
    "import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID": JSON.stringify(
      process.env.VITE_FIREBASE_MESSAGING_SENDER_ID ||
        process.env.FIREBASE_MESSAGING_SENDER_ID ||
        "",
    ),
    "import.meta.env.VITE_FIREBASE_APP_ID": JSON.stringify(
      process.env.VITE_FIREBASE_APP_ID || process.env.FIREBASE_APP_ID || "",
    ),
    "import.meta.env.VITE_FIREBASE_MEASUREMENT_ID": JSON.stringify(
      process.env.VITE_FIREBASE_MEASUREMENT_ID || process.env.FIREBASE_MEASUREMENT_ID || "",
    ),
  },
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
