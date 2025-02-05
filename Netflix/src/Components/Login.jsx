import React, { useRef, useState } from "react";
import Header from "./Header";
import { isValidData } from "../Utils/validation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../Utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Login = () => {
  const [isSignInForm, setSignInForm] = useState(true);
  const [erroMessage, seterrorMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Validations
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const handleClickButton = () => {
    // check validation here
    const message = isValidData(
      email?.current?.value,
      password?.current?.value
    );
    // console.log(email.current.value);
    // console.log(password.current.value);
    // console.log(message);
    seterrorMessage(message);
    if (message) return;

    if (!isSignInForm) {
      // Sign up logic
      createUserWithEmailAndPassword(
        auth,
        email?.current?.value,
        password?.current?.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: "https://example.com/jane-q-user/profile.jpg",
          })
            .then(() => {
              // Profile updated!
              const { uid, email, displayname } = auth.currentUser;
              dispatch(
                addUser({ uid: uid, email: email, displayname: displayname })
              );
              navigate("/browser");

              // ...
            })
            .catch((error) => {
              // An error occurred
              seterrorMessage(error.message);
              // ...
            });

          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          seterrorMessage(errorCode + " -" + errorMessage);
        });
    } else {
      // Sign In Logic
      signInWithEmailAndPassword(
        auth,
        email?.current?.value,
        password?.current?.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          navigate("/browser");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          seterrorMessage(errorCode + " -" + errorMessage);
        });
    }
  };
  const togglehandle = () => {
    setSignInForm(!isSignInForm);
  };
  return (
    <div className="relative w-screen h-screen">
      {/* Header */}
      <Header />

      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/fb5cb900-0cb6-4728-beb5-579b9af98fdd/web/IN-en-20250127-TRIFECTA-perspective_cf66f5a3-d894-4185-9106-5f45502fc387_large.jpg"
          alt="Background"
          className="w-full h-full object-cover"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>

      {/* Login Form */}
      <div className="absolute inset-0 flex justify-center items-center opacity-80 ">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="bg-black bg-opacity-75 p-8 rounded-lg shadow-lg w-96 text-white "
        >
          <h2 className="text-2xl font-semibold mb-6">
            {isSignInForm ? " Sign In" : "Sign Up"}
          </h2>
          {!isSignInForm && (
            <>
              <label htmlFor="password" className="block mt-4 text-gray-300">
                Full Name:
              </label>
              <input
                ref={name}
                type="text"
                id="Name"
                className="w-full p-3 bg-gray-800 rounded mt-2 focus:outline-none "
                required
              />
            </>
          )}
          <label htmlFor="email" className="block text-gray-300 mt-3">
            Email:
          </label>

          <input
            ref={email}
            type="email"
            id="email"
            className="w-full p-3 bg-gray-800 rounded mt-2 focus:outline-none"
            required
          />
          <label htmlFor="password" className="block mt-4 text-gray-300">
            Password:
          </label>
          <input
            ref={password}
            type="password"
            id="password"
            className="w-full p-3 bg-gray-800 rounded mt-2 focus:outline-none"
            required
          />
          {/* Error message Here */}
          <p className="text-red-500 mt-2">{erroMessage}</p>

          <button
            onClick={handleClickButton}
            type="submit"
            className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded font-bold"
          >
            {isSignInForm ? " Sign In" : "Sign Up"}
          </button>
          <div className="flex justify-between mt-4 text-sm text-gray-400">
            <div>
              <input type="checkbox" id="remember" className="mr-1" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <a href="#" className="hover:underline">
              Need help?
            </a>
          </div>
          <p className="mt-6 text-center text-gray-400">
            {isSignInForm ? "New to Netflix?  " : "Already a User "}
            <a
              onClick={togglehandle}
              href="#"
              className="text-white hover:underline"
            >
              {isSignInForm ? " Sign Up Now" : "Sign In now"}
            </a>
            .
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
