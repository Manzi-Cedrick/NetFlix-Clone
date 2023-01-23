import React,{ useState} from 'react'
import './search.css'
import { FaSearch } from 'react-icons/fa'
function Search(props) {
    const [searchtext,setsearchtext] = useState('')
    const handleSearch = (e)=>{
        setsearchtext(e.target.value);
        props.onSearch(searchtext);
    }
  return (
    <div className="searchBox">
    <input className="searchInput" type="text" name="search" placeholder="Search" onChange={handleSearch} />
    <button className="searchButton" href="#">
        <i className="material-icons">
            <FaSearch />
        </i>
    </button>
</div>
  )
}

export default Search