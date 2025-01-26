const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  methods: ['POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'x-api-key'], 
};

app.use(cors(corsOptions));
app.use(express.json());

app.options('*', cors(corsOptions));

const PORT = 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port 3000");
});