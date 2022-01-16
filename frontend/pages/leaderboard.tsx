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
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h1>{data[0].flask_name}</h1>
      <p>{data[1].flask_name}</p>
    </div>
  );
}

export default Leaderboard;
