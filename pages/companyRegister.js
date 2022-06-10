import style from "../styles/pages/companyRegister.module.scss";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import Head from "next/Head";
import { changeIcon } from "../functions/changePasswordIcon";
import { useState } from "react";
import { useRouter } from "next/router";
import React from "react";

const baseUrl = process.env.API_URL;

const CompanyRegister = () => {
  const router = useRouter();

  //state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  //validation
  const validateEmail = () => {
    const re =
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return re.test(email);
  };
  const validatePass = () => {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    return re.test(password);
  };
  const validate = () => {
    //step1 -- copy state
    // debugger;

    let newErrors = { ...errors };
    if (email === "") {
      // step2 -- edit state
      newErrors.email = "Email is required";
    } else if (!validateEmail()) {
      newErrors.email = "Email is invalid";
    } else {
      delete newErrors.email;
    }

    //pass validate
    if (password === "") {
      // step2 -- edit state
      newErrors.password = "password is required";
    } else if (!validatePass()) {
      newErrors.password =
        "password must be at least 8 small& capital letters, digits";
    } else {
      delete newErrors.password;
    }
    // step3 set state
    setErrors(newErrors);

    if (JSON.stringify(newErrors) !== "{}") return false;
    else return true;
  };

  const register = async (e) => {
    e.preventDefault();
    if (validate()) {
      //waiting for api response
      let response = await fetch(baseUrl + "adduser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          role: "Company",
        }),
      })
        .then(async (response) => {
          console.log(response);
          if (response.ok) {
            const res = await response.json();
            router.push("/login");
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
    }
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

            <form onSubmit={(e) => register(e)}>
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
