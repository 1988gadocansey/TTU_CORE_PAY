import { Types } from './Types'
import API from "../../util/api";
export const  getUser= (dispatch) => async () => {
    await API.get('/user/me')
        .then((res) => {
            dispatch({
                type: Types.GET_USER,
                payload: res.data
            })

        }).catch((err) => {
            console.log("error",err)
        })
    

}


 
