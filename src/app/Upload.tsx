"use client"

import axios from "axios";
import { useRef } from "react";

export default function Upload(){
    const inputRef = useRef<HTMLInputElement | null>(null);
    return <div>
        <div >
            <form className="flex flex-col items-center" onSubmit={(e) => {
                console.log("Submited!!");
                console.log(inputRef.current);
                inputRef.current?.click();
                console.log(e.target);
                e.preventDefault();
            }}>
                <input ref = {inputRef} type="file" className="hidden" onChange={async (e) => {
                    console.log("Here too!!!");
                    console.log(e.target?.files);
                    const files = e.target.files;
                    if (files && files.length > 0 && files[0].type == "application/pdf"){
                        const formData = new FormData();
                        formData.append("file", files[0]);
                        console.log(files[0]);
                        const response = await axios.post("/api/upload", formData)
                        console.log(response);
                    }
                    else {
                        alert("Upload only 1 pdf file!");
                    }
                    e.preventDefault();
                }}></input>
                <button className="p-2 bg-blue-600 rounded cursor-pointer" type="submit">Upload</button>
            </form>
        </div>
    </div>
}