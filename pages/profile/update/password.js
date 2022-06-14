import Layout from "../../../comps/layout";
import EditProfileSideBar from "../../../comps/EditProfileSideBar";
import carStyle from "../../../styles/pages/Career.module.scss";
import style from "../../../styles/pages/EditProfile.module.scss";
import { useLayoutEffect, useState } from "react";
import { backgroundSelect } from "../../../functions/backgroundSelect";
import { changeIcon } from "../../../functions/changePasswordIcon";
const Password = () => {
  //state
  const [submitting, setSubmitting] = useState(false);
  const [currentSuc, setCurrentSuc] = useState(false);

  useLayoutEffect(() => {
    backgroundSelect("passSide");
  }, []);
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
                <button
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
              <button
                className={`btn--global btn--blue  btn--onb ${style.btnExp}`}
                type="submit"
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
