import Link from "next/link";
import Image from "next/image";
import style from "../styles/pages/SeekerHome.module.scss";

const SeekerNavbar = () => {
  return (
    <ul className="navbar-nav ms-auto">
      <li className="nav-item">
        <Link className="nav-link" href="" passHref>
          <a className="bar ">Job Browser</a>
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" href="" passHref>
          <a className="bar">Saved</a>
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" href="" passHref>
          <a className="bar">Applications</a>
        </Link>
      </li>
      <li className="nav-item searchParent">
        <input
          type="text"
          class="searching"
          placeholder="Search for jobs, companies.."
        />

        <button type="submit">
          <i class="fas fa-search searchIcon"></i>
        </button>
      </li>
      <li className="nav-item">
        <img src="/assets/Landing/logo.png" className="photo" alt="pic"></img>
      </li>
    </ul>
  );
};
export default SeekerNavbar;
