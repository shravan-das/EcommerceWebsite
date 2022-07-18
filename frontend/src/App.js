import './App.css';
import Header from "./component/layout/header/Header.js";
import {useEffect,useState} from 'react'
import Footer from "./component/layout/footer/Footer.js"
import { BrowserRouter as Router , Route , Switch} from "react-router-dom"
import webfont from "webfontloader"
import React from 'react';
import Home from "./component/Home/Home.js"
import About from "./component/layout/header/About.js";
import Contact from './component/layout/header/Contact.js';
// import Loader from './component/layout/loader/Loader';
import ProductDetails from './component/Product/ProductDetails.js';
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import LoginSignUp from './component/User/LoginSignUp';
import store from "./store"
import { loaduser } from './actions/userAction';
import { useSelector } from 'react-redux';
import Profile from './component/User/Profile.js'
import UserOptions from "./component/layout/header/UserOptions.js"
import ProtectedRoute from './component/Route/ProtectedRoute';
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from './component/User/UpdatePassword';
import ForgotPassword from './component/User/ForgotPassword';
import ResetPassword from './component/User/ResetPassword.js';
import Cart from "./component/Cart/Cart.js"
import ConfirmOrder from  "./component/Cart/ConfirmOrder.js"
 
import Shipping from "./component/Cart/Shipping.js"
import Payment from "./component/Cart/Payment.js"
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess.js"
import MyOrders from "./component/Order/MyOrders.js"
import OrderDetails from "./component/Order/OrderDetails.js";
import Dashboard from "./component/admin/Dashboard.js";
import ProductList from "./component/admin/ProductList.js"
import NewProduct from './component/admin/NewProduct';
import UpdateProduct from './component/admin/UpdateProduct.js'


function App() {




  const {isAuthenticated,user} = useSelector((state)=>state.user);
  const [stripeApiKey , setStripeApiKey] = useState("");

  async function getStripeApiKey(){
    const {data} = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey)


  }
  useEffect(()=>{
    webfont.load({
      google:{
        families:["Grape Nuts" , "Bree Serif","Pacifico","Permanent Marker","Indie Flower","Secular One","Cookie","Fredoka One", 'Shadows Into Light','Courgette',"cursive"]
      },
    });
    store.dispatch(loaduser());
    getStripeApiKey()
  
  },[]);
  return (
    <Router>
      <Header/>
      {isAuthenticated && <UserOptions user = {user}/>}
      <Route exact path = "/" component= {Home} />
      <Route exact path= '/about' component={About}/>
      <Route exact path = '/contactus' component={Contact}/>
      <Route exact path = "/product/:id" component= {ProductDetails} />
      <Route exact path = "/products" component = {Products}/>
      <Route exact path = "/Search" component = {Search}/>
      <Route path = "/products/:keyword" component= {Products} />

      <ProtectedRoute exact path= "/account" component = {Profile}/>
      <ProtectedRoute exact path= "/me/update" component = {UpdateProfile}/>
      <ProtectedRoute exact path= "/password/update" component = {UpdatePassword}/>
      <Route exact path= "/password/forgot" component = {ForgotPassword}/>
      <Route exact path = "/login" component = {LoginSignUp}/>
      <Route exact path="/password/reset/:token" component={ResetPassword} />
      <Route exact path = "/cart" component = {Cart}/>

      <ProtectedRoute exact path ="/shipping" component={Shipping}/>
      


     { stripeApiKey && ( <Elements stripe={ loadStripe(stripeApiKey)}>

<ProtectedRoute exact path = "/process/payment" component={Payment}/>
</Elements>
)}


<ProtectedRoute exact path ="/success" component={OrderSuccess}/>
<ProtectedRoute exact path ="/orders" component={MyOrders}/>



<Switch>
<ProtectedRoute exact path = "/order/confirm" component={ConfirmOrder}/>
<ProtectedRoute exact path = "/order/:id" component = {OrderDetails}/>


</Switch>


<ProtectedRoute isAdmin = {true}  exact path="/admin/dashboard" component={Dashboard}/>


<ProtectedRoute isAdmin = {true}  exact path="/admin/products" component={ProductList}/>
<ProtectedRoute isAdmin = {true}  exact path ="/admin/product" component = {NewProduct}/>
<ProtectedRoute
          exact
          path="/admin/product/:id"
          isAdmin={true}
          component={UpdateProduct}
        />
      

    
      <Footer/>
    </Router>
    
  );
}

export default App;
