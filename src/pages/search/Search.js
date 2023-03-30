import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/firestore";

// style
import "./Search.css";

// components
import RecipeList from "../../components/RecipeList";

export default function Search() {
  const queryString = useLocation().search;
  const queryParams = new URLSearchParams(queryString);
  const query = queryParams.get("q");

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const db = firebase.firestore();
    const recipesRef = db
      .collection("Речі")
      .where("keywords", "array-contains", query);

    setLoading(true);
    recipesRef
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        setRecipes(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [query]);

  return (
    <div>
      <h2 className="page-title">Recipes including "{query}"</h2>
      {error && <p className="error">{error}</p>}
      {loading && <p className="loading">Loading...</p>}
      {!loading && <RecipeList recipes={recipes} />}
    </div>
  );
}
