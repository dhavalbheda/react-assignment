import React, { Fragment, useState } from 'react';
import {Link, Redirect} from 'react-router-dom';
import { loginUser } from '../Redux/User/UserAction';
import { useDispatch, useSelector } from 'react-redux';
import Alert from './Alert';


const SignIn = () => {
    const {isLogin, userAlert} = useSelector(state => state.User);
    const [email, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    if (isLogin) 
        return <Redirect to="/" />

    // On Submit
    const onsubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser({email, password}))
        
    }
    return <Fragment>
        <div className="container w-80">
            {userAlert && <Alert alert={userAlert}/>}
            <div className="form-container">
                <h1 className="text-center pt-3 form-title">Sign-In</h1>
                <form id="form" className="m-4 p-4" onSubmit={onsubmit}>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input type="email" 
                            className="form-control"   
                             placeholder="Enter Email Address"
                            value={email}
                            onChange={e => setUsername(e.target.value)}  required/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" 
                            className="form-control" 
                            placeholder="Enter Password" 
                            autoComplete="false"
                            value={password}  
                            onChange={e => setPassword(e.target.value)} required/>
                    </div>
                    <p className="text-center"><Link to="/signup" >Don't Have Account</Link></p>
                    <div className="col-md-12 text-center ">
                        <button type="submit" className="btn btn-block btn-primary">Sign-In</button>
                    </div>
                </form>
            </div>
        </div>
    </Fragment>
}
 
export default SignIn;