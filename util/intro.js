// Welcome page
function welcomePage() {
    makeStartButton();

    fill(0, 0, 0, 200);
    noStroke();
    let ts = min(16, canvasWidth / 46);
    if (mobile) ts = 22;
    textSize(ts + 10);
    text("#StayAtHome", canvasWidth / 2 - 5 * ts, canvasHeight / 18)
    textSize(ts + 7);
    text("#RestezChezVous", canvasWidth / 2 - 5 * ts, canvasHeight * 0.53)
    fill(0, 0, 0, 170);
    textSize(ts);
    text("The following is a simulation of the spread of the coronavirus within a population.", 15, canvasHeight / 8)
    text("This simulation is based on real data from the WHO (Mortality/Recovery rates etc.).", 15, canvasHeight / 8 + ts * 1.5)
    text("It mimics human behavior, and should help make predictions regarding the future of our countries.", 15, canvasHeight / 8 + ts * 3)

    if (canvasWidth / 46 > 22) {

        text("The ultimate goal of this simulation is to raise awareness, and to show that staying at home is the best approach against this virus.", 15, canvasHeight / 8 + ts * 4.5)
        text("During the simulation, we will keep track of healthy, infected, recovered, and dead individuals.", 15, canvasHeight / 8 + ts * 6)
        text("Individuals at home have a yellow shell preventing them from getting infected.", 15, canvasHeight / 8 + ts * 7.5)
        if (mobile)
            text("You can change quarantine modes by touching the screen.", 15, canvasHeight / 8 + ts * 9)
        else
            text("You can change quarantine modes by clicking on the triangle (Bottom of the screen).", 15, canvasHeight / 8 + ts * 9)
        text("Bi-weekly charts will be displayed as well as a summary at the end.", 15, canvasHeight / 8 + ts * 10.5)
        // fill(healthyColor);
        // circle(ts * (21 - mobile / 2), canvasHeight / 8 + ts * 6 - 4, ts * 0.7)
        // fill(infectedColor);
        // circle(ts * (26.2 - mobile / 2), canvasHeight / 8 + ts * 6 - 4, ts * 0.7)
        // fill(recoveredColor);
        // circle(ts * (31.5 - mobile / 2), canvasHeight / 8 + ts * 6 - 4, ts * 0.7)
        // fill(deadColor);
        // circle(ts * (40.1 - mobile / 2), canvasHeight / 8 + ts * 6 - 4, ts * 0.7)
        // fill(255, 255, 255, 0)
        // stroke(255, 204, 0);
        // strokeWeight(1.7);
        // circle(ts * (19.3 - mobile / 2), canvasHeight / 8 + ts * 7.5 - 4, ts * 0.7)
        // noStroke();
        // fill(0, 0, 0, 170);
        // fill(infectedColor);
        // if (!mobile)
        //     triangle(ts * 25 - 9, canvasHeight / 8 + ts * 9 - 10, ts * 25 - 15, canvasHeight / 8 + ts * 9 + 1, ts * 25 - 3, canvasHeight / 8 + ts * 9 + 1)
        fill(0, 0, 0, 170);
        //////////
        text("Ceci est une simulation concernant la propagation du coronavirus au sein d'une population.", 15, canvasHeight * 0.58)
        text("Cette simulation est basée sur des données réelles provenant de l'OMS (Taux de mortalité etc.)", 15, canvasHeight * 0.58 + ts * 1.5)
        text("En imitant le comportement humain, celle ci peut aider à prédire l'avenir de nos pays.", 15, canvasHeight * 0.58 + ts * 3)
        text("Le but ultime de cette simulation est de sensibiliser et de montrer que rester à la maison est la meilleure approche contre ce virus.", 15, canvasHeight * 0.58 + ts * 4.5)
        text("Nous suiverons les personnes saines, infectées, guéries, et décédées.", 15, canvasHeight * 0.58 + ts * 6)
        text("Les individus à la maison ont une coquille jaune qui les empêche d'être infectés.", 15, canvasHeight * 0.58 + ts * 7.5)
        if (mobile)
            text("Le mode de quarantaine peut être changé en touchant l'écran", 15, canvasHeight * 0.58 + ts * 9)
        else
            text("Le mode de quarantaine peut être changé en cliquant sur le triangle (Bas de l'écran).", 15, canvasHeight * 0.58 + ts * 9)
        text("Des graphiques bihebdomadaires seront affichés ainsi qu'un résumé à la fin.", 15, canvasHeight * 0.58 + ts * 10.5)
        // fill(healthyColor);
        // circle(ts * (15.5 - mobile / 2), canvasHeight * 0.58 + ts * 6 - 4, ts * 0.7)
        // fill(infectedColor);
        // circle(ts * (20.5 - mobile / 2), canvasHeight * 0.58 + ts * 6 - 4, ts * 0.7)
        // fill(recoveredColor);
        // circle(ts * (26.3 - mobile / 2), canvasHeight * 0.58 + ts * 6 - 4, ts * 0.7)
        // fill(deadColor);
        // circle(ts * (32.7 - mobile / 2), canvasHeight * 0.58 + ts * 6 - 4, ts * 0.7)
        // fill(255, 255, 255, 0)
        // stroke(255, 204, 0);
        // strokeWeight(1.7);
        // circle(ts * (23.2 - mobile / 2), canvasHeight * 0.58 + ts * 7.5 - 4, ts * 0.7)
        noStroke();

        // fill(infectedColor);
        // if (!mobile)
        //     triangle(ts * 29 - 7, canvasHeight * 0.58 + ts * 9 - 10, ts * 29 - 13, canvasHeight * 0.58 + ts * 9 + 1, ts * 29 - 1, canvasHeight * 0.58 + ts * 9 + 1)

    } else {
        text("The ultimate goal of this simulation is to raise awareness, and to show that staying at home is the ", 15, canvasHeight / 8 + ts * 4.5)
        text("best approach against this virus.", 15, canvasHeight / 8 + ts * 6)
        text("During the simulation, we will keep track of       healthy,      infected,      recovered, and      dead ", 15, canvasHeight / 8 + ts * 7.5)
        text("individuals. Individuals at home have a yellow shell         preventing them from getting infected.", 15, canvasHeight / 8 + ts * 9)
        if (mobile)
            text("You can change quarantine modes by touching the screen.", 15, canvasHeight / 8 + ts * 10.5)
        else
            text("You can change quarantine modes by clicking on          (Bottom of the screen).", 15, canvasHeight / 8 + ts * 10.5)
        text("Bi-weekly charts will be displayed as well as a summary at the end.", 15, canvasHeight / 8 + ts * 12)
        // fill(healthyColor);
        // circle(ts * (21 - mobile / 2), canvasHeight / 8 + ts * 7.5 - 4, ts * 0.7)
        // fill(infectedColor);
        // circle(ts * (26.2 - mobile / 2), canvasHeight / 8 + ts * 7.5 - 4, ts * 0.7)
        // fill(recoveredColor);
        // circle(ts * (31.7 - mobile / 2), canvasHeight / 8 + ts * 7.5 - 4, ts * 0.7)
        // fill(deadColor);
        // circle(ts * (40.1 - mobile / 2), canvasHeight / 8 + ts * 7.5 - 4, ts * 0.7)
        // fill(255, 255, 255, 0)
        // stroke(255, 204, 0);
        // strokeWeight(1.7);
        // circle(ts * (25 - mobile / 2), canvasHeight / 8 + ts * 9 - 4, ts * 0.7)
        // noStroke();

        // fill(infectedColor);
        // if (!mobile)
        //     triangle(ts * 25 - 7, canvasHeight / 8 + ts * 10.5 - 10, ts * 25 - 13, canvasHeight / 8 + ts * 10.5 + 1, ts * 25 - 1, canvasHeight / 8 + ts * 10.5 + 1)
        fill(0, 0, 0, 170);
        //////////
        text("Ceci est une simulation concernant la propagation du coronavirus au sein d'une population.", 15, canvasHeight * 0.58)
        text("Cette simulation est basée sur des données réelles provenant de l'OMS (Taux de mortalité etc.)", 15, canvasHeight * 0.58 + ts * 1.5)
        text("En imitant le comportement humain, celle ci peut aider à prédire l'avenir de nos pays.", 15, canvasHeight * 0.58 + ts * 3)
        text("Le but ultime de cette simulation est de sensibiliser et de montrer que rester à la maison est la ", 15, canvasHeight * 0.58 + ts * 4.5)
        text("meilleure approche contre ce virus.", 15, canvasHeight * 0.58 + ts * 6)
        text("Nous suiverons les personnes       saines,      infectées,      guéries, et      décédées.", 15, canvasHeight * 0.58 + ts * 7.5)
        text("Les individus à la maison ont une coquille jaune       qui les empêche d'être infectés.", 15, canvasHeight * 0.58 + ts * 9)
        if (mobile)
            text("Le mode de quarantaine peut être changé en touchant l'écran.", 15, canvasHeight * 0.58 + ts * 10.5)
        else
            text("Le mode de quarantaine peut être changé en cliquant sur            (Bas de l'écran).", 15, canvasHeight * 0.58 + ts * 10.5)
        text("Des graphiques bihebdomadaires seront affichés ainsi qu'un résumé à la fin.", 15, canvasHeight * 0.58 + ts * 12)
        // fill(healthyColor);
        // circle(ts * (15.8 - mobile / 2), canvasHeight * 0.58 + ts * 7.5 - 4, ts * 0.7)
        // fill(infectedColor);
        // circle(ts * (20.8 - mobile / 2), canvasHeight * 0.58 + ts * 7.5 - 4, ts * 0.7)
        // fill(recoveredColor);
        // circle(ts * (26.4 - mobile / 2), canvasHeight * 0.58 + ts * 7.5 - 4, ts * 0.7)
        // fill(deadColor);
        // circle(ts * (33 - mobile / 2), canvasHeight * 0.58 + ts * 7.5 - 4, ts * 0.7)
        // fill(255, 255, 255, 0)
        // stroke(255, 204, 0);
        // strokeWeight(1.7);
        // circle(ts * (23.4 - mobile / 2), canvasHeight * 0.58 + ts * 9 - 4, ts * 0.7)
        // noStroke();

        // fill(infectedColor);
        // if (!mobile)
        //     triangle(ts * 29 - 7, canvasHeight * 0.58 + ts * 10.5 - 10, ts * 29 - 13, canvasHeight * 0.58 + ts * 10.5 + 1, ts * 29 - 1, canvasHeight * 0.58 + ts * 10.5 + 1)
    }
}


