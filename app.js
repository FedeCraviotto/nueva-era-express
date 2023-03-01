const express = require('express');
const path = require('path');
require('dotenv').config();
const cors = require('cors');

// Routers
const mainRouter = require('./routes/main');
const productsRouter = require('./routes/products');
const usersRouter = require('./routes/users');
const cartRouter = require('./routes/cart');
const aboutRouter = require('./routes/about');
const contactRouter = require('./routes/contact');

//API Routers
const productsRouterAPI = require('./routes/api/products');
const usersRouterAPI = require('./routes/api/users');
const cartRouterAPI = require('./routes/api/cart');
// middlewares
const methodOverride = require('method-override');
const session = require('cookie-session');
const cookies = require('cookie-parser');
const userLoggedValidator = require('./middlewares/userLoggedValidator');
const bodyParser = require('body-parser');

const app = express();

const PORT = process.env.PORT || 3000;

// template engines
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// implementacion middlewares
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(bodyParser.text());
app.use(
    session({
        secret: 'es un secreto',
        resave: false,
        saveUninitialized: false,
    })
);
app.use(cookies());
app.use(userLoggedValidator);

// Routers
app.use('/', mainRouter);
// app.use('/', (req, res) =>{
//     res.send({msg: 'Todo bien'});
// })
app.use('/products', productsRouter);
app.use('/users', usersRouter);
app.use('/cart', cartRouter);
app.use('/about', aboutRouter);
app.use('/contact', contactRouter);

//Routers API
app.use('/api/products', productsRouterAPI);
app.use('/api/users', usersRouterAPI);
app.use('/api/cart', cartRouterAPI);

app.use((req, res, next) => {
    res.status(404).render('404', { title: 'pagina no encontrada' });
});

// Levantamos servidor
// app.listen(3001, () => {
//     console.log(`Server is running on port ${3001}`);
// });
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});