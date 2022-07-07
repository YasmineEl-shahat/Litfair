import { GoLocation } from "react-icons/go";
import { SiMaterialdesignicons } from "react-icons/si";

import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useContext, useState } from "react";

import Layout from "../../comps/layout";
import AuthContext from "../../context/AuthContext";
import style from "../../styles/pages/SeekerHome.module.scss";
import Spinner from "../../comps/Spinner";

const baseUrl = process.env.API_URL;

const JobProgress = () => {
  const { auth } = useContext(AuthContext);
  const router = useRouter();

  //state
  const [detail, setDetail] = useState({});
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

          <div className={style.boxDetails}>
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
                <h3 className="circlebef"> Job Requirments</h3>
              </div>
            </div>
            <div>
              <pre>{detail.requirements}</pre>
            </div>
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
