import { Types } from './Types'
import API from "../../util/api";
export const  getProgrammes = (dispatch) => async () => {
    await API.get('/transactions')
        .then((res) => {
            dispatch({
                type: Types.GET_TRANSACTIONS,
                payload: res.data
            })

        }).catch((err) => {
            console.log("error",err)
        })
    

}


 
