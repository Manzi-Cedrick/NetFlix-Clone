import React, { useEffect } from 'react'
import Banner from "./components/Banner";
import Row from "./components/Row";
import Nav from "./components/Nav";
import request from "./request";
// import jwt from 'jsonwebtoken';
// import {Redirect} from 'react-router-dom'
// import Login from './components/Login';
function HomePage() {
  // const [render,setRender] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token){
      alert('Token availablee you are now in home page')
    }
  }, [])
  
  return (
    <div>
    <Nav />
    <Banner />
    <Row title="Netflix Original" fetchUrl={request.fetchNetflixOriginals} isLargeRow />
    <Row title="Trending Now" fetchUrl={request.fetchTrendings} />
    <Row title="Top Rate" fetchUrl={request.fetchTopRated} />
    <Row title="Action Movies" fetchUrl={request.fetchActionMovies} />
    <Row title="Comedy movies" fetchUrl={request.fetchComedyMovies} />
    <Row title="Horror Movies" fetchUrl={request.fetchHorrorMovies} />
    <Row title="Romance Movies" fetchUrl={request.fetchRomanceMovies} />
    <Row title="Documentary" fetchUrl={request.fetchDocumentaries} /></div>
  )
}

export default HomePage