import AuthContext from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import Spinner from "../comps/Spinner";
import Jobs from "../comps/jobs";
import { ActivateBar } from "../functions/ActivateBar";
import Layout from "../comps/Layout";
import Empty from "../comps/empty";

const baseUrl = process.env.API_URL;

const Applications = () => {
  //hooks
  const { auth } = useContext(AuthContext);

  // state
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  // call backend to retrieve jobs
  const getData = async () => {
    // Fetch data from external API
    const res = await fetch(baseUrl + "applications", {
      headers: {
        Authorization: "Bearer" + " " + auth,
      },
    });
    const { msg } = await res.json();

    const jobPosts = msg.map((post) => post.job_post[0]);

    setPosts(jobPosts);
    setLoading(false);
  };

  useEffect(() => {
    getData();
    ActivateBar("bar3");
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {posts.length ? (
            <Jobs posts={posts} />
          ) : (
            <Empty
              txt1="Start exploring jobs now and find your next opportunity"
              txt2="Start exploring jobs now and find your next opportunity"
              btn="Explore"
              path="/"
            />
          )}
        </>
      )}
    </>
  );
};
Applications.getLayout = function getLayout(page) {
  return <Layout title="Applications">{page}</Layout>;
};
export default Applications;
