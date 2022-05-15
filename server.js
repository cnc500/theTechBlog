const express = require('express');
const sequelize = require('./config/connection');
const exphbs = require('express-handlebars');
const routes = require('./controllers');

const hbs = exphbs.create({});

const app = express();
const PORT = process.env.PORT || 3001;

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(routes);

// Force is false so program does not drop database each time
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log('Testing 123');
    });
});