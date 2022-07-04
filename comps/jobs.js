import { MdKeyboardArrowDown } from "react-icons/md";
import { BsBookmark } from "react-icons/bs";
import { GoLocation } from "react-icons/go";
import { SiMaterialdesignicons } from "react-icons/si";
import style from "../styles/pages/SeekerHome.module.scss";
import Link from "next/link";

const Jobs = ({ posts }) => {
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

                <Link href={`/jobs/${post._id}`}>
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
