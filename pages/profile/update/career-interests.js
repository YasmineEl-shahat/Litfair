import Layout from "../../../comps/Layout";
import EditProfileSideBar from "../../../comps/EditProfileSideBar";
import style from "../../../styles/pages/EditProfile.module.scss";

import { useRouter } from "next/router";

import { useLayoutEffect, useEffect, useState, useContext } from "react";
import { AsyncPaginate } from "react-select-async-paginate";

import { backgroundSelect } from "../../../functions/backgroundSelect";
import {
  loadJobCategories,
  loadJobTitles,
} from "../../../functions/Api/loadOptions";

import AuthContext from "../../../context/AuthContext";
import Spinner from "../../../comps/Spinner";

const baseUrl = process.env.API_URL;

export const getServerSideProps = async () => {
  let job = {};
  const res = await fetch(baseUrl + "job-config");
  if (res) {
    const { msg } = await res.json();
    job = msg;
  }

  return {
    props: { job },
  };
};
const CareerInterests = ({ job }) => {
  //state
  const [career_lvl, setCareer_lvl] = useState("");
  const [jobType, setJobType] = useState([]);
  const [jobTitles, setJobTitles] = useState([]);
  const [jobCategories, setJobCategories] = useState([]);
  const [currentState, setCurrentState] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  //hooks
  const { auth, user } = useContext(AuthContext);
  const router = useRouter();

  useLayoutEffect(() => {
    backgroundSelect("careerSide");
  }, []);

  useEffect(async () => {
    const user_id = user.id;
    //waiting for api response
    const res = await fetch(baseUrl + "seeker/details/view/" + user_id);
    const resp = await res.json();
    if (!resp.msg) {
      const { career_lvl, jobType, jobCategory, jobTitle, currentState } = resp;
      const jobCategory_ = jobCategory.map((cat) => ({
        label: cat.jobCategories,
        value: cat._id,
      }));
      const jobTitle_ = jobTitle.map((title) => ({
        label: title["job title"],
        value: title._id,
      }));
      setCareer_lvl(career_lvl);
      setJobType(jobType);
      setJobTitles(jobTitle_);
      setJobCategories(jobCategory_);
      setCurrentState(currentState);
    }

    if (loading) setLoading(false);
  }, []);

  //functions
  const submit = async (e) => {
    //prevent page from reloading
    e.preventDefault();
    // change the submit button state
    setSubmitting(true);
    if (
      !career_lvl ||
      !jobType.length ||
      !jobTitles.length ||
      !jobCategories.length ||
      !currentState
    ) {
      setError("Fill the required fields!");
      setSubmitting(false);
    } else {
      setError("");

      //customize state to be sent in body
      const jobTitle = jobTitles.map((title) => title.value);
      const jobCategory = jobCategories.map((cat) => cat.value);

      //waiting for api response
      let response = await fetch(baseUrl + "seeker/details/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer" + " " + auth,
        },
        body: JSON.stringify({
          career_lvl,
          jobType,
          jobTitle,
          jobCategory,
          currentState,
        }),
      })
        // handle response's different status
        .then(async (response) => {
          if (response.ok) {
            setSubmitting(false);
            router.push("/");
          }
          if (response.status === 400) {
            // So, a server-side validation error occurred.
            // Server side validation returns a string error message, so parse as text instead of json.
            const error = response.text();
            throw new Error(error);
          }
          if (response.status === 502) {
            response.json().then((data) => {
              const { sent } = data;
            });
            throw new Error("Network response was not ok.");
          }
        })
        .catch((e) => {
          setSubmitting(false);
          setError(e.toString());
        });
    }
  };
  return (
    <>
      <main className={` ${style.main}`}>
        <EditProfileSideBar />
        {loading ? (
          <div>
            <Spinner />
          </div>
        ) : (
          <section className={`${style.info} ${style.car}`}>
            <form onSubmit={(e) => submit(e)}>
              <p>What is your current career level?</p>

              <ul id="level">
                {Object.keys(job.experience_type).map((key, index) => (
                  <li
                    className={
                      job.experience_type[key] === career_lvl
                        ? style.selected
                        : ""
                    }
                    onClick={() => {
                      setCareer_lvl(job.experience_type[key]);
                    }}
                    key={key}
                  >
                    {job.experience_type[key]}
                  </li>
                ))}
              </ul>
              <p>What types(s) of jobs are you open to?</p>
              <ul className="job-type">
                {Object.keys(job.job_type).map((key, index) => (
                  <li
                    className={
                      jobType.includes(job.job_type[key]) ? style.selected : ""
                    }
                    key={key}
                    onClick={() => {
                      const current = jobType.find(
                        (type) => type === job.job_type[key]
                      );
                      if (!current) setJobType([...jobType, job.job_type[key]]);
                      else {
                        setJobType(
                          jobType.filter((jobb) => jobb !== job.job_type[key])
                        );
                      }
                    }}
                  >
                    {job.job_type[key]}{" "}
                    <i
                      className={
                        jobType.includes(job.job_type[key])
                          ? "fa-solid fa-check"
                          : "fa-solid fa-plus"
                      }
                    ></i>
                  </li>
                ))}
              </ul>
              <p>What are the job titles that describe what are looking for?</p>
              <AsyncPaginate
                className="text--career "
                value={jobTitles}
                placeholder="Ex. Developer"
                loadOptions={loadJobTitles}
                isMulti
                onChange={setJobTitles}
                closeMenuOnSelect={false}
              />
              <p>what job categories are you interested in?</p>
              <AsyncPaginate
                className="text--career "
                value={jobCategories}
                placeholder="Select..."
                loadOptions={loadJobCategories}
                isMulti
                onChange={setJobCategories}
                closeMenuOnSelect={false}
              />

              <p>what is your current job search status?</p>
              <select
                value={currentState}
                onChange={(e) => setCurrentState(e.target.value)}
                className="txt text--career form-select"
              >
                <option value="">Select ...</option>
                {Object.keys(job.job_status).map((key, index) => (
                  <option value={job.job_status[key]} key={key}>
                    {job.job_status[key]}
                  </option>
                ))}
              </select>
              <span className="invalid cancel--onb">{error}</span>
              <button
                className=" btn--global btn--blue  btn--onb"
                type="submit"
              >
                {submitting ? "Saving..." : "Save Changes"}
              </button>
            </form>
          </section>
        )}
      </main>
    </>
  );
};

CareerInterests.getLayout = function getLayout(page) {
  return <Layout title="Career Interests">{page}</Layout>;
};

export default CareerInterests;
