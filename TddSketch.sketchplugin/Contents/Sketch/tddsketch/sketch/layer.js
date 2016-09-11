function get_layer_by_name(parent, name) {
    var layers = parent.layers()
    for (idx=0; idx<length(layers); idx++) {
        var layer = layers[idx]
        if (name==layer.name()) {
            return layer
        }
    }
    throw_error(NotFoundError, string(parent) + " " + "`" + name + "`")
}
