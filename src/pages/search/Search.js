import React, { useState, useEffect } from "react";
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

  const [searchResults, setSearchResults] = useState([]);
  const db = firebase.firestore();

  // useEffect(() => {
  //   // Create a Firestore query that searches for documents that match the keyword
  //   db.collection("Речі")
  //     .where("title", "==", query)
  //     .where("author", "==", query)
  //     .where("receiptYear", "==", query)
  //     .get()
  //     .then((querySnapshot) => {
  //       const results = [];
  //       querySnapshot.forEach((doc) => {
  //         results.push({ ...doc.data(), id: doc.id });
  //         console.log(results);
  //       });
  //       console.log("TTTTTTTTTTTTT");
  //       console.log(querySnapshot);
  //       setSearchResults(results);
  //     })
  //     .catch((error) => {
  //       console.error("Error searching for recipes:", error);
  //     });
  // }, [query]);

  useEffect(() => {
    // Create a Firestore query that searches for documents that match the keyword
    const titleQuery = db.collection("Речі").where("title", "==", query);

    const authorQuery = db.collection("Речі").where("author", "==", query);

    const receiptYearQuery = db
      .collection("Речі")
      .where("receiptYear", "==", query);

    Promise.all([titleQuery.get(), authorQuery.get(), receiptYearQuery.get()])
      .then((querySnapshots) => {
        const results = [];
        querySnapshots.forEach((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            results.push({ ...doc.data(), id: doc.id });
          });
        });
        setSearchResults(results);
      })
      .catch((error) => {
        console.error("Error searching for recipes:", error);
      });
  }, [query]);

  return (
    <div>
      <h2 className="page-title">Предмети, що містять "{query}"</h2>
      {searchResults.length === 0 && (
        <p className="no-results">No recipes found.</p>
      )}
      {searchResults.length > 0 && <RecipeList recipes={searchResults} />}
    </div>
  );
}
