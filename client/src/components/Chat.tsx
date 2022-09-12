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
            <form className="contents">
              <textarea className="h-8 focus:h-auto p-2 md:p-3 lg:p-4 focus:aspect-square resize-none bg-neutral-200 border border-neutral-400 rounded no-scrollbar"></textarea>
            </form>
          </div>
        </Container>
      </div>
    </Component>
  );
}
