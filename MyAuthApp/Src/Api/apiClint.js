import axios from "axios" ;
//172.20.110.90
// 192.168.31.86
const BASE_URL = 'http://192.168.31.86:5000'  // Base URL

const apiClint=axios.create({
    baseURL: BASE_URL

})
export default apiClint;
