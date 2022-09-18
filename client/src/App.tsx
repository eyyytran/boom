import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Component from "./components/Component";
import Boom from "./pages/Boom";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";

import { v4 as uuidv4 } from "uuid";

function App() {
  return (
    <Component id="App">
      <Routes>
        {/* <Route path="/" element={<Navigate replace to={`/${URL}`} />} /> */}
        {/* <Route path={URL} element={<Boom />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="/:id" element={<Boom />} />
        <Route path="*" element={<NotFound />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </Component>
  );
}

export default App;
