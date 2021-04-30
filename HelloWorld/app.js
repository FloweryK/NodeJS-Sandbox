const express = require('express');
const bodyParser = require('body-parser');

/* port */
const port = process.env.PORT || 3000;

/* app */
const app = express();

/* routers */
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const memosRouter = require('./routes/memos')

/* main middleware */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/* routing middleware */
app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/memos', memosRouter)

/* listening */
app.listen(port, () => {
    console.log(`server is listening at localhost:${process.env.PORT}`);
});
