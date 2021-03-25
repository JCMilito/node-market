import express from 'express';

import { router } from './router';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/pages'));

app.listen(3000, function() {
    console.log('Server is listening on port 3000');
});