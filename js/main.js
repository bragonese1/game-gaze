const myAPI = "84df1d68ff654bf6908d821f0a3cc225";
const openMenuToggle = $(".menu-toggle");
const closeMenuToggle = $(".menu-toggle__btn-close");
const gameCardContainer = $(".game-card-container");
const gameSearchInput = $("#game-search-input");
const sectionTitle = $("#section-title");
const genreList = $(".genre-list");
// const urlSearchGame = `https://api.rawg.io/api/games?key=${myAPI}&search=dynasty warriors`;

// game search url: url: `https://api.rawg.io/api/games?key=${myAPI}&search={game-name}}`
// NO NEED TO REPLACE A BLANK SPACE
// id:716864
$.ajax({
  url: `https://api.rawg.io/api/games?key=${myAPI}&metacritic=80,100`,
  method: "GET",
}).then(function (res) {
  $("#load").css("display", "none");
  sectionTitle.text("Top Games");
  console.log(res);
  displayGameCard(res.results);
});

/**
 * displayGameCard read a given data then display all games on the brower.
 * 
 * @param {object} gameData 
 */
const displayGameCard = function (gameData) {
  gameCardContainer.empty();
  // working on game platforms and game genres
  gameData.forEach(function (game) {
    const gameCard = $(`
        <div class="game-card d-flex-col">
            <img class="game-card__img" src="${game.background_image
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


/**
 * displayPlatformList reads data from a game and display all platforms requirement on browers.
 * To avoid duplicating platforms, displayPlatformList generate an array to keep track which plat-
 * form that has been displayed. The following index will indicate a platform:
 * [0]: PC or Windows
 * [1]: PlayStation
 * [2]: Xbox
 * [3]: macOS
 * [4]: Nintendo
 * [5]: Android
 * 
 * @param {array} platforms a list platform of a game
 * @returns a list of li elements containing game platforms of a particular game
 */
const displayPlatformList = function (platforms) {
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

// $.ajax({
//   url: urlSearchGame,
//   method:"GET"
// }).then(function(res){
//   console.log(res);
// });
gameSearchInput.on("keyup", function () {
  let input = gameSearchInput.val().trim();
  if (input.length > 1) {
    listGamesSearch(input);
  } else {
    $("#game-search-list").empty();
  }
});

/**
 * listGamesSearch list all possible games based on given input from users
 * 
 * @param {string} input data that user enter in the text box
 */
const listGamesSearch = function (input) {
  console.log(input);
  const urlSearchGame = `https://api.rawg.io/api/games?key=${myAPI}&search=${input}}`;
  $.ajax({
    url: urlSearchGame,
    method: "GET",
    data: { query: input },
    success: function (res) {
      // console.log(res.results);
      $("#game-search-list").empty();
      res.results.forEach(function (game) {
        console.log(game);
        const item = $(`
        <li class="list-item" id=${game.id}>
          ${game.name}
        </li>`);
        $("#game-search-list").append(item);
      });
    },
    error: function (xhr, status, error) {
      console.log("Error", error);
    }
  })
}

const openNav = function () {
  $("#menu").removeClass("closed").addClass("open");
};

const closeNav = function () {
  $("#menu").removeClass("open").addClass("closed");
};

openMenuToggle.on("click", openNav);
closeMenuToggle.on("click", closeNav);
