const express = require('express');
const sequelize = require('./config/connection');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const session = require ('express-session');
const hbs = exphbs.create({});
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;
const sequelizeStore = require('connect-session-sequelize')
(session.Store);
const sess = {
    secret: 'Super Secret Secret',
    cookie: {maxAge: 200000},
    resave: false,
    saveUninitialized: true,
    store: new sequelizeStore({
        db: sequelize
    }) 
}
app.use(session(sess))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(routes);

// Force is false so program does not drop database each time
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log('Testing 123');
    });
});