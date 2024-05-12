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
});

const openNav = function(){
    $("#menu").removeClass("closed").addClass("open");
}

const closeNav = function (){
    $("#menu").removeClass("open").addClass("closed");
}

openMenuToggle.on("click", openNav);
closeMenuToggle.on("click", closeNav);