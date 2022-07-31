import { Types } from './Types'
import API from "../../util/api";
export const  getProducts = (dispatch) => async () => {
    return new Promise(async (resolve, reject) => {
    await API.get('/products/index')
        .then((res) => {
            dispatch({
                type: Types.GET_PRODUCT,
                payload: res.data
            })

            resolve()
        }).catch((err) => {
            reject(err)
        })
    })
    

}

export const  getSingle = (id,dispatch) => async () => {
    return new Promise(async (resolve, reject) => {
        await API.get('/products/' + id)
            .then((res) => {
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



 
