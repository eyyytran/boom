import React from "react";
import Component from "../components/Component";
import Titlebar from "../components/Titlebar";
import Navbar from "../components/Navbar";
import LoginForm from "../components/forms/LoginForm";

type Styles = {
  static: string;
};

const styles = {} as Styles;

styles.static = "fixed inset-0 bg-neutral-200";

const Login = () => {
  return (
    <Component id="Login">
      <div className="flex flex-col justify-start h-full">
        <Titlebar className="shrink-0" />
        <div className="flex h-full overflow-y-clip overflow-x-auto snap-x snap-mandatory no-scrollbar">
          <LoginForm />
        </div>
        {/* <Navbar className="shrink-0" /> */}
      </div>
    </Component>
  );
};

export default Login;
