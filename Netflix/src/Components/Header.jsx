import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { signOut } from "firebase/auth";
import { auth } from "../Utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const user=useSelector((store)=>store.user)
  const handleClickSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };
  return (
    <div className="absolute top-0 left-0 w-full px-8 py-4 bg-gradient-to-b from-black z-10 flex justify-between">
      <img
        className="w-44"
        src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
        alt="Netflix Logo"
      />
      { user && <div className="flex justify-center items-center">
        <p>
          <FaSignOutAlt />
        </p>
        <button
          onClick={handleClickSignOut}
          className="bg-red-300 p-2 rounded-lg m-2 cursor-pointer hover:bg-red-500"
        >
          SignOut
        </button>
      </div>}
    </div>
  );
};

export default Header;
