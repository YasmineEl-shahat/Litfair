import Layout from "../../../comps/layout";
import EditProfileSideBar from "../../../comps/EditProfileSideBar";
import style from "../../../styles/pages/EditProfile.module.scss";
import { useLayoutEffect } from "react";
import { backgroundSelect } from "../../../functions/backgroundSelect";
const Password = () => {
  useLayoutEffect(() => {
    backgroundSelect("passSide");
  }, []);
  return (
    <>
      <main className={` ${style.main}`}>
        <EditProfileSideBar />
        <section className={style.info}></section>
      </main>
    </>
  );
};

Password.getLayout = function getLayout(page) {
  return <Layout title="Password">{page}</Layout>;
};

export default Password;
