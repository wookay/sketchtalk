#!/usr/bin/env julia

importall Bukdu

type SketchController <: ApplicationController
end

function index(::SketchController)
    "hello tddsketch"
end

Router() do
    get("/", SketchController, index)
end

Bukdu.start(7080)

Endpoint() do
    plug(Plug.Logger)
    plug(Router)
end

wait()
