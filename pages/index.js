import Layout from "../comps/layout";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import Landing from "../src/LandingPage";
import SeekerHome from "../src/SeekerHome";
import CompanyHome from "../src/CompanyHome";
import { get } from "jquery";

const baseUrl = process.env.API_URL;

const Home = ({data}) => {
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


export async function getServerSideProps(context) {
  // Fetch data from external API
  const res = await fetch(baseUrl+"jobs", {
    method: get,
    headers: {
     // Authorization: "Bearer"+ " " + auth,
    },

  });
  const data = await res.json();

  
  return { props: { data } }
}

export default Home;
