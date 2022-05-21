import Head from "next/head";
import { useEffect, useState } from "react";
import $ from "jquery";
import style from "../../styles/pages/Career.module.scss";
import { AsyncPaginate } from "react-select-async-paginate";
import {
  loadJobTitles,
  loadJobCategories,
} from "../../functions/Api/loadOptions";
const baseUrl = process.env.API_URL;

export const getStaticProps = async () => {
  const res = await fetch(baseUrl + "job-config");
  const { msg } = await res.json();

  return {
    props: { job: msg },
  };
};
const Career = (job) => {
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

    //job list interact
    $(function () {
      $(".job-type").on("click", "li", function () {
        $(this).toggleClass(`${style.selected}`);
        $("i", this).toggleClass("fa-solid fa-plus");
        $("i", this).toggleClass("fa-solid fa-check");
      });
    });
  }, []);

  // variables
  const jobConfig = job.job;

  const [jobTitles, setJobTitles] = useState([]);
  const [jobCategories, setJobCategories] = useState([]);
  const [submitting, setSubsubmitting] = useState(false);

  return (
    <>
      <Head>
        <title>Career Interests | LitFair</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* num section in small screen sizes */}
      <section className={style.numsSmall}>
        <span>Step 1/3</span>
        <span>Career Interests</span>
      </section>
      <main className="container">
        {/* Num Section */}
        <section className={style.nums}>
          <div className={style.num}>
            <h3 className={style.activeNum}>1</h3>
            <h3>Career Interests</h3>
          </div>
          <div className={style.num}>
            <h3>2</h3>
            <h3>general info</h3>
          </div>
          <div className={style.num}>
            <h3>3</h3>
            <h3>Professional Info</h3>
          </div>
        </section>

        {/* End Num Section */}
        {/* Head Section */}
        <section className={style.head}>
          <h4>Career Interests</h4>
          <p>Provide Us The Information Enable Us To Recommend</p>
        </section>
        {/* End Head Section */}
        {/* Content Section */}
        <form>
          <article className={style.content}>
            <span>What is your current career level?</span>
            <ul id="level">
              {Object.keys(jobConfig.experience_type).map((key, index) => (
                <li>{jobConfig.experience_type[key]}</li>
              ))}
            </ul>
          </article>
          <article className={style.content}>
            <span>What type(s) of jobs are you open to?</span>
            <ul className="job-type">
              {Object.keys(jobConfig.job_type).map((key, index) => (
                <li>
                  {jobConfig.job_type[key]} <i class="fa-solid fa-plus"></i>
                </li>
              ))}
            </ul>
          </article>
          <article className={style.content}>
            <span>
              What are the job titles that describe what are looking for?
            </span>
            <AsyncPaginate
              className="text--career "
              value={jobTitles}
              placeholder="Ex. Developer"
              loadOptions={loadJobTitles}
              isMulti
              onChange={setJobTitles}
              closeMenuOnSelect={false}
            />
          </article>
          <article className={style.content}>
            <span>What job categories are you interested in?</span>
            <AsyncPaginate
              className="text--career "
              value={jobCategories}
              placeholder="Select..."
              loadOptions={loadJobCategories}
              isMulti
              onChange={setJobCategories}
              closeMenuOnSelect={false}
            />
          </article>
          <article className={style.content}>
            <span>What is your current job search status? </span>
            <select className="txt text--career form-select">
              <option value="">Select ...</option>
              {Object.keys(jobConfig.job_status).map((key, index) => (
                <option value={jobConfig.job_status[key]}>
                  {jobConfig.job_status[key]}
                </option>
              ))}
            </select>
          </article>

          <button className="btn btn--global btn--blue  btn--onb" type="submit">
            {submitting ? "Saving..." : "Save and Continue"}
          </button>
        </form>
        {/* End Content Section */}
      </main>
    </>
  );
};
export default Career;
