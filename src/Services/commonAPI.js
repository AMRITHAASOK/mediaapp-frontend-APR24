//import axios
import axios from 'axios'

//API fetching configure => get , post, put ,delete 
export const commonAPI =async(httpMethod,url,reqBody)=>{
    //add video => method : post , url:localhost:3000/allVideos,data : caption,image,url
        let reqConfig = {
            method:httpMethod,
            url,
            data:reqBody
        }
return await axios(reqConfig).then((response)=>{
    return response
})
.catch((error)=>{
    return error
})

}