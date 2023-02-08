export function printCards(cardList, containerToPrint) {
    let cards = '';
    for (let card of cardList) {
        cards += `<div class="card rounded-0" style="width: 18rem;">
        <img src="${card.image}" class="card-img-top p-3" alt="...">
        <div class="card-body d-flex flex-column justify-content-between">
            <h5 class="card-title">${card.name}</h5>
            <p class="card-text">${card.description}</p>
            <div class="d-flex container-fluid align-self-end justify-content-between align-items-center">
                <p class="mb-0">Price: US$${card.price}</p>
                <a href="./assets/html/details.html?id=${card._id}" class="btn btn-primary see-more">See More</a>
            </div>
        </div>
    </div>`
    }
    containerToPrint.innerHTML = cards;
}

export function filterCardsByCategory(cardList, categories) {
    return cardList.filter(card => categories.includes(card.category));
}

export function filterCardsByName(cardList, name) {
    return cardList.filter(card => card.name.toLowerCase().includes(name.toLowerCase()));
}

export function printAlertMessage(filteredList, container) {
    if (filteredList.length === 0) {
        container.innerHTML = `<div class="alert alert-danger" role="alert">
        No results found for your search
        </div>`
    }
}

export function createCategoriesChecks(cardList, container) {
    const categories = cardList.map(card => card.category)
    const uniqueCategories = [...new Set(categories)];

    let checks = '';
    for (let category of uniqueCategories) {
        checks += `
    <div class="form-check form-check-inline">
    <input class="form-check-input" type="checkbox" id="${category}" value="${category}" name="category">
    <label class="form-check-label" for="${category}">${category}</label>
    </div>`
    }
    container.innerHTML = checks;
}

export function formatDate(date) {
    let dateArray = date.split("-");
    let year = dateArray[0];
    let month = dateArray[1];
    let day = dateArray[2];
    let dateObject = new Date(year, month, day);
    return dateObject;
}