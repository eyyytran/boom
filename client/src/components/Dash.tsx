import React from "react";
import { Outlet, Link } from "react-router-dom";
import Component from "./Component";
import Titlebar from "./Titlebar";
import { faGear, faUserGroup, faTableCellsLarge, faFolder, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {};

type Styles = {
  static: string;
};

const styles = {} as Styles;

styles.static = "fixed inset-0 bg-neutral-200";

export default function Dash({}: Props) {
  return (
    <Component id="Dash">
      <div></div>
    </Component>
  );
}
