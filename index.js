const express = require("express");
const connection = require("./database/db");
const cors = require('cors');
const routes = require("./routes/route.js");

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use("/files", express.static("files"));
app.use("/generated", express.static("Generated_pdf"));

const port = 5000;

connection();

app.get("/", (req, res) => {
    res.send("PDF GENERATOR")
})
app.listen(port, () => {
    console.log(`Server is running on the port ${port}`);
})