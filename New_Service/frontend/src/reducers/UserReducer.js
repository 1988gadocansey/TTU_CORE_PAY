import {Types} from '../actions/users/Types'
const initialState = {
    data: {},
}
export default function userReducer(state = initialState, {type, payload}) {
    switch (type) {
        case Types.GET_USER:
            return {...state, data: payload};

        default:
            return state
    }
}
