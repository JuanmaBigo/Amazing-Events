import { printCards, filterCardsByCategory, filterCardsByName, printAlertMessage, createCategoriesChecks } from '../module/functions.js'

const cardContainer = document.querySelector('.card-container');
const checksContainer = document.querySelector('.checks');

const detailsLocation = './assets/html/details.html';

let cardsInfo = []


fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then(response => response.json())
    .then(data => {
        cardsInfo = data.events;
        printCards(cardsInfo, cardContainer, detailsLocation);
        createCategoriesChecks(cardsInfo, checksContainer);
    })
    .catch(error => console.log(error));



let filteredCategories = [];
checksContainer.addEventListener('change', (event) => {
    if (event.target.checked) {
        filteredCategories.push(event.target.value);
    } else {
        filteredCategories = filteredCategories.filter(category => category !== event.target.value);
    }

    let filteredCards = filterCardsByCategory(cardsInfo, filteredCategories);
    filteredCards = filterCardsByName(filteredCards, searchInput.value);

    if (filteredCategories.length === 0 && searchInput.value === '') {
        filteredCards = cardsInfo;
    } else if (filteredCategories.length === 0) {
        filteredCards = filterCardsByName(cardsInfo, searchInput.value);
    } else if (searchInput.value === '') {
        filteredCards = filterCardsByCategory(cardsInfo, filteredCategories);
    }
    printCards(filteredCards, cardContainer, detailsLocation);

    printAlertMessage(filteredCards, cardContainer);
})


const searchInput = document.querySelector('.search-input');

searchInput.addEventListener('keyup', (event) => {
    let filteredCards = filterCardsByName(cardsInfo, event.target.value);
    filteredCards = filterCardsByCategory(filteredCards, filteredCategories);

    if (event.target.value === '' && filteredCategories.length === 0) {
        filteredCards = cardsInfo;
    }
    else if (event.target.value === '') {
        filteredCards = filterCardsByCategory(cardsInfo, filteredCategories);
    }
    else if (filteredCategories.length === 0) {
        filteredCards = filterCardsByName(cardsInfo, event.target.value);
    }
    printCards(filteredCards, cardContainer, detailsLocation);

    printAlertMessage(filteredCards, cardContainer);
})
