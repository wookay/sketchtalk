// set.js

function issubset(a, b) {
    if (a instanceof Array) {
        return Object.keys(a).every((key) => {
            return b.includes(key)
        })
    } else {
        return b.includes(a)
    }
}
