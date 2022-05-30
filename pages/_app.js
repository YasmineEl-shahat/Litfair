import "../styles/globals.scss";
import "../styles/Layout/Navbar.scss";
import "../styles/Layout/Footer.scss";
import "../styles/Layout/EditProfileSide.scss";

import "../styles/components/label.scss";
import "../styles/components/textInput.scss";
<<<<<<< HEAD
import "../styles/Layout/SeekerNavbar.scss";
=======

>>>>>>> f31c332b9561ae560666521fbc3441f05a3af7ea
import "../node_modules/@fortawesome/fontawesome-free/css/all.css";
import "bootstrap/dist/css/bootstrap.min.css";


import { AuthProvider } from "../context/AuthContext";

import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);

  return <AuthProvider>{getLayout(<Component {...pageProps} />)}</AuthProvider>;
}

export default MyApp;
