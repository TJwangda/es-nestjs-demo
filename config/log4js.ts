
import * as path from 'path';
import dateFormat = require('dateformat');
const baseLogPath = path.resolve(__dirname, '../../logs'); // 日志要写入哪个目录


const log4jsConfig = {
    appenders: {
        console: {
            category:"console",
            type: 'console', // 会打印到控制台
        },
        access: {
            type: 'file',
            // filename: `${baseLogPath}/access/${dateFormat(new Date(), "yyyy-mm-dd")}/access.log`, // 日志文件名，
            filename: `${baseLogPath}/debug/${dateFormat(new Date(), "yyyy-mm-dd")}/debug.log`, // 日志文件名，
            layout: {
                type: 'pattern',
                // pattern: '{"date":"%d","level":"%p","category":"%c","host":"%h","pid":"%z","data":\'%m\'}',
                // pattern: '%d{yyyy-MM-dd hh:mm:ss.000},"level":"%p","category":"%c","host":"%h","pid":"%z","data":\'%m\'',
                pattern: '%d{yyyy-MM-dd hh:mm:ss.000},"level":"%p","category":"%c","host":"%h","pid":"%z","data":%m',
            },
            maxLogSize: 10485760,//单位为字节，100M
            daysToKeep: 30,
            numBackups: 3,
            category: 'http',
            keepFileExt: true, // 是否保留文件后缀 info.1.log
            // keepFileExt: false, // 是否保留文件后缀 info.log.1
        },
        app: {
            type: 'file',
            filename: `${baseLogPath}/info/${dateFormat(new Date(), "yyyy-mm-dd")}/info.log`,
            // filename: `${baseLogPath}/app-out/${dateFormat(new Date(), "yyyy-mm-dd")}/app.log`,
            layout: {
                type: 'pattern',
                // pattern: '{"date":"%d","level":"%p","category":"%c","host":"%h","pid":"%z","data":\'%m\'}',
                // pattern: '%d{yyyy-MM-dd hh:mm:ss.000},"level":"%p","category":"%c","host":"%h","pid":"%z","data":\'%m\'',
                pattern: '%d{yyyy-MM-dd hh:mm:ss.000},"level":"%p","category":"%c","host":"%h","pid":"%z","data":%m',
            },

            daysToKeep: 30,
            maxLogSize: 10485760,//单位为字节，100M
            // maxLogSize: 10240,
            // maxLogSize: 1024,
            numBackups: 3,
            keepFileExt: true,
        },
        errorFile: {
            type: 'file',
            // filename: `${baseLogPath}/errors/${dateFormat(new Date(), "yyyy-mm-dd")}/error.log`,
            filename: `${baseLogPath}/error/${dateFormat(new Date(), "yyyy-mm-dd")}/error.log`,
            layout: {
                type: 'pattern',
                // pattern: '{"date":"%d","level":"%p","category":"%c","host":"%h","pid":"%z","data":\'%m\'}',
                // pattern: '%d{yyyy-MM-dd hh:mm:ss.000},"level":"%p","category":"%c","host":"%h","pid":"%z","data":\'%m\'',
                pattern: '%d{yyyy-MM-dd hh:mm:ss.000},"level":"%p","category":"%c","host":"%h","pid":"%z","data":%m',
            },

            daysToKeep: 30,
            maxLogSize: 10485760,
            // maxLogSize: 10240,
            numBackups: 3,
            keepFileExt: true,
        },
        errors: {
            type: 'logLevelFilter',
            level: 'ERROR',
            appender: 'errorFile',
        },
    },
    categories: {
        // default: { appenders: ['console', 'app', 'errors'], level: 'DEBUG', },
        default: { appenders: ['console', 'app', 'errors','access'], level: 'DEBUG', },
        // info: { appenders: ['console', 'app', 'errors'], level: 'info' },
        infoc: { appenders: ['console', 'app'], level: 'info' },
        access: { appenders: ['console', 'app', 'errors'], level: 'info' },
        http: { appenders: ['access'], level: 'DEBUG' },
        errorsc: { appenders: ['errors'], level: 'DEBUG' },
    },
    replaceConsole: true,
    pm2: true, // 使用 pm2 来管理项目时，打开
    pm2InstanceVar: 'INSTANCE_ID', // 会根据 pm2 分配的 id 进行区分，以免各进程在写日志时造成冲突
};

export default log4jsConfig;
