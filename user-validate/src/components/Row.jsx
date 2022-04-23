import React, { useState, useEffect } from "react";
import instance from "../axios";
import Youtube from 'react-youtube';
import movieTrailer from 'movie-trailer'
import './row.css'
function Row(props) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl,settrailerUrl] = useState("")
  const baseurl = "https://image.tmdb.org/t/p/original/";
  useEffect(() => {
    async function fetchMovies() {
      const request = await instance.get(props.fetchUrl);
      const data = request.data.results;
      setMovies(data);
      return request;
    }
    fetchMovies();
  }, [props.fetchUrl]);
  const opts={
    height: "400",
    width:"100%",
    playerVars: {
      autoplay:1,
    }
  }
  const handleClick = (movie) =>{
    if(trailerUrl){
      settrailerUrl('')
    }
    else{
      movieTrailer(movie?.name || "" || movie?.original_name || movie?.title)
        .then(url=>{
          const urlparams= new URLSearchParams(new URL(url).search);
          settrailerUrl(urlparams.get('v'))
        })
        .catch(error=>console.log(error))
    }
  }
  return (
    <div className="row">
      <h2 className="row_title">{props.title}</h2>
      <div className="row_posts">
        {movies.map((movie) => (
          <img
            key={movie.id}
            className={`row_poster ${props.isLargeRow && 'row_poster_large'}`}
            src={`${baseurl}${movie.poster_path}`}
            alt={movie.name}
            onClick={()=>handleClick(movie)}
          />
        ))}
      </div>
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
