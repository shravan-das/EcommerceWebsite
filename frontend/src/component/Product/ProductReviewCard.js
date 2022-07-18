import { Rating } from '@material-ui/lab';
import React from 'react'
import Profile from "../../images/Profile.png"
const ProductReviewCard = ({review}) => {
    const options = {
       value: review.rating,
       size: "large",
       readOnly:true,
       precision:0.5,
      };
  return <div className='ProductReviewCard'>
        <img src= {Profile} alt="User" />
        <p>{review.name}</p>
        <Rating {...options}/>
        <span className='reviewCardComment'>{review.comment}</span>
    </div>
  
}

export default ProductReviewCard