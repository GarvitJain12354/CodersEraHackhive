import axios from "axios";

const instace = new axios.create({
    baseURL:"http://localhost:5001/api/v1/",
    withCredentials:true
})
export default instace;