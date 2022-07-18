import style from "../styles/pages/Contact.module.scss";

import Layout from "../comps/Layout";

import AuthContext from "../context/AuthContext";
import { useContext, useState } from "react";
import { useRouter } from "next/router";

export const getServerSideProps = ({ query }) => {
  const isPartner = query.isPartner || false;

  return {
    props: { isPartner },
  };
};

const Contact = ({ isPartner }) => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const { auth } = useContext(AuthContext);
  const router = useRouter();

  const submit = async (e) => {
    e.preventDefault();
    if (!subject || !message) {
      setError("Please Fill The Required Fields");
      return;
    }
    setError("");
    const response = await fetch(baseUrl + "?isPart=" + isPartner, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer" + " " + auth,
      },
      body: JSON.stringify({
        subject,
        message,
      }),
    });
  };

  return (
    <>
      <div className={style.body}>
        <div className={style.box}>
          <form onSubmit={(e) => submit(e)}>
            <h3 className={`${style.contact} ${style.form}`}>
              {isPartner ? "Become our partner" : "Contact Us"}
            </h3>

            <div className="">
              <label className={`label--global ${style.form}`}>Subject</label>
              <input
                value={subject}
                onChange={(e) => {
                  setSubject(e.target.value);
                }}
                type="text"
                className={`txt ${style.txtBox}`}
              ></input>

              <label className={`label--global  ${style.form}`}>Message</label>
              <textarea
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                type="text"
                className={`txt txtArea ${style.txtBox}`}
              ></textarea>

              <div className={`invalid ${style.form}`}>{error}</div>

              <div className={style.fom}>
                <button
                  type="submit"
                  className={`btn--global btn--blue   ${style.send}`}
                >
                  Send
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
Contact.getLayout = function getLayout(page) {
  return <Layout title="Contact Us">{page}</Layout>;
};
export default Contact;
