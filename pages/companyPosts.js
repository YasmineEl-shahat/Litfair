import AuthContext from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import Spinner from "../comps/Spinner";
import Jobs from "../comps/jobs";
import { ActivateBar } from "../functions/ActivateBar";
import Layout from "../comps/Layout";
import Empty from "../comps/empty";
import { postArray, getPosts } from "../functions/Api/posts";

const CompanyPosts = () => {
  const { auth } = useContext(AuthContext);

  // state
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  const getData = async () => {
    // Fetch data from external API
    await getPosts(auth);

    setPosts(postArray);

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
          {posts.length ? (
            <Jobs posts={posts} isCompany="true" />
          ) : (
            <Empty
              txt1="There is no posted jobs for now!"
              btn="Add New Post"
              path="/post-job"
              isCompany={true}
            />
          )}
        </>
      )}
    </>
  );
};
CompanyPosts.getLayout = function getLayout(page) {
  return <Layout title="Posts">{page}</Layout>;
};
export default CompanyPosts;
