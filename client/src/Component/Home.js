import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactStars from 'react-stars'
import { Link, Redirect } from 'react-router-dom'
import { editRating, fetchProducts, logoutProduct, setProduct } from '../Redux/Product/ProductAction'
import { BASE_URL, logoutUser } from '../Redux/User/UserAction'
import Alert from './Alert'

const Home = () => {
    const {user, userAlert} = useSelector(state => state.User);
    const {productAlert, productList} = useSelector(state => state.Products);
    const dispatch = useDispatch();

    // Getting All Products in Redux Store
    useEffect(() => {
      dispatch(fetchProducts())
    }, [dispatch])

    // logout Click
    const logout = () => {
        dispatch(logoutUser(user.firstName))
        dispatch(logoutProduct())
      }
    
    return <Fragment>
       <div className="container">
        {userAlert && <Alert alert={userAlert}/>}
        {productAlert && <Alert alert={productAlert}/>}
      
        <div className="row justify-content-end m-5">
            {user.is_admin && <Link to="/addproduct" className = "h3 custom-icon"><i className = " fas fa-plus"></i></Link> }
            <Link to="/profile" className = "h3 custom-icon ml-4"><i className = " fas fa-user-alt"></i></Link>
            <p className = "h3 custom-icon ml-4" onClick={logout}><i className = "fas fa-sign-out-alt"></i></p>
        </div>

        <div id="form-container">
          <div id="form-wrapper">
            <form id="form">
              <div className="row">  
                {productList.map((item,index) => <Product key={index}
                                                        temp={item.rating}
                                                        rating={item.rating.filter(item => item.client === user._id)}
                                                        product={item}
                                                        />)}      
              </div>
            </form>
          </div>
      </div> 
      </div> 

    </Fragment>
}

const Product = ({product, rating}) => {
    const dispatch = useDispatch();

    const {name, image, size, artist, price, uuid} = product;
    const [isClick, setClick] = useState(false);
    const [star, setStar] = useState(0);

    // Fist time get start from database
    useEffect(() => {
      setStar(getStar());
    }, [])

    // set current item on redux store
    const onclick = (item) =>  {
        dispatch(setProduct(product));
        setClick(true)
    }

    // Saving the response of star rate
    const editRate = (rate) => {
      dispatch(editRating(rate, uuid));
    }

    // onchange on Star
    const ratingChanged = (rate) => {
        editRate(rate);
        setStar(rate)
    }

    // Count Star
    const getStar = () => {
      if(rating.length > 0) {
          return rating[0].rate;
      } else {
          return 0; 
      }
    }

    return <Fragment>
        {isClick && <Redirect to="/product" />}
        <div className="col-lg-3 col-md-6 mb-4 mb-lg-0 mt-2">
            <div className="card rounded shadow-sm border-0">
                <div className="card-body p-4">
                    <img src={`${BASE_URL}/product/getImage/${image}`} alt="" className="img-fluid d-block mx-auto mb-3" onClick={() => onclick(product) }/>
                    <h5 className="text-truncate text-dark"> {name}</h5>
                    <p className="small text-muted font-italic">Artist: {artist}</p>
                    <p className="small text-muted font-italic">Size: {size}</p>
                    <p className="small text-muted font-italic">Price: {price}$</p>
                    <ul className="list-inline extra-large">
                        <ReactStars
                                count={5}
                                onChange={ratingChanged}
                                value={star}
                                size={40}
                                color2={'#ffd700'} />
                    </ul>
                </div>
            </div>
        </div>
    </Fragment>

}

export default Home;
