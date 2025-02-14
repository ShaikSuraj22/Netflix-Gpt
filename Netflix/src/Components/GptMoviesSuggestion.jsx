import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMoviesSuggestion = () => {
  const gpt = useSelector((store) => store.gpt);
  const movieNames = gpt?.movieNames || [];
  const movieResults = gpt?.movieResults || [];

  return (
    movieNames.length > 0 && (
      <div className="absolute top-161 left-0 w-full bg-opacity-10 p-4  shadow-lg z-50  bg-black">
        <div className="">
          {movieNames.map((moviename, index) => (
            <div key={moviename} className="">
              <MovieList title={moviename} movies={movieResults[index] || []} />
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default GptMoviesSuggestion;
