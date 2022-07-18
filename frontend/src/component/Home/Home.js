import React, { Fragment,useEffect } from 'react'
import { CgMouse } from 'react-icons/cg';
import "./Home.css";
import ProductCard from'./ProductCard.js';
import MetaData from'../layout/MetaData';
import { Clear_Errors, getproduct } from '../../actions/productAction';
import {useSelector,useDispatch} from "react-redux";
import Loader from '../layout/loader/Loader';
import { useAlert } from 'react-alert';






const Home = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const{loading , error  , products} = useSelector(
        (state)=>state.products
    )
    useEffect(() => {
        if(error){
        alert.error(error);
        dispatch(Clear_Errors())
        }

        dispatch(getproduct())
    },[dispatch,error,alert]);
    

  return (
      <Fragment>
          {loading? <Loader/>: <Fragment>
      <MetaData title="ECOMMERCE"/>
        <div className="banner">
        <p>Welcome To The Store</p>
           <h1>Find Amazing Products Below</h1>
           <a href='#container'>
               <button>
                   Scroll<CgMouse/>

               </button>
           </a>
        </div>
        <h2 className = "homeheading">Featured Products</h2>

        <div className="container" id="container">
           {products && products.map(product=>(
               <ProductCard product = {product}/>

           ))}
        </div>
    </Fragment>
          }


          </Fragment>


  );
  
};

export default Home