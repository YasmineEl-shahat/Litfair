import { GoLocation } from "react-icons/go";
import { SiMaterialdesignicons } from "react-icons/si";
import { BsCheck2 } from "react-icons/bs";

import { useEffect, useContext, useState } from "react";

import Layout from "../../comps/layout";
import AuthContext from "../../context/AuthContext";
import style from "../../styles/pages/SeekerHome.module.scss";
import styleProg from "../../styles/pages/Progress.module.scss";
import Spinner from "../../comps/Spinner";

const baseUrl = process.env.API_URL;

const JobProgress = () => {
  const { auth } = useContext(AuthContext);

  //state
  const [detail, setDetail] = useState({});
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(true);

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
    setLoading(false);
  };
  useEffect(async () => {
    getDetails();
  }, []);

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
            {progress.Cv_scanned && !progress.Live_inter && (
              <button
                className={`btn--global btn--blue btn--detail ${styleProg.btn}`}
              >
                Go To Interview
              </button>
            )}
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
    </>
  );
};

JobProgress.getLayout = function getLayout(page) {
  return <Layout title="Job Progress">{page}</Layout>;
};
export default JobProgress;
