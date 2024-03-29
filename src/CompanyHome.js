import style from "../styles/pages/Company.module.scss";
import Link from "next/link";
import Empty from "../comps/empty";
import { ActivateBar } from "../functions/ActivateBar";
import { postArray, getPosts, DeletePost } from "../functions/Api/posts";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import Spinner from "../comps/Spinner";
import { uploadImg } from "../functions/uploadImg";
import Icon from "@mdi/react";
import { mdiCameraPlusOutline } from "@mdi/js";
import axios from "axios";

const baseUrl = process.env.API_URL;

const CompanyHome = () => {
  const { auth, user, setImage } = useContext(AuthContext);

  // state
  const [posts, setPosts] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [logoImage, setLogoImage] = useState({});
  const [coverImage, setCoverImage] = useState({});

  const getData = async () => {
    // Fetch data from external API
    await getPosts(auth);
    let tempPost = postArray;
    if (postArray.length > 4) {
      tempPost = postArray.slice(postArray.length - 4, postArray.length);
    }
    setPosts(tempPost.reverse());

    const res = await fetch(baseUrl + "companies/profile/" + user.id, {
      headers: {
        Authorization: "Bearer" + " " + auth,
      },
    });
    const { msg } = await res.json();

    setName(msg.profile.name);
    setLogoImage({ src: msg.info.logo, image: msg.info.logo });
    setCoverImage({ src: msg.info.cover, image: msg.info.cover });
    setLoading(false);
  };
  useEffect(() => {
    getData();
    ActivateBar("bar1");
  }, []);

  //submittion
  const SubmitImg = async (e, key, value) => {
    e.preventDefault();
    let data = new FormData();
    data.append("photo", value);
    const options = {
      headers: {
        Authorization: "Bearer" + " " + auth,
        "Content-Type": "multipart/form-data",
      },
    };
    let photo_url = "";
    const res = await axios.post(baseUrl + "upload-photo", data, options);
    const { msg } = await res.data;
    photo_url = msg.photo_url;

    const response = await fetch(baseUrl + "companies/profile/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer" + " " + auth,
      },
      body:
        key === "logo"
          ? JSON.stringify({
              logo: photo_url,
            })
          : JSON.stringify({
              cover: photo_url,
            }),
    })
      .then(async (response) => {
        if (response.ok && key === "logo") {
          setImage(photo_url);
          localStorage.setItem("image", JSON.stringify(photo_url));
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return loading ? (
    <Spinner />
  ) : (
    <main className={`container `}>
      <div className={style.header}>
        <h4>Hello {name}!</h4>
        <Link href="/post-job" passHref>
          <button className="btn--global btn--blue btn--detail">
            Add New Post
          </button>
        </Link>
      </div>

      <div className={` ${style.ContentWrap}`}>
        <section className={`${style.content} `}>
          {!posts.length ? (
            <Empty
              txt1="There is no posted jobs for now!"
              btn="Add New Post"
              path="/post-job"
              isCompany={true}
            />
          ) : (
            <>
              {posts.map((post) => (
                <div className={style.job}>
                  <article>
                    <Link href={`/jobs/${post._id}`}>
                      <h4>{post.title}</h4>
                    </Link>

                    <p className={style.applicants}>
                      {post.applications_count} applicant
                      {post.applications_count <= 1 ? "" : "s"}
                    </p>
                  </article>

                  <p className={style.location}>{post.location}</p>
                  <button
                    onClick={() => {
                      const menu = document.getElementById(`drop${post._id}`);
                      menu.classList.toggle("active");
                    }}
                  >
                    <i class="fa-solid fa-ellipsis-vertical"></i>
                  </button>
                  <div id={`drop${post._id}`} className="drop">
                    <Link href={`/jobs/${post._id}`}>
                      <h5>Preview</h5>
                    </Link>
                    <Link
                      href={{
                        pathname: "/post-job",
                        query: { id: post._id },
                      }}
                    >
                      <h5>Edit</h5>
                    </Link>
                    <h5
                      onClick={() => {
                        const menu = document.getElementById(`drop${post._id}`);
                        menu.classList.toggle("active");
                        DeletePost(post._id, posts, setPosts, auth);
                      }}
                    >
                      Delete
                    </h5>
                  </div>
                </div>
              ))}
              <Link href="/companyPosts" passHref>
                <div className={` ${style.view}`}>View All Posts</div>
              </Link>
            </>
          )}
        </section>
        <section className={`${style.content} `}>
          {/* cover photo */}
          <img
            src={
              coverImage.src
                ? coverImage.src
                : `/assets/empty/empty-comp-cover.png`
            }
            width="100%"
            height={120}
            alt="cover"
          />
          <input
            type="file"
            id="cover"
            accept="image/jpg, image/jpeg, image/png"
            required
            onChange={(e) => {
              uploadImg(e, setCoverImage);
              SubmitImg(e, "cover", e.target.files[0]);
            }}
          />
          <label htmlFor="cover">
            <i class="fa-solid fa-arrow-up-from-bracket"></i>
            {coverImage.src ? "Upload another cover" : "Upload Cover"}
          </label>

          {/* logo image */}
          <img
            src={
              logoImage.src
                ? logoImage.src
                : `/assets/empty/empty-comp-logo.png`
            }
            width="40%"
            height={100}
            alt="logo"
          />
          <input
            type="file"
            id="logo"
            accept="image/jpg, image/jpeg, image/png"
            required
            onChange={(e) => {
              uploadImg(e, setLogoImage);
              SubmitImg(e, "logo", e.target.files[0]);
            }}
          />
          <label htmlFor="logo">
            <Icon path={mdiCameraPlusOutline} size={2} />
            {logoImage.src ? "Upload another logo" : "Upload logo"}
          </label>
          <h4>{name}</h4>
        </section>
      </div>
    </main>
  );
};
export default CompanyHome;
