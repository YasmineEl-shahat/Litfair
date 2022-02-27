import { useEffect } from "react";
import { useRouter } from "next/router";
const NotFound = () => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 3000);
  }, [router]);
  return (
    <>
      <h1>Oppps....</h1>
      <h2>This page can not be found</h2>
      <p>Back to homepage</p>
    </>
  );
};

export default NotFound;
