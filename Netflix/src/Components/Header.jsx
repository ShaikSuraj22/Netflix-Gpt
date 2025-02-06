import React, { useEffect } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../Utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../Utils/userSlice";
import { NETFILX_LOGO } from "../Utils/constants";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const handleClickSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };
  useEffect(() => {
    // YOU WILL GET THIS FROM MANAGE STATES FROM WEB IN FIREBASE
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });
    // unsubscribes when component unmounts
    return () => unsubscribe();
  }, []);
  return (
    <div className="absolute top-0 left-0 w-full px-8 py-4 bg-gradient-to-b from-black z-10 flex justify-between">
      <img className="w-44" src={NETFILX_LOGO} alt="Netflix Logo" />
      {user && (
        <div className="flex items-center space-x-2">
          <button
            onClick={handleClickSignOut}
            className=" cursor-pointer bg-red-600 text-white px-4 py-2 text-lg font-semibold rounded-md flex items-center gap-2 hover:bg-red-700 transition duration-200"
          >
            <FaSignOutAlt className="text-xl" /> Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
