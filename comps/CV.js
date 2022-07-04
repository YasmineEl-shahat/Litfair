import { ProgressBar } from "react-bootstrap";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import style from "../styles/pages/Career.module.scss";
const baseUrl = process.env.API_URL;

const CVComp = ({ isOnboarding }) => {
  //state
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [uploaded, setUploaded] = useState(false);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [link, setLink] = useState("");
  const [error, setError] = useState("");

  //hooks
  const { auth, user } = useContext(AuthContext);

  const getData = async () => {
    const user_id = user.id;
    // waiting for api response
    const res = await fetch(baseUrl + "seeker/details/view/" + user_id);
    const { CV } = await res.json();
    if (CV) {
      setName(CV.fileName.split("$")[0]);
      setDate(CV.fileName.split("$")[1]);
      setLink(CV.fileUrl);
      setUploaded(true);
    }
  };

  useEffect(async () => {
    getData();
  }, []);

  //functions
  const ToCV = () => {
    window.open(link, "_blank");
  };

  //submittion
  const uploadCV = ({ target: { files } }) => {
    const extension = files[0].name.split(".")[1];
    if (extension !== "pdf") {
      setError("Only pdf files are allowed!");
      return;
    }
    setUploaded(false);

    let data = new FormData();
    data.append("cv", files[0]);
    const options = {
      headers: {
        Authorization: "Bearer" + " " + auth,
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;

        let percent = Math.floor((loaded * 100) / total);

        if (percent < 100) {
          setUploadPercentage(percent);
        }
      },
    };

    axios
      .post(baseUrl + "seeker/details/CV", data, options)
      .then((res) => {
        setUploadPercentage(100);
        setError("");
        setTimeout(() => {
          setUploadPercentage(0);
          getData();
          setUploaded(true);
        }, 1000);
      })
      .catch((err) => {
        setUploadPercentage(0);
      });
  };

  const deleteCV = () => {
    const options = { headers: { Authorization: "Bearer" + " " + auth } };
    axios
      .delete(baseUrl + "seeker/details/CV/delete/", options)
      .then((res) => {
        getData();
        setUploaded(false);
        document.getElementById("cv").value = "";
      })
      .catch((err) => {
        setUploaded(true);
      });
  };

  return (
    <>
      <h5 className="invalid ">{error}</h5>
      {uploaded ? (
        isOnboarding ? (
          <div className={style.uploadedCV}>
            <p>
              <i className="fa-solid fa-file"></i> Uploaded
            </p>
            <div>
              <p onClick={ToCV} className="btn">
                Review
              </p>
              <p onClick={deleteCV} className="btn">
                Delete
              </p>
            </div>
          </div>
        ) : (
          <>
            <p>Last updated on {date}</p>
            <div onClick={ToCV} className="cvFile">
              <i className="fa-solid fa-file-lines"></i> {name}.pdf
            </div>
            <i onClick={deleteCV} className="fa-solid fa-xmark close"></i>
            <input type="file" id="cv" onChange={uploadCV} />
            <label htmlFor="cv">
              <i className="fa-solid fa-arrow-up-from-bracket"></i>Update Your
              CV
            </label>
          </>
        )
      ) : uploadPercentage > 0 ? (
        <ProgressBar
          now={uploadPercentage}
          striped={true}
          label={`${uploadPercentage}%`}
        />
      ) : (
        <>
          <input type="file" id="cv" onChange={uploadCV} />
          <label htmlFor="cv">
            <i className="fa-solid fa-arrow-up-from-bracket"></i>Upload CV
          </label>
        </>
      )}
    </>
  );
};

export default CVComp;
