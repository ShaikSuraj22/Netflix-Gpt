import { useDispatch } from "react-redux";
import { addReviews } from "../Utils/movieSlice";
import { API_OPTIONS } from "../Utils/constants";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const useReviews = () => {
  const dispatch = useDispatch();
  const { movieId} = useParams();

  const getReview = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US&page=1`,
      API_OPTIONS
    );
    const json = await data.json();
    // console.log(json.results);
    // HERE WE ARE ADDING API DATA INTO THE ADDNOWPLAYINGMOVIES INSIDE OF nowPlayingMovies(NOW THE DATA IS STORED INSIDE OF IT )
    dispatch(addReviews(json.results));
  };
  useEffect(() => {
    getReview();
  }, [movieId]);
};

export default useReviews;
