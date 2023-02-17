"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet_1 = require("helmet");
const authRoutes_1 = require("./routes/authRoutes");
dotenv.config();
const server = express();
server.use(express.urlencoded({
    extended: true
}));
server.use(express.json());
server.use(cors());
server.use((0, helmet_1.default)());
server.use('/login', authRoutes_1.authRouter);
server.listen(process.env.PORT, () => {
    console.log("Certifyer Backend is up and running on port", process.env.PORT);
});
