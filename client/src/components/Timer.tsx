import React, { ReactElement, useEffect } from "react";
import Component from "./Component";
import Container from "../layout/Container";
import { faMessage, faPenToSquare, faTableCellsLarge, faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  className?: string | null;
};

type Styles = {
  static: string;
  dynamic?: string | null;
};

const styles = {} as Styles;

styles.static = "p-2 md:p-3 lg:p-4 bg-neutral-300";

export default function Timer({ className = null }: Props) {
  styles.dynamic = className;
  return (
    <Component id="Timer">
      <div className={`${styles.static} ${styles.dynamic}`}>
        <Container>
          <div className="flex flex-col gap-2 md:gap-3 lg:gap-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold">Time Remaining</span>
              <span className="text-xs font-bold">1:00</span>
            </div>
            <div className="bg-neutral-200 rounded h-3">
              <div className="bg-violet-500 h-full rounded w-1/2"></div>
            </div>
          </div>
        </Container>
      </div>
    </Component>
  );
}
