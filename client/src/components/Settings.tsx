import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useSelector } from "react-redux";
import { isEmail, isSecure } from "./forms/formValidation";
import { RootState } from "../store";
import { auth } from "../server/firebase";
import userSlice from "../store/userSlice";

type Props = {};

function Settings({}: Props) {
  const [newEmail, setNewEmail] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newUsername, setNewUsername] = useState<string>("");
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>("");
  const [confirmErrorMessage, setConfirmErrorMessage] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [confirmError, setConfirmError] = useState<boolean>(false);

  const navigate = useNavigate();

  const user = {
    state: useSelector((state: RootState) => state.user),
    action: userSlice.actions,
  };

  console.log(auth.currentUser);

  const userName = user.state.userName;

  const validateEmail = () => {
    let valid = false;
    if (!isEmail(newEmail)) {
      setEmailErrorMessage("Not a valid email");
      setEmailError(true);
    } else {
      setEmailErrorMessage("");
      setEmailError(false);
      valid = true;
    }
    return valid;
  };

  const validatePassword = () => {
    let valid = false;

    if (!isSecure(newPassword)) {
      setPasswordErrorMessage(
        "Passwords must be between 8-50 characters, include 1 uppercase, 1 number, and 1 special character"
      );
      setPasswordError(true);
    } else if (newPassword !== confirm) {
      setConfirmErrorMessage("Passwords do not match");
      setConfirmError(true);
      setPasswordError(true);
    } else {
      setConfirmErrorMessage("");
      setPasswordErrorMessage("");
      setPasswordError(false);
      setConfirmError(false);
      valid = true;
    }
    return valid;
  };

  const validateForm = () => {
    let validPassword = validatePassword();
    let validEmail = validateEmail();
    let valid = false;
    if (validPassword && validEmail) {
      return (valid = true);
    }
    return valid;
  };

  // const register = async (e: React.SyntheticEvent) => {
  //   e.preventDefault();
  //   if (validateForm()) {
  //     updateProfile(userCredentials.user, {
  //       displayName: newUsername,
  //     })
  //       .then(() => {
  //         navigate("/dashboard");
  //       })
  //       .catch((err) => console.error(err));
  //   }
  // };

  // const updateEmail = async (e: React.SyntheticEvent) => {
  //   e.preventDefault();
  //   if (validateForm()) {
  //     const newCredentials = await updateProfil;
  //   }
  // };

  return (
    <div className="flex flex-col items-center h-auto w-full">
      <div className="flex flex-col items-center m-10">
        <h1 className="text-2xl text-center font-bold text-gray-900">
          Settings
        </h1>
        <div className="flex flex-col items-center mt-5">
          <form className="flex flex-col items-center m-5">
            <span className="text-center">Change Email</span>
            <input
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mt-5"
              placeholder="name@company.com"
              name="new-email"
              id="new-email"
              required={true}
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
            <input
              type="submit"
              value="Change"
              className="w-full text-white bg-violet-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-5 hover:scale-105"
            />
          </form>
          <form className="flex flex-col items-center m-5">
            <span className="text-center">Change Password</span>
            <input
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mt-5"
              placeholder="••••••••"
              name="new-password"
              id="new-password"
              type="password"
              required={true}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="submit"
              value="Change"
              className="w-full text-white bg-violet-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-5 hover:scale-105"
            />
          </form>
          <form className="flex flex-col items-center m-5">
            <span className="text-center">Change Username</span>
            <input
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mt-5"
              placeholder={userName}
              name="new-username"
              id="new-username"
              type="text"
              required={true}
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
            />
            <input
              type="submit"
              value="Change"
              className="w-full text-white bg-violet-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-5 hover:scale-105"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Settings;
