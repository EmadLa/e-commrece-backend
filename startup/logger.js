require("express-async-errors");
const winston = require("winston");
const { format } = require("winston");

const colorizer = winston.format.colorize();

const printImportant = format((info, opts) => {
    if (!info.important && info.level === "info") { return false; }
    return info;
});

const logger = winston.createLogger({
    format: format.prettyPrint(),
    exitOnError: true,
    exceptionHandlers: [
        new winston.transports.File({ filename: "server/logs/allUncaughtExceptions.log" }),
        new winston.transports.File({ filename: "server/logs/uncaughtExceptions.log", options: { flags: 'w' } })
    ],
    rejectionHandlers: [
        new winston.transports.File({ filename: "server/logs/allUnhandeledRejections.log" }),
        new winston.transports.File({ filename: "server/logs/unhandeledRejections.log", options: { flags: 'w' } })
    ],
    transports: [
        new winston.transports.File({
            filename: "server/logs/logfile.log",
            format: winston.format.combine(
                format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
                format.align(),
                format.printf(info => `[${info.timestamp}] ${info.level}: ${info.message}`)
            )
        }),
        new winston.transports.File({
            filename: "server/logs/errors.log",
            level: 'error',
            format: winston.format.combine(
                format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
                format.align(),
                format.printf(info => `[${info.timestamp}] ${info.level}: ${info.message} ${info.stack}`)
            )
        })
    ]
});

winston.addColors({
    info: "cyan"
});

if (process.env.NODE_ENV !== "production") {
    logger.add(
        new winston.transports.Console({
            handleExceptions: true,
            handleRejections: true,
            format: winston.format.combine(
                printImportant(),
                format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
                format.align(),
                format.printf(info => colorizer.colorize(
                    info.level,
                    `[${info.timestamp}] ${info.level}: ${(info.message.split("\n").length > 1 && info.level === "error") ?
                        (info.message.split("\n")[0] + " ... check log files for complete the log of the exception.") :
                        (info.message)}`
                ))
            )
        })
    );
}

module.exports = logger;