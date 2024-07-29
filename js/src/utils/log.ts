function consoleLog(msg: string, level: string) {
    if (LOGGER_LEVEL === 'debug') {
        console.log(msg); // Log all irrespective of level
    }
    else if (LOGGER_LEVEL === 'error') {
        if (level === 'error') {
            console.log(msg);
        }
    }
}

export { consoleLog };