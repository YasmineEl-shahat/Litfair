import Layout from "../../../comps/layout";
import EditProfileSideBar from "../../../comps/EditProfileSideBar";
import style from "../../../styles/pages/EditProfile.module.scss";
import { useLayoutEffect } from "react";
import { backgroundSelect } from "../../../functions/backgroundSelect";
const CareerInterests = () => {
  useLayoutEffect(() => {
    backgroundSelect("careerSide");
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

CareerInterests.getLayout = function getLayout(page) {
  return <Layout title="Career Interests">{page}</Layout>;
};

export default CareerInterests;
