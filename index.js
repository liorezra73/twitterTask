const express = require("express");
var cors = require("cors");
const twitterRoute = require("./routes/twitterRoute");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/twitter", twitterRoute);

app.use((err, req, res, next) => {
  res.status(err.code);
  res.render("error", { error: err });
});

const port = process.env.PORT ?? 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
