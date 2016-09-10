// test_symbols.js

Test.test_bukdu_symbols = function() {
    var pages = Sketch.doc.pages()
    var page = Sketch.doc.pages()[0]
    assert(isa(page, "MSPage"))
    assert_equal(page, Sketch.doc.currentPage())

    var artboard = page.currentArtboard()
    assert_equal(undefined, artboard)
    //assert_equal("Mobile Portrait", string(artboard.name()))

    assert(!isempty(page.artboards()))
    assert_equal(3, length(page.artboards()))

    var get_name = function(item, idx) {
       return item.name().toString()
    }
    assert_equal(string(["Desktop","Tablet Portrait","Mobile Portrait"]), map(get_name, page.artboards()))
}
