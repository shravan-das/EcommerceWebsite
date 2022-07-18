import React from 'react'
import { Link } from "react-router-dom"
import ReactStars from 'react-rating-stars-component'


const ProductCard = ({ product }) => {
    const options = {
        edit : false,
        color: "grey",
        activeColor : "yellow",
        value : product.ratings,
        isHalf:true,
        size: window.innerWidth < 600 ? 15:17,
    };
  return (
      <Link className = "productCard" to = {`/product/${product._id}`}>
          <img src={product.images[0].url}/>
          <p>{product.name}</p>
          <div>
              <ReactStars {...options}/><span> ({product.NumReviews})</span>
          </div>
          <span>{`₹${product.price}`}</span>

      </Link>
   
  )
}

export default ProductCard