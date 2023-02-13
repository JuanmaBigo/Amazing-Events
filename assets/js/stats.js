import { formatDate, sortCategories, revenues, percentageOfAttendance } from '../module/functions.js';

let cardsInfo = [];
let pastCards = [];
let upcomingCards = [];

const tableContainer = document.querySelector('.table');


fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then(response => response.json())
    .then(data => {
        let currentDate = data.currentDate;
        cardsInfo = data.events;
        for (let card of cardsInfo) {
            if (formatDate(card.date) >= formatDate(currentDate)) {
                upcomingCards.push(card);
            }
        }
        for (let card of cardsInfo) {
            if (formatDate(card.date) < formatDate(currentDate)) {
                pastCards.push(card);
            }
        }

        const largerCapacity = pastCards.reduce((a, b) => a.capacity > b.capacity ? a : b);
        const lowestPercentageOfAttendance = pastCards.reduce((a, b) => (a.assistance / a.capacity * 100) < (b.assistance / b.capacity * 100) ? a : b);
        const highestPercentageOfAttendance = pastCards.reduce((a, b) => (a.assistance / a.capacity * 100) > (b.assistance / b.capacity * 100) ? a : b);

        let table1 = ` 
<thead>
<tr>
    <th scope="col" colspan="3" class="table-title">Event statistics</th>
</tr>
<tr>
    <th>Event with the highest percentage of attendance</th>
    <th>Event with the lowest percentage of attendance</th>
    <th>Event with larger capacity</th>
</tr>
</thead>
<tbody>
<tr>
    <td>${highestPercentageOfAttendance.name} ${(highestPercentageOfAttendance.assistance / highestPercentageOfAttendance.capacity * 100).toFixed(2)}%</td>
    <td>${lowestPercentageOfAttendance.name} ${(lowestPercentageOfAttendance.assistance / lowestPercentageOfAttendance.capacity * 100).toFixed(2)}%</td>
    <td>${largerCapacity.name} ${largerCapacity.capacity}</td>
</tr>
</tbody>
`;

        let uniqueCategoriesUpcoming = sortCategories(upcomingCards);
        let revenuesUpcoming = revenues(upcomingCards, uniqueCategoriesUpcoming);
        let percentageOfAttendanceUpcoming = percentageOfAttendance(upcomingCards, uniqueCategoriesUpcoming);


        let upcomingStats = '';
        for (let i = 0; i < uniqueCategoriesUpcoming.length; i++) {
            upcomingStats += `
            <tr>
            <td>${uniqueCategoriesUpcoming[i]}</td>
            <td>US$ ${revenuesUpcoming[i]}</td>
            <td>${percentageOfAttendanceUpcoming[i].toFixed(2)}%</td>
            </tr>`
        }

        let table2 = `
<thead>
<tr>
    <th scope="col" colspan="3" class="table-title">Upcoming events statistics by category</th>
</tr>
<tr>
    <th>Categories</th>
    <th>Revenues</th>
    <th>Percentage of attendance</th>
</tr>
</thead>
<tbody>
${upcomingStats}
</tbody>
`;

        let uniqueCategoriesPast = sortCategories(pastCards);
        let revenuesPast = revenues(pastCards, uniqueCategoriesPast);
        let percentageOfAttendancePast = percentageOfAttendance(pastCards, uniqueCategoriesPast);


        let pastStats = '';
        for (let i = 0; i < uniqueCategoriesPast.length; i++) {
            pastStats += `
            <tr>
            <td>${uniqueCategoriesPast[i]}</td>
            <td>US$ ${revenuesPast[i]}</td>
            <td>${percentageOfAttendancePast[i].toFixed(2)}%</td>
            </tr>`
        }

        let table3 = `
<thead>
<tr>
    <th scope="col" colspan="3" class="table-title">Past events statistics by category</th>
</tr>
<tr>
    <th>Categories</th>
    <th>Revenues</th>
    <th>Percentage of attendance</th>
</tr>
</thead>
<tbody>
${pastStats}
</tbody>`

        let table = table1 + table2 + table3;
        tableContainer.innerHTML = table;
    })
    .catch(error => console.log(error));


