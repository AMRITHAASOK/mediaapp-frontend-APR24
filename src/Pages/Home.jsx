import React, { useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AddVideo from '../Components/AddVideo';
import { Link } from 'react-router-dom';
import { GrHistory } from "react-icons/gr";
import AddCategory from '../Components/AddCategory';
import ViewVideo from '../Components/ViewVideo';

function Home() {

    const [addVideoResponse,setAddVideoResponse] =useState([])

  return (
    <div>
        <Row className='d-flex justify-content-between'>
          <Col className='d-flex p-5 m-5'>
          <h3>Upload New Video</h3>
     <AddVideo setAddVideoResponse={setAddVideoResponse}/>
          </Col>
          <Col className='p-5 m-5'>
              <Link to={'/watch-history'} style={{textDecoration:'none'}}>
              <h3 >Watch History <GrHistory /></h3> 
              </Link>
          </Col>
        </Row>

        <Row>
          <Col lg={9} className='p-5'>
            {/* view Videos */}
            <h3>All Videos</h3>
            <ViewVideo addVideoResponse={addVideoResponse}/>
          </Col>
          <Col lg={3}>
            {/* Category */}
            <h3>Category</h3>
            <AddCategory/>
          </Col>
        </Row>
    </div>
  )
}

export default Home