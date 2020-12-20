import Axios from 'axios'
import  { USER_FETCH_REQUEST, USER_FETCH_ERROR, USER_FETCH_SUCCESS, USER_LOG_OUT, USER_UPDATE_SUCCESS, SET_ALERT, REMOVE_ALERT } from './ActionType'

export const BASE_URL = "https://dhaval-assignment.herokuapp.com";

// Axios Header
const  config = () =>  {
    return { 
        headers: {
             Authorization: localStorage.getItem('userToken')
        } 
    }
  }

// =====================> All The Action Types 
export const fetchRequest = () => {
    return {
        type: USER_FETCH_REQUEST,
        payload: null
    }
}

export const fetchSuccess = (data) => {
    return {
        type: USER_FETCH_SUCCESS,
        payload: data
    }
}

export const fetchError = (error) => {
    return {
        type: USER_FETCH_ERROR,
        payload: error
    }
}

export const updateSuccess = (data) => {
    return {
        type: USER_UPDATE_SUCCESS,
        payload: data
    }
}

export const setAlert = (data) => {
    return {
        type: SET_ALERT,
        payload: data
    }
}

export const removeAlert = (data) => {
    return {
        type: REMOVE_ALERT,
        payload: data
    }
}

export const logout = () => {
    return {
        type: USER_LOG_OUT,
        payload: null
    }
}


//=========================> All The Actions

// Register User
export const signUpUser = (user, confirmPassword) => {
    return dispatch => {
        if(user.password !== confirmPassword) {
            dispatch(setAlert({type:'danger', message: "Password and Confirm Password does not match"}))
            setTimeout(() => dispatch(removeAlert()), 3000);
        } else {
            dispatch(fetchRequest())
            Axios.post(`${BASE_URL}/user/signup`, {...user})
            .then(res =>  {
                const data = res.data
                dispatch(fetchSuccess(data));
                localStorage.setItem('userToken', data.token);
                dispatch(setAlert({type:'success', message: `Welcome ${data.user.firstName}!  Thank You For The Registration :)`}));
                setTimeout(() => dispatch(removeAlert()), 3000);
            })
            .catch(error => {
                const msg = error.response.data.errors[0].msg;
                dispatch(fetchError())
                dispatch(setAlert({type:'danger', message: msg}))
                setTimeout(() => dispatch(removeAlert()), 3000);
            })
        }
    }
}

// Login User
export const loginUser = (user) => {
    return dispatch => {
        dispatch(fetchRequest());
        Axios.post(`${BASE_URL}/user/signin`, {...user})
        .then(res =>  {
            const data = res.data;
            dispatch(fetchSuccess(data.user));
            
            localStorage.setItem('userToken', data.token);
            dispatch(setAlert({type:'success', message: `Welcome ${data.user.firstName}!  We Are Happy To See You Again :)`}))
            setTimeout(() => dispatch(removeAlert()), 3000);
        })
        .catch(error => {
            const msg = error.response.data.errors[0].msg
            dispatch(fetchError())
            dispatch(setAlert({type:'danger', message: msg}))
            setTimeout(() => dispatch(removeAlert()), 3000);
        })
    }
}

// Get User Details Via userToken
export const getUserDetail = () => {
    return dispatch => {
        dispatch(fetchRequest())
        Axios.get(`${BASE_URL}/user/profile`, config())
        .then(res =>  {
            const data = res.data
            dispatch(fetchSuccess(data.user))
        })
        .catch(error => {
            const msg =  error.response.data.errors[0].msg;
            dispatch(fetchError())
            dispatch(setAlert({type:'danger', message: msg}))
            setTimeout(() => dispatch(removeAlert()), 3000);
        })
    }
}

// Profile Update
export const updateUser = (user, confirmPassword, changePassword) => {
    return dispatch => {

        if((user.password !== confirmPassword) || (changePassword  && (user.password === ""))) {
            dispatch(setAlert({type:'danger', message: "Password and Confirm Password does not match"}))
            setTimeout(() => dispatch(removeAlert()), 3000);
        } else {
            Axios.put(`${BASE_URL}/user/profile`, user, config())
            .then(res =>  {
                const data = res.data
                dispatch(updateSuccess(data.user))
                dispatch(setAlert({type:'success', message: 'Profile Updated Successfully'}))
                setTimeout(() => dispatch(removeAlert()), 3000);
            })
            .catch(error => {
                const msg = error.response.data.errors[0].msg;
                dispatch(setAlert({type:'danger', message: msg}))
                setTimeout(() => dispatch(removeAlert()), 3000);
            })
        }
    }
}

// Logout from App
export const logoutUser = (name) => {
    return dispatch => {
        Axios.put(`${BASE_URL}/user/logout`, null, config())
        .then(res =>  {
            localStorage.removeItem('userToken');
            dispatch(logout())
            dispatch(setAlert({type:'primary', message: `By ${name}!  See You Again :)`}))
            setTimeout(() => dispatch(removeAlert()), 3000);
        })
        .catch(error => {
            dispatch(fetchError())
        })
        
    }
}

