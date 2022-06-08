import Layout from "../../../comps/layout";
import EditProfileSideBar from "../../../comps/EditProfileSideBar";
import style from "../../../styles/pages/EditProfile.module.scss";
import carStyle from "../../../styles/pages/Career.module.scss";
import { useLayoutEffect, useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";

import { backgroundSelect } from "../../../functions/backgroundSelect";
import AuthContext from "../../../context/AuthContext";
import { Spinner } from "react-bootstrap";

const baseUrl = process.env.API_URL;

export const getStaticProps = async () => {
  const res = await fetch(baseUrl + "location/countries");
  const countries = await res.json();

  return {
    props: { countries: countries },
  };
};

const GeneralInfo = (countries) => {
  //state
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [description, setDescription] = useState("");
  const [cities, setCities] = useState([]);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [nationality, setNationality] = useState("");
  const [submitting, setSubsubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  // variables
  const country_list = countries.countries;
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

  //hooks
  const { auth, user } = useContext(AuthContext);
  const router = useRouter();
  useLayoutEffect(() => {
    backgroundSelect("generalSide");
  }, []);
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
          setLoading(false);
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

  return (
    <main className={` ${style.main}`}>
      <EditProfileSideBar />
      {loading ? (
        <Spinner />
      ) : (
        <section className={style.info}>
          <h3 className="circlebef">Basic Info</h3>
          {/* Content Section */}
          <form onSubmit={(e) => submit(e)}>
            <section>
              <div className={carStyle.name}>
                <label className="label--global" htmlFor="fname">
                  First Name
                </label>
                <input
                  className="txt text--big"
                  type="text"
                  name="fname"
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                />
              </div>
              <div className={carStyle.name}>
                <label className="label--global" htmlFor="lname">
                  Last Name
                </label>
                <input
                  className="txt text--big"
                  type="text"
                  name="lname"
                  value={lname}
                  onChange={(e) => setLname(e.target.value)}
                />
              </div>
            </section>
            <section>
              <div className={carStyle.name}>
                <label className="label--global">Nationality</label>
                <input
                  list="nat"
                  placeholder="Select..."
                  className="txt text--big text--customBig"
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
              </div>
              <div className={carStyle.name}>
                <label className="label--global" htmlFor="phone">
                  Phone Number
                </label>
                <input
                  className="txt text--big"
                  type="text"
                  name="phone"
                  value={phone_number}
                  onChange={(e) => setPhone_number(e.target.value)}
                />
              </div>
            </section>
            <section>
              <div className={`${carStyle.name} ${style.txtar}`}>
                <label className="label--global" htmlFor="Description">
                  Description
                </label>
                <textarea
                  className="txt txtArea"
                  name="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </section>
            <h3 className="circlebef">Address</h3>
            <section>
              <div className={carStyle.name}>
                <label className="label--global">Country</label>
                <input
                  list="country"
                  placeholder="Select..."
                  className="txt text--big text--customBig "
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
              </div>
              <div className={carStyle.name}>
                <label className="label--global" htmlFor="city">
                  City
                </label>
                <input
                  list="city"
                  placeholder="Select..."
                  className="txt text--big text--customBig "
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
              </div>
            </section>
            <button className=" btn--global btn--blue  btn--onb" type="submit">
              {submitting ? "Saving..." : "Save Changes"}
            </button>
          </form>
          {/* End Content Section */}
        </section>
      )}
    </main>
  );
};

GeneralInfo.getLayout = function getLayout(page) {
  return <Layout title="General Info">{page}</Layout>;
};

export default GeneralInfo;
