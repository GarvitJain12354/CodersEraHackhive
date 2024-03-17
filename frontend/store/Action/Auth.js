import axios from "@/Axios/axios"
import { getSearchSuccess } from "../Reducer/AuthReducer";

export const getLocation = (info)=>async(dispatch)=>{
    try {
        const {data} = await axios.post("/user/get/getlocation",info);

    } catch (error) {
        
    }
}
export const uploadData = (info)=>async(dispatch)=>{
    try {
        const {data} = await axios.post("/user/upload/data",info);
    } catch (error) {
        
    }
}
export const searchDevice = (name)=>async(dispatch)=>{
    try {
        const {data} = await axios.get(`/user/device/${name}`)
        dispatch(getSearchSuccess(data));
    } catch (error) {
        
    }
}