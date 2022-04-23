import axios from 'axios'
// the base url to allow to fetch the movies from the database
const instance = axios.create({
    baseURL : "https://api.themoviedb.org/3"
})
export default instance