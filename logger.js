// logger.js
import winston from "winston";

// Define the log format
const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.printf(({timestamp, level, message}) => {
    return `${timestamp} [${level}]: ${message}`;
  })
);

// Create the logger instance
const logger = winston.createLogger({
  level: "info", // Set the default logging level
  format: logFormat,
  transports: [
    // Console transport
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), logFormat),
    }),
    // File transport for error logs
    new winston.transports.File({
      filename: "error.log",
      level: "error", // Log only error level logs
      format: logFormat,
    }),
    // File transport for warning logs
    new winston.transports.File({
      filename: "combined.log",
      level: "warning", // Log warning and error level logs
      format: logFormat,
    }),
  ],
});

// Optional: Log unhandled rejections and exceptions
process.on("unhandledRejection", (reason, promise) => {
  logger.error("Unhandled Rejection:", reason);
});

process.on("uncaughtException", (error) => {
  logger.error("Uncaught Exception:", error);
});

// Export the logger instance
export default logger;
