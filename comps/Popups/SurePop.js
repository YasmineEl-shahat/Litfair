import { hideElement } from "../../functions/hideElement";
const SurePop = ({ content, submit, handler, header }) => {
  return (
    <div id="sure" className="popOverlay ">
      <div className="pop popApply">
        <h4>{header}</h4>
        <hr />
        <p>{content}</p>
        <div className="btn--popWrap">
          <button
            onClick={() => hideElement("sure")}
            className="btn--global  btn--cancel "
          >
            Cancel
          </button>
          <button
            onClick={async (e) => await handler(e, "apply_btn", "sure")}
            className="btn--global btn--blue btn--detail"
            id="apply_btn"
            type="submit"
          >
            {submit}
          </button>
        </div>
      </div>
    </div>
  );
};
export default SurePop;
