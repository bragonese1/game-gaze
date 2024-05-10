const myAPI = "84df1d68ff654bf6908d821f0a3cc225"

// game search url: url: `https://api.rawg.io/api/games?key=${myAPI}&search={game-name}}`
// NO NEED TO REPLACE A BLANK SPACE
$.ajax({
    // games?key=${API_KEY}&search=${query}
    url: `https://api.rawg.io/api/games?key=${myAPI}&search={GAME NAME}`,
    method: "GET"
}).then(function (res) {
    console.log(res);
});