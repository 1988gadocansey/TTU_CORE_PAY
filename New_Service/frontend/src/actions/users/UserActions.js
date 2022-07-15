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

 
