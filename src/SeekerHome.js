import style from "../styles/pages/SeekerHome.module.scss";
import AuthContext from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import {MdKeyboardArrowDown} from 'react-icons/md';
import {BsBookmark} from 'react-icons/bs';
import{GoLocation} from 'react-icons/go';
import{SiMaterialdesignicons} from 'react-icons/si';
const baseUrl = process.env.API_URL;

const SeekerHome = (props) => {
  //state
  const { auth } = useContext(AuthContext);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  const getData = async () => {
    // Fetch data from external API
    const res = await fetch(baseUrl + "jobs", {
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
  }, []);

  return (
    <>
      {loading ? (
        <div>loading...</div>
      ) : (
        <div  className={style.box}>
          <span className={style.right}>
           <div>
          <h3 className={style.sort}>Sorted by</h3>
          
          <input className={style.filter} type="text" placeholder="Last Added" > 
           </input> <i className={style.arrowIcon}><MdKeyboardArrowDown/></i>
           </div>
          {posts.map((post) => (
            <div className={style.job} key={post._id}>
              
              <div className={style.jobImgContainer}>
             <img
            className={style.jobImg}
            alt="hey"
            src="assets/Landing/logo.png"
            
            
          />
          </div>
          
          <div className={style.informations}>
            <div className={style.postTitle}> {post.title} </div>
            <div className={style.job_type}> {post.job_type} </div>

            <div className={style.subInfo}>
            <div className={style.experience}> <i className={style.expIcon}><SiMaterialdesignicons/></i>{post.experience} </div>
            <div className={style.location}> <i className={style.locationIcon}><GoLocation/></i>{post.location} </div>
            </div>


            </div>
            <div className={style.lastSection} >
            <i className={style.bookmark}><BsBookmark/></i>
            <button
                className={`btn btn--global btn--small btn--blue ${style.btnDetails}`}
                type="submit"
              >
                Details 
              </button>
              </div>

            </div>
            
          ))}
          </span>
          {/*<span className={style.left}></span>*/}
          
         
        </div>
      )}
    </>
  );
};
export default SeekerHome;
