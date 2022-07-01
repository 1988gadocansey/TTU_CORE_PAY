import {Types} from '../actions/transactions/Types'
const initialState = {
    data: {},
}
export default function transactionReducer(state = initialState, {type, payload}) {
    switch (type) {
        case Types.GET_TRANSACTIONS:
            return {...state, data: payload};

        default:
            return state
    }
}
