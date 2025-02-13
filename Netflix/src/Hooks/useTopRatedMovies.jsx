import { useDispatch } from "react-redux";
import { addPopularMovies, addTopRatedMovies } from "../Utils/movieSlice";
import { API_OPTIONS } from "../Utils/constants";
import { useEffect } from "react";

const useTopRatedMovies = () => {
  const dispatch = useDispatch();

  const getTopRated = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?page=1",
      API_OPTIONS
    );
    const json = await data.json();
    // console.log(json.results);
    // HERE WE ARE ADDING API DATA INTO THE ADDNOWPLAYINGMOVIES INSIDE OF nowPlayingMovies(NOW THE DATA IS STORED INSIDE OF IT )
    dispatch(addTopRatedMovies(json.results));
  };
  useEffect(() => {
    getTopRated();
  }, []);
};

export default useTopRatedMovies;
