import Link from "next/link";

import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import AuthContext from "../context/AuthContext";
const baseUrl = process.env.API_URL + "jobTitle/search";

const SeekerNavbar = () => {
  //state
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

  //hooks
  const { logoutUser } = useContext(AuthContext);

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
    </ul>
  );
};
export default SeekerNavbar;
