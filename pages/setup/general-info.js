import Head from "next/head";
import { useRouter } from "next/router";

import style from "../../styles/pages/Career.module.scss";
import { change_month, change_year, birth } from "../../functions/birthdate";
import { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import Spinner from "../../comps/Spinner";
const baseUrl = process.env.API_URL;

export const getStaticProps = async () => {
  const res = await fetch(baseUrl + "location/countries");
  const countries = await res.json();

  return {
    props: { countries: countries },
  };
};

const GInfo = (countries) => {
  // variables
  const country_list = countries.countries;

  //state
  const [cities, setCities] = useState([]);
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [nationality, setNationality] = useState("");
  const [gender, setGender] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [submitting, setSubsubmitting] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  //hooks
  const { auth } = useContext(AuthContext);
  const router = useRouter();

  useEffect(async () => {
    //waiting for api response
    let response = await fetch(baseUrl + "seeker/profile/info", {
      headers: {
        Authorization: "Bearer" + " " + auth,
      },
    })
      .then(async (response) => {
        if (response.ok) {
          const res = await response.json();

          setFname(res.fname);
          setLname(res.lname);
          setPhone_number(res.phone_number);
          setCountry(res.country);
          setCity(res.city);
          setNationality(res.nationality);
          setGender(res.gender);

          setLoading(false);
          if (res.date_of_birth) {
            const y = res.date_of_birth.slice(0, 4);

            const m = res.date_of_birth.slice(5, 7);
            const d = res.date_of_birth.slice(8, 10);
            birth(y, Number(m), Number(d));
          } else birth();
        }
        if (response.status === 400) {
          // So, a server-side validation error occurred.
          // Server side validation returns a string error message, so parse as text instead of json.
          const error = response.text();
          throw new Error(error);
        }
        if (response.status === 502) {
          throw new Error("Network response was not ok.");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  //helper Fun
  const changeCities = async (country) => {
    const res = await fetch(baseUrl + "location/cities?country=" + country);
    const citiesRes = await res.json();
    setCities(citiesRes);
  };
  //phone validation
  const validatePhone = () => {
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return re.test(phone_number);
  };

  const submit = async (e) => {
    //prevent page from reloading
    e.preventDefault();
    // change the submit button state
    setSubsubmitting(true);
    if (
      !day ||
      !month ||
      !year ||
      !fname ||
      !lname ||
      !country ||
      !city ||
      !nationality ||
      !gender ||
      !phone_number
    ) {
      setError("Fill the required fields!");
      setSubsubmitting(false);
      return;
    }
    if (!validatePhone()) {
      setError("Invalid phone");
      return;
    }
    //customize state to be sent in body
    setError("");
    const date_of_birth = year + "-" + month + "-" + day;
    //waiting for api response
    let response = await fetch(baseUrl + "seeker/profile/update", {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer" + " " + auth,
      },
      body: JSON.stringify({
        date_of_birth,
        fname,
        lname,
        country,
        city,
        nationality,
        gender,
        phone_number,
      }),
    })
      // handle response's different status
      .then(async (response) => {
        if (response.ok) {
          setSubsubmitting(false);
          router.push("/setup/professional-info");
        }
        if (response.status === 400) {
          // So, a server-side validation error occurred.
          // Server side validation returns a string error message, so parse as text instead of json.
          const error = response.text();
          throw new Error(error);
        }
        if (response.status === 502) {
          throw new Error("Network response was not ok.");
        }
      })
      .catch((e) => {
        setSubsubmitting(false);
        setError(e.toString());
      });
  };

  return (
    <>
      <Head>
        <title>General Info | LitFair</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* num section in small screen sizes */}
      <section className={style.numsSmall}>
        <span>step 2/3</span>
        <span>general info</span>
      </section>

      <main className="container">
        {/* Num Section */}
        <section className={style.nums}>
          <div className={style.num}>
            <h3 className={`${style.activeNum} `}>
              <i className="fa-solid fa-check"></i>
            </h3>
            <h3>Career Interests</h3>
          </div>
          <div className={style.num}>
            <h3 className={`${style.activeNum} `}>2</h3>
            <h3>general info</h3>
          </div>
          <div className={style.num}>
            <h3>3</h3>
            <h3>Professional Info</h3>
          </div>
        </section>
        {/* End Num Section */}
        {/* Head Section */}
        <section className={style.head}>
          <h4>General Info</h4>
          <p>Tell companies more about yourself.</p>
        </section>
        {/* End Head Section */}
        {/* Content Section */}
        {loading ? (
          <Spinner />
        ) : (
          <form onSubmit={(e) => submit(e)}>
            <article className={style.content}>
              <span>Your Personal Info</span>
              <div className={style.name}>
                <label className="label--global" htmlFor="fname">
                  First Name
                </label>
                <input
                  className="txt text--name"
                  type="text"
                  name="fname"
                  placeholder="First Name"
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                />
              </div>
              <div className={style.name}>
                <label className="label--global" htmlFor="lname">
                  Last Name
                </label>
                <input
                  className="txt text--name"
                  type="text"
                  name="lname"
                  placeholder="Last Name"
                  value={lname}
                  onChange={(e) => setLname(e.target.value)}
                />
              </div>
              <label className="label--global">Birthday</label>
              <select
                className={`txt text--small form-select  ${style.name}`}
                id="day"
                name="dd"
                onChange={(e) => setDay(e.target.value)}
              ></select>
              <select
                className={`txt text--small form-select ${style.name}`}
                id="month"
                name="mm"
                onChange={(e) => {
                  setMonth(e.target.value);
                  change_month(e.target);
                }}
              ></select>
              <select
                className={`txt text--small form-select ${style.name}`}
                id="year"
                name="yyyy"
                onChange={(e) => {
                  setYear(e.target.value);
                  change_year(e.target);
                }}
              ></select>
              <label className="label--global">Gender</label>
              <div className="radio--block ">
                <input
                  name="gender"
                  type="radio"
                  id="gender1"
                  value="Male"
                  checked={gender === "Male"}
                  onChange={(e) => {
                    if (e.target.checked) setGender(e.target.value);
                  }}
                />
                <label htmlFor="gender1">Male</label>
              </div>
              <div className="radio--block">
                <input
                  name="gender"
                  type="radio"
                  id="gender2"
                  value="Female"
                  checked={gender === "Female"}
                  onChange={(e) => {
                    if (e.target.checked) setGender(e.target.value);
                  }}
                />
                <label htmlFor="gender2">Female</label>
              </div>

              <label className="label--global">Nationality</label>
              <input
                list="nat"
                placeholder="Select..."
                className="txt text--big text--customBig form-select"
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
              />
              <datalist id="nat">
                {country_list.map((country) => (
                  <option value={country.country} key={country._id}>
                    {country.country}
                  </option>
                ))}
              </datalist>
            </article>
            <article className={style.content}>
              <span>Your Location</span>
              <label className="label--global">Country</label>
              <input
                list="country"
                placeholder="Select..."
                className="txt text--big text--customBig form-select"
                value={country}
                onChange={(e) => {
                  changeCities(e.target.value);
                  setCountry(e.target.value);
                }}
              />
              <datalist id="country">
                {country_list.map((country) => (
                  <option value={country.country} key={country._id}>
                    {country.country}
                  </option>
                ))}
              </datalist>
              <label className="label--global" htmlFor="city">
                City
              </label>
              <input
                list="city"
                placeholder="Select..."
                className="txt text--big text--customBig form-select"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <datalist id="city">
                {cities.map((city) => (
                  <option value={city.city} key={city._id}>
                    {city.city}
                  </option>
                ))}
              </datalist>
            </article>
            <article className={style.content}>
              <span>Contact Info</span>
              <label className="label--global" htmlFor="phone">
                Phone Number
              </label>
              <input
                className="txt text--big text--customBig"
                type="tel"
                name="phone"
                value={phone_number}
                onChange={(e) => setPhone_number(e.target.value)}
              />
            </article>
            <span className="invalid cancel--onb">{error}</span>

            <div className="btn--wrap">
              <button
                onClick={() => router.back()}
                className=" btn--global btn--small btn--cancel cancel--onb"
              >
                back
              </button>
              <button
                className=" btn--global btn--blue  btn--onb"
                type="submit"
              >
                {submitting ? "Saving..." : "Save and Continue"}
              </button>
            </div>
          </form>
        )}
        {/* End Content Section */}
      </main>
    </>
  );
};
export default GInfo;
