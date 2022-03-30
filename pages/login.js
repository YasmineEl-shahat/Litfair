import style from  "../styles/pages/login.module.scss";
import {BsEyeSlash} from "react-icons/bs";
import {FcGoogle} from "react-icons/fc";


const login  =()=> {
 

    return(
        <> 
        <div className={style.mainDev}>
        <div  className={style.centerForm}>
            <div  className={style.imageDev}>
            <img  className={style.image} src="assets\Landing/logo.png"  />
            </div>
        <h2 className= {style.texthead} >Welcome back to LitFair! </h2>

            
            <form  action=""  className="" > 
                

            <div className={style.textField} >
                <label className="label--global" >Email</label><br/>
                </div>
                
                    <input className=  "txt text--big "  type="email" placeholder="Email" />
                




                <div className={style.textField} >
                <label className="label--global">Password</label>
                </div>

            
                <div  className={style.container}>
                    <input className="txt text--big" type= "password" placeholder="Password"  />
                    <i className={style.passwordIcon}> <BsEyeSlash/></i>
                </div>
     

                <div className={style.forget}>
                <span  href="" >Forget Password?</span>
                
                 </div>

                
                <div>
                    <button className="btn--global btn--big btn--blue " type="submit"  >Log In</button>
                </div>

                <div>

                <p className={style.txtGrey} >
                    OR
                </p>
                </div>

                <div>
                    <button className="btn--big btn--white"
                     type="submit"><span className={style.googleIcon}><FcGoogle/></span>

                     Sign Up With Google</button>

                </div>
                <div className={style.txtBlue}  >
                    <span >New on LitFair?</span>
                    <span className={style.uTxtBlue}>sign up</span>
                </div>



                
                      
            
            </form>
            </div>
            <span className={style.circleTop}></span>
            <span className={style.circleBottom}></span>

            </div>

            
        </>
    );
};
export default login;