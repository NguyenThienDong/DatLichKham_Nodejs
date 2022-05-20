require("dotenv").config();
import express from "express";
import bodyParser from "body-parser";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import connectionDB from "./config/connectDB";

const app = express();

// config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

configViewEngine(app);
initWebRoutes(app);

connectionDB();

let port = process.env.PORT || 6969;

app.listen(port, () => {
  console.log(`Server running at: http://localhost:${port}`);
});
