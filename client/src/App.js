import "./App.css";
import React, { useState, useEffect } from "react";
import Login from "./component/Login";
import Signup from "./component/Signup";
import Home from "./component/Home";
import NavBar from "./component/NavBar";
import MyPost from "./component/MyPost";
import Profile from "./component/Profile";
import { useHistory } from "react-router-dom";
import {
  BrowserRouter as Router,
  Switch,
  Link,
  Route,
  Redirect,
} from "react-router-dom";
function setToken(userToken) {
  console.log(userToken);
  // sessionStorage.setItem("jwt", userToken.token);
  sessionStorage.setItem("token", JSON.stringify(userToken));
}

function getToken() {
  const tokenString = sessionStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  return userToken;
}
const Routing = () => {
  const history = useHistory();
  const token = getToken();
  useEffect(() => {
    if (!token) history.push("/signin");
    else history.push("/");
  }, [token]);

  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/signin">
        <Login setToken={setToken} />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/MyPost">
        <MyPost />
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>
    </Switch>
  );
};

function App() {
  // if (!token) {
  //   return (
  //     <div>
  //       <div>
  //         <Router>
  //           <Switch>
  //             <Route path="/signin" exact>
  //               <Login setToken={setToken} />
  //             </Route>
  //             <Route path="/signup">
  //               <Signup />
  //             </Route>
  //           </Switch>
  //         </Router>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div>
      <Router>
        <div>
          <NavBar />
          <Routing />
        </div>
      </Router>
    </div>
  );
}

export default App;
