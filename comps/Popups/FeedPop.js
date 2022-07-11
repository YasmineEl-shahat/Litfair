import Feedback from "../../src/Feedback";

const FeedPop = ({ feedback, name }) => {
  return (
    <div id="FeedPop" className="feedpopOverlay invisible">
      <div className="feedpop">
        <Feedback feedback={feedback} name={name} id="FeedPop" />
      </div>
    </div>
  );
};
export default FeedPop;
