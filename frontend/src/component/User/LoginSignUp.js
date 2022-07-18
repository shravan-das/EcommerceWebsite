import React, { Fragment,useRef,useEffect } from 'react'
import "./LoginSignUp.css"
import Loader from "../layout/loader/Loader.js"
import {Link} from "react-router-dom";
import { useState } from 'react';
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import {useDispatch , useSelector } from "react-redux"
import {Clear_Errors,login,register} from "../../actions/userAction";
import {useAlert} from "react-alert"





const LoginSignUp = ({history , location}) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const {error,loading,isAuthenticated} = useSelector((state)=> state.user)
    const logintab = useRef(null)
    const registerTab = useRef(null);
    const switcherTab = useRef(null);

    const [loginEmail , setLoginEmail] = useState("");
    const [loginPassword , setLoginPassword] = useState("");

    const[user,setUser] = useState({
        name: "",
        email: "",
        password:"",
    });

    const {name,email,password} = user;
    const [avatar , setAvatar] = useState("");
    const [avatarPreview , setAvatarPreview] = useState("/Profile.png");
    
    
    const loginSubmit = (e)=>{
    e.preventDefault();
    dispatch(login(loginEmail , loginPassword));
  }
  const registerSubmit = (e)=>{
    e.preventDefault();
    const myform = new FormData();
    myform.set("name",name)
    myform.set("email",email)
    myform.set("password" , password)
    myform.set("avatar" , avatar)
    dispatch(register(myform));
  };

  const registerDataChange = (e)=>{

    if(e.target.name === "avatar"){
        const reader = new FileReader();
        reader.onload = ()=>{
            if(reader.readyState === 2){
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        }
        reader.readAsDataURL(e.target.files[0]);

    }
    else{
        setUser({...user , [e.target.name]: e.target.value});
    }

  }

  const redirect =  location.search ? location.search.split("=")[1] : "/account";

   useEffect(() => {


    if(error){
        alert.error(error);
        dispatch(Clear_Errors());

    }
    if(isAuthenticated){
        history.push(redirect);
    }
     
   
     
   }, [dispatch,error,alert,history,isAuthenticated , redirect])
   

    const switchTabs = (e,tab)=>{
        if(tab === 'login'){
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");
            registerTab.current.classList.remove("shiftToNeutralForm");
            logintab.current.classList.remove("shiftToLeft");
        }

        if(tab === 'register'){
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");
            registerTab.current.classList.add("shiftToNeutralForm");
            logintab.current.classList.add("shiftToLeft");

        }


    }
  return (
    <Fragment>
        {loading?<Loader/>:<Fragment>
        <div className="loginsignupcontainer">
            <div className="loginsignupbox">
                <div>
                <div className='loginsignuptoggle'>
                    <p onClick={(e)=>switchTabs(e,"login")}>Login</p>
                    <p onClick={(e)=>switchTabs(e,"register")}>Register</p>
                </div>
                <button ref= {switcherTab}></button>

                </div>
                <form className='loginForm' ref = {logintab} onSubmit = {loginSubmit}>
                    <div className="loginemail">
                        <MailOutlineIcon/>
                        <input type="email" 
                        placeholder='Email'
                        required
                        value={loginEmail}
                        onChange={(e)=>setLoginEmail(e.target.value)}
                        />
                    </div>
                    <div className="loginpassword">
                        <LockOpenIcon/>
                        <input type ='password'
                        placeholder='password'
                        required
                        value = {loginPassword}
                        onChange={(e)=>setLoginPassword(e.target.value)}

                        />
                    </div>
                    <Link to  = "/password/forgot">Forget Password ?</Link>
                    <input type="submit" value= 'Login' className ='loginBtn' />

                </form>
                <form 
                className='signUpForm'
                ref= {registerTab}
                encType='multipart/form-data'
                onSubmit={registerSubmit}
                >
                    <div className="signupname">
                        <FaceIcon/>
                        <input type="text" 
                        placeholder='Name'
                        required
                        name = "name"
                        value = {name}
                        onChange={registerDataChange}
                        />



                    </div>
                    <div className="signUpEmail">
                        <MailOutlineIcon/>
                        <input type="email" 
                        placeholder='Email'
                        required
                        name = "email"
                        value = {email}
                        onChange={registerDataChange}
                        />

                    </div>
                    <div className="signuppassword">
                        <LockOpenIcon/>
                        <input type ='password'
                        placeholder='Password'
                        required
                        name = "password"
                        value = {password}
                        onChange={registerDataChange}

                        />

                    </div>
                    <div id="registerimage">
                        <img src = {avatarPreview} alt = 'avatarPreview'/>
                        <input 
                        type="file"
                        name = "avatar"
                        accept = "image/*"
                        onChange={registerDataChange}
                         />
                    </div>
                    <input type="submit" value= 'Register' className ='signUpBtn'
                    />

                </form>
            </div>
        </div>
    </Fragment>}
    </Fragment>
  )
}

export default LoginSignUp