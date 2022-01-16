import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const User = () => {
  const router = useRouter();
  const { username } = router.query;
  const { flask } = router.query;

  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5000/flask")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!username) return <p>No username data</p>;
  if (!flask) return <p>No flask data</p>;
  console.log(data);
  return (
    <div>
      <p>User: {username}</p>
      <p>Flask: {flask}</p>
      <p>{data.title}</p>
      <p>{data.userId}</p>
    </div>
  );
};

export default User;