function makeStartButton() {

    button = createButton('Start Simulation');
    button.position(canvasWidth / 2 - mobile * 100, canvasHeight * 0.95);
    button.style('margin', '0');
    if (!mobile)
        button.style('transform', 'translate(-40%, 0%)');
    button.style('letter-spacing', '0.5px');
    let f = '14px';
    if (mobile) f = '24px';
    button.style('font-size', f);
    button.style('position', 'absolute');
    button.style('border', 'none');
    button.style('background', '#505050');
    button.style('color', '#ffffff');
    button.style('text-transform', 'uppercase');
    button.style('padding', '4px');
    button.style('border-radius', '6px');
    button.style('display', 'inline-block');
    button.style('transition', 'all 0.8s ease 0s');

    button.mouseOver(function () {
        button.style('cursor', 'pointer');
        button.style('color', '#404040');
        button.style('letter-spacing', '3px');
        button.style('display', 'inline-block');
        button.style('background', 'none');
        button.style('-webkit-box-shadow', '0px 5px 40px -10px rgba(0,0,0,0.57)');
        button.style('-moz-box-shadow', '0px 5px 40px -10px rgba(0,0,0,0.57)');
        button.style('transition', 'all 0.3s ease 0s');
    });

    button.mouseOut(function () {
        button.style('letter-spacing', '0.5px');
        button.style('background', '#505050');
        button.style('color', '#ffffff');
        button.style('transition', 'all 0.3s ease 0s');
    });

    button.mousePressed(function () {
        if (!started) {
            started = true;
        }
        button.remove();
    });
}


