import React from 'react'
import {Navbar, Nav, FormControl, Form, Button, NavDropdown} from 'react-bootstrap';

export default function MyNavbar() {
    return (

      <div>
<Navbar className='bg-blue' expand="lg">
  <Navbar.Brand href="#home" style={{'color': '#ffffff'}}>Chettinad Samayal</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
     
    </Nav>
    <Nav.Link href="#home" style={{'color': '#ffffff'}}>Home</Nav.Link>
      <Nav.Link href="#link" style={{'color': '#ffffff'}} >Link</Nav.Link>
      <NavDropdown style={{'color': '#ffffff'}} title="Dropdown" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>
    {/* <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-success">Search</Button>
    </Form> */}
  </Navbar.Collapse>
</Navbar>
<br/>
</div>

  )}
