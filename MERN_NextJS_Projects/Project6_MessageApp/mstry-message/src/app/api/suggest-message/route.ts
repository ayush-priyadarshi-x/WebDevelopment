import OpenAI from "openai/index.mjs";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import { NextResponse } from "next/server";

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

export const POST = async (request: Request) => {
  const prompt =
    "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

  try {
    const result = await streamText({
      model: openai("gpt-4-turbo"),
      prompt,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      console.log("An unexpected error occured: ", error);

      return NextResponse.json(
        {
          success: false,
          message: "There was some error when suggest-message : ",
        },
        { status: 500 }
      );
      throw error;
    } else {
      console.log("An unexpected error occured: ", error);
      throw error;
    }
  }
};
