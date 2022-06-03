import Layout from "../../../comps/layout";
import EditProfileSideBar from "../../../comps/EditProfileSideBar";
import style from "../../../styles/pages/EditProfile.module.scss";
import { useLayoutEffect } from "react";
import { backgroundSelect } from "../../../functions/backgroundSelect";
const GeneralInfo = () => {
  useLayoutEffect(() => {
    backgroundSelect("generalSide");
  }, []);
  return (
    <>
      <main className="container">
        <EditProfileSideBar />
        <section className={style.info}>
          <div className="HeadBackgroundWrap">
            <h3 className="circlebef">Basic Info</h3>
          </div>
        </section>
      </main>
    </>
  );
};

GeneralInfo.getLayout = function getLayout(page) {
  return <Layout title="General Info">{page}</Layout>;
};

export default GeneralInfo;
