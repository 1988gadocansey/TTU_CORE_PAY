import {combineReducers} from "redux";
import transactionReducer from "./TransactionReducer";
import productReducer from "./ProductReducer";
import checkoutReducer from "./CheckoutReducer";
import userReducer from "./UserReducer";

const reducers = combineReducers({

    transactions: transactionReducer,
    products:productReducer,
    checkout:checkoutReducer,
    users: userReducer

    
})

export default reducers
