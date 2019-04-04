const express = require('express');
const app = express();
const mongoose = require('mongoose')
const path = require('path')
const bodyParser = require('body-parser')
const passport = require('passport');
const session = require('express-session')
const cors = require('cors')
const MongoStore = require('connect-mongo')(session);

const port = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "./server/views"));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

mongoose.connect(
  "mongodb://localhost/TinyBlog",
  { useNewUrlParser: true },
  function(err, connection) {
    if (err) throw err;
    else console.log("Connected to mongodb");
  }
);
  

  app.use(session({
  secret: 'tinyBlog',
  cookie: {
    maxAge: 36000000
  },
  store: new MongoStore({ url: 'mongodb://localhost/tinyBlog-session' }),
  resave: true,
  saveUninitialized: true,
  
}))

app.use(passport.initialize());
app.use(passport.session());

//webpack config
if(process.env.NODE_ENV === 'development') {
    console.log('in webpack hot middleware')
    var webpack = require('webpack');
    var webpackConfig = require('./webpack.config');
    var compiler = webpack(webpackConfig);
  
    app.use(require('webpack-dev-middleware')(compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath
    }));
  
    app.use(require('webpack-hot-middleware')(compiler));
  }

app.use(bodyParser.json());

// app.get("/", (req, res) => {
//   res.render("index");
// });

require('./server/modules/passport')(passport)

app.use(require("./server/routes/index"));

app.listen(port, () => {
  console.log(`app is running on localhost:${port}`);
});
