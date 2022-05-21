import Head from "next/head";
import style from "../../styles/pages/Career.module.scss";
import { change_month, change_year, birth } from "../../functions/birthdate";
import { useLayoutEffect, useState } from "react";

const GInfo = () => {
  useLayoutEffect(() => {
    birth();
  }, []);

  //state
  const [selectedCountry, setSelectedCountry] = useState("");

  //fill country list
  const countries = require("countrycitystatejson").getCountries();
  const country_names = countries.map((country) => country.name);
  country_names.sort();
  var countrylist = [];
  for (let i = 0; i < country_names.length; i++) {
    countrylist.push(
      <option value={country_names[i]}>{country_names[i]}</option>
    );
  }
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
        <form>
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
                required
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
                required
              />
            </div>
            <label className="label--global">Birthday</label>
            <select
              className={`txt text--small form-select  ${style.name}`}
              id="day"
              name="dd"
            ></select>
            <select
              className={`txt text--small form-select ${style.name}`}
              id="month"
              name="mm"
              onChange={change_month(this)}
            ></select>
            <select
              className={`txt text--small form-select ${style.name}`}
              id="year"
              name="yyyy"
              onChange={change_year(this)}
            ></select>
            <label className="label--global">Gender</label>
            <div className="radio--block ">
              <input name="gender" type="radio" id="gender1" value="Male" />
              <label htmlFor="gender1">Male</label>
            </div>
            <div className="radio--block">
              <input name="gender" type="radio" id="gender2" value="Female" />
              <label htmlFor="gender2">Female</label>
            </div>

            <label className="label--global">Nationality</label>
            <input
              list="nat"
              placeholder="Select..."
              className="txt text--big text--customBig form-select"
              required
            />
            <datalist id="nat">{countrylist}</datalist>
          </article>
          <article className={style.content}>
            <span>Your Location</span>
            <label className="label--global">Country</label>
            <input
              list="country"
              placeholder="Select..."
              className="txt text--big text--customBig "
              required
            />
            <datalist id="country">{countrylist}</datalist>
            <label className="label--global" htmlFor="city">
              City
            </label>
            <select id="city" name="city"></select>
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
              required
            />
          </article>
        </form>
        {/* End Content Section */}
      </main>
    </>
  );
};
export default GInfo;
