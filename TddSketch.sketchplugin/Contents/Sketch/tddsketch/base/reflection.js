// reflection.js

function _vector_type_of(obj) {
    if (isempty(obj)) {
        return 'Vector'
    } else {
        var typ = eltype(obj)
        if ('Any' == typ) {
            return 'Vector'
        } else {
            return string("Vector{", typ, "}")
        }
    }
}

function eltype(obj) {
    var arr = []
    if (obj instanceof Array) {
        var len = length(obj)
        for (idx=0; idx<len; idx++) {
            var el = obj[idx]
            var typ = type_of(el)
            if (!arr.includes(typ)) {
                arr.push(typ)
            }
        }
    } else {
        var enumerator = obj.objectEnumerator()
        while (el = enumerator.nextObject()) {
            var typ = el.className()
            if (!arr.includes(typ)) {
                arr.push(typ)
            }
        }
    }
    if (arr.length == 0) {
        return 'Any'
    } else if (arr.length == 1) {
        return arr[0]
    } else {
        return string("Union{", arr.join(","), "}")
    }
}

function type_of(obj) {
    if (undefined == obj) {
        return 'Undefined'
    } else if ('number' == typeof obj && isFinite(obj)) {
        return (obj%1===0) ? 'Int' : 'Float'
    } else if ('boolean' == typeof obj) {
        return 'Bool'
    } else if ('string' == typeof obj) {
        return 'String'
    } else if (obj instanceof Array) {
        return _vector_type_of(obj)
    } else {
       if (undefined == obj.className) {
           return 'Dict'
       } else {
           if (true == obj.respondsToSelector("objectEnumerator")) {
               return _vector_type_of(obj)
           } else {
               return obj.className()
           }
       }
    }
    throw new Error("type_of: unknown type")
}

function methods(obj) {
    return Object.getOwnPropertyNames(obj)
}

function inspect(obj) {
    return Object.entries(obj)
}
