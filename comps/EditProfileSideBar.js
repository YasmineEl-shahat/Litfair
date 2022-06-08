import Link from "next/link";
import {
  mdiLightbulbOutline,
  mdiBriefcaseClockOutline,
  mdiFileDocumentOutline,
  mdiLockOutline,
} from "@mdi/js";
import Icon from "@mdi/react";

const EditProfileSideBar = () => {
  return (
    <>
      <div
        className="mobile-navigation"
        onClick={(e) => {
          document.getElementById("sideBar").classList.toggle("visible");
          if (e.target.tagName == "I") e.target = e.target.parentElement;
          let arrow = e.target.lastChild.classList.value;
          e.target.lastChild.classList.value =
            arrow === "fa-solid fa-angle-down"
              ? "fa-solid fa-angle-up"
              : "fa-solid fa-angle-down";
        }}
      >
        Edit Profile <i className="fa-solid fa-angle-down"></i>
      </div>
      <aside id="sideBar" className="profileSide">
        <Link href="/profile/update/general-info" passHref>
          <div id="generalSide" className="sectionSide">
            <div className={"icon"}>
              <Icon path={mdiLightbulbOutline} size={1} />
            </div>
            General Info
          </div>
        </Link>

        <Link href="/profile/update/career-interests" passHref>
          <div id="careerSide" className="sectionSide">
            <div className={"icon"}>
              <i className="fa-solid fa-chart-column"></i>
            </div>
            Career Inerestes
          </div>
        </Link>
        <Link href="/profile/update/experience" passHref>
          <div id="expSide" className="sectionSide">
            <div className={"icon"}>
              <Icon path={mdiBriefcaseClockOutline} size={1} />
            </div>
            Experience
          </div>
        </Link>

        <Link href="/profile/update/cv" passHref>
          <div id="cvSide" className="sectionSide">
            <div className={"icon"}>
              <Icon path={mdiFileDocumentOutline} size={1} />
            </div>
            Your CV
          </div>
        </Link>
        <Link href="/profile/update/password" passHref>
          <div id="passSide" className="sectionSide">
            <div className={"icon"}>
              <Icon path={mdiLockOutline} size={1} />
            </div>
            Change Password
          </div>
        </Link>
      </aside>
    </>
  );
};

export default EditProfileSideBar;
