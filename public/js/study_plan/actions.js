stage.on('contentContextmenu', (e) => {
    e.evt.preventDefault();
    var pos = stage.getPointerPosition();
    addTarget(pos.x, pos.y, 'x-' + nBoxes);
    nBoxes++;
    updateObjects();
});
stage.on('mouseup touchend', function () {
    currentCursor = 'default';
    document.body.style.cursor = currentCursor;
    try {
        vertexDragged.draggable(true);
        vertexDragged.getChildren()[4].image().src = '../icons/plug1.png';
    } catch (err) {}
});

function createGraph(vertices, aristas) {
    var i = 0;
    var aux = {};
    var graph = {};

    vertices.forEach(vertice => {
        aux[vertice.id] = [];
        aux[vertice.id].push(vertice.subjectId);
        aux[vertice.id].push((vertice.x / width).toFixed(3) + "%;" + (vertice.y / height).toFixed(3));
    });
    aristas.forEach(arista => {
        aux[arista.to].push(aux[arista.from][0]);
    });

    for (var key in aux) {
        if (aux.hasOwnProperty(key)) {
            graph[aux[key][0]] = [];
            aux[key].forEach(subject => {
                graph[aux[key][0]].push(subject);
            });
        }
    }
    return graph;
}

shadowRectangle.hide();
layer.add(shadowRectangle);

layer.add(background);
layer.add(titulo);
stage.add(gridLayer);
stage.add(layer);
updateObjects();