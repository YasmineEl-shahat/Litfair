import Link from "next/link";
import Image from "next/image";
import {VscMenu} from 'react-icons/vsc';

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
const baseUrl = process.env.API_URL + "jobTitle/search";

const SeekerNavbar = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
 

  const getData = async () => {
    const res = await fetch(baseUrl);
    const { data } = await res.json();
    setJobs(data);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const searchChangeHandler = (e) => {
    setSearch(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (document.getElementById("search").value !== "")
      router.push(`/jobTitle/search?jobTitle=${search}`);
  };
 

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
        <form onSubmit={submitHandler} className="searchForm">
          <input
            id="search"
            type="text"
            class="searching"
            placeholder="Search for jobs, companies.."
            onChange={searchChangeHandler}
          />

          <button type="submit">
            <i class="fas fa-search searchIcon"></i>
          </button>
        </form>
      </li>
      <li className="nav-item">
        <div className="action">
        <img
          src="/assets/profile/blank-profile-picture.png"
          className="photo"
          alt="pic"
        ></img>
        <i className="menuIcon"  > <VscMenu/> </i>
       {/* <div className="menu" >
          <ul  >
            <li><i></i><Link href="/EditProfileSideBar">Edit Profile</Link></li>
            <li><i></i><Link href="">Help Center</Link></li>
            <li><i></i><Link href="">About Us</Link></li>
            <li><i></i><Link href="">Become A Partner</Link></li>
            <li><i></i><Link href="">Contact Us</Link></li>
            <li><i></i><Link href="">Account Setting</Link></li>
            <li><i></i><Link href="">Log Out</Link></li>
          </ul>

  </div>

  */}
        </div>
      </li>
    </ul>
  );
};
export default SeekerNavbar;
