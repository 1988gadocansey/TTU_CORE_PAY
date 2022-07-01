import { Types } from './Types'
import API from "../../util/api";
export const  getCheckout = (dispatch) => async () => {
    await API.get('/checkout')
        .then((res) => {
            dispatch({
                type: Types.GET_ITEMS,
                payload: res.data
            })

        }).catch((err) => {
            console.log("error",err)
        })


}

export const clearPage = () =>{
    return{
        type: Types.CLEAR_PRODUCTS,
    }

}
