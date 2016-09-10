importall Bukdu

type WelcomeController <: ApplicationController
end

function index(::WelcomeController)
    "hello tddsketch"
end

Router() do
    get("/", WelcomeController, index)
end

Bukdu.start(8080)

Endpoint() do
    plug(Plug.Logger)
    plug(Router)
end

wait()
