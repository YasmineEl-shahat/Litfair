import AuthContext from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";

import Spinner from "../comps/Spinner";
import Jobs from "../comps/jobs";
import SurePop from "../comps/SurePop";
const baseUrl = process.env.API_URL;

const SeekerHome = () => {
  //state
  const { auth } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  const getData = async () => {
    // Fetch data from external API
    const res = await fetch(baseUrl + "jobs", {
      headers: {
        Authorization: "Bearer" + " " + auth,
      },
    });
    const { msg } = await res.json();

    setPosts(msg);
    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Jobs posts={posts} />
          <SurePop
            header="Apply for job"
            content="Are you sure you want to apply to this job?"
            submit="Apply"
          />
        </>
      )}
    </>
  );
};
export default SeekerHome;
