import React, { Fragment ,useEffect,useState} from 'react'
import './Products.css'
import { useSelector,useDispatch } from 'react-redux';
import { Clear_Errors, getproduct } from '../../actions/productAction';
import Loader from '../layout/loader/Loader';
import ProductCard from '../Home/ProductCard';
import Pagination from 'react-js-pagination'
import Slider from "@material-ui/core/Slider";
import {useAlert} from 'react-alert'
import Typography from "@material-ui/core/Typography";
import MetaData from '../layout/MetaData';

const categories = [

  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Watches",
  "Camera",
  "SmartPhones",
]

const Products = ({match}) => {
  const dispatch = useDispatch();
  const alert = useAlert()
  const [currentPage, setcurrentPage] = useState(1);
  const [price, setPrice] = useState([0,25000]);
  const [category , setCategory] = useState("");
  const [ratings,setratings] = useState(0);
  const {products,loading,error,productsCount,resultperpage,filtererdProductsCount} = useSelector(
    (state)=>state.products
  );
  let count = filtererdProductsCount;

  const keyword = match.params.keyword;

  const setCurrentPageNo = (e)=>{
    setcurrentPage(e);
  }
  const priceHandler = (event,newprice)=>{
    setPrice(newprice);

  }
  

  useEffect(() => {
    if(error){
      alert.error(error);
      dispatch(Clear_Errors());
    }
    dispatch(getproduct(keyword,currentPage,price,category,ratings));
  
  }, [dispatch,keyword,currentPage,price,category,ratings,alert,error]);


 
  
  
  return (
  <Fragment>
    {loading ? (<Loader/>) :( 
    
    <Fragment> 
      <MetaData title = "PRODUCTS --ECOMMERCE"
      
      />
      
      <h2 className="ProductHeading">Products</h2>
      <div className="products">
      {products && products.map((product)=>(
        <ProductCard key = {product._id} product = {product}/>
      ))}
     </div>

     <div className="filterbox">
       <Typography>Price</Typography>
       <Slider
         value = {price}
         onChange = {priceHandler}
         valueLabelDisplay = "auto"
         aria-labelledby='range-slider'
         min = {0}
         max = {25000}

       />
       <Typography>Category</Typography>
       <ul className="categorybox">
        {categories.map((category)=>(
          <li className='category-link' 
          key={category} 
          onClick = {() =>setCategory(category)}
          >
            {category}

          </li>
        ))}
       </ul>
       <fieldset>
        <Typography component= 'legend'>Ratings Above</Typography>
        <Slider
        value = {ratings}
        onChange = {(e,newrating)=>{
          setratings(newrating)
        }}
        aria-labelledby = 'continuous-slider'
        valueLabelDisplay ="auto"
        min = {0}
        max = {5}
        />
       </fieldset>

     </div>

     
       {resultperpage < count && (
        <div className="paginationBox">
       <Pagination
       activePage={currentPage}
       itemsCountPerPage = {resultperpage}
       totalItemsCount = {productsCount}
       onChange = {setCurrentPageNo}
       nextPageText = "Next"
       prevPageText= " Prev"
       firstPageText = "1st"
       lastPageText= "last"
       itemClass='page-item'
       linkClass='page-link'
       activeClass='pageItemActive'
       activeLinkClass='pagelinkactive'
      />
     </div>
       )}
   
   </Fragment>
    )}
  </Fragment>
  )
  
  
};

export default Products