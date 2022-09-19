import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Component from "./components/Component";
import Boom from "./pages/Boom";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dash from "./components/Dash";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Settings from "./components/Settings";
import Join from "./components/Join";
import Collection from "./components/Collection";
import NewGame from "./components/NewGame";

import { v4 as uuidv4 } from "uuid";

function App() {
  return (
    <Component id="App">
      <Routes>
        {/* <Route path="/" element={<Navigate replace to={`/${URL}`} />} /> */}
        {/* <Route path={URL} element={<Boom />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="dashboard" element={<Dashboard />}>
          <Route path="dash" element={<Dash />} />
          <Route path="settings" element={<Settings />} />
          <Route path="join" element={<Join />} />
          <Route path="new" element={<NewGame />} />
          <Route path="collection" element={<Collection />} />
        </Route>
        <Route path="/:id" element={<Boom />} />
        <Route path="*" element={<NotFound />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </Component>
  );
}

export default App;
