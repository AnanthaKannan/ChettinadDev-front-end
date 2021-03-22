import React from 'react'
import AddProduct from '../components/AddProduct'
import LoginBox from '../components/LoginBox'
// import NavBar from '../reusable/NavBar'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Navbar from '../reusable/Navbar'
import ContactUs from '../reusable/ContactUs.jsx'
import Marketing from '../reusable/Marketing.jsx'
import Service from '../reusable/Service.jsx'
import SignUp from '../reusable/SignUp.jsx'
import Home from '../reusable/Home.jsx'
// import Product from '../resuable/Product'
// import NavbarNew from '../reusable/NavbarNew'

export default function Login() {
    return (
        <div>
        {/* <LoginBox/>     */}
        {/* <AddProduct/> */}
        {/* <NavBar/> */}
        
        <Navbar/>
        {/* <NavbarNew/> */}
        <Switch>
            <Route path='/' exact component={Home}/>
            <Route path='/services' exact component={Service}/>
            {/* <Route path='/product' exact component={Product}/> */}
            <Route path='/contact-us' exact component={ContactUs}/>
            <Route path='/sign-up' exact component={SignUp}/>
            <Route path='/marketing' exact component={Marketing}/>



        </Switch>
        </div>
    )
}
