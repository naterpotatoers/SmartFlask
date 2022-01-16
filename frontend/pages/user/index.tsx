import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Chart } from "../../components/chart";
import { Line } from "react-chartjs-2";

import styles from "../../styles/Home.module.css";

function createGraph(data: any, label: string, dates: any) {
  const graphInfo = {
    labels: dates,
    datasets: [
      {
        label: label,
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: data,
      },
    ],
  };
  return graphInfo;
}

const User = () => {
  const router = useRouter();
  let { flask } = router.query;
  if (flask) flask = flask.slice(1, -1);

  const [response, SetResponse] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/flask/flask_one`)
      .then((res) => res.json())
      .then((data) => {
        SetResponse(data);
      });
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.description}>{flask}</h2>
      <Line
        data={createGraph(
          response.WATER_CONSUMED,
          "Daily Water Consumption",
          response.DATES
        )}
        width={400}
        height={200}
      />
    </div>
  );
};

export default User;
