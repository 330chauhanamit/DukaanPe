import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import NavBar from "./NavBar";
import MyPost from "./MyPost";
import Posts from "./Posts";
import Firebase from "firebase";
const axios = require("axios");

const Home = (props) => {
  const [image, setImage] = useState("");
  const [stock, setStock] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    const temp = sessionStorage.getItem("token");
    const token = JSON.parse(temp).data.token;
    if (url) {
      axios
        .post(
          "http://localhost:8000/createPost",
          {
            price,
            description,
            title,
            stock,
            image: url,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  }, [url]);

  const logout = () => {
    sessionStorage.removeItem("token");
  };
  // console.log(post);

  const clearPost = () => {
    console.log("CLearing");
    setStock("");
    setTitle("");
    setPrice("");
    setDescription("");
    // const temp = sessionStorage.getItem("token");
    // const token = JSON.parse(temp).data.token;
    // axios.delete("http://localhost:8000/allPost", {
    //   headers: {
    //     Authorization: token,
    //   },
    // });
  };

  const postToDB = async () => {
    const temp = sessionStorage.getItem("token");
    const token = JSON.parse(temp).data.token;
    // console.log(token);
    const formdata = new FormData();
    formdata.append("file", image);
    formdata.append("upload_preset", "new-insta");
    formdata.append("cloud_name", "chauhancloud");
    await axios
      .post(
        "https://api.cloudinary.com/v1_1/chauhancloud/image/upload",
        formdata
      )
      .then((data) => {
        const url = data.data.secure_url;
        setUrl(url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="home-container">
      <h1>Hello {props.name}</h1>
      <h1>{props.userName}</h1>
      <div className="createPost">
        <div>
          <input
            className="pic-inp"
            type="file"
            name="image"
            id="file"
            onChange={(e) =>
              e.target.files.length !== 0
                ? setImage(e.target.files[0])
                : // setImagePath(URL.createObjectURL(e.target.files[0]))}
                  ""
            }
          />
        </div>

        <div className="post-inp">
          <div className="post-header"></div>
          <div className="post-img-capt">
            <div className="post-img">
              {image ? (
                <img src={URL.createObjectURL(image)} />
              ) : (
                <label htmlFor="file" className="inp-btn">
                  <i class="material-icons">center_focus_strong</i>
                </label>
              )}
            </div>
            <div className="name-price">
              <textarea
                maxLength="50"
                placeholder="Name"
                className="text-input"
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                maxLength="10"
                placeholder="Price"
                className="text-input"
                onChange={(e) => setPrice(e.target.value)}
              />
              <textarea
                maxLength="10"
                placeholder="Stock"
                className="text-input"
                onChange={(e) => setStock(e.target.value)}
              />
              <textarea
                maxLength="100"
                placeholder="Description"
                className="text-input-description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="post-button">
            <input
              type="button"
              onClick={() => setImage("")}
              value="Remove Image"
            />
            <input type="button" onClick={() => postToDB()} value="Post" />
            <input
              type="button"
              onClick={() => clearPost()}
              value="Clear Post"
            />
          </div>
        </div>
        <button onClick={logout}>Log out</button>
      </div>
      <Posts />
    </div>
  );
};

export default Home;
