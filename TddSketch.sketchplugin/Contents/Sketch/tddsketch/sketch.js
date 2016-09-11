// sketch.js

jstalk.include("tddsketch/sketch/page.js")
jstalk.include("tddsketch/sketch/layer.js")
jstalk.include("tddsketch/sketch/test.js")

var Sketch = new function() {
    this.doc = undefined
    this.in_plugins = false
    this.context = undefined // plugins
    this.app = undefined     // coscript
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
        UnitTest.throw_error = function(message) {
            var extract = extract_functionname_statement_from_stack_trace()
            var err = "\n" + with_color('red', "Error") + ": " + message + "\nin " + extract
            this.println(err)
        }
        Logger.have_color = false
        Logger.println = function(str) {
            UnitTest.println(str)
        }
        return this.doc
    }

    this.run_with_script = function() {
        this.app = JSTalk.application_('Sketch')
        this.doc = Sketch.app.orderedDocuments().firstObject()
        if (undefined == this.doc) {
            throw_error(NotFoundError, "Open a Sketch document.")
        }
        this.in_plugins = false
        var url = this.doc.fileURL()
        this.current_filename = undefined == url ? "Untitled" : url.lastPathComponent()
        this.current_name = this.current_filename.split(".")[0]
        return this.doc
    }
}

function throw_error(typ, message) {
    var err = "\n" +
              with_color('red', typ) + ": " +
              with_color('white', message)
    UnitTest.println(err)
}
