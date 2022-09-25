import React, { ReactElement, useEffect } from "react";
import Component from "../components/Component";

type Styles = {
  static: string;
};

const styles = {} as Styles;

styles.static = "fixed inset-0 bg-neutral-200";

export default function NotFound() {
  return (
    <Component id="NotFound">
      <div className={`${styles.static}`}>
        <div className="flex flex-col justify-start h-full">
          <span className="">404</span>
          <span className="">Page Not Found</span>
        </div>
      </div>
    </Component>
  );
}
