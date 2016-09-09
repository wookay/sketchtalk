// sketch.js

// jstalk.include("sketchtalk/sketch/application.js")
// jstalk.include("sketchtalk/sketch/document.js")
// jstalk.include("sketchtalk/sketch/rectangle.js")
// jstalk.include("sketchtalk/sketch/group.js")
// jstalk.include("sketchtalk/sketch/text.js")
// jstalk.include("sketchtalk/sketch/image.js")
// jstalk.include("sketchtalk/sketch/shape.js")
// jstalk.include("sketchtalk/sketch/artboard.js")
// jstalk.include("sketchtalk/sketch/page.js")

var Sketch = new function() {
    this.doc = undefined
    this.in_plugins = false
    this.context = undefined // plugins
    this.app = undefined     // jstalk

    this.onRun = function(context) {
        this.context = context
        this.doc = context.document
        this.in_plugins = true
        return this.doc
    }
}

UnitTest.suite = function(tests_dir) {
    var directory = Sketch.in_plugins ? string(Sketch.context.scriptPath.stringByDeletingLastPathComponent(), "/", tests_dir) : tests_dir
    var fm = NSFileManager.defaultManager()
    var files = fm.directoryContentsAtPath(directory)
    for (var idx=0; idx<length(files); idx++) {
        var filename = files[idx].toString()
        if (startswith(filename, "test_")) {
            var path = string(directory, "/", filename)
            jstalk.include(path)
        }
    }
    return UnitTest.run(Test, !Sketch.in_plugins)
}
