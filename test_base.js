#!/usr/bin/env jstalk

jstalk.include("jstalk/base.js")

var Test = {}

Test.test_set = function() {
    assert(issubset(2, [1,2]))
}

Test.test_array = function() {
    assert(isempty([]))
    assert(!isempty([1]))
}

Test.test_string = function() {
    assert_equal("ab", string("a", "b"))
}

Test.test_inference = function() {
    assert(issubtype('Int', 'Number'))
    assert(issubtype('Float', 'Number'))

    assert(isa(this.an_undefined, 'Undefined'))
    assert(isa(undefined, 'Undefined'))
    assert(isa([], 'Vector'))
    assert(isa([1], 'Vector{Int}'))
    assert(isa([1.2], 'Vector{Float}'))
    assert(isa([1.2,true], 'Vector{Union{Float,Bool}}'))
    assert(isa({}, 'Dict'))
    assert(isa({a: 2}, 'Dict'))
    assert(isa(1, 'Int'))
    assert(isa(1.2, 'Float'))
    assert(isa(false, 'Bool'))
    assert(isa(true, 'Bool'))

    assert(isa(1, 'Number'))
    assert(isa(1.2, 'Number'))
}

Test.test_reflection= function() {
    assert_equal(type_of(undefined), 'Undefined'))
    assert_equal(type_of(1), 'Int'))
    var dict = {}
    assert_equal(methods(dict), [])
    dict['a'] = 2
    assert_equal(methods(dict), ['a'])
    assert_equal(inspect(dict), "{\"a\":2}")
}


UnitTest.run(Test)
