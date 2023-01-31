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
            <a href="../html/details.html" class="btn btn-primary">See More</a>
        </div>
    </div>
</div>`
}

cardContainer.innerHTML = cards;
