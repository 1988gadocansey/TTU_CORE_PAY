import { Types } from './Types'
import API from "../../util/api";
export const checkOut = (values) => (dispatch) => {
    return new Promise(async (resolve, reject) => {
        await API.post('/payments/save', values).then((res) => {
            dispatch({
                type: Types.PROCESS_ITEMS,
                payload: res.data
            })
            resolve()
        }).catch((err) => {
            reject(err)
        })
    })
}
/*export const checkOut = (values,product,user) => (dispatch) => {
    return new Promise(async (resolve, reject) => {
        await API.post('/payments/save/'+user+'/'+product,values).then((res) => {
            dispatch({
                type: Types.PROCESS_ITEMS,
                payload: res.data
            })
            resolve()
        }).catch((err) => {
            reject(err)
        })
    })
}*/
export const clearPage = () =>{
    return{
        type: Types.CLEAR_PRODUCTS,
    }

}
