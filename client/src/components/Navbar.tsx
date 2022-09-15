import React, { ReactElement } from "react";
import Component from "./Component";
import Container from "../layout/Container";
import {
  faRightToBracket,
  faMessage,
  faPenToSquare,
  faTableCellsLarge,
  faVideo,
  faCog,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  className?: string | null;
};

type Styles = {
  static: string;
  dynamic?: string | null;
};

const styles = {} as Styles;

styles.static = "p-2 md:p-3 lg:p-4  bg-neutral-300";

export default function Navbar({ className = null }: Props) {
  styles.dynamic = className;
  return (
    <Component id="Navbar">
      <div className={`${styles.static} ${styles.dynamic}`}>
        <Container>
          <div className="flex justify-between items-center gap-2 h-full">
            <button className="py-2 px-4">
              <FontAwesomeIcon icon={faBars} className="" />
            </button>
            <div className="flex justify-center items-center gap-2 h-full">
              <button className="py-2 px-4">
                <FontAwesomeIcon icon={faVideo} className="text-violet-500" />
              </button>
              <button className="py-2 px-4">
                <FontAwesomeIcon icon={faTableCellsLarge} className="" />
              </button>
              <button className="py-2 px-4">
                <FontAwesomeIcon icon={faMessage} className="" />
              </button>
            </div>
            <button className="py-2 px-4">
              <FontAwesomeIcon icon={faRightToBracket} className="" />
            </button>
          </div>
        </Container>
      </div>
    </Component>
  );
}
