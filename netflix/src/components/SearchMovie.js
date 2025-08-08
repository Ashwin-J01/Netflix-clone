import React, { useState } from 'react';
import axios from "axios";
import { SEARCH_MOVIE_URL, options } from '../utils/constant';
import { useDispatch, useSelector } from "react-redux";
import { setSearchMovieDetails } from '../redux/searchSlice';
import { setLoading } from '../redux/userSlice';
import MovieList from './MovieList';
import './SearchMovie.css'; // ✅ new CSS file

const SearchMovie = () => {
    const [searchMovie, setSearchMovie] = useState("");
    const dispatch = useDispatch();
    const isLoading = useSelector(store => store.app.isLoading);
    const { movieName, searchedMovie } = useSelector(store => store.searchMovie);
    
    const submitHandler = async (e) => {
        e.preventDefault();
        dispatch(setLoading(true));
        try {
            const res = await axios.get(`${SEARCH_MOVIE_URL}${searchMovie}&include_adult=false&language=en-US&page=1`, options);
            const movies = res?.data?.results;
            dispatch(setSearchMovieDetails({ searchMovie, movies }));
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(setLoading(false));
        }
        setSearchMovie("");
    }

    return (
        <>
            <div className='search-container'>
                <form onSubmit={submitHandler} className='search-form'>
                    <div className='search-input-container'>
                        <input 
                            value={searchMovie} 
                            onChange={(e) => { setSearchMovie(e.target.value) }} 
                            className='search-input' 
                            type="text" 
                            placeholder='Search Movies...' 
                        />
                        <button className='search-button'>
                            {isLoading ? "loading..." : "Search"}
                        </button>
                    </div>
                </form>
            </div>
            {
                searchedMovie 
                ? (<MovieList title={movieName} searchMovie={true} movies={searchedMovie}/>) 
                : (<h1>Movie Not Found!!</h1>)
            }
        </>
    )
}

export default SearchMovie;
