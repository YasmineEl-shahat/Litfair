import { GoLocation } from "react-icons/go";
import { SiMaterialdesignicons } from "react-icons/si";

import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useContext, useState } from "react";

import Layout from "../../comps/layout";
import AuthContext from "../../context/AuthContext";
import style from "../../styles/pages/SeekerHome.module.scss";
import Spinner from "../../comps/Spinner";

import SurePop from "../../comps/Popups/SurePop";
import CVPop from "../../comps/Popups/CVPop";
import ScreenPop from "../../comps/Popups/ScreenPop";
import SuccessPop from "../../comps/Popups/SuccessPop";
import { hideElement } from "../../functions/hideElement";
import { showElement } from "../../functions/showElement";
import { disableBtn, EnableBtn } from "../../functions/ButtonsFun";
import { getSaved, savedArray, SaveJob } from "../../functions/Api/Savedjobs";

const baseUrl = process.env.API_URL;

const JobDetails = () => {
  const { auth, user } = useContext(AuthContext);
  const router = useRouter();

  //state
  const [detail, setDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [cvName, setCVName] = useState("");
  const [cv_url, setCv_url] = useState("");
  const [cvError, setCVError] = useState("");
  const [screenError, setScreenError] = useState("");
  const [text_questions, setText_questions] = useState([]);
  const [text_answers, setText_answers] = useState([]);
  const [application_id, setApplication_id] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  const getDetails = async () => {
    // const path = router.asPath.substring(1);
    const path = history.state.as.substring(1);

    const res = await fetch(baseUrl + path, {
      headers: {
        Authorization: "Bearer" + " " + auth,
      },
    });
    const { msg } = await res.json();

    setDetail(msg);

    await getSaved(auth);
    if (savedArray.includes(msg._id)) setIsSaved(true);
    setLoading(false);
  };
  useEffect(async () => {
    await getDetails();
  }, [router]);

  //handlers;

  const ApplyHandler = async (e, btn_id, id) => {
    e.preventDefault();
    disableBtn(btn_id);
    const user_id = user.id;

    // waiting for api response
    const res = await fetch(baseUrl + "seeker/details/view/" + user_id);
    const { CV } = await res.json();
    if (CV) {
      setCVName(CV.fileName.split("$")[0] + ".pdf");
      setCv_url(CV.fileUrl);
    }
    hideElement(id);
    EnableBtn(btn_id);
    showElement("CVpop");
  };

  const CVHandler = async (e, btn_id, id) => {
    e.preventDefault();
    if (!cv_url) {
      setCVError("An updated Resume must be included!");
      return;
    }
    setCVError("");
    disableBtn(btn_id);

    setText_questions(detail.application.text_questions);
    hideElement(id);
    EnableBtn(btn_id);
    showElement("ScreenPop");
  };

  const ScreenHandler = async (e, btn_id, id) => {
    e.preventDefault();
    if (text_answers.length === 0) {
      setScreenError("Please answer the required questions!");
      return;
    }
    disableBtn(btn_id);
    //waiting for api response
    let response = await fetch(baseUrl + `applications/${detail._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer" + " " + auth,
      },
      body: JSON.stringify({
        text_question: text_questions,
        text_answers,
        cv_url,
      }),
    })
      .then(async (response) => {
        if (response.ok) {
          setScreenError("");
          const res = await response.json();
          const { msg } = await res;
          console.log(msg);
          setApplication_id(msg.applicatoin._id);
          EnableBtn(btn_id);
          hideElement(id);
          showElement("successPop");
        } else {
          const res = await response.json();
          const { msg } = await res;
          setScreenError(msg);
          EnableBtn(btn_id);
          throw new Error(msg);
        }
      })

      .catch((e) => {
        console.log(e);
      });
  };

  // submittion
  const uploadCV = ({ target: { files } }) => {
    const extension = files[0].name.split(".")[1];
    if (extension !== "pdf") {
      setCVError("Only pdf files are allowed!");
      return;
    }
    disableBtn("cvl");
    let data = new FormData();
    data.append("file", files[0]);
    const options = {
      headers: {
        Authorization: "Bearer" + " " + auth,
        "Content-Type": "multipart/form-data",
      },
    };

    axios
      .post(baseUrl + "upload-file", data, options)
      .then((res) => {
        setCVError("");
        const { data } = res;
        setCVName(data.msg.original_name);
        setCv_url(data.msg.file_url);
        EnableBtn("cvl");
      })
      .catch((err) => {
        console.log(err);
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
              {detail.job_type && (
                <div className={style.job_type}> {detail.job_type} </div>
              )}
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
            {isSaved ? (
              <div
                className={` btn--global btn--detail btn--save ${style.btnSave}`}
              >
                Saved
              </div>
            ) : (
              <button
                className={` btn--global btn--detail btn--save ${style.btnSave}`}
                onClick={() => {
                  setIsSaved(true);
                  SaveJob(auth, detail.id);
                }}
              >
                Save
              </button>
            )}

            <button
              className={` btn--global btn--detail btn--blue ${style.btnDetails}`}
              onClick={(e) => {
                e.preventDefault();
                showElement("sure");
              }}
            >
              Apply
            </button>
          </div>

          <div className={style.boxDetails}>
            <div className="">
              <div>
                <h3 className="circlebef"> Job Discription</h3>
              </div>
            </div>

            <pre className={style.detailcontent}>{detail.description}</pre>
          </div>

          <div className={style.boxDetails}>
            <div className="">
              <div>
                <h3 className="circlebef"> Job Requirements</h3>
              </div>
            </div>
            <ul className={style.detailcontent}>
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
            <ul className={style.detailcontent}>
              {detail.skills_tools.map((req) => (
                <li key={req}>{req}</li>
              ))}
            </ul>
          </div>
        </span>
      </div>
      {/* job details popups */}
      <SurePop
        header="Apply for job"
        content="Are you sure you want to apply to this job?"
        submit="Apply"
        handler={ApplyHandler}
      />
      <CVPop
        header={`Apply To ${detail.title}`}
        name={cvName}
        submit="Next"
        link={cv_url}
        uploadCV={uploadCV}
        handler={CVHandler}
        error={cvError}
      />
      <ScreenPop
        header={`Apply To ${detail.title}`}
        text_questions={text_questions}
        text_answers={text_answers}
        setText_answers={setText_answers}
        handler={ScreenHandler}
        error={screenError}
      />
      <SuccessPop
        content={`Your application was sent to ${detail.title}!`}
        submit="Track Application"
        application_id={application_id}
      />
    </>
  );
};

JobDetails.getLayout = function getLayout(page) {
  return <Layout title="Job Details">{page}</Layout>;
};
export default JobDetails;
