// inference.js 

MethodError   = 'MethodError'
BoundsError   = 'BoundsError'
NotFoundError = 'NotFoundError'

function isa(obj, name) {
    if (2 == arguments.length) {
        var typ = type_of(obj)
        return or(typ == name, issubtype(typ, [name]))
    }
    else {
        throw_error(Error, "`isa`: too few arguments (expected 2)")
    }
}

function issubtype(type1, type2) {
    if ('Number' == type2) {
        return issubset(type1, ['Int', 'Float'])
    }
}
