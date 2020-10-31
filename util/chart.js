
function makeChart() {
    if (endResult) {
        document.getElementById("chart-container").style.width = (canvasWidth * (0.75 + mobile / 6)).toString() + "px";
        document.getElementById("chart-container").style.right = (canvasWidth * (0.25 - mobile / 6)).toString() + "px";
    } else {
        document.getElementById("chart-container").style.width = (canvasWidth * 0.9).toString() + "px";
    }

    document.getElementById("chart-container").style.top = ((canvasHeight / 6) + mobile * 20).toString() + "px";
    if (mobile) {
        document.getElementById("chart-container").style.bottom = (canvasHeight / 2.7).toString() + "px";
    }
    var chartCanvas = document.createElement("CANVAS");
    chartCanvas.id = 'myChart';
    document.getElementById("chart-container").appendChild(chartCanvas)
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: yLabels,
            datasets: [{
                label: "Hospitals Capacity",
                backgroundColor: 'rgba(255,255,255,0)',
                borderColor: 'orange',
                data: hospitalCapHistory,
            }, {
                label: "Infected",
                backgroundColor: infectedColor,
                borderColor: infectedColor,
                data: infectedHistory,
            }, {
                label: "Dead",
                backgroundColor: deadColor,
                borderColor: deadColor,
                data: deadHistory,
            }, {
                label: "Recovered",
                backgroundColor: recoveredColor,
                borderColor: recoveredColor,
                data: recoveredHistory,
            }, {
                label: "Healthy",
                backgroundColor: healthyColor,
                borderColor: healthyColor,
                data: healthyHistory,
            }]
        },
        options: {
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        fontSize: mobile ? 22 : 14
                    }
                }],
                xAxes: [{
                    ticks: {
                        fontSize: mobile ? 22 : 14
                    }
                }]
            },
            legend: {
                labels: {
                    // This more specific font property overrides the global property
                    fontSize: mobile ? 22 : 14
                }
            }
        }
    });
}

function updateText() {

    noStroke();
    textSize(28);
    if (mobile) textSize(40)
    fill(0, 0, 0, 180);
    text('Day ' + currentDay, 10 + mobile * 30, 30 + mobile * 30);
    textSize(15);
    if (mobile) textSize(27)
    text('Initial Population: ' + populationSize, 10 + mobile * 30, 55 + mobile * 45);
    text('Hospitals Capacity: ' + hospitalCapacity, 10 + mobile * 30, 75 + mobile * 55);
    fill(0, 0, 0, 180);
    textSize(20);
    if (mobile) textSize(36)
    text('State: ', 6 + mobile * 30, canvasHeight - 8.3 - mobile * 30);
    if (quarantine) {
        fill(quarantineColor());
        text('Quarantine ', 59 + mobile * 80, canvasHeight - 8 - mobile * 30);
    } else {
        fill(noquarantineColor());
        text('No Quarantine ', 59 + mobile * 80, canvasHeight - 8 - mobile * 30);
    }
    makeTriangle();
    noStroke();
    textSize(20);
    if (mobile) textSize(32);
    // fill('red')
    // text('Infections in Morocco: ' + infectedMoroccans, canvasWidth / 3 + mobile * 30, 30 + mobile * 30);
    // fill(healthyColor);
    text('Healthy: ' + healthy, canvasWidth - 140 - mobile * 85, 25 + mobile * 20);
    fill(infectedColor);
    text('Infected: ' + infected, canvasWidth - 140 - mobile * 85, 50 + mobile * 35);
    fill(recoveredColor);
    text('Recovered: ' + recovered, canvasWidth - 140 - mobile * 85, 75 + mobile * 50);
    fill(deadColor);
    text('Dead: ' + dead, canvasWidth - 140 - mobile * 85, 100 + mobile * 65);
}


