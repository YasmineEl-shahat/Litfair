import { hideElement } from "../../functions/hideElement";
import { showElement } from "../../functions/showElement";

const ScreenPop = ({
  header,
  handler,
  error,
  text_questions,
  text_answers,
  setText_answers,
}) => {
  let ans = text_answers;

  return (
    <div id="ScreenPop" className="popOverlay invisible">
      <div className="pop popScreen">
        <section>
          <h4 className="circlebef">{header}</h4>
          <i
            onClick={() => hideElement("ScreenPop")}
            className="fa-solid fa-xmark close"
          ></i>
        </section>
        <hr />
        <div className={`progress progressWrap `}>
          <div className={`progress-bar customProgress ProgressScreen `}></div>
        </div>
        <h6>Screening Questions</h6>

        <h6 className="invalid ">{error}</h6>
        {/* Screening questions section */}
        <section className="questionSec">
          {text_questions.map((question, indx) => (
            <div key={`ques${indx}`}>
              <label className="label--global" htmlFor={`question${indx}`}>
                {question}
              </label>
              <input
                id={indx}
                className="txt"
                type="text"
                name={`question${indx}`}
                value={ans[indx]}
                onChange={(e) => {
                  ans[indx] = e.target.value;
                  setText_answers([...ans]);
                }}
              />
            </div>
          ))}
        </section>
        <div className="btn--popWrap">
          <button
            onClick={() => {
              hideElement("ScreenPop");
              showElement("CVpop");
            }}
            className="btn--global  btn--cancel "
          >
            Back
          </button>
          <button
            onClick={async (e) => await handler(e, "screen_btn", "ScreenPop")}
            className="btn--global btn--blue btn--detail"
            id="screen_btn"
            type="submit"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};
export default ScreenPop;
