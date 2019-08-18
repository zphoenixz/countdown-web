var nBoxes = 0;

var targets = [];

function addTarget(x, y) {
    targets.push({
        id: 'target-' + nBoxes,
        x: x - boxWidth / 2,
        y: y - boxHeight / 2,
        visible: true
    });
    nBoxes++;
    buildBox(targets[targets.length - 1], layer);
}

function deleteTarget(boxtarget) {

    var index = targets.indexOf(boxtarget);
    targets[index].visible = false;
    targets.splice(index, 1);
    console.log('-------------------------');
    targets.forEach(target => {
        console.log(target.id);
    });
    updateObjects();
}

function buildBox(Boxtarget, layer) {
    var group = new Konva.Group({
        id: Boxtarget.id,
        x: Boxtarget.x,
        y: Boxtarget.y,
        draggable: true
    });
    var box = new Konva.Rect({
        // fill: Konva.Util.getRandomColor(),
        width: boxWidth,
        height: boxHeight,
        fill: '#77678a',
        stroke: 'gray',
        strokeWidth: 2,
        // shadowBlur: 10,
    });

    var textNode = new Konva.Text({
        text: 'Datos ' + Boxtarget.id,
        fontSize: 20,
        width: boxWidth,
        fontFamily: 'Helvetica',
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
        x: 0 - boxHeight / 8,
        y: 0 - boxHeight / 8,
        radius: boxHeight / 4,
        fill: '#d15963',
        stroke: 'black',
        strokeWidth: 2
    });

    group.add(box);
    group.add(textNode);
    group.add(tr);
    group.add(circleDel);
    layer.add(group);

    group.on('dragmove', () => {
        // mutate the state
        Boxtarget.x = group.x();
        Boxtarget.y = group.y();
        updateObjects();
    });

    textNode.on('dblclick', () => {
        textNode.hide();
        tr.hide();
        layer.draw();

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
        if (rotation) {
            transform += 'rotateZ(' + rotation + 'deg)';
        }

        var px = 0;
        // also we need to slightly move textarea on firefox
        // because it jumps a bit
        var isFirefox =
            navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
        if (isFirefox) {
            px += 2 + Math.round(textNode.fontSize() / 20);
        }
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
            layer.draw();
        }

        function setTextareaWidth(newWidth) {
            if (!newWidth) {
                // set width for placeholder
                newWidth = textNode.placeholder.length * textNode.fontSize();
            }
            // some extra fixes on different browsers
            var isSafari = /^((?!chrome|android).)*safari/i.test(
                navigator.userAgent
            );
            var isFirefox =
                navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
            if (isSafari || isFirefox) {
                newWidth = Math.ceil(newWidth);
            }

            var isEdge =
                document.documentMode || /Edge/.test(navigator.userAgent);
            if (isEdge) {
                newWidth += 1;
            }
            textarea.style.width = newWidth + 'px';
        }

        textarea.addEventListener('keydown', function (e) {
            // hide on enter
            // but don't hide on shift + enter
            if (e.keyCode === 13 && !e.shiftKey) {
                textNode.text(textarea.value);
                removeTextarea();
            }
            // on esc do not set value back to node
            if (e.keyCode === 27) {
                removeTextarea();
            }
        });

        textarea.addEventListener('keydown', function (e) {
            scale = textNode.getAbsoluteScale().x;
            setTextareaWidth(textNode.width() * scale);
            textarea.style.height = 'auto';
            textarea.style.height =
                textarea.scrollHeight + textNode.fontSize() + 'px';
        });

        function handleOutsideClick(e) {
            if (e.target !== textarea) {
                removeTextarea();
            }
        }
        setTimeout(() => {
            window.addEventListener('click', handleOutsideClick);
        });
    });

    textNode.on('mouseover', function () {
        document.body.style.cursor = 'text';
    });
    textNode.on('mouseout', function () {
        document.body.style.cursor = 'default';
    });

    circleDel.on('mouseover', function () {
        document.body.style.cursor = 'url(icons/delete.png), auto';
    });
    circleDel.on('mouseout', function () {
        document.body.style.cursor = 'default';
    });
    circleDel.on('click', function () {
        group.destroy();
        deleteTarget(Boxtarget);
    });
    box.on('mouseover', function (e) {
        document.body.style.cursor = 'move';
    });
    box.on('mouseout', function () {
        document.body.style.cursor = 'default';
    });
}