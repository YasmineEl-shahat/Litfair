const baseUrl = process.env.API_URL;

//sleep fun to wait before calling the api
const sleep = (ms) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });

//load skills from api
export const loadSkills = async (search, prevOptions) => {
  await sleep(1000);
  let slicedOptions = [];

  let response = await fetch(baseUrl + "skills/search?skill=" + search)
    .then(async (response) => {
      if (response.ok) {
        const responseJSON = await response.json();
        slicedOptions = responseJSON.map((skill) => ({
          value: skill._id,
          label: skill.skill,
        }));
      }
    })
    .catch((e) => {
      console.log(e);
    });

  return {
    options: slicedOptions,
    hasMore: true,
  };
};

//load job titles from api
export const loadJobTitles = async (search, prevOptions) => {
  await sleep(100);
  let slicedOptions = [];

  let response = await fetch(baseUrl + "jobTitle/search?jobTitle=" + search)
    .then(async (response) => {
      if (response.ok) {
        const responseJSON = await response.json();

        slicedOptions = responseJSON.map((job) => ({
          value: job._id,
          label: job["job title"],
        }));
      }
    })
    .catch((e) => {
      console.log(e);
    });

  return {
    options: slicedOptions,
    hasMore: true,
  };
};

//load job categories from api
export const loadJobCategories = async (search, prevOptions) => {
  await sleep(100);
  let slicedOptions = [];

  let response = await fetch(
    baseUrl + "jobCategories/search?jobCategory=" + search
  )
    .then(async (response) => {
      if (response.ok) {
        const responseJSON = await response.json();

        slicedOptions = responseJSON.map((job) => ({
          value: job._id,
          label: job.jobCategories,
        }));
      }
    })
    .catch((e) => {
      console.log(e);
    });

  return {
    options: slicedOptions,
    hasMore: true,
  };
};
