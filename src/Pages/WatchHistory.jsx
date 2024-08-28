import React, { useEffect, useState } from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { Link } from 'react-router-dom'
import { deleteHistoryAPI, getHistoryAPI } from '../Services/AllAPIs'


function WatchHistory() {

  const [history,setHistory] = useState([])
  const [deleteStatus,setDeleteStatus]=useState("")
  const getWatchHistory =async() => {
      const response = await getHistoryAPI()
      console.log(response.data);
      setHistory(response.data)
  }

  const handleDelete = async(id)=>{
      const response = await deleteHistoryAPI(id)
      console.log(response);
      setDeleteStatus(response)
  }


  useEffect(()=>{
    getWatchHistory()
  },[deleteStatus])



  return (
    <div>
      <Row >
        <Col className='mt-5'>
        <h3>Watch History</h3>
        </Col>
        <Col className='me-3'>
        <Link to={'/'}>
        <h5 style={{float:'right'}}>Back to Home <i class="fa-solid fa-backward fs-3"></i></h5> 
        </Link>
        </Col>
      </Row>

      <Row className='p-5'>
      <table className='border border-white'>
      <thead>
        <tr className='border border-white'>
          <th className='border border-white'>SLno</th>
          <th className='border border-white'>Caption</th>
          <th className='border border-white'>URL</th>
          <th className='border border-white'>Timestamp</th>
          <th className='border border-white'>Action</th>
        </tr>
      </thead>
      <tbody>
       {
        history?  history.map((item,index)=>(
          <tr className='border border-white'>
          <td className='border border-white text-center'>{index+1}</td>
          <td className='border border-white text-center'>{item.caption}</td>
          <td className='border border-white '><a href={item.embedLink}>{item.embedLink}</a></td>
          <td className='border border-white text-center'>{item.timestamp}</td>
          <td className='border border-white text-center'>
            <i onClick={()=>handleDelete(item.id)} className='btn btn-danger  fa-solid fa-trash text-white m-3' ></i>
          </td>
        </tr>
        ))

      : <p className='text-danger fw-bolder'>No data found</p>
       }
 
      </tbody>
    </table>
      </Row>
    </div>
  )
}

export default WatchHistory