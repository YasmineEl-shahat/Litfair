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
    btn.disabled = true;
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
    showElement("CVpop");
  };

  //  job details submittion
  const uploadCV = ({ target: { files } }) => {
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
          />
        </>
      )}
    </>
  );
};
export default SeekerHome;
