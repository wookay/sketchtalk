// array.js

function length(arr) {
    if (null == arr) {
        throw new Error(with_color('red', "MethodError: no method matching length"))
    }
    if ('number' == typeof arr.length) {
        return arr.length
    } else {
        return arr.length()
    }
}

function isempty(arr) {
    return 0 == length(arr)
}

function last(arr) {
    var len = length(arr)
    if (0 == len) {
        throw new Error(with_color('red', "BoundsError: attempt to access 0-element"))
    } else {
        return arr[len-1]
    }
}

function map(func, arr) {
    var result = []
    for (idx=0; idx<length(arr); idx++) {
        result.push(func(arr[idx], idx]))
    }
    return result
}
