import React,{ useState} from 'react'
import './footer.css'
function Footer() {
    const [cookieclick,setCookie] =useState(false);
  return (
    <div className={`sticky-footer ${cookieclick && ' removecookie'}`}>
    <div className='footer'>
        <div className="footer-flex">
        <div>
            <p>This site uses cookies to offer you a better experience. Find out more <a href="#">on how to use cookies</a></p>
            </div>
            <div>
                <button className="btn" onClick={()=>setCookie(true)}>Accept</button>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Footer