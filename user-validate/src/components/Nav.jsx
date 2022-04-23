import React,{ useState, useEffect} from 'react'
import './nav.css'
import Netflix_logo from './images/Netflix-removebg-preview.png'
function Nav() {
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
  return (
    <div className={`nav ${handleshow && ' nav-black'}`}>
        <img className="nav-logo" src={Netflix_logo} alt="netflix logo" />
        <img className="nav-avatar" src="https://i.pinimg.com/736x/db/70/dc/db70dc468af8c93749d1f587d74dcb08.jpg" alt="avatar" />
    </div>
  )
}

export default Nav