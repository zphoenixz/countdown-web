var width = window.innerWidth;
var height = window.innerHeight * 0.9;

var boxWidth = width / 11;
var boxHeight = height / 11;

var stage = new Konva.Stage({
    container: 'container',
    width: width,
    height: height
});
var layer = new Konva.Layer();

function generateInitialTargets() {
    var number = 4;
    while (targets.length < number) {
        let x = (stage.width() * Math.random())
        let y = (stage.height() * Math.random());
        addTarget(x, y);
        // console.log(result[result.length-1]);
    }
}
generateInitialTargets();

function generateInitialConnectors() {
    var number = 2;
    var result = [];
    while (result.length < number) {
        var from = 'target-' + Math.floor(Math.random() * targets.length);
        var to = 'target-' + Math.floor(Math.random() * targets.length);
        if (from === to) {
            continue;
        }
        result.push({
            id: 'connector-' + result.length,
            from: from,
            to: to
        });
    }
    return result;
}

function getConnectorPoints(from, to) {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    let angle = Math.atan2(-dy, dx);
    const halfWidth = boxWidth / 3;
    const halfHeight = boxHeight / 3;
    return [
        from.x + halfWidth + -halfWidth * Math.cos(angle + Math.PI),
        from.y + halfHeight + halfWidth * Math.sin(angle + Math.PI),
        to.x + halfWidth + -halfWidth * Math.cos(angle),
        to.y + halfHeight + halfWidth * Math.sin(angle)
    ];
}
var connectors = generateInitialConnectors();


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

connectors.forEach(connect => {
    var line = new Konva.Arrow({
        stroke: 'black',
        id: connect.id,
        fill: 'black'
    });
    layer.add(line);
});

var titulo = new Konva.Text({
    text: 'Organizar Malla Curricular',
    // x: width / 2,
    y: boxHeight / 2,
    width: width,
    fontSize: boxHeight / 2,
    fontFamily: 'Helvetica',
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