require('dotenv').config();
import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import configViewEngine from './config/viewEngine';
import initWebRoutes from './routes/web';
import connectionDB from './config/connectDB';

const app = express();
global.__basedir = __dirname + '/..';

// config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// for parsing multipart/form-data
// app.use(upload.array());

configViewEngine(app);
initWebRoutes(app);

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + '/resources/static/assets/uploads/');
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

connectionDB();

let port = process.env.PORT || 6969;

app.listen(port, () => {
  console.log(`Server running at: http://localhost:${port}`);
});
