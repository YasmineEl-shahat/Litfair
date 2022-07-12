


const baseUrl = process.env.API_URL;
//const { auth } = useContext(AuthContext);





export   const getData = async () => {
    const resjob = await fetch(baseUrl + "jobs", {
      headers: {
        Authorization: "Bearer" + " " + auth,
      },
    });
    const jobJson = await resjob.json();
    const jobs = jobJson.msg[0].current_data;

    const res = await fetch(baseUrl + "seeker/saved-jobs", {
      headers: {
        Authorization: "Bearer" + " " + auth,
      },
    });
    const { msg } = await res.json();
    let saved = [];

    jobs.map((job) => (msg.includes(job._id) ? saved.push(job) : ""));
    console.log(saved);
    setPosts(saved);
    setLoading(false);
  };