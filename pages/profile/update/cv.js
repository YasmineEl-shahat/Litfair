import Layout from "../../../comps/layout";
import EditProfileSideBar from "../../../comps/EditProfileSideBar";
import style from "../../../styles/pages/EditProfile.module.scss";
import { useLayoutEffect } from "react";
import { backgroundSelect } from "../../../functions/backgroundSelect";
import CVComp from "../../../comps/CV";
const CV = () => {
  useLayoutEffect(() => {
    backgroundSelect("cvSide");
  }, []);
  return (
    <>
      <main className={` ${style.main}`}>
        <EditProfileSideBar />
        <section className={style.info}>
          <section className={style.confirmPass}>
            <CVComp />
          </section>
        </section>
      </main>
    </>
  );
};

CV.getLayout = function getLayout(page) {
  return <Layout title="CV">{page}</Layout>;
};

export default CV;
