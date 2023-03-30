// styles
import "./Searchbar.css";

import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function Searchbar() {
  const [term, setTerm] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    // &q=pie
    history.push(`/search?q=${term}`);
  };
  return (
    <div className="searchbar">
      <form onSubmit={handleSubmit}>
        <label htmlFor="search">Пошук:</label>
        <input
          type="text"
          id="search"
          onChange={(e) => setTerm(e.target.value)}
          required
        ></input>
      </form>
    </div>
  );
}
