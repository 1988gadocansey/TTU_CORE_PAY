import {Types} from '../actions/students/Types'
const initialState = {
    data: {},
}
export default function studentReducer(state = initialState, {type, payload}) {
    switch (type) {
        case Types.GET_STUDENT:
            return {...state, data: payload};
        default:
            return state
    }
}
