import { hideElement } from "../../functions/hideElement";

const CVPop = ({ header, name, submit, handler, uploadCV, link }) => {
  //functions
  const ToCV = () => {
    window.open(link, "_blank");
  };

  return (
    <div id="CVpop" className="popOverlay invisible">
      <div className="pop popScreen">
        <section>
          <h4 className="circlebef">{header}</h4>
          <i
            onClick={() => hideElement("CVpop")}
            className="fa-solid fa-xmark close"
          ></i>
        </section>
        <hr />
        <div className={`progress progressWrap `}>
          <div className={`progress-bar customProgress `}></div>
        </div>
        <h6>Resume</h6>
        <h6>Be sure to include an updated resume*</h6>
        {name ? (
          <div>
            <div onClick={ToCV} className="cvFile">
              <i className="fa-solid fa-file-lines"></i> {name}
            </div>

            <input type="file" id="cv" onChange={uploadCV} />
            <label htmlFor="cv" id="cvl">
              <i className="fa-solid fa-arrow-up-from-bracket"></i>Upload
              another File
            </label>
          </div>
        ) : (
          <>
            <input type="file" id="cv" onChange={uploadCV} />
            <label htmlFor="cv" id="cvl">
              <i className="fa-solid fa-arrow-up-from-bracket"></i>Upload CV
            </label>
          </>
        )}
        <div className="btn--popWrap">
          <button
            onClick={async (e) => await handler(e, "cv_btn", "CVpop")}
            className="btn--global btn--blue btn--detail"
            id="cv_btn"
            type="submit"
          >
            {submit}
          </button>
        </div>
      </div>
    </div>
  );
};
export default CVPop;
