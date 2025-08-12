import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movie",
  initialState: {
    nowPlayingMovie: null,
    popularMovie: null,
    topRatedMovie: null,
    upcomingMovie: null,
    toggle: false,
    trailerMovie: null,
    open:false,
    id:"",
  },
  reducers: {
    getNowPlayingMovies: (state, action) => {
      state.nowPlayingMovie = action.payload;
    },
    getPopularMovies: (state, action) => {
      state.popularMovie = action.payload;
    },
    getTopRatedMovie: (state, action) => {
      state.topRatedMovie = action.payload;
    },
    getUpcomingMovie: (state, action) => {
      state.upcomingMovie = action.payload;
    },
    setToggle: (state) => {
      state.toggle = !state.toggle;
    },
    getTrailerMovies: (state, action) => {
      state.trailerMovie = action.payload;
    },
    setOpen:(state,action)=>{
            state.open = action.payload;
        },
        getId:(state,action)=>{
            state.id = action.payload;
        }
  }
});

export const { 
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovie,
  getUpcomingMovie,
  setToggle,
  getTrailerMovies,
  setOpen, // ✅ now matches reducer
  getId
} = movieSlice.actions;

export default movieSlice.reducer;
