import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { GiMusicalScore } from "react-icons/gi";
function Header() {
  return (
    <div> 
      <Navbar className="bg-dark text-light">
    <Container>
      <Navbar.Brand href="#home" className='text-white fs-2'>
      <GiMusicalScore className='me-3 fs-1'/>
       Media player 
      </Navbar.Brand>
    </Container>
  </Navbar></div>
  )
}

export default Header