import { useState, useContext, useEffect } from "react";
import Layout from "../../comps/layout";
import VideoRecorder from "react-video-recorder";
import style from "../../styles/pages/Interview.module.scss";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import Actions from "../../src/defaults/render-actions";
const baseUrl = process.env.API_URL;

const LiveInterview = () => {
  //state
  const [uploaded, setUploaded] = useState(false);
  const [sending, setSending] = useState(false);

  //hooks
  const { auth } = useContext(AuthContext);
  useEffect(() => {}, []);

  //convert blob stream to video to be sent to the server
  const convertBlobToVideo = (videoBlob) => {
    const videoConverted = new File([videoBlob], "file.webm", {
      type: "video/webm",
    });
    return videoConverted;
  };

  const uploadVideo = (videoBlob) => {
    let data = new FormData();
    console.log(convertBlobToVideo());
    data.append("video", convertBlobToVideo(videoBlob));
    const options = {
      headers: {
        Authorization: "Bearer" + " " + auth,

        // "Content-Type": "multipart/form-data",
      },
    };

    axios
      .post(baseUrl + "upload_video", data, options)
      .then((res) => {
        const { msg } = res.data;
        console.log(msg);
        setUploaded(true);
        setSending(false);
      })
      .catch((err) => {
        console.log(err);
        setUploaded(false);
        setSending(false);
      });
  };
  return (
    <>
      <main className={`container ${style.VidCont}`}>
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
                // Do something with the video...
                setSending(true);
                // uploadVideo(videoBlob);
              }}
            />
          </div>
        )}

        <br />
        <br />
      </main>
    </>
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
