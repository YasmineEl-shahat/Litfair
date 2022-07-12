import Link from "next/link";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
const baseUrl = process.env.API_URL + "jobTitle/search";

const CompanyNavbar = () => {
  //state
  const [search, setSearch] = useState("");
  const router = useRouter();

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
        <Link className="nav-link" href="/" passHref>
          <a className="bar " id="bar1">
            Dashboard
          </a>
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" href="/companyPosts/" passHref>
          <a className="bar" id="bar2">
            Posts
          </a>
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" href="#" passHref>
          <a className="bar" id="bar3">
            Applications
          </a>
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
    </ul>
  );
};
export default CompanyNavbar;
