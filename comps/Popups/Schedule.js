import { hideElement } from "../../functions/hideElement";
import { disableBtn, EnableBtn } from "../../functions/ButtonsFun";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

const baseUrl = process.env.API_URL;
const SchedulePop = ({
  select,
  startDate,
  setStartDate,
  email_body,
  setEmail_body,
  job_title,
  auth,
}) => {
  let newD = startDate;
  const [error, setError] = useState("");
  // send email
  const handleSend = async (e, btn_id, job_id, user_id, date) => {
    e.preventDefault();
    if (!email_body) setError("Please enter the email content!");
    else {
      setError("");
      disableBtn(btn_id);
      const res = await fetch(
        baseUrl + "feedback-email/" + job_id + "?hr_inter=true",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer" + " " + auth,
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            user_id,
            email_subject: `${job_title} final interview on ${date}`,
            email_body,
          }),
        }
      )
        .then(async (response) => {
          if (response.ok) {
            setError("");
            document.getElementById(
              btn_id
            ).innerHTML = `<i class="fa-solid fa-check"></i>`;
          } else {
            const error = response.text();
            throw new Error(error);
          }
        })
        .catch((e) => {
          console.log(e);
          EnableBtn(btn_id);
          setError("Sending Failed!");
        });
    }
  };
  return (
    <div id="SchedulePop" className="popOverlay invisible">
      <div className="pop popSch">
        <p>let's schedule your interview hours</p>

        <section className="schedule-content">
          <label className="label--global" htmlFor="mail">
            Write the E-mail and the date
          </label>
          <textarea
            className="txt txtArea"
            name="mail"
            value={email_body}
            onChange={(e) => setEmail_body(e.target.value)}
          />
          <h6 className="invalid ">{error}</h6>
          {select.map((applicant, index) => (
            <div className="appointment">
              <article>
                <img
                  src={applicant.profile_picture}
                  alt="pic"
                  className="card-photo"
                />
                <p>{applicant.fname + " " + applicant.lname}</p>
              </article>
              <div className="dateWrap">
                <label>
                  <DatePicker
                    selected={newD[index]}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="time"
                    dateFormat="MMMM d, yyyy h:mm aa"
                    onChange={(date) => {
                      newD[index] = date;
                      setStartDate([...newD]);
                    }}
                  />
                  <i class="fa-regular fa-calendar"></i>
                </label>
              </div>
              <button
                onClick={(e) =>
                  handleSend(
                    e,
                    `send${applicant._id}`,
                    applicant.job_post,
                    applicant.applicant_id,
                    startDate[index]
                  )
                }
                className="btn--global btn--detail btn--blue"
                id={`send${applicant._id}`}
              >
                Send
              </button>
            </div>
          ))}
        </section>
        <button
          onClick={() => {
            hideElement("SchedulePop");
          }}
          className="btn--global btn--detail btn--blue btn-done"
        >
          Done
        </button>
      </div>
    </div>
  );
};
export default SchedulePop;
