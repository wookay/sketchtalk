// test_textlayer.js

Test.test_textlayer_type_of = function() {
    var layers = Sketch.doc.currentPage().layers()
    assert_equal('Vector{MSTextLayer}', type_of(layers))
    assert_equal('MSTextLayer', type_of(layers.firstObject()))

    var selectedLayers = Sketch.doc.selectedLayers()
    assert_equal(0, length(selectedLayers))
    assert_equal('Vector', type_of(selectedLayers))
    assert_equal('Undefined', type_of(selectedLayers.firstObject()))
}

Test.test_textlayer_attributes = function() {
    var textlayer = Sketch.doc.currentPage().layers().firstObject()

    assert_equal(36, textlayer.fontSize())
    assert_equal("AppleSDGothicNeo-Bold", textlayer.fontPostscriptName().toString())
    assert_equal({}, textlayer.textColor())

    // null : left
    // 1 : right
    // 2 : center
    // 3
    assert_equal(2, textlayer.textAlignment())
    assert_equal("Hello", textlayer.stringValue().toString())
}

Test.test_textlayer_text = function() {
    var textlayer = Sketch.doc.currentPage().layers().firstObject()

    textlayer.replaceTextPreservingAttributeRanges("Hello World")
    assert_equal("Hello World", textlayer.stringValue().toString())

    textlayer.replaceTextPreservingAttributeRanges("Hello")
    assert_equal("Hello", textlayer.stringValue().toString())
}

Test.test_textlayer_font = function() {
    var textlayer = Sketch.doc.currentPage().layers().firstObject()
    var font = textlayer.font()
    assert_equal("AppleSDGothicNeo-Bold", font.fontName().toString())
    assert_equal(36, font.pointSize())
}
