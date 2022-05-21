import Head from "next/head";
import { useEffect } from "react";
import $ from "jquery";
import style from "../../styles/pages/Career.module.scss";
import { change_month, change_year } from "../../functions/birthdate";
const baseUrl = process.env.API_URL;
export const getStaticProps = async () => {
  const res = await fetch(baseUrl + "job-config");
  const { msg } = await res.json();

  return {
    props: { job: msg },
  };
};
const PInfo = (job) => {
  const jobConfig = job.job;

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
        console.log("fff");
        $(this).toggleClass("selected");
        console.log(this);
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
          <article className={style.content}></article>
          <article className={style.content}>
            <span>What Skills, Tools....</span>

            <textarea className="txt" placeholder="Ex.Engineering" />
          </article>
        </form>
        {/* End Content Section */}
      </main>
    </>
  );
};
export default PInfo;
