const express = require('express');
const bearerToken = require('express-bearer-token');
const router = require('./routes/routes');
const app = express();
const cors = require('cors');
const db = require('./config/dbconfig');

const port = 5000;
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(bearerToken());

db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

app.use(router);

app.listen(port, () => { console.log(`Server start at http://localhost:${port}`); });
