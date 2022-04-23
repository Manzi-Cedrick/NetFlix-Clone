import movieTrailer from "movie-trailer";
import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import instance from "../axios";
import request from "../request";
import "./banner.css";
function Banner() {
  const [onemovies, setOneMovies] = useState([]);
  const [trailerUrl, settrailerUrl] = useState("");
  const baseurl = "https://image.tmdb.org/t/p/original/";
  useEffect(() => {
    async function getBannerMovie() {
      const requests = await instance.get(request.fetchNetflixOriginals);
      const data =
        requests.data.results[
          Math.floor(Math.random() * requests.data.results.length - 1)
        ];
      setOneMovies(data);
    }
    getBannerMovie();
  }, []);
  console.table(onemovies);
  const opts={
    height: "400",
    width:"100%",
    playerVars: {
      autoplay:1,
    }
  }
  const showMovie = () => {
    if (trailerUrl) {
      settrailerUrl("");
    } else {
      movieTrailer(
        onemovies?.name || " " || onemovies?.original_name || onemovies?.title
      )
        .then((url) => {
          const urlparams = new URLSearchParams(new URL(url).search);
          settrailerUrl(urlparams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };
  return (
    <div>
    <header
      className="banner"
      style={{
        backgroundImage: `url("${baseurl}${
          onemovies?.backdrop_path || onemovies?.poster_path
        }")`,
        backgroundSize: "cover",
        backgroundPosition: "top center",
      }}
    >
      <div className="banner_contents">
        <h1 className="banner_title">
          {onemovies?.title || onemovies?.name || onemovies?.original_name}
        </h1>
        <div className="banner_btns">
          <button className="banner_button" onClick={showMovie}>
            Play
          </button>
          <button className="banner_button">My List</button>
        </div>
        <p
          className={`banner_description ${
            onemovies?.overview > 200 && " large-overview"
          }`}
        >
          {onemovies?.overview}
        </p>
      </div>
      <div className="banner_fade">
      </div>
    </header>
    <div>
    {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
    </div>
  );
}

export default Banner;
