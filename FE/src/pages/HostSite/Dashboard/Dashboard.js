// import React from 'react';
// //import { render } from 'react-dom'
// import Highcharts from 'highcharts';
// import HighchartsReact from 'highcharts-react-official';
// import LineChart from 'components/ChartDashBoard/LineChart';
// import PieChart from 'components/ChartDashBoard/PieChart';

// const lineChart = {
//     title: {
//         text: 'My chart',
//     },
//     series: [
//         {
//             data: [1, 2, 3],
//         },
//     ],
//     width: '800px',
// };
// const pieChart = {
//     chart: {
//         plotBackgroundColor: null,
//         plotBorderWidth: null,
//         plotShadow: false,
//         type: 'pie',
//     },
//     series: [
//         {
//             name: 'Brands',
//             colorByPoint: true,
//             data: [
//                 {
//                     name: 'Chrome',
//                     y: 70.67,
//                     sliced: true,
//                     selected: true,
//                 },
//                 {
//                     name: 'Edge',
//                     y: 14.77,
//                 },
//                 {
//                     name: 'Firefox',
//                     y: 4.86,
//                 },
//                 {
//                     name: 'Safari',
//                     y: 2.63,
//                 },
//                 {
//                     name: 'Internet Explorer',
//                     y: 1.53,
//                 },
//                 {
//                     name: 'Opera',
//                     y: 1.4,
//                 },
//                 {
//                     name: 'Sogou Explorer',
//                     y: 0.84,
//                 },
//                 {
//                     name: 'QQ',
//                     y: 0.51,
//                 },
//                 {
//                     name: 'Other',
//                     y: 2.6,
//                 },
//             ],
//         },
//     ],
// };

// export const Dashboard = () => (
//     <div style={{display: 'flex'}}>
//         <LineChart highcharts={Highcharts} options={lineChart} />
//         <LineChart highcharts={Highcharts} options={lineChart} />
//         <PieChart highcharts={Highcharts} options={pieChart} />
//     </div>
// );
