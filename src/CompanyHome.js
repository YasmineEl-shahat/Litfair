import style from "../styles/pages/CompanyHome.module.scss";
import Link from "next/link";
const CompanyHome = () => {
  return (
    <main className="container">
      <section className={style.header}>
        <h4>Hello!</h4>
        <Link href="/post-job" passHref>
          <button className="btn--global btn--blue btn--detail">
            Add New Post
          </button>
        </Link>
      </section>
      <section className="row">
        <div className={`${style.content} col-md-8`}>g</div>
        <div className={`${style.content} col-md-4`}>g</div>
      </section>
    </main>
  );
};
export default CompanyHome;
