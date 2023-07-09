import { Link } from "react-router-dom";
import React from "react";
import { projectFirestore } from "../firebase/config";
// styles
import "./RecipeLIst.css";
import { useTheme } from "./hooks/useTheme";
import Trashcan from "../assets/trashcan.svg";

export default function RecipeList({ recipes }) {
  const { mode } = useTheme();
  console.log("This is RecipeLIst component!!!");
  console.log(...recipes);

  if (recipes.length === 0) {
    return (
      <div className="error">Немає одиниць, що відповідають запиту...</div>
    );
  }

  const handleClick = (id) => {
    projectFirestore.collection("Речі").doc(id).delete();
  };

  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <div key={recipe.id} recipe={recipe} className={`card ${mode}`}>
          <h3>{recipe.title}</h3>
          <p>{recipe.author}</p>
          <p>{recipe.receiptYear}</p>
          {/* <p>{recipe.description}</p> */}
          <div>
            {recipe.description && recipe.description.substring(0, 250)}...
          </div>
          <p>{recipe.material}</p>
          <p>{recipe.storageLocation}</p>
          {/* <div>{recipe.опис && recipe.опис.substring(0, 30)}...</div> */}
          <Link to={`/recipes/${recipe.id}`}>Повна інформація</Link>
          <img
            className="delete"
            src={Trashcan}
            alt="trashcan icon"
            onClick={() => handleClick(recipe.id)}
          ></img>
        </div>
      ))}
    </div>
  );
}
