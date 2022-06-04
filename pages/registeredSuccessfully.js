import style from "../styles/pages/login.module.scss";

import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
const baseUrl = process.env.API_URL;
const Registered = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.replace("/setup/career-interests/");
    }, 3000);
  }, [router]);
  return (
    <>
      <Head>
        <title>Registered successfully | LitFair</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={style.mainDev}>
        <div className={style.checkWrap}>
          <div className={style.checkCont}>
            <i className="fa-solid fa-check"></i>
          </div>
          <h2>Registered Succesfully!</h2>
        </div>
        <span className={`d-md-block d-none ${style.circleTop} `}></span>
        <span className={`d-md-block d-none ${style.circleBottom}`}></span>
      </div>
    </>
  );
};
export default Registered;
