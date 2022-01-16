import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import styles from "../styles/Home.module.css";

function Leaderboard() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5000/flask/leaderboard")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
        console.log(data);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Leaderboard</h2>
      <div className={styles.description}>
        <h3>1st. flask_one - 42oz consumed</h3>
        <p>2. flask_two - 20oz consumed</p>
        <p>3. flask_three - 10oz consumed</p>
      </div>
    </div>
  );
}

export default Leaderboard;
