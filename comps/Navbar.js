import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import SeekerNavbar from "./SeekerNavbar";
import CompanyNavbar from "./CompanyNavbar";
import { VscMenu } from "react-icons/vsc";
import Icon from "@mdi/react";

import {
  mdiPencilOutline,
  mdiInformationOutline,
  mdiHandshakeOutline,
  mdiForumOutline,
} from "@mdi/js";
const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);

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
              <>
                <div
                  className="navbar-collapse collapse"
                  id="navbarSupportedContent"
                >
                  <SeekerNavbar />
                </div>

                <div
                  className="action"
                  onClick={() => {
                    const menu = document.querySelector(".menu");
                    const photo = document.querySelector(".photo");
                    menu.classList.toggle("active");
                    photo.classList.toggle("photoActive");
                  }}
                >
                  <img
                    src="/assets/profile/blank-profile-picture.png"
                    className="photo"
                    alt="pic"
                  ></img>
                  <i className="menuIcon">
                    <VscMenu />
                  </i>
                  <div className="menu">
                    <ul>
                      <Link href="/profile/update/general-info/">
                        <li>
                          <i>
                            <Icon path={mdiPencilOutline} size={1} />
                          </i>
                          Edit Profile
                        </li>
                      </Link>
                      <Link href="/help" passHref>
                        <li>
                          <i class="fa-regular fa-circle-question"></i>
                          Help Center
                        </li>
                      </Link>
                      <Link href="/about" passHref>
                        <li>
                          <i>
                            <Icon path={mdiInformationOutline} size={1} />
                          </i>
                          About Us
                        </li>
                      </Link>
                      <Link href="/partner" passHref>
                        <li>
                          <i>
                            <Icon path={mdiHandshakeOutline} size={1} />
                          </i>
                          Become A Partner
                        </li>
                      </Link>
                      <Link href="#contact" passHref>
                        <li>
                          <i>
                            <Icon path={mdiForumOutline} size={1} />
                          </i>
                          Contact Us
                        </li>
                      </Link>

                      <li onClick={() => logoutUser()}>
                        <i class="fa-solid fa-arrow-right-from-bracket"></i>
                        Log Out
                      </li>
                    </ul>
                  </div>
                </div>
              </>
            ) : (
              <div
                className="navbar-collapse collapse"
                id="navbarSupportedContent"
              >
                <CompanyNavbar />
                <div
                  className="action"
                  onClick={() => {
                    const menu = document.querySelector(".menu");
                    const photo = document.querySelector(".photo");
                    menu.classList.toggle("active");
                    photo.classList.toggle("photoActive");
                  }}
                >
                  <img
                    src="/assets/profile/blank-profile-picture.png"
                    className="photo"
                    alt="pic"
                  ></img>
                  <i className="menuIcon">
                    <VscMenu />
                  </i>
                  <div className="menu">
                    <ul>
                      <Link href="#">
                        <li>
                          <i>
                            <Icon path={mdiPencilOutline} size={1} />
                          </i>
                          Edit Profile
                        </li>
                      </Link>
                      <Link href="/help" passHref>
                        <li>
                          <i class="fa-regular fa-circle-question"></i>
                          Help Center
                        </li>
                      </Link>
                      <Link href="/about" passHref>
                        <li>
                          <i>
                            <Icon path={mdiInformationOutline} size={1} />
                          </i>
                          About Us
                        </li>
                      </Link>
                      <Link href="/partner" passHref>
                        <li>
                          <i>
                            <Icon path={mdiHandshakeOutline} size={1} />
                          </i>
                          Become A Partner
                        </li>
                      </Link>
                      <Link href="#contact" passHref>
                        <li>
                          <i>
                            <Icon path={mdiForumOutline} size={1} />
                          </i>
                          Contact Us
                        </li>
                      </Link>

                      <li onClick={() => logoutUser()}>
                        <i class="fa-solid fa-arrow-right-from-bracket"></i>
                        Log Out
                      </li>
                    </ul>
                  </div>
                </div>
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
                    <button className="btn--global btn--small btn--blue">
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
