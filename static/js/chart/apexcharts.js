// Shared Colors Definition
const primary = '#6993FF';
const success = '#1BC5BD';
const info = '#8950FC';
const warning = '#FFA800';
const danger = '#F64E60';

jQuery(document).ready(function () {
    const apexChart = "#chart_1";
    var options = {
        series: [{
            name: "Appointment",
            data: [data[1], data[2], data[3], data[4], data[5], data[6], data[7], data[8], data[9], data[10], data[11], data[12]]
        }],
        chart: {
            height: 350,
            type: 'line',
            zoom: {
                enabled: true
            }
        },
        title: {
            text: 'Annual Appointment Statistics',
            align: 'left'
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight'
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
            },
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        },
        colors: [primary]
    };

    var chart = new ApexCharts(document.querySelector(apexChart), options);
    chart.render();
});
