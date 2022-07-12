const baseUrl = process.env.API_URL;

export let savedArray = [];
export const getSaved = async (auth) => {
  const res = await fetch(baseUrl + "seeker/saved-jobs", {
    headers: {
      Authorization: "Bearer" + " " + auth,
    },
  });
  const { msg } = await res.json();
  savedArray = msg;
};

export const SaveJob = async (auth, id, setSavedJobs) => {
  savedArray = [...savedArray, id];
  if (setSavedJobs) setSavedJobs(savedArray);
  await fetch(baseUrl + "seeker/saved-jobs/" + id, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer" + " " + auth,
    },
  });
};

export const DeleteSaved = async (auth, id, setSavedJobs) => {
  savedArray = savedArray.filter((saved) => saved !== id);
  setSavedJobs(savedArray);

  await fetch(baseUrl + "seeker/saved-jobs/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer" + " " + auth,
    },
  });
};
