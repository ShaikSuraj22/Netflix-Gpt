import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  console.log(movies);
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold py-3 text-white">{title}</h1>
      <div className="relative">
        <div className="flex overflow-x-scroll scrollbar-hide space-x-4 p-2">
          {movies?.length > 0 ? (
            movies.map((movie) => (
              <MovieCard key={movie.id} posterpath={movie?.poster_path} />
            ))
          ) : (
            <p className="text-white">No movies available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
