import { MdKeyboardArrowDown } from "react-icons/md";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { GoLocation } from "react-icons/go";
import { SiMaterialdesignicons } from "react-icons/si";
import { useEffect, useContext, useState } from "react";
import Link from "next/link";
import style from "../styles/pages/SeekerHome.module.scss";
import AuthContext from "../context/AuthContext";

const baseUrl = process.env.API_URL;

const Jobs = ({ posts }) => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  // const saved = localStorage.getItem("saved")
  //   ? JSON.parse(localStorage.getItem("saved"))
  //   : [];
  //hooks
  const { auth } = useContext(AuthContext);
  useEffect(async () => {
    //waiting for api response
    const res = await fetch(baseUrl + "applications/", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer" + " " + auth,
      },
    });
    const { msg } = await res.json();
    setAppliedJobs(msg);

    //setSavedJobs(saved);
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
                <Link
                  href={
                    appliedJobs.find((job) => job.job_post[0]._id === post._id)
                      ? `/applications/${
                          appliedJobs.find(
                            (job) => job.job_post[0]._id === post._id
                          )._id
                        }/`
                      : `/jobs/${post._id}`
                  }
                >
                  {post.title ? (
                    <div className={style.postTitle}> {post.title} </div>
                  ) : (
                    <div className={style.postTitle}> {post["job title"]} </div>
                  )}
                </Link>
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
                <i
                  onClick={() => {
                    let newSaved = savedJobs;
                    if (savedJobs.includes(post)) {
                      newSaved = newSaved.filter((saved) => saved !== post);
                    } else {
                      newSaved = [...newSaved, post];
                    }
                    setSavedJobs(newSaved);
                    localStorage.setItem("saved", JSON.stringify(newSaved));
                  }}
                  className={style.bookmark}
                >
                  { posts.includes(post) ? (
                    <BsBookmarkFill />
                  ) : (
                    <BsBookmark />
                  )}
                </i>

                <Link
                  href={
                    appliedJobs.find((job) => job.job_post[0]._id === post._id)
                      ? `/applications/${
                          appliedJobs.find(
                            (job) => job.job_post[0]._id === post._id
                          )._id
                        }/`
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
