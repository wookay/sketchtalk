// array.js

function length(arr) {
    if ('number' == typeof arr.length) {
        return arr.length
    } else {
        return arr.length()
    }
}

function isempty(arr) {
    return 0 == length(arr)
}
