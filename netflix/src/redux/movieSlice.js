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
    backgroundTrailerMovie: null,
    open:false,
    id:"",
    isFullScreen: false,
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
    getBackgroundTrailerMovies: (state, action) => {
      state.backgroundTrailerMovie = action.payload;
    },
    setOpen:(state,action)=>{
            state.open = action.payload;
        },
        getId:(state,action)=>{
            state.id = action.payload;
        },
        setFullScreen:(state,action)=>{
            state.isFullScreen = action.payload;
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
  getBackgroundTrailerMovies,
  setOpen, // ✅ now matches reducer
  getId,
  setFullScreen,
  
} = movieSlice.actions;

export default movieSlice.reducer;
