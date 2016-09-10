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
  if (2==arguments.length) {
      _assert_equal(expected, got, deep_equal(expected, got))
  } else {
      throw new Error(with_color('red', "assert_equal: wrong arguments (expected 2)"))
  }
}

assert = function(got) {
   if (1==arguments.length) {
       _assert_equal(true, got, deep_equal(true, got))
   } else {
       throw new Error(with_color('red', "assert: wrong arguments (expected 1)"))
   }
}

var _assert_equal = function(expected, got, is_true) {
  if (is_true) {
    UnitTest.passed_in_progress += 1
    UnitTest.passed += 1
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
    puts(string_with_color('red', "Assertion failed") + " in " +
         string_with_color('cyan', extract_filename_line_from_stack_trace()))
    puts("Expected: " + string_with_color('cyan', inspect(expected)))
    puts("Got: " + string_with_color('white', inspect(got)))
    UnitTest.failed += 1
  }
}

var string_with_color = function(color, str) {
    return UnitTest.have_color ? with_color(color, str) : str
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
  suite: undefined,
  target: undefined,
  have_color: true,
  dot_if_passed: true,
  tests: 0,
  passed: 0,
  passed_in_progress: 0,
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
         return string_with_color('green', this.tests + " tests, " +
         this.passed + " assertions, " +
         this.failed + " failures, " +
         this.errors + " errors")
    } else {
         return this.tests + " tests, " +
         this.passed + " assertions, " +
         string_with_color(this.failed > 0 ? 'red' : 'normal', this.failed + " failures") + ", " +
         this.errors + " errors"
    }
  },

  println: function(str) {
      print(str)
  }

}
