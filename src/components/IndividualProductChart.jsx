import React, { useState, useEffect } from 'react'
import { Bar, Line } from 'react-chartjs-2';
import generalService from '../service/general.service';
import dateFn from 'date-fn';

export default function IndividualProductChart({productId}) {

  const [chartData, setChartData] = useState();


  useEffect(() =>{
    console.log('productId', productId)
    if(productId){
     getStockDetailsByProductId();
    }
},[productId])

  const getStockDetailsByProductId = async() => {
    const result = await generalService.getStockDetailsByProductId({_id: productId});
    if(result.status == 200){
        const data = result.data.data;
        console.log('getStockDetailsByProductId', data);
        let [currentStock, usedStock, openStock, date] = [[], [], [], []];

        data.forEach((obj) =>{
          currentStock.push(obj.currentStock);
          usedStock.push(obj.usedStock);
          openStock.push(obj.openStock);
          // date.push( dateFn.date(new Date(obj.date), 143));
          date.push(obj.date);
        });
        const chartData_ = genLineData(currentStock, usedStock, openStock, date);
        setChartData(chartData_);
    }
}


  const genLineData = (currentStock, usedStock, openStock, date) => {
    return {
      labels: 'MONTH',
      datasets: [
        {
          label: "Current Stock",
          borderColor: "red",
          borderWidth: 1,
          data: currentStock,
          type: 'line'
          },
          {
            label: "Used Stock",
            borderColor: "blue",
            borderWidth: 1,
            data: usedStock,
            type: 'bar'
            },
            {
              label: "Open Stock",
              backgroundColor: "#7DCEA0",
              borderColor: "green",
              borderWidth: 1,
              data: openStock,
            }
      ],
      labels: date,
      position: 'bottom',
      options: {
        position: 'bottom',
        legend: {
            display: false,
            position: 'bottom'
        }
    }
    };
  };
  return (
    <div>
      <Bar
      height={75}
        data={chartData}
        options={{
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                min: 0
              }    
            }]
          },
          "hover": {
            "mode": "index",
            axis: 'y'
          },
          "tooltips": {
            "enabled": true
                   
          },
          legend: {
              display: true,
              position: 'top',
              align: 'start'
          }
      }}
      />
    </div>
  )
}
