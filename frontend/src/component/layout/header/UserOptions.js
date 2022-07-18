import React, { Fragment } from 'react'
import  "./Header.css";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import Backdrop from "@material-ui/core/Backdrop";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import {useHistory} from "react-router-dom";
import { useState } from 'react';
import {useAlert} from "react-alert";
import { logout } from '../../../actions/userAction';
import {useDispatch , useSelector} from "react-redux"
import { userReducer } from '../../../reducers/userReducer';

const UserOptions = ({user}) => {
  const { cartItems } = useSelector((state) => state.cart);
    const [open,Setopen] = useState(false);
    const history = useHistory();
    const alert = useAlert();
    const dispatch = useDispatch(); 
    const options = [
      { icon: <ListAltIcon />, name: "Orders", func: orders },
      { icon: <PersonIcon />, name: "Profile", func: account },
      {
        icon: (
          <ShoppingCartIcon
            style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
          />
        ),
        name: `Cart(${cartItems.length})`,
        func: cart,
      },
      { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
    ];
    
    if(user.role === 'admin'){
      options.unshift({ icon: <DashboardIcon />, name: "Dashboard", func: dashboard })
    }
    
    function dashboard() {
      history.push("/admin/dashboard");
    }
    
    function orders(){
      history.push("/orders");
    }
    function account(){
      history.push("/account");
    }

    function cart(){
      history.push("/cart")
    }
    function logoutUser(){
      dispatch(logout())
      alert.success("Log Out Succesfully");
    }
    


  return <Fragment>
    <Backdrop open = {open} style = {{zIndex:"10"}}/>
    <SpeedDial
        ariaLabel='SpeedDial tooltip example'
        onClose={()=>Setopen(false)}
        onOpen = {()=>Setopen(true)}
        style = {{zIndex:"11"}}
        open = {open}
        direction = "down"
        className='SpeedDial'
        icon = {<img
        className='SpeedDialIcon'
        src ={user.avatar.url ? user.avatar.url : "/Profile.png"}
        alt = 'Profile'
        
        />
    }

   > 
   {options.map((item)=>(
    <SpeedDialAction icon = {item.icon} key ={item.name} tooltipTitle = {item.name} onClick = {item.func}


    tooltipOpen = {window.innerWidth <= 600 ? true : false}
    />
   ))}
   
   </SpeedDial>


  </Fragment>


    



  
  
}

export default UserOptions