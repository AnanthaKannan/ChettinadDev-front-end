import React from 'react'
import ReactBootstrap, { Navbar, Nav, NavItem ,Button,Form,FormControl,NavDropdown} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./Nav.css"

export default function NavBar() {
    return (
     
        <div> 
        <Navbar bg="primary" variant="dark"  >
        
        <Nav className="mr-auto">
        
         <Nav.Link
         class="pull-left"  href="#">
         <img src={ require('../assets/foodbooking.jpg') }class="image-responsive"/>
         </Nav.Link>
        <Nav.Link href="../components/Home" id="nav-link" >Home</Nav.Link>
        <Nav.Link href="../components/Product" id="nav-link">Products</Nav.Link>
        <Nav.Link href="../components/AddProduct"id="nav-link">Vendor</Nav.Link>
        <NavDropdown title="Products" id="nav-dropdown">
        <NavDropdown.Item href="../components/AddProduct">Action</NavDropdown.Item>
        <NavDropdown.Item href="../components/AddProduct">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        {/* <NavDropdown.Divider /> */}
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown>

        <NavDropdown title="Vendors"  id="nav-dropdown" >
        <NavDropdown.Item href="../components/AddProduct">Action</NavDropdown.Item>
        <NavDropdown.Item href="../components/AddProduct">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        {/* <NavDropdown.Divider /> */}
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown>
</Nav>

</Navbar>
</div>
    
    )
}

