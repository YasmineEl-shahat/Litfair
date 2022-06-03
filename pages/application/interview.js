import { useLayoutEffect, useState, useContext } from "react";
import Layout from "../../comps/layout";
import VideoRecorder from "react-video-recorder";
import style from "../../styles/pages/Interview.module.scss";
import AuthContext from "../../context/AuthContext";
import axios from "axios";

const baseUrl = process.env.API_URL;

const LiveInterview = () => {
  //   useLayoutEffect(() => {
  //     const videoElem = document.getElementById("stream-elem");

  //     var startBtn = document.getElementById("start-stream");
  //     var endBtn = document.getElementById("stop-media");

  //     var recorder;

  //     const settings = {
  //       video: true,
  //       audio: true,
  //     };

  //     startBtn.addEventListener("click", function (e) {
  //       navigator.mediaDevices.getUserMedia(settings).then((stream) => {
  //         videoElem.srcObject = stream;
  //         recorder = new MediaRecorder(stream);
  //       });
  //     });

  //     endBtn.addEventListener("click", function (e) {
  //       videoElem.pause();
  //     });
  //   });
  const [video, setVideo] = useState([]);
  const [uploaded, setUploaded] = useState(false);

  //hooks
  const { auth } = useContext(AuthContext);

  //convert blob stream to video to be sent to the server
  const convertBlobToVideo = () => {
    const videoConverted = new File([video], "file.webm", {
      type: "video/webm",
    });
    return videoConverted;
  };

  const uploadVideo = () => {
    let data = new FormData();
    data.append("video", convertBlobToVideo());
    const options = {
      headers: {
        Authorization: "Bearer" + " " + auth,

        "Content-Type": "multipart/form-data",
      },
    };

    axios
      .post(baseUrl + "upload_video", data, options)
      .then(async (res) => {
        const { msg } = await res.json();
        console.log(msg);
        setUploaded(true);
      })
      .catch((err) => {
        setUploaded(false);
      });
  };
  return (
    <>
      <main className={`container ${style.VidCont}`}>
        {/* <video autoplay="" id="stream-elem" controls width="600" height="400">
        </video> */}

        {/* <button
          style={{ margin: "2rem" }}
          className=" btn--global btn--blue btn--small"
          id="start-stream"
        >
          Start Stream
        </button> */}
        {/* 
        <button className=" btn--global btn--blue btn--small" id="stop-media">
          Stop Stream
        </button> */}
        {uploaded ? (
          <div>Your answer submited successfully</div>
        ) : (
          <div className={style.stream}>
            <VideoRecorder
              renderDisconnectedView={function noRefCheck() {}}
              onRecordingComplete={(videoBlob) => {
                // Do something with the video...

                setVideo(videoBlob);

                uploadVideo();
                // setUploaded(true);
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
