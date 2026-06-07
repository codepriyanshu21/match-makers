const BASE = "https://generativelanguage.googleapis.com/v1beta/models";
async function chatCompletion(opts) {
  const key = process.env.GOOGLE_API_KEY;
  if (!key) throw new Error("Missing GOOGLE_API_KEY");
  const modelName = opts.model ?? "gemini-3-flash-preview";
  const url = `${BASE}/${modelName}:generateContent?key=${key}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            { text: opts.system },
            { text: opts.user }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1024
      }
    })
  });
  if (!res.ok) {
    const text2 = await res.text();
    if (res.status === 429) throw new Error("AI rate limit reached. Please try again shortly.");
    if (res.status === 403) throw new Error("Invalid GOOGLE_API_KEY or API not enabled.");
    throw new Error(`AI call failed (${res.status}): ${text2.slice(0, 200)}`);
  }
  const json = await res.json();
  const text = json.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
  if (!text) throw new Error("Empty response from AI");
  return text;
}
export {
  chatCompletion
};
