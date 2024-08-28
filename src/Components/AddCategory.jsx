import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addCategoryAPI, deleteCategoryAPI, getAVideoAPI, getCategoryAPI, updateCategoryAPI } from '../Services/AllAPIs';
import VideoCard from './VideoCard';

function AddCategory() {
    const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [categoryName,setCategoryName] = useState("")//to hold all categories
  const [getCategory,setGetCategory] = useState({
    categoryName:"",
    allVideos:[]
  })
  const [deleteStatus,setDeleteStatus] = useState("")

  const handleAdd =async()=>{

    const body={
      categoryName,
      allVideos:[]
    }
    
    if(categoryName){
     try{
      const response = await addCategoryAPI(body)
      console.log(response);
      alert("Added category " + categoryName)
      handleGetCategory()//get all categories 
      setCategoryName("")
      handleClose()
     }
     catch(error){
        console.log(error);
        
     }
    }
    else{
      alert("Please provide category name")
    } 
  }

  const handleGetCategory = async()=>{
    const response = await getCategoryAPI()
    console.log(response);
    setGetCategory(response.data)
  }
  const handleDelete = async(id)=>{
    const response = await deleteCategoryAPI(id)
    console.log(response);
    setDeleteStatus(response)
    
  }

  const videoDrop=async(e,categoryId)=>{
    console.log("Video drop"+categoryId,e);
    const videoId = e.dataTransfer.getData("videoId")
    console.log("VideoId: "+videoId);
    e.preventDefault();
    //get a particular video
    const {data} = await getAVideoAPI(videoId)
    console.log(data);
    //get category details
    const selectedCategory = getCategory?.find(item=>item.id===categoryId)
    console.log(selectedCategory);
    //add videos into the allVideos category
    selectedCategory.allVideos.push(data)
    await updateCategoryAPI(categoryId, selectedCategory)
    handleGetCategory()
    
  }

  const dragOver=(e)=>{
    console.log("videoDrag Over");
    e.preventDefault()
  }

  useEffect(()=>{
    handleGetCategory()
  },[deleteStatus])

  return (
    <div>

      <div className="d-grid gap-2 me-3 mt-4">
      <Button  variant="primary" size="lg" onClick={handleShow}>
      Add Category
      </Button>

      <div className="row">
        {
          getCategory.length>0? getCategory.map(item=>(
            <div onDragOver={e=>dragOver(e)} 
            onDrop={(e)=>videoDrop(e,item.id)} className="col m-3 p-4 border border-light d-flex justify-content-between">
          <p>{item.categoryName}</p>
          <i onClick={()=>handleDelete(item.id)} className='fa-solid fa-trash text-danger'></i>
          <div className='row' style={{width:'100%'}}>
          <div className="col" >
          {item.allVideos && item.allVideos.map((data)=>(
<VideoCard displayVideo={data} />
          ))}
          </div>
          </div>
        </div>
      
        
          )):<p>No data found</p>
        }
      </div>
     
    </div>
        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <input type="text" onChange={(e) => setCategoryName(e.target.value)} on placeholder='Category Name' className='form-control' />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleAdd} variant="primary" >Add</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default AddCategory