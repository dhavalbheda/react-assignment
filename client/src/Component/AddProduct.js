import React, { Fragment, useState } from 'react'
import '../App.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Alert from './Alert';
import { createProduct } from '../Redux/Product/ProductAction';

const AddProduct = () => {
    const { userAlert, user} = useSelector(state => state.User);
    const {productAlert} = useSelector(state => state.Products);

    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [artistName, setArtistName] = useState('');
    const [price, setPrice] = useState('');
    const [size, setSize] = useState('');
    const [productAdded, setProductAdded] = useState(false);
    const dispatch = useDispatch();

    if(productAdded)
        return <Redirect to="/"/>

    if (Object.keys(user).length !==0 && !user.is_admin) 
        return <Redirect to="/" />

    // On Submit Event
    const onsubmit = (event) => {
        let formData = new FormData();
        formData.append('product', event.target[5].files[0]);
        formData.append('name', productName);
        formData.append('description', description);
        formData.append('size', size);
        formData.append('artist', artistName);
        formData.append('price', price);
        event.preventDefault();
        dispatch(createProduct(formData));        
        setProductAdded(true);

    }


    return <Fragment>
        {userAlert && <Alert alert={userAlert}/>}
        {productAlert && <Alert alert={productAlert}/>}

        <div className="container w-md-50">
            {userAlert && <Alert alert={userAlert}/>}
            <div className="form-container">
                <h1 className="text-center pt-3 form-title">Add Product</h1>
                <form id="form" className="mx-4 px-4 py-3"  onSubmit={e=> onsubmit(e)}>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label>Product Name</label>
                            <input type="text" 
                                className="form-control"   
                                placeholder="Enter Product Name"
                                value={productName}
                                onChange={e => setProductName(e.target.value)} required/>
                        </div>
                        <div className="form-group col-md-6">
                            <label>Artist Name</label>
                            <input type="text" 
                                className="form-control"   
                                placeholder="Enter Artist Name"
                                value={artistName}
                                onChange={e => setArtistName(e.target.value)} required/>
                        </div>
                    </div>
                    <div className="form-group">
                            <label>Descrition</label>
                            <textarea
                                type="text" 
                                className="form-control"   
                                placeholder="Someting About Product"
                                value={description}
                                onChange={e => setDescription(e.target.value)} required/>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label>Price</label>
                            <input type="number" 
                                className="form-control"   
                                placeholder="In Doller$"
                                value={price}
                                onChange={e => setPrice(e.target.value)} required/>
                        </div>
                        <div className="form-group col-md-6">
                            <label>Size</label>
                            <input type="text" 
                                className="form-control" 
                                placeholder="height x width" 
                                autoComplete="false"
                                value={size}  
                                onChange={e => setSize(e.target.value)} required/>
                        </div>
                    </div>
                    <div className="form-group">
                            <label>Upload Image</label>
                            <input type="file" 
                                className="form-control" 
                                placeholder="height x width" 
                                autoComplete="false" required/>
                        </div>
                    <div className="form-row">
                        <div className="form-group col-md-6 text-center ">
                            <button type="submit" className="btn btn-block btn-primary ">Add Product</button>
                        </div>
                        <div className = "form-group col-md-6">
                            <Link to="/" className="btn btn-block btn-info ">Cancel</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </Fragment>

}

export default AddProduct