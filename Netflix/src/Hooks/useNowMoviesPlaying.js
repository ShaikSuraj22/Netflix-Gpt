import { useDispatch, useSelector } from "react-redux";
import { addNowPlayingMovies } from "../Utils/movieSlice";
import { API_OPTIONS } from "../Utils/constants";
import { useEffect } from "react";

const useNowMoviesPlaying = () => {
  const dispatch = useDispatch();
  const nowPlayingMovies = useSelector(
    (store) => store.movies.nowPlayingMovies
  );

  const getNowPlayingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?page=1",
      API_OPTIONS
    );
    const json = await data.json();
    // console.log(json.results);
    // HERE WE ARE ADDING API DATA INTO THE ADDNOWPLAYINGMOVIES INSIDE OF nowPlayingMovies(NOW THE DATA IS STORED INSIDE OF IT )
    dispatch(addNowPlayingMovies(json.results));
  };
  useEffect(() => {
    !nowPlayingMovies && getNowPlayingMovies();
  }, []);
};

export default useNowMoviesPlaying;
