const express = require("express");
const bookRouter = require("./routes/book.router");
const config = require("./utils/config");
const cors = require("cors");
const { connectToMongoDB } = require("./services/db.service");

const app = express();
const port = config.get("PORT", 6000);
const host = config.get("HOST", "localhost");

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/books", bookRouter);

app.use((err, req, res, next) => {
  res.status(500).send("500 Server Error");
});

app.use((req, res) => {
  res.status(404).send("404 Not found");
});

connectToMongoDB().then(() => {
  app.listen(port, () => {
    console.log(`[server]: Server is running at ${host}:${port}`);
  });
});
