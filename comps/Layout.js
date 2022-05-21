import Footer from "./Footer";
import Navbar from "./Navbar";
import Head from "next/head";

const Layout = ({ title, children }) => {
  return (
    <>
      <Navbar />
      <Head>
        <title>{title ? `${title}  | LitFair` : "LitFair"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
      <Footer />
    </>
  );
};

export default Layout;
