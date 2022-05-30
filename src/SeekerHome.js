import style from "../styles/pages/SeekerHome.module.scss";
import AuthContext from "../context/AuthContext";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

//const {auth} = useContext(AuthContext);
//const router = useRouter();
//const [loading, setLoading]= useState(true);
//const [posts, setPosts]= useState([]);

const getData = async ()=> {
    const res =await fetch(baseUrl);
    const {data} = await res.json();
    setPosts(data);
    setLoading(false);


}
///useEffect(()=>{
 //   getData();

//},[]);
const SeekerHome =(props) =>{


  
    return(
        <>
        <div>
       {/* loading ? (<div>loading...</div>)*/}
        <span className={style.right}>

            
        </span>
        <span className={style.left}>

            
        </span>

        </div>
        </>
        
    )
}
export default SeekerHome;