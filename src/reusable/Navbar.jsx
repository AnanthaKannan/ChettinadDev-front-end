import React,{useState} from 'react';
import{Button} from './Button.jsx';
import{Link} from 'react-router-dom';
import ReactBootstrap, {NavDropdown} from 'react-bootstrap';
import './Navbar.css';
import DropDown from './DropDown.jsx';

export default function Navbar() {

    const[click,setClick]=useState(false);

    const[dropdown,setDropdown]=useState(false);

    const handleClick = () => setClick(!click);
    const closeMobileMenu=()=>setClick(false);

    const onMouseEnter=()=>{
        if(window.innerWidth < 960){
            setDropdown(false);
        }
        else{
            setDropdown(true);
        }
    };

    const onMouseLeave=()=>{
        if(window.innerWidth < 960){
            setDropdown(false)
        }
        // else{
        //     setDropdown(false)
        // }
    };
    return (
        <>
            <nav className='navbar'>
                <Link to='/' className='navbar-logo'>
                {/* Epic<i class='fab fa-firstdraft'/> */}
                <img src={ require('../assets/foodbooking.jpg') }/>
                </Link>
                <div className='menu-icon' onClick={handleClick}>
                    <i className={click?'fas fa-times':'fas fa-bars'}/>
                    </div>

                    <ul className={click?  'nav-menu active':'nav-menu'} >
                        <li className='nav-item'>
<Link to='/' className='nav-links' onClick=
{closeMobileMenu}>Home</Link></li>

 {/* <li className='nav-item'
 onMouseEnter={onMouseEnter}
 onMouseLeave={onMouseLeave}>
<Link to='/service' className='nav-links' onClick=
{closeMobileMenu}>services<i className='fas fa-caret-down'/></Link>
{dropdown && <DropDown/>}
 </li> */}
  <NavDropdown title="Products" id="nav-dropdown">
        <NavDropdown.Item href="../components/AddProduct">Action</NavDropdown.Item>
        <NavDropdown.Item href="../components/AddProduct">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        {/* <NavDropdown.Divider /> */}
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown>

 <li className='nav-item'>
<Link to='/contact-us' className='nav-links' onClick=
{closeMobileMenu}>Contact Us</Link></li>

 <li className='nav-item'>
<Link to='/sign-up' className='nav-links' onClick=
{closeMobileMenu}>Sign Up</Link></li>
                        </ul>   
                        {/* <Button/> */}
       
            </nav>
        </>
    );
}
