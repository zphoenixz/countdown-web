function getRelativePointerPosition(node) {
    var transform = node.getAbsoluteTransform().copy();
    
    transform.invert();
    var pos = node.getStage().getPointerPosition();
    return transform.point(pos);
}

stage.on('contentContextmenu', (e) => {
    e.evt.preventDefault();

    // console.log(e.target);

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




function fitStageIntoParentContainer() {
    var container = document.querySelector('#stage-parent');

    // now we need to fit stage into parent
    var containerWidth = container.offsetWidth;
    // to do this we need to scale the stage
    var scale = containerWidth / width;

    stage.width(width * scale);
    stage.height(height * scale);
    stage.scale({
        x: scale,
        y: scale
    });
    stage.draw();
}

updateObjects();
fitStageIntoParentContainer();
// adapt the stage on any window resize
window.addEventListener('resize', fitStageIntoParentContainer);

layer.add(background);
layer.add(titulo);
stage.add(layer);
