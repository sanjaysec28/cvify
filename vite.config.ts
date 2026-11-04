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
