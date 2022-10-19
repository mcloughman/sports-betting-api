const options = {
  method: "GET",
  url: "https://odds.p.rapidapi.com/v1/odds",
  params: {
    region: "us",
    sport: "americanfootball_nfl",
    oddsFormat: "american",
    market: "spreads",
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
  "circasports",
  "betmgm",
];
sportsbooks.sort();

const asyncSpreads = async () => {
  let response = await axios.request(options);
  console.log(response);
  const gameArray = await response.data.data;
  console.log(gameArray);

  // const { sites, teams, home_team: h } = gameArray[0];
  for (let game of gameArray) {
    const { sites, teams, home_team: h } = game;
    let initialGameArr = [[], []];
    initialGameArr[0].push(teams[0]);
    initialGameArr[1].push(teams[1]);

    let goodSites = sites.filter((site) => {
      return sportsbooks.includes(site.site_key);
    });
    goodSites.sort((a, b) => (a.site_key > b.site_key ? 1 : -1));
    if (goodSites.length !== sportsbooks.length) {
      for (let i = 0; i < sportsbooks.length; i++) {
        if (!goodSites[i] || sportsbooks[i] !== goodSites[i].site_key) {
          goodSites.splice(i, 0, { site_key: sportsbooks[i] });
        }
      }
    }
    // console.log(goodSites);
    // now we need to iterate over goodSites to create our game objs
    for (let site of goodSites) {
      let newKey = site.site_key;
      let newObj = {};
      let newObj2 = {};

      if (site.hasOwnProperty("odds")) {
        newObj[newKey] = site.odds.spreads.points[0];
        newObj2[newKey] = site.odds.spreads.points[1];
      } else {
        newObj[newKey] = "";
        newObj2[newKey] = "";
      }
      initialGameArr[0].push(newObj);
      initialGameArr[1].push(newObj2);
    }
    // console.log(initialGameArr);
    if (initialGameArr[0][0] === h) {
      [initialGameArr[0], initialGameArr[1]] = [
        initialGameArr[1],
        initialGameArr[0],
      ];
    }
    // console.log(initialGameArr);
    createMain(initialGameArr);
  }
};

function createTopRow(sortedArr) {
  const thead = document.querySelector("thead");
  let row = thead.insertRow();
  row.insertCell(0);
  for (let element of sortedArr) {
    if (element === "williamhill_us") {
      element = "william";
    }
    row.innerHTML += `<td class="top">${element}</td>`;
  }
}
createTopRow(sportsbooks);

function createMain(arr) {
  // console.log(arr[0]);
  const tbody = document.querySelector("tbody");

  let gameRow = tbody.insertRow();
  gameRow.classList.add("game-row");
  gameRow.innerHTML = `<td>${arr[0][0]} <br> ${arr[1][0]}</td>
    
    <td><span>${Object.values(arr[0][1])}</span> <br> <span>${Object.values(
    arr[1][1]
  )}</span></td>
    <td><span>${Object.values(arr[0][2])}</span> <br> <span>${Object.values(
    arr[1][2]
  )}</span></td>
    <td><span>${Object.values(arr[0][3])}</span> <br> <span>${Object.values(
    arr[1][3]
  )}</span></td>
    <td><span>${Object.values(arr[0][4])}</span> <br> <span>${Object.values(
    arr[1][4]
  )}</span></td>
    <td><span>${Object.values(arr[0][5])}</span> <br> <span>${Object.values(
    arr[1][5]
  )}</span></td>
  
    `;
  const tds = document.querySelectorAll("td");
  for (let td of tds) {
    td.classList.add("cell");
  }
  const spans = document.querySelectorAll("span");
  for (let span of spans) {
    span.classList.add("span");
  }
}

asyncSpreads();
