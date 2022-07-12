import Layout from "../../../comps/layout";
import styleVid from "../../../styles/pages/Interview.module.scss";
import style from "../../../styles/pages/Applicants.module.scss";
import { Card } from "../../../comps/applicant-card";
import { useEffect, useContext, useState } from "react";
import AuthContext from "../../../context/AuthContext";
import FeedPop from "../../../comps/Popups/FeedPop";
import SurePop from "../../../comps/Popups/SurePop";
import { showElement } from "../../../functions/showElement";
import { EnableBtn, disableBtn } from "../../../functions/ButtonsFun";
import { GoLocation } from "react-icons/go";

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
  };
  useEffect(async () => {
    getDetails();

    disableBtn("applybtn");
  }, []);

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
            </article>
          </section>
          {/* cards wrapper section */}
          <section className={style.cardWrap}>
            {applicants.map((applicant) => (
              <div key={applicant._id}>
                <Card
                  applicant={applicant}
                  imgSrc="/assets/profile/blank-profile-picture.png"
                  name={applicant.fname + " " + applicant.lname}
                  rate={applicant.feedback_1.total_score}
                  applicationId={applicant._id}
                  feedback={applicant.feedback_1}
                  setFeedbackPop={setFeedbackPop}
                  setNamePop={setNamePop}
                  select={select}
                  setSelect={setSelect}
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
      />
    </>
  );
};

TopApplicants.getLayout = function getLayout(page) {
  return <Layout title="Top Applicants">{page}</Layout>;
};

export default TopApplicants;
