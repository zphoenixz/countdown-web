stage.on('contentContextmenu', (e) => {
    e.evt.preventDefault();
    var pos = stage.getPointerPosition();
    addTarget(pos.x, pos.y);
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

function onSubmit() {
    if (confirm('Esta seguro de guardar los datos (se cerrara esta ventana)?')) {
        var graph = createGraph(targets, connectors);
        var finalCurriculum = JSON.stringify(graph)
        input.value = finalCurriculum;
        document.getElementById('malla').submit();
    } 
}

layer.add(background);
layer.add(titulo);
stage.add(layer);
updateObjects();