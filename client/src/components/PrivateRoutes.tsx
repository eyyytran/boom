<<<<<<< HEAD
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import userSlice from "../store/userSlice";

const PrivateRoutes = () => {
  const user = {
    state: useSelector((state: RootState) => state.user),
    actions: userSlice.actions,
  };
  const isUser = user.state.user;
  return isUser ? <Outlet /> : <Navigate to="/login" />;
};
=======
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import userSlice from '../store/userSlice'

const PrivateRoutes = () => {
    const user = {
        state: useSelector((state: RootState) => state.user),
        actions: userSlice.actions,
    }
    const isUser = user.state.user
    return isUser ? <Outlet /> : <Navigate to='/login' />
}
>>>>>>> 4d42d13f94ba253c64c6bd29b1f95b389b236b00

export default PrivateRoutes;
