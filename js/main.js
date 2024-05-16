const myAPI = "84df1d68ff654bf6908d821f0a3cc225";
const openMenuToggle = $(".menu-toggle");
const closeMenuToggle = $(".menu-toggle__btn-close");
const gameCardContainer = $(".game-card-container");
const gameSearchInput = $("#game-search-input");
const sectionTitle = $("#section-title");
const genreList = $(".genre-list");
const platformList = $(".platforms-list");
const exlore = $(".explore");
const gameDetail = $(".game-detail");

let nextPage = "";
let isFetching = false;
let isGameDetailOn = false;
// const urlSearchGame = `https://api.rawg.io/api/games?key=${myAPI}&search=dynasty warriors`;

// game search url: url: `https://api.rawg.io/api/games?key=${myAPI}&search={game-name}}`
// NO NEED TO REPLACE A BLANK SPACE
// id:716864
$.ajax({
  url: `https://api.rawg.io/api/games?key=${myAPI}`,
  method: "GET",
}).then(function (res) {
  $("#load").css("display", "none");
  sectionTitle.text("Top Games");
  if(res.next) nextPage = res.next;
  // console.log(res);
  displayGameCard(res.results);
  addGameWebsite(res.results);
});

/**
 * WHEN users scroll down and reach the end of the page
 * THEN system will deploy more games
 */
$(window).on("scroll", function () {
  if (isFetching || isGameDetailOn) return;  

  // console.log(Math.ceil(window.innerHeight + window.scrollY));
  // console.log(document.body.offsetHeight);

  if (Math.ceil(window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    fetchMoreGames();
  }
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
                <div id="${game.id}" class="explore">EXPLORE MORE</div>
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
        <li class="list-item">
          <div id=${game.id} class="explore">${game.name}</div>
        </li>`);
        $("#game-search-list").append(item);
        // addGameWebsite(res.results);
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
  isGameDetailOn = false;
  gameDetail.empty();
  let id = $(event.target).attr("id");
  $("#menu").removeClass("open").addClass("closed");
  gameCardContainer.empty();
  $("#load").css("display", "block"); // for loading function 
  sectionTitle.text(`${id.toUpperCase()} PLATFORM`);
  fetchPlatformGames(id);
});

/**
 * fetchPlatformGames fetch games based on platform
 * platformIdArray contains all possible id of a platform. Since one platform
 * can have more than 1 serie, it can have miltiple id in the list
 * [0] PC: 4
 * [1] xbox: 187, 18, 16, 15, 27
 * [2] ps: 1, 186, 14, 80
 * [3] macOS: 5
 * [4] nintendo: 7, 8, 9, 13
 * [5] android: 21
 * 
 * @param {string} platform selected by users.
 */
const fetchPlatformGames = function (platform) {
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
    if(res.next) nextPage = res.next;
    $("#load").css("display", "none");
    console.log(res);
    displayGameCard(res.results);
  });
}

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
    console.log(res);
    if(res.next) nextPage = res.next;
    $("#load").css("display", "none");
    // console.log(res);
    displayGameCard(res.results);
  });
}

genreList.on("click", ".btn", function (event) {
  isGameDetailOn = false;
  gameDetail.empty();
  let id = $(event.target).attr("id");
  $("#menu").removeClass("open").addClass("closed");
  id = id.split("-")[1];
  gameCardContainer.empty();
  $("#load").css("display", "block");
  sectionTitle.text(`${id[0].toUpperCase() + id.slice(1)} Games`);
  console.log(id);
  fetchGenreGames(id);
});


const addGameWebsite = function (gameData) {
  for (game of gameData) {
    // console.log(game.id);
    fetchGameWebsite(game.id);
  }
}

/**
 * 
 * 
 * @param {string} gameId of a game
 */
const fetchGameWebsite = function (gameId) {
  // const link = $("a");
  const link = $(`#${gameId}`);
  $.ajax({
    url: `https://api.rawg.io/api/games/${gameId}?key=${myAPI}`,
    method: "GET"
  }).then(function (res) {
    // console.log(res);
    // console.log(res.website);
    link.attr("href", `${res.website}`);
  });
}

const fetchMoreGames = function () {
  isFetching = true;
  console.log(nextPage);
  if(nextPage == null) return;
  $.ajax({
    url: nextPage,
    method: "GET",
  }).then(function (res) {
    if(res.next) nextPage = res.next;
    else nextPage = null;
    displayGameCard(res.results);
    addGameWebsite(res.results);
    isFetching = false;
  });
}

$(document).on("click", ".explore", function(event){
  isGameDetailOn = true;
  gameDetail.empty();
  gameSearchInput.val("");
  $("#game-search-list").empty();
  const gameId = $(event.target).attr("id");
  fetchGameDetail(gameId)
});

const fetchGameDetail = function(gameId){
  $.ajax({
    url: `https://api.rawg.io/api/games/${gameId}?key=${myAPI}`,
    method: "GET"
  }).then(function (res){
    console.log(res);
    displayGameDetail(res);
  });
}

const displayGameDetail = function(gameData){ 
  sectionTitle.text("");
  gameCardContainer.empty();
  console.log(gameData);
  gameDeTailContainer = $(`
  <div class="game-detail__header d-flex-col">
    <img class="game-detail__img" src="${gameData.background_image}">
    <div class="p-1">
        <h2 class="game-detail__title">${gameData.name}</h2>
        <div class="d-flex-row game-detail__creator">
            <p class="text-color-secondary text-bold">Developers:</p>
            <p class="text-size-142">${getDevelopers(gameData.developers)}</p>
        </div>
        <div class="d-flex-row justify-content-between game-detail__published-date">
            <p class="text-color-secondary text-bold">Published date:</p>
            <p class="text-size-142">${gameData.released}</p>
        </div>
    </div>
  </div>
<div class="game-detail__body">
  <div class="mb-1">
      <p class="text-size-142 text-color-secondary text-bold">About</p>
      <p>${gameData.description_raw}</p>
  </div>
  <div>
      <div class="mb-1 game-detail__platforms">
          <p class="text-color-secondary text-bold">Platforms</p>
          <ul class="list">
              <li class="list-item">
                  <p class="text-size-142">OS: Windows</p>
              </li>
              <li class="list-item">
                  <p class="text-size-142">PlayStations: 3, 4, 5</p>
              </li>
              <li class="list-item">
                  <p class="text-size-142">Xbox: One</p>
              </li>
          </ul>
      </div>
      <div class="mb-1">
          <p class="text-color-secondary text-bold">Genres:</p>
          <ul class="list">
              <li class="list-item text-size-142">Action</li>
              <li class="list-item text-size-142">Shooter</li>
          </ul>
      </div>
  </div>
  <div class="mb-3">
      <p class="text-color-secondary text-bold">website</p>
      <a href="${gameData.website.length != 0 ? gameData.website : "#"}" class="link text-size-142 text-color-primary" target="_blank">${gameData.website.length != 0 ? "Website" : "N/A"}</a>
  </div>
</div>
  `);

  gameDetail.append(gameDeTailContainer);
}


const getDevelopers = function (developers){
  const developersArr = [];
  console.log(developers);
  for(dev of developers){
    developersArr.push(dev.name);
  }

  return developersArr.join(", ");
}

const openNav = function () {
  $("#menu").removeClass("closed").addClass("open");
};

const closeNav = function () {
  $("#menu").removeClass("open").addClass("closed");
};

openMenuToggle.on("click", openNav);
closeMenuToggle.on("click", closeNav);