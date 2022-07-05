import { MdKeyboardArrowDown } from "react-icons/md";
import { BsBookmark } from "react-icons/bs";
import { GoLocation } from "react-icons/go";
import { SiMaterialdesignicons } from "react-icons/si";
import { useEffect, useContext, useState } from "react";
import Link from "next/link";
import style from "../styles/pages/SeekerHome.module.scss";
import AuthContext from "../context/AuthContext";

const baseUrl = process.env.API_URL;

const Jobs = ({ posts }) => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  //hooks
  const { user } = useContext(AuthContext);
  useEffect(async () => {
    const user_id = user.id;
    //waiting for api response
    const res = await fetch(baseUrl + "seeker/details/view/" + user_id);
    const { appliedJobs } = await res.json();
    setAppliedJobs(appliedJobs);
  }, []);
  return (
    <>
      <div className={style.box}>
        <span className={style.right}>
          <div>
            <h3 className={style.sort}>Sorted by</h3>
            <input
              className={style.filter}
              type="text"
              placeholder="Last Added"
            ></input>{" "}
            <i className={style.arrowIcon}>
              <MdKeyboardArrowDown />
            </i>
          </div>
          {posts.map((post) => (
            <div className={style.job} key={post._id}>
              <div className={style.jobImgContainer}>
                <img
                  className={style.jobImg}
                  alt="hey"
                  src="/assets/Landing/logo.png"
                />
              </div>

              <div className={style.informations}>
                {post.title ? (
                  <div className={style.postTitle}> {post.title} </div>
                ) : (
                  <div className={style.postTitle}> {post["job title"]} </div>
                )}

                {post.job_type && (
                  <div className={style.job_type}> {post.job_type} </div>
                )}

                {post.experience && (
                  <div className={style.subInfo}>
                    <div className={style.experience}>
                      {" "}
                      <i className={style.expIcon}>
                        <SiMaterialdesignicons />
                      </i>
                      {post.experience}{" "}
                    </div>
                    <div className={style.location}>
                      {" "}
                      <i className={style.locationIcon}>
                        <GoLocation />
                      </i>
                      {post.location}{" "}
                    </div>
                  </div>
                )}
              </div>
              <div className={style.lastSection}>
                <i className={style.bookmark}>
                  <BsBookmark />
                </i>

                <Link
                  href={
                    appliedJobs.includes(post._id)
                      ? `/applications/62c36cfc9a87853f9499c2d2`
                      : `/jobs/${post._id}`
                  }
                >
                  <button
                    className={` btn--global btn--detail btn--blue ${style.btnDetails}`}
                    type="submit"
                  >
                    Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </span>
        {/* <span className={style.left}></span> */}
      </div>
    </>
  );
};
export default Jobs;
