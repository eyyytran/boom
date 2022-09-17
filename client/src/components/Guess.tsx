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

styles.static = "w-full h-full";

export default function Guess({ className = null }: Props) {
  styles.dynamic = className;
  return (
    <Component id="Guess">
      <div className={`${styles.static} ${styles.dynamic}`}>
        <form className="flex flex-col justify-end items-center gap-2 h-max focus:h-auto p-2 md:p-3 lg:p-4 focus:aspect-square resize-none bg-neutral-200 border border-neutral-400 rounded">
          <input type="text" className="w-full p-2 md:p-3 lg:p-4 bg-neutral-50 border border-neutral-400 rounded" />
          <button type="submit" className="w-full p-2 md:p-3 lg:p-4 bg-neutral-200 hover:bg-violet-500 border border-violet-500 rounded text-violet-500 hover:text-white">
            Guess
          </button>
        </form>
      </div>
    </Component>
  );
}
