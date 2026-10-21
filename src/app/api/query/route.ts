import { prisma } from "../../../lib/prisma";
import { Groq } from "groq-sdk";
import { ChatCompletionMessageParam } from "groq-sdk/resources/chat.js";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import embeddings from "../embeddings";

const queryRequest = z.object({
  query: z.string().min(1),
});

export async function POST(req: NextRequest) {
  //   req.json();
  // console.log("Here!");
  //   console.log(await req.json());
  const body = await req.json();
  const query = queryRequest.safeParse(body);
  if (!query.success) {
    return NextResponse.json(
      {
        message: "Invalid Payload Data",
      },
      {
        status: 400,
      },
    );
  }
  // console.log("Here2!");

  const llm = new Groq();
  // console.log("Here3!");

  const llmInput: ChatCompletionMessageParam[] = [
    {
      role: "system",
      content: "You are HyDE. You create the most realistic answer to the question possible , even if you have to make things up for the most part given the very limited context. You have to one shot it. You can not ask any other question or get any more info. Just give the answer directly. Do not give any information about yourself!"
    },
    {
      role: "user",
      content: query.data.query,
    },
  ];

  const llmHyDE = await llm.chat.completions.create({
    messages: llmInput,
    model: "qwen/qwen3.6-27b",
    // model: "llama-3.3-70b-versatile",
    reasoning_effort: "none",
  });

  console.log(llmHyDE.choices[0].message.content);

  //embeddings of the HyDE
  const embedHyDE = await embeddings({ chunks: [llmHyDE.choices[0].message.content!] });
  console.log(embedHyDE![0].values);
  console.log("Type of array: ");
  console.log(typeof embedHyDE![0].values);
  const embeddedHyDEval = JSON.stringify(embedHyDE![0].values);
  
  // semantic search
  // const reponse = await prisma.$queryRaw`
  // SELECT id, content, embedding <-> ${embeddedHyDEval} as distance 
  // FROM "Chunk" 
  // ORDER BY distance ASC
  // LIMIT 5`;
  // console.log("Distance: ", reponse);
  const reponse2 = await prisma.$queryRaw`
  SELECT id, content, embedding <=> ${embeddedHyDEval} as similarity 
  FROM "Chunk" 
  ORDER BY similarity
  LIMIT 5`;
  console.log("Similarity: ", reponse2);

  
  return NextResponse.json({ message: llmHyDE });
}
