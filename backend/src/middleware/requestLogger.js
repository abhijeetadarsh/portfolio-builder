const logger = require('../config/logger');

const requestLogger = (req, res, next) => {
  const start = Date.now();
  
  logger.info(`Request started: ${req.method} ${req.path}`, {
    body: redactSensitiveFields(req.body),
    headers: req.headers
  });

  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info(`Request completed: ${res.statusCode} ${req.method} ${req.path}`, {
      statusCode: res.statusCode,
      duration: `${duration}ms`
    });
  });

  next();
};

function redactSensitiveFields(body) {
  const sensitiveFields = ['password', 'token', 'authorization'];
  const redacted = { ...body };
  sensitiveFields.forEach(field => {
    if (redacted[field]) redacted[field] = '*****';
  });
  return redacted;
}

module.exports = requestLogger;