import Layout from "../comps/Layout";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import styleVid from "../styles/pages/Interview.module.scss";
import style from "../styles/pages/Feedback.module.scss";
import Feedback from "../src/Feedback";

const baseUrl = process.env.API_URL;

export const getServerSideProps = async ({ query }) => {
  const appId = query.id || "";

  return {
    props: { appId },
  };
};
const FeedBack1 = ({ appId }) => {
  // state
  const [feedback, setFeedback] = useState({});

  //hooks
  const { auth } = useContext(AuthContext);
  useEffect(async () => {
    const res = await fetch(baseUrl + "applications/" + appId, {
      headers: {
        Authorization: "Bearer" + " " + auth,
      },
    });
    const { msg } = await res.json();
    setFeedback(msg[0].feedback_1);
  }, []);
  return (
    <>
      <div
        className={`container ${styleVid.mainCont} ${style.mainCont} ${style.back}`}
      >
        <article className={styleVid.questionCarCont}>
          <Link
            href={{
              pathname: "/applications/" + appId + "/",
            }}
            passHref
          >
            <button className={style.btn}>
              <i className="fa-solid fa-arrow-left"></i>Back
            </button>
          </Link>
        </article>
      </div>

      <Feedback feedback={feedback} />
    </>
  );
};

FeedBack1.getLayout = function getLayout(page) {
  return <Layout title="Application Feed Back">{page}</Layout>;
};

export default FeedBack1;
