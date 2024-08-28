import React, { useEffect, useState } from 'react'
import VideoCard from './VideoCard'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { getVideoAPI } from '../Services/AllAPIs';

function ViewVideo({addVideoResponse}) {

  const [allVideos,setAllVideos] = useState([]) 
  const [deleteVideoStatus,setDeleteVideoStatus] = useState("")

  const getVideos =async()=>{
   try{
    const response = await getVideoAPI()
    console.log(response.data);
    if(response.status>=200 && response.status<=300){
        setAllVideos(response.data)//to assign videos to the state
    }
    else{
      console.log(response.message);//error message
      
    }
   }
   catch(err){
    console.log(err);
    
   }
    
  }
  useEffect(()=>{
    getVideos()
  },[addVideoResponse,deleteVideoStatus])

  return (
    <div>
      <Row className='p-5'>
       {
        allVideos.length > 0 ?
        allVideos.map(item=>(
        <Col sm={4} className='mt-5'>
        <VideoCard  displayVideo={item}  setDeleteVideoStatus={setDeleteVideoStatus}/>
        </Col>    
        ))
        
        :
        <p className="text-danger fw-bolder">No Videos found...</p>
       }
      
      </Row>
    </div>
  )
}

export default ViewVideo