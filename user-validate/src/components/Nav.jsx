import React,{ useState, useEffect} from 'react'
import './nav.css'
import Netflix_logo from './images/Netflix-removebg-preview.png'
import Search from './Search'
import Profile from './Profile'
import {Link} from 'react-router-dom'
import HomePage from '../HomePage'
function Nav(props) {
    const [handleshow,sethandleshow] = useState(false)
    useEffect(() =>{
        window.addEventListener("scroll",()=>{
            if(window.scrollY > 100){
                sethandleshow(true)
            }
            else sethandleshow(false)
        })
        return (()=>{
            if(window.addEventListener("scroll")){
            window.removeEventListener("scroll")
            }
        })
    },[])
    const onSearch = (search)=>{
        props.onSearch(search)
    }
  return (
    <div className={`nav ${handleshow && ' nav-black'}`}>
        <Link to='/home' element={<HomePage />}><img className="nav-logo" src={Netflix_logo} alt="netflix logo" /></Link>
        <Search onSearch={onSearch} />
        <Link to='/profile' element={<Profile />}><img className="nav-avatar" src="https://i.pinimg.com/736x/db/70/dc/db70dc468af8c93749d1f587d74dcb08.jpg" alt="avatar" /></Link>
    </div>
  )
}

export default Nav