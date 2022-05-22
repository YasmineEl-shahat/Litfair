import Head from "next/head";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";

import $ from "jquery";

import style from "../../styles/pages/Career.module.scss";

import { loadSkills } from "../../functions/Api/loadOptions";

const baseUrl = process.env.API_URL;
export const getStaticProps = async () => {
  const res = await fetch(baseUrl + "job-config");
  const { msg } = await res.json();

  return {
    props: { job: msg },
  };
};
const PInfo = (job) => {
  const router = useRouter();

  // variables
  const jobConfig = job.job;
  const date = new Date();
  let grad_year = [];

  //state
  const [submitting, setSubsubmitting] = useState(false);
  const [skills, setSkills] = useState([]);

  //fill graduation year
  for (let i = date.getFullYear() + 7; i >= 1950; i--) {
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
    $(function () {
      $(".level").on("focus", "li", function () {
        $(this).toggleClass("selected");
      });
    }); //end of loading
  }, []);
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
        <form>
          <article className={style.content}>
            <span>How many years of experience do you have?</span>

            <select id="exp" className="txt text--career form-select">
              <option value="">Select ...</option>
              {Object.keys(jobConfig.experience_type).map((key, index) => (
                <option value={jobConfig.experience_type[key]}>
                  {jobConfig.experience_type[key]}
                </option>
              ))}
            </select>
          </article>
          <article className={style.content}>
            <span>What is your current educational level?</span>
            <ul id="level">
              <li>Bachelor&apos;s Degree</li>
              <li>Master&apos;s Degree</li>
              <li>Doctorate&apos;s Degree</li>
              <li>High School</li>
              <li>Deploma</li>
            </ul>
          </article>
          <article className={style.content}>
            <span>Degree Details</span>
            <label className="label--global">Field of study</label>
            <input
              placeholder="Ex.Engineering"
              className="txt  text--career "
            />
            <label className="label--global">University/institution</label>
            <input
              placeholder="Enter University"
              className="txt  text--career "
            />
            <label className="label--global">
              When did you get your degree?
            </label>
            <select id="exp" className="txt text--career form-select">
              <option value="">Select ...</option>
              {grad_year}
            </select>
            <label className="label--global">Grade</label>
            <select id="exp" className="txt text--career form-select">
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
            <input type="file" id="cv" />
            <label htmlFor="cv">
              <i className="fa-solid fa-arrow-up-from-bracket"></i>Upload CV
            </label>
          </article>
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
