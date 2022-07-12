const baseUrl = process.env.API_URL;
import axios from "axios";

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

export const DeletePost = async (id, posts, setPosts, auth) => {
  const newPosts = posts.filter((post) => post._id !== id);
  setPosts(newPosts);
  // waiting for api response
  const options = { headers: { Authorization: "Bearer" + " " + auth } };

  axios.delete(baseUrl + "jobs/" + id, options);
};
