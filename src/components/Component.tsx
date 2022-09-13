import React, { ReactElement } from "react";

type Props = {
  id: string;
  children: ReactElement | ReactElement[];
};

export default function Component({ id, children }: Props) {
  return (
    <div id={id} className="contents">
      {children}
    </div>
  );
}
