import { Types } from './Types'
import API from "../../util/api";
export const  getCheckout = (dispatch) => async () => {
    return new Promise(async (resolve, reject) => {
    await API.get('/checkout')
        .then((res) => {
            dispatch({
                type: Types.GET_ITEMS,
                payload: res.data
            })

            resolve()
        }).catch((err) => {
            reject(err)
        })
    })

}

export const clearPage = () =>{
    return{
        type: Types.CLEAR_PRODUCTS,
    }

}
