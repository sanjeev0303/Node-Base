import { inngest } from "./client";
import { createGoogleGenerativeAI } from "@ai-sdk/google"
import { generateText } from "ai"
import * as Sentry from "@sentry/nextjs";


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
                prompt: "how to make chicken briyani for 4 people",
                experimental_telemetry: {
                    isEnabled: true,
                    recordInputs: true,
                    recordOutputs: true,
                },
            }
        )
        Sentry.logger.info('User triggered test log', { log_source: 'sentry_test' })

        return steps
    },

);
