import style from "../styles/pages/companyRegister.module.scss";
import { BsEyeSlash } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import Head from "next/Head";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useState } from "react";
import cookieCutter from "cookie-cutter";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";

const baseUrl = process.env.API_URL;
const seekerRegister = () => {
  //extract context data
  const { onSubmit, backError } = useContext(AuthContext);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last name is required"),

    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  //const person = await validationSchema.validate(req.body);

  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  //submittion functions

  const submitGoogle = async () => {
    //waiting for api response
    let response = await fetch(baseUrl + "/google/login", {
      redirect: "follow",
      mode: "cors",
      credentials: "include",
      // "Access-Control-Allow-Origin": baseUrl + "google/login",
      "Access-Control-Allow-Credentials": "false",
    })
      .then(async (response) => {
        console.log(response);
        if (response.ok) {
          const res = await response.json();
          window.open(baseUrl + "google/login", "_self");
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
        // setBackError(e);
      });
  };
  return (
    <>
      <Head>
        <title>Register | LetFair</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={style.main}>
        <div className={style.photoWrap}>
          <img
            className={style.regImg}
            alt="hey"
            src="assets/register/reg-img.png"
            width="100%"
            height="100%"
          />

          <span className={style.circleTop}></span>

          <div className={style.header}>
            <b>
              You Are One Step Away From <br /> Finding Your Dream Job That
              <br />
              Suits Your Talent.
              <br />
            </b>
          </div>
        </div>

        <div className={style.rightForm}>
          <div className="">
            <div className={style.imageDev}>
              <img className={style.image} src="assets/Landing/logo.png" />
            </div>

            <Link href="/seekerRegister">
              <span>
                <button className={style.seekerBtn} type="submit">
                  Job Seeker
                </button>
              </span>
            </Link>
            <Link href="/companyRegister">
              <span>
                <button className={style.companyBtn} type="submit">
                  Company
                </button>
              </span>
            </Link>

            <form onSubmit={handleSubmit(onSubmit)}>
              {backError && (
                <div
                  style={{ textAlign: "center", fontSize: "2rem" }}
                  className="alert alert-danger"
                >
                  {backError}
                </div>
              )}
              <div className="row">
                <div className="col">
                  <div className={style.textField}>
                    <label className={`label--global ${style.fName}`}>
                      First Name
                    </label>

                    <input
                      {...register("firstName")}
                      className={`txt text--small ${style.fName} ${
                        errors.firstName ? "is-invalid invalid-txt " : ""
                      }`}
                      type="text"
                      placeholder="First Name"
                    />
                    <div className="invalid-feedback">
                      {errors.firstName?.message}
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className={style.textField}>
                    <label className={`label--global ${style.lName}`}>
                      Last Name
                    </label>

                    <input
                      {...register("lastName")}
                      className={`txt text--small ${style.lName} ${
                        errors.lastName ? "is-invalid invalid-txt" : ""
                      }`}
                      type="text"
                      placeholder="Last Name"
                    />
                    <div className="invalid-feedback">
                      {errors.lastName?.message}
                    </div>
                  </div>
                </div>
              </div>

              <div className={style.textField}>
                <label className="label--global">Email</label>

                <input
                  {...register("email")}
                  className={` txt text--big   ${
                    errors.email ? "is-invalid invalid-txt" : ""
                  }`}
                  type="text"
                  placeholder="Email"
                />

                <div className="invalid-feedback">{errors.email?.message}</div>
              </div>

              <div className={style.textField}>
                <label className="label--global">Password</label>
              </div>

              <div className={style.container}>
                <input
                  className={`txt text--big ${
                    errors.password ? "is-invalid invalid-txt" : ""
                  }`}
                  type="password"
                  placeholder="Password"
                  {...register("password")}
                />
                <div className="invalid-feedback">
                  {errors.password?.message}{" "}
                </div>
                <i
                  onClick={(e) => {
                    const pass =
                      e.target.parentElement.parentElement.firstChild;
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

              <div className={style.textField}>
                <label className="label--global">Confirm Password</label>
              </div>

              <div className={style.container}>
                <input
                  className={`txt text--big ${
                    errors.password ? "is-invalid invalid-txt" : ""
                  }`}
                  type="password"
                  placeholder="Password"
                  {...register("confirmPassword")}
                />
                <div className="invalid-feedback">
                  {errors.confirmPassword?.message}
                </div>
                <i
                  className={style.passwordIcon}
                  onClick={(e) => {
                    const pass =
                      e.target.parentElement.parentElement.firstChild;
                    pass.type == "password"
                      ? (pass.type = "text")
                      : (pass.type = "password");
                  }}
                >
                  {" "}
                  <BsEyeSlash />
                </i>
              </div>

              <div className={style.forget}>
                <span href="">Forget Password?</span>
              </div>

              <div>
                <button
                  className="btn--global btn--big btn--blue "
                  type="submit"
                >
                  Sign Up
                </button>
              </div>

              <div>
                <p className={style.txtGrey}>OR</p>
              </div>
            </form>
            <div>
              <button
                onClick={submitGoogle}
                className="btn--big btn--white"
                type="submit"
              >
                <span className={style.googleIcon}>
                  <FcGoogle />
                </span>
                Sign Up With Google
              </button>
            </div>

            <div className={style.policy}>
              <p>
                By Signing Up You Agree To The Terms Of Use And Privacy Policy
              </p>
            </div>
            <div className={style.txtBlue}>
              <span>Already on LitFair?</span>
              <Link href="/login" passHref>
                <span className={style.uTxtBlue}>login</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default seekerRegister;
