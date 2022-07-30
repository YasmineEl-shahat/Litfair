import style from "../styles/pages/companyRegister.module.scss";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import Head from "next/head";
import { changeIcon } from "../functions/changePasswordIcon";
import { useState } from "react";
import { useRouter } from "next/router";

import AuthContext from "../context/AuthContext";
import { useContext } from "react";

const baseUrl = process.env.API_URL;

const CompanyRegister = () => {
  const router = useRouter();

  //extract context data
  const {
    companyRegister,
    backError,
    email,
    setEmail,
    password,
    setPassword,
    errors,
  } = useContext(AuthContext);

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
        </div>

        <div className={style.rightForm}>
          <div className="">
            <div className={style.imageDev}>
              <img
                className={style.image}
                src="assets\Landing/logo.png"
                alt="logo"
              />
            </div>

            <Link href="/seekerRegister" passHref>
              <span>
                <button className={style.seekerBtn} type="submit">
                  Job Seeker
                </button>
              </span>
            </Link>
            <Link href="/companyRegister" passHref>
              <span>
                <button className={style.companyBtn} type="submit">
                  Company
                </button>
              </span>
            </Link>

            <form onSubmit={(e) => companyRegister(e)}>
              {backError && (
                <div
                  style={{ textAlign: "center", fontSize: "2rem" }}
                  className="alert alert-danger"
                >
                  {backError}
                </div>
              )}
              <div className={style.textField}>
                <label className="label--global">Business Email</label>
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
                    changeIcon(e);
                  }}
                  className={`${style.passwordIcon} fa-solid fa-eye-slash`}
                ></i>
              </div>
              <div className="invalid">
                {errors.password ? errors.password : ""}
              </div>

              <br />
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
              <div>
                <button className="btn--big btn--white" type="submit">
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
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyRegister;
