function findIndex(nombre, lista) {
    var index = -1;
    for (var i = 0; i < lista.length; i++)
        if (nombre === lista[i].id)
            index = i;
    return index;
}

function addTarget(x, y, vertexId) {
    targets.push({
        id: vertexId,
        x: x,
        y: y,
        visible: true,
        subjectId: vertexId
    });

    buildBox(targets[targets.length - 1], layer);
}

function deleteTarget(boxtarget) {
    var index = targets.indexOf(boxtarget);
    targets[index].visible = false;
    targets.splice(index, 1);
    deleteConecction(boxtarget);
    updateObjects();
}

function buildBox(Boxtarget, layer) {
    // console.log(Boxtarget.x, Boxtarget.y);
    var group = new Konva.Group({
        id: Boxtarget.id,
        x: Boxtarget.x,
        y: Boxtarget.y,
        draggable: true,
        subjectId: Boxtarget.subjectId
    });
    var box = new Konva.Rect({
        fill: Konva.Util.getRandomColor(),
        width: boxWidth,
        height: boxHeight,
        // fill: '#77678a',
        stroke: 'gray',
        strokeWidth: 2,
        // shadowBlur: 10,
    });

    var textNode = new Konva.Text({
        text: Boxtarget.id,
        fontSize: 18,
        width: boxWidth,
        fontFamily: 'myfont',
        fill: 'white',
        fontStyle: 'bold'
    });

    var tr = new Konva.Transformer({
        node: textNode,
        // enabledAnchors: ['middle-left', 'middle-right'],
        enabledAnchors: [],
        rotateEnabled: false,
        boundBoxFunc: function (oldBox, newBox) {
            newBox.width = Math.max(25, newBox.width);
            return newBox;
        }
    });

    var circleDel = new Konva.Circle({
        x: 0,
        y: 0,
        radius: boxHeight / 4,
        fill: '#d15963',
        stroke: 'black',
        strokeWidth: 2
    });

    var imageRadius = boxHeight / 2;
    var plugObject = new Konva.Image({
        x: boxWidth - imageRadius / 2,
        y: boxHeight / 2 - imageRadius / 2,
        width: imageRadius,
        height: imageRadius,
        shadowColor: 'black',
        shadowBlur: 10,
        shadowOffset: {
            x: 10,
            y: 10
        },
        shadowOpacity: 0.5
    });

    var plugIcon = new Image();

    plugIcon.onload = function () {
        plugObject.image(plugIcon);
        // layer.draw();
        updateObjects();
    };
    var currentImageSource = '../icons/plug1.png';

    plugIcon.src = currentImageSource;

    group.add(box);
    group.add(textNode);
    group.add(tr);
    group.add(circleDel);
    group.add(plugObject);
    layer.add(group);

    textNode.on('dblclick', () => {
        textNode.hide();
        tr.hide();
        updateObjects();
        var textPosition = group.absolutePosition();
        var stageBox = stage.container().getBoundingClientRect();

        // so position of textarea will be the sum of positions above:
        var areaPosition = {
            // x: stageBox.left + textPosition.x,
            // y: stageBox.top + textPosition.y,
            x: textPosition.x,
            y: textPosition.y,
        };

        var textarea = document.createElement('textarea');

        // document.getElementById('container').appendChild(textarea);
        document.body.appendChild(textarea);

        textarea.value = textNode.text();
        textarea.style.position = 'absolute';
        textarea.style.top = areaPosition.y + 'px';
        textarea.style.left = areaPosition.x + 'px';
        textarea.style.width = textNode.width() - textNode.padding() * 2 + 'px';
        textarea.style.height =
            textNode.height() - textNode.padding() * 2 + 5 + 'px';
        textarea.style.fontSize = textNode.fontSize() + 'px';
        textarea.style.border = 'none';
        textarea.style.padding = '0px';
        textarea.style.margin = '0px';
        textarea.style.overflow = 'hidden';
        textarea.style.background = 'none';
        textarea.style.outline = 'none';
        textarea.style.resize = 'none';
        textarea.style.lineHeight = textNode.lineHeight();
        textarea.style.fontFamily = textNode.fontFamily();
        textarea.style.transformOrigin = 'left top';
        textarea.style.textAlign = textNode.align();
        textarea.style.color = textNode.fill();
        rotation = textNode.rotation();
        var transform = '';
        if (rotation)
            transform += 'rotateZ(' + rotation + 'deg)';

        var px = 0;
        // also we need to slightly move textarea on firefox
        // because it jumps a bit
        var isFirefox =
            navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
        if (isFirefox)
            px += 2 + Math.round(textNode.fontSize() / 20);

        transform += 'translateY(-' + px + 'px)';
        textarea.style.transform = transform;

        // reset height
        textarea.style.height = 'auto';
        // after browsers resized it we can set actual value
        textarea.style.height = textarea.scrollHeight + 3 + 'px';

        textarea.focus();

        function removeTextarea() {
            textarea.parentNode.removeChild(textarea);
            window.removeEventListener('click', handleOutsideClick);
            textNode.show();
            tr.show();
            tr.forceUpdate();
            // layer.draw();
            updateObjects();
        }

        function setTextareaWidth(newWidth) {
            if (!newWidth)
                newWidth = textNode.placeholder.length * textNode.fontSize();

            // some extra fixes on different browsers
            var isSafari = /^((?!chrome|android).)*safari/i.test(
                navigator.userAgent
            );
            var isFirefox =
                navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
            if (isSafari || isFirefox)
                newWidth = Math.ceil(newWidth);

            var isEdge =
                document.documentMode || /Edge/.test(navigator.userAgent);
            if (isEdge)
                newWidth += 1;

            textarea.style.width = newWidth + 'px';
        }

        textarea.addEventListener('keydown', function (e) {
            // hide on enter
            // but don't hide on shift + enter
            if (e.keyCode === 13 && !e.shiftKey) {
                textNode.text(textarea.value);
                Boxtarget.subjectId = (textarea.value).toLowerCase().replace(/\s+/g, '');
                removeTextarea();
            }
            // on esc do not set value back to node
            if (e.keyCode === 27)
                removeTextarea();
        });

        textarea.addEventListener('keydown', function (e) {
            scale = textNode.getAbsoluteScale().x;
            setTextareaWidth(textNode.width() * scale);
            textarea.style.height = 'auto';
            textarea.style.height =
                textarea.scrollHeight + textNode.fontSize() + 'px';
        });

        function handleOutsideClick(e) {
            if (e.target !== textarea)
                textNode.text(textarea.value);
            Boxtarget.subjectId = (textarea.value).toLowerCase().replace(/\s+/g, '');
            removeTextarea();
        }
        setTimeout(() => {
            window.addEventListener('click', handleOutsideClick);
        });
    });

    textNode.on('mouseover', function () {
        if (currentCursor == 'default')
            document.body.style.cursor = 'text';
    });
    textNode.on('mouseout', function () {
        document.body.style.cursor = currentCursor;
    });

    circleDel.on('mouseover', function () {
        if (currentCursor == 'default')
            document.body.style.cursor = 'url(icons/delete.png), auto';
    });
    circleDel.on('mouseout', function () {
        document.body.style.cursor = currentCursor;
    });
    circleDel.on('click', function () {
        group.destroy();
        deleteTarget(Boxtarget);
    });

    box.on('mouseover', function (e) {
        if (currentCursor == 'default')
            document.body.style.cursor = 'move';
    });
    box.on('mouseout', function () {
        document.body.style.cursor = currentCursor;
    });

    plugObject.on('mousedown touchstart', function () {

        currentCursor = 'url(icons/plug0.png), auto';
        document.body.style.cursor = currentCursor;

        group.draggable(false);
        currentImageSource = '../icons/plug2.png';
        plugIcon.src = currentImageSource;
        vertexDragged = group;
    });

    plugObject.on('mouseup touchend', function () {
        document.body.style.cursor = 'pointer';
        currentCursor = 'default';

        group.draggable(true);
        currentImageSource = '../icons/plug1.png';
        plugIcon.src = currentImageSource;
        addConecction(vertexDragged, group, connectors);
        updateObjects();
    });

    // plugObject.on('dragend', function () {
    //     group.draggable(true);
    //     plugIcon.src = '../icons/plug1.png';
    // });

    plugObject.on('mouseover', function () {
        if (currentCursor == 'default')
            document.body.style.cursor = 'grab';
        plugIcon.src = '../icons/plug2.png';
    });
    plugObject.on('mouseout', function () {
        document.body.style.cursor = currentCursor;
        plugIcon.src = currentImageSource;
    });

    group.on('dragstart', (e) => {
        shadowRectangle.show();
        shadowRectangle.moveToTop();
        group.moveToTop();
    });
    group.on('dragend', (e) => {
        Boxtarget.x = Math.round(group.x() / padding) * padding;
        Boxtarget.y = Math.round(group.y() / padding) * padding;

        group.position({
            x: Boxtarget.x,
            y: Boxtarget.y
        });

        stage.batchDraw();
        shadowRectangle.hide();
    });
    group.on('dragmove', () => {
        Boxtarget.x = Math.round(group.x() / padding) * padding;
        Boxtarget.y = Math.round(group.y() / padding) * padding;

        shadowRectangle.position({
            x: Boxtarget.x,
            y: Boxtarget.y
        });

        updateObjects();
    });
}

function loadTargets(loadedTargets) {
    for (var key in loadedTargets) {
        if (loadedTargets.hasOwnProperty(key)) {
            var loadedTarget = loadedTargets[key];
            let pos = loadedTarget[1].split("%;");
            let x = parseFloat(pos[0]) * width;
            let y = parseFloat(pos[1]) * height;
            addTarget(x, y, loadedTarget[0]);
            nBoxes++;
            for (var i = 2; i < loadedTarget.length; i++) {
                addLoadedConecction(loadedTarget[i], loadedTarget[0], connectors);
            }
        }
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function generateInitialTargets() {
    var number = 5;
    let min = 1, maxX = (width / padding) - 3, maxY = (height / padding) - 1;

    while (targets.length < number) {
        let rx = getRandomInt(min, maxX);
        let ry = getRandomInt(min, maxY);
        let x = padding * rx //padding
        let y = padding * ry
        console.log(nBoxes);

        addTarget(x, y, 'x-' + nBoxes);
        nBoxes++;
    }
}