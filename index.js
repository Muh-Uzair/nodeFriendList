// VARIABLES
const http = require("http");
const url = require("url");
const fs = require("fs");
const { json } = require("stream/consumers");
const prepareCard = require("./modules/prepareCard");
const prepareSingleFriendDetails = require("./modules/prepareSingleFriendDetails");

const nodeFriendList = fs.readFileSync("./data/nodeFriendList.json", "utf-8");
const dataFriendList = JSON.parse(nodeFriendList);

const templateOverview = fs.readFileSync(
  "./templates/templateOverview.html",
  "utf-8"
);

const friendListCard = fs.readFileSync(
  "./templates/templateCard.html",
  "utf-8"
);

const htmlFriendDetail = fs.readFileSync(
  "./templates/templateFriendDetail.html",
  "utf-8"
);

// LOGIC
const server = http.createServer((req, res) => {
  const actualUrl = req.url;
  const { query, pathname } = url.parse(req.url, true);

  // DIVIDER HOME
  if (pathname === "/" || pathname === "/home") {
    const allCardMarkUp = dataFriendList
      .map((val) => prepareCard(val, friendListCard))
      .join("");

    const output = templateOverview.replace(
      "{%LIFRIENDSLISTCARD%}",
      allCardMarkUp
    );
    res.writeHead(200, {
      "Content-type": "text/html",
      "my-own-header": "overview",
    });
    res.end(output);
  }
  // DIVIDER friendDetail
  else if (pathname === "/friendDetail") {
    let friendDetail = dataFriendList[query.id];

    const markUpFriendDetail = prepareSingleFriendDetails(
      friendDetail,
      htmlFriendDetail
    );

    const output = templateOverview.replace(
      "{%LIFRIENDSLISTCARD%}",
      markUpFriendDetail
    );

    res.writeHead(200, {
      "Content-type": "text/html",
    });

    res.end(output);
  }
  // DIVIDER nodeFriendListData
  else if (pathname === "/nodeFriendListData") {
    res.writeHead(200, {
      "Content-type": "application/json",
      "my-own-header": "nodeFriendList",
    });
    res.end(nodeFriendList);
  }
  // DIVIDER page not found
  else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "Error 404",
    });
    const markUp = `<div> <h2>Page not found</h2> <a href="/"> <button>Home</button> </a></div>  `;
    res.end(markUp);
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("server is running");
});
