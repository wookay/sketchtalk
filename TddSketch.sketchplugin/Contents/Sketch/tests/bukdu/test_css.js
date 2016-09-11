// test_css.js

Test.test_bukdu_get_layer_by_name = function() {
    var pages = Sketch.doc.pages()
    var page = Sketch.doc.pages()[0]

    var Welcome = get_page_by_name(Sketch.doc, 'Welcome')
    assert_equal(page, Welcome)
    assert(isa(Welcome, 'MSPage'))

    assert(isa(page, 'MSPage'))
    assert_equal(page, Sketch.doc.currentPage())

    var STDOUT = get_layer_by_name(page, 'STDOUT')
    assert(isa(STDOUT, 'MSTextLayer'))
    var css = STDOUT.CSSAttributes()
    assert_equal('Vector{__NSCFString}', type_of(css))

    var MobilePortrait = get_layer_by_name(page, 'Mobile Portrait')
    assert(isa(MobilePortrait, 'MSArtboardGroup'))

    var index = get_layer_by_name(MobilePortrait, 'index')
    assert(isa(index, 'MSLayerGroup'))

    var artboard = page.currentArtboard()
    //assert_equal(undefined, artboard)
    //assert_equal("Mobile Portrait", string(artboard.name()))

    assert(!isempty(page.artboards()))
    assert_equal(3, length(page.artboards()))

    var get_name = function(item, idx) {
       return item.name().toString()
    }
    assert_equal(string(["Desktop","Tablet Portrait","Mobile Portrait"]), map(get_name, page.artboards()))
}

Test.test_bukdu_css = function() {
    var welcome = get_page_by_name(Sketch.doc, 'Welcome')
    var stdout = get_layer_by_name(welcome, 'STDOUT')
    assert_equal('MSTextLayer', type_of(stdout))
    var stdoutcss = stdout.CSSAttributes()
    assert_equal("/* STDOUT: */ font-family: Monaco; font-size: 10px; color: #000000;", stdoutcss.join(" "))
    var mobilePortrait = get_layer_by_name(welcome, 'Mobile Portrait')
    var index = get_layer_by_name(mobilePortrait, 'index')
    assert(isa(index, 'MSLayerGroup'))
    var h1 = get_layer_by_name(index, 'h1')
    var h1css = h1.CSSAttributes()
    assert_equal('Vector{__NSCFString}', type_of(h1css))
    assert_equal("/* h1: */ font-family: Menlo-Regular; font-size: 36px; color: #000000;", h1css.join(" "))
}
