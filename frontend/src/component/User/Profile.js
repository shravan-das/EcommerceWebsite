import React from 'react'
import { Fragment,useEffect } from 'react'
import { useSelector } from 'react-redux'
import Loader from"../layout/loader/Loader.js"
import {Link} from "react-router-dom"
import MetaData from '../layout/MetaData'
import './Profile.css'

export const Profile = ({history}) => {


    const {user,isAuthenticated,loading} = useSelector((state)=>state.user);

    useEffect(() => {
        if (isAuthenticated === false) {
          history.push("/login");
        }
      }, [history, isAuthenticated]);
    
  return (
    <Fragment>
        {loading?(<Loader/>):(<Fragment>


<MetaData title={`${user.name}'s Profile`}/>


<div className="ProfileContainer">
<div>
      <h1>My Profile</h1>
      <img src={user.avatar.url} alt={user.name} />
      <Link to="/me/update">Edit Profile</Link>
    </div>
<div>

<div>
    
    <h4>FullName</h4>
    <p>{user.name}</p>

    </div>


    <div>
        <h4>Email</h4>
        <p>{user.email}</p>
    </div>
   <div>
    <h4>Joined On</h4>
    <p>{String(user.createdAt).substr(0, 10)}</p>
   </div>
  


  <div>
    <Link to = "/orders">My Orders</Link>
    <Link to = "/password/update">Change Password</Link>
  </div>


</div>

</div>




</Fragment>
)}
    </Fragment>
)
}


export default Profile
