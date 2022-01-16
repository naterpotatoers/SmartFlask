import { useState } from "react";
import styles from "../../styles/Home.module.css";

function Add() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("spicy");
  const updateSearch = (e: any) => {
    setSearch(e.target.value);
  };
  const getSearch = (e: any) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };
  return (
    <div className={styles.container}>
      <h2 className={styles.description}>New User</h2>
      <form
        action="http://localhost:5000/user"
        method="post"
        onSubmit={getSearch}
        className={styles.container}
      >
        <label className={styles.label} htmlFor="email">
          Email
        </label>
        <input className={styles.input} type="text" name="email" id="email" />
        <label className={styles.label} htmlFor="password">
          Password
        </label>
        <input
          className={styles.input}
          type="password"
          name="password"
          id="password"
        />
        <label className={styles.label} htmlFor="flask_name">
          Flask Name
        </label>
        <input
          className={styles.input}
          type="text"
          name="flask_name"
          id="flask_name"
        />

        <label className={styles.label} htmlFor="flask_size">
          Flask Size
        </label>
        <input
          className={styles.input}
          type="text"
          name="flask_size"
          id="flask_size"
        />

        <label className={styles.label} htmlFor="user_weight">
          User Weight
        </label>
        <input
          className={styles.input}
          type="text"
          name="user_weight"
          id="user_weight"
        />

        <label className={styles.label} htmlFor="user_height">
          User Height
        </label>
        <input
          className={styles.input}
          type="text"
          name="user_height"
          id="user_height"
        />

        <label className={styles.label} htmlFor="user_age">
          User Age
        </label>
        <input
          className={styles.input}
          type="text"
          name="user_age"
          id="user_age"
        />
        <label className={styles.label} htmlFor="dietary_restrictions">
          Dietary Restrictions
        </label>
        <input
          className={styles.input}
          type="text"
          name="dietary_restrictions"
          id="dietary_restrictions"
        />
        <label className={styles.label} htmlFor="daily_target_water_level">
          Daily Target Water Level
        </label>
        <input
          className={styles.input}
          type="text"
          name="daily_target_water_level"
          id="daily_target_water_level"
        />
        <button className={styles.button} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
  // TODO: Should be a web form for adding a new user
}

export default Add;
