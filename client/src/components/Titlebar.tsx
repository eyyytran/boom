import React, { ReactElement } from "react";
import Component from "./Component";
import Container from "../layout/Container";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  className?: string;
};

type Styles = {
  static: string;
  dynamic?: string;
};

const styles = {} as Styles;

styles.static = "p-2 md:p-3 lg:p-4 bg-neutral-900";

export default function Titlebar({ className = "" }: Props) {
  styles.dynamic = className;
  return (
    <Component id="Titlebar">
      <div className={`${styles.static} ${styles.dynamic}`}>
        <Container>
          <div className="flex justify-center items-center gap-2 h-full">
            <FontAwesomeIcon icon={faPenToSquare} className="text-xs text-neutral-50" />
            <span className="text-xs text-neutral-50">Boom</span>
          </div>
        </Container>
      </div>
    </Component>
  );
}
