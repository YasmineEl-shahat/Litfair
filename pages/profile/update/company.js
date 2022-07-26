import Layout from "../../../comps/Layout";
import EditProfileSideBar from "../../../comps/EditProfileSideBar";
import style from "../../../styles/pages/EditProfile.module.scss";
import carStyle from "../../../styles/pages/Career.module.scss";
import { useLayoutEffect, useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { backgroundSelect } from "../../../functions/backgroundSelect";
import AuthContext from "../../../context/AuthContext";
import Spinner from "../../../comps/Spinner";

const baseUrl = process.env.API_URL;

const MainInfo = () => {
  //state
  const [cname, setCName] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [company_size, setCompany_size] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  //phone validation
  const validatePhone = () => {
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return re.test(phone_number);
  };

  //hooks
  const { auth, setName, user } = useContext(AuthContext);
  const router = useRouter();
  useLayoutEffect(() => {
    backgroundSelect("comSide");
  }, []);
  useEffect(async () => {
    //waiting for api response
    const id = user.id;

    let response = await fetch(baseUrl + "companies/profile/" + id + "/", {
      headers: {
        Authorization: "Bearer" + " " + auth,
      },
    });
    const res = await response.json();

    if (res) {
      setCName(res.msg.profile.name);
      setPhone_number(res.msg.profile.phone_number);
      setCompany_size(res.msg.profile.company_size);
      setDescription(res.msg.info.description);
      setLoading(false);
    }
  }, []);

  const submit = async (e) => {
    //prevent page from reloading
    e.preventDefault();
    // change the submit button state
    setSubmitting(true);
    if (!cname || !phone_number || !company_size || !description) {
      setError("Please Fill The Required Fields");
      setSubmitting(false);
      return;
    }
    if (!validatePhone()) {
      setError("Invalid phone");
      return;
    }
    setError("");
    const response = await fetch(baseUrl + "companies/profile/", {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer" + " " + auth,
      },
      body: JSON.stringify({
        name: cname,
        phone_number,
        company_size,
        description,
      }),
    })
      .then(async (response) => {
        if (response.ok) {
          setError("");
          setName(cname);
          localStorage.setItem("name", JSON.stringify(cname));
          setSubmitting(false);
          router.replace("/");
        } else {
          throw new Error("Network response was not ok.");
        }
      })
      .catch((e) => {
        setSubmitting(false);
        setError("Request Failed");
      });
  };

  return (
    <main className={` ${style.main}`}>
      <EditProfileSideBar />
      {loading ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <>
          <section className={style.info}>
            <h3 className="circlebef">Company Main Information</h3>
            {/* Content Section */}
            <form onSubmit={(e) => submit(e)}>
              <section>
                <div className={carStyle.name}>
                  <label className={`label--global`}>Company Name</label>
                  <input
                    value={cname}
                    onChange={(e) => {
                      setCName(e.target.value);
                    }}
                    type="text"
                    className="txt text--big"
                  ></input>
                </div>
                <div className={carStyle.name}>
                  <label className={`label--global `}>Company size</label>
                  <input
                    value={company_size}
                    onChange={(e) => {
                      setCompany_size(e.target.value);
                    }}
                    type="text"
                    className="txt text--big"
                  ></input>
                </div>
              </section>
              <section>
                <div className={carStyle.name}>
                  <label className={`label--global`}> Mobile Number</label>
                  <input
                    value={phone_number}
                    onChange={(e) => {
                      setPhone_number(e.target.value);
                    }}
                    type="text"
                    className="txt text--big"
                  ></input>
                </div>
                <div className={carStyle.name}>
                  <label className={`label--global `}> Description</label>
                  <input
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    type="text"
                    className="txt text--big"
                  ></input>
                </div>
              </section>
              <span className="invalid cancel--onb">{error}</span>
              <button
                className=" btn--global btn--blue  btn--onb"
                type="submit"
              >
                {submitting ? "Saving..." : "Save Changes"}
              </button>
            </form>
            {/* End Content Section */}
          </section>
        </>
      )}
    </main>
  );
};

MainInfo.getLayout = function getLayout(page) {
  return <Layout title="General Info">{page}</Layout>;
};

export default MainInfo;
