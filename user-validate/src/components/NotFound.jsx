import React from 'react'
import HomePage from '../HomePage'
import './notfound.css'
import {Link } from 'react-router-dom'
function NotFound() {
  return (
    <div>
    <h1>404 Error Page</h1>
<section class="error-container">
  <span>4</span>
  <span><span class="screen-reader-text">0</span></span>
  <span>4</span>
</section>
<div class="link-container">
  <Link to="/home" class="more-link" element={<HomePage />}>Visit the original article</Link>
</div>
   </div>
     )

}

export default NotFound