import { createSlice } from "@reduxjs/toolkit";
const movieSlice = createSlice({
    name: "movie",
    initialState: {
        nowPlayingMovie:null,
        popularMovie: null,
        topRatedMovie: null,
        upcomingMovie: null,
        toggle:false,
        trailerMovie:null,
    },
    reducers: {
        getNowPlayingMovies: (state, action) => {
            state.nowPlayingMovie = action.payload;
        },
        getPopularMovies: (state, action) => {
            state.popularMovie = action.payload;
    },
    getTopRatedMovie : (state, action) => {
            state.topRatedMovie = action.payload;
    },
    getUpcomingMovie: (state, action) => {
            state.upcomingMovie = action.payload;
    },
    setToggle:(state)=>{
        state.toggle = !state.toggle;
    },
    getTrailerMovies: (state, action) => {
        state.trailerMovie = action.payload;
}}
});
export const { getNowPlayingMovies,getPopularMovies,getTopRatedMovie,getUpcomingMovie,setToggle,getTrailerMovies} = movieSlice.actions;
export default movieSlice.reducer;