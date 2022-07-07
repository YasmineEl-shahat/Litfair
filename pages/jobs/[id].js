import { BsBookmark } from "react-icons/bs";
import { GoLocation } from "react-icons/go";
import { SiMaterialdesignicons } from "react-icons/si";

import { useRouter } from "next/router";

import { useEffect, useContext, useState } from "react";

import Layout from "../../comps/layout";
import AuthContext from "../../context/AuthContext";
import style from "../../styles/pages/SeekerHome.module.scss";
import Spinner from "../../comps/Spinner";
//import JobDetails from "../../comps/JobDetails";


const baseUrl = process.env.API_URL;



{/*export const  getStaticPaths = async() => 
{
 
 const res = await fetch( baseUrl + "/jobs" );
 const data = await res.json();
 
 const paths =   Object.keys(data).map(details => {
  
  return{
    params: { id: details.id.toString() }

  }
 })
 return{
  paths,
  fallback: false

 }
}
 export const getStaticProps = async(context) => {
  const id = context.params.id;
  const res = await fetch( baseUrl + "/jobs" +id );
  const data = await res.json();
  return{
    props: {details: data}
  }
 

 }
*/}


const jobDetails = () => {
    
  const { auth } = useContext(AuthContext);
  const router = useRouter();
  const [detail, setDetail] = useState({});
  const [loading, setLoading] = useState(true);
  
  
  
  const getDetails = async () => {
  
   const path =  router.asPath.substring(1);
  
    const res = await fetch(baseUrl + path, {
      headers: {
        Authorization: "Bearer" + " " + auth,
      },
    });
    const {msg} = await res.json();
  console.log(msg);
  
  
    setDetail(msg);
  
    setLoading(false);
  };
  useEffect(() => {
    getDetails();
  }, [router]);

 
 
  return (
    loading ? (
      <Spinner />
    ) : (
   <>
 {/*  <JobDetails details={ids}/>*/}

         <div className={style.box}>
           <span className={style.right}>
             <div>
               
   
             </div>
           
               <div className={style.boxDetails} >
                 <div className={style.jobImgContainer}>
                   <img
                     className={style.jobImg}
                     alt="hey"
                     src="/assets/Landing/logo.png"
                   />
                 </div>
   
                 <div className={style.informations}>
                  
                     <div className={style.postTitle}> {detail.title} </div>
                   
                     <div className={style.postTitle}> {detail["job title"]} </div>
                  
   
                   
                     <div className={style.job_type}> {detail.job_type} </div>
                   
   
                  
                     <div className={style.subInfo}>
                       <div className={style.experience}>
                         {" "}
                         <i className={style.expIcon}>
                           <SiMaterialdesignicons />
                         </i>
                         {detail.experience}{" "}
                       </div>
                       <div className={style.location}>
                         {" "}
                         <i className={style.locationIcon}>
                           <GoLocation />
                         </i>
                         {detail.location}{" "}
                       </div>
                     </div>
                   
                 </div>
                
                 <div >
                 <button
                     className={` btn--global btn--detail btn--save ${style.btnSave}`}
                     type="submit"
                   >
                     Save
                   </button>
                
                 <button
                     className={` btn--global btn--detail btn--blue ${style.btnDetails}`}
                     type="submit"
                   >
                    Apply
                   </button>
                   </div>
              
               </div>
              
               <div className={style.boxDetails} >
               <div className="">
               <div>
               <h3 className="circlebef"> Job Discription</h3> 
               </div>
          </div>
          
          <pre>{detail.description }</pre>
          
               </div>
               
               <div className={style.boxDetails} >
               <div className="">
               <div>
               <h3 className="circlebef"> Job Requirments</h3> 
               </div>
          </div>
          <div>
          <pre>{detail.requirements }</pre>
          </div>
               </div>
           </span>
         </div>

      

    
    </>  )
    
      );

    }


jobDetails.getLayout = function getLayout(page) {
    return <Layout title="Job Details">{page}</Layout>;
  };
export default jobDetails;


// arr = ["women", "kids", "men"]

// arr.map((ele, indx) => {console.log(indx);})
// 0
// 1
// 2


// [html, css, js]

// html - css - js.
// arr.map((ele, indx) => {<p>{indx === arr.length - 1 ? ele - : ele .}</p>})
