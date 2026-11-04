import { defineConfig } from "@lovable.dev/vite-tanstack-config";

interface BuildOptionsWithInputs {
  rolldownOptions?: { input?: unknown };
  rollupOptions?: { input?: unknown };
}

export default defineConfig({
  nitro: {
    preset: "node-server",
  },
  vite: {
    plugins: [
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
    server: {
      host: "0.0.0.0",
      port: 3000,
      strictPort: true,
    },
    preview: {
      host: "0.0.0.0",
      port: 3000,
      strictPort: true,
    },
  },
});
