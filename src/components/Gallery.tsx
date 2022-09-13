import React, { MutableRefObject, ReactElement, useEffect, useRef } from "react";

import subscriberSlice from "../store/subscriberSlice";

// import { collection, getDocs } from "firebase/firestore";
// import { app, db } from "../firebase/db";

import { getCalls, getUsers } from "../firebase/pc";

import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useDispatch } from "react-redux";

import Component from "./Component";
import Video from "./Video";
import Container from "../layout/Container";

type Props = {
  className?: string;
};

type Styles = {
  static: string;
  dynamic?: string;
};

const styles = {} as Styles;

styles.static = "shrink-0 w-full h-full p-2 md:p-3 lg:p-4";

export default function Gallery({ className = "" }: Props) {
  const subscriber = {
    state: useSelector((state: RootState) => state.subscriber),
    actions: subscriberSlice.actions,
  };

  const dispatch = useDispatch();

  styles.dynamic = className;

  // const getUsers = async () => {
  //   const querySnapshot = await getDocs(collection(db, "users"));
  //   return querySnapshot;
  // };

  // const setUsers = async () => {
  //   const users = await getUsers();
  //   users.forEach(doc => dispatch(subscriber.actions.addUser(doc)));
  // };

  const setUsers = async () => {
    const users = await getUsers();
    const arr: any = [];
    users.forEach(doc => arr.push(doc.data()));
    dispatch(subscriber.actions.setUsers(arr));
  };

  useEffect(() => {
    setUsers();
    console.log(getCalls());
  }, []);

  useEffect(() => {
    // subscriber.state.users.forEach((user: any) => console.log(user));
    // subscriber.state.users.forEach((user: any) => console.log({ name: user._document.data.value.mapValue.fields.name.stringValue }));
  }, [subscriber.state.users]);

  return (
    <Component id="Gallery">
      <div className={`${styles.static} ${styles.dynamic}`}>
        <Container>
          <div className="flex portrait:flex-col justify-center items-center h-full gap-2 md:gap-3 lg:gap-4">
            <Video />
            <Video />
            <Video />
            <Video />
          </div>
        </Container>
      </div>
    </Component>
  );
}
