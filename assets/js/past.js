import { printCards,filterCardsByCategory, filterCardsByName, printAlertMessage, createCategoriesChecks, formatDate } from '../module/functions.js'

let cardsInfo = data.events;
let currentDate = data.currentDate;


let pastCards = [];
for (let card of cardsInfo) {
    if (formatDate(card.date) < formatDate(currentDate)) {
        pastCards.push(card);
    }
}


const cardContainer = document.querySelector('.card-container');
printCards(pastCards, cardContainer);


const checksContainer = document.querySelector('.checks');
createCategoriesChecks(pastCards, checksContainer);



let filteredCategories = [];
checksContainer.addEventListener('change', (event) => {
    if (event.target.checked) {
        filteredCategories.push(event.target.value);
    } else {
        filteredCategories = filteredCategories.filter(category => category !== event.target.value);
    }

    let filteredCards = filterCardsByCategory(pastCards, filteredCategories);
    filteredCards = filterCardsByName(filteredCards, searchInput.value);

    if (filteredCategories.length === 0 && searchInput.value === '') {
        filteredCards = pastCards;
    } else if (filteredCategories.length === 0) {
        filteredCards = filterCardsByName(pastCards, searchInput.value);
    } else if (searchInput.value === '') {
        filteredCards = filterCardsByCategory(pastCards, filteredCategories);
    }
    printCards(filteredCards, cardContainer);

    printAlertMessage(filteredCards, cardContainer);
})



const searchInput = document.querySelector('.search-input');
const searchButton = document.querySelector('.btn-search');

searchInput.addEventListener('keyup', (event) => {
    let filteredCards = filterCardsByName(pastCards, event.target.value);
    filteredCards = filterCardsByCategory(filteredCards, filteredCategories);

    if (event.target.value === '' && filteredCategories.length === 0) {
        filteredCards = pastCards;
    }
    else if (event.target.value === '') {
        filteredCards = filterCardsByCategory(pastCards, filteredCategories);
    }
    else if (filteredCategories.length === 0) {
        filteredCards = filterCardsByName(pastCards, event.target.value);
    }
    printCards(filteredCards, cardContainer);

    printAlertMessage(filteredCards, cardContainer);
})

