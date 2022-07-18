import React from 'react'
import "./Contact.css"
import logo from "../../../images/logo.png"

const Contact = () => {
  return (
    <div>
<section className='maindiv'> 
    <div className='contact'>


        
        
        
        <img src={logo} className='contactimage'/>

        <div className="contacttext">
            <h1>Contact Us</h1>
           {/* <h5>Developer <span className='contactdesigner'>&Designer</span></h5> */}
            <p>Any Query?
                <br />
                Contact @
                <br />
                <span>Email:ishravan919@gmail.com</span>
                <br />
                <span>Phone:7088941608</span>

             
            </p>
        </div>





    </div>
    </section>



    </div>
  )
}

export default Contact