function makeButton() {
    button = createButton('Continue');
    button.position(canvasWidth - 100 - mobile * 100, canvasHeight / 30);
    button.style('margin', '0');
    if (!mobile)
        button.style('transform', 'translate(-40%, 0%)');
    let f = '14px';
    if (mobile) f = '25px';
    button.style('font-size', f);
    button.style('position', 'absolute');
    button.style('border', 'none');
    button.style('background', '#505050');
    button.style('color', '#ffffff');
    button.style('text-transform', 'uppercase');
    button.style('padding', '5px');
    button.style('border-radius', '6px');
    button.style('display', 'inline-block');
    button.style('transition', 'all 0.8s ease 0s');

    button.mouseOver(function () {
        button.style('cursor', 'pointer');
        button.style('color', '#404040');
        button.style('letter-spacing', '3px');
        button.style('display', 'inline-block');
        button.style('background', 'none');
        button.style('-webkit-box-shadow', '0px 5px 40px -10px rgba(0,0,0,0.57)');
        button.style('-moz-box-shadow', '0px 5px 40px -10px rgba(0,0,0,0.57)');
        button.style('transition', 'all 0.3s ease 0s');
    });

    button.mouseOut(function () {
        button.style('letter-spacing', '0');
        button.style('background', '#505050');
        button.style('color', '#ffffff');
        button.style('transition', 'all 0.3s ease 0s');
    });

    button.mousePressed(function () {
        var container = document.getElementById("chart-container");
        container.removeChild(container.childNodes[0]);
        container.removeChild(container.childNodes[1]);
        button.remove();
        for (let i = 0; i < fRate; i++) {
            background(255);
            wakeUp();
            updateText();
        }
        update();
        updatingId = setInterval(update, dayTime * 1000);
        movingId = setInterval(main, 1000 / fRate);
        summarizing = false;
        //flag3 = true;
        document.elementFromPoint(10, 10).click();
    });
}

