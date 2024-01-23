interface Pages {
  homePage: string;
  errorPage: string;
  productPage?: string;
  cardPage?: string;
}

const http = require("http");
const url = require("url");
const fs = require("fs");
const replaceTemplate = require("../modules/replaceTemplate");

const data = fs.readFileSync("../data/data.json", "utf-8");
const response = JSON.parse(data);




const templatesPages: Pages = {
  homePage: fs.readFileSync(`${__dirname}/../templates/overview.html`, "utf-8"),
  errorPage: fs.readFileSync(`${__dirname}/../templates/404.html`, "utf-8"),
  productPage: fs.readFileSync(
    `${__dirname}/../templates/product.html`,
    "utf-8"
  ),
  cardPage: fs.readFileSync(`${__dirname}/../templates/card.html`, "utf-8"),
};

const server = http.createServer((req: any, res: any) => {
  const { query, pathname } = url.parse(req.url, true);

  switch (pathname) {
    case "/":
      res.writeHead(404, {
        "Content-type": "text/html",
      });

      const cardsHtml = response
        .map((el: string) => replaceTemplate(templatesPages.cardPage!, el))
        .join("");
      const output = templatesPages.homePage.replace(
        "{%PRODUCT_CARDS%}",
        cardsHtml
      );
      res.end(output);
      break;

    case "/overview":
      res.writeHead(200, {
        "Content-type": "text/html",
      });
      const cardsHtml2 = response
        .map((el: string) => replaceTemplate(templatesPages.cardPage!, el))
        .join("");
      const output2 = templatesPages.homePage.replace(
        "{%PRODUCT_CARDS%}",
        cardsHtml2
      );
      res.end(output2);
      break;
    case "/product":
      res.writeHead(200, {
        "Content-type": "text/html",
      });
      const product = response[query.id];      
      const output3 = replaceTemplate(templatesPages.productPage!, product);
      res.end(output3);
      break;
    case "/api":
      res.writeHead(200, {
        "Content-type": "application/json",
      });
      res.end(data);

      break;

    default:
      res.writeHead(404, {
        "Content-type": "text/html",
      });
      res.end(templatesPages.errorPage);
  }
});

server.listen(1234, "127.0.0.1", () =>
  console.log("Server Listening in port:1234")
);
