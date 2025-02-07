import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    // FINALLY THE API DATA MOVIES STORED HERE IN NOWMOVIES PLAYING
    nowPlayingMovies: null,
    TrailerKey: null,
  },
  reducers: {
    // IT IS LIKE A FUNCTION, WE ARE USING IT TO ADD THE DATA INTO THE  ABOVE(NOWPLAYINGMOVIES);
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    addTrailer: (state, action) => {
      state.TrailerKey = action.payload;
    },
  },
});

export const { addNowPlayingMovies, addTrailer, addPopularMovies } =
  movieSlice.actions;
export default movieSlice.reducer;
