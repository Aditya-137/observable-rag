import { prisma } from "../../../lib/prisma";
import { Groq } from "groq-sdk";
import { ChatCompletionMessageParam } from "groq-sdk/resources/chat.js";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import embeddings from "../embeddings";

const queryRequest = z.object({
  query: z.string().min(1),
});

export async function PUT(req: NextRequest) {
  //   req.json();
  console.log("Here!");
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
  console.log("Here2!");

  const llm = new Groq();
  console.log("Here3!");

  const llmInput: ChatCompletionMessageParam[] = [
    {
      role: "system",
      content: "Write a short paragraph that would perfectly answer this question. Try to assume and improv the things missiong for the complete answer"
    },
    {
      role: "user",
      content: query.data.query,
    },
  ];

  const llmHyDE = await llm.chat.completions.create({
    messages: llmInput,
    model: "llama-3.3-70b-versatile",
  });

  console.log(llmHyDE.choices[0].message.content);

  //embeddings of the HyDE
  const embedHyDE = await embeddings({ chunks: [llmHyDE.choices[0].message.content!] });
  console.log(embedHyDE);
  // semantic search
  //   const reponse = await prisma.$queryRaw(`Select id, content from chunck order by embedding <-> ${}`)
  return NextResponse.json({ message: llmHyDE });
}
