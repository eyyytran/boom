import React, { useState, useEffect, useRef } from "react";
import { arrayUnion, doc, updateDoc, onSnapshot } from "firebase/firestore";
import { db } from "../server/firebase";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { auth } from "../server/firebase";
import Component from "../components/Component";
import Message from "../components/Message";
import userSlice from "../store/userSlice";

type Props = {
  chatRef: any;
  className?: string | null;
};

type Styles = {
  static: string;
  dynamic?: string | null;
};

interface FirebaseMessage {
  sentBy: string;
  content: string;
  timeStamp: number;
  profilePicture: string;
}

const styles = {} as Styles;

styles.static = "w-full lg:col-start-3 lg:col-span-1 lg:row-start-1 lg:row-span-1 h-full bg-neutral-200 rounded";

export default function Chat({ chatRef, className = null }: Props) {
  styles.dynamic = className;

  const [message, setMessage] = useState<string>("");
  const [chat, setChat] = useState<Array<FirebaseMessage>>([]);

  const user = {
    state: useSelector((state: RootState) => state.user),
    action: userSlice.actions,
  };

  const handleMessage = (e: any) => {
    const value = e.target.value;
    setMessage(value);
  };

  // Change
  const dummy = useRef<HTMLHeadingElement>(null);

  const urlparams = new URLSearchParams(window.location.search);
  const roomId: any = urlparams.get("id");

  const roomRef = doc(db, "rooms", roomId);

  useEffect(() => {
    if (!roomId) return;
    const unsubscribe = onSnapshot(doc(db, "rooms", roomId), doc => {
      const result = doc.data();
      setChat(result?.messages);
      const messageSound = new Audio("/sounds/message.mp3");
      messageSound.volume = 0.1;
      result && messageSound.play();
    });
    return () => {
      unsubscribe();
    };
  }, [roomId]);

  const sendMessage = async (dataToSend: {}) => {
    await updateDoc(roomRef, {
      messages: arrayUnion(dataToSend),
    });
    //@ts-ignore
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = () => {
    const dataToSend = {
      sentBy: user.state.userName,
      timeStamp: new Date().getTime(),
      content: message,
      profilePicture: user.state.image ? user.state.image : null,
    };
    sendMessage(dataToSend);
    setMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    e.stopPropagation();
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  const profilePicture = auth.currentUser?.photoURL;

  return (
    <Component id="Chat">
      <div ref={chatRef} className={`${styles.static} ${styles.dynamic}`}>
        <div className="flex flex-col h-full">
          <div className="w-full bg-neutral-300 text-center text-sm rounded-t p-2 md:p-3 lg:p-4 font-bold">Group Chat</div>
          <div className="flex flex-col h-full gap-2 overflow-y-auto no-scrollbar p-2 md:p-3 lg:p-4">
            {chat?.map(message => {
              return (
                <div className={`flex items-center justify-start ${user.state.userName === message.sentBy ? null : "flex-row-reverse"}`}>
                  <img src={message.profilePicture ? message.profilePicture : require("../images/defaultImg.jpeg")} className="w-10 h-10 object-cover rounded-full m-2" alt="round" />
                  <Message
                    key={message.timeStamp}
                    username={user.state.userName}
                    message={message.content}
                    sender={message.sentBy}
                    origin={user.state.userName === message.sentBy ? "user" : "participant"}
                  />
                </div>
              );
            })}
            <div className="h-16" ref={dummy} />
          </div>
          <form className="bg-neutral-300 p-2 md:p-3 lg:p-4 rounded-b" data-lpignore="true">
            <input
              className="flex flex-wrap justify-center items-center w-full p-1 md:p-2 lg:p-3 focus:outline-none focus:border focus:border-violet-500 bg-neutral-50 resize-none rounded h-max"
              value={message}
              placeholder="Type a Message"
              onKeyDown={handleKeyDown}
              onChange={handleMessage}
            />
          </form>
        </div>
      </div>
    </Component>
  );
}
