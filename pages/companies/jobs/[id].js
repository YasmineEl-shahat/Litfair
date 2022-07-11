import Layout from "../../../comps/layout";
import styleVid from "../../../styles/pages/Interview.module.scss";
import style from "../../../styles/pages/Applicants.module.scss";
import { Card } from "../../../comps/applicant-card";
import { useEffect, useContext, useState } from "react";
import AuthContext from "../../../context/AuthContext";
import FeedPop from "../../../comps/Popups/FeedPop";

const baseUrl = process.env.API_URL;

const TopApplicants = () => {
  //state
  const [applicants, setApplicants] = useState([]);
  const [feedbackPop, setFeedbackPop] = useState({});
  const [namePop, setNamePop] = useState("");
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
    setApplicants(msg);
  };
  useEffect(async () => {
    getDetails();
  }, []);

  return (
    <>
      <main
        id="mainf"
        className={`container ${styleVid.mainCont} ${style.mainCont}`}
      >
        {" "}
        <article className={styleVid.questionCarCont}>
          <section className={style.cardWrap}>
            {applicants.map((applicant) => (
              <div key={applicant._id}>
                <Card
                  imgSrc="/assets/profile/blank-profile-picture.png"
                  name={applicant.fname + " " + applicant.lname}
                  rate={applicant.feedback_1.total_score}
                  applicationId={applicant._id}
                  feedback={applicant.feedback_1}
                  setFeedbackPop={setFeedbackPop}
                  setNamePop={setNamePop}
                />
              </div>
            ))}
          </section>
        </article>
      </main>
      <FeedPop feedback={feedbackPop} name={namePop} />
    </>
  );
};

TopApplicants.getLayout = function getLayout(page) {
  return <Layout title="Top Applicants">{page}</Layout>;
};

export default TopApplicants;
