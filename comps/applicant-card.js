import Link from "next/link";
import { showElement } from "../functions/showElement";

export const Card = ({
  imgSrc,
  name,
  rate,
  feedback,
  setFeedbackPop,
  setNamePop,
}) => {
  return (
    <>
      <div className="card">
        <img src={imgSrc} className="photo" alt="pic"></img>
        <h4>{name}</h4>
        <p>Rate:{rate}</p>

        <button
          onClick={() => {
            setFeedbackPop(feedback);
            setNamePop(name);
            showElement("FeedPop");
          }}
          className={`btn--global btn--detail btn--blue`}
          type="submit"
        >
          Show Interview Result
        </button>
      </div>
    </>
  );
};
