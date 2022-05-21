import Link from "next/link";
import Image from "next/image";

const SeekerNavbar =() =>{
    return(
        <>
        <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
         {/* <div className="navbar-brand">
            <Link className="nav-link" href="/" passHref>
              <Image
                src="/assets/Landing/logo.png"
                alt="lol ya 7abeby"
                width={122}
           /     height={33}
              />
            </Link>
    </div>*/}
    <button className="btn btn--small">Hi</button>
          </div>
          </nav>
        </>
    )
}
export default SeekerNavbar;