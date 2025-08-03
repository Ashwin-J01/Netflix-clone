import { createSlice } from "@reduxjs/toolkit";
const movieSlice = createSlice({
    name: "movie",
    initialState: {
        nowPlayingMovie:null,
        popularMovie: null,
        topRatedMovie: null,
        upcomingMovie: null,
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
    }
}
});
export const { getNowPlayingMovies,getPopularMovies,getTopRatedMovie,getUpcomingMovie } = movieSlice.actions;
export default movieSlice.reducer;