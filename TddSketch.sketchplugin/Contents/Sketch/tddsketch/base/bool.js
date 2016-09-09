// bool.js

function _undefined_as_false(v) {
    return (undefined == v) ? false : v
}

function and(a, b) {
    return _undefined_as_false(a && b)
}

function or(a, b) {
    return _undefined_as_false(a || b)
}
