import style from "../styles/pages/login.module.scss";
import { BsEyeSlash } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";

// import GoogleLogin from "react-google-login";
import { GoogleLogin } from "@react-oauth/google";

import Head from "next/head";
import Link from "next/link";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
const baseUrl = process.env.API_URL;
const Login = () => {
  //extract context data
  const {
    login,
    backError,
    email,
    password,
    errors,
    setEmail,
    setPassword,
    submitting,
    googleLogin,
    handleGoogleFailure,
  } = useContext(AuthContext);

  //submittion
  const submitGoogle = async () => {
    //waiting for api response
    let response = await fetch(baseUrl + "google/login", {
      redirect: "follow",
      mode: "cors",
      credentials: "origin",
      // "Access-Control-Allow-Origin": true,
      // "Access-Control-Allow-Credentials": "false",
    })
      .then((response) => {
        console.log(response);
        if (response.ok) {
          // const res = response.json();
          console.log(res);
          // window.open(baseUrl + "google/login", "_self");
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
  };

  return (
    <>
      <Head>
        <title>Login | LitFair</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={style.mainDev}>
        <div className={style.centerForm}>
          <div className={style.imageDev}>
            <img
              className={style.image}
              src="/assets/Landing/logo.png"
              alt="logo"
            />
          </div>
          <h2 className={style.texthead}>Welcome to LitFair! </h2>

          <form onSubmit={(e) => login(e)}>
            {backError && (
              <div
                style={{ textAlign: "center", fontSize: "2rem" }}
                className="alert alert-danger"
              >
                {backError}
              </div>
            )}
            <div className={style.textField}>
              <label className="label--global">Email</label>
            </div>

            <input
              className={`txt text--big ${errors.email ? "invalid-txt" : ""}`}
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <div className="invalid">{errors.email ? errors.email : ""}</div>

            <div className={style.textField}>
              <label className="label--global">Password</label>
            </div>

            <div className={style.container}>
              <input
                className={`txt text--big ${
                  errors.password ? "invalid-txt" : ""
                }`}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <i
                onClick={(e) => {
                  const pass = e.target.parentElement.parentElement.firstChild;
                  pass.type == "password"
                    ? (pass.type = "text")
                    : (pass.type = "password");
                }}
                className={style.passwordIcon}
              >
                {" "}
                <BsEyeSlash />
              </i>
            </div>
            <div className="invalid">
              {errors.password ? errors.password : ""}
            </div>

            <div className={style.forget}>
              <span href="">Forget Password?</span>
            </div>

            <div>
              <button
                className="btn btn--global btn--big btn--blue "
                type="submit"
              >
                {submitting ? "Logging..." : "Log In"}
              </button>
            </div>
          </form>
          <div>
            <p className={style.txtGrey}>OR</p>
          </div>

          <div>
            <button className="btn--big btn--white" type="submit">
              <span className={style.googleIcon}>
                <FcGoogle />
              </span>
              Sign Up With Google
            </button>
            {/* <GoogleLogin
              // className="btn btn--big btn--white"
              clientId={process.env.GOOGLE_CLIENT_ID}
              buttonText="Log in with Google"
              onSuccess={googleLogin}
              onFailure={handleGoogleFailure}
              cookiePolicy={"single_host_origin"}
            ></GoogleLogin> */}
          </div>
          <div className={style.txtBlue}>
            <span>New on LitFair?</span>
            <Link href="/seekerRegister" passHref>
              <span className={style.uTxtBlue}>sign up</span>
            </Link>
          </div>
        </div>
        <span className={`d-md-block d-none ${style.circleTop} `}></span>
        <span className={`d-md-block d-none ${style.circleBottom}`}></span>
      </div>
    </>
  );
};
export default Login;
