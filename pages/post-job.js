import AuthContext from "../context/AuthContext";
import { useRouter } from "next/router";

import { useContext, useEffect, useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";

import Layout from "../comps/layout";
import Spinner from "../comps/Spinner";
import style from "../styles/pages/Career.module.scss";

import { loadJobCategories } from "../functions/Api/loadOptions";

const baseUrl = process.env.API_URL;

export const getServerSideProps = async ({ query }) => {
  const jobId = query.id || "";
  let res = await fetch(baseUrl + "job-config");
  const { msg } = await res.json();
  res = await fetch(baseUrl + "jobTitle/all");
  const jobTitles = await res.json();
  res = await fetch(baseUrl + "location/countries");
  const countries = await res.json();
  return {
    props: { jobConfig: msg, jobTitles, countries, jobId },
  };
};
const PostJob = ({ jobConfig, jobTitles, countries, jobId }) => {
  // state
  const [jobTitle, setJobTitle] = useState("");
  const [jobType, setJobType] = useState("");
  const [jobCategories, setJobCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [experience_lvl, setExperience_lvl] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState([""]);
  const [skills, setSkills] = useState([""]);
  const [questions, setQuestions] = useState([""]);
  const [submitting, setSubsubmitting] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  //hooks
  const { auth } = useContext(AuthContext);
  const router = useRouter();
  useEffect(async () => {
    if (jobId) {
      //waiting for api response
      const res = await fetch(baseUrl + "jobs/" + jobId, {
        headers: {
          Authorization: "Bearer" + " " + auth,
        },
      });
      const { msg } = await res.json();
      setJobTitle(msg.title);
      setJobType(msg.job_type);
      const jobCategory_ = msg.categories.map((cat, index) => ({
        label: cat,
        value: index,
      }));
      setJobCategories(jobCategory_);
      setCountry(msg.location.split(" ")[0]);
      setCity(msg.location.split(" ")[1]);
      setExperience_lvl(msg.experience);
      setDescription(msg.description);
      setRequirements(msg.requirements);
      setSkills(msg.skills_tools);
      if (msg.application.text_questions.length)
        setQuestions(msg.application.text_questions);
    }
    if (loading) setLoading(false);
  }, []);

  // helper Fun
  const changeCities = async (country) => {
    const res = await fetch(baseUrl + "location/cities?country=" + country);
    const citiesRes = await res.json();
    setCities(citiesRes);
  };

  const handleValueChange = (value, index, list, setList) => {
    const newList = [...list];
    // newList[index] = value;
    newList.splice(index, 1, value);
    setList(newList);
  };

  const handleValueRemove = (index, list, setList) => {
    const newList = [...list];
    newList.splice(index, 1);
    setList(newList);
  };
  const handleValueAdd = (list, setList) => {
    setList([...list, ""]);
  };
  // submittion
  const submit = async (e) => {
    //prevent page from reloading
    e.preventDefault();
    // change the submit button state
    setSubsubmitting(true);
    if (
      !jobTitle ||
      !jobType ||
      !jobCategories.length ||
      !country ||
      !city ||
      !experience_lvl ||
      !description ||
      requirements.includes("") ||
      skills.includes("") ||
      questions.includes("")
    ) {
      setError("Fill the required fields!");
      setSubsubmitting(false);
    } else {
      setError("");

      // customize state to be sent in body
      const location = city + " " + country;
      const jobCategory = jobCategories.map((cat) => cat.label);
      //waiting for api response
      let response = await fetch(baseUrl + "jobs/" + `${jobId && jobId}   `, {
        method: jobId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer" + " " + auth,
        },
        body: JSON.stringify({
          title: jobTitle,
          experience: experience_lvl,
          job_type: jobType,
          location,
          categories: jobCategory,
          requirements,
          skills_tools: skills,
          description,
          app_title: "Application Title",
          app_description: "Application description",
          app_video_questions: ["question1", "question2", "question3"],
        }),
      })
        // handle response's different status
        .then(async (response) => {
          if (response.ok) {
            setError("");
            setSubsubmitting(false);
            router.replace("/");
          } else {
            const error = response.text();
            throw new Error(error);
          }
        })
        .catch((e) => {
          console.log(e);
          setSubsubmitting(false);
          setError("Network response was not ok.");
        });
    }
  };
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <main className="container">
          {/* Head Section */}
          <section className={style.head}>
            <h4>Post New Job</h4>
          </section>
          {/* End Head Section */}
          {/* Content Section */}
          <form className="postForm" onSubmit={(e) => submit(e)}>
            <article className={style.content}>
              <span>Job Details</span>
              <span className={style.postSp}>Job Title</span>
              <input
                list="title"
                placeholder="Ex. Developer"
                className="txt text--career text--customBig"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />
              <datalist id="title">
                {jobTitles.map((title) => (
                  <option value={title["job title"]} key={title._id}>
                    {title["job title"]}
                  </option>
                ))}
              </datalist>
              <span className={style.postSp}>Job Type</span>
              <ul className="job-type">
                {Object.keys(jobConfig.job_type).map((key) => (
                  <li
                    className={
                      jobType === jobConfig.job_type[key] ? style.selected : ""
                    }
                    key={key}
                    onClick={() => {
                      setJobType(jobConfig.job_type[key]);
                    }}
                  >
                    {jobConfig.job_type[key]}{" "}
                  </li>
                ))}
              </ul>
              <span className={style.postSp}>Job Category</span>

              <AsyncPaginate
                className="text--career "
                value={jobCategories}
                placeholder="Select..."
                loadOptions={loadJobCategories}
                isMulti
                onChange={setJobCategories}
                closeMenuOnSelect={false}
              />

              <span className={style.postSp}>Location</span>

              <label className="label--global">Country</label>
              <input
                list="country"
                placeholder="Select..."
                className="txt text--big text--customBig form-select"
                value={country}
                onChange={(e) => {
                  changeCities(e.target.value);
                  setCountry(e.target.value);
                }}
              />
              <datalist id="country">
                {countries.map((country) => (
                  <option value={country.country} key={country._id}>
                    {country.country}
                  </option>
                ))}
              </datalist>
              <label className="label--global" htmlFor="city">
                City
              </label>
              <input
                list="city"
                placeholder="Select..."
                className="txt text--big text--customBig form-select"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <datalist id="city">
                {cities.map((city) => (
                  <option value={city.city} key={city._id}>
                    {city.city}
                  </option>
                ))}
              </datalist>

              <span className={style.postSp}>Years Of Experience</span>

              <select
                value={experience_lvl}
                onChange={(e) => setExperience_lvl(e.target.value)}
                className="txt text--career form-select"
              >
                <option value="">Select ...</option>
                {Object.keys(jobConfig.experience_type).map((key, index) => (
                  <option value={jobConfig.experience_type[key]} key={key}>
                    {jobConfig.experience_type[key]}
                  </option>
                ))}
              </select>

              <span className={style.postSp}>Job Description</span>
              <textarea
                className="txt txtArea text--career"
                name="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <span className={style.postSp}>Job Requirements</span>
              {requirements.map((requirment, index) => (
                <section key={`req${index}`}>
                  <div className={style.addRem}>
                    <input
                      className="txt text--career "
                      type="text"
                      value={requirment}
                      onChange={(e) =>
                        handleValueChange(
                          e.target.value,
                          index,
                          requirements,
                          setRequirements
                        )
                      }
                    />
                    {requirements.length !== 1 && (
                      <button
                        onClick={() =>
                          handleValueRemove(
                            index,
                            requirements,
                            setRequirements
                          )
                        }
                        className="btn--global  btn--cancel btn--remove"
                      >
                        <i class="fa-solid fa-trash-can"></i>
                      </button>
                    )}
                  </div>

                  {requirements.length - 1 === index &&
                    requirements.length < 8 && (
                      <button
                        onClick={() =>
                          handleValueAdd(requirements, setRequirements)
                        }
                        className="btn--global btn--add"
                      >
                        <i className="fa-solid fa-plus"></i> Add a requirment
                      </button>
                    )}
                </section>
              ))}

              <span className={style.postSp}>Job Skills</span>
              {skills.map((skill, index) => (
                <section key={`req${index}`}>
                  <div className={style.addRem}>
                    <input
                      className="txt text--career "
                      type="text"
                      value={skill}
                      onChange={(e) =>
                        handleValueChange(
                          e.target.value,
                          index,
                          skills,
                          setSkills
                        )
                      }
                    />
                    {skills.length !== 1 && (
                      <button
                        onClick={() =>
                          handleValueRemove(index, skills, setSkills)
                        }
                        className="btn--global  btn--cancel btn--remove"
                      >
                        <i class="fa-solid fa-trash-can"></i>
                      </button>
                    )}
                  </div>

                  {skills.length - 1 === index && skills.length < 8 && (
                    <button
                      onClick={() => handleValueAdd(skills, setSkills)}
                      className="btn--global btn--add"
                    >
                      <i className="fa-solid fa-plus"></i> Add a skill
                    </button>
                  )}
                </section>
              ))}

              <span className={style.postSp}>Screening Questions</span>
              {questions.map((question, index) => (
                <section key={`req${index}`}>
                  <div className={style.addRem}>
                    <input
                      className="txt text--career "
                      type="text"
                      value={question}
                      onChange={(e) =>
                        handleValueChange(
                          e.target.value,
                          index,
                          questions,
                          setQuestions
                        )
                      }
                    />
                    {questions.length !== 1 && (
                      <button
                        onClick={() =>
                          handleValueRemove(index, questions, setQuestions)
                        }
                        className="btn--global  btn--cancel btn--remove"
                      >
                        <i class="fa-solid fa-trash-can"></i>
                      </button>
                    )}
                  </div>

                  {questions.length - 1 === index && questions.length < 4 && (
                    <button
                      onClick={() => handleValueAdd(questions, setQuestions)}
                      className="btn--global btn--add"
                    >
                      <i className="fa-solid fa-plus"></i> Add a question
                    </button>
                  )}
                </section>
              ))}
            </article>
            <span className="invalid cancel--onb">{error}</span>
            <button className="btn--global btn--blue  btn--onb " type="submit">
              {submitting ? "Saving..." : "Post Now"}
            </button>
          </form>
          {/* End Content Section */}
        </main>
      )}
    </>
  );
};

PostJob.getLayout = function getLayout(page) {
  return <Layout title="Post job">{page}</Layout>;
};
export default PostJob;
