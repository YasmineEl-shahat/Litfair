const baseUrl = process.env.API_URL;

export let postArray = [];
export const getPosts = async (auth) => {
  const res = await fetch(baseUrl + "companies/jobs/", {
    headers: {
      Authorization: "Bearer" + " " + auth,
    },
  });
  const { msg } = await res.json();
  postArray = msg;
};
