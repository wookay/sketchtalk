// array.js

function isempty(arr) {
    if (arr instanceof Array) {
        return 0 == arr.length
    } else {
        return 0 == arr.length()
    }
}
