import React from 'react'
import ReactBootstrap, { Navbar, Nav, NavItem ,Button,Form,FormControl,NavDropdown} from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function NavBar() {
    return (
             <div>
<Navbar bg="primary" variant="dark"  >

<Nav className="mr-auto">
<Nav.Link
 class="pull-left"
                 href="#">
                    <img src={ require('../assets/foodbooking.jpg') }class="image-responsive"/>
                
            </Nav.Link>
  <Nav.Link href="../components/AddProduct" style={{marginTop:"44px",color:"white"}} >Home</Nav.Link>
  <Nav.Link href="../components/AddProduct"style={{marginTop:"44px",color:"white"}}>Products</Nav.Link>
  <Nav.Link href="../components/AddProduct"style={{marginTop:"44px",color:"white"}}>Vendor</Nav.Link>
  <NavDropdown title="Products" id="basic-nav-dropdown" style={{marginTop:"44px",color:"white"}}>
        <NavDropdown.Item href="../components/AddProduct">Action</NavDropdown.Item>
        <NavDropdown.Item href="../components/AddProduct">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        {/* <NavDropdown.Divider /> */}
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>
      <NavDropdown title="Vendors" id="basic-nav-dropdown" style={{marginTop:"44px",color:"white"}}>
        <NavDropdown.Item href="../components/AddProduct">Action</NavDropdown.Item>
        <NavDropdown.Item href="../components/AddProduct">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        {/* <NavDropdown.Divider /> */}
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>
</Nav>

{/* <Form inline>
  <FormControl type="text" placeholder="Search" className="mr-sm-2" />
  <Button variant="outline-light">Search</Button>
</Form> */}
</Navbar>

<br />

</div>
    
    )
}
