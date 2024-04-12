const express = require('express');
const app = express();
const port = 3000;
const router = require('./router');
const mongodbCredentials = {
  DB_username : 'ansh1515',
  DB_password : 'SwTYk03OUXGS0M5C',
};

console.log('Starting')


const mongodbURI = `mongodb+srv://${mongodbCredentials.DB_username}:${mongodbCredentials.DB_password}@therisecluster.2wo5laf.mongodb.net/?retryWrites=true&w=majority&appName=TheRiseCluster`

console.log('Getting Server Ready.')
app.use('/', router);

const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


const mongoose = require('mongoose');

mongoose.connect(mongodbURI, {
  useNewUrlParser : true,
  useUnifiedTopology: true
}).then(() => console.log(`<<MONGODB CONNECTED>>`))
.catch(err => console.log(err))
;

app.listen(port, () => {
  console.log(`<<Server is running at http://localhost:${port}>>`);
});


