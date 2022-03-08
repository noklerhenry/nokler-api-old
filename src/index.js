const express = require("express");
const { PrismaClient } = require("@prisma/client");
const bodyParser = require("body-parser");
const routes = require("./routes");

const PORT = process.env.PORT || 3001;

const app = express();
const prisma = new PrismaClient();

app.use(bodyParser.json({ limit: "50mb" }));

app.use("/", routes);

const server = app.listen(PORT, () =>
  console.log(`🚀 Server ready at: http://localhost:${PORT}`)
);
