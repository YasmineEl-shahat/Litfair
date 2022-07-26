import Layout from "../../../comps/Layout";
import styleVid from "../../../styles/pages/Interview.module.scss";
import style from "../../../styles/pages/Applicants.module.scss";
import { Card } from "../../../comps/applicant-card";
import { useEffect, useContext, useState } from "react";
import AuthContext from "../../../context/AuthContext";
import FeedPop from "../../../comps/Popups/FeedPop";
import SurePop from "../../../comps/Popups/SurePop";
import SureDelPop from "../../../comps/Popups/SureDelpop";
import { showElement } from "../../../functions/showElement";
import { EnableBtn, disableBtn } from "../../../functions/ButtonsFun";
import { GoLocation } from "react-icons/go";
import SchedulePop from "../../../comps/Popups/schedule";
import { hideElement } from "../../../functions/hideElement";
import { changeState } from "../../../functions/Api/ApplicantsStates";

const baseUrl = process.env.API_URL;

const TopApplicants = () => {
  //state
  const [applicants, setApplicants] = useState([]);
  const [job_title, setJob_title] = useState("");
  const [job_type, setJob_type] = useState("");
  const [job_location, setJob_location] = useState("");
  const [feedbackPop, setFeedbackPop] = useState({});
  const [namePop, setNamePop] = useState("");
  const [select, setSelect] = useState([]);
  const [email_body, setEmail_body] = useState("");
  const [startDate, setStartDate] = useState([]);
  const [allPending, setAllPending] = useState(true);
  const [rejectId, setRejectId] = useState("");

  // hooks
  const { auth } = useContext(AuthContext);
  const getDetails = async () => {
    const path = history.state.as.substring(1);
    const res = await fetch(baseUrl + path, {
      headers: {
        Authorization: "Bearer" + " " + auth,
      },
    });
    const { msg } = await res.json();
    setApplicants(msg.applications);
    setJob_title(msg.job_title);
    setJob_type(msg.job_type);
    setJob_location(msg.job_location);

    for (let i = 0; i < msg.applications.length; i++) {
      if (msg.applications[i].user_state !== "pending") {
        setAllPending(false);
        break;
      }
    }
  };
  useEffect(async () => {
    getDetails();

    disableBtn("applybtn");
  }, []);

  //handlers;
  const SureHandler = async (e, btn_id, id) => {
    e.preventDefault();
    let newDate = startDate;
    let i = 0;
    while (i < select.length) {
      newDate = [...newDate, new Date()];
      i++;
    }
    setStartDate(newDate);
    hideElement(id);
    showElement("SchedulePop");
  };

  const rejectHandler = (e, btn_id, id) => {
    e.preventDefault();
    disableBtn(btn_id);
    changeState(history.state.as.substring(16), auth, rejectId, "rejected", "");
    getDetails();
    hideElement(id);
    EnableBtn(btn_id);
  };
  return (
    <>
      <main
        id="mainf"
        className={`container ${styleVid.mainCont} ${style.mainCont}`}
      >
        {" "}
        <article className={styleVid.questionCarCont}>
          {/* top header section */}
          <section className={style.Top}>
            <h2>{job_title}</h2>
            <div>
              <h6>
                <GoLocation /> {job_location}
              </h6>
              <h6>
                <i className="fa-regular fa-clock"></i> {job_type}
              </h6>
            </div>
          </section>
          {/* end top header section */}

          <section className={style.Head}>
            <h4>TOP {applicants.length} APPLICANTS</h4>
            <h5>Select who will do an interview with you!</h5>
            <article>
              {allPending && (
                <div className={style.selectAll}>
                  <h5>select all</h5>{" "}
                  <div
                    onClick={(e) => {
                      if (select === applicants) {
                        setSelect([]);
                        e.target.classList.remove("fa-check");
                        disableBtn("applybtn");
                      } else {
                        setSelect(applicants);
                        e.target.classList.add("fa-check");
                        EnableBtn("applybtn");
                      }
                    }}
                    className="selectbtn fa-solid "
                  ></div>
                </div>
              )}
            </article>
          </section>
          {/* cards wrapper section */}
          <section className={style.cardWrap}>
            {applicants.map((applicant) => (
              <div key={applicant._id}>
                <Card
                  applicant={applicant}
                  imgSrc={applicant.profile_picture}
                  name={applicant.fname + " " + applicant.lname}
                  rate={applicant.feedback_1.total_score}
                  applicationId={applicant._id}
                  feedback={applicant.feedback_1}
                  setFeedbackPop={setFeedbackPop}
                  setNamePop={setNamePop}
                  select={select}
                  setSelect={setSelect}
                  setRejectId={setRejectId}
                />
              </div>
            ))}
          </section>
          {/* end cards wrapper section */}
          <section className={style.Head}>
            <button
              id="applybtn"
              onClick={() => {
                showElement("sure");
              }}
              className={`btn--global btn--detail btn--blue ${style.apply}`}
            >
              Apply
            </button>
          </section>
        </article>
      </main>
      <FeedPop feedback={feedbackPop} name={namePop} />
      <SurePop
        submit="let's go"
        header={`${select.length} job seekers was selected`}
        content="let's schedule your interview hours"
        handler={SureHandler}
      />
      <SureDelPop
        content="Are you sure you want to reject this applicant?"
        submit="Reject"
        handler={rejectHandler}
      />
      <SchedulePop
        select={select}
        startDate={startDate}
        setStartDate={setStartDate}
        email_body={email_body}
        setEmail_body={setEmail_body}
        job_title={job_title}
        auth={auth}
      />
    </>
  );
};

TopApplicants.getLayout = function getLayout(page) {
  return <Layout title="Top Applicants">{page}</Layout>;
};

export default TopApplicants;
