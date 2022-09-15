import React from "react";
import Component from "../components/Component";
import Titlebar from "../components/Titlebar";
import Navbar from "../components/Navbar";
import SignupForm from "../components/forms/SignupForm";

type Styles = {
  static: string;
};

const styles = {} as Styles;

styles.static = "fixed inset-0 bg-neutral-200";

const Signup = () => {
  return (
    <Component id="Signup">
      <div className="flex flex-col justify-start h-full">
        <Titlebar className="shrink-0" />
        <div className="flex h-full overflow-y-clip overflow-x-auto snap-x snap-mandatory no-scrollbar">
          <SignupForm />
        </div>
        {/* <Navbar className='shrink-0' /> */}
      </div>
    </Component>
  );
};

export default Signup;
