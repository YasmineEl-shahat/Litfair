import { useEffect, useState } from "react";
import Spinner from "../comps/Spinner";
import Jobs from "../comps/jobs";
import { ActivateBar } from "../functions/ActivateBar";
import Layout from "../comps/layout";

const Saved = () => {
  // state
  const [loading, setLoading] = useState(true);
  const [savedJobs, setSavedJobs] = useState([]);
  const getData = async () => {
    const saved = localStorage.getItem("saved")
      ? JSON.parse(localStorage.getItem("saved"))
      : [];
    setSavedJobs(saved);
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
