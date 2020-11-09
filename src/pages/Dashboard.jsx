import React from 'react'
import CardProgress from "../components/CardProgress"
import Navbar from "../components/Navbar"
import TopNavbar from "../components/TopNavbar"
import { AgGridReact } from 'ag-grid-react';
import info from "../assets/Icon-info.png";
import edit from "../assets/Icon-edit.png";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "../App.css"


const columnDefs = [
    { headerName: "Crucible No", field: "Id", sortable: true, filter: true, },
    { headerName: "Weight (MT)", field: "Name", sortable: true, filter: true },
    { headerName: "Last inspection date", field: "Age", sortable: true, filter: true, },
    {
        headerName: "status", field: "Address", sortable: true, filter: true,
        cellRenderer: (params) =>
            params.value === "Inspection" ? `<div  class="d-flex flex-wrap gridCell_inspec " style={{color:"red"}}> <svg height="30" width="30"> <circle cx="20" cy="20" r="8" stroke-width="3" fill="#dd1010" />inspection</svg><label className="celltextStyle">${params.value}</label></div>` :
                params.value == "Demolish" ? `<div  class="d-flex gridCell_Demo "> <svg height="30" width="30"> <circle cx="20" cy="20" r="8" stroke-width="3" fill="#5d30cd" />inspection</svg><label className="mx-4 text-red">${params.value}</label></div>` :
                    params.value == "Relining" ? `<div  class="d-flex gridCell_Relin "> <svg height="30" width="30"> <circle cx="20" cy="20" r="8" stroke-width="3" fill="#ff8c05" />inspection</svg><label className="mx-4 text-red">${params.value}</label></div>` :
                        params.value == "Baking" ? `<div  class="d-flex   gridCell_Bak"> <svg height="30" width="30"> <circle cx="20" cy="20" r="8" stroke-width="3" fill="#1b9d3e" />inspection</svg><label className="mx-4 text-red">${params.value}</label></div>` : null
    },
    { headerName: "start Date", field: "City", sortable: true, filter: true },
    { headerName: "End Date", field: "Salary", sortable: true, filter: true },

    {
        headerName: "",
        maxWidth: 60,
        field: 'edit',
        resizable: false,
        filter: false,
        sortable: false,
        cellRenderer: () => '<div  class="text-center"> <img class="ag-gird-icon" src="' + edit + '" /> </div>',
    },
    {
        headerName: "",
        maxWidth: 60,
        field: "info",
        resizable: false,
        filter: false,
        sortable: false,
        cellRenderer: () => '<div  class="text-center"> <img class="ag-gird-icon" src="' + info + '" /> </div>',
    },
]
const rowData = [
    {
        Id: "A01",
        Name: "12.47",
        Age: "18/10/2020 12:00:00pm",
        Address: "Inspection",
        City: "08/08/2020 12:00:00 PM",
        Salary: "08/08/2020 12:00:00 PM",
        Department: "IT",

    },
    {
        Id: "A02",
        Name: "12.47",
        Age: "21/11/2020 12:00:00pm",
        Address: "Demolish",
        City: "08/08/2020 12:00:00 PM",
        Salary: "08/08/2020 12:00:00 PM",
        Department: "IT",
    },
    {
        Id: "A03",
        Name: "12.47",
        Age: "12/10/2020 12:00:00pm",
        Address: "Relining",
        City: "08/08/2020 12:00:00 PM",
        Salary: "08/08/2020 12:00:00 PM",
        Department: "IT",
    },
    {
        Id: "A04",
        Name: "12.47",
        Age: "22/10/2020 12:00:00pm",
        Address: "Baking",
        City: "08/08/2020 12:00:00 PM",
        Salary: "08/08/2020 12:00:00 PM",
        Department: "IT",
    },
    {
        Id: "A05",
        Name: "12.47",
        Age: "07/10/2020 12:00:00pm",
        Address: "Inspection",
        City: "08/08/2020 12:00:00 PM",
        Salary: "08/08/2020 12:00:00 PM",
        Department: "IT",
    },
    {
        Id: "A06",
        Name: "12.47",
        Age: "18/02/2020 12:00:00pm",
        Address: "Demolish",
        City: "08/08/2020 12:00:00 PM",
        Salary: "08/08/2020 12:00:00 PM",
        Department: "IT",
    },
    {
        Id: "A07",
        Name: "12.47",
        Age: "06/10/2020 12:00:00pm",
        Address: "Inspection",
        City: "08/08/2020 12:00:00 PM",
        Salary: "08/08/2020 12:00:00 PM",
        Department: "IT",
    },
    {
        Id: "A08",
        Name: "12.47",
        Age: "18/10/2020 12:00:00pm",
        Address: "Inspection",
        City: "08/08/2020 12:00:00 PM",
        Salary: "08/08/2020 12:00:00 PM",
        Department: "IT",
    }
]

function Dashboard() {
    return (
        <div className="">
            <TopNavbar />
            <Navbar active='reduction' />
            <div className="d-flex flex-wrap mx-5 mt-4 nav-curcible">
                <label className="bottom-border-active">Crucible Inspection</label>
                <label className="ml-5">Crucible Cleaning</label>
            </div>
            <hr className="mt-0" />
            <label className="mt-3 ml-5 crucibleText">Crucible Inspection</label>
            <div className=" mx-5 d-md-flex  justify-content-between mt-3">
                <CardProgress
                    className='mr-4'
                    intiallMessage='Due for Inspection'
                    color='#dd1010'
                    percentage='76'
                    text1='76 out of 100 crucibles are'
                    text2=' due for inspection'
                />
                <CardProgress
                    className='mr-4'
                    intiallMessage='Due for Demolish'
                    color='#5d30cd'
                    percentage='35'
                    text1='35 out of 100 crucibles are'
                    text2='due for demolish'
                />
                <CardProgress
                    className='mr-4'
                    intiallMessage='Due for Relining'
                    color='#ff8c05'
                    percentage='55'
                    text1='55 out of 100 crucibles are 
            '
                    text2='due for relining'
                />
                <CardProgress
                    className='mr-4'
                    intiallMessage='Due for Baking'
                    color='#1b9d3e'
                    percentage='20'
                    text1='20 out of 100 crucibles are 
            '
                    text2='due for baking'
                />
                <CardProgress
                    intiallMessage='Ready to use'
                    color='#147ad6'
                    percentage='40'
                    text1='40 out of 100 crucibles are 
            '
                    text2='Ready to use'
                />

            </div>
            <div className="ml-5 mt-3  mr-5">
                <div className="ag-theme-alpine aggrid  mb-0">
                    <AgGridReact
                        domLayout='autoHeight'
                        animateRows={true}
                        columnDefs={columnDefs}
                        rowData={rowData}
                        onFirstDataRendered={(params) => params.api.sizeColumnsToFit()}
                    >
                    </AgGridReact>

                </div>
            </div>

        </div>

    )
}
export default Dashboard