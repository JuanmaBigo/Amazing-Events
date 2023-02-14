import { printCards, filterCardsByCategory, filterCardsByName, printAlertMessage, createCategoriesChecks, formatDate } from '../module/functions.js'

const detailsLocation = './details.html';
const cardContainer = document.querySelector('.card-container');
const checksContainer = document.querySelector('.checks');

let cardsInfo = [];
let upcomingCards = [];

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
        printCards(upcomingCards, cardContainer, detailsLocation);
        createCategoriesChecks(upcomingCards, checksContainer);
    })
    .catch(error => console.log(error));



let filteredCategories = [];
checksContainer.addEventListener('change', (event) => {
    if (event.target.checked) {
        filteredCategories.push(event.target.value);
    } else {
        filteredCategories = filteredCategories.filter(category => category !== event.target.value);
    }

    let filteredCards = filterCardsByCategory(upcomingCards, filteredCategories);
    filteredCards = filterCardsByName(filteredCards, searchInput.value);

    if (filteredCategories.length === 0 && searchInput.value === '') {
        filteredCards = upcomingCards;
    } else if (filteredCategories.length === 0) {
        filteredCards = filterCardsByName(upcomingCards, searchInput.value);
    } else if (searchInput.value === '') {
        filteredCards = filterCardsByCategory(upcomingCards, filteredCategories);
    }
    printCards(filteredCards, cardContainer, detailsLocation);

    printAlertMessage(filteredCards, cardContainer);
})



const searchInput = document.querySelector('.search-input');

searchInput.addEventListener('keyup', (event) => {
    let filteredCards = filterCardsByName(upcomingCards, event.target.value);
    filteredCards = filterCardsByCategory(filteredCards, filteredCategories);

    if (event.target.value === '' && filteredCategories.length === 0) {
        filteredCards = upcomingCards;
    }
    else if (event.target.value === '') {
        filteredCards = filterCardsByCategory(upcomingCards, filteredCategories);
    }
    else if (filteredCategories.length === 0) {
        filteredCards = filterCardsByName(upcomingCards, event.target.value);
    }
    printCards(filteredCards, cardContainer, detailsLocation);

    printAlertMessage(filteredCards, cardContainer);
})

