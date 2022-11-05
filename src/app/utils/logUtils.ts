import { configure, getLogger, addLayout } from 'log4js';

addLayout('json', function(config: any) {
    return function(logEvent: any) { 
        logEvent = {...logEvent, ...logEvent.data.reduce((acc: any ,obj: any) => acc = { ...acc,  ...obj} , {}) } 
        delete logEvent.data
        return JSON.stringify(logEvent) + config.separator; 
    }
});

configure({
    appenders: { 
        console: { 
            type: 'console', 
            layout : { 
                type: 'json', 
                separator: ',' 
            },
        },
    },
    categories: { 
        default: { 
            appenders: [ 'console' ], 
            level: 'info' } 
        }
})

export const log = getLogger('console');

const _info = log.info
const _warn = log.warn
const _error = log.error

log.info = function (message: string, ...args:any[]) {
    let info = _info.bind(this)
    args = args.reduce((acc , obj) => acc = Object.assign(obj, acc), {})
    info({message, ...args })
}

log.warn = function (message: string, ...args:any[]) {
    let warn = _warn.bind(this)
    args = args.reduce((acc , obj) => acc = Object.assign(obj, acc), {})
    warn({message, ...args })
}

log.error = function (message: string, ...args:any[]) {
    let error = _error.bind(this)
    args = args.reduce((acc , obj) => acc = Object.assign(obj, acc), {})
    error({message, ...args })
}