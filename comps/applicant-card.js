import Link from "next/link";

export const Card = ({ imgSrc, name, rate, applicationId }) => {
  return (
    <>
      <div className="card">
        <img src={imgSrc} className="photo" alt="pic"></img>
        <h4>{name}</h4>
        <p>Rate:{rate}</p>
        <Link
          href={{ pathname: "/feed", query: { id: applicationId, name } }}
          passHref
        >
          <button className={`btn--global btn--detail btn--blue`} type="submit">
            Show Interview Result
          </button>
        </Link>
      </div>
    </>
  );
};
