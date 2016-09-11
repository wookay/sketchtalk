// string.js

function string(args) {
    var arr = []
    for (idx=0; idx<arguments.length; idx++) {
        var arg = arguments[idx]
        arr.push(arg.toString())
    }
    return arr.join("")
}

function startswith(s, prefix) {
    return s.startsWith(prefix)
}

function endswith(s, suffix) {
    return s.endsWith(suffix)
}

function lstrip(str) {
	str = str.replace(/^\s+/, '');
	for (var i = str.length - 1; i >= 0; i--) {
		if (/\S/.test(str.charAt(i))) {
			str = str.substring(0, i + 1);
			break;
		}
	}
	return str;
}
