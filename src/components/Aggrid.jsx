import React from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "../App.css"

const columnDefs = [

    {
        headerName: "Pot No.",
        maxWidth: 83,
        field: "Pot_No"
    },
    {
        headerName: "Weight",
        maxWidth: 80,
        field: "weight"
    },
    {
        headerName: "Pot Name",
        maxWidth: 140,
        field: "Pot_name"
    },
    {
        headerName: "SI",
        maxWidth: 80,
        field: "SI"
    },
    {
        headerName: "FE",
        maxWidth: 80,
        field: 'FE'
    },
]
// const rowData = [{ Pot_No: "1112", weight: "1500", Pot_name: "RD3_POT6433", SI: 0.002, FE: 0.002 },
// { Pot_No: "1112", weight: "1500", Pot_name: "RD3_POT6433", SI: 0.002, FE: 0.002 },
// { Pot_No: "1112", weight: "1500", Pot_name: "RD3_POT6433", SI: 0.002, FE: 0.002 }]
function Aggrid({ rowData }) {
    return (
        <div className="ag-theme-alpine mr-3 mb-0">
            <AgGridReact
                domLayout='autoHeight'
                animateRows={true}
                columnDefs={columnDefs}
                rowData={rowData}
                onFirstDataRendered={(params) => params.api.sizeColumnsToFit()}
            >
            </AgGridReact>

        </div>
    )
}
export default Aggrid