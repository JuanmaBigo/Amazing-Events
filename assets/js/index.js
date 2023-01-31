const cardContainer = document.querySelector('.card-container');
let cardsInfo = data.events;
let cards = '';

for (let cardInfo of cardsInfo) {
    cards += `<div class="card rounded-0" style="width: 18rem;">
    <img src="${cardInfo.image}" class="card-img-top p-3" alt="...">
    <div class="card-body d-flex flex-column justify-content-between">
        <h5 class="card-title">${cardInfo.name}</h5>
        <p class="card-text">${cardInfo.description}</p>
        <div class="d-flex container-fluid align-self-end justify-content-between align-items-center">
            <p class="mb-0">Price: US$${cardInfo.price}</p>
            <a href="./assets/html/details.html" class="btn btn-primary see-more">See More</a>
        </div>
    </div>
</div>`
}

cardContainer.innerHTML = cards;
