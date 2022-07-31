import { Types } from './Types'
import API from "../../util/api";

export const  getTransactions = (indexno,dispatch) => async () => {
    return new Promise(async (resolve, reject) => {
        await API.get('/payments/' + indexno)
            .then((res) => {
                dispatch({
                    type: Types.GET_TRANSACTIONS,
                    payload: res.data
                })
                resolve()
            }).catch((err) => {
                reject(err)
            })
    })
}


 
