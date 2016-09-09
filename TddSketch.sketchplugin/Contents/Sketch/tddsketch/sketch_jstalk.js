// sketch_jstalk.js

jstalk.include("tddsketch/sketch.js")

Sketch.app = JSTalk.application_('Sketch')
Sketch.doc = Sketch.app.orderedDocuments().firstObject()
Sketch.in_plugins = false
