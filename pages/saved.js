import { useEffect, useContext, useState } from "react";
import Spinner from "../comps/Spinner";
import Jobs from "../comps/jobs";
import { ActivateBar } from "../functions/ActivateBar";
import { getSaved, savedArray } from "../functions/Api/Savedjobs";

import Layout from "../comps/layout";
import AuthContext from "../context/AuthContext";

import Empty from "../comps/empty";

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

    getSaved(auth);
    let saved = [];

    jobs.map((job) => (savedArray.includes(job._id) ? saved.push(job) : ""));
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
          <>
            {posts.length ? (
              <Jobs posts={posts} />
            ) : (
              <Empty
                txt1="No Saved Opportunities Yet!"
                txt2="Not ready to apply? Save the opportunities you are interested in."
                btn="Explore"
                path="/"
              />
            )}
          </>
        </>
      )}
    </>
  );
};
Saved.getLayout = function getLayout(page) {
  return <Layout title="Saved Jobs">{page}</Layout>;
};
export default Saved;
