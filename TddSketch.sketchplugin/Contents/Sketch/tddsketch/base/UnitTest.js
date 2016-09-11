// UnitTest.js
//                           wookay.noh at gmail.com

Test = {}
DOT = "."
LF = "\n"

function puts(str) {
    UnitTest.println(str)
    return str
}

function inspect(value) {
    var typ = type_of(value)
    if ('String' == typ) {
        return value
    } else if (['Dict','Array'].includes(typ)) {
        return JSON.stringify(value)
    }
    return value.toString()
}

function deep_equal(a,b) {
    if (a == b) {
        return true
    } else if ('object' == typeof(a) && 'object' == typeof(b)) {
        return inspect(a) == inspect(b)
    } else {
        return false
    }
}

assert_equal = function(expected, got) {
    if (2==arguments.length) {
        _assert_equal(expected, got, deep_equal(expected, got))
    } else {
        UnitTest.throw_error("assert_equal: wrong arguments (expected 2)")
    }
}

assert = function(got) {
    if (1==arguments.length) {
        _assert_equal(true, got, deep_equal(true, got))
    } else {
        UnitTest.throw_error("assert: wrong arguments (expected 1)")
    }
}

var _assert_equal = function(expected, got, is_true) {
    if (is_true) {
        UnitTest.passed += 1
        UnitTest.passed_in_progress += 1
        UnitTest.counting_in_progress_of_function += 1
        if (UnitTest.dot_if_passed) {
        } else {
            puts("passed: " + inspect(expected))
        }
    } else {
      if (UnitTest.passed_in_progress > 0) {
          if (UnitTest.dot_if_passed) {
              puts(DOT.repeat(UnitTest.passed_in_progress))
          }
      }
      UnitTest.passed_in_progress = 0
      puts(with_color('red', "Assertion failed") + " in " +
           extract_functionname_statement_from_stack_trace())
      puts("Expected: " + with_color('normal', inspect(expected)))
      puts("Got: " + with_color('cyan', inspect(got)))
      UnitTest.failed += 1
      UnitTest.counting_in_progress_of_function += 1
    }
}

var extract_functionname_statement_from_stack_trace = function() {
    var top_caller = arguments.callee.caller.caller.caller
    var func_body_lines = string(top_caller).split("\n")
    var idx_assert = 0
    var found = undefined
    for (idx=0; idx<length(func_body_lines); idx++) {
        var line = func_body_lines[idx]
        if (startswith(lstrip(line), "assert")) {
            if (UnitTest.counting_in_progress_of_function == idx_assert) {
                found = line
                break
            }
            idx_assert += 1
        }
    }
    var meths = methods(top_caller.caller.arguments[0])
    var str = ""
    for (i=0; i<meths.length; i++) {
        var mname = meths[i]
        if (top_caller == UnitTest.target[mname]) {
            str += with_color('cyan', mname)
        }
    }
    str += "\n"
    str += with_color('white', found)
    return str
}

UnitTest = {
    suite: undefined,
    target: undefined,
    have_color: true,
    dot_if_passed: true,
    tests: 0,
    passed: 0,
    passed_in_progress: 0,
    counting_in_progress_of_function: 0,
    failed: 0,
    errors: 0,

    run: function(test_target, have_color) {
        this.target = test_target
        this.have_color = undefined == have_color ? true : have_color
        var startedAt = new Date()
        puts("Started")
        for (var test_name in test_target) {
          if (test_name.match(/^test_/)) {
            this.tests += 1
            this.counting_in_progress_of_function = 0
            //Logger.info(test_name)
            test_target[test_name]()
          }
        }
        if (UnitTest.passed_in_progress > 0) {
            if (UnitTest.dot_if_passed) {
                puts(DOT.repeat(UnitTest.passed_in_progress))
            }
        }
        var finishedAt = new Date()
        var elapsed = (finishedAt - startedAt) / 1000
        puts("Finished in " + elapsed + " seconds.")
        return this.report()
    },

    report: function() {
        if (this.failed == 0 && this.passed > 0) {
             return with_color('green', this.tests + " tests, " +
             this.passed + " assertions, " +
             this.failed + " failures, " +
             this.errors + " errors")
        } else {
             return this.tests + " tests, " +
             this.passed + " assertions, " +
             with_color(this.failed > 0 ? 'red' : 'normal', this.failed + " failures") + ", " +
             this.errors + " errors"
        }
    },

    println: function(str) {
        print(str)
    },

    throw_error: function(message) {
        var extract = extract_functionname_statement_from_stack_trace()
        var err = with_color('red', message) + "\nin " + extract
        throw new Error(err)
    }
}
