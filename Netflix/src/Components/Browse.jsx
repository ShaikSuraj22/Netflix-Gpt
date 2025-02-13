import React, { useEffect } from "react";
import Header from "./Header";
import useNowMoviesPlaying from "../Hooks/useNowMoviesPlaying";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../Hooks/usePopularMovies";
import useTopRatedMovies from "../Hooks/useTopRatedMovies";
import useUpComingMovies from "../Hooks/useUpComingMovies";
import { useSelector } from "react-redux";
import GptSearch from "./GptSearch";

const Browse = () => {
  const gptSearchToggle = useSelector((store) => store.gpt.showGptSearch);
  useNowMoviesPlaying();
  usePopularMovies();
  useTopRatedMovies();
  useUpComingMovies();
  return (
    <div>
      <Header />
      {gptSearchToggle ? (
        <GptSearch />
      ) : (
        <>
          <MainContainer />
          <SecondaryContainer />
        </>
      )}
    </div>
  );
};

export default Browse;
