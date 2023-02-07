function formatDate(date) {
    let dateArray = date.split("-");
    let year = dateArray[0];
    let month = dateArray[1];
    let day = dateArray[2];
    let dateObject = new Date(year, month, day);
    return dateObject;
}


let cardsInfo = data.events;
let currentDate = data.currentDate;


let pastCards = [];
for (let card of cardsInfo) {
    if (formatDate(card.date) < formatDate(currentDate)) {
        pastCards.push(card);
    }
}


const cardContainer = document.querySelector('.card-container');
let cards = '';

for (let cardInfo of pastCards) {
    cards += `<div class="card rounded-0" style="width: 18rem;">
    <img src="${cardInfo.image}" class="card-img-top p-3" alt="...">
    <div class="card-body d-flex flex-column justify-content-between">
        <h5 class="card-title">${cardInfo.name}</h5>
        <p class="card-text">${cardInfo.description}</p>
        <div class="d-flex container-fluid align-self-end justify-content-between align-items-center">
            <p class="mb-0">Price: US$${cardInfo.price}</p>
            <a href="../html/details.html" class="btn btn-primary see-more">See More</a>
        </div>
    </div>
</div>`
}

cardContainer.innerHTML = cards;




const categories = pastCards.map(card => card.category)
const uniqueCategories = [...new Set(categories)];

const checksContainer = document.querySelector('.checks');
checks = '';

for (let category of uniqueCategories) {
    checks += `
    <div class="form-check form-check-inline">
    <input class="form-check-input" type="checkbox" id="${category}" value="${category}" name="category">
    <label class="form-check-label" for="${category}">${category}</label>
    </div>`
}
checksContainer.innerHTML = checks;




let filteredCategories = [];

checksContainer.addEventListener('change', (event) => {
    if (event.target.checked) {
        filteredCategories.push(event.target.value);
    } else {
        filteredCategories = filteredCategories.filter(category => category !== event.target.value);
    }

    let filteredCards = filterCardsByCategory(pastCards, filteredCategories);
    filteredCards = filterCardsByName(filteredCards, searchInput.value);
    printCards(filteredCards);

    if (filteredCategories.length === 0 && searchInput.value === '') {
        filteredCards = pastCards;
    } else if (filteredCategories.length === 0) {
        filteredCards = filterCardsByName(pastCards, searchInput.value);
    } else if (searchInput.value === '') {
        filteredCards = filterCardsByCategory(pastCards, filteredCategories);
    }
    printCards(filteredCards);

    printAlertMessage(filteredCards);
})


function filterCardsByCategory(cardList, categories) {
    return cardList.filter(card => categories.includes(card.category));
}

function printCards(cardList) {
    cards = '';
    for (let card of cardList) {
        cards += `<div class="card rounded-0" style="width: 18rem;">
        <img src="${card.image}" class="card-img-top p-3" alt="...">
        <div class="card-body d-flex flex-column justify-content-between">
            <h5 class="card-title">${card.name}</h5>
            <p class="card-text">${card.description}</p>
            <div class="d-flex container-fluid align-self-end justify-content-between align-items-center">
                <p class="mb-0">Price: US$${card.price}</p>
                <a href="./assets/html/details.html" class="btn btn-primary see-more">See More</a>
            </div>
        </div>
    </div>`
    }
    cardContainer.innerHTML = cards;
}

function filterCardsByName(cardList, name) {
    return cardList.filter(card => card.name.toLowerCase().includes(name.toLowerCase()));
}

function printAlertMessage(filteredList) {
    if (filteredList.length === 0) {
        cardContainer.innerHTML = `<div class="alert alert-danger" role="alert">
        No results found for your search
        </div>`
    }
}


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
    printCards(filteredCards);

    printAlertMessage(filteredCards);
})

