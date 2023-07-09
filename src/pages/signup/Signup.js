import { useState } from "react";
import React from "react";
import { useSignup } from "../../components/hooks/useSignup";

//styles
import styles from "./Signup.module.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const { signup, isPending, error } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password, displayName);
  };
  return (
    <form onSubmit={handleSubmit} className={styles["signup-form"]}>
      <h2>Реєстрація</h2>
      <label>
        <span>Електронна адреса: </span>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        ></input>
      </label>

      <label>
        <span>Пароль: </span>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        ></input>
      </label>

      <label>
        <span>Відображення імені: </span>
        <input
          type="text"
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
        ></input>
      </label>
      {!isPending && <button className="btn">Зареєструватися</button>}
      {isPending && (
        <button className="btn" disabled>
          завантаження
        </button>
      )}
      {error && <p>{error}</p>}
    </form>
  );
}
