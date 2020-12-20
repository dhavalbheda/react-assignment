import Axios from 'axios'

import  { PRODUCT_FETCH_REQUEST, PRODUCT_FETCH_ERROR, PRODUCT_FETCH_SUCCESS, PRODUCT_DISPLAY, PRODUCT_LOG_OUT, SET_PRODUCT_ALERT, REMOVE_PRODUCT_ALERT, PRODUCT_ALL_DELETE_SUCCESS } from './ActionType'

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
        type: PRODUCT_FETCH_REQUEST,
        payload: null
    }
}

export const fetchSuccess = (data = null) => {
    return {
        type: PRODUCT_FETCH_SUCCESS,
        payload: data
    }
}

export const fetchError = (error = null ) => {
    return {
        type: PRODUCT_FETCH_ERROR,
        payload: error
    }
}

export const logout = (error = null) => {
    return {
        type: PRODUCT_LOG_OUT,
        payload: null
    }
}

export const setAlert = (data = null) => {
    return {
        type: SET_PRODUCT_ALERT,
        payload: data
    }
}

export const displayProduct = (data=null) => {
    return {
        type: PRODUCT_DISPLAY,
        payload: data
    }
}

export const removeAlert = (data = null) => {
    return {
        type: REMOVE_PRODUCT_ALERT,
        payload: data
    }
}

export const deleteAllSuccess = (data = null) => {
    return {
        type: PRODUCT_ALL_DELETE_SUCCESS,
        payload: data
    }
}


//=========================> All The Action

// Fetching the all the Products
export const fetchProducts = () => {
    return dispatch => {
        dispatch(fetchRequest());
        Axios.get(`${BASE_URL}/product/`)
        .then(res =>  {
            const data = res.data
            dispatch(fetchSuccess(data.products))
        })
        .catch(error => {
            const msg = error.response.data.errors[0].msg
            dispatch(fetchError())
            dispatch(setAlert({type:'danger', message: msg}))
            setTimeout(() => dispatch(removeAlert()), 3000);
        })
    }
}

// Creating A New Products
export const createProduct = (formData) => {
    return dispatch => {
        dispatch(fetchRequest())
        Axios.post(`${BASE_URL}/product`, formData, config())
        .then(res =>  {
               const data = res.data;
               if(data.success) {
                dispatch(setAlert({type:'success', message: "Product Added Successfully."}))
                setTimeout(() => dispatch(removeAlert()), 3000);
               }
               dispatch(fetchProducts())
        })
        .catch(error => {
            const msg = error.response.data.errors[0].msg
            dispatch(fetchError())
            dispatch(setAlert({type:'danger', message: msg}))
            setTimeout(() => dispatch(removeAlert()), 3000);
        })
    }
}

// Saving Response on rating
export const editRating = (rating, uuid) => {
    return dispatch => {
        dispatch(fetchRequest())
        Axios.put(`${BASE_URL}/product/rating/${uuid}`, {rating}, config())
        .then(res =>  {
           if(res.status === 200) {
                dispatch(fetchProducts());
                dispatch(setAlert({type:'success', message: "Response Successfully Saved"}));
                setTimeout(() => dispatch(removeAlert()), 3000);  
           }
        })
        .catch(error => {
            const msg = error.response.data.errors[0].msg;
            dispatch(fetchError());
            dispatch(setAlert({type:'danger', message: msg}));
            setTimeout(() => dispatch(removeAlert()), 3000);
        })
    }
}

// Log out from app
export const logoutProduct = () => {
    return dispatch => {
        dispatch(logout())
        localStorage.removeItem('userToken');
    }
}

export const setProduct = (data) => {
    return dispatch => {
        dispatch(displayProduct(data))
    }
}