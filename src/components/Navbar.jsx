import React from 'react';
import { Navbar,Nav } from 'react-bootstrap';
import { BsBoxArrowUp } from 'react-icons/bs'
import { AiOutlineCheckSquare } from "react-icons/ai";
import { Link } from "react-router-dom";


function navbar({active}){
return(
   
<Navbar collapseOnSelect expand="lg" className="navbarHeading  py-0 " variant="dark">
  <Navbar.Toggle aria-controls="responsive-navbar-nav align-items-inherit" />
  <Navbar.Collapse id="responsive-navbar-nav align-items-inherit">
    <Nav className="mr-auto">
      <Link to="dashboard" className={active ==="reduction"? "subTopicsSelected text-decoration-none effect-shine px-3":"subTopics text-white text-decoration-none effect-shine"}>Reduction</Link>
      <Link to="tilt-station" className={active ==="tilt-station"? "subTopicsSelected text-decoration-none effect-shine px-3":"subTopics text-white text-decoration-none effect-shine"}>TILT Station</Link>
      <Link to="Aggrid" className="subTopics text-white text-decoration-none effect-shine">TAC Station</Link>
      <Link href="#features" className="subTopics text-white text-decoration-none effect-shine">Reports</Link>
      <Link href="#features" className="subTopics text-white text-decoration-none effect-shine">Create Charge</Link>

    </Nav>
    <Nav>
        <div className="d-flex flex-wrap ml-3 ">
        <BsBoxArrowUp className=" mt-2 navbarfont" />
       <Nav.Link href="#deets" className="navRightRText text-white">
       Export
           </Nav.Link>
        </div>
        <div className="d-flex flex-wrap mr-4">
        <AiOutlineCheckSquare className="text-white ml-3 mt-2 navFont2" />
       <Nav.Link href="#deets" className="navRightRText text-white">
       Audit Log
           </Nav.Link>
        </div>
    </Nav>
  </Navbar.Collapse>
</Navbar>
 
)
}
export default navbar