import { formatDate, sortCategories, revenues, percentageOfAttendance, createTable1, createTableStats, stats } from '../module/functions.js';

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

        let uniqueCategoriesUpcoming = sortCategories(upcomingCards);
        let revenuesUpcoming = revenues(upcomingCards, uniqueCategoriesUpcoming);
        let percentageOfAttendanceUpcoming = percentageOfAttendance(upcomingCards, uniqueCategoriesUpcoming);

        let uniqueCategoriesPast = sortCategories(pastCards);
        let revenuesPast = revenues(pastCards, uniqueCategoriesPast);
        let percentageOfAttendancePast = percentageOfAttendance(pastCards, uniqueCategoriesPast);

        let table1 = createTable1(highestPercentageOfAttendance, lowestPercentageOfAttendance, largerCapacity);
        let table2 = createTableStats(uniqueCategoriesUpcoming, revenuesUpcoming, percentageOfAttendanceUpcoming, 'upcoming');
        let table3 = createTableStats(uniqueCategoriesPast, revenuesPast, percentageOfAttendancePast, 'past');

        let table = table1 + table2 + table3;
        tableContainer.innerHTML = table;
    })
    .catch(error => console.log(error));




