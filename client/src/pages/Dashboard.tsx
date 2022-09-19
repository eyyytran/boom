
import { faUserPen } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import Component from "../components/Component";
import Titlebar from "../components/Titlebar";
import { Link, Outlet } from "react-router-dom";
import {
  faGear,
  faUserGroup,
  faTableCellsLarge,
  faFolder,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    collection,
    doc,
    addDoc,
    updateDoc,
    arrayUnion,
} from 'firebase/firestore'
import { db } from '../server/firebase'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import userSlice from '../store/userSlice'

type Props = {}


const Dashboard = (props: Props) => {
 const app = {
        state: useSelector((state: RootState) => state.user),
        action: userSlice.actions,
    }
    var firepadRef = collection(db, 'rooms')
    const navigate = useNavigate()

    const userName = app.state.userName

    const createRoom = async () => {
        try {
            const docRef = await addDoc(firepadRef, { primaryUser: userName })
            navigate(`/boom/?id=${docRef.id}`)
        } catch (error) {
            console.error('error adding document', error)
        }
    }

    const updateRoom = async () => {
        try {
            const roomId: any = prompt('Enter the Meeting Key')
            const docRef = doc(db, 'rooms', roomId)
            await updateDoc(docRef, {
                participants: arrayUnion(userName),
            })
            navigate(`/boom/?id=${roomId}`)
        } catch (error) {
            console.error('error adding a participant', error)
        }
    }
  return (
    <Component id="Dashboard">
      <Titlebar />
      <div
        id="view"
        className="h-full w-screen flex flex-row"
        x-data="{ sidenav: true }"
      >
        <div
          id="sidebar"
          className="bg-white h-screen md:block shadow-xl px-3 2xl:w-1/5 md:w-60 lg:w-60 overflow-x-hidden transition-transform duration-300 ease-in-out"
          x-show="sidenav"
        >
          <div className="space-y-6 md:space-y-10 mt-10">
            <h1 className="hidden md:block font-bold text-sm md:text-3xl text-center text-violet-500">
              Boom
            </h1>
            <div id="profile" className="space-y-3">
              <img
                src=""
                alt="Profile Picture"
                className="w-10 md:w-16 rounded-full mx-auto"
              />
              <div>
                <h2 className="font-medium text-xs md:text-sm text-center text-violet-500">
                  Username
                </h2>
              </div>
            </div>
            <div id="menu" className="flex flex-col space-y-2">
              <Link
                to="dash"
                className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-violet-500 hover:text-white hover:text-base rounded-md transition duration-150 ease-in-out"
              >
                <FontAwesomeIcon
                  icon={faBars}
                  className="h-5 w-5 fill-current text-gray-600"
                />
                <span className="ml-5">Dashboard</span>
              </Link>
              <Link
                to="new"
                className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-violet-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out"
              >
                <FontAwesomeIcon
                  icon={faTableCellsLarge}
                  className="h-5 w-5 fill-current text-gray-600 group-hover:text-violet-500"
                />
                <span className="ml-5">Start New Game</span>
              </Link>
              <Link
                to="join"
                className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-violet-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out"
              >
                <FontAwesomeIcon
                  icon={faUserGroup}
                  className="h-5 w-5 fill-current text-gray-600 group-hover:text-violet-500"
                />
                <span className="ml-5">Join a Game</span>
              </Link>
              <Link
                to="collection"
                className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-violet-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out"
              >
                <FontAwesomeIcon
                  icon={faFolder}
                  className="h-5 w-5 fill-current text-gray-600 group-hover:text-violet-500"
                />
                <span className="ml-5">My Collection</span>
              </Link>
              <Link
                to="settings"
                className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-violet-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out"
              >
                <FontAwesomeIcon
                  icon={faGear}
                  className="h-5 w-5 fill-current text-gray-600 group-hover:text-violet-500"
                  fill="currentColor"
                />
                <span className="ml-5">Settings</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-4/5 min-h-screen">
          <Outlet />
        </div>
      </div>
    </Component>
  );
};

export default Dashboard;

