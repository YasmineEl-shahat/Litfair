

import { useRouter } from "next/router";
import JobDetails from "../../comps/JobDetails";


const baseUrl = process.env.API_URL;

{/*export const getStaticPaths = async () => {
    const res = await fetch( baseUrl + "/jobs");
    const data = await res.json();
    const paths = data.map((coder) =>{
    return{
        params: {id : coder.id.toString() },
    };
});
return{
    paths,
    fallback: false
};
};
*/}



const id = ({coder }) => {
    
 const router = useRouter();
 console.log(router.asPath);
 
  return (
 
   <>
     <JobDetails details={coder}/>

    
    </>  
  );
};


export const getStaticPros = async  (context) =>
{
 const ids = context.params.ids;
 const res = await fetch( baseUrl + "/jobs/:id" + ids);
 const data = await res.json();

 return{
   // props:{_id}
    props:{coder: data}
 }
};
export default id;


// arr = ["women", "kids", "men"]

// arr.map((ele, indx) => {console.log(indx);})
// 0
// 1
// 2


// [html, css, js]

// html - css - js.
// arr.map((ele, indx) => {<p>{indx === arr.length - 1 ? ele - : ele .}</p>})
