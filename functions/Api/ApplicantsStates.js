const baseUrl = process.env.API_URL;
export const changeState = async (job_id, auth, user_id, state, email_body) => {
  const res = await fetch(
    baseUrl + "feedback-email/" + job_id + "?user_state=" + state,
    {
      method: "POST",
      headers: {
        Authorization: "Bearer" + " " + auth,
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        user_id,
        email_subject:
          state === "rejected"
            ? "Unfortunately, you 're not selected!"
            : "Congrats, you 're selected!",
        email_body,
      }),
    }
  );
};
