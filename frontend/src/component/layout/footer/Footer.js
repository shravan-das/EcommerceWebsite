import React from 'react';
import appstore from '../../../images/Appstore.png';
import playstore from '../../../images/playstore.png';
import {IoLogoFacebook} from 'react-icons/io5'
import { IoLogoLinkedin } from 'react-icons/io5';
import { IoLogoYoutube } from 'react-icons/io5';
import "./Footer.css" 


const Footer = () => {
  return (
      <footer id = "footer">
          <div className="leftFooter">
              <h4>Download Now</h4>
              <img src={appstore} alt="appstore" />
              <img src={playstore} alt="playstore" />

          </div>

          <div className="midFooter">
              <h1>ECOMMERCE.</h1>
              <p>Service before Self is Our priority...
              </p>

              <p>Copyrights 2022  &copy; |MeShravanDas</p>


          </div>
          <div className="rightFooter">
              <h4>Follow us</h4>
            
              <a href='https://www.facebook.com/profile.php?id=100011397047686' target="_blank"><span className='fb'> <IoLogoFacebook/></span>Facebook</a>
              <a href='https://www.linkedin.com/in/shravan-das-191027146/ ' target= "_blank"><span className='fb'> <IoLogoLinkedin/></span>linkedin</a>
              <a href='http://Youtube.com'  target= "_blank"><span className='fb'> <IoLogoYoutube/></span>Youtube</a>
            </div>

        

      </footer>
    
  )
};

export default Footer