function summary() {
    if (currentDay % summaryFreq == 0) {
        summarizing = true;
        clearInterval(updatingId);
        fadeIn();
        document.body.style.cursor = 'default';
        if (flag) {
            //let tempId = setInterval(fadeIn,25);
            flag = false;
            setTimeout(function () {
                //flag3 = false;
                //noLoop();
                //updateDataHistory();
                //clearInterval(tempId);
                for (let i = 0; i < fRate; i++) {
                    fadeIn();
                }
                clearInterval(movingId);
                //needChart=true;
                makeChart();
            }, 800);
            setTimeout(makeButton, 1500);
        }

    }
}

// Transition from simulation to summary
function fadeIn() {
    background(255, 255, 255, 35);
    textSize(40);
    if (mobile) textSize(48)
    fill(0, 0, 0, 50);
    if (endResult)
        text('Summary', canvasWidth / 2 - 80, canvasHeight / (10 + 5 * mobile));
    else
        text('Week ' + Math.ceil(currentDay / 7), canvasWidth / 2 - 70, canvasHeight / 10);
    textSize(14);
    if (mobile) textSize(25)
    if (endResult)
        text("-- Congratulations to the survivors! --", canvasWidth / 2 - 105 - mobile * 80, canvasHeight / (7 + 3.5 * mobile));
    else
        text("--Click on each category (colored box) to hide/show chart lines--", canvasWidth / 2 - 200 - mobile * 115, canvasHeight / 7 + 2);
    if (mobile) {
        text(" (Q): Period in Quarantine ", canvasWidth / 4 - 130, canvasHeight - 220);
        text(" (N): Period not in Quarantine ", canvasWidth / 4 - 130, canvasHeight - 150);
    } else {
        text(" (Q): Period in Quarantine ", canvasWidth / 2 - 200 - mobile * 200, canvasHeight - 10);
        text(" (N): Period not in Quarantine ", canvasWidth / 2, canvasHeight - 10);
    }
}

// Updating chart's labels and data points for every week
function updateDataHistory() {
    healthyHistory.push(healthy);
    infectedHistory.push(infected);
    recoveredHistory.push(recovered);
    deadHistory.push(dead);
    yLabels.push(quarantine ? currentDay + " (Q)" : currentDay + " (N)");
    fontColors.push(quarantine ? healthyColor : infectedColor);
    hospitalCapHistory.push(hospitalCapacity);
}

function makeSummary() {
    let infectedPer = (100 * maxInfected / populationSize).toFixed(2);
    let deadPer = (100 * dead / populationSize).toFixed(2);
    let recoveredPer = (100 * recovered / maxInfected).toFixed(2);
    let untreatedPer = (100 * Math.max(0, (peakInfection - hospitalCapacity)) / maxInfected).toFixed(2);
    textSize(26);
    if (mobile) textSize(35)
    fill(0, 0, 0);
    text("Statistics", canvasWidth * 0.85 - mobile * 250, (2 * mobile + 1) * canvasHeight / 4);
    textSize(13)
    if (mobile) textSize(25)
    text("Days elapsed: " + currentDay + "(" + Math.ceil(currentDay / 7) + " weeks)", canvasWidth * 0.8 - mobile * 250, (2 * mobile + 1) * canvasHeight / 4 + 40 + mobile * 15);
    text("Total Infections: " + maxInfected + " (" + infectedPer + "%)", canvasWidth * 0.8 - mobile * 250, (2 * mobile + 1) * canvasHeight / 4 + 70 + mobile * 30);
    text("Total Deaths: " + dead + " (" + deadPer + "%)", canvasWidth * 0.8 - mobile * 250, (2 * mobile + 1) * canvasHeight / 4 + 100 + mobile * 45);
    text("Total Recovered: " + recovered + " (" + recoveredPer + "%)", canvasWidth * 0.8 - mobile * 250, (2 * mobile + 1) * canvasHeight / 4 + 130 + mobile * 60);
    text("Hospital Deficiency: " + daysOverCapacity + " days", canvasWidth * 0.8 - mobile * 250, (2 * mobile + 1) * canvasHeight / 4 + 160 + mobile * 75);
    text("Untreated cases: " + (peakInfection - hospitalCapacity).toString() + " (" + untreatedPer + "%)", canvasWidth * 0.8 - mobile * 250, (2 * mobile + 1) * canvasHeight / 4 + 190 + mobile * 90);
}