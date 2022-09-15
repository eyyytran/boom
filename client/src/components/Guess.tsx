import React, { ReactElement } from "react";

import Component from "../components/Component";
import Container from "../layout/Container";
import Message from "../components/Message";

type Props = {
  className?: string | null;
};

type Styles = {
  static: string;
  dynamic?: string | null;
};

const styles = {} as Styles;

styles.static = "w-full h-full p-2 md:p-3 lg:p-4";

export default function Guess({ className = null }: Props) {
  styles.dynamic = className;
  return (
    <Component id="Guess">
      <div className={`${styles.static} ${styles.dynamic}`}>
        <div className="flex flex-col h-full gap-2">
          <div className="flex flex-col h-full gap-2 overflow-y-auto no-scrollbar">
            <Message username={"Guess"} message={"Lorem ipsum"} origin={"user"} />
          </div>
          <form className="contents">
            <textarea className="h-8 focus:h-auto p-2 md:p-3 lg:p-4 focus:aspect-square resize-none bg-neutral-200 border border-neutral-400 rounded no-scrollbar"></textarea>
          </form>
        </div>
      </div>
    </Component>
  );
}
