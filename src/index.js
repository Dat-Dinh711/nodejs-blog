const path = require('path');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const handlebars = require('express-handlebars');

const SortMiddleware = require('./app/middlewares/SortMiddleware');

const route = require('./routes');
const db = require('./config/db');

// Connect to DB
db.connect();

const app = express();
const port = 3000;

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

// Custom middlewares
app.use(SortMiddleware);

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
            sortable: (field, sort) => {
                const sortType = field === sort.column ? sort.type : 'default';

                const icons = {
                    default: 'oi oi-elevator',
                    asc: 'oi oi-sort-ascending',
                    desc: 'oi oi-sort-descending',
                };
                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc',
                };
                const icon = icons[sortType];
                const type = types[sortType];

                return (
                    '<a href="?_sort&column=' +
                    field +
                    '&type=' +
                    type +
                    '"><span class="' +
                    icon +
                    '"></span></a>'
                );
            },
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
