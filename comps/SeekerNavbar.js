import Link from "next/link";
import Image from "next/image";
import { AsyncPaginate } from "react-select-async-paginate";

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
                    <button className="  btn--small button bar">
                      Applications
                    </button>
                  </Link>
                </li>
                <li className="nav-item">

                <div class="input-group">
                <div class="form-outline">
              <input type="search" id="form1" class="form-control" />
               <label class="form-label" for="form1">Search</label>
               </div>
               
               <button >
                <i class="fas fa-search"></i>
                   </button>
                    </div>
                </li>
                
              </ul>
            </div>
            </div>
          </nav>
        </>
    )
}
export default SeekerNavbar;
