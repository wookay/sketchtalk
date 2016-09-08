#!/usr/bin/env julia --color=yes

#for (root, dirs, files) in walkdir(".")
let files = ["test_base.js", "test_sketch.js"]
    for file in files
        if startswith(file, "test_")
            path = "./$file"
            print_with_color(:yellow, "# jstalk $file\n")
            run(`$path`)
            println()
        end
    end
end
