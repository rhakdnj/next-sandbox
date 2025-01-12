"use client"

import {ChangeEvent, useState} from "react";

export default function Searchbar() {
  const [search, setSearch] = useState("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }

  return (
    <div>
      <input value={search} onChange={onChange} />
      <button>검색</button>
    </div>
  )
}
