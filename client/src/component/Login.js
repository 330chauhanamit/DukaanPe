import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
// import Firebase from "firebase";
// import firebaseconfig from "../firebaseconfig";
// const admin = require("firebase-admin ");

// const app = Firebase.initializeApp(firebaseconfig);
// // const auth = admin.auth();
// const db = Firebase.firestore();

// console.log(db);

const axios = require("axios");

// console.log(app.collections());
// let ref = Firebase.database();
//
// ref
//   .collection("posts")
//   .get()
//   .then((result) => console.log(result));
// console.log(ref);
// ref.on("value", (snapshot) => {
//   console.log("ENter");
//   console.log(snapshot);
// });

async function loginUser(credential) {
  // console.log(credential);
  return axios.post("http://localhost:8000/login", credential);
  // .then(res =>  res.data)
  // .catch(err =>  err)
}
function Login({ setToken }) {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [userPass, setUserPass] = useState("");

  const onSubmit = async (e) => {
    const token = await loginUser({
      email,
      userPass,
    });
    // console.log(token);
    history.push("/");
    setToken(token);
  };
  return (
    <div className="App">
      <div className="ele">
        <svg
          width="235"
          height="235"
          viewBox="0 0 235 235"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            id="Rectangle 1"
            x="10"
            y="10"
            width="215"
            height="215"
            stroke="#fff"
            stroke-width="40"
            radius="10"
          />
        </svg>
      </div>

      <div className="Login-container">
        <div className="Input">
          <h1>Login Portal</h1>
          <form onSubmit={onSubmit}>
            <input
              placeholder="Email"
              type="text"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="Password"
              type="Password"
              onChange={(e) => setUserPass(e.target.value)}
            />
            <input
              className="sbt-btn"
              type="button"
              value="Login"
              onClick={onSubmit}
            />
          </form>
          <div className="line"></div>
          <Link className="btn-sgn" to="/signup">
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
