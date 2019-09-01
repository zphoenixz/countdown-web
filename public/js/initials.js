// var college = "<%- college %>";
// var faculty = "<%- faculty %>";
// var major = "<%- major %>";
// var cvyear = "<%- cvyear %>";
console.log(college, faculty, major, cvyear);


var width = window.innerWidth;
var height = window.innerHeight * 0.97;

var boxWidth = width / 24;
var boxHeight = height / 26;

var nBoxes = 0;
var targets = [];

var currentCursor = 'default';
var vertexDragged = null;
var input = document.getElementById('hiddenInput');

var stage = new Konva.Stage({
    container: 'container',
    width: width,
    height: height
});
var layer = new Konva.Layer();

// Responsive to the screen
function fitStageIntoParentContainer() {
    var container = document.querySelector('#stage-parent');
    var containerWidth = container.offsetWidth;
    var scale = containerWidth / width;

    stage.width(width * scale);
    stage.height(height * scale);
    stage.scale({
        x: scale,
        y: scale
    });
    stage.draw();
}

function getRelativePointerPosition(node) {
    var transform = node.getAbsoluteTransform().copy();

    transform.invert();
    var pos = node.getStage().getPointerPosition();
    return transform.point(pos);
}

fitStageIntoParentContainer();
window.addEventListener('resize', fitStageIntoParentContainer);

function updateObjects() {
    targets.forEach(target => {
        if (true) {
            var node = layer.findOne('#' + target.id);
            node.x(target.x);
        }
    });

    connectors.forEach(connect => {
        var line = layer.findOne('#' + connect.id);
        var fromNode = layer.findOne('#' + connect.from);
        var toNode = layer.findOne('#' + connect.to);
        const points = getConnectorPoints(
            fromNode.position(),
            toNode.position()
        );
        line.points(points);
    });
    layer.draw();
}

var titulo = new Konva.Text({
    text: 'Organizar Malla Curricular',
    // x: width / 2,
    y: boxHeight / 2,
    width: width,
    fontSize: boxHeight / 2,
    fontFamily: 'Roboto',
    fill: 'white',
    fontStyle: 'bold',
    align: 'center',
});

var background = new Konva.Rect({
    x: width / 2 - 300,
    y: boxHeight / 2,
    width: 600,
    height: boxHeight / 2,
    fill: 'black'
});