import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const axios = require("axios");

const Post = (props) => {
  const [post, setPost] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    fetchPost();
    console.log("called");
  }, []);

  const getname = (id) => {
    const temp = sessionStorage.getItem("token");
    const token = JSON.parse(temp).data.token;
    axios
      .get(`http://localhost:8000/user/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((data) => setName(data.data.name));
    // return data.data.name;
  };
  const fetchPost = () => {
    const temp = sessionStorage.getItem("token");
    const token = JSON.parse(temp).data.token;
    axios
      .get("http://localhost:8000/allPost", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res.data);
        setPost(res.data);
      });
  };
  const onBuy = () => {
    window.open(
      "https://wa.me/+918353064406?text=I'm%20interested%20in%20your%20for%20product"
    );
    // window.location.href ="https://wa.me/+918353064406?text=I'm%20interested%20in%20your%20for%20product";
  };

  return (
    <div className="Post-page">
      <div className="Post-containers">
        <div>
          {post && (
            <ul>
              {post.map((item, ind) => (
                <li key={ind}>
                  <div className="post-header"></div>
                  <div className="Post-content">
                    <div className="post-img-capt">
                      <img src={item.image} />
                      <div className="Post-des">
                        <div className="caption">
                          <h2>{item.title}</h2>
                        </div>
                        <div className="caption">Price : ₹ {item.price}</div>
                        <div className="caption">Stock : {item.stock}</div>
                        <div className="caption">
                          <h6>Description: {item.description}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="post-button">
                    <input type="button" value="Like" />
                    <input
                      className="buy-btn"
                      onClick={() => onBuy()}
                      type="button"
                      value="Buy Now"
                    />
                    <input type="button" value="Share" />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
