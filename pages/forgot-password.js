import Layout from "../comps/Layout";
import Image from "next/image";
import style from "../styles/pages/Forgot.module.scss";
const Forget = () => {
  return (
    <main className={style.main}>
      <Image
        alt="forget password"
        width={400}
        height={250}
        src="/assets/forgetPass.svg"
      />
      <section>
        <h4>Forgot your password?</h4>
        <p>Recover your account. We will send you a verification code.</p>
        {/* <div className={style.textField}> */}
        <label className="label--global">Email</label>
        {/* </div> */}

        <input
          className="txt"
          type="text"
          placeholder="Email"
          //   value={email}
          //   onChange={(e) => {
          //     setEmail(e.target.value);
          //   }}
        />

        <button className="btn--global btn--big btn--blue " type="submit">
          {/* {submitting ? "Logging..." : "Log In"} */}
          Reset Password
        </button>
      </section>
    </main>
  );
};

Forget.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
export default Forget;
