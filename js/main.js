const myAPI = "84df1d68ff654bf6908d821f0a3cc225"
const openMenuToggle = $(".menu-toggle");
const closeMenuToggle = $(".menu-toggle__btn-close");
const gameCardContainer = $(".game-card-container");

// game search url: url: `https://api.rawg.io/api/games?key=${myAPI}&search={game-name}}`
// NO NEED TO REPLACE A BLANK SPACE
// id:716864
$.ajax({
    // games?key=${API_KEY}&search=${query}
    url: `https://api.rawg.io/api/games?key=${myAPI}`,
    method: "GET"
}).then(function (res) {
    console.log(res);
    displayGameCard(res.results)
});

// game data
function displayGameCard(gameData) {
    gameCardContainer.empty();
    // working on game platforms and game genres
    gameData.forEach(function (game) {
        const gameCard = $(`
        <div class="game-card d-flex-col">
            <img class="game-card__image" src="${game.background_image}" alt="game-image">
            <div class="game-card__content d-flex-col">
                <ul class="list game-card__platforms d-flex-row">
                <li class="list__item">${game.platforms[0].platform.name}</li>
                
                </ul>
            <h2 class="game-card__title">${game.name}</h2>
            <ul class="list game-card__brief-info">
            <li class="list-item d-flex-row justify-content-between">
            <p class="game-card__brief-info__title">Release Date:</p>
            <p class="game-card__brief-info__content">${game.released}</p>
            </li>
            <li class="list-item d-flex-row justify-content-between">
            <p class="game-card__brief-info__title">Genres:</p>
            <p class="game-card__brief-info__content">${game.genres[0].name}</p>
            </li>
            <li class="list-item d-flex-row justify-content-between">
            <p class="game-card__brief-info__title">Chart:</p>
            <p class="game-card__brief-info__content">${game.rating}</p>
            </li>
            </ul>
        </div>
        `);
        gameCardContainer.append(gameCard);
    });
}


const openNav = function(){
    $("#menu").css("height", "100%");
}

const closeNav = function (){
    $("#menu").css("height", "0%");
}

openMenuToggle.on("click", openNav);
closeMenuToggle.on("click", closeNav);