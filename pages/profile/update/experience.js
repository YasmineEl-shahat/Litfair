import Layout from "../../../comps/layout";
import EditProfileSideBar from "../../../comps/EditProfileSideBar";
import style from "../../../styles/pages/EditProfile.module.scss";
import { useRouter } from "next/router";

import { useLayoutEffect, useEffect, useState, useContext } from "react";
import { AsyncPaginate } from "react-select-async-paginate";

import { backgroundSelect } from "../../../functions/backgroundSelect";
import { loadSkills } from "../../../functions/Api/loadOptions";

import AuthContext from "../../../context/AuthContext";
import Spinner from "../../../comps/Spinner";

const baseUrl = process.env.API_URL;

export const getStaticProps = async () => {
  const res = await fetch(baseUrl + "job-config");
  const { msg } = await res.json();

  return {
    props: { job: msg },
  };
};
const Experience = ({ job }) => {
  //state
  const [experience_lvl, setExperience_lvl] = useState("");
  const [skills, setSkills] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  //hooks
  const { auth, user } = useContext(AuthContext);
  const router = useRouter();

  useLayoutEffect(() => {
    backgroundSelect("expSide");
  }, []);

  useEffect(async () => {
    const user_id = user.id;
    //waiting for api response
    const res = await fetch(baseUrl + "seeker/details/view/" + user_id);
    const { experience_lvl, skills } = await res.json();
    const skills_ = skills.map((skill) => ({
      label: skill.skill,
      value: skill._id,
    }));

    setExperience_lvl(experience_lvl);
    setSkills(skills_);
    if (loading) setLoading(false);
  }, []);

  //functions
  const submit = async (e) => {
    //prevent page from reloading
    e.preventDefault();
    // change the submit button state
    setSubmitting(true);
    if (!skills || !experience_lvl) {
      setError("Fill the required fields!");
      setSubmitting(false);
    } else {
      setError("");

      //customize state to be sent in body
      const skills_ = skills.map((skill) => skill.value);

      //waiting for api response
      let response = await fetch(baseUrl + "seeker/details/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer" + " " + auth,
        },
        body: JSON.stringify({
          experience_lvl,
          skills: skills_,
        }),
      })
        // handle response's different status
        .then(async (response) => {
          if (response.ok) {
            setSubmitting(false);
            router.push("/");
          }
          if (response.status === 400) {
            // So, a server-side validation error occurred.
            // Server side validation returns a string error message, so parse as text instead of json.
            const error = response.text();
            throw new Error(error);
          }
          if (response.status === 502) {
            response.json().then((data) => {
              const { sent } = data;
            });
            throw new Error("Network response was not ok.");
          }
        })
        .catch((e) => {
          setSubmitting(false);
          setError(e.toString());
        });
    }
  };
  return (
    <>
      <main className={` ${style.main}`}>
        <EditProfileSideBar />
        {loading ? (
          <div>
            <Spinner />
          </div>
        ) : (
          <section className={`${style.info} ${style.car}`}>
            <form onSubmit={(e) => submit(e)}>
              <p>How many years of experience do you have?</p>

              <select
                value={experience_lvl}
                onChange={(e) => setExperience_lvl(e.target.value)}
                className="txt text--career form-select"
              >
                <option value="">Select ...</option>
                {Object.keys(job.experience_type).map((key, index) => (
                  <option value={job.experience_type[key]} key={key}>
                    {job.experience_type[key]}
                  </option>
                ))}
              </select>
              <p>What Skills, Tools....</p>

              <AsyncPaginate
                className="text--career"
                value={skills}
                placeholder="Ex. Digital Marketing"
                loadOptions={loadSkills}
                isMulti
                onChange={setSkills}
                closeMenuOnSelect={false}
              />
              <span className="invalid cancel--onb">{error}</span>
              <button
                className={`btn--global btn--blue  btn--onb ${style.btnExp}`}
                type="submit"
              >
                {submitting ? "Saving..." : "Save Changes"}
              </button>
            </form>
          </section>
        )}
      </main>
    </>
  );
};

Experience.getLayout = function getLayout(page) {
  return <Layout title="Experience">{page}</Layout>;
};

export default Experience;
