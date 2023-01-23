import React, { useEffect,useState } from 'react'
import Banner from "./components/Banner";
import Row from "./components/Row";
import Nav from "./components/Nav";
import request from "./request";
import { useNavigate } from 'react-router-dom';
import Footer from './components/Footer';
function HomePage() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  useEffect(() => {
    async function serverValidate() {
      const response = await fetch('http://localhost:5500/api/checkuser',{
        method : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : token
        }
      })
      const data = response.json();
    }
    serverValidate()
    if(token) {
      navigate('/home');
    }else{
      navigate('/')
    }
  }, [])
  let searchword
  const onSearch = (searchtext) =>{
    searchword = searchtext
    console.log(searchword);
  }
  return (
    <div>
    <Nav onSearch={onSearch} />
    <Banner />
    <Row title="Netflix Original" fetchUrl={request.fetchNetflixOriginals} isLargeRow searchword={searchword} />
    <Row title="Trending Now" fetchUrl={request.fetchTrendings} searchword={searchword} />
    <Row title="Top Rate" fetchUrl={request.fetchTopRated} searchword={searchword} />
    <Row title="Action Movies" fetchUrl={request.fetchActionMovies} searchword={searchword} />
    <Row title="Comedy movies" fetchUrl={request.fetchComedyMovies} searchword={searchword} />
    <Row title="Horror Movies" fetchUrl={request.fetchHorrorMovies} searchword={searchword} />
    <Row title="Romance Movies" fetchUrl={request.fetchRomanceMovies} searchword={searchword} />
    <Row title="Documentary" fetchUrl={request.fetchDocumentaries} searchword={searchword} />
    <Footer/>
    </div>
  )
}

export default HomePage