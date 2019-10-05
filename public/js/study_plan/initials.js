console.log(country, college, faculty, major, cvyear, modify);

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDgwBYKRyffOGTX2aXAVqcfPddv9Dzgw8E",
    authDomain: "schedules-6415d.firebaseapp.com",
    databaseURL: "https://schedules-6415d.firebaseio.com",
    projectId: "schedules-6415d",
    storageBucket: "schedules-6415d.appspot.com",
    messagingSenderId: "576534115494",
    appId: "1:576534115494:web:c72bfea28c2d98c8"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

var width = window.innerWidth;
var height = window.innerHeight * 0.97;

var boxHeight = Math.ceil(height / 26);
var boxWidth = Math.ceil(boxHeight * 3);
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
    text: 'Career Study Plan',
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


async function checkData() {
    const pathtodb = "BOLIVIA/" + college + '/' + faculty + '/' + major + '/' + cvyear + '/curriculum';
    let curriculum = await db.doc(pathtodb).get();
    let data = curriculum.data();
    loadTargets(data);
}


var shadowOffset = 20;
var tween = null;
var blockSnapSize = 30;

var gridLayer = new Konva.Layer();
var padding = boxHeight;

for (var i = 0; i < width / padding; i++) {
    gridLayer.add(new Konva.Line({
        points: [Math.round(i * padding) + 0.5, 0, Math.round(i * padding) + 0.5, height],
        stroke: '#ddd',
        strokeWidth: 1,
    }));
}

gridLayer.add(new Konva.Line({
    points: [0, 0, 10, 10]
}));
for (var j = 0; j < height / padding; j++) {
    gridLayer.add(new Konva.Line({
        points: [0, Math.round(j * padding), width, Math.round(j * padding)],
        stroke: '#ddd',
        strokeWidth: 0.5,
    }));
}

var shadowRectangle = new Konva.Rect({
    x: 0,
    y: 0,
    width: padding * 3,
    height: padding * 1,
    fill: '#FF7B17',
    opacity: 0.6,
    stroke: '#CF6412',
    strokeWidth: 3,
    dash: [20, 2]
});