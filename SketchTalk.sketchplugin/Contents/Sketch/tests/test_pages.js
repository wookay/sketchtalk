// test_pages.js

Test.test_pages = function() {
    var pages = Sketch.doc.pages()
    var page = Sketch.doc.pages()[0]
    assert(isa(page, "MSPage"))
    assert_equal(page, Sketch.doc.currentPage())

    var artboard = page.currentArtboard()
    assert_equal(null, artboard)
//    assert_equal("Mobile Portrait", artboard.name().toString())

    // page.contentBounds

    assert(!isempty(page.exportableLayers()))

    assert(isempty(page.artboards()))

    //var artboard = MSArtboardGroup.new()
    //var frame = artboard.frame()
    //frame.setX(0)
    //frame.setY(0)
    //frame.setWidth(800)
    //frame.setHeight(600)
    //page.addLayers([artboard])
    //assert(isempty(page.artboards()))
}
