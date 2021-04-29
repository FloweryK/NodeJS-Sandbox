const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

const app = express();

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')

/* main middleware */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/* routing middleware */
app.use('/', indexRouter)
app.use('/users', usersRouter)

/* listening */
app.listen(port, () => {
    console.log(`server is listening at localhost:${process.env.PORT}`);
});
