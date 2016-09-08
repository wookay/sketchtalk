// string.js

function string(args) {
    var arr = []
    for (idx=0; idx<arguments.length; idx++) {
        arr.push(arguments[idx])
    }
    return arr.join("")
}
