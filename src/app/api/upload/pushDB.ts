import { ContentEmbedding } from "@google/genai";

interface pushDBInteface {
    chucks : string[],
    vectors : ContentEmbedding[],
    
}

export default async function pushDB({} : pushDBInteface){

}