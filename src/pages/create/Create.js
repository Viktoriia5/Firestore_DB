import { useEffect, useRef, useState } from "react";
import { projectFirestore } from "../../firebase/config";
import React from "react";
import { useHistory } from "react-router-dom";
//styles
import "./Create.css";

export default function Create() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [receiptYear, setReceiptYear] = useState("");
  const [saveState, setSaveState] = useState("");
  const [description, setDescription] = useState("");
  const [inventoryNumber, setInventoryNumber] = useState("");
  const [admissionNumber, setAdmissionNumber] = useState("");
  const [storageLocation, setStorageLocation] = useState("");
  const [incomeSource, setIncomeSource] = useState("");
  const [note, setNote] = useState("");
  // const [cookingTime, setCookingTime] = useState("");
  const [material, setMaterial] = useState("");
  const [size, setSize] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const ingredientInput = useRef(null);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const doc = {
      title,
      author,
      receiptYear,
      saveState,
      description,
      material,
      inventoryNumber,
      admissionNumber,
      ingredients,
      storageLocation,
      incomeSource,
      note,
      size,
    };
    try {
      await projectFirestore.collection("Речі").add(doc);
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const ing = material.trim();

    if (ing && !ingredients.includes(ing)) {
      setIngredients((prevIngredients) => [...prevIngredients, material]);
    }
    setMaterial("");
    ingredientInput.current.focus();
  };

  return (
    <div className="create">
      <h2 className="page-title">Додати нову одиницю</h2>

      <form onSubmit={handleSubmit}>
        {/* НАЗВА */}
        <label>
          <span>Назва предмету</span>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          ></input>
        </label>

        {/* АВТОР */}
        <label>
          <span>Автор</span>
          <input
            type="text"
            onChange={(e) => setAuthor(e.target.value)}
            value={author}
          ></input>
        </label>

        {/* РІК НАДХОДЖЕННЯ */}
        <label>
          <span>Рік надходження</span>
          <input
            type="text"
            onChange={(e) => setReceiptYear(e.target.value)}
            value={receiptYear}
          ></input>
        </label>

        {/* СТАН ЗБЕРЕЖЕННЯ */}
        <label>
          <span>Стан збереження</span>
          <input
            type="text"
            onChange={(e) => setSaveState(e.target.value)}
            value={saveState}
          ></input>
        </label>

        {/* ОПИС ПРЕДМЕТУ */}
        <label>
          <span>Опис предмета</span>
          <textarea
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          ></textarea>
        </label>

        {/* МАТЕРІАЛ ТЕХНІКА! */}
        <label>
          <span>Матеріал, техніка:</span>
          <div className="ingredients">
            <input
              type="text"
              onChange={(e) => setMaterial(e.target.value)}
              value={material}
              ref={ingredientInput}
            ></input>
            <button onClick={handleAdd} className="btn">
              додати
            </button>
          </div>
        </label>
        <p>
          додані матеріали та техніка:{" "}
          {ingredients.map((i) => (
            <em key={i}>{i}, </em>
          ))}
        </p>

        {/*ІНВЕНТАРНИЙ НОМЕР */}
        <label>
          <span>Інвентарний номер</span>
          <input
            type="number"
            onChange={(e) => setInventoryNumber(e.target.value)}
            value={inventoryNumber}
          ></input>
        </label>

        {/*НОМЕР ВСТУПУ*/}
        <label>
          <span>Номер вступу</span>
          <input
            type="number"
            onChange={(e) => setAdmissionNumber(e.target.value)}
            value={admissionNumber}
          ></input>
        </label>

        {/*МІСЦЕ ЗБЕРІГАННЯ*/}
        <label>
          <span>Місце зберігання</span>
          <input
            type="text"
            onChange={(e) => setStorageLocation(e.target.value)}
            value={storageLocation}
          ></input>
        </label>

        {/* <label>
          <span>Опис:</span>
          <textarea
            onChange={(e) => setMethod(e.target.value)}
            value={method}
            required
          ></textarea>
        </label> */}

        {/* <label>
          <span>Рік надходження:</span>
          <input
            type="number"
            onChange={(e) => setCookingTime(e.target.value)}
            value={cookingTime}
            required
          ></input>
        </label> */}

        <label>
          <span>Джерело надходження:</span>
          <input
            type="text"
            onChange={(e) => setIncomeSource(e.target.value)}
            value={incomeSource}
            required
          ></input>
        </label>
        <label>
          <span>Розмір, вага: </span>
          <input
            type="text"
            onChange={(e) => setSize(e.target.value)}
            value={size}
            required
          ></input>
        </label>

        <label>
          <span>Примітка: </span>
          <textarea
            type="text"
            onChange={(e) => setNote(e.target.value)}
            value={note}
            required
          ></textarea>
        </label>

        <button className="btn">Додати</button>
      </form>
    </div>
  );
}
