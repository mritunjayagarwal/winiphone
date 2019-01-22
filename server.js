const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const helmet = require('helmet');
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
        app.use(helmet());
        app.use(compression());

        app.use(express.static('public'));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true}));
        app.set('view engine', 'ejs');
    }
})