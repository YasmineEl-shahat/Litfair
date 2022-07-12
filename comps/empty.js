import Link from "next/link";
import style from "../styles/pages/empty.module.scss";

const Empty = ({ txt1, txt2, btn, path }) => {
  return (
    <div className={style.wrap}>
      <img className={style.emptyVector} src="/assets/empty/empty.png" />
      <p className={style.content1}>{txt1}</p>
      <p className={style.content2}> {txt2}</p>
      <Link href={path} passHref>
        <button className={`${style.btnEmpty}  btn--blue `}>{btn} </button>
      </Link>
    </div>
  );
};
export default Empty;
