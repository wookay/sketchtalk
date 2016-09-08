// sketch.js

// jstalk.include("jstalk/sketch/application.js")
// jstalk.include("jstalk/sketch/document.js")
// jstalk.include("jstalk/sketch/rectangle.js")
// jstalk.include("jstalk/sketch/group.js")
// jstalk.include("jstalk/sketch/text.js")
// jstalk.include("jstalk/sketch/image.js")
// jstalk.include("jstalk/sketch/shape.js")
// jstalk.include("jstalk/sketch/artboard.js")
// jstalk.include("jstalk/sketch/page.js")

var Sketch = new function() {
    this.app = JSTalk.application_('Sketch')
    this.doc = this.app.orderedDocuments().firstObject()
}
