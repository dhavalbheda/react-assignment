import { combineReducers } from 'redux'

import UserReducer from './User/UserReducer'
import ProductReducer from './Product/ProductReducer'

const rootReducer = combineReducers({
    User: UserReducer,
    Products: ProductReducer
})

export default rootReducer