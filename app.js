import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import db from './mongodb/db.js';
import history from 'connect-history-api-fallback';
import connectMongo from 'connect-mongo';
import config from './config/default'
import session from 'express-session';
import appRouter from './routes/index'

const app = express();

// app.all('*', (req, res, next) => {
//     res.header("Access-Control-Allow-Origin", req.headers.origin || '*');
//     res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
//     res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//     res.header("Access-Control-Allow-Credentials", true); //可以带cookies
//     res.header("X-Powered-By", '3.2.1')
//     if (req.method == 'OPTIONS') {
//         res.send(200);
//     } else {
//         next();
//     }
// });


app.use(cookieParser())
app.use(bodyParser.json())
const MongoStore = connectMongo(session);

app.use(session({
    name: config.session.name,
    secret: config.session.secret,
    resave: true,
    saveUninitialized: false,
    cookie: config.session.cookie,
    store: new MongoStore({
        url: config.dburl
    })
}));

app.get('/public/img/*', function (req, res) {
    res.sendFile( __dirname + "/" + req.url );
    console.log("Request for " + req.url + " received.");
})

app.use(history());

appRouter(app);
app.use(express.static('./public'));
app.listen(9090,function(){
    console.log('Node app start at port 9090')
});