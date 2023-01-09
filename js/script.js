let episodes = null;
const inputSearch = document.querySelector('#search');
const seletItems = document.querySelector('#select');
const cardContainer = document.querySelector('#continer');
const btn = document.querySelector('#btn');



fetchEpisodes();
async function fetchEpisodes() {
    const res = await fetch("https://api.tvmaze.com/shows/82/episodes");
    episodes = await res.json();
    renderEpisodes(episodes);
    renderOptions(episodes);
}

function renderEpisodes(data) {

    const section = document.createElement('section');
    section.classList.add("row");

    data.forEach((item) => {

        const makingCard = `<div class="card" style="width: 18rem;">

    <img class="card-img-top"  src="${item.image.medium}" alt="${item.name}">

    <div class="card-body">

        <div class=" align-items-center">
         <p class="text-bg-secondary p-1 rounded ">${item.name}</p>

            <a href="${item.url}" class="btn btn-primary">${item.season < 10 ? "S0" + item.season : "S" + item.season}${item.number < 10 ? " E0" + item.number : "E" + item.number}</a>
           

        </div>

        <p class="card-text my-2">${item.summary.length > 70 ? item.summary.substring(0, 70) + "..." : item.summary}</p>

       

    </div>
</div>`;

        cardContainer.appendChild(section);
        section.innerHTML += makingCard;
    })
}





function liveSearch(data, value) {
    const cards = document.querySelector(".row");
    if (value) {
        cards && cards.remove();
        const filterEpisodes = data.filter(
            ({ name, summary }) =>
                name.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
                summary.toLowerCase().indexOf(value.toLowerCase()) !== -1
        );
        renderEpisodes(filterEpisodes);
    } else {
        cards && cards.remove();
        renderEpisodes(episodes);
    }
}

inputSearch.addEventListener("input", (e) => {
    liveSearch(episodes, e.target.value)
})


function renderOptions(data) {
    data.map(({ name, season, number, id }) => {
        const option = `
        <option value="${id}">${season < 10 ? "S0" + season : "S" + season}${number < 10 ? "E0" + number : "E" + number} - ${name}</option>`;
        seletItems.innerHTML += option;
    });
}


function selectEpisode(data, value) {
    const cards = document.querySelector(".row");
    if (value !== "All-Season") {
        cards && cards.remove();
        const filterEpisode = data.filter(({ id }) => id === parseInt(value));
        renderEpisodes(filterEpisode);
    } else {
        cards && cards.remove();
        renderEpisodes(episodes);
    }
}

seletItems.addEventListener("change", (e) => {
    selectEpisode(episodes, e.target.value);
});


