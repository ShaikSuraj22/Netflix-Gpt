import React, { useEffect } from "react";
import Login from "./Login";
import {
  createBrowserRouter,
  RouterProvider,
  
} from "react-router-dom";
import Browse from "./Browse";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Utils/firebase";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../Utils/userSlice";
const Body = () => {
  const dispatch = useDispatch();
  const approuter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browser",
      element: <Browse />,
    },
  ]);

  useEffect(() => {
    // YOU WILL GET THIS FROM MANAGE STATES FROM WEB IN FIREBASE
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayname } = user.uid;
        dispatch(addUser({ uid: uid, email: email, displayname: displayname }));
      } else {
        // User is signed out
        dispatch(removeUser());
      }
    });
  }, []);

  return (
    <div>
      <RouterProvider router={approuter} />
    </div>
  );
};

export default Body;
