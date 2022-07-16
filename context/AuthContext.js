import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import cookieCutter from "cookie-cutter";
import { useRouter } from "next/router";

const AuthContext = createContext();
export default AuthContext;

const baseUrl = process.env.API_URL;

export const AuthProvider = ({ children }) => {
  const router = useRouter();

  //state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [backError, setBackError] = useState("");
  const [submitting, setSubsubmitting] = useState(false);
  let [auth, setAuth] = useState(() =>
    typeof window !== "undefined" && cookieCutter.get("auth")
      ? cookieCutter.get("auth")
      : null
  );
  let [user, setUser] = useState(() =>
    typeof window !== "undefined" && cookieCutter.get("auth")
      ? jwt_decode(cookieCutter.get("auth"))
      : null
  );
  const [image, setImage] = useState(() =>
    typeof window !== "undefined" && localStorage.getItem("image")
      ? JSON.parse(localStorage.getItem("image"))
      : ""
  );
  const [name, setName] = useState(() =>
    typeof window !== "undefined" && localStorage.getItem("name")
      ? JSON.parse(localStorage.getItem("name"))
      : ""
  );

  //log out
  const logoutUser = () => {
    setAuth(null);
    setUser(null);
    document.cookie = "auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

    router.replace("/");
  };

  //handle Expired tokens
  const checkToken = async () => {
    let response = await fetch(baseUrl + "jwtValidate", {
      headers: {
        Authorization: "Bearer" + " " + auth,
      },
    });
    if (response.status === 200) {
      let { tokenObject } = await response.json();
      setAuth(tokenObject);
      setUser(jwt_decode(tokenObject));
      if (typeof window !== "undefined") {
        // cookieCutter.set("auth", "", { expires: new Date(0) });
        cookieCutter.set("auth", tokenObject);
      }
    } else {
      logoutUser();
    }
  };

  //renew token on every reload
  useEffect(() => {
    const path = ["/login", "/seekerRegister", "/companyRegister"];
    if (!path.includes(router.asPath) && auth) checkToken();
    else if (!path.includes(router.asPath) && router.asPath !== "/")
      router.replace("/");
    let hour = 1000 * 60 * 60;
    let interval = setInterval(function () {
      if (!path.includes(router.asPath) && auth) checkToken();
    }, hour);
  }, [auth]);

  //validation
  const validate = () => {
    //step1 -- copy state
    let newErrors = { ...errors };
    if (email === "") {
      // step2 -- edit state
      newErrors.email = "Email is required";
    } else {
      delete newErrors.email;
    }

    //pass validate
    if (password === "") {
      // step2 -- edit state
      newErrors.password = "password is required";
    } else {
      delete newErrors.password;
    }

    // step3 set state
    setErrors(newErrors);

    if (JSON.stringify(newErrors) !== "{}") return false;
    else return true;
  };

  //company validation
  const validateEmail = () => {
    const re =
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return re.test(email);
  };
  const validatePass = () => {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    return re.test(password);
  };
  const validateCompany = () => {
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
  //seekerRegister
  async function onSubmit(data) {
    // display form data on success
    const { firstName, lastName, email, password } = data;
    //waiting for api response
    let response = await fetch(baseUrl + "adduser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        role: "Seeker",
        fname: firstName,
        lname: lastName,
      }),
    })
      .then(async (response) => {
        if (response.ok) {
          const res = await response.json();
          const { TokenObject } = res;
          setAuth(TokenObject);
          setUser(jwt_decode(TokenObject));

          cookieCutter.set("auth", TokenObject);

          router.replace("/registeredSuccessfully");
        }
        if (response.status === 400) {
          // So, a server-side validation error occurred.
          // Server side validation returns a string error message, so parse as text instead of json.
          const res = await response.json();
          const { msg } = res;
          if (msg === "Validation error") {
            setBackError("Email taken");
            throw new Error("Email taken");
          }
        }
        if (response.status === 502) {
          setBackError("Network response was not ok.");
          throw new Error("Network response was not ok.");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  // Company Register
  const companyRegister = async (e) => {
    e.preventDefault();
    if (validateCompany()) {
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
          if (response.ok) {
            const res = await response.json();
            const { TokenObject } = res;
            setAuth(TokenObject);
            setUser(jwt_decode(TokenObject));

            cookieCutter.set("auth", TokenObject);
            router.replace("/companyOnboarding");
          } else {
            const res = await response.json();
            const { msg } = res;
            if (msg === "Validation error") {
              setBackError("Email taken");
              throw new Error("Email taken");
            } else {
              setBackError(msg);
              throw new Error(msg);
            }
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  //login
  const login = async (e) => {
    e.preventDefault();
    // change the submit button state

    if (validate()) {
      //waiting for api response
      setSubsubmitting(true);

      let response = await fetch(baseUrl + "login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then(async (response) => {
          if (response.ok) {
            const res = await response.json();

            setBackError("");
            const { tokenObject } = res;
            setAuth(tokenObject);
            setUser(jwt_decode(tokenObject));
            cookieCutter.set("auth", tokenObject);
            if (user.role === "Seeker") {
              const resDes = await fetch(
                baseUrl + "seeker/details/view/" + user.id
              );
              const { profile_picture } = await resDes.json();
              setImage(profile_picture);
              localStorage.setItem("image", JSON.stringify(profile_picture));
              let response = await fetch(baseUrl + "seeker/profile/info", {
                headers: {
                  Authorization: "Bearer" + " " + auth,
                },
              });
              const res = await response.json();
              if (res) {
                setName(`${res.fname} ${res.lname}`);
                localStorage.setItem(
                  "name",
                  JSON.stringify(`${res.fname} ${res.lname}`)
                );
              }
              setSubsubmitting(false);
              router.replace("/");
            } else {
              const res = await fetch(
                baseUrl + "companies/profile/" + user.id,
                {
                  headers: {
                    Authorization: "Bearer" + " " + auth,
                  },
                }
              );
              const { msg } = await res.json();

              setName(msg.profile.name);
              setImage(msg.info.logo);
              localStorage.setItem("name", JSON.stringify(msg.profile.name));
              localStorage.setItem("image", JSON.stringify(msg.info.logo));
              setSubsubmitting(false);
              router.replace("/");
            }
          }
          if (response.status === 500) {
            // So, a server-side validation error occurred.
            // Server side validation returns a string error message, so parse as text instead of json.
            const error = response.text();
            setBackError("server-side validation error occurred.");
            throw new Error(error);
          }
          if (response.status === 401) {
            //invalid user
            const error = response.statusText;
            setBackError("!Invalid user");

            throw new Error(error);
          }
          if (response.status === 502) {
            setBackError("Network response was not ok.");
            throw new Error("Network response was not ok.");
          }
        })
        .catch((e) => {
          setSubsubmitting(false);
        });
    }
  };

  //google login
  const googleLogin = async (googleData) => {
    const res = await fetch(baseUrl + "auth/google", {
      method: "POST",
      body: JSON.stringify({
        token: googleData.tokenId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resp = await response.json();

    // if (response.status === 200) {
    //   console.log(resp);
    //   const { tokenObject } = resp;
    //   setAuth(tokenObject);
    //   setUser(jwt_decode(tokenObject));
    //   cookieCutter.set("auth", tokenObject);
    //   router.replace("/");
    // } else {
    //   console.log("lol ya 7abeby");
    // }
  };
  const handleGoogleFailure = (result) => {
    alert(JSON.stringify(result));
  };
  let contextData = {
    login,
    backError,
    email,
    password,
    errors,
    setEmail,
    setPassword,
    submitting,
    auth,
    user,
    name,
    image,
    logoutUser,
    googleLogin,
    handleGoogleFailure,
    onSubmit,
    companyRegister,
  };
  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
