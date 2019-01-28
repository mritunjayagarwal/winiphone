const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const compression = require('compression');
const container = require('./container');

container.resolve(function(main){
    const app = ShowExpress();

    function ShowExpress(){
        const app = express();
        app.listen(process.env.PORT || 9090, function(){
            console.log('Server Start');
        });

        ConfigureExpress(app);

        const router = require('express-promise-router')();
        main.SetRouting(router);
        app.use(router);
    }

    function ConfigureExpress(app){
        mongoose.Promise = global.Promise;
        mongoose.connect('mongodb://modicare:zoniakk1@ds213715.mlab.com:13715/modicare', { useNewUrlParser: true});

        app.use(helmet());
        app.use(compression());

        app.use(express.static('public'));
        app.use(cookieParser());
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true}));
        app.set('view engine', 'ejs');
        app.use(session({
            resave: true,
            saveUninitialized: true,
            secret: 'this_is_a_secret',
            store: new MongoStore({ mongooseConnection: mongoose.connection})    
        }));
    }
})