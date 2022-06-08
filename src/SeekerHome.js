import style from "../styles/pages/SeekerHome.module.scss";
import AuthContext from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

import Jobs from "../comps/jobs";
const baseUrl = process.env.API_URL;

const SeekerHome = (props) => {
  //state
  const { auth } = useContext(AuthContext);
  const router = useRouter();
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
  return <>{loading ? <div>loading...</div> : <Jobs posts={posts} />}</>;
};
export default SeekerHome;
