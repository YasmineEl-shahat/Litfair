import Layout from "../comps/layout";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import Landing from "../src/LandingPage";
import SeekerHome from "../src/SeekerHome";
import CompanyHome from "../src/CompanyHome";


const Home = () => {
    const { user } = useContext(AuthContext);
  return ( 
    <>
    {user ? (
      user.role === "Seeker" ?
       (
        <SeekerHome/>
      ) 
      :
      (
        <CompanyHome/>
      ) 

  
    ):
    ( 
      <Landing />
      )
    }
    </>
  );
};

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Home;
