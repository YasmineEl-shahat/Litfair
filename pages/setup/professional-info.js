import Head from "next/head";
import { useRouter } from "next/router";

import { useEffect, useState, useContext } from "react";
import { AsyncPaginate } from "react-select-async-paginate";

import style from "../../styles/pages/Career.module.scss";

import { loadSkills } from "../../functions/Api/loadOptions";
import AuthContext from "../../context/AuthContext";
import CVComp from "../../comps/CV";

const baseUrl = process.env.API_URL;
export const getServerSideProps = async () => {
  const res = await fetch(baseUrl + "job-config");
  const { msg } = await res.json();

  return {
    props: { job: msg },
  };
};
const PInfo = (job) => {
  //hooks
  const { auth } = useContext(AuthContext);
  const router = useRouter();

  // variables
  const jobConfig = job.job;
  const dateNow = new Date();
  let grad_year = [];
  const degree_list = [
    "Bachelor's Degree",
    "Master's Degree",
    "Doctorate's Degree",
    "High School",
    "Deploma",
  ];
  let fields = [];

  //state
  const [experience_lvl, setExperience_lvl] = useState("");
  const [degree, setDegree] = useState("");
  const [field, setField] = useState("");
  const [university, setUniversity] = useState("");
  const [date, setDate] = useState("");
  const [grade, setGrade] = useState("");
  const [skills, setSkills] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  //fill graduation year
  for (let i = dateNow.getFullYear() + 7; i >= 1950; i--) {
    // years start i
    grad_year.push(<option value={i}>{i}</option>);
  }

  useEffect(() => {
    //level list interact
    const levelList = document.querySelectorAll("#level > li");

    for (let li of levelList) {
      li.addEventListener("click", function () {
        // 1. Remove Class from All Lis

        for (let li of levelList) {
          li.classList.remove(`${style.selected}`);
        }

        // 2. Add Class to Relevant Li
        this.classList.add(`${style.selected}`);
      });
    }
    //end of loading
  }, []);

  //submittion

  const submit = async (e) => {
    //prevent page from reloading
    e.preventDefault();
    // change the submit button state
    setSubmitting(true);
    if (
      !experience_lvl ||
      !degree ||
      !field ||
      !university ||
      !date ||
      !grade ||
      !skills.length
    ) {
      setError("Fill the required fields!");
      setSubmitting(false);
    } else {
      setError("");

      //customize state to be sent in body
      fields = [...field];
      const education = { degree, fields, university, date, grade };
      const skills_ = skills.map((skill) => skill.value);
      //waiting for api response
      let response = await fetch(baseUrl + "seeker/details/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer" + " " + auth,
        },
        body: JSON.stringify({
          experience_lvl,
          education,
          skills: skills_,
        }),
      })
        // handle response's different status
        .then(async (response) => {
          console.log(response);
          if (response.ok) {
            setSubmitting(false);
            router.replace("/");
          }
          if (response.status === 400) {
            // So, a server-side validation error occurred.
            // Server side validation returns a string error message, so parse as text instead of json.
            const error = response.text();
            throw new Error(error);
          }
          if (response.status === 502) {
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
      <Head>
        <title>Professional Info | LitFair</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* num section in small screen sizes */}
      <section className={style.numsSmall}>
        <span>step 3/3</span>
        <span>Professional Info</span>
      </section>
      <main className="container">
        {/* Num Section */}
        <section className={style.nums}>
          <div className={`${style.num} ${style.af}`}>
            <h3 className={`${style.activeNum} `}>
              <i className="fa-solid fa-check"></i>
            </h3>
            <h3>Professional Interests</h3>
          </div>
          <div className={`${style.num} ${style.af}`}>
            <h3 className={`${style.activeNum} `}>
              <i className="fa-solid fa-check"></i>
            </h3>
            <h3>general info</h3>
          </div>
          <div className={`${style.num} ${style.af}`}>
            <h3 className={`${style.activeNum} `}>3</h3>
            <h3>Professional Info</h3>
          </div>
        </section>
        {/* End Num Section */}
        {/* Head Section */}
        <section className={style.head}>
          <h4>Professional Info</h4>
          <p>Tell companies more about your experience.</p>
        </section>
        {/* End Head Section */}
        {/* Content Section */}
        <form onSubmit={(e) => submit(e)}>
          <article className={style.content}>
            <span>How many years of experience do you have?</span>

            <select
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
          </article>
          <article className={style.content}>
            <span>What is your current educational level?</span>
            <ul id="level">
              {degree_list.map((deg) => (
                <li
                  onClick={() => {
                    setDegree(deg);
                  }}
                  key={deg}
                >
                  {deg}
                </li>
              ))}
            </ul>
          </article>
          <article className={style.content}>
            <span>Degree Details</span>
            <label className="label--global">Field of study</label>
            <input
              placeholder="Ex.Engineering"
              className="txt text--career"
              onChange={(e) => setField([e.target.value])}
            />
            <label className="label--global">University/institution</label>
            <input
              placeholder="Enter University"
              className="txt  text--career "
              onChange={(e) => setUniversity(e.target.value)}
            />
            <label className="label--global">
              When did you get your degree?
            </label>
            <select
              onChange={(e) => setDate(e.target.value)}
              className="txt text--career form-select"
            >
              <option value="">Select ...</option>
              {grad_year}
            </select>
            <label className="label--global">Grade</label>
            <select
              onChange={(e) => setGrade(e.target.value)}
              className="txt text--career form-select"
            >
              <option value="">Select ...</option>
              <option value="A/ Excellent / 85-100%">
                A/ Excellent / 85-100%
              </option>
              <option value="B / Very Good / 75-85%">
                B / Very Good / 75-85%
              </option>
              <option value="C / Good / 65 - 75%">C / Good / 65 - 75%</option>
              <option value="D / Fair / 50 - 65%">D / Fair / 50 - 65%</option>
              <option value="Not Specified">Not Specified</option>
            </select>
          </article>
          <article className={style.content}>
            <span>What Skills, Tools....</span>

            <AsyncPaginate
              className="text--career"
              value={skills}
              placeholder="Ex. Digital Marketing"
              loadOptions={loadSkills}
              isMulti
              onChange={setSkills}
              closeMenuOnSelect={false}
            />
          </article>
          <article className={style.content}>
            <span>Upload Your CV </span>
            <CVComp isOnboarding={true} />
          </article>
          <span className="invalid cancel--onb">{error}</span>

          <div className="btn--wrap">
            <button
              onClick={(e) => {
                e.preventDefault();
                router.back();
              }}
              className=" btn--global btn--small btn--cancel cancel--onb"
            >
              back
            </button>
            <button className=" btn--global btn--blue  btn--onb" type="submit">
              {submitting ? "Saving..." : "Let's Start"}
            </button>
          </div>
        </form>
        {/* End Content Section */}
      </main>
    </>
  );
};
export default PInfo;
