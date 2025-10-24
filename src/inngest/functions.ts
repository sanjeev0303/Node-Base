import { inngest } from "./client";
import { createGoogleGenerativeAI } from "@ai-sdk/google"
import { generateText } from "ai"


const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY ?? "",
});

export const execute = inngest.createFunction(
  { id: "execute-ai" },
  { event: "execute/ai" },
  async ({ event, step }) => {
    const { steps } = await step.ai.wrap(
        "gemini-generate-text",
        generateText,
        {
            model: google("gemini-2.5-flash"),
            system: "You are a helpfull assistant.",
            prompt:
          event.data?.prompt ??
          "how to make chicken briyani for 4 people",
        }
    )

    return steps
  },
);
