
import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import "ag-grid-community/dist/styles/ag-theme-balham.css";


export default function AgGirdReact ({columnDefs, onCellClicked, frameworkComponents={}, rowData, pagination=true, onSelectionChanged, height='50vh'}) {
  
  const onCellClicked_ = (e) =>{
    try{
      onCellClicked(e)
    }
    catch(e){

    }
  }


  return (
    <div className="ag-theme-alpine  mb-0" style={{height: height}}>
    <AgGridReact
        // domLayout='autoHeight'
        onCellClicked={(e) => onCellClicked_(e)}
        rowSelection='multiple'
        animateRows={true}
        columnDefs={columnDefs}
        rowData={rowData}
        onFirstDataRendered={(params) => params.api.sizeColumnsToFit()}
        pagination={pagination}
        paginationPageSize={10}
        // onSelectionChanged={onSelectionChanged}
        frameworkComponents={frameworkComponents}
    >
    </AgGridReact>
    </div>
  );
};

