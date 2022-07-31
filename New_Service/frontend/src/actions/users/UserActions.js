import { Types } from './Types'
import API from "../../util/api";
export const  getUser= (dispatch) => async () => {
    return new Promise(async (resolve, reject) => {
    await API.get('/user/me')
        .then((res) => {
            dispatch({
                type: Types.GET_USER,
                payload: res.data
            })

            resolve()
        }).catch((err) => {
            reject(err)
        })
    })

}

export const fetchUser = (dispatch) => () => {
    return new Promise((resolve, reject) => {
        API.get('/user/me').then((res) => {
            dispatch({
                type: Types.GET_USER,
                payload: res.data
            })
            resolve()
        }).catch((err) => {
            console.log(err.toString())
            reject(err)
        })
    })
}
