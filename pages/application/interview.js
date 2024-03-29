import { useState, useContext, useEffect } from "react";
import Layout from "../../comps/Layout";
import VideoRecorder from "react-video-recorder";
import style from "../../styles/pages/Interview.module.scss";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import SuccessPop from "../../comps/Popups/SuccessPop";
import { showElement } from "../../functions/showElement";
import { useRouter } from "next/router";

const baseUrl = process.env.API_URL;

export const getServerSideProps = async ({ query }) => {
  const appId = query.id || "";

  return {
    props: { appId },
  };
};

const LiveInterview = ({ appId }) => {
  const router = useRouter();
  //state
  const [uploaded, setUploaded] = useState(false);
  const [sending, setSending] = useState(false);
  const [current, setCurrent] = useState(1);

  //hooks
  const { auth } = useContext(AuthContext);

  //variables
  const questions = [
    "Introduce your self",
    "Talk about a time when you demonstrated leadership",
    "Talk about a time when you were working with a team and faced a challenge. How did you overcome the problem?",
    "What is one of your weaknesses and how do you plan to overcome it?",
    "Why do you think you worth hiring?",
  ];

  //convert blob stream to video to be sent to the server
  const convertBlobToVideo = (videoBlob) => {
    const videoConverted = new File([videoBlob], "file.avi", {
      type: "video/x-msvideo",
    });
    return videoConverted;
  };

  //helper function for sliding to next question after uploading complete
  const changeSlide = () => {
    if (current !== questions.length) {
      setCurrent(current + 1);
      setUploaded(false);
    } else {
      showElement("successPop");
      setTimeout(() => {
        router.replace("/applications/" + appId);
      }, 3000);
    }
  };

  // send video to the server to be sent to the model
  const uploadVideo = (videoBlob, question) => {
    let data = new FormData();
    data.append("video", convertBlobToVideo(videoBlob));
    data.append("video_question", question);
    const options = {
      headers: {
        Authorization: "Bearer" + " " + auth,
        "Content-Type": "multipart/form-data",
      },
    };

    axios
      .post("http://40.83.32.70/submit-video/" + appId, data, options)
      .then((res) => {
        const { msg } = res.data;
        console.log(msg);
        setUploaded(true);
        setSending(false);
        setTimeout(() => {
          changeSlide();
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        setUploaded(false);
        setSending(false);
      });
  };
  return (
    <main className={`container ${style.mainCont}`}>
      <article className={style.questionCarCont}>
        <h3 className="circlebef">Live Interview</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim
        </p>
        <h5 className="invalid">
          <i className="fa-solid fa-circle-exclamation"></i>If you clicked the
          start button you will not pause the stream
        </h5>
        <div
          id="carouselExampleIndicators"
          className={`carousel slide ${style.carousel}`}
          data-bs-ride="carousel"
          data-bs-interval="false"
        >
          <div className={`carousel-indicators ${style.customInd}`}>
            {questions.map((question, index) => (
              <button
                key={`queInd${index}`}
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to={index}
                className={
                  index + 1 < current
                    ? `fa-solid fa-check active`
                    : current === index + 1
                    ? `active `
                    : ``
                }
                aria-label={`Slide ${index + 1}`}
                aria-current={current === index + 1 ? `true` : `false`}
                disabled={
                  uploaded === "true" && index + 2 === current
                    ? `false`
                    : `true`
                }
              >
                {index + 1 < current ? "" : index + 1}
              </button>
            ))}
          </div>
          <div className="carousel-inner">
            {questions.map((question, index) => (
              <div
                className={
                  current === index + 1
                    ? `carousel-item active `
                    : `carousel-item`
                }
                key={`carIt${index + 1}`}
              >
                <section className={style.questionCont}>
                  <h4>
                    Question {index + 1}: {question}
                  </h4>
                  <div className={`${style.VidCont}`}>
                    {uploaded ? (
                      <div>Your answer submited successfully</div>
                    ) : sending ? (
                      <div>Sending...</div>
                    ) : (
                      <div className={style.stream}>
                        <VideoRecorder
                          renderDisconnectedView={function noRefCheck() {
                            // const startRec = document.getElementsByClassName(
                            //   "button__Button-hkteey-0 jLcHAe"
                            // )[0];
                            // const cam = document.createElement(
                            //   `<p className="fa-solid fa-camera"></p>`
                            // );
                            // if (startRec) startRec.appendChild(cam);
                          }}
                          onRecordingComplete={(videoBlob) => {
                            // Sending the video to the server...
                            setSending(true);
                            uploadVideo(videoBlob, question);
                          }}
                        />
                      </div>
                    )}

                    <br />
                    <br />
                  </div>
                </section>
              </div>
            ))}
          </div>
        </div>
      </article>
      <SuccessPop
        header="Well done, your interview has been submitted successfully"
        content="Our team will review your interview and will provide feedback as soon as possible."
      />
    </main>
  );
};

LiveInterview.getLayout = function getLayout(page) {
  return <Layout title="Live Interview">{page}</Layout>;
};

export default LiveInterview;

const Test = ({ isRecording, onStopRecording }) => {
  if (isRecording) {
    return (
      <button
        type="button"
        className="btn--global"
        onClick={onStopRecording}
        data-qa="stop-recording"
      />
    );
  }
};
