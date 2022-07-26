import Layout from "../../../comps/Layout";
import EditProfileSideBar from "../../../comps/EditProfileSideBar";
import carStyle from "../../../styles/pages/Career.module.scss";
import style from "../../../styles/pages/EditProfile.module.scss";
import { useLayoutEffect, useState, useContext } from "react";
import { backgroundSelect } from "../../../functions/backgroundSelect";
import { changeIcon } from "../../../functions/changePasswordIcon";
import AuthContext from "../../../context/AuthContext";
import { useRouter } from "next/router";

const baseUrl = process.env.API_URL;

const Password = () => {
  //state
  const [currentPass, setCurrentPass] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [currentSuc, setCurrentSuc] = useState(false);
  const [newP, setNewP] = useState("");
  const [confirm, setConfirm] = useState("");
  const [backError, setBackError] = useState("");

  //hooks
  const { auth } = useContext(AuthContext);
  const router = useRouter();

  useLayoutEffect(() => {
    backgroundSelect("passSide");
  }, []);

  //submittion

  const submit = async (pass, val) => {
    if (currentPass) setSubmitting(true);
    let response = await fetch(baseUrl + "user/changePassword", {
      method: "PUT",
      headers: {
        Authorization: "Bearer" + " " + auth,
        "Content-Type": "application/json",
      },
      body:
        pass === "oldPassword"
          ? JSON.stringify({
              oldPassword: val,
            })
          : JSON.stringify({
              newPassword: val,
            }),
      redirect: "follow",
    })
      .then(async (response) => {
        if (response.ok) {
          setCurrentSuc(true);
          setSubmitting(false);
          setBackError("");
          if (pass === "newPassword") router.push("/");
        }
        if (response.status === 401) {
          // So, a server-side validation error occurred.
          // Server side validation returns a string error message, so parse as text instead of json.
          const res = await response.json();
          const { msg } = res;
          setBackError(msg);
          throw new Error(msg);
        }
        if (response.status === 503) {
          setBackError("Network response was not ok.");

          throw new Error("Network response was not ok.");
        }
      })
      .catch((e) => {
        console.log(e);
        setSubmitting(false);
      });
  };

  const CheckCurrent = async (e) => {
    e.preventDefault();
    submit("oldPassword", currentPass);
  };

  const Change = async (e) => {
    e.preventDefault();
    if (newP !== confirm) setBackError("Password should match");
    else {
      submit("newPassword", newP);
    }
  };
  return (
    <>
      <main className={` ${style.main}`}>
        <EditProfileSideBar />
        <section className={style.info}>
          {!currentSuc ? (
            <>
              <section className={style.confirmPass}>
                <div className={carStyle.name}>
                  <label className="label--global" htmlFor="curpass">
                    Current Password
                  </label>
                  <div className={style.passContainer}>
                    <input
                      className="txt text--big"
                      type="password"
                      name="curpass"
                      placeholder="Enter Current Password"
                      value={currentPass}
                      onChange={(e) => setCurrentPass(e.target.value)}
                    />
                    <i
                      onClick={(e) => {
                        changeIcon(e);
                      }}
                      className="fa-solid fa-eye-slash"
                    ></i>
                  </div>
                </div>
                <br />
                <span className="invalid cancel--onb">{backError}</span>

                <button
                  onClick={(e) => CheckCurrent(e)}
                  className={`btn--global btn--blue btn--small  btn--onb `}
                  type="submit"
                >
                  {submitting ? "Checking..." : "Confirm"}
                </button>
              </section>
            </>
          ) : (
            <>
              <section>
                <div className={carStyle.name}>
                  <label className="label--global" htmlFor="npass">
                    New Password
                  </label>
                  <div className={style.passContainer}>
                    <input
                      className="txt text--big"
                      type="password"
                      name="npass"
                      value={newP}
                      onChange={(e) => setNewP(e.target.value)}
                    />
                    <i
                      onClick={(e) => {
                        changeIcon(e);
                      }}
                      className="fa-solid fa-eye-slash"
                    ></i>
                  </div>
                </div>
                <div className={carStyle.name}>
                  <label className="label--global" htmlFor="cpass">
                    Confirm Password
                  </label>
                  <div className={style.passContainer}>
                    <input
                      className="txt text--big"
                      type="password"
                      name="cpass"
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                    />
                    <i
                      onClick={(e) => {
                        changeIcon(e);
                      }}
                      className="fa-solid fa-eye-slash"
                    ></i>
                  </div>
                </div>
              </section>
              <span className="invalid cancel--onb">{backError}</span>
              <button
                className={`btn--global btn--blue  btn--onb ${style.btnExp}`}
                type="submit"
                onClick={(e) => Change(e)}
              >
                {submitting ? "Saving..." : "update password"}
              </button>
            </>
          )}
        </section>
      </main>
    </>
  );
};

Password.getLayout = function getLayout(page) {
  return <Layout title="Password">{page}</Layout>;
};

export default Password;
