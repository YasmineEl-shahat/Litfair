import { useEffect, useContext, useState } from "react";
import Spinner from "../comps/Spinner";
import Jobs from "../comps/jobs";
import { ActivateBar } from "../functions/ActivateBar";
import {getData} from "../functions/Api/Savedjobs";

import Layout from "../comps/layout";
import AuthContext from "../context/AuthContext";
import style from "../styles/pages/empty.module.scss";
import Empty from "../comps/empty";


const Saved = () => {
  // state
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  const { auth } = useContext(AuthContext);

  // const getData = async () => {
  //   const resjob = await fetch(baseUrl + "jobs", {
  //     headers: {
  //       Authorization: "Bearer" + " " + auth,
  //     },
  //   });
  //   const jobJson = await resjob.json();
  //   const jobs = jobJson.msg[0].current_data;

  //   const res = await fetch(baseUrl + "seeker/saved-jobs", {
  //     headers: {
  //       Authorization: "Bearer" + " " + auth,
  //     },
  //   });
  //   const { msg } = await res.json();
  //   let saved = [];

  //   jobs.map((job) => (msg.includes(job._id) ? saved.push(job) : ""));
  //   console.log(saved);
  //   setPosts(saved);
  //   setLoading(false);
  // };

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
          
          <>{posts.length ? <Jobs posts={posts} /> :  
          <Empty 
          txt1={<p className={style.content1}>No Saved Opportunities Yet!</p>}
          txt2={<p className={style.content2}>Not ready to apply? Save the opportunities you are interested in.</p>}
          btn={<button className={`${style.btnEmpty}  btn--blue `}>Explore</button>}
          
          
          
          /> }</>
        </>
      )}
    </>
  );
};
Saved.getLayout = function getLayout(page) {
  return <Layout title="Saved Jobs">{page}</Layout>;
};
export default Saved;
