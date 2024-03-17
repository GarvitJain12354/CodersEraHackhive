import axios from "@/Axios/axios"

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