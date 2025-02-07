import React, { useEffect, useState } from "react";
import { API_OPTIONS } from "../Utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addTrailer } from "../Utils/movieSlice";

const VideoBackground = ({ movieid }) => {
  // HERE USING DISPATCH TO DISPATCH THE TRAILER KEY TO THE STORE;
  const dispatch = useDispatch();
  // WE USE USESELECTOR TO GET THE KEY FROM THE STORE( HERE TRAILERKEY IS NAME WHICH WE GIVEN IN THE MOVIESLICE)
  const trailerVideoKey = useSelector((store) => store.movies?.TrailerKey);
  // HERE WE USE USESTATE TO GET TRAILERKEY BECAUSE WE CANT ACCESS IT DIRECTLY
  // instead of using use state we use the REDUX STORE HERE TO SIMPLY IT, THEN WE CAN ACCESS IT FROM REDUX STORE
  // const [trailerid, setTrailerid] = useState(null);
  // getting trailer of the movieid passed;

  // FETCHING THE  TRAILER DATA AND DISPLAYING THE TRAILER
  const getMovieTrailer = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        movieid +
        "/videos?language=en-US",
      API_OPTIONS
    );
    const json = await data.json();
    // console.log(json);
    // HERE IT RETURNED 35 RESULTS WE WANT ONLY TRAILER SO WE NEED TO FILTER IT
    const FilterData = json.results.filter((video) => video.type === "Trailer");
    // WE HAVE TWO TRAILERS SO WE ARE CONSIDERING FIRST TRAILER TO SHOW IN THE PAGE
    const Trailer = FilterData.length ? FilterData[0] : json.results[0];
    // console.log(Trailer);
    // setTrailerid(Trailer.key);
    // HERE WE DISPATCHING THE TRAILER KEY INTO THE REDUX STORE
    dispatch(addTrailer(Trailer?.key));
  };
  useEffect(() => {
    getMovieTrailer();
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <iframe
        className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
        src={`https://www.youtube.com/embed/${trailerVideoKey}?autoplay=1&mute=1&loop=1&playlist=${trailerVideoKey}&controls=0&showinfo=0&modestbranding=1`}
        title="Netflix Background Trailer"
        frameBorder="0"
        allow="autoplay; encrypted-media"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>

      {/* Dark Overlay for Better Visibility */}
      <div className="absolute inset-0 bg-black/40"></div>
    </div>
  );
};

export default VideoBackground;
