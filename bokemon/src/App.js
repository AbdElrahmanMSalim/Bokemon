import React from "react";
import Main from "./Screens/Main";
import Providers from "./Factories/Providers";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./Components/PrivateRoute";
import Signup from "./Components/Signup";
import Login from "./Components/Login";

function App(props) {
  return (
    <Providers>
      <Router>
        <Routes>
          <Route exact path="/" element={<PrivateRoute />}>
            <Route exact path="/" element={<Main />} />
          </Route>
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </Router>
    </Providers>
  );
}

export default App;
