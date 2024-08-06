import Vapor

func routes(_ app: Application) throws {
    app.get { req async throws in
    try await req.view.render("home", ["title": "Home", "name": "James T"])
    }

    app.get("about") { req async throws in
        try await req.view.render("about", ["title": "About"])
    }
    
    app.get("portfolio") { req async throws in
        try await req.view.render("portfolio", ["title": "Portfolio"])
    }
    
    app.get("testing") { req async throws in
        try await req.view.render("testing", ["title": "Experimental & Projects"])
    }
}
