import { hideElement } from "../../functions/hideElement";
import style from "../../styles/pages/login.module.scss";
import Link from "next/link";
import { BsCheck2 } from "react-icons/bs";

const SuccessPop = ({ header, content, submit, application_id }) => {
  return (
    <div id="successPop" className="popOverlay invisible">
      <div className="pop popSuc">
        <div className={style.checkWrap}>
          <div className={`${style.checkCont} customCheck`}>
            <i>
              <BsCheck2 />
            </i>
          </div>
        </div>
        <h3>{header}</h3>

        <p className="successPar">{content}</p>
        {submit && (
          <div className="btn--popWrap">
            <Link href={`/applications/${application_id}/`} passHref>
              <button
                onClick={() => hideElement("successPop")}
                className="btn--global btn--blue btn--detail trackbtn"
              >
                {submit}
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
export default SuccessPop;
