import { hideElement } from "../../functions/hideElement";
const SureDelPop = ({ content, submit, handler }) => {
  return (
    <div id="sureDel" className="popOverlay invisible">
      <div className="pop popApply">
        <p>{content}</p>
        <div className="btn--popWrap">
          <button
            onClick={() => hideElement("sureDel")}
            className="btn--global  btn--cancel "
          >
            Cancel
          </button>
          <button
            onClick={async (e) => await handler(e, "Del_btn", "sureDel")}
            className="btn--global btn--blue btn--detail"
            id="Del_btn"
            type="submit"
          >
            {submit}
          </button>
        </div>
      </div>
    </div>
  );
};
export default SureDelPop;
