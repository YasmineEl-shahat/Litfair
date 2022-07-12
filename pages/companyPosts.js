
import AuthContext from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import Spinner from "../comps/Spinner";
import Jobs from "../comps/jobs";
import { ActivateBar } from "../functions/ActivateBar";


const baseUrl = process.env.API_URL;

const CompanyPosts=()=>{

    const { auth } = useContext(AuthContext);

    // state
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);
  
    
    const getData = async () => {
      // Fetch data from external API
      const res = await fetch(baseUrl + "companies/jobs", {
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
     // ActivateBar("bar1");
    }, []);


    return(
        <>
{loading ? (
        <Spinner />
      ) : (
        <>
          <Jobs posts={posts} isCompany="true" />
        </>
      )}
        </>
    )
}
export default CompanyPosts;