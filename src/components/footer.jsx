import React from 'react';
import { Link } from 'react-router-dom';

const Footer=props=>{
        return ( 
            <React.Fragment>
                 <footer className="ftco-footer ftco-bg-dark ftco-section">
    <div className="container">
      <div className="row mb-5">
        <div className="col-md">
          <div className="ftco-footer-widget mb-4">
            <h2 className="ftco-heading-2">websiteName.</h2>
            <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
          </div>
        </div>
        <div className="col-md">
          <div className="ftco-footer-widget mb-4 ml-5">
            <h2 className="ftco-heading-2">Quick Links</h2>
            <ul className="list-unstyled">
              <li><Link to="/home" className="py-2 d-block">Home</Link></li>
              <li><Link to="/profile/myProfile" className="py-2 d-block">My Profile</Link></li>
           
            </ul>
          </div>
        </div>
        <div className="col-md">
          <div className="ftco-footer-widget mb-4">
            <h2 className="ftco-heading-2">Contact Information</h2>
            <ul className="list-unstyled">
              <li><a href="#" className="py-2 d-block">198 West 21th Street, Suite 721 New York NY 10016</a></li>
              <li><a href="#" className="py-2 d-block">+ 1235 2355 98</a></li>
              <li><a href="#" className="py-2 d-block">info@yoursite.com</a></li>
              <li><a href="#" className="py-2 d-block">email@email.com</a></li>
            </ul>
          </div>
        </div>
        <div className="col-md">
          <div className="ftco-footer-widget mb-4">
            <ul className="ftco-footer-social list-unstyled float-md-left float-lft">
              <li className="ftco-animate"><a href="#"><span className="icon-twitter" /></a></li>
              <li className="ftco-animate"><a href="#"><span className="icon-facebook" /></a></li>
              <li className="ftco-animate"><a href="#"><span className="icon-instagram" /></a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 text-center">
        </div>
      </div>
    </div>
  </footer>
  
            </React.Fragment>
         );
    }

 
export default Footer;