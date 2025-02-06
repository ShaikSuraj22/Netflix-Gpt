import React from "react";
import { FaPlay } from "react-icons/fa";
import { LuInfo } from "react-icons/lu";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="absolute top-[30%] left-10 w-[40%] space-y-4 text-white z-10">
      <h1 className="text-5xl font-extrabold drop-shadow-md">{title}</h1>
      <p className="text-lg line-clamp-3">{overview}</p>
      <div className="flex space-x-4">
        <button className="bg-white text-black px-8 py-3 text-lg font-bold rounded-md flex items-center gap-2 hover:bg-opacity-80 transition">
          <FaPlay /> Play
        </button>
        <button className="bg-gray-600 text-white px-8 py-3 text-lg font-bold rounded-md flex items-center gap-2 hover:bg-gray-500 transition">
          <LuInfo /> More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
