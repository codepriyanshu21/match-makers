import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const ProfileSummarySchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  age: z.number(),
  city: z.string(),
  designation: z.string(),
  company: z.string(),
  religion: z.string(),
  wantKids: z.string(),
  hobbies: z.array(z.string()),
});

const ScoreInput = z.object({
  customer: ProfileSummarySchema,
  match: ProfileSummarySchema,
  ruleScore: z.number(),
  ruleReasons: z.array(z.string()),
});

export const aiExplainMatch = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => ScoreInput.parse(d))
  .handler(async ({ data }) => {
    const { chatCompletion } = await import("./ai-gateway.server");
    const explanation = await chatCompletion({
      system:
        "You are an experienced Indian matchmaker. Given two profiles, write 2 short, warm sentences (max 45 words) explaining why this could be a meaningful match. Be specific, avoid clichés.",
      user: `Customer: ${JSON.stringify(data.customer)}\nPotential match: ${JSON.stringify(data.match)}\nRule-based score: ${data.ruleScore}/100. Signals: ${data.ruleReasons.join("; ")}`,
    });
    return { explanation };
  });

const IntroInput = z.object({
  customer: ProfileSummarySchema,
  match: ProfileSummarySchema,
});

export const aiGenerateIntro = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => IntroInput.parse(d))
  .handler(async ({ data }) => {
    const { chatCompletion } = await import("./ai-gateway.server");
    const email = await chatCompletion({
      system:
        "You are a thoughtful matchmaker at TDC writing a personal introduction email to a client about a potential match. Tone: warm, respectful, specific. Format: subject line on first line as 'Subject: ...', then a short email (under 140 words). Sign off as 'The TDC Team'.",
      user: `Write the intro email to ${data.customer.firstName} about ${data.match.firstName} ${data.match.lastName}, ${data.match.age}, ${data.match.designation} at ${data.match.company} in ${data.match.city}. Highlight 1-2 concrete reasons this might resonate based on their shared interests (${data.match.hobbies.join(", ")}) and values.`,
    });
    return { email };
  });
