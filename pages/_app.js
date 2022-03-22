import "../styles/globals.scss";
import "../styles/Layout/Navbar.scss";
<<<<<<< HEAD
import "../styles/Layout/Footer.scss";
import "../node_modules/@fortawesome/fontawesome-free/css/all.css";
import "bootstrap/dist/css/bootstrap.min.css";
=======
import "bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/@fortawesome/fontawesome-free/css/all.css";
>>>>>>> ecdf55a0ba0678901e5344a31ff008710005330d

import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(<Component {...pageProps} />);
}

export default MyApp;
