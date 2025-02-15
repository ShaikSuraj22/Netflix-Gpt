import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    // FINALLY THE API DATA MOVIES STORED HERE IN NOWMOVIES PLAYING
    nowPlayingMovies: null,
    popularMovies: null,
    topRatedMovies: null,
    upComingMovies: null,
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
    addTopRatedMovies: (state, action) => {
      state.topRatedMovies = action.payload;
    },
    addUpComingMovies: (state, action) => {
      state.upComingMovies = action.payload;
    },
    addTrailer: (state, action) => {
      state.TrailerKey = action.payload;
    },
  },
});

export const {
  addNowPlayingMovies,
  addTrailer,
  addPopularMovies,
  addTopRatedMovies,
  addUpComingMovies,
} = movieSlice.actions;
export default movieSlice.reducer;
