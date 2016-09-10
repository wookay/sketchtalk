// sketch.js

// jstalk.include("tddsketch/sketch/application.js")
// jstalk.include("tddsketch/sketch/document.js")
// jstalk.include("tddsketch/sketch/rectangle.js")
// jstalk.include("tddsketch/sketch/group.js")
// jstalk.include("tddsketch/sketch/text.js")
// jstalk.include("tddsketch/sketch/image.js")
// jstalk.include("tddsketch/sketch/shape.js")
// jstalk.include("tddsketch/sketch/artboard.js")
// jstalk.include("tddsketch/sketch/page.js")

var Sketch = new function() {
    this.doc = undefined
    this.in_plugins = false
    this.context = undefined // plugins
    this.app = undefined     // jstalk
    this.current_filename = undefined
    this.current_name = undefined

    this.onRun = function(context) {
        this.context = context
        this.doc = context.document
        this.in_plugins = true
        var url = this.doc.fileURL()
        this.current_filename = undefined == url ? "Untitled" : url.lastPathComponent()
        this.current_name = this.current_filename.split(".")[0]
        this.stdout_layer = undefined
        var layers = Sketch.doc.currentPage().layers()
        if (!isempty(layers)) {
            var textlayer = last(layers)
            if (undefined != textlayer && 'STDOUT' == textlayer.name()) {
                this.stdout_layer = textlayer
                this.stdout_layer.replaceTextPreservingAttributeRanges("")
            }
        }
        UnitTest.println = function(str) {
            if (undefined != Sketch.stdout_layer) {
                var text = Sketch.stdout_layer.stringValue().toString()
                Sketch.stdout_layer.replaceTextPreservingAttributeRanges(text + "\n" + str)
                Sketch.stdout_layer.setFontPostscriptName("Monaco")
                Sketch.stdout_layer.fontSize = 10
            }
            print(str)
        }
        return this.doc
    }

    this.run_with_script = function() {
        this.app = JSTalk.application_('Sketch')
        this.doc = Sketch.app.orderedDocuments().firstObject()
        if (undefined == this.doc) {
            throw new Error(with_color('red', "Open a Sketch document."))
        }
        this.in_plugins = false
        var url = this.doc.fileURL()
        this.current_filename = undefined == url ? "Untitled" : url.lastPathComponent().toString()
        this.current_name = this.current_filename.split(".")[0]
        return this.doc
    }
}

_test_files_recursive = function(dir, test_files, depth) {
    var fm = NSFileManager.defaultManager()
    var files = fm.directoryContentsAtPath(dir)
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

UnitTest.suite = function(tests_dir) {
    if ("bukdu" == Sketch.current_name) {
        tests_dir = "tests/bukdu"
    }
    var dir = Sketch.in_plugins ? string(Sketch.context.scriptPath.stringByDeletingLastPathComponent(), "/", tests_dir) : tests_dir
    var paths = _test_files_recursive(dir, [], 1)
    for (var idx=0; idx<length(paths); idx++) {
        jstalk.include(paths[idx])
    }
    return UnitTest.run(Test, !Sketch.in_plugins)
}
