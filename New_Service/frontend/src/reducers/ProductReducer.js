import {Types} from '../actions/products/Types'
const initialState = {
    data: {},
    records:{}
}
export default function productReducer(state = initialState, {type, payload}) {
    switch (type) {
        case Types.GET_PRODUCT:
            return {...state, data: payload};

        case Types.GET_SINGLE_PRODUCT:
            return {...state, records: payload};

        default:
            return state
    }
}
