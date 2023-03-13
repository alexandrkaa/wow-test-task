const express = require(`express`);
const path = require(`path`);

const app = express();
const PORT = 3000;
const DIST_PATH = path.join(__dirname, `/dist`);

app.use(function (req, res, next) {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self' localhost https://wows-static-production.wgcdn.co https://vortex.worldofwarships.eu; script-src 'self' localhost 'unsafe-eval'; font-src 'self' localhost https://fonts.googleapis.com https://fonts.gstatic.com https://wows-static-production.wgcdn.co http://wows-static-production.wgcdn.co https://vortex.worldofwarships.eu; style-src 'self' 'unsafe-inline' localhost https://cdn.jsdelivr.net https://fonts.googleapis.com; img-src 'self' data: localhost https://wows-static-production.wgcdn.co https://vortex.worldofwarships.eu https://glossary-wows-global.gcdn.co;"
  );
  next();
});

app.use(express.static(DIST_PATH));

app.get("/*", (req, res) => {
  return res.sendFile(path.join(`${__dirname}/../dist/index.html`));
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Listening on port 3000...`);
});
