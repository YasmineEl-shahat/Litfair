import style from "../styles/pages/SeekerHome.module.scss";
import AuthContext from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

import Jobs from "../comps/jobs";


const SeekerHome = (props) => {
  //state
  
  return (
    <>
      <Jobs/>
    </>
  );
};
export default SeekerHome;
