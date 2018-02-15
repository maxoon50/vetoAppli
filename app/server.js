const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const morgan = require('morgan');
const app = express();
const routerLogin = require('./router/routerLogin');
const routerHome = require('./router/routerHome');
app.set('view engine', 'ejs');
app.set("views", "./public/views");
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(session({
    key: 'user_sid',
    secret: 'sùknsecretk3Y',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));
let expiredSession = (req, res, next) => {
    if (!req.session.user || !req.cookies.user_sid) {
        res.redirect('/login');
    }
    else {
        next();
    }
};
app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');
    }
    next();
});
app.use('/', routerLogin);
app.use(expiredSession, (req, res, next) => { next(); });
app.use('/home', routerHome);
app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!");
});
app.listen(3000, () => {
    console.log('listening on port 3000');
});
//# sourceMappingURL=server.js.map