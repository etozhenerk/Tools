const fs = require("fs");
const log = require("./log.js");

const { entries } = log;
const duplicates = new Map();
let ans = "";

entries.forEach(({ request }) => {
  if (request.method !== "GET") {
    return;
  }

  const url = request.url;

  if (duplicates.has(url)) {
    duplicates.set(url, duplicates.get(url) + 1);
  } else {
    duplicates.set(url, 1);
  }
});

duplicates.forEach((counter, url) => {
  if (counter >= 2) {
    ans += `Запрос на ${url} повторился ${counter} раз \n`;
  }
});

fs.writeFileSync("duplicates.txt", ans);
