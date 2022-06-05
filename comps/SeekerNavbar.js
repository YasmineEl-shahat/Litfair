import Link from "next/link";
import Image from "next/image";
import style from "../styles/pages/SeekerHome.module.scss";

const SeekerNavbar = () => {
  return (
    <ul className="navbar-nav ms-auto">
      <li className="nav-item">
        <Link className="nav-link" href="" passHref>
          <button className="  bar ">Job Browser</button>
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" href="" passHref>
          <button className="  bar">Saved</button>
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" href="" passHref>
          <button className="  bar">Applications</button>
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
        <img src="assets/Landing/logo.png" className="photo"></img>
      </li>
    </ul>
  );
};
export default SeekerNavbar;
