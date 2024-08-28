import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MdOutlineCloudUpload } from "react-icons/md";
import { GrCloudUpload } from "react-icons/gr";
import { addVideoAPI } from '../Services/AllAPIs';
import Swal from 'sweetalert2'
function AddVideo({setAddVideoResponse}) {

  const [video, setVideo] = useState({
    caption: "",
    url: "",
    embedLink: ""
  })
  console.log(video);

  const getEmbedLink = (e) => {
    console.log(e.target.value);
    const { value } = e.target
    console.log(value);
    console.log(value.slice(-31));
    const link = `https://www.youtube.com/embed/${value.slice(-31)}`
    setVideo({ ...video, embedLink: link });

  }

  const handleUpload = async () => {
    const { caption, url, embedLink } = video
    if (!caption || !url || !embedLink) {
      alert("Please fill your form")
    }
    else {
      try {
        //make an API request
        const response = await addVideoAPI(video)
        console.log(response);
        if(response.status>=200 && response.status<=300){
          console.log(response.data);//data 
          setAddVideoResponse(response.data)
          handleClose()
          Swal.fire({
            title: 'Success!',
            text: 'Video Added Success',
            icon: 'success',
            confirmButtonText: 'Back'
          })
         // alert("Video added successfully...")
        }
        else{
          console.log(response.message); //error message 
          Swal.fire({
            title: 'Error!',
            text: response.message,
            icon: 'error',
            confirmButtonText: 'Back'
          })
         // alert(response.message); //error message
        }
      }
      catch (err) {
        console.log(err);
      }

    }
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <Button variant="" onClick={handleShow}>
        <MdOutlineCloudUpload className='fs-3' />
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title><GrCloudUpload className='mx-2 fs-3' />Upload Video</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Please fill following details...</p>
          <div>
            <input onChange={e => setVideo({ ...video, caption: e.target.value })} type="text" placeholder='Video Caption' className='form-control mb-3' />
            <input onChange={e => setVideo({ ...video, url: e.target.value })} type="text" placeholder='Video Image' className='form-control mb-3' />
            <input onChange={getEmbedLink} type="text" placeholder='Video Url' className='form-control mb-3' />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleUpload} variant="primary">Upload</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default AddVideo