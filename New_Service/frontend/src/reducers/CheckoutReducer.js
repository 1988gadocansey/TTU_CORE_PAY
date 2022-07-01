import {Types} from '../actions/checkouts/Types'
const initialState = {
    data: {},
}
export default function checkoutReducer(state = initialState, {type, payload}) {
    switch (type) {
        case Types.GET_ITEMS:
            return {...state, data: payload};
        case Types.CLEAR_PRODUCTS:
            return {}
        default:
            return state
    }
}
