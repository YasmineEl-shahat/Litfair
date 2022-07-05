import AuthContext from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import Spinner from "../comps/Spinner";
import Jobs from "../comps/jobs";

// job details import
import SurePop from "../comps/Popups/SurePop";
import CVPop from "../comps/Popups/CVPop";
import { hideElement } from "../functions/hideElement";
import { showElement } from "../functions/showElement";
import axios from "axios";
import ScreenPop from "../comps/Popups/ScreenPop";
import SuccessPop from "../comps/Popups/SuccessPop";

const baseUrl = process.env.API_URL;

const SeekerHome = () => {
  //hooks
  const { auth, user } = useContext(AuthContext);

  // state
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  // job details state
  const [cvName, setCVName] = useState("");
  const [cv_url, setCv_url] = useState("");
  const [cvError, setCVError] = useState("");
  const [screenError, setScreenError] = useState("");
  const [text_questions, setText_questions] = useState([]);
  const [text_answers, setText_answers] = useState([]);
  const [application_id, setApplication_id] = useState("");

  // call backend to retrieve jobs
  const getData = async () => {
    // Fetch data from external API
    const res = await fetch(baseUrl + "jobs", {
      headers: {
        Authorization: "Bearer" + " " + auth,
      },
    });
    const { msg } = await res.json();

    setPosts(msg[0].current_data);

    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  //  job details handlers
  const disableBtn = (id) => {
    const btn = document.getElementById(id);
    btn.style.background = "#9C93F8";
    btn.style.cursor = "auto";
    btn.disabled = true;
  };

  const EnableBtn = (id) => {
    const btn = document.getElementById(id);
    btn.style.background = "#5c46f9";
    btn.style.cursor = "pointer";
    btn.disabled = false;
  };
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

    // waiting for api response - will be removed in job details
    const res = await fetch(baseUrl + "jobs/62a8bc6bd20159963aec17ca", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer" + " " + auth,
      },
    });
    const { msg } = await res.json();
    setText_questions(msg.application.text_questions);
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
    let response = await fetch(
      baseUrl + "applications/62a8bc6bd20159963aec17ca",
      {
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
      }
    )
      .then(async (response) => {
        if (response.ok) {
          setScreenError("");
          const res = await response.json();
          const { msg } = await res;
          setApplication_id(msg._id);
          EnableBtn(btn_id);
          hideElement(id);
          showElement("successPop");
        } else {
          throw new Error("failed");
        }
      })

      .catch((e) => {
        setScreenError("Submittion Failed!");
        EnableBtn(btn_id);
      });
  };
  //  job details submittion
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
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Jobs posts={posts} />
          {/* job details popups */}
          <SurePop
            header="Apply for job"
            content="Are you sure you want to apply to this job?"
            submit="Apply"
            handler={ApplyHandler}
          />
          <CVPop
            header="Apply To Litfair"
            name={cvName}
            submit="Next"
            link={cv_url}
            uploadCV={uploadCV}
            handler={CVHandler}
            error={cvError}
          />
          <ScreenPop
            header="Apply To Litfair"
            text_questions={text_questions}
            text_answers={text_answers}
            setText_answers={setText_answers}
            handler={ScreenHandler}
            error={screenError}
          />
          <SuccessPop
            content="Your application was sent to LitFair!"
            submit="Track Application"
            application_id={application_id}
          />
        </>
      )}
    </>
  );
};
export default SeekerHome;
