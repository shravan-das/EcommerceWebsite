import React from 'react'
import './About.css'
import Aboutimage from "../../../images/Aboutimage.jpg"

const About = () => {
  return (

    <section className='main'> 
    <div className='about'>


        
        
        
        <img src={Aboutimage} className='Aboutimage'/>

        <div className="abouttext">
            <h1>About Us</h1>
            <h5>Developer <span className='designer'>&Designer</span></h5>
            <p>Hi This is Shravan ! The  Developer and Founder of Shravans Ecommerce....
                We Ship Quality Products world wide.
                Dont wait order now ....

             
            </p>
        </div>





    </div>
    </section>
  )
}

export default About