import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as csurf from 'csurf';
import * as dotenv from 'dotenv';
import * as favicon from 'serve-favicon';
import * as methodOverride from 'method-override';
import * as helmet from 'helmet';
import * as hpp from 'hpp';
import * as morgan from 'morgan';
import * as  path from 'path';
import * as passport from 'passport';
import { Application, Request, Response, NextFunction } from 'express';

import { asyncHandler, csrfHandler, RouteHandler } from './util';
import { Database } from './config/database';

class App {
  public app: Application;
  private database: Database;
  private connection: Database;
  private routes: RouteHandler;

  constructor() {
    this.app = express();
    // set up env variables
    dotenv.load({ path: path.join(__dirname, 'config/env/.env') });
    dotenv.config({ path: path.join(__dirname, `config/env/.env.${process.env.NODE_ENV}`) });


    this.database = new Database();
    this.middlewares();
    this.handlers();
    this.mongoSetup();
  }

  private handlers() {
    /**
    * Ensure CSRF tokens is validated for all GET & POST request
    * ***************** place the below IN HTML forms ************
    * <input type="hidden" name="_csrf" value="{{ csrftoken }}" />
    * app.use(function(req, res, next) {
    * res.cookie('XSRF-TOKEN', req.csrfToken());
    * return next();
    * });
    */
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.locals.user = req.user;
      res.locals.csrftoken = req.csrfToken();
      next();
    });

    // Configure and Authenticate Route MiddleWare
    this.routes = new RouteHandler();
    this.routes.init(this.app, passport);

    // catch 404 and forward to error handler
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      const err = new Error('Not Found');
      res.statusCode = 404;
      next(err);
    });
    // register handlers for Async Operations and XSRF
    this.app.use(asyncHandler);
    this.app.use(csrfHandler);

    // error handler
    this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(500).json(err);
    });
  }

  private middlewares() {
    // setup all 3rd-Party middlewares
    this.app.use(favicon(path.join(__dirname, '../../dist/polac', 'favicon.ico')));
    // log all request with successful response to stdout
    this.app.use(morgan('combined', {
      skip: (req: Request, res: Response) => {
        return res.statusCode < 400;
      }, stream: process.stderr
    }));
    // log all request with failed response to stderr
    this.app.use(morgan('combined', {
      skip: (req: Request, res: Response) => {
        return res.statusCode > 500;
      }, stream: process.stdout
    }));
    this.app.use(compression());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(cookieParser());
    this.app.use(csurf({ cookie: true }));
    this.app.use(methodOverride());
    this.app.use(helmet({
      hidePoweredBy: { setTo: 'django 0.5.2' },
    }));
    this.app.use(hpp());
    this.app.use(passport.initialize());
    this.app.use(express.static(path.join(__dirname, '../../dist/polac')));
  }

  private mongoSetup() {
    this.connection = this.database.getInstance();
    this.connection.start();
  }
}

export const app = new App().app;
