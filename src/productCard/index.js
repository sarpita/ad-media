import React from 'react';
import './productCard.css';
import { Link } from 'react-router-dom';
// import { Range } from 'react-range';

const ProductCard = ({ product }) => {
    const { title, availability, image_link, brand, color, price, sale_price } = product;
    return (
        <div className="productCard">
            <img width="100%" height="auto" src={`${image_link}`} alt="title" />
            <h2 className="product-title">
                <Link to={{
                    pathname: `/${title}`,
                    state: { product }
                }}> {title}
                </Link>
            </h2>
            {color && <p>{color}</p>}
            {availability && <p style={{ margin: '0', color: 'green' }}>{availability}</p>}
            <p style={{ fontWeight: '700', margin: '0' }}>{brand}</p>
            <p style={{ fontWeight: '700', margin: '0' }}>{sale_price ? <span>₹{sale_price}
            <span style={{ textDecoration: 'line-through', color: '#717070', fontWeight: '400',paddingLeft:'1em' }}>₹{price}</span>
            <span style={{paddingLeft:'0.5em',color:'green',fontSize:'0.8em'}}> {((1- sale_price/price)*100).toFixed(2)}% Off</span>
            </span> : <span>₹{price}</span>}</p>
        </div>
    )
}
export default ProductCard;