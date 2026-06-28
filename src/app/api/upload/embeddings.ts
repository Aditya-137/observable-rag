import { GoogleGenAI } from "@google/genai";

export default async function embeddings({chunks} : {chunks :string[]}) {

    const ai = new GoogleGenAI({});

    const response = await ai.models.embedContent({ 
        model: 'gemini-embedding-001',
        contents: chunks,
         config: {
            outputDimensionality: 768  // not 3072, saves storage
        }
    });

    return response.embeddings;
}

