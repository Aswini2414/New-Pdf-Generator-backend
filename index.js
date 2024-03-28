const express = require("express");
const connection = require("./database/db");
const cors = require('cors');
const routes = require("./routes/route.js");
const path = require("path");


const app = express();
const __dirname1 = path.resolve();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use("/files", express.static(path.join(__dirname1,"./files")));
app.use("/generated", express.static(path.join(__dirname1,"./Generated_pdf"));

const port = 5000;

connection();

app.listen(port, () => {
    console.log(`Server is running on the port ${port}`);
})