const apikey="4419f046f7ab84bd39c9d66db1c797d0"
const request = {
    fetchTrendings: `/trending/all/week?api_key=${apikey}&language=en-US`,
    fetchNetflixOriginals: `/discover/tv?api_key=${apikey}&with_networks=213`,
    fetchTopRated: `/movie/top_rated?api_key=${apikey}&language=en-US`,
    fetchActionMovies: `/discover/movie?api_key=${apikey}&with_genres=28`,
    fetchComedyMovies: `/discover/movie?api_key=${apikey}&with_genres=35`,
    fetchHorrorMovies: `/discover/movie?api_key=${apikey}&with_genres=27`,
    fetchRomanceMovies: `/discover/movie?api_key=${apikey}&with_genres=10749`,
    fetchDocumentaries: `/discover/movie?api_key=${apikey}&with_genres=99`
}
export default request;