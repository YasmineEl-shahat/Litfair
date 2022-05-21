import Layout from "../comps/layout";

import Landing from "../src/LandingPage";

const Home = () => {
  return <Landing />;
};

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Home;
