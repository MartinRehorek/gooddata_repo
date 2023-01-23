'use strict';

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const env = require('env-var');
const morgan = require('morgan');

require('dotenv').config();

const errorHandler = require('./middleware/error-handler');

const logger = require('./utils/logger');
const { NotFoundError } = require('./utils/errors');
const { connectDb } = require('./utils/connect-db');

const { statsRoute } = require('./routes/stats-route');
const { coffeeRouter } = require('./routes/coffee-route');
const { userRoute } = require('./routes/user-route');
const { machineRouter } = require('./routes/machine-route');

connectDb();


const app = express();
const port = env.get('PORT').required().asString();


/**
 * Set express configs
 */
app.use(helmet());

// Add a list of allowed origins.
const allowedOrigins = env.get('ALLOWED_ORIGINS').required().asArray();
const options = {
  origin: allowedOrigins,
};

// Then pass these options to cors:
app.use(cors(options));
app.use(morgan('combined'));
app.set('trust proxy', true);
app.use(express.urlencoded({ extended: true }));
// Limit for files
app.use(
  express.json({
    limit: '100mb',
  }),
);

// Secure -> disable detect express
app.disable('x-powered-by');

const rootRouter = express.Router();

// Use routes
rootRouter.use(statsRoute);
rootRouter.use(coffeeRouter);
rootRouter.use(userRoute);
rootRouter.use(machineRouter);

app.use('/api/', rootRouter);

// Run only one Express instance at the same port
process.once('SIGUSR2', function () {
  process.kill(process.pid, 'SIGUSR2');
});

// Global error handling
app.all('*', async (req, res, next) => {
  const error = new NotFoundError(`Route doesn't find`);
  logger.error('Global error handling: ', error);
  next(error);
});

app.use(errorHandler);

app
  .listen(port, () => {
    logger.info(`Server 🚀 started on port ${port}`);
  })
  .on('error', (error) => {
    logger.error('An [error] has occurred. error is: %s and stack trace is: %s', error, error.stack);
  });
