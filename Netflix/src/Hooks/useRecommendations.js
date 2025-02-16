import { useDispatch } from "react-redux";
import { addRecommendations } from "../Utils/movieSlice";
import { API_OPTIONS } from "../Utils/constants";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const useRecommendations = () => {
  const dispatch = useDispatch();
  const { movieId } = useParams();

  const getRecommendations = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/recommendations?language=en-US&page=1`,
      API_OPTIONS
    );
    const json = await data.json();
    // console.log(json.results);
    // HERE WE ARE ADDING API DATA INTO THE ADDNOWPLAYINGMOVIES INSIDE OF nowPlayingMovies(NOW THE DATA IS STORED INSIDE OF IT )
    dispatch(addRecommendations(json.results));
  };
  useEffect(() => {
    getRecommendations();
  }, []);
};

export default useRecommendations;
