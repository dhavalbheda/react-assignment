import React, { Fragment, useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import ReactStars from 'react-stars'
import { useDispatch, useSelector } from 'react-redux';
import { editRating } from '../Redux/Product/ProductAction';
import Alert from './Alert';
import { BASE_URL } from '../Redux/User/UserAction';


const Product = () => {
    const {product, productAlert} = useSelector(state => state.Products);
    const {userAlert} = useSelector(state => state.User);

    const [star, setStar] = useState(0);
    const dispatch = useDispatch();
    const {name, description, image, size, artist, price, uuid, rating} = product;
    
    // Fist time get start from database
    useEffect(() => {
        setStar(getStar());
    }, [])

    // Saving the response of star rate
    const editRate = (rate, uuid) => {
        dispatch(editRating(rate, uuid));
    }

    // onchange on Star
    const ratingChanged = (rate) => {
        editRate(rate, uuid);
        setStar(rate);

    }    

    // Count Star
    const getStar = () => {
        let rate;
        if(rating.length > 0) {
            rate =  rating[0].rate;
        } else {
            rate = 0; 
        }
        return rate;
    }

    
    return <Fragment>
        <div className="product-container mx-2 mx-md-auto">
            {userAlert && <Alert alert={userAlert}/>}
            {productAlert && <Alert alert={productAlert}/>}
            
            <div className="row">
                <div className="col-12 col-md-6 mb-4 mb-lg-0 mt-2">
                    <div className="card rounded shadow-sm border-0">
                        <div className="card-body p-4">
                            <img src={`${BASE_URL}/product/getImage/${image}`} alt="" className="img-fluid mx-auto mb-3"/>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-5 mt-md-5 ml-5 ml-md-3">
                    <div>
                        <h5 className="text-truncate text-dark"> {name}</h5>
                        <p className="small text-muted font-italic">Detail: {description}</p>
                        <p className="small text-muted font-italic">Artist: {artist}</p>
                        <p className="small text-muted font-italic">Size: {size}</p>
                        <p className="small text-muted font-italic">Price: {price}$</p>
                        <ul className="list-inline extra-large">
                            <ReactStars
                                count={5}
                                onChange={ratingChanged}
                                value={star}
                                size={50}
                                color2={'#ffd700'} />
                        </ul>
                    </div>
                    <Link to="/" className="btn btn-primary p-2 mb-5">Go Back</Link>
                </div>
            </div>
        </div>
    </Fragment>

}

export default Product;