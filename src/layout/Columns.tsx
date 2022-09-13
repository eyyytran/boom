import React, { ReactElement } from "react";
import Component from "../components/Component";

type Props = {
  className?: string;
  children: ReactElement | ReactElement[];
};

type Styles = {
  static: string;
  dynamic?: string;
};

const styles = {} as Styles;

styles.static = "grid grid-cols-12 h-full";

export default function Columns({ className = "", children }: Props) {
  styles.dynamic = className;
  return (
    <Component id="Columns">
      <div className={`${styles.static} ${styles.dynamic}`}>{children}</div>
    </Component>
  );
}
