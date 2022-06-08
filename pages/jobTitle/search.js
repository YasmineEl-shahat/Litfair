import { useRouter } from "next/router";
import Jobs from "../../comps/jobs";
const baseUrl = process.env.API_URL;


export async function getServerSideProps({ query }) {
    const res = await fetch(baseUrl + "/jobTitle/search");
  //  var { postTitle } = await res.json();
 //   postTitle = postTitle.filter((value) => {
 //    return value.name !== "";
//  });
    const searchQuery = query.search || "";
    const category = query.category || "";
  
    const jobRes = await fetch(
      baseUrl + "/jobTitle/search?search=" + searchQuery + "&category=" + category
    );
    const job = await jobRes.json();
    return {
      props: {searchQuery, category, job }, // will be passed to the page component as props
    };
  }
const Search=(props)=>{

    
    return(
        <>
        <Jobs/>
        </>
    )
}
export default Search;