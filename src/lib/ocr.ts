import { createServerFn } from "@tanstack/react-start";

/**
 * OCR a PDF (or image) using Gemini API or Lovable AI Gateway.
 * Accepts a base64-encoded file + mime type, returns extracted plain text.
 */
export const ocrDocument = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const v = input as { base64?: string; mimeType?: string };
    if (!v?.base64 || typeof v.base64 !== "string") throw new Error("base64 is required");
    if (!v?.mimeType || typeof v.mimeType !== "string") throw new Error("mimeType is required");
    return { base64: v.base64, mimeType: v.mimeType };
  })
  .handler(async ({ data }: { data: { base64: string; mimeType: string } }) => {
    const geminiKey = process.env.GEMINI_API_KEY;
    const lovableKey = process.env.LOVABLE_API_KEY;

    if (geminiKey) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`;
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    inlineData: {
                      mimeType: data.mimeType,
                      data: data.base64,
                    },
                  },
                  {
                    text: "You are an OCR engine. Extract ALL readable text from the provided document, preserving line breaks and section headings. Return ONLY the extracted plain text — no commentary, no markdown fences.",
                  },
                ],
              },
            ],
          }),
        });

        if (response.ok) {
          const result = (await response.json()) as {
            candidates?: { content?: { parts?: { text?: string }[] } }[];
          };
          const text = result.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
          return { text };
        }
      } catch (err) {
        console.warn("Gemini API OCR failed, falling back:", err);
      }
    }

    if (lovableKey) {
      try {
        const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${lovableKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "google/gemini-2.5-flash",
            messages: [
              {
                role: "system",
                content:
                  "You are an OCR engine. Extract ALL readable text from the provided document, preserving line breaks and section headings. Return ONLY the extracted plain text — no commentary, no markdown fences.",
              },
              {
                role: "user",
                content: [
                  { type: "text", text: "Extract all text from this resume document." },
                  {
                    type: "image_url",
                    image_url: { url: `data:${data.mimeType};base64,${data.base64}` },
                  },
                ],
              },
            ],
          }),
        });

        if (res.ok) {
          const json = (await res.json()) as {
            choices?: { message?: { content?: string } }[];
          };
          const text = json.choices?.[0]?.message?.content ?? "";
          return { text };
        }
      } catch (err) {
        console.warn("Lovable OCR fallback failed:", err);
      }
    }

    // Graceful fallback if no external OCR key is configured or available
    return { text: "" };
  });
