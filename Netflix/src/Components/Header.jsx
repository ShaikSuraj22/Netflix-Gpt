import React, { useEffect, useState } from "react";
import { FaSignOutAlt, FaCog, FaUser } from "react-icons/fa";
import { GiArtificialIntelligence } from "react-icons/gi";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../Utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../Utils/userSlice";
import { NETFILX_LOGO } from "../Utils/constants";
import { toggleGptSearchView } from "../Utils/gptSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const [isOpen, setIsOpen] = useState(false);

  const handleGptSearchClick = () => {
    // WE NEED TOGGLE IT FROM THE REDUX STORE
    dispatch(toggleGptSearchView()); 
  };

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
      {/* if it is a browse page then only we see SIGNOUT OPTION */}
      {user && (
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-gray-800 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-700 transition duration-200"
          >
            <FaUser className="text-xl" /> Account
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg">
              <ul className="py-2 text-gray-800">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2">
                  <FaCog /> App Settings
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                  onClick={handleGptSearchClick}
                >
                  <GiArtificialIntelligence /> Gpt Search
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2">
                  <FaUser /> Profile
                </li>
                <li
                  onClick={handleClickSignOut}
                  className="px-4 py-2 hover:bg-red-100 cursor-pointer flex items-center gap-2 text-red-600"
                >
                  <FaSignOutAlt /> Sign Out
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
