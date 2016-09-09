// logger.js

var Logger = new function() {
}

Logger.info = function(args) {
    var arr = []
    for (idx=0; idx<arguments.length; idx++) {
        arr.push(arguments[idx])
    }
    print(arr.join(""))
}

text_colors = {
    black   : "\033[1m\033[30m",
    red     : "\033[1m\033[31m",
    green   : "\033[1m\033[32m",
    yellow  : "\033[1m\033[33m",
    blue    : "\033[1m\033[34m",
    magenta : "\033[1m\033[35m",
    cyan    : "\033[1m\033[36m",
    white   : "\033[1m\033[37m",
    normal  : "\033[0m",
    bold    : "\033[1m",
}

function with_color(color, text) {
    return string(text_colors[color], text, text_colors['normal'])
}
