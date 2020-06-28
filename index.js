require('@babel/register')({});

import server from './server/server';
import logger from './configs/logger';

let httpServer;
const startServer = () => {
  httpServer = server.start();
};

const exitHandler = () => {
  if (httpServer) {
    httpServer.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  // exitHandler();
};


startServer();

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});