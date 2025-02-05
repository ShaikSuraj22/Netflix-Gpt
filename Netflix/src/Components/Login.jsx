import React, { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignInForm, setSignInForm] = useState(true);
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
        <form className="bg-black bg-opacity-75 p-8 rounded-lg shadow-lg w-96 text-white ">
          <h2 className="text-2xl font-semibold mb-6">
            {isSignInForm ? " Sign In" : "Sign Up"}
          </h2>
          {!isSignInForm && (
            <>
              <label htmlFor="password" className="block mt-4 text-gray-300">
                Full Name:
              </label>
              <input
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
            type="email"
            id="email"
            className="w-full p-3 bg-gray-800 rounded mt-2 focus:outline-none"
            required
          />
          <label htmlFor="password" className="block mt-4 text-gray-300">
            Password:
          </label>
          <input
            type="password"
            id="password"
            className="w-full p-3 bg-gray-800 rounded mt-2 focus:outline-none"
            required
          />
          <button
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
