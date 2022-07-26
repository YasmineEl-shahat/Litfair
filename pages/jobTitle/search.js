import Jobs from "../../comps/jobs";
const baseUrl = process.env.API_URL;
import Layout from "../../comps/Layout";
export async function getServerSideProps({ query }) {
  const searchQuery = query.jobTitle || "";

  const jobRes = await fetch(
    baseUrl + "jobTitle/search?jobTitle=" + searchQuery
  );
  const job = await jobRes.json();
  return {
    props: { job }, // will be passed to the page component as props
  };
}
const Search = ({ job }) => {
  return (
    <>
      <Jobs posts={job} />
    </>
  );
};
Search.getLayout = function getLayout(page) {
  return <Layout title="Job Search">{page}</Layout>;
};
export default Search;
