import Layout from "../../../comps/layout";
import EditProfileSideBar from "../../../comps/EditProfileSideBar";
import style from "../../../styles/pages/EditProfile.module.scss";
import { useLayoutEffect } from "react";
import { backgroundSelect } from "../../../functions/backgroundSelect";
const CV = () => {
  useLayoutEffect(() => {
    backgroundSelect("cvSide");
  }, []);
  return (
    <>
      <main className="container">
        <EditProfileSideBar />
        <section className={style.info}></section>
      </main>
    </>
  );
};

CV.getLayout = function getLayout(page) {
  return <Layout title="CV">{page}</Layout>;
};

export default CV;
