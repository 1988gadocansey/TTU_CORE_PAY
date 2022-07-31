import { Types } from './Types'
import API from "../../util/api";
export const  getStudent = (email,dispatch) => async () => {
    return new Promise(async (resolve, reject) => {
    await API.get('/student/getStudentData/'+email)
        .then((res) => {
            dispatch({
                type: Types.GET_STUDENT,
                payload: res.data
            })
            resolve()
        }).catch((err) => {
            reject(err)
        })
    })

}
export const fetchStudent = (email,dispatch) => () => {
    return new Promise((resolve, reject) => {
        API.get('/student/getStudentData/'+email).then((res) => {
            dispatch({
                type: Types.GET_STUDENT,
                payload: res.data
            })
            resolve()
        }).catch((err) => {
            console.log(err.toString())
            reject(err)
        })
    })
}
export const getStudentData = (email,dispatch) => {
    API.get('/student/getStudentData/'+email)
        .then(res => {
            dispatch({type:Types.GET_STUDENT, payload: res.data})
        }).catch(err => console.error("Error: ", err));
}
