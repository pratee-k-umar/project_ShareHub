"use client"
import { handleSearch } from "@/utils/handleSearch"
import { useState, useEffect } from "react"


export default function Search({ onSearchChange }) {
  const [searchText, setSearchText] = useState("");
  const handleSearchChange = (newSearchText) => {
    setSearchText(newSearchText);
    onSearchChange(newSearchText);
  };
  return (
    <div>
      <form>
        <input type="text" placeholder="Search..." value={searchText} onChange={(e) => handleSearchChange(e.target.value)} required className="search_input" />
      </form>
    </div>
  )
}