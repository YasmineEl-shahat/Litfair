import AuthContext from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import Spinner from "../comps/Spinner";
import Jobs from "../comps/jobs";

const baseUrl = process.env.API_URL;

const SeekerHome = () => {
  //hooks
  const { auth } = useContext(AuthContext);

  // state
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  // call backend to retrieve jobs
  const getData = async () => {
    // Fetch data from external API
    const res = await fetch(baseUrl + "jobs", {
      headers: {
        Authorization: "Bearer" + " " + auth,
      },
    });
    const { msg } = await res.json();

    setPosts(msg[0].current_data);

    setLoading(false);
  };

  useEffect(() => {
    getData();
    ActivateBar("bar1");
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
export default SeekerHome;
