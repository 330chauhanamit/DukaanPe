const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8000;
const {MONGOURI} = require('./config/keys')


app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

dotenv.config();
// console.log(PORT);

mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology: true

})
// mongoose.connect(process.env.DATABASE_ACCESS || process.env.MONGOURI, () => console.log("Connected"));

require("./models/user");
require("./models/post");

app.use(express.json());
app.use(cors());

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.use(require("./routes/auth"));
app.use(require("./routes/user"));
app.use(require("./routes/post"));

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => console.log("Listening"));
