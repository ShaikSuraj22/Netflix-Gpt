import React from "react";
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";

const MovieList = ({ title, movies }) => {
  console.log(movies);
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold py-3 text-white">{title}</h1>
      <div className="relative">
        <div className="flex overflow-x-scroll scrollbar-hide space-x-4 p-2">
          {movies?.length > 0 ? (
            movies.map((movie) => (
              // here we  passing the movieid to the url when we click on that particular image of movie, then to url it will pass the id of the movie
              <Link to={`/watch/${movie.id}`} key={movie.id}>
                <MovieCard key={movie.id} posterpath={movie?.poster_path} />
              </Link>
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
