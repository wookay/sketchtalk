# tddsketch

```
$ cd ~/Library/Application\ Support/com.bohemiancoding.sketch3/Plugins/
$ # git clone https://github.com/wookay/tddsketch.git
$ cd tddsketch/TddSketch.sketchplugin/Contents/Sketch/
$ open examples/hello.sketch
```


### Testing with CocoaScript

* https://github.com/ccgus/CocoaScript

```sh
$ coscript run_with_coscript.js
* tests/hello/test_pages.js
* tests/hello/test_textlayer.js
* tests/base/test_base.js
Started
..................................................
Finished in 0.22 seconds.
10 tests, 50 assertions, 0 failures, 0 errors
```


### Testing in Sketch

* Plugins / TddSketch / run regressIon tests (shift cmd i)

![Hello](https://github.com/wookay/tddsketch/raw/master/TddSketch.sketchplugin/Contents/Sketch/examples/hello.png)


### Test example
```javascript
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
```
