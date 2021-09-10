const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const methodOverride = require('method-override');
const path = require('path');
const app = express();
const port = 3000;

const route = require('./routes');
const db = require('./config/db');

// Connect to DB
db.connect();

app.use(express.static(path.join(__dirname, 'public')));

// Middleware
// Dạng form HTML
app.use(
    express.urlencoded({
        extended: true,
    }),
);

// Dạng gửi từ code Javascript
app.use(express.json());

app.use(methodOverride('_method'));

// Example about Middleware

// app.use(bacBaoVe);

// function bacBaoVe(req, res, next) {
//     if (['vethuong', 'vevip'].includes(req.query.ve)) {
//         req.face = 'Gach gach gach!!!';
//         return next();
//     }
//     res.status(430).json({
//         message: 'Access Denied'
//     });
// }

app.get(
    '/middleware',
    function (req, res, next) {
        if (['vethuong', 'vevip'].includes(req.query.ve)) {
            req.face = 'Gach gach gach!!!';
            return next();
        }
        res.status(430).json({
            message: 'Access Denied',
        });
    },
    function (req, res, next) {
        res.json({
            message: 'Successfully!',
            face: req.face,
        });
    },
);

// HTTP logger
// app.use(morgan('combined'))

// Template engine
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
        },
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Routes init
route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
