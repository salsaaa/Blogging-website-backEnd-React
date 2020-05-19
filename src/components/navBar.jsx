import React from 'react';
import '../css/open-iconic-bootstrap.min.css'
import '../css/animate.css'
import '../css/owl.carousel.min.css'
import '../css/owl.theme.default.min.css'
import '../css/magnific-popup.css'
import '../css/aos.css'
import '../css/ionicons.min.css'
import '../css/bootstrap-datepicker.css'
import '../css/jquery.timepicker.css'
import '../css/flaticon.css'
import '../css/icomoon.css'
import '../css/style.css'
import { Link } from 'react-router-dom';
const NavBar=props=>{
        return (  
            <React.Fragment>
                 <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
    <div className="container">
      <a className="navbar-brand" href="index.html">Website Name.</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="oi oi-menu" /> Menu
      </button>
      <div className="collapse navbar-collapse" id="ftco-nav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item active"><Link to="/home" className="nav-link"onClick={()=>props.onNewFeeds(false)}>Home</Link></li>
          {localStorage.getItem('token')&&<li className="nav-item"><Link to="/profile"  className="nav-link" onClick={()=>props.onMyProfile(true)}>My Profile</Link></li>}
          {localStorage.getItem('token')&&<li className="nav-item"><Link to="/home"  className="nav-link" onClick={()=>props.onNewFeeds(true)}>New Feeds</Link></li>}
         
          <li onClick={()=>props.onLogout("logout")} className="nav-item">{props.logout?<Link to="/signingForm/login" className="nav-link">Logout</Link>:<Link to="/signingForm/login" className="nav-link">Login</Link>}</li>
          <li className="nav-item">
          <div className="col-md-9">
                <form action="#" className="subscribe-form">
                  <div className="form-group">
                   {localStorage.getItem('token')&& <input type="text" className="form-control" placeholder="Search..." onChange={e=>props.onSearch(e.target.value)}/>}
                   {localStorage.getItem('token')&&  <span className="close icon icon-search" />}
                  </div>
                </form>
              </div>
              </li>
        </ul>
      </div>
    </div>
  </nav>
  {/* END nav */}
            </React.Fragment>
        );
    }

 
export default NavBar;