import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTheme } from "../../components/hooks/useTheme";
import { projectFirestore } from "../../firebase/config";

// style
import "./Recipe.css";

export default function Recipe() {
  const { id } = useParams();
  const { mode } = useTheme();

  const [recipe, setRecipe] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsPending(true);

    const unsub = projectFirestore
      .collection("Речі")
      .doc(id)
      .onSnapshot((doc) => {
        if (doc.exists) {
          setIsPending(false);
          setRecipe(doc.data());
        } else {
          setIsPending(false);
          setError("Немає відповідного предмету");
        }
      });
    return () => unsub();
  }, [id]);

  // const handleClick = () => {
  //   projectFirestore.collection("Речі").doc(id).update({});
  // };
  return (
    <div className={`recipe ${mode}`}>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {recipe && (
        <>
          <h2 className="page-title">{recipe.title}</h2>
          <p>Автор: {recipe.author}</p> <span>{recipe.authorFirstName}</span>
          <p>Рік надходження: {recipe.receiptYear}</p>{" "}
          <span>{recipe.receiptDate}</span>
          <p>Стан збереження: {recipe.saveState}</p>
          <p>Опис предмета: {recipe.description}</p>
          <ul>
            <span> Матеріал, техніка: </span>
            {recipe.ingredients &&
              recipe.ingredients.map((ing) => <li key={ing}>{ing}</li>)}
          </ul>
          <p>Інвентарний номер: {recipe.inventoryNumber}</p>
          <p>Номер вступу: {recipe.admissionNumber}</p>
          <p>Місце зберігання: {recipe.storageLocation}</p>
          <p>Джерело надходження: {recipe.incomeSource}</p>
          <p>Нотатка: {recipe.note}</p>
          <p className="method">{recipe.опис}</p>
          {/* <button onClick={handleClick}>Редагувати</button> */}
        </>
      )}
    </div>
  );
}