function makeRestartButton() {
    button = createButton('Restart');
    button.position(canvasWidth - 120 - mobile * 90, canvasHeight / 30);
    button.style('margin', '0');
    if (!mobile)
        button.style('transform', 'translate(-40%, 0%)');
    let f = '14px';
    if (mobile) f = '25px';
    button.style('font-size', f);
    button.style('position', 'absolute');
    button.style('border', 'none');
    button.style('background', '#505050');
    button.style('color', '#ffffff');
    button.style('text-transform', 'uppercase');
    button.style('padding', '5px');
    button.style('border-radius', '6px');
    button.style('display', 'inline-block');
    button.style('transition', 'all 0.8s ease 0s');

    button.mouseOver(function () {
        button.style('cursor', 'pointer');
        button.style('color', '#404040');
        button.style('letter-spacing', '3px');
        button.style('display', 'inline-block');
        button.style('background', 'none');
        button.style('-webkit-box-shadow', '0px 5px 40px -10px rgba(0,0,0,0.57)');
        button.style('-moz-box-shadow', '0px 5px 40px -10px rgba(0,0,0,0.57)');
        button.style('transition', 'all 0.3s ease 0s');
    });

    button.mouseOut(function () {
        button.style('letter-spacing', '0');
        button.style('background', '#505050');
        button.style('color', '#ffffff');
        button.style('transition', 'all 0.3s ease 0s');
    });

    button.mousePressed(function () {
        var container = document.getElementById("chart-container");
        container.removeChild(container.childNodes[0]);
        container.removeChild(container.childNodes[1]);
        button.remove();
        setup();
        loop();
    });
}