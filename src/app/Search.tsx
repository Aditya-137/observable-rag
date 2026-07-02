"use client";

import axios from "axios";
import { useState } from "react";

function Search() {
  const [query, setQuery] = useState("");
  return (
    <form
      className="flex justify-center gap-4"
      onSubmit={async (e) => {
        console.log("Done!!");
        e.preventDefault();
        console.log("Query: ", query);
        const res = await axios.put("http://localhost:3000/api/query", {
            query : query
        });
        console.log(res);
        setQuery("");
      }}
    >
      <input
        type="search"
        placeholder="Search..."
        className="w-[60%] min-w-125 px-4 py-2 border rounded-full focus:outline-none focus:ring-0 font-bold"
        value={query}
        onChange={(e) => {
            setQuery(e.target.value.trim());
        }}
      />
      <button
        type="submit"
        className="flex h-12 w-12 items-center justify-center rounded-full border bg-white border-white cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="22"
          height="22"
          fill=""
          className=""
        //   color="white"
        >
          <path
            fill="white"
            stroke="#000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
          />
        </svg>
      </button>
    </form>
  );
}

export default Search;
