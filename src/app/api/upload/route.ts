import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { LlamaCloud } from "@llamaindex/llama-cloud";
import { NextRequest, NextResponse } from "next/server";
import embeddings from "./embeddings";

export async function POST(req: NextRequest) {
  console.log("Started Processing!");
  const formData = await req.formData();
  const file = formData.get("file") as File;
  //   console.log(await file.arrayBuffer());
  const lc = new LlamaCloud();
  // Upload and parse a document
  const markdown = await lc.files.create({
    file: file,
    purpose: "parse",
  });
  const time1 = Date.now();
  const result = await lc.parsing.parse({
    file_id: markdown.id,
    tier: "cost_effective",
    version: "latest",
    expand: ["text_full"],
  });
  const time2 = Date.now();
  const diff = time2 - time1;
  console.log("Time to parse: ");
  console.log(diff / 1000);
  // Print the text for the pages
  // console.log(result.text?.pages[0].text);
  //   for (let page = 0; page < result.text?.pages.length!; page++) {
  // console.log(result);
  //   }
  console.log("Parsed!")
  const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000, chunkOverlap: 200 });
  const response = await splitter.splitText(result.text_full!);
  console.log("No of splitts: ", response.length);

  for (let res in response){
    const emb = await embeddings({chunks : response});
    console.log(emb);
  }
//   Document.prototype
  return NextResponse.json({
    message: "Received file!",
  });
}
