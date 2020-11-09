import React from 'react';
import AlbaLogo from "../assets/alpa1.png"
import Profile from  "../components/Profile"

function TopNavbar() {
    return (
        <div className="container-fluid top-nav-shadow">
        <div className="row ">

            <div className="col-md-8 px-5">
                {/* <div className="d-flex flex-wrap align-items-center justify-content-between topHeader"> */}
                <div className='topHeader'>
                    <img src={AlbaLogo} alt="alba" />
                     <label>DASHBOARD</label>
                    <label className='bottom-border-active'>CMS</label>
                    <label>PMS</label>
                    <label>SMS</label>
                    {/* <label>CMS</label>
                    <label>LIMS</label> */}
                </div>
            </div>
            <div className="col-md-4 border px-5">
            <Profile  name="ABDUAL SAMI"  designation="Operator"/> 
            </div>
            </div>
        </div>
    )
}
export default TopNavbar