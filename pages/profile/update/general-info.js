import Layout from "../../../comps/layout";
import EditProfileSideBar from "../../../comps/EditProfileSideBar";
import style from "../../../styles/pages/EditProfile.module.scss";
const GeneralInfo = () => {
  return (
    <>
      <main className="container">
        <EditProfileSideBar />
        <section className={style.info}></section>
      </main>
    </>
  );
};

GeneralInfo.getLayout = function getLayout(page) {
  return <Layout title="General Info">{page}</Layout>;
};

export default GeneralInfo;
