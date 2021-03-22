import React, { useState } from 'react'
import { Bar, Line } from 'react-chartjs-2';

export default function IndividualProductChart() {

  const genLineData = (moreData = {}, moreData2 = {}) => {
    return {
      labels: 'MONTH',
      datasets: [
        {
          label: "Product",
          backgroundColor: "#7DCEA0",
          borderColor: "green",
          borderWidth: 1,
          data: [100, 200, null, 500, 10, 100, 200, null, 500, 10],
        },
        {
          label: "Product B",
          borderColor: "red",
          backgroundColor: null,
          borderWidth: 1,
          data: [105, 210, 30, 420, 501, 105, 210, 30, 420, 501],
          type: 'line'
          },
          {
            label: "Product C",
            borderColor: "blue",
            borderWidth: 1,
            data: [110, 20, 310, 40, 51, 101, 210, 30, 420, 501],
            type: 'line'
            }
      ],
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'JUly', 'Aug', 'Sep', 'Oct']
    };
  };
  return (
    <div>
      <Bar
        data={genLineData({ type: "line", fill: false })}
      />
    </div>
  )
}
