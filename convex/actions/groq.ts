"use node";
import { action } from "../_generated/server";
import { v } from "convex/values";
import { Groq } from "groq-sdk";

// Define the model we are using
const MODEL_ID = "moonshotai/kimi-k2-instruct-0905";

/**
 * Chat with the AI Agent (Kimi on Groq).
 */
export const chat = action({
    args: {
        messages: v.array(
            v.object({
                role: v.union(v.literal("system"), v.literal("user"), v.literal("assistant")),
                content: v.string(),
            })
        ),
        temperature: v.optional(v.number()),
    },
    handler: async (ctx, args) => {
        const apiKey = process.env.GROQ_API_KEY;
        if (!apiKey) {
            throw new Error("GROQ_API_KEY is not set");
        }

        const groq = new Groq({ apiKey });

        // Ensure we are using the Kimi model
        const completion = await groq.chat.completions.create({
            messages: args.messages,
            model: MODEL_ID,
            temperature: args.temperature ?? 0.7, // Default to somewhat creative but focused
        });

        return completion.choices[0]?.message?.content || "";
    },
});

/**
 * Analyze text and return structured JSON.
 * Useful for the "Market Guardian" creating risk scores.
 */
export const analyzeJSON = action({
    args: {
        prompt: v.string(),
        jsonSchema: v.string(), // Description of expected JSON
    },
    handler: async (ctx, args) => {
        const apiKey = process.env.GROQ_API_KEY;
        if (!apiKey) {
            throw new Error("GROQ_API_KEY is not set");
        }

        const groq = new Groq({ apiKey });

        const systemPrompt = `You are a strict JSON analyzer. 
        You must output ONLY valid JSON matching this schema description: ${args.jsonSchema}.
        Do not explain. do not add code blocks. Just JSON.`;

        const completion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: args.prompt }
            ],
            model: MODEL_ID,
            response_format: { type: "json_object" }, // Groq supports JSON mode
            temperature: 0.2, // Low temp for deterministic data extraction
        });

        const content = completion.choices[0]?.message?.content;
        if (!content) {
            throw new Error("No content from Groq");
        }

        try {
            return JSON.parse(content);
        } catch (e) {
            throw new Error(`Failed to parse Groq JSON: ${content}`);
        }
    }
});
