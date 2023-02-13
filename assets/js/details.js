const detailsContainer = document.querySelector(".details-container");

const queryParams = new URLSearchParams(location.search);
let id = queryParams.get("id");



fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then(response => response.json())
    .then(data => {
        let cardsInfo = data.events;

        const card = cardsInfo.find(card => card._id == id);
        document.title = `Amazing Events - ${card.name}`

        let assistOrEstimate = '';
        if (card.assistance !== undefined) {
            assistOrEstimate = `Assistance: ${card.assistance}`
        } else {
            assistOrEstimate = `Estimate: ${card.estimate}`
        }

        detailsContainer.innerHTML = `<img src="${card.image}" class="img-fluid details-img" alt="...">
        <div class="details-text">
            <div class="card-body">
                <h5 class="card-title">${card.name}</h5>
                <p class="card-text">${card.description}</p>
                <p class="card-text">Date: ${card.date}</p>
                <p class="card-text">Place: ${card.place}</p>
                <p class="card-text">Capacity: ${card.capacity}</p>
                <p class="card-text">${assistOrEstimate}</p>
                <p class="card-text">Price: US$${card.price}</p>
            </div>
        </div>`;

    })
    .catch(error => console.log(error));




