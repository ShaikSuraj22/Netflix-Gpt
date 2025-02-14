import React from "react";
import { IMG_CDN_URL } from "../Utils/constants";

const MovieCard = ({ posterpath }) => {
  if (!posterpath) return null;
  return (
    <div className="w-[200px] min-w-[200px] px-2 transition-transform duration-300 hover:scale-110 cursor-pointer">
      <img
        className="rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
        src={IMG_CDN_URL + posterpath}
        alt="Now Playing"
      />
    </div>
  );
};

export default MovieCard;
