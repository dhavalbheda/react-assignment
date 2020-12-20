import  { PRODUCT_FETCH_REQUEST, PRODUCT_FETCH_ERROR, PRODUCT_FETCH_SUCCESS, PRODUCT_LOG_OUT, PRODUCT_DISPLAY, SET_PRODUCT_ALERT, REMOVE_PRODUCT_ALERT, PRODUCT_ALL_DELETE_SUCCESS } from './ActionType'

const initialState = {
    productList: [],
    product:{},
    productAlert: null,
    loadding: false
}

const ProductReducer = (state = initialState, action) => {
    const {type, payload} = action
    switch(type) {
        case PRODUCT_FETCH_REQUEST:
            return {
                ...state,
                loadding: true,
            }
        case PRODUCT_FETCH_SUCCESS:
            return {
                ...state,
                productList: payload,
                loadding: false,
            }
        case PRODUCT_FETCH_ERROR:
            return {
                ...state,
                productList: [],
                loadding: false,
            }
        case PRODUCT_LOG_OUT:
            return {
                ...initialState
            }
        case PRODUCT_DISPLAY: {
            return {
                ...state,
                product: payload
            }
        }
        case SET_PRODUCT_ALERT:
            return {
                ...state,
                productAlert: payload
            }
        case REMOVE_PRODUCT_ALERT:
            return {
                ...state,
                productAlert: null
            }
        case PRODUCT_ALL_DELETE_SUCCESS:
            return initialState
        default: 
            return state
    }
} 

export default ProductReducer;
