import React, { useState } from 'react'
import { Bar, Line } from 'react-chartjs-2';

export default function IndividualProductChart() {

  const genLineData = (moreData = {}, moreData2 = {}) => {
    return {
      labels: 'MONTH',
      datasets: [
        {
          label: "Product",
          // barPercentage: 0.2,
          // backgroundColor: "#BABABA",
          borderColor: "green",
          borderWidth: 1,
          data: [100, 200, null, 500, 10],
        },
        {
          label: "Product B",
          // backgroundColor: "#00b34f",
          borderColor: "red",
          borderWidth: 1,
          data: [105, 210, 30, 420, 501],
          type: 'line'
          }
      ],
      labels: ['January', 'February', 'March', 'April', 'May']
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
