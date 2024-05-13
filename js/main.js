const myAPI = "84df1d68ff654bf6908d821f0a3cc225";
const openMenuToggle = $(".menu-toggle");
const closeMenuToggle = $(".menu-toggle__btn-close");
const gameCardContainer = $(".game-card-container");

// game search url: url: `https://api.rawg.io/api/games?key=${myAPI}&search={game-name}}`
// NO NEED TO REPLACE A BLANK SPACE
// id:716864
$.ajax({
  // games?key=${API_KEY}&search=${query}
  url: `https://api.rawg.io/api/games?key=${myAPI}`,
  method: "GET",
}).then(function (res) {
  console.log(res);
  displayGameCard(res.results);
});

// game data
function displayGameCard(gameData) {
  gameCardContainer.empty();
  // working on game platforms and game genres
  gameData.forEach(function (game) {
    const gameCard = $(`
        <div class="game-card d-flex-col">
            <img class="game-card__img" src="${
              game.background_image
            }" alt="game-image">
            <div class="game-card__content d-flex-col">
                <ul class="list game-card__platforms d-flex-row">
                 ${displayPlatformList(game.platforms)}
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
            <div class="game-card__explore d-flex-row">
                <a href="#" class="link">EXPLORE MORE</a>
                <p>></p>
            </div>
            </div>
        </div>
        `);
    gameCardContainer.append(gameCard);
  });
}

// 0: PC 1: PlayStation 2: Xbox 3: macOS 4: Nintendo 5: Android
function displayPlatformList(platforms) {
  var platformContainer = [];
  const visitedPlatform = [false, false, false, false, false, false];
  for (let platform of platforms) {
    if (platform.platform.name === "PC" && !visitedPlatform[0]) {
      platformContainer.push(
        `<li class="list-item"><img src="./images/windows.png" class="platform-icon"></li>`
      );
      visitedPlatform[0] = true;
    } else if (
      platform.platform.name.split(" ")[0] === "PlayStation" &&
      !visitedPlatform[1]
    ) {
      platformContainer.push(
        `<li class="list-item"><img src="./images/playstation.png" class="platform-icon"></li>`
      );
      visitedPlatform[1] = true;
    } else if (
      platform.platform.name.split(" ")[0] === "Xbox" &&
      !visitedPlatform[2]
    ) {
      platformContainer.push(
        `<li class="list-item"><img src="./images/xbox-logo.png" class="platform-icon"></li>`
      );
      visitedPlatform[2] = true;
    } else if (
      platform.platform.name.split(" ")[0] === "macOS" &&
      !visitedPlatform[3]
    ) {
      platformContainer.push(
        `<li class="list-item"><img src="./images/mac-os-logo.png" class="platform-icon"></li>`
      );
      visitedPlatform[3] = true;
    } else if (
      platform.platform.name.split(" ")[0] === "Nintendo" &&
      !visitedPlatform[4]
    ) {
      platformContainer.push(
        `<li class="list-item"><div class="platform-icon__nintendo">N</div></li>`
      );
      visitedPlatform[4] = true;
    } else {
      if (!visitedPlatform[5])
        platformContainer.push(
          `<li class="list-item"><img src="./images/android-logo.png" class="platform-icon"></li>`
        );
      visitedPlatform[5] = true;
    }
  }
  return platformContainer.join("");
}

const openNav = function () {
  $("#menu").removeClass("closed").addClass("open");
};

const closeNav = function () {
  $("#menu").removeClass("open").addClass("closed");
};

openMenuToggle.on("click", openNav);
closeMenuToggle.on("click", closeNav);
