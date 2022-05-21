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

  //log out
  const logoutUser = () => {
    setAuth(null);
    setUser(null);
    if (typeof window !== "undefined") {
      cookieCutter.set("auth", "", { expires: new Date(0) });
    }
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
      if (typeof window !== "undefined") cookieCutter.set("auth", tokenObject);
    } else {
      logoutUser();
    }
  };

  //renew token on every reload
  useEffect(() => {
    checkToken();

    let hour = 1000 * 60 * 60;
    let interval = setInterval(function () {
      if (auth) checkToken();
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
            setSubsubmitting(false);
            setBackError("");
            const { tokenObject } = res;
            setAuth(tokenObject);
            setUser(jwt_decode(tokenObject));

            cookieCutter.set("auth", tokenObject);
            router.replace("/");
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
    logoutUser,
    googleLogin,
    handleGoogleFailure,
  };
  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
