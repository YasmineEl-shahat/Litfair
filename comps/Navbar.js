import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import SeekerNavbar from "../src/SeekerHome";
import CompanyNavbar from "../src/CompanyHome";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
          <div className="navbar-brand">
            <Link className="nav-link" href="/" passHref>
              <Image
                src="/assets/Landing/logo.png"
                alt="lol ya 7abeby"
                width={122}
                height={33}
              />
            </Link>
          </div>
          <button
            className=" navbar-toggler navbar-toggler-right collapsed custom-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className=" navbar-toggler-icon"></span>
          </button>
          {user ? (
            user.role === "Seeker" ? (
              <div
                className="navbar-collapse collapse"
                id="navbarSupportedContent"
              >
                <SeekerNavbar/>
              </div>
            ) : (
              <div
                className="navbar-collapse collapse"
                id="navbarSupportedContent"
              >
                <CompanyNavbar/>
              </div>
            )
          ) : (
            <div
              className="navbar-collapse collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" href="/login" passHref>
                    <button className=" btn--global btn--small btn--log">
                      Login
                    </button>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/seekerRegister" passHref>
                    <button className="btn btn--global btn--small btn--blue">
                      Join Now
                    </button>
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
