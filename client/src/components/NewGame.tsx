import React from "react";
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../server/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import userSlice from "../store/userSlice";

type Props = {};

const NewGame = (props: Props) => {
  const user = {
    state: useSelector((state: RootState) => state.user),
    action: userSlice.actions,
  };
  var firepadRef = collection(db, "rooms");
  const navigate = useNavigate();

  const userName = user.state.userName;

  const createRoom = async () => {
    try {
      const docRef = await addDoc(firepadRef, { primaryUser: userName });
      navigate(`/boom/?id=${docRef.id}`);
    } catch (error) {
      console.error("error adding document", error);
    }
  };
  return (
    <div>
      <h1>Click Here to Start a New Game</h1>
      <button onClick={createRoom}>New Game</button>
    </div>
  );
};

export default NewGame;
