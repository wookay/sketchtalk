#!/usr/bin/env jstalk

jstalk.include("jstalk/base.js")
jstalk.include("jstalk/sketch.js")

var Test = {}

Test.test_type_of = function() {
    assert_equal(type_of(Sketch.doc.selectedLayers()), 'Vector{MSTextLayer}')
    assert_equal(eltype(Sketch.doc.selectedLayers()), 'MSTextLayer')
    assert_equal(type_of(Sketch.doc.currentPage().layers().firstObject()), 'MSTextLayer')
}


UnitTest.run(Test)
