const colors = ["blue", "yellow", "pink", "coral", "gray"];
const colors2 = ["blue", "pink", "gray"];

for (let i = 0; i < colors.length; i++) {
  if (colors[i] !== colors2[i]) {
    colors2.splice(i, 0, colors[i]);
  }
}

console.log(colors2);

let names = ["betmgm", "circa", "draftkings", "fanduel", "williamhill"];

const objArr = [
  {
    site_key: "betmgm",
    odds: {
      h2h: [-220, 180],
    },
  },
  {
    site_key: "circa",
    odds: {
      h2h: [-195, 178],
    },
  },

  {
    site_key: "draftkings",
    odds: {
      h2h: [-192, 178],
    },
  },

  {
    site_key: "fanduel",
    odds: {
      h2h: [-196, 223],
    },
  },

  {
    site_key: "williamhill",
    odds: {
      h2h: [-191, 221],
    },
  },
];

for (let i = 0; i < names.length; i++) {
  if (!objArr[i] || names[i] !== objArr[i].site_key) {
    objArr.splice(i, 0, { site_key: names[i] });
  }
}
console.log(objArr);

for (let game of objArr) {
  let newKey = game.site_key;
  let newObj = {};
  let newObj2 = {};
  if (game.hasOwnProperty("odds")) {
    newObj[newKey] = game.odds.h2h[0];
    newObj2[newKey] = game.odds.h2h[1];
  } else {
    newObj[newKey] = "";
    newObj2[newKey] = "";
  }

  console.log(newObj);
  console.log(newObj2);
}
