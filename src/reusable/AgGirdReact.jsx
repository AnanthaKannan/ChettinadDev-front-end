
import React, { useState } from 'react';
import { AgGridReact, AgGridColumn } from '@ag-grid-community/react';
import { AllCommunityModules } from '@ag-grid-community/all-modules';

export default function AgGirdReact () {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [rowData, setRowData] = useState(null);

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);

    const updateData = (data) => {
      setRowData(data);
    };

    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => updateData(data));
  };

  return (
    <div style={{ width: '100%', height: '70vh' }}>
      <div
        id="myGrid"
        style={{
          height: '100%',
          width: '100%',
        }}
        className="ag-theme-alpine"
      >
        <AgGridReact
          modules={AllCommunityModules}
          defaultColDef={{ width: 150 }}
          onGridReady={onGridReady}
          rowData={rowData}
          pagination={true}
          animateRows={true}
          
        >
          <AgGridColumn field="athlete" />
          <AgGridColumn field="age" />
          <AgGridColumn
            field="country"
            headerTooltip="The country the athlete represented"
            filter={true}
            sortable={true}
            suppressAutoSize={true}
          />
          <AgGridColumn field="year" headerTooltip="The year of the Olympics" />
          <AgGridColumn field="date" headerTooltip="The date of the Olympics" />
          <AgGridColumn
            field="sport"
            headerTooltip="The sport the medal was for"
          />
           <AgGridColumn field="gold" headerTooltip="How many gold medals" />
          <AgGridColumn field="silver" headerTooltip="How many silver medals" />
          {/*<AgGridColumn field="bronze" headerTooltip="How many bronze medals" />
          <AgGridColumn
            field="total"
            headerTooltip="The total number of medals"
          /> */}
        </AgGridReact>
      </div>
    </div>
  );
};

