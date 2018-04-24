const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const serveStatic = require('serve-static');
const history = require('connect-history-api-fallback');

const incomingOriginWhitelist = [
  //for machines that use 'origin'
  'http://localhost:3000',
  //for machines that use 'host'
  'localhost:3000',
]

const corsConfig = (req, next) => {
  let corsOptions;
  let incomingOrigin = req.header('host') || req.header('origin');
  if (incomingOriginWhitelist.indexOf(incomingOrigin !== -1)) {
    corsOptions = {
      origin: true
    }
    return next(null, corsOptions);
  } else
    corsOptions = {
      origin: false
    }

  return next(new Error('You like going under the hood, i like you. Contact me '))

}


module.exports = (app, express) => {

  const api = require('./routes/api')(express);

  app.use(cors(corsConfig), (req, res, next) => {
    next();
  })

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: false
  }))

  app.use(history({
    verbose: true
  }))
  app.use( serveStatic(__dirname + "/../dist"));
  
  app.use('/api', api)

  app.use(logger('short'));

  app.use((req, res, next) => {
    const err = new Error('Page not found');
    err.status = 404;
    next(err);
  })

  app.use((err, req, res) => {
    res.locals.message = err.message
    //Only prviding errors in development 
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    console.log(err);
    res.render('error')
  })
}
