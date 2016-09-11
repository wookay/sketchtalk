_test_files_recursive = function(dir, test_files) {
    var fm = NSFileManager.defaultManager()
    var files = fm.directoryContentsAtPath(dir)
    if (null == files) {
        return test_files
    }
    for (var idx=0; idx<length(files); idx++) {
        var name = files[idx].toString()
        var path = string(dir, "/", name)
        if (endswith(name, ".js")) {
            test_files.push(path)
        } else if (name == Sketch.current_name) {
            _test_files_recursive(path, test_files)
        }
    }
    return test_files
}

_test_paths = function(tests_dir) {
    var dir = Sketch.in_plugins ? string(Sketch.context.scriptPath.stringByDeletingLastPathComponent(), "/", tests_dir) : tests_dir
    return _test_files_recursive(dir, [])
}

UnitTest.suite = function(tests_dir) {
    var paths = _test_paths(tests_dir)
    if ("hello" == Sketch.current_name) {
        paths = paths.concat(_test_paths("tests/base"))
    }
    for (var idx=0; idx<length(paths); idx++) {
        var path = paths[idx]
        if (Sketch.in_plugins) {
            this.println("* " + tests_dir + last(path.split(tests_dir)))
        } else {
            this.println("* " + path)
        }
        jstalk.include(path)
    }
    return UnitTest.run(Test, !Sketch.in_plugins)
}
