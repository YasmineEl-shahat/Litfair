import { GoLocation } from "react-icons/go";
import { SiMaterialdesignicons } from "react-icons/si";
import { BsCheck2 } from "react-icons/bs";
import { useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Layout from "../../comps/layout";
import AuthContext from "../../context/AuthContext";
import style from "../../styles/pages/SeekerHome.module.scss";
import styleProg from "../../styles/pages/Progress.module.scss";
import Spinner from "../../comps/Spinner";
import SurePop from "../../comps/Popups/SurePop";
import { disableBtn, EnableBtn } from "../../functions/ButtonsFun";
import { hideElement } from "../../functions/hideElement";
import { showElement } from "../../functions/showElement";
import Link from "next/link";

const baseUrl = process.env.API_URL;

const JobProgress = () => {
  //state
  const [detail, setDetail] = useState({});
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState("");

  // hooks
  const { auth } = useContext(AuthContext);
  const router = useRouter();

  const getDetails = async () => {
    const path = history.state.as.substring(1);
    const res = await fetch(baseUrl + path, {
      headers: {
        Authorization: "Bearer" + " " + auth,
      },
    });
    const { msg } = await res.json();

    setDetail(msg[0].job_post);
    setProgress(msg[0].progress);
    setId(msg[0]._id);
    setLoading(false);
  };

  useEffect(async () => {
    getDetails();
  }, []);

  // helper fun
  const DeleteApp = async (e, btn_id, id) => {
    e.preventDefault();
    disableBtn(btn_id);

    const path = history.state.as.substring(1);

    // waiting for api response
    const options = { headers: { Authorization: "Bearer" + " " + auth } };

    axios.delete(baseUrl + path, options).then((res) => {
      hideElement(id);
      EnableBtn(btn_id);
      router.replace("/");
    });
  };
  return loading ? (
    <Spinner />
  ) : (
    <>
      <div className={style.box}>
        <span className={style.right}>
          <div></div>

          <div className={`${style.boxDetails} ${style.detailTop}`}>
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
          </div>
          <div className={style.boxDetails}>
            <h3 className="circlebef"> Track Application</h3>
            <section className={styleProg.progress}>
              {Object.keys(progress).map((key) =>
                progress[key] ? (
                  <div key={key}>
                    <p className={styleProg.complete}>
                      <BsCheck2 />
                    </p>
                    <h5>{key}</h5>
                  </div>
                ) : (
                  <article key={key}>
                    <p></p>
                    <h5>{key}</h5>
                  </article>
                )
              )}
            </section>
            <div className={styleProg.btn}>
              {!progress.Live_inter && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    showElement("sure");
                  }}
                  className="btn--cancel btn--remove"
                >
                  Decline
                </button>
              )}

              {progress.Cv_scanned && !progress.Live_inter && (
                <Link
                  href={{
                    pathname: "/application/interview/",
                    query: { id },
                  }}
                  passHref
                >
                  <button className={`btn--global btn--blue btn--detail `}>
                    Go To Interview
                  </button>
                </Link>
              )}
              {progress.feedback_1 && (
                <Link
                  href={{
                    pathname: "/feed",
                    query: { id },
                  }}
                  passHref
                >
                  <button className={`btn--global btn--blue btn--detail `}>
                    View FeedBack1
                  </button>
                </Link>
              )}
            </div>
          </div>

          <div className={style.boxDetails}>
            <div className="">
              <div>
                <h3 className="circlebef"> Job Discription</h3>
              </div>
            </div>

            <pre>{detail.description}</pre>
          </div>

          <div className={style.boxDetails}>
            <div className="">
              <div>
                <h3 className="circlebef"> Job Requirements</h3>
              </div>
            </div>
            <ul>
              {detail.requirements.map((req) => (
                <li key={req}>{req}</li>
              ))}
            </ul>
          </div>
          <div className={style.boxDetails}>
            <div className="">
              <div>
                <h3 className="circlebef"> Skills</h3>
              </div>
            </div>
            <ul>
              {detail.skills_tools.map((req) => (
                <li key={req}>{req}</li>
              ))}
            </ul>
          </div>
        </span>
      </div>
      <SurePop
        header="Delete your application"
        content="Are you sure you want to delete your application to this job?"
        submit="Delete"
        handler={DeleteApp}
      />
    </>
  );
};

JobProgress.getLayout = function getLayout(page) {
  return <Layout title="Job Progress">{page}</Layout>;
};
export default JobProgress;
