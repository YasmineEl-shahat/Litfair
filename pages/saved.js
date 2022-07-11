import { useEffect, useContext, useState } from "react";
import Spinner from "../comps/Spinner";
import Jobs from "../comps/jobs";
import { ActivateBar } from "../functions/ActivateBar";
import Layout from "../comps/layout";
import AuthContext from "../context/AuthContext";

const baseUrl = process.env.API_URL;

const Saved = () => {
  // state
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  const { auth } = useContext(AuthContext);

  const getData = async () => {
    const resjob = await fetch(baseUrl + "jobs", {
      headers: {
        Authorization: "Bearer" + " " + auth,
      },
    });
    const jobJson = await resjob.json();
    const jobs = jobJson.msg[0].current_data;

    const res = await fetch(baseUrl + "seeker/saved-jobs", {
      headers: {
        Authorization: "Bearer" + " " + auth,
      },
    });
    const { msg } = await res.json();
    let saved = [];

    jobs.map((job) => (msg.includes(job._id) ? saved.push(job) : ""));
    console.log(saved);
    setPosts(saved);
    setLoading(false);
  };

  useEffect(() => {
    getData();
    ActivateBar("bar2");
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Jobs posts={posts} />
        </>
      )}
    </>
  );
};
Saved.getLayout = function getLayout(page) {
  return <Layout title="Saved Jobs">{page}</Layout>;
};
export default Saved;
