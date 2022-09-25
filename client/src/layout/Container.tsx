import React, { ReactElement } from "react";
import Component from "../components/Component";

type Props = {
  className?: string;
  children: ReactElement | ReactElement[] | any;
};

type Styles = {
  static: string;
  dynamic?: string;
};

const styles = {} as Styles;

styles.static = "w-full md:container h-full mx-auto";

export default function Container({ className = "", children }: Props) {
  styles.dynamic = className;
  return (
    <Component id="Container">
      <div className={`${styles.static} ${styles.dynamic}`}>{children}</div>
    </Component>
  );
}
