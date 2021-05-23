import React from 'react';
import { Link, useParams } from "react-router-dom";

const ProductDetails =()=>{
    const {productName} =useParams();
return (
    <div className="container">
        <div>
            <Link className="backlink" to={{
                    pathname: `/`,
                
                }}>&lt; Go Back</Link>
        </div>
        <div>
        <h3>{productName}</h3>
        </div>
    </div>
)
}
export default ProductDetails;