import React from "react";
import Main from "./Screens/Main";
import Providers from "./Factories/Providers";
import Subscribers from "./Factories/Subscribers";
import Initializer from "./Factories/Initializer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./Components/PrivateRoute";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import GlobalStateProvider from "@morefaie/react-useglobalstate";

const initialGlobalState = {
  bokemonsData: { data: [], favorites: [] },
};

function App(props) {
  return (
    <GlobalStateProvider state={initialGlobalState} decoupled>
      <Providers>
        <Initializer>
          <Subscribers>
            <Router>
              <Routes>
                <Route exact path="/" element={<PrivateRoute />}>
                  <Route exact path="/" element={<Main />} />
                </Route>
                <Route path="signup" element={<Signup />} />
                <Route path="login" element={<Login />} />
              </Routes>
            </Router>
          </Subscribers>
        </Initializer>
      </Providers>
    </GlobalStateProvider>
  );
}

export default App;
