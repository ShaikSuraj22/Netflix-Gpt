import React from "react";
import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

const MainContainer = () => {
  // NOW WE ARE USING THE API STORED DATA WHICH IS STORE IN NOWPLAYINGMOVIES(THAT IS THE REASON WE ARE USING THE REDUX IN THIS APPLICATION ITS LIKE CENTRALIZED STORAGE SYSTEM)
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  if (movies === null) return;
  const mainMovie = movies[10];
//   console.log(mainMovie);
  const { title, overview ,id} = mainMovie;

  return (
    <div className="w-full h-[650px] border border-black">
      <VideoTitle title={title} overview={overview} />
      <VideoBackground movieid={id} />
    </div>
  );
};

export default MainContainer;
