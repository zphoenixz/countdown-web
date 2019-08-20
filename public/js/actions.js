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





layer.add(background);
layer.add(titulo);
stage.add(layer);
updateObjects();
