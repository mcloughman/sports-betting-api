const table = document.querySelector("table");

const hockeyOptions = {
  method: "GET",
  url: "https://odds.p.rapidapi.com/v1/odds",
  params: {
    region: "us",
    sport: "icehockey_nhl",
    oddsFormat: "american",
    market: "h2h",
    dateFormat: "iso",
  },
  headers: {
    "X-RapidAPI-Key": "fa80fde8e7msh6262ea8d36012dap1174afjsn8a7c974cdfbc",
    "X-RapidAPI-Host": "odds.p.rapidapi.com",
  },
};

let sportsbooks = [
  "fanduel",
  "draftkings",
  "williamhill_us",
  "bovada",
  "betmgm",
];
sportsbooks.sort();







createTopRow(sportsbooks);

asyncFunc(hockeyOptions);
