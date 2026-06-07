import { c as createServerRpc } from "./createServerRpc-CZ5knWLc.mjs";
import { b as createServerFn } from "./server-CIqk24En.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, a as arrayType, s as stringType, n as numberType } from "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
const ProfileSummarySchema = objectType({
  firstName: stringType(),
  lastName: stringType(),
  age: numberType(),
  city: stringType(),
  designation: stringType(),
  company: stringType(),
  religion: stringType(),
  wantKids: stringType(),
  hobbies: arrayType(stringType())
});
const ScoreInput = objectType({
  customer: ProfileSummarySchema,
  match: ProfileSummarySchema,
  ruleScore: numberType(),
  ruleReasons: arrayType(stringType())
});
const aiExplainMatch_createServerFn_handler = createServerRpc({
  id: "4b1cadaa8cc04f370a7e54b3ad1022e3d979770e9e6d066bcc105434788723c5",
  name: "aiExplainMatch",
  filename: "src/lib/ai.functions.ts"
}, (opts) => aiExplainMatch.__executeServer(opts));
const aiExplainMatch = createServerFn({
  method: "POST"
}).inputValidator((d) => ScoreInput.parse(d)).handler(aiExplainMatch_createServerFn_handler, async ({
  data
}) => {
  const {
    chatCompletion
  } = await import("./ai-gateway.server-DnwBbMMZ.mjs");
  const explanation = await chatCompletion({
    system: "You are an experienced Indian matchmaker. Given two profiles, write 2 short, warm sentences (max 45 words) explaining why this could be a meaningful match. Be specific, avoid clichés.",
    user: `Customer: ${JSON.stringify(data.customer)}
Potential match: ${JSON.stringify(data.match)}
Rule-based score: ${data.ruleScore}/100. Signals: ${data.ruleReasons.join("; ")}`
  });
  return {
    explanation
  };
});
const IntroInput = objectType({
  customer: ProfileSummarySchema,
  match: ProfileSummarySchema
});
const aiGenerateIntro_createServerFn_handler = createServerRpc({
  id: "ff39f42449602efc379b7711cd5e6a3293ea07f34381aa0edb6e724db73b3752",
  name: "aiGenerateIntro",
  filename: "src/lib/ai.functions.ts"
}, (opts) => aiGenerateIntro.__executeServer(opts));
const aiGenerateIntro = createServerFn({
  method: "POST"
}).inputValidator((d) => IntroInput.parse(d)).handler(aiGenerateIntro_createServerFn_handler, async ({
  data
}) => {
  const {
    chatCompletion
  } = await import("./ai-gateway.server-DnwBbMMZ.mjs");
  const email = await chatCompletion({
    system: "You are a thoughtful matchmaker at TDC writing a personal introduction email to a client about a potential match. Tone: warm, respectful, specific. Format: subject line on first line as 'Subject: ...', then a short email (under 140 words). Sign off as 'The TDC Team'.",
    user: `Write the intro email to ${data.customer.firstName} about ${data.match.firstName} ${data.match.lastName}, ${data.match.age}, ${data.match.designation} at ${data.match.company} in ${data.match.city}. Highlight 1-2 concrete reasons this might resonate based on their shared interests (${data.match.hobbies.join(", ")}) and values.`
  });
  return {
    email
  };
});
export {
  aiExplainMatch_createServerFn_handler,
  aiGenerateIntro_createServerFn_handler
};
