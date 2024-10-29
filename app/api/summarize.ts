import type { NextApiRequest, NextApiResponse } from "next";
import { ChatOpenAI } from "@langchain/openai";

const model = new ChatOpenAI({
  modelName: "gpt-3.5-turbo", // or your preferred model
  openAIApiKey: process.env.OPENAI_API_KEY, // Make sure to set this in your .env.local file
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { text }: { text: string } = req.body; // Extract text from the request body

    try {
      // Modify the prompt to generate a mind map
      //   const prompt = `Generate a mind map summary for the following text: ${text}`;
      //   const mindMapSummary = await model.call(prompt);
      //   res.status(200).json({ mindMapSummary });
      res.status(200).json({ text: "hello" });
    } catch (error) {
      console.error("Error generating mind map summary:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
