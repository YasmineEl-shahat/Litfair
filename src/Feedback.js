import { Chart_ } from "../comps/Chart";
import styleVid from "../styles/pages/Interview.module.scss";
import style from "../styles/pages/Feedback.module.scss";
import { hideElement } from "../functions/hideElement";

const Feedback = ({ feedback, name, id }) => {
  // variables
  const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <main className={`container ${styleVid.mainCont} ${style.mainCont} `}>
      <article className={styleVid.questionCarCont}>
        {name && (
          <button onClick={() => hideElement(id)} className={style.btn}>
            <i className="fa-solid fa-arrow-left"></i>Back
          </button>
        )}
        {name && <h3 className="circlebef">{name}</h3>}
        <h3 className="circlebef">Feedback Live Interview</h3>
        <section className={`${style.feedSec} `}>
          <span>Recommend Hiring</span>
          <section className={style.recSec}>
            {nums.map((num) =>
              num <= Math.floor(feedback.RecommendHiring) ? (
                <div key={num}>
                  <p className={style.complete}>{num}</p>
                </div>
              ) : (
                <article key={num}>
                  <p>{num}</p>
                </article>
              )
            )}
          </section>
        </section>
        <section className={style.feedSec}>
          <span>Sound & Text</span>
          <div className={style.chartCont}>
            <Chart_
              chartData={{
                key: "No fillers",
                per: feedback.NoFillers,
                color: feedback.NoFillers >= 5 ? "#68E1FF" : "#8E8E8E",
              }}
            />
            <Chart_
              chartData={{
                key: "Structured Answers",
                per: feedback.StructuredAnswers,
                color: feedback.StructuredAnswers >= 5 ? "#68E1FF" : "#8E8E8E",
              }}
            />
            <Chart_
              chartData={{
                key: "Paused",
                per: feedback.Paused,
                color: feedback.Paused >= 5 ? "#68E1FF" : "#8E8E8E",
              }}
            />
            <Chart_
              chartData={{
                key: "Speaking Rate",
                per: feedback.SpeakingRate,
                color: feedback.SpeakingRate >= 5 ? "#68E1FF" : "#8E8E8E",
              }}
            />
          </div>
        </section>
        <section className={style.feedSec}>
          <span>Emotion</span>
          <div className={style.chartCont}>
            <Chart_
              chartData={{
                key: "Friendly",
                per: feedback.Friendly,
                color: feedback.Friendly >= 5 ? "#68E1FF" : "#8E8E8E",
              }}
            />
            <Chart_
              chartData={{
                key: "Calm",
                per: feedback.Calm,
                color: feedback.Calm >= 5 ? "#68E1FF" : "#8E8E8E",
              }}
            />
            <Chart_
              chartData={{
                key: "Not Stressed",
                per: feedback.NotStressed,
                color: feedback.NotStressed >= 5 ? "#68E1FF" : "#8E8E8E",
              }}
            />
            <Chart_
              chartData={{
                key: "Not Awkward",
                per: feedback.NotAwkward,
                color: feedback.NotAwkward >= 5 ? "#68E1FF" : "#8E8E8E",
              }}
            />
          </div>
        </section>
        <section className={style.feedSec}>
          <span>Impression</span>
          <div className={style.chartCont}>
            <Chart_
              chartData={{
                key: "Excited",
                per: feedback.Excited,
                color: feedback.Excited >= 5 ? "#68E1FF" : "#8E8E8E",
              }}
            />
            <Chart_
              chartData={{
                key: "Engaged",
                per: feedback.Engaged,
                color: feedback.Engaged >= 5 ? "#68E1FF" : "#8E8E8E",
              }}
            />
            <Chart_
              chartData={{
                key: "Focused",
                per: feedback.Focused,
                color: feedback.Focused >= 5 ? "#68E1FF" : "#8E8E8E",
              }}
            />
            <Chart_
              chartData={{
                key: "Authentic",
                per: feedback.Authentic,
                color: feedback.Authentic >= 5 ? "#68E1FF" : "#8E8E8E",
              }}
            />
            <Chart_
              chartData={{
                key: "Smiled",
                per: feedback.Smiled,
                color: feedback.Smiled >= 5 ? "#68E1FF" : "#8E8E8E",
              }}
            />
          </div>
        </section>
      </article>
    </main>
  );
};
export default Feedback;
