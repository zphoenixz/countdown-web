stage.on('contentContextmenu', (e) => {
    e.evt.preventDefault();
    var pos = stage.getPointerPosition();
    addTarget(pos.x, pos.y);
    updateObjects();
});

// stage.on('click', function (e) {
//     // console.log(e.target);
//     // var pos = getRelativePointerPosition(layer);
//     var pos = stage.getPointerPosition();
//     addTarget(pos.x, pos.y);
//     updateObjects();
// });
stage.on('mouseup touchend', function () {
    currentCursor = 'default';
    document.body.style.cursor = currentCursor;
    vertexDragged.draggable(true);
    vertexDragged.getChildren()[4].image().src = '../icons/plug1.png';
});



layer.add(background);
layer.add(titulo);
stage.add(layer);
updateObjects();
