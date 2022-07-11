import { useEffect,useContext, useState } from "react";
import Spinner from "../comps/Spinner";
import Jobs from "../comps/jobs";
import { ActivateBar } from "../functions/ActivateBar";
import Layout from "../comps/layout";
import AuthContext from "../context/AuthContext";



const baseUrl = process.env.API_URL;

const Saved = () => {
  // state
  const [loading, setLoading] = useState(true);
  const [savedJobs, setSavedJobs] = useState([]);
  const { auth } = useContext(AuthContext);

  // const getData = async () => {
  //   const saved = localStorage.getItem("saved")
  //     ? JSON.parse(localStorage.getItem("saved"))
  //     : [];
  //   setSavedJobs(saved);
  //   setLoading(false);
  // };
  
  const getData = async () => {
    
    const res = await fetch(baseUrl + "seeker/saved-jobs"
    , {
      headers: {
        Authorization: "Bearer" + " " + auth,
      },
    }
    );
    const { msg } = await res.json();

   console.log(msg);
    setSavedJobs(msg);


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
          <Jobs posts={savedJobs} />
        </>
      )}
    </>
  );
};
Saved.getLayout = function getLayout(page) {
  return <Layout title="Saved Jobs">{page}</Layout>;
};
export default Saved;
