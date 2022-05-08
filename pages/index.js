import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import Layout from "../comps/layout";

import style from "../styles/pages/Home.module.scss";

import Icon from "@mdi/react";
import {
  mdiBriefcaseOutline,
  mdiDomain,
  mdiAccountGroupOutline,
  mdiSchoolOutline,
  mdiConsoleNetworkOutline,
  mdiAccountCogOutline,
} from "@mdi/js";

const Home = () => {
  return (
    <>
      <Head>
        <title>LitFair | Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container">
        {/* welcome Section */}
        <section className={`row ${style.welcomeSec}`}>
          <div className="col-sm-6">
            <h2>welcome to litfair</h2>
            <div className={style.welcome}>
              The all-in-one AI-Powered
              <br /> solution for the job hunters <br />
              and talent acquisition team.
              <br />
              <Link className="nav-link" href="/register" passHref>
                <button className="btn btn--global btn--small btn--blue">
                  Get Started
                </button>
              </Link>
            </div>
          </div>

          <Image
            className="col-sm-6 "
            src="/assets/Landing/businessman-hand-using-laptop-computer-office.png"
            alt="lol ya 7abeby"
            width={400}
            height={300}
          />
        </section>
        {/*ُEnd welcome Section */}
        {/* Adv section */}
        <section className={style.AdvSec}>
          <div className={style.Adv}>
            <div className={style.icon}>
              <Icon path={mdiBriefcaseOutline} size={3.5} />
            </div>
            <div className={style.static}>
              <h3>+20</h3>
              <p>jobs added</p>
            </div>
          </div>
          <div className={style.Adv}>
            <div className={style.icon}>
              <Icon path={mdiDomain} size={3.5} />
            </div>
            <div className={style.static}>
              <h3>+50</h3>
              <p>companies</p>
            </div>
          </div>
          <div className={style.Adv}>
            <div className={style.icon}>
              <Icon path={mdiAccountGroupOutline} size={3.5} />
            </div>
            <div className={style.static}>
              <h3>+90</h3>
              <p>employee</p>
            </div>
          </div>
        </section>
        {/* End Adv Section */}
        {/* Categories section */}
        <section className={style.categorySec}>
          <div className="HeadBackgroundWrap">
            <h1>popular job categories</h1>
          </div>
          <div className={style.AdvWrap}>
            <div className={style.Adv}>
              <div className={style.icon}>
                <Image
                  width={80}
                  height={80}
                  src="/assets/landing/graphic-design-svgrepo-com.png"
                  alt="lol"
                />
              </div>
              <div className={style.detail}>
                <h3>Creative Design Art</h3>
                +120 jobs are available
              </div>
            </div>
            <div className={style.Adv}>
              <div className={style.icon}>
                <Image
                  width={80}
                  height={80}
                  src="/assets/landing/helmet-industry-business-construction-engineer-worker-engineering-svgrepo-com.png"
                  alt="lol"
                />
              </div>
              <div className={style.detail}>
                <h3>Engineering Construction</h3>
                +50 jobs are available
              </div>
            </div>
            <div className={style.Adv}>
              <div className={style.icon}>
                <i className="fa-solid fa-calculator"></i>
              </div>
              <div className={style.detail}>
                <h3>Accounting/Finance</h3>
                +30 jobs are available
              </div>
            </div>
            <div className={style.Adv}>
              <div className={style.icon}>
                <Icon path={mdiSchoolOutline} size={5} />
              </div>
              <div className={style.detail}>
                <h3>education</h3>
                +20 jobs are available
              </div>
            </div>
            <div className={style.Adv}>
              <div className={style.icon}>
                <Icon path={mdiConsoleNetworkOutline} size={5} />
              </div>
              <div className={style.detail}>
                <h3>IT/Software Development</h3>
                +20 jobs are available
              </div>
            </div>
            <div className={style.Adv}>
              <div className={style.icon}>
                <Icon path={mdiAccountCogOutline} size={5} />
              </div>
              <div className={style.detail}>
                <h3>Administration</h3>
                +20 jobs are available
              </div>
            </div>
          </div>
        </section>
        {/* End Categories section */}

        {/* Guides Section */}
        <section>
          <div className="HeadBackgroundWrap">
            <h1>how it works</h1>
          </div>
          <div className={` ${style.guides}`}>
            <article>
              <h3 className={style.hidNum}>Step 1</h3>
              <span className={style.firstWord}>Create</span> a new account
              <br />
              that contains all of your
              <br /> career information.
            </article>
            <article className={`${style.num}`}>1</article>
            <article>
              <Image
                src="/assets/Landing/reg.png"
                width={300}
                height={400}
                alt="lol"
              />
            </article>
          </div>
          <div className={` ${style.guides}`}>
            <article>
              <Image
                src="/assets/Landing/Jobs.png"
                width={500}
                height={400}
                alt="lol"
              />
            </article>
            <article className={`${style.num}`}>2</article>
            <article>
              <h3 className={style.hidNum}>Step 2</h3>
              <span className={style.firstWord}>Apply</span> for a position
              <br />
              that matches your skills
              <br />
            </article>
          </div>
          <div className={` ${style.guides}`}>
            <article>
              <h3 className={style.hidNum}>Step 3</h3>
              <span className={style.firstWord}>Track</span> your application
              <br />
              state in each of Our <br />
              automated processes <br />
              and enjoy a fruitful <br />
              recruiting.
            </article>
            <article className={`${style.num}`}>3</article>
            <article>
              <Image
                src="/assets/Landing/track.png"
                width={300}
                height={300}
                alt="lol"
              />
            </article>
          </div>
        </section>
        {/* End Guides Section */}
        {/* Mobile App Section */}
        <section className={style.mobileApp}>
          <article>
            <h1>Bring LitFair</h1>
            wherever you go with
            <br /> our Mobile application.
            <br />
            <a
              target="_blank"
              rel="noreferrer"
              href="https://play.google.com/store/apps/details?id=com.trashat.app"
            >
              <Image
                src="/assets/Landing/googlePlay.png"
                width={250}
                height={80}
                alt="Get it on google play ya bro"
              />
            </a>
          </article>
          <div className={style.mob}>
            <Image
              src="/assets/Landing/app.png"
              width={550}
              height={600}
              alt="Get it on google play ya bro"
            />
          </div>
        </section>
        {/* End Mobile App Section */}
      </main>
    </>
  );
};

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Home;
