import Head from "next/head";
import Layout from "../comps/layout";

import style from "../styles/pages/Home.module.scss";
const Home = () => {
  return (
    <>
      <Head>
        <title>LitFair | Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
};

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Home;
