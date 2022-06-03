import Layout from "../../../comps/layout";
import EditProfileSideBar from "../../../comps/EditProfileSideBar";
import style from "../../../styles/pages/EditProfile.module.scss";
import { useLayoutEffect } from "react";
import { backgroundSelect } from "../../../functions/backgroundSelect";
const Experience = () => {
  useLayoutEffect(() => {
    backgroundSelect("expSide");
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

Experience.getLayout = function getLayout(page) {
  return <Layout title="Experience">{page}</Layout>;
};

export default Experience;
