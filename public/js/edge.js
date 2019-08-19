function getConnectorPoints(from, to) {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    let angle = Math.atan2(-dy, dx);
    const halfWidth = boxWidth/2;
    const halfHeight = boxHeight/2;
    return [
        from.x + halfWidth  + (-halfWidth / 2) * Math.cos(angle + Math.PI),
        from.y + halfHeight + ( halfWidth / 2) * Math.sin(angle + Math.PI),
        to.x   + halfWidth  + (-halfWidth / 2) * Math.cos(angle),
        to.y   + halfHeight + ( halfWidth / 2) * Math.sin(angle)
    ];
}

function addConecction(from, to, result){
    if (from === to) {
        return;
    }
    var index = findIndex(to, targets);
    vertex[index].push(from);

    var id = 'connector-' + result.length;
    result.push({
        id: id,
        from: from,
        to: to
    });

    var line = new Konva.Arrow({
        stroke: 'black',
        id: id,
        fill: 'black'
    });
    layer.add(line);
}

function deleteConecction(boxtarget) {
    var targetId = boxtarget.id;

    for(var i = 0; i < connectors.length; i++){
        if(connectors[i].from === targetId || connectors[i].to === targetId){
            var line = layer.findOne('#' + connectors[i].id);
            line.destroy();
            connectors.splice(i, 1);
            i--;
        }
    }
    
    for(var i = 0; i < vertex.length; i++){
        for(var j = 1; j < vertex[i].length; j++){
            if(vertex[i][j] === targetId){
                vertex[i].splice(j, 1);
                j--;
            }
        } 
    }

    updateObjects();
}

function generateInitialConnectors() {
    var number = 5;
    var result = [];
    while (result.length < number) {
        var from = 'target-' + Math.floor(Math.random() * targets.length);
        var to = 'target-' + Math.floor(Math.random() * targets.length);
        addConecction(from, to, result);
    }
    return result;
}

var connectors = generateInitialConnectors();

connectors.forEach(connect => {
    var line = new Konva.Arrow({
        stroke: 'black',
        id: connect.id,
        fill: 'black'
    });
    layer.add(line);
});

