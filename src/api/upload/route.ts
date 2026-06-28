import { NextRequest, NextResponse } from "next/server";

export function POST(req : NextRequest){
    console.log(req.body);
    NextResponse.json({
        message : "Recieved file!"
    })
}