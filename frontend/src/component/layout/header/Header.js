import React from 'react'
import {ReactNavbar} from "overlay-navbar"
import logo from "../../../images/logo.png"
import {FaUserAlt} from "react-icons/fa" 
import {FaSearch} from "react-icons/fa"
import {FaCartPlus } from 'react-icons/fa'

const header = () => {
  return (
    <ReactNavbar 
    burgerColor ="#eb4034" 
    burgerColorHover ="a62d24" 
    logo = {logo} 
    logoWidth = "15vmax"
    logoAnimationTime = "3"
    navColor1 = "grey"
    logoHoverSize = "20px"
    logoHoverColor = "#aeeb34"
    link1Text = "Home"
    link2Text = "Products"
    link3Text = "About"
    link4Text = "ContactUs"
    link1Url = "/"
    link2Url = "/products"
    link3Url = "/about"
    link4Url = "/contactus"
    link1Size = "2vmax" 
    link1Family = "Bree Serif"
    link1Color = "purple"
    nav1justifyContent ="flex-end"
    nav2justifyContent ="flex-end"
    nav3justifyContent ="flex-start"
    nav4justifyContent ="flex-end"
    nav5justifyContent = "center"
    searchIconMargin = "4"
    link1ColorHover = "black"
    link2ColorHover = "black"
    link3ColorHover = "black"
    link4ColorHover = "black"
    link1Margin = "2vmax"
    link2Margin = "2vmax"
    link3Margin = "1vmax"
    link4Margin = "3vmax"
    profileIconColor = "black"
    profileIcon = {true}
    profileIconUrl = "/login"
    searchIcon = {true}
    cartIcon = {true}
    ProfileIconElement = {FaUserAlt}
    SearchIconElement = {FaSearch}
    CartIconElement = {FaCartPlus}
    searchIconColor = " black"
    profileIconColorHover = "red"
    searchIconColorHover = "pink"
    profileIconMargin =	"1vmax"
    cartIconColor = "rgb(14 15 14)"
    cartIconMargin = "1vmax"
    cartIconColorHover = "#aeeb34"
    searchIconSize ="2vmax"
    profileIconSize="2vmax"
    
      />
  )
}

export default header
