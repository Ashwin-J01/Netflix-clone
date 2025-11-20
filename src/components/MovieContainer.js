import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'
import './MovieContainer.css'

const MovieContainer = () => {
  const movie = useSelector(store => store.movie)

  if (!movie) return null; // OR return a loader like <div>Loading...</div>

  return (
    <div className="movie-container">
      <div className="movie-container-inner">
<MovieList title={"Popular Movies"} movies={movie.popularMovie} />
<MovieList title={"Now Playing Movies"} movies={movie.nowPlayingMovie} isNowPlaying={true} /> 
<MovieList title={"Top Rated Movies"} movies={movie.topRatedMovie} /> 
<MovieList title={"Upcoming Movies"} movies={movie.upcomingMovie} /> 

      </div>
    </div>
  )
}

export default MovieContainer
