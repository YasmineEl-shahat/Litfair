import { hideElement } from "../functions/hideElement";
const SurePop = ({ content, submit, handler, header }) => {
  return (
    <div id="sure" className="popOverlay invisible">
      <div className="pop ">
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
            onClick={async (e) => await handler(e, "sure")}
            className="btn--global btn--blue btn--detail"
            type={submit}
          >
            {submit}
          </button>
        </div>
      </div>
    </div>
  );
};
export default SurePop;
