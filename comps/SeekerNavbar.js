import Link from "next/link";
import Image from "next/image";
import style from "../styles/pages/SeekerHome.module.scss";


const SeekerNavbar =() =>{
    return(
        <>
        <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
        
       

          <div
              className="navbar-collapse collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" href="" passHref>
                    <button className="  btn--small bar ">
                      Job Browser
                    </button>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="" passHref>
                    <button className="  btn--small bar">
                      Saved
                    </button>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="" passHref>
                    <button className="btn--small button bar">
                      Applications
                    </button>
                  </Link>
                </li>
                  <li className="nav-item">

               
            <input type="text" class="searching" placeholder="Search for jobs, companies.." />
  
               <button >
                <i class="fas fa-search searchIcon"></i>
               </button>
    
                </li>
                <li className="nav-item">
                <img src="assets/Landing/logo.png" className="photo"></img>
                <div>
                  

                </div>

      {/*          <button
            className=" navbar-toggler navbar-toggler-right collapsed custom-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className=" navbar-toggler-icon"></span>
    </button>*/}
                </li>
                
              </ul>
            </div>
            </div>
          </nav>
        </>
    )
}
export default SeekerNavbar;
