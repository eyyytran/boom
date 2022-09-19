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

styles.static = "shrink-0 w-full h-full p-2 md:p-3 lg:p-4";

export default function Chat({ className = null }: Props) {
  styles.dynamic = className;
  return (
    <Component id="Chat">
      <div className={`${styles.static} ${styles.dynamic}`}>
        <Container>
          <div className="flex flex-col h-full gap-2">
            <div className="flex flex-col h-full gap-2 overflow-y-auto no-scrollbar">
              <Message username={"Username"} message={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus ratione laborum neque officia?"} origin={"user"} />
              <Message username={"Username"} message={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus ratione laborum neque officia?"} origin={"participant"} />
              <Message username={"Username"} message={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus ratione laborum neque officia?"} origin={"participant"} />
              <Message username={"Username"} message={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus ratione laborum neque officia?"} origin={"user"} />
              <Message username={"Username"} message={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus ratione laborum neque officia?"} origin={"participant"} />
            </div>
            <form className="flex flex-col justify-end items-center gap-2 h-max focus:h-auto p-2 md:p-3 lg:p-4 focus:aspect-square resize-none bg-neutral-200 border border-neutral-400 rounded">
              <input type="text" className="w-full p-2 md:p-3 lg:p-4 bg-neutral-50 border border-neutral-400 rounded" />
              <button type="submit" className="w-full p-2 md:p-3 lg:p-4 bg-neutral-200 hover:bg-violet-500 border border-violet-500 rounded text-violet-500 hover:text-white">
                Send
              </button>
            </form>
          </div>
        </Container>
      </div>
    </Component>
  );
}
