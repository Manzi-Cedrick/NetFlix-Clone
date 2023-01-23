import React from 'react'
import CheckOut from './CheckOut'
import './profile.css'
import { Link} from 'react-router-dom'
function Profile() {
  return (
      <div>
       <h2 className='profile-title'>Edit The profile</h2>
    <div className="profile">
      
       <div className="profile-flexins">
       <div className="profile-img">
           <img src="https://i.pinimg.com/736x/db/70/dc/db70dc468af8c93749d1f587d74dcb08.jpg" alt="no image" />
       </div> 
    <div className="profile-block">
        <h2>cedrickmanzii0@gmail.com</h2>
        <div className="profile-plans">
            <h1>Plans (Current Plan : Premium)</h1>
            <span>Renewal date:28/4/2022</span>
            <div className="profile-pay-flex">
                <span>Netflix Standards</span>
                <Link to='checkout' element={<CheckOut />}><button className='btn-primary'>Subscribe</button></Link>
            </div>
            <div className="profile-pay-flex">
                <span>Netflix Basic</span>
                <button className='btn-primary'>Subscribe</button>
            </div>
            <div className="profile-pay-flex">
                <span>Netflix Premium</span>
                <button className='btn-primary'>Current Package</button>
            </div>
            <button className='btn-primary-sign-out'>Sign Out</button>
        </div>
    </div>
    </div>
    </div>
    </div>
  )
}

export default Profile