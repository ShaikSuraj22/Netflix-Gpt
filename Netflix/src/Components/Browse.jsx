import React, { useEffect } from "react";
import Header from "./Header";
import useNowMoviesPlaying from "../Hooks/useNowMoviesPlaying";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../Hooks/usePopularMovies";

const Browse = () => {
  useNowMoviesPlaying();
  usePopularMovies();
  return (
    <div>
      <Header />
      <MainContainer/>
      <SecondaryContainer/>
    </div>
  );
};

export default Browse;
