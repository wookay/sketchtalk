// string.js

function string(args) {
    var arr = []
    for (idx=0; idx<arguments.length; idx++) {
        var arg = arguments[idx]
        arr.push("" + arg)
    }
    return arr.join("")
}

function startswith(s, prefix) {
    return s.startsWith(prefix)
}

function endswith(s, suffix) {
    return s.endsWith(suffix)
}
