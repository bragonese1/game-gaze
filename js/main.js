const myAPI = "84df1d68ff654bf6908d821f0a3cc225";
const openMenuToggle = $(".menu-toggle");
const closeMenuToggle = $(".menu-toggle__btn-close");
const gameCardContainer = $(".game-card-container");
const gameSearchInput = $("#game-search-input");
const sectionTitle = $("#section-title");
const genreList = $(".genre-list");
const platformList = $(".platforms-list");
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
  addGameWebsite(res.results);
});

/**
 * displayGameCard read a given data then display all games on the brower.
 * 
 * @param {object} gameData 
 */
const displayGameCard = function (gameData) {
  // working on game platforms and game genres
  gameData.forEach(function (game) {
    // const url = fetchGameWebsite(game.id);
    // console.log(url);
    const gameCard = $(`
        <div class="game-card d-flex-col">
            <img class="game-card__img" src="${game.background_image}" alt="game-image">
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
                <p class="game-card__brief-info__content">${displayGenresList(game.genres)}</p>
              </li>
              <li class="list-item d-flex-row justify-content-between">
                <p class="game-card__brief-info__title">Chart:</p>
                <p class="game-card__brief-info__content">${game.rating}</p>
              </li>
            </ul>
            <div class="game-card__explore d-flex-row">
                <a id="${game.id}" class="link" target="_blank">EXPLORE MORE</a>
                <p>></p>
            </div>
            </div>
        </div>
        `);
    // fetchGameWebsite(game.id);
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

// <p class="game-card__brief-info__content">${game.genres[0].name}</p>
const displayGenresList = function (genres) {
  genresContainer = [];
  for (genre of genres) {
    genresContainer.push(genre.name);
  }

  return genresContainer.join(", ");
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

// 4: PC
// 187, 18, 16, 15, 27: PS 5, PS 4
// 1, 186, 14, 80: xbox 1, xbox series s/x, 360
// 7, 8, 9, 13: nintendo switch, nintendo 3DS + DS + DSi
// 21: android
// 5: macOS

platformList.on("click", ".btn", function (event) {
  let id = $(event.target).attr("id");
  $("#menu").removeClass("open").addClass("closed");
  gameCardContainer.empty();
  $("#load").css("display", "block"); // for loading function 
  sectionTitle.text(`${id.toUpperCase()} PLATFORM`);
  fetchPlatformGames(id);
});


function fetchPlatformGames(platform) {
  const platformIdArray = ["4", "187, 18, 16, 15, 27",
    "1, 186, 14, 80", "5", "7, 8, 9, 13", "21"];
  let platformId = 0;
  if (platform === "pc") {
    platformId = 0;
  } else if (platform === "xbox") {
    platformId = 2;
  } else if (platform === "playstation") {
    platformId = 1;
  } else if (platform === "macos") {
    platformId = 3;
  } else if (platform === "nintendo") {
    platformId = 4;
  } else {
    platformId = 5;
  }
  $.ajax({
    url: `https://api.rawg.io/api/games?key=${myAPI}&platforms=${platformIdArray[platformId]}`,
    // url: `https://api.rawg.io/api/platforms?key=${myAPI}`,
    method: "GET"
  }).then(function (res) {
    $("#load").css("display", "none");
    console.log(res);
    displayGameCard(res.results);
  });
}

genreList.on("click", ".btn", function (event) {
  let id = $(event.target).attr("id");
  $("#menu").removeClass("open").addClass("closed");
  id = id.split("-")[1];
  gameCardContainer.empty();
  $("#load").css("display", "block");
  sectionTitle.text(`${id[0].toUpperCase() + id.slice(1)} Games`);
  console.log(id);
  fetchGenreGames(id);
});


/**
 * fetchGenreGames fetch data based on selected genre
 * 
 * @param {string} genre game
 */
const fetchGenreGames = function (genre) {
  $.ajax({
    url: `https://api.rawg.io/api/games?key=${myAPI}&genres=${genre}`,
    method: "GET"
  }).then(function (res) {
    $("#load").css("display", "none");
    console.log(res);
    displayGameCard(res.results);
  });
}

const addGameWebsite = function (gameData){
  for(game of gameData){
    // console.log(game.id);
    fetchGameWebsite(game.id);
  }
}

const fetchGameWebsite = function (gameId) {
  // const link = $("a");
  const link = $(`#${gameId}`);
  $.ajax({
    url: `https://api.rawg.io/api/games/${gameId}?key=${myAPI}`,
    method: "GET"
  }).then(function (res) {
    // console.log(res.website);
    link.attr("href", `${res.website}`);
  });
}

const openNav = function () {
  $("#menu").removeClass("closed").addClass("open");
};

const closeNav = function () {
  $("#menu").removeClass("open").addClass("closed");
};

openMenuToggle.on("click", openNav);
closeMenuToggle.on("click", closeNav);