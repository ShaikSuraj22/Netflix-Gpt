import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { addTrailer2 } from "../Utils/movieSlice";
import { API_OPTIONS, NETFILX_LOGO } from "../Utils/constants";
import useRecommendations from "../Hooks/useRecommendations";
import MovieList from "./MovieList";

const TrailerDetails = () => {
  // here we getting the movie id from the url, and storing in {movieId}
  const { movieId } = useParams();
  const dispatch = useDispatch();
  //   const [trailerKey, setTrailerKey] = useState(null);
  //   here we are storing the trailer from the redux store in trailerKey varible inorder use it later
  const trailerKey = useSelector((store) => store?.movies?.TrailerKey2);

  const getMovieTrailer = async () => {
    try {
      const response = await fetch(
        // here we passing the id of the clicked movie image, and to get the trailer of the video
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        API_OPTIONS
      );

      if (!response.ok) {
        throw new Error("Failed to fetch movie trailer");
      }

      const json = await response.json();
      const filteredData = json.results.filter(
        (video) => video.type === "Trailer"
      );
      console.log(json);
      console.log(filteredData);
      const trailer = filteredData.length ? filteredData[0] : json.results[0];

      if (trailer?.key) {
        // here we storing the trailerkey in usestate directly or we can use the redux store to get it.
        // setTrailerKey(trailer?.key);
        // here we storing the trailer key in the redux store to use later
        dispatch(addTrailer2(trailer?.key)); // Dispatch to Redux store
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  };

  useEffect(() => {
    getMovieTrailer();
  }, [movieId, dispatch]);
  // HERE WE CALLING THE USERECOMMENDATION HOOK
  useRecommendations();
  // here we getting the data of movies slice and gettting data of recommendation
  const movies = useSelector((store) => store.movies);

  return (
    <>
      <div className="absolute top-0 left-0 w-full px-8 py-4 bg-gradient-to-b from-black z-10 flex justify-between">
        <Link to={"/browse"}>
          <img className="w-44" src={NETFILX_LOGO} alt="Netflix Logo" />
        </Link>
      </div>
      <div className="flex justify-center items-center h-screen bg-black text-white">
        {trailerKey ? (
          <iframe
            className="w-[80%] h-[60%] md:w-[60%] md:h-[50%] rounded-lg shadow-lg"
            src={`https://www.youtube.com/embed/${trailerKey}`}
            title="Movie Trailer"
            allowFullScreen
          ></iframe>
        ) : (
          <p className="text-lg">No Trailer Available</p>
        )}
      </div>
      <div className="bg-black">
        <MovieList title={"Recommendations"} movies={movies?.recommendation} />
      </div>
    </>
  );
};

export default TrailerDetails;
