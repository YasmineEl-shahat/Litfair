import { hideElement } from "../../functions/hideElement";
import style from "../../styles/pages/login.module.scss";
const SuccessPop = ({ header, content, submit }) => {
  return (
    <div id="successPop" className="popOverlay invisible">
      <div className="pop popSuc">
        <div className={style.checkWrap}>
          <div className={`${style.checkCont} customCheck`}>
            <i className="fa-solid fa-check"></i>
          </div>
        </div>
        <h3>{header}</h3>

        <p className="successPar">{content}</p>
        {submit && (
          <div className="btn--popWrap">
            <button
              onClick={() => hideElement("successPop")}
              className="btn--global btn--blue btn--detail trackbtn"
            >
              {submit}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default SuccessPop;
