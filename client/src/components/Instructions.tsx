import { faTableList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ReactElement } from "react";

import Component from "../components/Component";
import Container from "../layout/Container";

type Props = {
  className?: string;
};

type Styles = {
  static: string;
  dynamic?: string;
};

const styles = {} as Styles;

styles.static = "flex portrait:flex-col gap-2 md:gap-3 lg:gap-4";

export default function Instructions({ className = "" }: Props) {
  styles.dynamic = className;
  return (
    <Component id="Instructions">
      <div className={`${styles.static} ${styles.dynamic}`}>
        <div className="flex flex-col h-full overflow-clip">
          <div className="flex justify-center items-center gap-2 p-2 md:p-3 lg:p-4 bg-neutral-900 rounded-t">
            <FontAwesomeIcon icon={faTableList} className="text-xs text-white" />
            <span className="text-xs text-white">Instructions</span>
          </div>
          <div className="h-full p-2 bg-white border-x border-neutral-400 overflow-y-auto hidden">
            <span className="text-xs">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa in qui consequuntur ab molestias repudiandae sint architecto quam cum ea quaerat itaque nihil saepe perferendis nesciunt,
              velit, debitis eum impedit!
            </span>
          </div>
        </div>
      </div>
    </Component>
  );
}
