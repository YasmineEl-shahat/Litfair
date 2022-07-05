import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const ToFace = () => {
    window.open("http://www.facebook.com/trashat", "_blank");
  };
  const ToTwitt = () => {
    window.open("http://www.twitter.com/trashat", "_blank");
  };
  return (
    <>
      <footer className="panel-footer">
        <div className="container">
          <div className="row">
            <section className="col-sm-3 logo-white">
              <Image
                src="/assets/Landing/logoWhite.png"
                alt="lol ya 7abeby"
                width={122}
                height={33}
              />
            </section>
            <hr className="d-none d-sm-block d-md-none" />
            <section className="col-sm-3">
              <Link href="/" passHref>
                <span className="heading">home</span>
              </Link>
              <br />
              <Link href="/about" passHref>
                <span className="info">about us</span>
              </Link>
              <br />
              <Link href="/process" passHref>
                <span className="info">our process</span>
              </Link>
              <br />
              <Link href="/services" passHref>
                <span className="info">services</span>
              </Link>
              <br />
            </section>
            <hr className="d-none d-sm-block d-md-none" />

            <section className="col-sm-3">
              <Link href="/jobs" passHref>
                <span className="heading">latest jobs</span>
              </Link>
              <br />
              <Link href="/about" passHref>
                <span className="info">about us</span>
              </Link>
              <br />
              <Link href="/process" passHref>
                <span className="info">our process</span>
              </Link>
              <br />
              <Link href="/services" passHref>
                <span className="info">services</span>
              </Link>
              <br />
            </section>
            <hr className="d-none d-sm-block d-md-none" />

            <section className="col-sm-3" id="contact">
              <span className="heading connect">stay connected</span>
              <br />
              <a onClick={ToFace} passHref>
                <span className="info">
                  <i className="fa-brands fa-facebook"></i> facebook
                </span>
              </a>
              <br />
              <a onClick={ToTwitt} passHref>
                <span className="info">
                  <i className="fa-brands fa-twitter"></i> twitter
                </span>
              </a>
              <br />
              <br />
              <br />
              <div>
                &copy; 2022 Litfair. All rights are reserved
                <br />
                <span className="owe">owned by</span> Trashat.
              </div>
            </section>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
