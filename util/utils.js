function rand(max, min) {
    return Math.random() * (max - min) + min;
}

function distSquared(x1, y1, x2, y2) {
    let dx = x2 - x1;
    let dy = y2 - y1;
    return dx * dx + dy * dy;
}

function touching(a, b) {
    return distSquared(a.x, a.y, b.x, b.y) <= personSize * personSize;
}


function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}



function changeMobile() {
    if (!summarizing && mobile) {
        changeState();
    }
}

function mouseClicked(e) {
    if (inTriangle(e)) {
        changeState();
    }
}

function makeTriangle() {
    stroke(0);
    let e = {
        x: pmouseX,
        y: pmouseY
    };
    if (inTriangle(e)) {
        let temp;

        strokeWeight(0.5 + k / 5);
        if (quarantine)
            fill(quarantineColor());
        else
            fill(noquarantineColor());

        document.body.style.cursor = 'pointer';
        k = Math.min(6, k + 1);
    } else {
        if (quarantine)
            fill(quarantineColor());
        else
            fill(noquarantineColor());
        strokeWeight(0.5 - k / 5);
        document.body.style.cursor = 'default';
        k = Math.max(0, k - 1);
    }
    triangle(tx1, ty1 - k, tx2 + k / 2, ty2, tx3 - k / 2, ty3);
}

function quarantineColor() {
    return 'rgba(20, ' + (100 + k * 5).toString() + ', 20, ' + (0.65 + k * 5).toString() + ')'
}

function noquarantineColor() {
    return 'rgba(' + (100 + k * 12).toString() + ', 20, 20, ' + (0.65 + k * 5).toString() + ')'
}

function inTriangle(m) {
    let x1 = canvasWidth / 2;
    let y1 = canvasHeight - 30 - k;
    let x2 = canvasWidth / 2 + 15 + k / 2;
    let y2 = canvasHeight + 1;
    let x3 = canvasWidth / 2 - 15 - k / 2;
    let y3 = canvasHeight + 1;
    let areaOrig = abs((x2 - x1) * (y3 - y1) - (x3 - x1) * (y2 - y1));
    let area1 = abs((x1 - m.x) * (y2 - m.y) - (x2 - m.x) * (y1 - m.y));
    let area2 = abs((x2 - m.x) * (y3 - m.y) - (x3 - m.x) * (y2 - m.y));
    let area3 = abs((x3 - m.x) * (y1 - m.y) - (x1 - m.x) * (y3 - m.y));
    if (area1 + area2 + area3 == areaOrig) {
        return insideTriangle = true;
    }
    return insideTriangle = false;
}

function changeState() {
    if (!summarizing) {
        quarantine ^= 1;
    }
}