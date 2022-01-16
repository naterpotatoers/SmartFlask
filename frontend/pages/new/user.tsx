import styles from "../../styles/Home.module.css";

function Add() {
  return (
    <div className={styles.container}>
      <h2 className={styles.description}>New User</h2>
      <form action="http://localhost:5000/user" method="post"></form>
    </div>
  );
  // TODO: Should be a web form for adding a new user
}

export default Add;
