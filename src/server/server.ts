#!/usr/bin/env node

/**
 * Module dependencies.
 */
import { app } from './app';
import * as debug from 'debug';
import * as http from 'http';
import * as mongoose from 'mongoose';

debug('polac:server');

class WebServer {
  port: number|string|boolean;
  server: http.Server;

  constructor() {
    this.init();
  }

  init(): void {
    /**
    * Get port from environment and store in Express.
    */
    this.port = this.normalizePort(process.env.PORT || '3000');
    app.set('port', this.port);

    /**
     * Create HTTP server.
     */
    this.server = http.createServer(app);

    /**
     * Listen on provided port, on all network interfaces.
     */

    this.server.listen(this.port);
    this.server.on('error', this.onError);
    this.server.on('listening', this.onListening.bind(this));
  }

  /**
  * Normalize a port into a number, string, or false.
  */
  private normalizePort(val: number|string): number|string|boolean {
    const port = (typeof val === 'string') ? parseInt(val, 10) : val;

    if (isNaN(port)) {
      // named pipe
      return val;
    }

    if (port >= 0) {
      // port number
      return port;
    }

    return false;
  }

  /**
  * Event listener for HTTP server "error" event.
  */
  private onError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== 'listen') {
      throw error;
    }

    const bind = typeof this.port === 'string'
      ? 'Pipe ' + this.port
      : 'Port ' + this.port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  /**
  * Event listener for HTTP server "listening" event.
  */
  private onListening(): void {
    const addr = this.server.address();
    const bind = (typeof addr === 'string')
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    debug(`Listening on  ${bind}`);
  }

  watch() {
    /**
     * Watch for all process and gracefully shutdown
     */
    function gracefulShutdown(message: string, done: Function): void {
      this.server.close(() => {
        mongoose.connection.close(() => {
          console.log(`App shutdown at: ${message}`);
        });
        done();
      });
    }

    process.once('SIGUSR2', () => {
      gracefulShutdown('Nodemon restart', () => {
        process.kill(process.pid, 'SIGUSR2');
      });
    });

    process.on('SIGINT', () => {
      gracefulShutdown('Interruption', () => {
        process.exit(0);
      });
    });

    process.on('SIGTERM', () => {
      gracefulShutdown('App termination', () => {
        process.exit(0);
      });
    });
  }
}

export const server = new WebServer().server;
