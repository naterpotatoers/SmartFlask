import { useRouter } from "next/router";

const User = () => {
  const router = useRouter();
  const { username } = router.query;
  const { flask } = router.query;

  return (
    <div>
      <p>User: {username}</p>
      <p>Flask: {flask}</p>
    </div>
  );
};

export default User;
