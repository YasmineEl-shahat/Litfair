import Head from "next/head";
<<<<<<< HEAD
import Layout from "../comps/layout";

=======
import Navbar from "../comps/Navbar";
>>>>>>> ecdf55a0ba0678901e5344a31ff008710005330d
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
