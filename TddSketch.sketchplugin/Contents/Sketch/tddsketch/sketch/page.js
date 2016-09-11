function get_page_by_name(doc, name) {
    var pages = doc.pages()
    for (idx=0; idx<length(pages); idx++) {
        var page = pages[idx]
        if (name==page.name()) {
            return page
        }
    }
    throw_error(NotFoundError, string(doc) + " " + "`" + name + "`")
}
