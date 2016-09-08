// UnitTest.js
//                           wookay.noh at gmail.com

Test = {}
DOT = "."
LF = "\n"

function puts(str) {
  print(str)
}

function inspect(value) {
  if ('function' == typeof(value)) {
    return value.toString()
  } else {
    return JSON.stringify(value)
  }
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
  _assert_equal(expected, got, deep_equal(expected, got))
}

assert = function(got) {
  _assert_equal(true, got, deep_equal(true, got))
}

var _assert_equal = function(expected, got, is_true) {
  if (is_true) {
    UnitTest.passed_in_progress += 1
    UnitTest.passed += 1
    if (UnitTest.dot_if_passed) {
      //print(DOT)
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
         with_color('cyan', extract_filename_line_from_stack_trace()))
    puts("Expected: " + with_color('white', inspect(expected)))
    puts("Got: " + with_color('cyan', inspect(got)))
    //puts("")
    UnitTest.failed += 1
  }
}

var extract_filename_line_from_stack_trace = function() {
    var top_caller = arguments.callee.caller.caller.caller
    var meths = methods(top_caller.caller.arguments[0])
    var str = ""
    for (i=0; i<meths.length; i++) {
        var mname = meths[i]
        if (top_caller == UnitTest.target[mname]) {
            str += mname 
        }
    }
    return str
}

UnitTest = {
  target: undefined,
  dot_if_passed: true,
  tests: 0,
  passed: 0,
  passed_in_progress: 0,
  failed: 0,
  errors: 0,

  run: function(test_target) {
    this.target = test_target
    var startedAt = new Date()
    puts("Started")
    for (var test_name in test_target) {
      if (test_name.match(/^test_/)) {
        this.tests += 1
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
    this.report()
  },

  report: function() {
    if (this.failed == 0 && this.passed > 0) {
         puts(with_color('green', this.tests + " tests, " +
         this.passed + " assertions, " +
         this.failed + " failures, " +
         this.errors + " errors"))
    } else {
         puts(this.tests + " tests, " +
         this.passed + " assertions, " +
         with_color(this.failed > 0 ? 'red' : 'normal', this.failed + " failures") + ", " +
         this.errors + " errors")
    }
  },
}
