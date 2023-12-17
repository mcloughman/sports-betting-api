

  
  
  
  


function createTopRow(sortedArr) {
    const thead = document.querySelector("thead");
    let row = thead.insertRow();
    let firstCell = row.insertCell(0);
    firstCell.classList.add("first-cell")
    for (let element of sortedArr) {
      if (element === "williamhill_us") {
        element = "WLH";
      }
      if (element === "draftkings") {
        element = "DRK"
      }
      if (element === "betmgm") {
        element = "BMG"
      }
      if (element === "fanduel") {
        element = "FND"
      }
      if (element === "bovada") {
        element = "BOV"
      }
      row.innerHTML += `<td class="top"><span class="top-span">${element}</span></td>`;
    }
  }

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

  const asyncFunc = async (options) => {
    const response = await axios.request(options);
    const gameArray = await response.data.data;
    
  
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
          newObj[newKey] = site.odds.h2h[0];
          newObj2[newKey] = site.odds.h2h[1];
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
  