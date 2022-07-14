import { disableBtn, EnableBtn } from "../functions/ButtonsFun";
import { showElement } from "../functions/showElement";

export const Card = ({
  applicant,
  imgSrc,
  name,
  rate,
  feedback,
  setFeedbackPop,
  setNamePop,
  select,
  setSelect,
}) => {
  // variables
  const stars = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <>
      <div className="Card">
        <div
          onClick={() => {
            let newSelect = select;
            if (select.includes(applicant)) {
              newSelect = newSelect.filter((sel) => sel !== applicant);
            } else {
              newSelect = [...newSelect, applicant];
            }
            setSelect(newSelect);
            if (newSelect.length) EnableBtn("applybtn");
            else disableBtn("applybtn");
          }}
          className="selectbtn"
        >
          {select.includes(applicant) && <i class="fa-solid fa-check"></i>}
        </div>
        <img src={imgSrc} className="card-photo" alt="pic"></img>
        <h4>{name}</h4>
        <section className="starWrap">
          {stars.map((star) =>
            star <= Math.floor(rate) ? (
              <img key={star} alt="rate" src="/assets/company/star.png" />
            ) : (
              <img key={star} alt="rate" src="/assets/company/dark star.png" />
            )
          )}
        </section>
        <p>Rate:{rate}</p>

        <button
          onClick={() => {
            setFeedbackPop(feedback);
            setNamePop(name);
            showElement("FeedPop");
          }}
          className={`btn--global btn--detail btn--blue`}
        >
          Show Interview Result
        </button>
      </div>
    </>
  );
};
