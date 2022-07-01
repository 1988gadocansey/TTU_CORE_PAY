import { Types } from './Types'
import API from "../../util/api";
export const  getProducts = (dispatch) => async () => {
    await API.get('/products/index')
        .then((res) => {
            dispatch({
                type: Types.GET_PRODUCT,
                payload: res.data
            })

        }).catch((err) => {
            console.log("error",err)
        })
    

}

export const  getSingle = (id,dispatch) => async () => {
    console.log("data is " + id)
    await API.get('/products/'+id)
        .then((res) => {
            dispatch({
                type: Types.GET_SINGLE_PRODUCT,
                payload: res.data
            })

        }).catch((err) => {
            console.log("error",err)
        })


}

export const getSingleProduct = (id) => (dispatch) => {
    return new Promise((resolve, reject) => {
        console.log("product id is "+id)
        API.get(`/products/${id}`).then((res) => {
            dispatch({
                type: Types.GET_SINGLE_PRODUCT,
                payload: res.data
            })
            resolve()
        }).catch((err) => {
            reject(err)
        })
    })
}


 
