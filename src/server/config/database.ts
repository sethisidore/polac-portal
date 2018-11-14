import * as bluebird from 'bluebird';
import * as mongoose from 'mongoose';

import { logger } from '../util';

export class Database {
  private instance: Database;

  MONGO_URI: string;
  constructor() {
    this.setup();
  }

  public getInstance() {
    if (!this.instance) {
      return this.instance = new Database;
    }
    return this.instance;
  }

  setup() {
    (<any>mongoose).Promise = bluebird;
    mongoose.set('debug', true);
    mongoose.set('runValidators', true);
    mongoose.set('useCreateIndex', true);

    this.MONGO_URI = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
  }

  start() {
    mongoose.connect(this.MONGO_URI, { useNewUrlParser: true })
      .then(() => {
        logger.info('Connection to database successful');
      })
      .catch(err => {
        logger.error(`error connecting to database: ${err}`);
        process.exit(1);
      });

    // CONNECTION EVENTS
    mongoose.connection.on('connected', () => {
      logger.info(`Mongoose connected to ${this.MONGO_URI}`);
    });
    mongoose.connection.on('error', (err) => {
      logger.error(`Mongoose connection error: ${err}`);
    });
    mongoose.connection.on('disconnected', () => {
      logger.info('Mongoose disconnected');
    });
  }
}
