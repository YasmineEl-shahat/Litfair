import Layout from "../../../comps/layout";
import styleVid from "../../../styles/pages/Interview.module.scss";
import style from "../../../styles/pages/Applicants.module.scss";
import { Card } from "../../../comps/applicant-card";
const TopApplicants = () => {
  return (
    <>
      <main className={`container ${styleVid.mainCont}`}>
        {" "}
        <article className={styleVid.questionCarCont}>
          <section className={style.cardWrap}>
            <Card
              imgSrc="/assets/profile/blank-profile-picture.png"
              name="Adele El-shahat"
              rate="7"
              applicationId="62cc178cd83bb666cf07c11e"
            />
            <Card
              imgSrc="/assets/profile/blank-profile-picture.png"
              name="Adele El-shahat"
              rate="7"
              applicationId="62cc178cd83bb666cf07c11e"
            />
            <Card
              imgSrc="/assets/profile/blank-profile-picture.png"
              name="Adele El-shahat"
              rate="7"
              applicationId="62cc178cd83bb666cf07c11e"
            />
          </section>
        </article>
      </main>
    </>
  );
};

TopApplicants.getLayout = function getLayout(page) {
  return <Layout title="Top Applicants">{page}</Layout>;
};

export default TopApplicants;
