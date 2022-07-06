import { BsBookmark } from "react-icons/bs";
import { GoLocation } from "react-icons/go";
import { SiMaterialdesignicons } from "react-icons/si";

import { useRouter } from "next/router";


import style from "../styles/pages/SeekerHome.module.scss";

const JobDetails = ({ details, posts }) => {
    
   // const router = useRouter();
  //  console.log(router.asPath);
    
     return (

      
      <>
         <div className={style.box}>
           <span className={style.right}>
             <div>
               
   
             </div>
           
               <div className={style.job} >
                 <div className={style.jobImgContainer}>
                   <img
                     className={style.jobImg}
                     alt="hey"
                     src="/assets/Landing/logo.png"
                   />
                 </div>
   
                 <div className={style.informations}>
                  
                     <div className={style.postTitle}> {details.title} </div>
                   
                     <div className={style.postTitle}> {details["job title"]} </div>
                  
   
                   
                     <div className={style.job_type}> {details.job_type} </div>
                   
   
                  
                     <div className={style.subInfo}>
                       <div className={style.experience}>
                         {" "}
                         <i className={style.expIcon}>
                           <SiMaterialdesignicons />
                         </i>
                         {details.experience}{" "}
                       </div>
                       <div className={style.location}>
                         {" "}
                         <i className={style.locationIcon}>
                           <GoLocation />
                         </i>
                         {details.location}{" "}
                       </div>
                     </div>
                   
                 </div>
                 <div className={style.lastSection}>
                   <i className={style.bookmark}>
                     <BsBookmark />
                   </i>
   
                   <button
                     className={` btn--global btn--detail btn--blue ${style.btnDetails}`}
                     type="submit"
                   >
                     Save
                   </button>
                 </div>
                
                 <button
                     className={` btn--global btn--detail btn--blue ${style.btnDetails}`}
                     type="submit"
                   >
                     Apply
                   </button>
                   <p>helooooooo</p>
               </div>
               <p>helooooooo</p>
           </span>
         </div>

         <p>helooooooo</p>
       </>  
     );
   };

 
   export default JobDetails;
   