//test
var Marathon = 0;
var Marathon2 = 0;
var auto = false;
var autoS = true;
var controlDown = false;
var shiftDown = false;
var player = {
    money: new Decimal(10),
    tickSpeedCost: new Decimal(1000),
    tickspeed: new Decimal(1000),
    firstCost: new Decimal(10),
    secondCost: new Decimal(100),
    thirdCost: new Decimal(10000),
    fourthCost: new Decimal(1000000),
    fifthCost: new Decimal(1e9),
    sixthCost: new Decimal(1e13),
    seventhCost: new Decimal(1e18),
    eightCost: new Decimal(1e24),
    firstAmount: new Decimal(0),
    secondAmount: new Decimal(0),
    thirdAmount: new Decimal(0),
    fourthAmount: new Decimal(0),
    firstBought: 0,
    secondBought: 0,
    thirdBought: 0,
    fourthBought: 0,
    fifthAmount: new Decimal(0),
    sixthAmount: new Decimal(0),
    seventhAmount: new Decimal(0),
    eightAmount: new Decimal(0),
    fifthBought: 0,
    sixthBought: 0,
    seventhBought: 0,
    eightBought: 0,
    firstPow: new Decimal(1),
    secondPow: new Decimal(1),
    thirdPow: new Decimal(1),
    fourthPow: new Decimal(1),
    fifthPow: new Decimal(1),
    sixthPow: new Decimal(1),
    seventhPow: new Decimal(1),
    eightPow: new Decimal(1),
    sacrificed: new Decimal(0),
    achievements: [],
    infinityUpgrades: [],
    challenges: [],
    currentChallenge: "",
    infinityPoints: new Decimal(0),
    infinitied: 0,
    infinitiedBank: 0,
    totalTimePlayed: 0,
    bestInfinityTime: 9999999999,
    thisInfinityTime: 0,
    resets: 0,
    galaxies: 0,
    tickDecrease: 0.9,
    totalmoney: new Decimal(0),
    achPow: 1,
    newsArray: [],
    interval: null,
    lastUpdate: new Date().getTime(),
    autobuyers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    costMultipliers: [new Decimal(1e3), new Decimal(1e4), new Decimal(1e5), new Decimal(1e6), new Decimal(1e8), new Decimal(1e10), new Decimal(1e12), new Decimal(1e15)],
    tickspeedMultiplier: new Decimal(10),
    chall2Pow: 1,
    chall3Pow: new Decimal(0.01),
    matter: new Decimal(0),
    chall11Pow: new Decimal(1),
    partInfinityPoint: 0,
    partInfinitied: 0,
    break: false,
    challengeTimes: [600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31],
    infchallengeTimes: [600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31],
    lastTenRuns: [[600*60*24*31, 1], [600*60*24*31, 1], [600*60*24*31, 1], [600*60*24*31, 1], [600*60*24*31, 1], [600*60*24*31, 1], [600*60*24*31, 1], [600*60*24*31, 1], [600*60*24*31, 1], [600*60*24*31, 1]],
    lastTenEternities: [[600*60*24*31, 1], [600*60*24*31, 1], [600*60*24*31, 1], [600*60*24*31, 1], [600*60*24*31, 1], [600*60*24*31, 1], [600*60*24*31, 1], [600*60*24*31, 1], [600*60*24*31, 1], [600*60*24*31, 1]],
    infMult: new Decimal(1),
    infMultCost: new Decimal(10),
    tickSpeedMultDecrease: 10,
    tickSpeedMultDecreaseCost: 3e6,
    dimensionMultDecrease: 10,
    dimensionMultDecreaseCost: 1e8,
    overXGalaxies: 10,
    version: 9.01,
    infDimensionsUnlocked: [false, false, false, false, false, false, false, false],
    infinityPower: new Decimal(1),
    spreadingCancer: 0,
    postChallUnlocked: 0,
    postC4Tier: 0,
    postC3Reward: new Decimal(1),
    eternityPoints: new Decimal(0),
    eternities: 0,
    thisEternity: 0,
    bestEternity: 9999999999,
    eternityUpgrades: [],
    epmult: new Decimal(1),
    epmultCost: new Decimal(500),
    infinityDimension1 : {
        cost: new Decimal(1e8),
        amount: new Decimal(0),
        bought: 0,
        power: new Decimal(1),
        baseAmount: 0
    },
    infinityDimension2 : {
        cost: new Decimal(1e9),
        amount: new Decimal(0),
        bought: 0,
        power: new Decimal(1),
        baseAmount: 0
    },
    infinityDimension3 : {
        cost: new Decimal(1e10),
        amount: new Decimal(0),
        bought: 0,
        power: new Decimal(1),
        baseAmount: 0
    },
    infinityDimension4 : {
        cost: new Decimal(1e20),
        amount: new Decimal(0),
        bought: 0,
        power: new Decimal(1),
        baseAmount: 0
    },
    infinityDimension5 : {
        cost: new Decimal(1e140),
        amount: new Decimal(0),
        bought: 0,
        power: new Decimal(1),
        baseAmount: 0
    },
    infinityDimension6 : {
        cost: new Decimal(1e200),
        amount: new Decimal(0),
        bought: 0,
        power: new Decimal(1),
        baseAmount: 0
    },
    infinityDimension7 : {
        cost: new Decimal(1e250),
        amount: new Decimal(0),
        bought: 0,
        power: new Decimal(1),
        baseAmount: 0
    },
    infinityDimension8 : {
        cost: new Decimal(1e280),
        amount: new Decimal(0),
        bought: 0,
        power: new Decimal(1),
        baseAmount: 0
    },
    infDimBuyers: [false, false, false, false, false, false, false, false],
    timeShards: new Decimal(0),
    tickThreshold: new Decimal(1),
    totalTickGained: 0,
    timeDimension1: {
        cost: new Decimal(1),
        amount: new Decimal(0),
        power: new Decimal(1),
        bought: 0
    },
    timeDimension2: {
        cost: new Decimal(5),
        amount: new Decimal(0),
        power: new Decimal(1),
        bought: 0
    },
    timeDimension3: {
        cost: new Decimal(100),
        amount: new Decimal(0),
        power: new Decimal(1),
        bought: 0
    },
    timeDimension4: {
        cost: new Decimal(1000),
        amount: new Decimal(0),
        power: new Decimal(1),
        bought: 0
    },
    offlineProd: 0,
    offlineProdCost: 1e7,
    challengeTarget: 0,
    autoSacrifice: 1,
    replicanti: {
        amount: new Decimal(0),
        unl: false,
        chance: 0.01,
        chanceCost: new Decimal(1e150),
        interval: 1000,
        intervalCost: new Decimal(1e140),
        gal: 0,
        galaxies: 0,
        galCost: new Decimal(1e170),
        auto: [false, false, false]
    },
    timestudy: {
        theorem: 0,
        amcost: new Decimal("1e20000"),
        ipcost: new Decimal(1),
        epcost: new Decimal(1),
        studies: [],
    },
    eternityChalls: {},
    eternityChallGoal: new Decimal(Number.MAX_VALUE),
    currentEternityChall: "",
    eternityChallUnlocked: 0,
    etercreq: 0,
    autoIP: new Decimal(0),
    autoTime: 1e300,
    infMultBuyer: false,
    autoCrunchMode: "amount",
    respec: false,
    eternityBuyer: {
        limit: new Decimal(0),
        isOn: false
    },
    eterc8ids: 50,
    eterc8repl: 40,
    dimlife: true,
    dead: true,
    options: {
        newsHidden: false,
        notation: "Standard",
        //Standard = normal prefixed numbers, Scientific = standard form, Engineering = powers of 3.
        scientific: false,
        challConf: false,
        sacrificeConfirmation: true,
        retryChallenge: false,
        bulkOn: true,
        cloud: true,
        hotkeys: true,
        theme: undefined,
        secretThemeKey: 0,
        eternityconfirm: true,
        commas: true,
        chart: {
            updateRate: 1000,
            duration: 10,
            warning: 0,
        }
    }

};

/*var c = document.getElementById("game");
var ctx = c.getContext("2d");*/

var defaultStart = $.extend(true, {}, player);
var firstButton = document.getElementById("first");
var secondButton = document.getElementById("second");
var thirdButton = document.getElementById("third");
var fourthButton = document.getElementById("fourth");
var fifthButton = document.getElementById("fifth");
var sixthButton = document.getElementById("sixth");
var seventhButton = document.getElementById("seventh");
var eightButton = document.getElementById("eight");
var tickSpeedButton = document.getElementById("tickSpeed");


if (!String.prototype.includes) {
    String.prototype.includes = function(search, start) {
      'use strict';
      if (typeof start !== 'number') {
        start = 0;
      }

      if (start + search.length > this.length) {
        return false;
      } else {
        return this.indexOf(search, start) !== -1;
      }
    };
  }


  if (!Array.prototype.includes) {
    Object.defineProperty(Array.prototype, 'includes', {
      value: function(searchElement, fromIndex) {

        // 1. Let O be ? ToObject(this value).
        if (this == null) {
          throw new TypeError('"this" is null or not defined');
        }

        var o = Object(this);

        // 2. Let len be ? ToLength(? Get(O, "length")).
        var len = o.length >>> 0;

        // 3. If len is 0, return false.
        if (len === 0) {
          return false;
        }

        // 4. Let n be ? ToInteger(fromIndex).
        //    (If fromIndex is undefined, this step produces the value 0.)
        var n = fromIndex | 0;

        // 5. If n ≥ 0, then
        //  a. Let k be n.
        // 6. Else n < 0,
        //  a. Let k be len + n.
        //  b. If k < 0, let k be 0.
        var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

        function sameValueZero(x, y) {
          return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
        }

        // 7. Repeat, while k < len
        while (k < len) {
          // a. Let elementK be the result of ? Get(O, ! ToString(k)).
          // b. If SameValueZero(searchElement, elementK) is true, return true.
          // c. Increase k by 1.
          if (sameValueZero(o[k], searchElement)) {
            return true;
          }
          k++;
        }

        // 8. Return false
        return false;
      }
    });
  }

    if (!Math.log10) {
        Math.log10 = Math.log10 || function(x) {
            return Math.log(x) * Math.LOG10E;
        };
    }

    if (!Math.log2) {
        Math.log2 = Math.log2 || function(x) {
            return Math.log(x) * Math.LOG2E;
        };
    }

    if (window.NodeList && !NodeList.prototype.forEach) {
        NodeList.prototype.forEach = function (callback, thisArg) {
            thisArg = thisArg || window;
            for (var i = 0; i < this.length; i++) {
                callback.call(thisArg, this[i], i, this);
            }
        };
    }


function set_save(name, value) {
    localStorage.setItem(name, btoa(JSON.stringify(value, function(k, v) { return (v === Infinity) ? "Infinity" : v; })))
}

function get_save(name) {
    if (localStorage.getItem("dimensionSave") !== null) {
        return JSON.parse(atob(localStorage.getItem(name), function(k, v) { return (v === Infinity) ? "Infinity" : v; }))
    }
}

var canvas = document.getElementById("studyTreeCanvas");
var ctx = canvas.getContext("2d");
window.addEventListener("resize", resizeCanvas)

function resizeCanvas() {
    canvas.width = document.body.scrollWidth;
    canvas.height = document.body.scrollHeight;
    drawStudyTree()
}

Array.max = function( array ){
    return Math.max.apply( Math, array );
};

Array.min = function( array ){
    return Math.min.apply( Math, array );
};

Object.invert = function(obj) {
    var result = {};
    var keys = Object.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
};

Chart.defaults.global.defaultFontColor = 'black';
Chart.defaults.global.defaultFontFamily = 'Typewriter';
var ctx2 = document.getElementById("normalDimChart").getContext('2d');
var normalDimChart = new Chart(ctx2, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: ['Exponents of antimatter per second'],
            data: [],
            backgroundColor: [
                'rgba(0,0,0,1)'
            ],
            borderColor: [
                'rgba(0,0,0,1)'
            ],
            fill: false,
            lineTension: 0.1,
            borderWidth: 3,
            pointRadius: 0,
            pointBorderWidth: 0,
            pointHoverRadius: 0
        }]
    },
    options: {
        tooltips: {enabled: false},
        hover: {mode: null},
        legend: {
            display: false,
            labels: {
                boxWidth: 0
            }
        },
        scales: {
            yAxes: [{
                ticks: {
                    max: 1000000,
                    min: 0
                }
            }],
            xAxes: [{
                gridLines: {
                    display: false,
                    drawTicks: false
                },
                ticks: {
                    fontSize: 0
                }
            }]
        },
        layout: {
            padding: {
            top: 10
            }
        }
    }
});

function updateChartValues() {
    player.options.chart.duration = Math.min(Math.max(parseInt(document.getElementById("chartDurationInput").value), 1), 300);
    document.getElementById("chartDurationInput").value = player.options.chart.duration;
    player.options.chart.updateRate = Math.min(Math.max(parseInt(document.getElementById("chartUpdateRateInput").value), 50), 10000);
    document.getElementById("chartUpdateRateInput").value = player.options.chart.updateRate;
    if (Number.isInteger(player.options.chart.updateRate) === false) {
        player.options.chart.updateRate = 1000
    }
    if ((player.options.chart.updateRate <= 200 && player.options.chart.duration >= 30) && player.options.chart.warning === 0) {
        alert("Warning: setting the duration and update rate too high can cause performance issues.")
        player.options.chart.warning = 1;
    }
    if (player.options.chart.duration / player.options.chart.updateRate * 1000 >= 1000 && player.options.chart.warning !== 2) {
        alert("Warning: you have set the duration and update rate quite high, make sure you know what you're doing or have a good computer")
        player.options.chart.warning = 2;
    }
}

function addData(chart, label, data) {
    if (chart.data.datasets[0].data.length >= Math.ceil(player.options.chart.duration / player.options.chart.updateRate * 1000)) {
        chart.data.labels.shift();
        chart.data.datasets[0].data.shift();
    }
    if (player.options.notation === "Logarithm") {
        data = Math.max(data.log(10), 0.1);
    } else {
        data = data.exponent + (data.mantissa / 10);
    }
    comp1 = Array.max(chart.data.datasets[0].data);
    comp2 = Array.min(chart.data.datasets[0].data);
    if (data > comp1) {
        chart.options.scales.yAxes[0].ticks.max = data;
    }
    if (chart.options.scales.yAxes[0].ticks.min < comp2) {
        chart.options.scales.yAxes[0].ticks.min = comp2;
    }
    if (data < chart.options.scales.yAxes[0].ticks.min) {
        chart.options.scales.yAxes[0].ticks.min = data;
    }
    var preservedChartValues = false;
    let failSafe = 0;
    while (chart.data.datasets[0].data.length < Math.ceil(player.options.chart.duration / player.options.chart.updateRate * 1000 - 1)) {
        if (preservedChartValues) {
            chart.data.labels.push(label);
            chart.data.datasets.forEach((dataset) => {
            dataset.data.push(data);
            });
        } else {
            var temp = chart.data.datasets[0].data.slice()
            var tempData = data;
            preservedChartValues = true;
        }
        if (chart.data.datasets[0].data.length >= Math.ceil(player.options.chart.duration / player.options.chart.updateRate * 1000 - 1)) {
            var temp2 = chart.data.datasets[0].data.slice()
            for (i=0; i<temp.length; i++) {
                temp2[chart.data.datasets[0].data.length - temp.length + i] = temp[i];
                temp2[i] = data;
            }
            chart.data.datasets[0].data = temp2;
        }
    }
    while (chart.data.datasets[0].data.length > Math.ceil(player.options.chart.duration / player.options.chart.updateRate * 1000 - 1) && failSafe < (player.options.chart.duration / player.options.chart.updateRate * 1000 - 1)) {
        chart.data.labels.pop(label);
        chart.data.datasets.forEach((dataset) => {
            dataset.data.pop(data);
        });
        failSafe++;
    }
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update(300);
}

function drawTreeBranch(num1, num2) {
    var name1 = parseInt(num1)
    if (isNaN(parseInt(num2))) {
        var a = num2.split("c")[1]
        var name2 = parseInt(a.split("u")[0])
    } else {
        var name2 = parseInt(num2)
    }
    var start = document.getElementById(num1).getBoundingClientRect()
    var end = document.getElementById(num2).getBoundingClientRect()
    var x1 = start.left + (start.width / 2) + (document.documentElement.scrollLeft || document.body.scrollLeft);
    var y1 = start.top + (start.height / 2) + (document.documentElement.scrollTop || document.body.scrollTop);
    var x2 = end.left + (start.width / 2) + (document.documentElement.scrollLeft || document.body.scrollLeft);
    var y2 = end.top + (start.height / 2) + (document.documentElement.scrollTop || document.body.scrollTop);
    ctx.lineWidth=15;
    ctx.beginPath();
    if ((player.timestudy.studies.includes(name1) && player.timestudy.studies.includes(name2)) || player.eternityChallUnlocked === name2) {
        if (name2 < 20) {
            ctx.strokeStyle="#490066";
        } else if (name2 == 71 || name2 == 81 || name2 == 91 || name2 == 101 || name1 == 101) {
            ctx.strokeStyle="#22aa48";
        } else if (name2 == 72 || name2 == 82 || name2 == 92 || name2 == 102 || name1 == 102) {
            ctx.strokeStyle="#B67F33";
        } else if (name2 == 73 || name2 == 83 || name2 == 93 || name2 == 103 || name1 == 103) {
            ctx.strokeStyle="#B241E3";
        } else if (name2 == 121 || name2 == 131 || name2 == 141 || name1 == 141) {
            ctx.strokeStyle="#FF0100";
        } else if (name2 == 122 || name2 == 132 || name2 == 142 || name1 == 142) {
            ctx.strokeStyle="#5E33B6";
        } else if (name2 == 123 || name2 == 133 || name2 == 143 || name1 == 143) {
            ctx.strokeStyle="#0080ff";
        } else {
            ctx.strokeStyle="#000000";
        }
    } else {
        if (name2 < 20) {
            ctx.strokeStyle="#4b3753";
        } else if (name2 == 71 || name2 == 81 || name2 == 91 || name2 == 101 || name1 == 101) {
            ctx.strokeStyle="#37533f";
        } else if (name2 == 72 || name2 == 82 || name2 == 92 || name2 == 102 || name1 == 102) {
            ctx.strokeStyle="#534737";
        } else if (name2 == 73 || name2 == 83 || name2 == 93 || name2 == 103 || name1 == 103) {
            ctx.strokeStyle="#4a3753";
        } else if (name2 == 121 || name2 == 131 || name2 == 141 || name1 == 141) {
            ctx.strokeStyle="#533737";
        } else if (name2 == 122 || name2 == 132 || name2 == 142 || name1 == 142) {
            ctx.strokeStyle="#403753";
        } else if (name2 == 123 || name2 == 133 || name2 == 143 || name1 == 143) {
            ctx.strokeStyle="#374553";
        } else {
            ctx.strokeStyle="#444";
        }
    }
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function drawStudyTree() {
    drawTreeBranch("11", "21");
    drawTreeBranch("11", "22");
    drawTreeBranch("21", "31");
    drawTreeBranch("21", "33");
    drawTreeBranch("22", "32");
    drawTreeBranch("31", "41");
    drawTreeBranch("32", "42");
    drawTreeBranch("41", "51");
    drawTreeBranch("42", "51");
    drawTreeBranch("51", "61");
    drawTreeBranch("ec5unl", "62")
    drawTreeBranch("61", "71");
    drawTreeBranch("61", "72");
    drawTreeBranch("61", "73");
    drawTreeBranch("71", "81");
    drawTreeBranch("72", "82");
    drawTreeBranch("73", "83");
    drawTreeBranch("81", "91");
    drawTreeBranch("82", "92");
    drawTreeBranch("83", "93");
    drawTreeBranch("91", "101");
    drawTreeBranch("92", "102");
    drawTreeBranch("93", "103");
    drawTreeBranch("101", "111");
    drawTreeBranch("102", "111");
    drawTreeBranch("103", "111");
    drawTreeBranch("111", "121");
    drawTreeBranch("111", "122");
    drawTreeBranch("111", "123");
    drawTreeBranch("121", "131");
    drawTreeBranch("122", "132");
    drawTreeBranch("123", "133");
    drawTreeBranch("131", "141");
    drawTreeBranch("132", "142");
    drawTreeBranch("133", "143");
    drawTreeBranch("141", "151");
    drawTreeBranch("142", "151");
    drawTreeBranch("143", "151");
    drawTreeBranch("151", "161");
    drawTreeBranch("151", "162");
    drawTreeBranch("161", "171");
    drawTreeBranch("162", "171");
    drawTreeBranch("171", "ec1unl")
    drawTreeBranch("171", "ec2unl")
    drawTreeBranch("171", "ec3unl")
    drawTreeBranch("143", "ec4unl")
    drawTreeBranch("42", "ec5unl")
    drawTreeBranch("121", "ec6unl")
    drawTreeBranch("111", "ec7unl")
    drawTreeBranch("123", "ec8unl")
    drawTreeBranch("151", "ec9unl")
    drawTreeBranch("ec1unl", "181")
    drawTreeBranch("ec2unl", "181")
    drawTreeBranch("ec3unl", "181")
    drawTreeBranch("181", "ec10unl")
    drawTreeBranch("ec10unl", "191")
    drawTreeBranch("ec10unl", "192")
    drawTreeBranch("ec10unl", "193")
    drawTreeBranch("191", "211")
    drawTreeBranch("191", "212")
    drawTreeBranch("192", "201")
    drawTreeBranch("193", "213")
    drawTreeBranch("193", "214")
    
}

function setTheme(name) {
    document.querySelectorAll("link").forEach( function(e) {
        if (e.href.includes("theme")) e.remove();
    });

    if(name === undefined) {
        document.getElementById("theme").innerHTML="Current theme: Normal";
    } else if(name === "S1") {
        document.getElementById("theme").innerHTML="Current theme: " + player.options.secretThemeKey;
        Chart.defaults.global.defaultFontColor = 'black';
        normalDimChart.data.datasets[0].borderColor = '#000'
    } else if(name === "S2") {
        document.getElementById("theme").innerHTML="Current theme: " + player.options.secretThemeKey;
        Chart.defaults.global.defaultFontColor = 'black';
        normalDimChart.data.datasets[0].borderColor = '#000'
    } else if(name === "S3") {
        document.getElementById("theme").innerHTML="Current theme: " + player.options.secretThemeKey;
        Chart.defaults.global.defaultFontColor = 'black';
        normalDimChart.data.datasets[0].borderColor = '#000'
    } else if(name === "S4") {
        document.getElementById("theme").innerHTML="Current theme: " + player.options.secretThemeKey;
        Chart.defaults.global.defaultFontColor = 'black';
        normalDimChart.data.datasets[0].borderColor = '#000'
    } else {
        document.getElementById("theme").innerHTML="Current theme: " + name;
    }

    if (name === undefined) return;

    var head = document.head;
    var link = document.createElement('link');

    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = "stylesheets/theme-" + name + ".css";

    head.appendChild(link);
}

document.getElementById("theme").onclick = function () {
    if (player.options.theme === undefined) {
        player.options.theme = "Metro";
    } else if (player.options.theme === "Metro") {
        player.options.theme = "Dark";
        Chart.defaults.global.defaultFontColor = '#888';
        normalDimChart.data.datasets[0].borderColor = '#888'
    } else if (player.options.theme === "Dark") {
        player.options.theme = "Dark Metro";
    } else if (player.options.theme === "Dark Metro") {
        player.options.theme = "Inverted";
        Chart.defaults.global.defaultFontColor = 'black';
        normalDimChart.data.datasets[0].borderColor = '#000'
    } else if (player.options.theme === "Inverted") {
        player.options.theme = "Inverted Metro";
    } else {
        player.options.theme = undefined;
        Chart.defaults.global.defaultFontColor = 'black';
        normalDimChart.data.datasets[0].borderColor = '#000'
    }

    setTheme(player.options.theme);

}


let kongIPMult = 1
let kongDimMult = 1




function onLoad() {
    if (player.totalmoney === undefined || isNaN(player.totalmoney)) player.totalmoney = player.money;
    if (player.options === undefined) {
        player.options = {
            scientific: false,
            animationOn: true
        }
    }
    if (player.options.invert === true) player.options.theme = "Inverted"; player.options.invert = undefined;
    if (player.options.notation === undefined) player.options.notation = "Standard"
    if (player.options.challConf === undefined) player.options.challConf = false
	if (player.options.notation === undefined) player.options.notation = "Standard";
    if (player.options.newsHidden === undefined) player.options.newsHidden = false;
    if (player.options.sacrificeConfirmation === undefined) player.options.sacrificeConfirmation = true;
    if (player.options.retryChallenge === undefined) player.options.retryChallenge = false;
    if (player.options.bulkOn === undefined) player.options.bulkOn = true
    if (player.options.cloud === undefined) player.options.cloud = true
    if (player.options.hotkeys === undefined) player.options.hotkeys = true
    if (player.options.eternityconfirm === undefined) player.options.eternityconfirm = true
    if (player.options.themes === undefined) player.options.themes = "Normal"
    if (player.options.secretThemeKey === undefined) player.options.secretThemeKey = 0
    if (player.achievements === undefined) player.achievements = [];
    if (player.sacrificed === undefined) player.sacrificed = new Decimal(0);
    if (player.infinityUpgrades === undefined) player.infinityUpgrades = [];
    if (player.infinityPoints === undefined) player.infinityPoints = new Decimal(0);
    if (player.infinitied === undefined) player.infinitied = 0;
    if (player.totalTimePlayed === undefined) player.totalTimePlayed = 0;
    if (player.bestInfinityTime === undefined) player.bestInfinityTime = 9999999999;
    if (player.thisInfinityTime === undefined) player.thisInfinityTime = 9999999999;
    if (player.galaxies === undefined) player.galaxies = 0;
    if (player.lastUpdate === undefined) player.lastUpdate = new Date().getTime();
    if (player.achPow === undefined) player.achPow = 1;
    if (player.newsArray === undefined) player.newsArray = [];
    if (player.chall2Pow === undefined) player.chall2Pow = 1;
    if (player.chall3Pow === undefined) player.chall3Pow = 0.01;
    if (player.firstAmount !== 0) document.getElementById("secondRow").style.display = "table-row";
    if (player.challenges === undefined) player.challenges = []
    if (player.currentChallenge === undefined) player.currentChallenge = ""
	if (player.infinitied > 0 && !player.challenges.includes("challenge1")) player.challenges.push("challenge1")
    if (player.matter === undefined) player.matter = new Decimal(0)
    if (player.autobuyers === undefined) player.autobuyers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    if (player.costMultipliers === undefined) player.costMultipliers = [new Decimal(1e3), new Decimal(1e4), new Decimal(1e5), new Decimal(1e6), new Decimal(1e8), new Decimal(1e10), new Decimal(1e12), new Decimal(1e15)]
    if (player.tickspeedMultiplier === undefined) player.tickspeedMultiplier = new Decimal(10)
    if (player.partInfinityPoint === undefined) player.partInfinityPoint = 0
    if (player.challengeTimes === undefined) player.challengeTimes = [600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31]
    if (player.infchallengeTimes === undefined) player.infchallengeTimes = [600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31]
    if (player.lastTenRuns === undefined) player.lastTenRuns = [[600*60*24*31, 1], [600*60*24*31, 1], [600*60*24*31, 1], [600*60*24*31, 1], [600*60*24*31, 1], [600*60*24*31, 1], [600*60*24*31, 1], [600*60*24*31, 1], [600*60*24*31, 1], [600*60*24*31, 1]]
    if (player.infMult === undefined) player.infMult = new Decimal(1)
    if (player.infMultCost === undefined) player.infMultCost = new Decimal(100)
    if (player.tickSpeedMultDecrease === undefined) player.tickSpeedMultDecrease = 10
    if (player.tickSpeedMultDecreaseCost === undefined) player.tickSpeedMultDecreaseCost = 3e6
    if (player.dimensionMultDecrease === undefined) player.dimensionMultDecrease = 10
    if (player.dimensionMultDecreaseCost === undefined) player.dimensionMultDecreaseCost = 1e8
    if (player.overXGalaxies === undefined) player.overXGalaxies = 10;
    if (player.partInfinitied === undefined) player.partInfinitied = 0
    if (player.spreadingCancer === undefined) player.spreadingCancer = 0
    if (player.postC4Tier === undefined) player.postC4Tier = 0
    if (player.postC3Reward === undefined) player.postC3Reward = new Decimal(1)
    if (player.offlineProd === undefined) player.offlineProd = 0
    if (player.offlineProdCost === undefined) player.offlineProdCost = 1e7
    if (player.autoSacrifice === undefined) player.autoSacrifice = 1
    if (player.postChallUnlocked === undefined) player.postChallUnlocked = 0
    if (player.infMultBuyer === undefined) player.infMultBuyer = false
    if (player.autoCrunchMode === undefined) player.autoCrunchMode = "amount"
    if (player.challengeTarget === undefined) {
        player.challengeTarget = 0
        if (player.currentChallenge != "") player.challengeTarget = Number.MAX_VALUE
    }
    if (player.lastTenEternities === undefined) player.lastTenEternities = [[600*60*24*31, 1], [600*60*24*31, 1], [600*60*24*31, 1], [600*60*24*31, 1], [600*60*24*31, 1], [600*60*24*31, 1], [600*60*24*31, 1], [600*60*24*31, 1], [600*60*24*31, 1], [600*60*24*31, 1]]
    if (player.respec === undefined) player.respec = false
    if (player.options.commas === undefined) player.options.commas = true
    if (player.eternityChalls === undefined) player.eternityChalls = {}
    if (player.eternityChallGoal === undefined) player.eternityChallGoal = new Decimal(Number.MAX_VALUE)
    if (player.currentEternityChall === undefined) player.currentEternityChall = ""
    if (player.eternityChallUnlocked === undefined) player.eternityChallUnlocked = 0
    if (player.options.chart === undefined) player.options.chart = {}
    if (player.options.chart.updateRate === undefined) player.options.chart.updateRate = 1000
    if (player.options.chart.duration === undefined) player.options.chart.duration = 10
    if (player.options.chart.warning === undefined) player.options.chart.warning = 0
    if (player.options.chart.on === undefined) player.options.chart.on = false
    if (player.etercreq === undefined) player.etercreq = 0
    if (player.options.updateRate === undefined) player.options.updateRate = 50
    if (player.eterc8ids === undefined) player.eterc8ids = 50
    if (player.eterc8repl === undefined) player.eterc8repl = 40
    if (player.infinitiedBank === undefined) player.infinitiedBank = 0
    if (player.dimlife === undefined) player.dimlife = false
    if (player.dead === undefined) player.dead = false
    setTheme(player.options.theme);

    sliderText.innerHTML = "Update rate: " + player.options.updateRate + "ms";
    slider.value = player.options.updateRate;

    if (player.secondAmount !== 0) {
        document.getElementById("thirdRow").style.display = "table-row";
        document.getElementById("tickSpeed").style.visibility = "visible";
        document.getElementById("tickSpeedMax").style.visibility = "visible";
        document.getElementById("tickLabel").style.visibility = "visible";
        document.getElementById("tickSpeedAmount").style.visibility = "visible";
    }
    if (player.options.notation == "Mixed") player.options.notation = "Mixed scientific"

    if (player.infinityPower === undefined) {
        player.infinityPower = new Decimal(1)
        player.infinityDimension1 = {
            cost: new Decimal(1e8),
            amount: new Decimal(0),
            bought: 0,
            power: new Decimal(1),
            baseAmount: 0
        }
        player.infinityDimension2 = {
            cost: new Decimal(1e9),
            amount: new Decimal(0),
            bought: 0,
            power: new Decimal(1),
            baseAmount: 0
        }
        player.infinityDimension3 = {
            cost: new Decimal(1e10),
            amount: new Decimal(0),
            bought: 0,
            power: new Decimal(1),
            baseAmount: 0
        }
        player.infinityDimension4 = {
            cost: new Decimal(1e20),
            amount: new Decimal(0),
            bought: 0,
            power: new Decimal(1),
            baseAmount: 0
        }
        player.infDimensionsUnlocked = [false, false, false, false]
    }

    if (player.timeShards === undefined) {
        player.timeShards = new Decimal(0)
        player.eternityPoints = new Decimal(0)
        player.tickThreshold = new Decimal(1)
        player.totalTickGained = 0
        player.eternities = 0
        player.timeDimension1 = {
            cost: new Decimal(1),
            amount: new Decimal(0),
            power: new Decimal(1),
            bought: 0
        }
        player.timeDimension2 = {
            cost: new Decimal(5),
            amount: new Decimal(0),
            power: new Decimal(1),
            bought: 0
        }
        player.timeDimension3 = {
            cost: new Decimal(100),
            amount: new Decimal(0),
            power: new Decimal(1),
            bought: 0
        }
        player.timeDimension4 = {
            cost: new Decimal(1000),
            amount: new Decimal(0),
            power: new Decimal(1),
            bought: 0
        }
    }

    if (player.infinityDimension1.baseAmount === undefined) {
        player.infinityDimension1.baseAmount = 0;
        player.infinityDimension2.baseAmount = 0;
        player.infinityDimension3.baseAmount = 0;
        player.infinityDimension4.baseAmount = 0;

        player.infinityDimension1.baseAmount = new Decimal(player.infinityDimension1.power).log(50).times(10).toNumber()
        player.infinityDimension2.baseAmount = new Decimal(player.infinityDimension2.power).log(30).times(10).toNumber()
        player.infinityDimension3.baseAmount = new Decimal(player.infinityDimension3.power).log(10).times(10).toNumber()
        player.infinityDimension4.baseAmount = new Decimal(player.infinityDimension4.power).log(5).times(10).toNumber()


    }
    if (player.autoIP === undefined) player.autoIP = new Decimal(0)
    if (player.autoTime === undefined) player.autoTime = 1e300;

    if (player.matter === null) player.matter = new Decimal(0)
    for (var i=0; i<12; i++) {
        if (player.autobuyers[i]%1 !== 0 && player.autobuyers[i].tier === undefined) {
            player.autobuyers[i].tier = i+1
        }
        if (player.autobuyers[i]%1 !== 0 && player.autobuyers[i].target%1 !== 0) {
            player.autobuyers[i].target = i+1
            if (i == 8) player.autobuyers[i].target = 1
        }

        if (player.autobuyers[i]%1 !== 0 && (player.autobuyers[i].bulk === undefined || isNaN(player.autobuyers[i].bulk) || player.autobuyers[i].bulk === null)) {
            player.autobuyers[i].bulk = 1
        }
    }
    if (player.autobuyers[8].tier == 10) player.autobuyers[8].tier = 9

    if (player.thirdAmount !== 0 || player.eternities >= 30) document.getElementById("fourthRow").style.display = "table-row";
    if (player.fourthAmount !== 0|| player.eternities >= 30)
    if (player.resets > 0) document.getElementById("fifthRow").style.display = "table-row";
    if (player.fifthAmount !== 0|| player.eternities >= 30)
    if (player.resets > 1) document.getElementById("sixthRow").style.display = "table-row";
    if (player.sixthAmount !== 0|| player.eternities >= 30)
    if (player.resets > 2 && player.currentChallenge !== "challenge4" && player.currentChallenge !== "postc1") document.getElementById("seventhRow").style.display = "table-row";
    if (player.seventhAmount !== 0|| player.eternities >= 30)
    if (player.resets > 3 && player.currentChallenge !== "challenge4") document.getElementById("eightRow").style.display = "table-row";

    document.getElementById("totaltickgained").innerHTML = "You've gained "+shortenDimensions(player.totalTickGained)+" tickspeed upgrades."

    if (typeof player.autobuyers[9].bulk !== "number") {
        player.autobuyers[9].bulk = 1
    }

    if (player.options.sacrificeConfirmation == false) document.getElementById("confirmation").checked = "true"
    if (player.version === undefined) { // value will need to be adjusted when update goes live
        for (var i = 0; i < player.autobuyers.length; i++) {
            if (player.autobuyers[i]%1 !== 0) player.infinityPoints = player.infinityPoints + player.autobuyers[i].cost - 1
        }
        player.autobuyers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        player.version = 1
    }
    if (player.version == 1) {
        if (player.dimensionMultDecrease != 10) {
            if (player.dimensionMultDecrease == 9) {
                player.dimensionMultDecrease = 10
                player.dimensionMultDecreaseCost = 1e8
                player.infinityPoints = player.infinityPoints.plus(1e8)
            }
            if (player.dimensionMultDecrease == 8) {
                player.dimensionMultDecrease = 10
                player.dimensionMultDecreaseCost = 1e8
                player.infinityPoints = player.infinityPoints.plus(2.1e9)
            }
            if (player.dimensionMultDecrease == 7) {
                player.dimensionMultDecrease = 10
                player.dimensionMultDecreaseCost = 1e8
                player.infinityPoints = player.infinityPoints.plus(4.21e10)
            }
        }
        player.version = 2
    }
	if (player.version < 5) {
		player.newsArray = []
		player.version = 5
    }

    if (player.infinityDimension5 === undefined) {
        player.infDimensionsUnlocked.push(false)
        player.infDimensionsUnlocked.push(false)
        player.infinityDimension5 = {
            cost: new Decimal(1e140),
            amount: new Decimal(0),
            bought: 0,
            power: new Decimal(1),
            baseAmount: 0
        }
        player.infinityDimension6 = {
            cost: new Decimal(1e200),
            amount: new Decimal(0),
            bought: 0,
            power: new Decimal(1),
            baseAmount: 0
        }
        player.version = 6
    }

    if (player.infinityDimension7 == undefined) {
        player.infDimensionsUnlocked.push(false)
        player.infDimensionsUnlocked.push(false)
        player.infinityDimension7 = {
            cost: new Decimal(1e250),
            amount: new Decimal(0),
            bought: 0,
            power: new Decimal(1),
            baseAmount: 0
        }
        player.infinityDimension8 = {
            cost: new Decimal(1e280),
            amount: new Decimal(0),
            bought: 0,
            power: new Decimal(1),
            baseAmount: 0
        }
    }

    if (player.replicanti === undefined) {
        player.replicanti = {
            amount: new Decimal(0),
            unl: false,
            chance: 0.01,
            chanceCost: new Decimal(1e150),
            interval: 1000,
            intervalCost: new Decimal(1e140),
            gal: 0,
            galaxies: 0,
            galCost: new Decimal(1e170)
        }
    }
    if (player.bestEternity === undefined) {
        player.bestEternity = 9999999999
        player.thisEternity = player.totalTimePlayed
    }
    if (player.timestudy === undefined) {
        player.timestudy = {
            theorem: 0,
            amcost: new Decimal("1e20000"),
            ipcost: new Decimal(1),
            epcost: new Decimal(1),
            studies: [],
        }
    }
    


    if (player.eternities == 0) {
        document.getElementById("eternityPoints2").style.display = "none";
        document.getElementById("eternitystorebtn").style.display = "none";
        document.getElementById("tdtabbtn").style.display = "none";
    }

    if (player.eternityUpgrades === undefined) player.eternityUpgrades = []

    if (player.infDimBuyers === undefined) player.infDimBuyers = [false, false, false, false, false, false, false, false]

    if (player.replicanti.auto === undefined) player.replicanti.auto = [false, false, false]
    if (player.eternityBuyer === undefined) {
        player.eternityBuyer = {
            limit: new Decimal(0),
            isOn: false
        }
    }

    transformSaveToDecimal();
    updateCosts();
    updateTickSpeed();
    updateAchievements();
    updateChallenges();
    updateCheckBoxes();
    toggleChallengeRetry()
    toggleChallengeRetry()
    toggleBulk()
    toggleBulk()
    toggleCloud()
    toggleCloud()
    respecToggle()
    respecToggle()
    toggleEternityConf()
    toggleEternityConf()
    toggleCommas()
    toggleCommas()
    if (!player.replicanti.auto[0]) document.getElementById("replauto1").innerHTML = "Auto: OFF"
    if (!player.replicanti.auto[1]) document.getElementById("replauto2").innerHTML = "Auto: OFF"
    if (!player.replicanti.auto[2]) document.getElementById("replauto3").innerHTML = "Auto: OFF"
    
    loadAutoBuyerSettings();
    updateLastTenRuns()
    updateLastTenEternities()

    updateInfCosts()
    

    if (player.replicanti.unl == true) {
        document.getElementById("replicantidiv").style.display="inline-block"
        document.getElementById("replicantiunlock").style.display="none"
    } else {
        document.getElementById("replicantidiv").style.display="none"
        document.getElementById("replicantiunlock").style.display="inline-block"
    }

    if (player.version < 7) {
        player.infMultCost = player.infMultCost.dividedBy(10)
        player.version = 7
    }

    if (player.currentChallenge == "challenge12" || player.currentChallenge == "challenge9" || player.currentChallenge == "challenge5" ||
        player.currentChallenge == "postc1" || player.currentChallenge == "postc4" || player.currentChallenge == "postc5" || player.currentChallenge == "postc6" || player.currentChallenge == "postc8") document.getElementById("quickReset").style.display = "inline-block";
    else document.getElementById("quickReset").style.display = "none";


    if (player.break == true) document.getElementById("break").innerHTML = "FIX INFINITY"
    document.getElementById("infiMult").innerHTML = "Multiply infinity points from all sources by 2 <br>currently: "+shortenDimensions(player.infMult.times(kongIPMult)) +"x<br>Cost: "+shortenCosts(player.infMultCost)+" IP"

    document.getElementById("notation").innerHTML = "Notation: " + player.options.notation

    if (player.infinitied == 0 && player.eternities == 0) document.getElementById("infinityPoints2").style.display = "none"

    if (player.currentChallenge == "challenge12" || player.currentChallenge == "postc1" || player.currentChallenge == "postc6") document.getElementById("matter").style.display = "inline-block";
    else document.getElementById("matter").style.display = "none";
    


    if (player.replicanti.galaxybuyer !== undefined) {
        replicantiGalaxyAutoToggle()
        replicantiGalaxyAutoToggle()
    }

    if (player.eternityChallUnlocked !== 0) document.getElementById("eterc"+player.eternityChallUnlocked+"div").style.display = "inline-block"
    

    if (player.infMultBuyer !== undefined) {
        infMultAutoToggle()
        infMultAutoToggle()
    }

    if (player.epmult === undefined || player.epmult == 0) {
        player.epmult = new Decimal(1)
        player.epmultCost = new Decimal(500)
    }

    clearOldAchieves()

    document.getElementById("epmult").innerHTML = "You gain 5 times more EP<p>Currently: "+shortenDimensions(player.epmult)+"x<p>Cost: "+shortenDimensions(player.epmultCost)+" EP"
    
    for (var i=0; i<player.timestudy.studies.length; i++) {
        if (player.timestudy.studies[i] == 71 || player.timestudy.studies[i] == 81 || player.timestudy.studies[i] == 91 || player.timestudy.studies[i] == 101) {
            document.getElementById(""+player.timestudy.studies[i]).className = "timestudybought normaldimstudy"
        } else if (player.timestudy.studies[i] == 72 || player.timestudy.studies[i] == 82 || player.timestudy.studies[i] == 92 || player.timestudy.studies[i] == 102) {
            document.getElementById(""+player.timestudy.studies[i]).className = "timestudybought infdimstudy"
        } else if (player.timestudy.studies[i] == 73 || player.timestudy.studies[i] == 83 || player.timestudy.studies[i] == 93 || player.timestudy.studies[i] == 103) {
            document.getElementById(""+player.timestudy.studies[i]).className = "timestudybought timedimstudy"
        } else if (player.timestudy.studies[i] == 121 || player.timestudy.studies[i] == 131 || player.timestudy.studies[i] == 141) {
            document.getElementById(""+player.timestudy.studies[i]).className = "timestudybought activestudy"
        } else if (player.timestudy.studies[i] == 122 || player.timestudy.studies[i] == 132 || player.timestudy.studies[i] == 142) {
            document.getElementById(""+player.timestudy.studies[i]).className = "timestudybought passivestudy"
        } else if (player.timestudy.studies[i] == 123 || player.timestudy.studies[i] == 133 || player.timestudy.studies[i] == 143) {
            document.getElementById(""+player.timestudy.studies[i]).className = "timestudybought idlestudy"
        } else {
            document.getElementById(""+player.timestudy.studies[i]).className = "timestudybought"
        }
    }

    if (player.version < 9 ) {
        player.version = 9
        let achs = []
        if (player.achievements.includes("r22")) {
            achs.push("r35")
            player.achievements.splice(player.achievements.indexOf("r22"), 1)
        }
        if (player.achievements.includes("r35")) {
            achs.push("r76")
            player.achievements.splice(player.achievements.indexOf("r35"), 1)
        }
        if (player.achievements.includes("r41")) {
            achs.push("r22")
            player.achievements.splice(player.achievements.indexOf("r41"), 1)
        }
        if (player.achievements.includes("r76")) {
            achs.push("r41")
            player.achievements.splice(player.achievements.indexOf("r76"), 1)
        }

        for (var i=0; i<achs.length;i++) player.achievements.push(achs[i])
        updateAchievements()
        player.replicanti.intervalCost = player.replicanti.intervalCost.dividedBy(1e20)
    }

    if (player.version < 9.5) {
        player.version = 9.5
        if (player.timestudy.studies.includes(191)) player.timestudy.theorem += 100
    }

    toggleCrunchMode()
    toggleCrunchMode()
    toggleCrunchMode()

    
    if (player.options.newsHidden) {
        document.getElementById("game").style.display = "none";
    }
    if (player.options.challConf) {
        document.getElementById("challengeconfirmation").innerHTML = "Challenge confirmation off"
    } else {
        document.getElementById("challengeconfirmation").innerHTML = "Challenge confirmation on"
    }

    document.getElementById("chartDurationInput").value = player.options.chart.duration;
    document.getElementById("chartUpdateRateInput").value = player.options.chart.updateRate;
    if (player.options.chart.on) document.getElementById("chartOnOff").checked = true
    else document.getElementById("chartOnOff").checked = false

    if (!player.options.hotkeys) document.getElementById("hotkeys").innerHTML = "Enable hotkeys"
    updateAutobuyers();
    setAchieveTooltip();
    updatePriorities();
    updateTheoremButtons();
    updateTimeStudyButtons();
    totalMult = Math.pow(player.totalmoney.e+1, 0.5)
    currentMult = Math.pow(player.money.e+1, 0.5)
    infinitiedMult = 1+Math.log10(getInfinitied()+1)*10
    achievementMult = Math.max(Math.pow((player.achievements.length-30), 3)/40,1)
    challengeMult = Decimal.max(10*3000/worstChallengeTime, 1)
    unspentBonus = player.infinityPoints.dividedBy(2).pow(1.5).plus(1)
    transformSaveToDecimal();
    updateChallengeTimes();
    updateMilestones();
    updateEternityUpgrades();
    loadInfAutoBuyers();
    resizeCanvas();
    checkForEndMe();
    updateEternityChallenges();
    let diff = new Date().getTime() - player.lastUpdate
    if (diff > 1000*1000) {
        simulateTime(diff/1000)
    }

}



function loadFromString(string) {
    var save = LZString.decompressFromEncodedURIComponent(string)
    console.log("Save length: "+save.length)
    if (save == "") player = JSON.parse(atob(string))
    else player = JSON.parse(save)
    onLoad()
}


function load_game() {
    var save_data = get_save('dimensionSave');
    if (!save_data) return;
    player = save_data;
    onLoad()
}


function save_game() {
    set_save('dimensionSave', player);
    $.notify("Game saved", "info")
}


function transformSaveToDecimal() {

    player.infinityPoints = new Decimal(player.infinityPoints)
    document.getElementById("eternitybtn").style.display = (player.infinityPoints.gte(Number.MAX_VALUE) || player.eternities > 0) ? "inline-block" : "none"

    player.money = new Decimal(player.money)
    player.tickSpeedCost = new Decimal(player.tickSpeedCost)
    player.tickspeed = new Decimal(player.tickspeed)
    player.firstCost = new Decimal(player.firstCost)
    player.secondCost = new Decimal(player.secondCost)
    player.thirdCost = new Decimal(player.thirdCost)
    player.fourthCost = new Decimal(player.fourthCost)
    player.fifthCost = new Decimal(player.fifthCost)
    player.sixthCost = new Decimal(player.sixthCost)
    player.seventhCost = new Decimal(player.seventhCost)
    player.eightCost = new Decimal(player.eightCost)
    player.firstAmount = new Decimal(player.firstAmount)
    player.secondAmount = new Decimal(player.secondAmount)
    player.thirdAmount = new Decimal(player.thirdAmount)
    player.fourthAmount = new Decimal(player.fourthAmount)
    player.fifthAmount = new Decimal(player.fifthAmount)
    player.sixthAmount = new Decimal(player.sixthAmount)
    player.seventhAmount = new Decimal(player.seventhAmount)
    player.eightAmount = new Decimal(player.eightAmount)
    player.firstPow = new Decimal(player.firstPow)
    player.secondPow = new Decimal(player.secondPow)
    player.thirdPow = new Decimal(player.thirdPow)
    player.fourthPow = new Decimal(player.fourthPow)
    player.fifthPow = new Decimal(player.fifthPow)
    player.sixthPow = new Decimal(player.sixthPow)
    player.seventhPow = new Decimal(player.seventhPow)
    player.eightPow = new Decimal(player.eightPow)
    player.sacrificed = new Decimal(player.sacrificed)
    player.totalmoney = new Decimal(player.totalmoney)
    player.chall3Pow = new Decimal(player.chall3Pow)
    player.chall11Pow = new Decimal(player.chall11Pow)
    player.costMultipliers = [new Decimal(player.costMultipliers[0]), new Decimal(player.costMultipliers[1]), new Decimal(player.costMultipliers[2]), new Decimal(player.costMultipliers[3]), new Decimal(player.costMultipliers[4]), new Decimal(player.costMultipliers[5]), new Decimal(player.costMultipliers[6]), new Decimal(player.costMultipliers[7])]
    player.tickspeedMultiplier = new Decimal(player.tickspeedMultiplier)
    player.matter = new Decimal(player.matter)
    player.infinityPower = new Decimal(player.infinityPower)
    player.infinityDimension1.amount = new Decimal(player.infinityDimension1.amount)
    player.infinityDimension2.amount = new Decimal(player.infinityDimension2.amount)
    player.infinityDimension3.amount = new Decimal(player.infinityDimension3.amount)
    player.infinityDimension4.amount = new Decimal(player.infinityDimension4.amount)
    player.infinityDimension5.amount = new Decimal(player.infinityDimension5.amount)
    player.infinityDimension6.amount = new Decimal(player.infinityDimension6.amount)
    player.infinityDimension7.amount = new Decimal(player.infinityDimension7.amount)
    player.infinityDimension8.amount = new Decimal(player.infinityDimension8.amount)

    player.timeDimension1.amount = new Decimal(player.timeDimension1.amount)
    player.timeDimension2.amount = new Decimal(player.timeDimension2.amount)
    player.timeDimension3.amount = new Decimal(player.timeDimension3.amount)
    player.timeDimension4.amount = new Decimal(player.timeDimension4.amount)
    player.timeDimension1.cost = new Decimal(player.timeDimension1.cost)
    player.timeDimension2.cost = new Decimal(player.timeDimension2.cost)
    player.timeDimension3.cost = new Decimal(player.timeDimension3.cost)
    player.timeDimension4.cost = new Decimal(player.timeDimension4.cost)
    player.timeDimension1.power = new Decimal(player.timeDimension1.power)
    player.timeDimension2.power = new Decimal(player.timeDimension2.power)
    player.timeDimension3.power = new Decimal(player.timeDimension3.power)
    player.timeDimension4.power = new Decimal(player.timeDimension4.power)
    player.timeShards = new Decimal(player.timeShards)
    player.eternityPoints = new Decimal(player.eternityPoints)
    player.tickThreshold = new Decimal(player.tickThreshold)
    player.postC3Reward = new Decimal(player.postC3Reward)

    for (var i=0; i<10; i++) {
        player.lastTenRuns[i][1] = new Decimal(player.lastTenRuns[i][1])
        player.lastTenEternities[i][1] = new Decimal(player.lastTenEternities[i][1])
    }
    player.lastTenRuns = [[parseFloat(player.lastTenRuns[0][0]), player.lastTenRuns[0][1]], [parseFloat(player.lastTenRuns[1][0]), player.lastTenRuns[1][1]], [parseFloat(player.lastTenRuns[2][0]), player.lastTenRuns[2][1]], [parseFloat(player.lastTenRuns[3][0]), player.lastTenRuns[3][1]], [parseFloat(player.lastTenRuns[4][0]), player.lastTenRuns[4][1]], [parseFloat(player.lastTenRuns[5][0]), player.lastTenRuns[5][1]], [parseFloat(player.lastTenRuns[6][0]), player.lastTenRuns[6][1]], [parseFloat(player.lastTenRuns[7][0]), player.lastTenRuns[7][1]], [parseFloat(player.lastTenRuns[8][0]), player.lastTenRuns[8][1]], [parseFloat(player.lastTenRuns[9][0]), player.lastTenRuns[9][1]]]
    player.replicanti.chanceCost = new Decimal(player.replicanti.chanceCost)
    player.replicanti.intervalCost = new Decimal(player.replicanti.intervalCost)
    player.replicanti.galCost = new Decimal(player.replicanti.galCost)

    for (var i=1; i<=8; i++) {
        player["infinityDimension"+i].cost = new Decimal(player["infinityDimension"+i].cost)
        player["infinityDimension"+i].power = new Decimal(player["infinityDimension"+i].power)
    }

    player.infMultCost = new Decimal(player.infMultCost)
    player.infMult = new Decimal(player.infMult)
    player.timestudy.amcost = new Decimal(player.timestudy.amcost)
    player.timestudy.ipcost = new Decimal(player.timestudy.ipcost)
    player.timestudy.epcost = new Decimal(player.timestudy.epcost)

    player.autoIP = new Decimal(player.autoIP)

    if (player.autobuyers[11].priority !== undefined && player.autobuyers[11].priority !== null && player.autobuyers[11].priority !== "undefined")player.autobuyers[11].priority = new Decimal(player.autobuyers[11].priority)

    player.epmultCost = new Decimal(player.epmultCost)
    player.epmult = new Decimal(player.epmult)
    player.eternityBuyer.limit = new Decimal(player.eternityBuyer.limit)
    player.eternityChallGoal = new Decimal(player.eternityChallGoal)
    player.replicanti.amount = new Decimal(player.replicanti.amount)
}


function loadAutoBuyerSettings() {
    for (var i=0; i<9; i++) {
        document.getElementById("priority" + (i+1)).selectedIndex = player.autobuyers[i].priority-1
        if (i == 8 && player.autobuyers[i].target == 10) document.getElementById("toggleBtnTickSpeed").innerHTML = "Buys max"
        else if (i == 8 && player.autobuyers[i].target !== 10) document.getElementById("toggleBtnTickSpeed").innerHTML = "Buys singles"
        else if (player.autobuyers[i].target > 10) document.getElementById("toggleBtn" + (i+1)).innerHTML = "Buys until 10"
        else document.getElementById("toggleBtn" + (i+1)).innerHTML = "Buys singles"

    }
    document.getElementById("priority10").value = player.autobuyers[9].priority
    document.getElementById("priority11").value = player.autobuyers[10].priority
    document.getElementById("priority12").value = player.autobuyers[11].priority
    document.getElementById("overGalaxies").value = player.overXGalaxies
    document.getElementById("bulkDimboost").value = player.autobuyers[9].bulk
    document.getElementById("prioritySac").value = player.autoSacrifice.priority
    document.getElementById("bulkgalaxy").value = player.autobuyers[10].bulk
    document.getElementById("priority13").value = player.eternityBuyer.limit

}




function showTab(tabName) {
    //iterate over all elements in div_tab class. Hide everything that's not tabName and show tabName
    var tabs = document.getElementsByClassName('tab');
    var tab;
    for (var i = 0; i < tabs.length; i++) {
        tab = tabs.item(i);
        if (tab.id === tabName) {
            tab.style.display = 'block';
        } else {
            tab.style.display = 'none';
        }
    }
}

var FormatList = ['', 'K', 'M', 'B', 'T', 'Qd', 'Qt', 'Sx', 'Sp', 'Oc', 'No', 'Dc', 'UDc', 'DDc', 'TDc', 'QdDc', 'QtDc', 'SxDc', 'SpDc', 'ODc', 'NDc', 'Vg', 'UVg', 'DVg', 'TVg', 'QdVg', 'QtVg', 'SxVg', 'SpVg', 'OVg', 'NVg', 'Tg', 'UTg', 'DTg', 'TTg', 'QdTg', 'QtTg', 'SxTg', 'SpTg', 'OTg', 'NTg', 'Qa', 'UQa', 'DQa', 'TQa', 'QdQa', 'QtQa', 'SxQa', 'SpQa', 'OQa', 'NQa', 'Qi', 'UQi', 'DQi', 'TQi', 'QaQi', 'QtQi', 'SxQi', 'SpQi', 'OQi', 'NQi', 'Se', 'USe', 'DSe', 'TSe', 'QaSe', 'QtSe', 'SxSe', 'SpSe', 'OSe', 'NSe', 'St', 'USt', 'DSt', 'TSt', 'QaSt', 'QtSt', 'SxSt', 'SpSt', 'OSt', 'NSt', 'Og', 'UOg', 'DOg', 'TOg', 'QdOg', 'QtOg', 'SxOg', 'SpOg', 'OOg', 'NOg', 'Nn', 'UNn', 'DNn', 'TNn', 'QdNn', 'QtNn', 'SxNn', 'SpNn', 'ONn', 'NNn', 'Ce',];

function letter(power,str) {
    const len = str.length;
    function lN(n) {
        let result = 1;
        for (var j = 0; j < n; ++j) result = len*result+1;
        return result;
    }
    if (power <= 5) return str[0];
    power = Math.floor(power / 3);
    let i=0;
    while (power >= lN(++i));
    if (i==1) return str[power-1];
    power -= lN(i-1);
    let ret = '';
    while (i>0) ret += str[Math.floor(power/Math.pow(len,--i))%len]
    return ret;
}

function getAbbreviation(e) {
    const prefixes = [
    ['', 'U', 'D', 'T', 'Qd', 'Qt', 'Sx', 'Sp', 'O', 'N'],
    ['', 'Dc', 'Vg', 'Tg', 'Qa', 'Qi', 'Se', 'St', 'Og', 'Nn'],
    ['', 'Ce', 'Dn', 'Tc', 'Qe', 'Qu', 'Sc', 'Si', 'Oe', 'Ne']]
    const prefixes2 = ['', 'MI-', 'MC-', 'NA-', 'PC-', 'FM-']
    e = Math.floor(e/3)-1;
    let index2 = 0;
    let prefix = [prefixes[0][e%10]];
    while (e >= 10) {
        e = Math.floor(e/10);
        prefix.push(prefixes[(++index2)%3][e%10])
    }
    index2 = Math.floor(index2/3)
    while (prefix.length%3 != 0) prefix.push("");
    let ret = "";
    while (index2 >= 0) ret += prefix[index2*3] + prefix[index2*3+1] + prefix[index2*3+2] + prefixes2[index2--];
    if (ret.endsWith("-")) ret = ret.slice(0,ret.length-1)
    return ret.replace("UM","M").replace("UNA","NA").replace("UPC","PC").replace("UFM","FM")
}



function formatValue(notation, value, places, placesUnder1000) {

    if ((value <= Number.MAX_VALUE || (player.break && (player.currentChallenge == "" || !new Decimal(Number.MAX_VALUE).equals(player.challengeTarget)) )) && (value >= 1000)) {
        if (value instanceof Decimal) {
           var power = value.e
           var matissa = value.mantissa
        } else {
            var matissa = value / Math.pow(10, Math.floor(Math.log10(value)));
            var power = Math.floor(Math.log10(value));
        }
        if ((notation === "Mixed scientific" && power >= 33) || notation === "Scientific") {
            matissa = matissa.toFixed(places)
            if (matissa >= 10) {
                matissa /= 10;
                power++;
            }
            if (power > 100000  && !player.options.commas) return (matissa + "e" + formatValue(notation, power, 3, 3))
            if (power > 100000  && player.options.commas) return (matissa + "e" + power.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
            return (matissa + "e" + power);
        }
        if (notation.includes("engineering") || notation.includes("Engineering")) pow = power - (power % 3)
        else pow = power
        if (power > 100000  && !player.options.commas) pow = formatValue(notation, pow, 3, 3)
        if (power > 100000  && player.options.commas) pow = pow.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        if (notation === "Logarithm") {
            if (power > 100000  && !player.options.commas) return "ee"+Math.log10(Decimal.log10(value)).toFixed(3)
            if (power > 100000  && player.options.commas) return "e"+Decimal.log10(value).toFixed(places).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            else return "e"+Decimal.log10(value).toFixed(places)
        }

        matissa = (matissa * Decimal.pow(10, power % 3)).toFixed(places)
        if (matissa >= 1000) {
            matissa /= 1000;
            power++;
        }

        if (notation === "Standard" || notation === "Mixed scientific") {
            if (power <= 303) return matissa + " " + FormatList[(power - (power % 3)) / 3];
            else return matissa + " " + getAbbreviation(power);
        } else if (notation === "Mixed engineering") {
            if (power <= 33) return matissa + " " + FormatList[(power - (power % 3)) / 3];
            else return (matissa + "ᴇ" + pow);
        } else if (notation === "Engineering") {
            return (matissa + "ᴇ" + pow);
        } else if (notation === "Letters") {
            return matissa + letter(power,'abcdefghijklmnopqrstuvwxyz');
        } else if (notation === "Emojis") {
            return matissa + letter(power,['😠', '🎂', '🎄', '💀', '🍆', '👪', '🌈', '💯', '🍦', '🎃', '💋', '😂', '🌙', '⛔', '🐙', '💩', '❓', '☢', '🙈', '👍', '☂', '✌', '⚠', '❌', '😋', '⚡'])
        } else {
            if (power > 100000  && player.options.commas) power = power.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            return "1337 H4CK3R"
        }
    } else if (value < 1000) {
        return (value).toFixed(placesUnder1000);
    } else {
        return "Infinite";
    }
}


function updateMoney() {
    var element = document.getElementById("coinAmount");
    element.innerHTML = formatValue(player.options.notation, player.money, 2, 1);
    var element2 = document.getElementById("matter");
    if (player.currentChallenge == "challenge12" || player.currentChallenge == "postc1") element2.innerHTML = "There is " + formatValue(player.options.notation, player.matter, 2, 1) + " matter.";
    if (player.currentChallenge == "postc6") element2.innerHTML = "There is " + formatValue(player.options.notation, Decimal.pow(player.matter,20), 2, 1) + " matter."; //TODO
}

function updateCoinPerSec() {
    var element = document.getElementById("coinsPerSec");
    if (player.currentChallenge != "" && getDimensionProductionPerSecond(1).gte(player.challengeTarget)) {
        element.innerHTML = 'You are getting ' + shortenDimensions(new Decimal(player.challengeTarget)) + ' antimatter per second.';
    } else {
        if (player.currentChallenge == "challenge3" || player.currentChallenge == "postc1") {
            element.innerHTML = 'You are getting ' + shortenDimensions(getDimensionProductionPerSecond(1).times(player.chall3Pow)) + ' antimatter per second.';
          } else if (player.currentChallenge == "challenge7") {
            element.innerHTML = 'You are getting ' + (shortenDimensions(getDimensionProductionPerSecond(1).plus(getDimensionProductionPerSecond(2)))) + ' antimatter per second.';
          } else {
            element.innerHTML = 'You are getting ' + shortenDimensions(getDimensionProductionPerSecond(1)) + ' antimatter per second.';
          }
    }
}

function getInfinitied() {return player.infinitied + player.infinitiedBank}

function hasInfinityMult(tier) {
    switch (tier) {
        case 1: case 8: return player.infinityUpgrades.includes("18Mult");
        case 2: case 7: return player.infinityUpgrades.includes("27Mult");
        case 3: case 6: return player.infinityUpgrades.includes("36Mult");
        case 4: case 5: return player.infinityUpgrades.includes("45Mult");
    }
}



function getDimensionFinalMultiplier(tier) {
    //if (player.currentEternityChall == "eterc3" && tier > 4) return new Decimal(0)
    var name = TIER_NAMES[tier];

    let multiplier = new Decimal(player[name + 'Pow']);
    if (player.currentChallenge == "challenge7") {
        if (tier == 4) multiplier = multiplier.pow(1.4)
        if (tier == 2) multiplier = multiplier.pow(1.7)
    }
    
    multiplier = multiplier.times(player.achPow);

    multiplier = multiplier.times(kongDimMult)

    if (player.currentEternityChall == "eterc9") multiplier = multiplier;
    else multiplier = multiplier.times(player.infinityPower.pow(7).max(1))

    if (player.infinityUpgrades.includes("totalMult")) multiplier = multiplier.times(totalMult)
    if (player.infinityUpgrades.includes("currentMult")) multiplier = multiplier.times(currentMult)
    if (player.infinityUpgrades.includes("infinitiedMult")) multiplier = multiplier.times(infinitiedMult)
    if (player.infinityUpgrades.includes("achievementMult")) multiplier = multiplier.times(achievementMult)
    if (player.infinityUpgrades.includes("challengeMult")) multiplier = multiplier.times(challengeMult)

    if (hasInfinityMult(tier)) multiplier = multiplier.times(dimMults());
    if (tier == 1) {
        if (player.infinityUpgrades.includes("unspentBonus")) multiplier = multiplier.times(unspentBonus);
        if (player.achievements.includes("r28")) multiplier = multiplier.times(1.1);
        if (player.achievements.includes("r31")) multiplier = multiplier.times(1.05);
        if (player.achievements.includes("r71")) multiplier = multiplier.times(3);
        if (player.achievements.includes("r68")) multiplier = multiplier.times(1.5);
    }
    
    multiplier = multiplier.times(timeMult());
    if (tier == 8 && player.achievements.includes("r23")) multiplier = multiplier.times(1.1);
    else if (player.achievements.includes("r34")) multiplier = multiplier.times(1.02);
    if (tier <= 4 && player.achievements.includes("r43")) multiplier = multiplier.times(1.25);
    if (player.achievements.includes("r48")) multiplier = multiplier.times(1.1);
    if (player.achievements.includes("r72")) multiplier = multiplier.times(1.1); // tbd
    if (player.achievements.includes("r74") && player.currentChallenge != "") multiplier = multiplier.times(1.4);
    if (player.achievements.includes("r77")) multiplier = multiplier.times(1+tier/100);
    if (player.achievements.includes("r56") && player.thisInfinityTime < 1800) multiplier = multiplier.times(3600/(player.thisInfinityTime+1800));
    if (player.achievements.includes("r78") && player.thisInfinityTime < 3) multiplier = multiplier.times(3.3/(player.thisInfinityTime+0.3));
    if (player.achievements.includes("r65") && player.currentChallenge != "" && player.thisInfinityTime < 1800) multiplier = multiplier.times(Math.max(2400/(player.thisInfinityTime+600), 1))
    if (player.achievements.includes("r91") && player.thisInfinityTime < 50) multiplier = multiplier.times(Math.max(301-player.thisInfinityTime*6, 1))
    if (player.achievements.includes("r92") && player.thisInfinityTime < 600) multiplier = multiplier.times(Math.max(101-player.thisInfinityTime/6, 1));
    if (player.achievements.includes("r84")) multiplier = multiplier.times(player.money.pow(0.00004).plus(1));
    else if (player.achievements.includes("r73")) multiplier = multiplier.times(player.money.pow(0.00002).plus(1));


    if (player.timestudy.studies.includes(71) && tier !== 8) multiplier = multiplier.times(calcTotalSacrificeBoost().pow(0.25));
    if (player.timestudy.studies.includes(91)) multiplier = multiplier.times(Decimal.pow(10, Math.min(player.thisEternity, 18000)/60));
    if (player.timestudy.studies.includes(101)) multiplier = multiplier.times(Decimal.max(player.replicanti.amount, 1))
    if (player.timestudy.studies.includes(161)) multiplier = multiplier.times(new Decimal("1e616"))

    multiplier = multiplier.times(player.postC3Reward)
    if (player.challenges.includes("postc8") && tier < 8 && tier > 1) multiplier = multiplier.times(mult18);
            
    if (player.currentChallenge == "postc6") multiplier = multiplier.dividedBy(player.matter.max(1))
    if (player.currentChallenge == "postc8") multiplier = multiplier.times(postc8Mult)

    if (player.currentChallenge == "postc4" && player.postC4Tier != tier) multiplier = multiplier.pow(0.25)
    if (player.challenges.includes("postc4")) multiplier = multiplier.pow(1.05);
    if (player.currentEternityChall == "eterc10") multiplier = multiplier.times(ec10bonus)
    if (player.timestudy.studies.includes(193)) multiplier = multiplier.times(Decimal.pow(1.02, Math.min(player.eternities, 1.5e6)))
    if (tier == 8 && player.timestudy.studies.includes(214)) multiplier = multiplier.times((calcTotalSacrificeBoost().pow(8)).min("1e46000").times(calcTotalSacrificeBoost().pow(1.1).min(new Decimal("1e125000"))))
     
    return multiplier;
}

function getMoneyPerSecond() {
    return getDimensionFinalMultiplier(1)*Math.floor(player.firstAmount)/player.tickspeed;
}

function getDimensionDescription(tier) {
    var name = TIER_NAMES[tier];

    let description = shortenDimensions(player[name + 'Amount']) + ' (' + dimBought(tier) + ')';
    if (tier == 8) description = Math.round(player[name + 'Amount']) + ' (' + dimBought(tier) + ')';

    if (tier < 8) {
        description += '  (+' + formatValue(player.options.notation, getDimensionRateOfChange(tier), 2, 2) + '%/s)';
    }

    return description;
}

function getDimensionRateOfChange(tier) {
    if (tier == 8 || (player.currentEternityChall == "eterc3" && tier > 3)) {
        return 0;
    }

    let toGain = getDimensionProductionPerSecond(tier + 1)

    var name = TIER_NAMES[tier];
    if (player.currentChallenge == "challenge7") {
        if (tier == 7) return 0
        else toGain = getDimensionProductionPerSecond(tier + 2);
    }
    var current = player[name + 'Amount'].max(1);
    var change  = toGain.times(10).dividedBy(current);

    return change;
}

function getShiftRequirement(bulk) {
    let amount = 20;
    if (player.currentChallenge == "challenge4") {
        tier = Math.min(player.resets + bulk + 4, 6)
        if (tier == 6) amount += (player.resets+bulk - 2) * 20;
    } else {
        tier = Math.min(player.resets + bulk + 4, 8)
    }

    if (tier == 8) amount += player.timestudy.studies.includes(211) ?  (player.resets+bulk - 4) * 10 : (player.resets+bulk - 4) * 15;
    if (player.currentEternityChall == "eterc5") {
        amount += Math.pow(player.resets+bulk, 3) + player.resets+bulk
    }

    if (player.infinityUpgrades.includes("resetBoost")) amount -= 9;
    if (player.challenges.includes("postc5")) amount -= 1

    return { tier: tier, amount: amount };
}

function getGalaxyRequirement() {
    let amount = 80 + (player.galaxies * 60);
    if (player.timestudy.studies.includes(42)) amount = 80 + (player.galaxies * 52)
    if (player.currentChallenge == "challenge4") amount = 99 + (player.galaxies * 90)

    if (player.currentEternityChall == "eterc5") {
        amount += Math.pow(player.galaxies, 2) + player.galaxies
    }
    else if (player.galaxies >= 100 + ECTimesCompleted("eterc5")*5) {
        amount += Math.pow(player.galaxies-(99 + ECTimesCompleted("eterc5")*5),2)+player.galaxies-(99 + ECTimesCompleted("eterc5")*5)
    }


    if (player.infinityUpgrades.includes("resetBoost")) amount -= 9;
    if (player.challenges.includes("postc5")) amount -= 1;

    return amount;
}

function getETA(cost) {
    var a = 100;
    if (player.money.gte(cost)) return 0
    while (ETACalc(a).lt(cost)) {
        a *= 10;
        if (a > 1e20) return Infinity;
    }
    var b = a / 10;
    var q = ETACalc((a+b)/2);
    while (q.gt(cost.times(1.0001)) || q.lt(cost.dividedBy(1.0001))) {
        console.log("q = "+q)
        console.log("a = "+a)
        console.log("b = "+b)
        if (q.lt(cost)) a = (a+b)/2;
        else b = (a+b)/2;
        q = ETACalc((a+b)/2);
    }
    return (a+b)/2;
}

function ETACalc(t) {
    var value = player.money.plus(getDimensionProductionPerSecond(1).times(t));
    var div = 1;
    for (let tier = 2; tier <= 8; ++tier) {
        var name = TIER_NAMES[tier-1]
        div *= tier;
        value = value.plus(getDimensionProductionPerSecond(tier).times(getDimensionProductionPerSecond(tier-1)).times(Decimal.pow(t,tier)).dividedBy(Decimal.max(player[name+"Amount"].times(div).times(10), 1))) ;
    }
    return value
}



var worstChallengeTime = 1

function updateWorstChallengeTime() {
    worstChallengeTime = 1
    for (var i=0; i<10; i++) {
        if (player.challengeTimes[i] > worstChallengeTime) worstChallengeTime = player.challengeTimes[i]
    }
}


function sacrificeConf() {
    player.options.sacrificeConfirmation = !player.options.sacrificeConfirmation
}




function updateDimensions() {
    if (document.getElementById("antimatterdimensions").style.display == "block") {
        
        for (let tier = 1; tier <= 8; ++tier) {
            var name = TIER_NAMES[tier];
            if (!canBuyDimension(tier)) {
                break;
            }
            document.getElementById(name + "D").innerHTML = DISPLAY_NAMES[tier] + " Dimension x" + formatValue(player.options.notation, getDimensionFinalMultiplier(tier), 1, 1);
            document.getElementById(name + "Amount").innerHTML = getDimensionDescription(tier);
        }
    


        for (let tier = 1; tier <= 8; ++tier) {
            var name = TIER_NAMES[tier];
            if (!canBuyDimension(tier)) {
                break;
            }

            document.getElementById(name + "Row").style.display = "table-row";
            document.getElementById(name + "Row").style.visibility = "visible";


        }
        
        var shiftRequirement = getShiftRequirement(0);
        if (player.currentChallenge == "challenge4" ? shiftRequirement.tier < 6 : shiftRequirement.tier < 8) {
            document.getElementById("resetLabel").innerHTML = 'Dimension Shift ('+ player.resets +'): requires ' + shiftRequirement.amount + " " + DISPLAY_NAMES[shiftRequirement.tier] + " Dimensions";
        }
        else document.getElementById("resetLabel").innerHTML = 'Dimension Boost ('+ player.resets +'): requires ' + shiftRequirement.amount + " " + DISPLAY_NAMES[shiftRequirement.tier] + " Dimensions";

        if (player.currentChallenge == "challenge4" ? player.resets > 2 : player.resets > 3) {
            document.getElementById("softReset").innerHTML = "Reset the game for a Boost";
        } else {
            document.getElementById("softReset").innerHTML = "Reset the game for a new Dimension";
        }
        if (player.replicanti.galaxies > 0 && (player.galaxies >= 100 + ECTimesCompleted("eterc5") * 5 || player.currentEternityChall === "eterc5")) document.getElementById("secondResetLabel").innerHTML = 'Distant Antimatter Galaxies ('+ player.galaxies +' + '+ player.replicanti.galaxies +'): requires ' + getGalaxyRequirement() + ' Eighth Dimensions';
        else if (player.galaxies >= 100 + ECTimesCompleted("eterc5") * 5 || player.currentEternityChall === "eterc5") document.getElementById("secondResetLabel").innerHTML = 'Distant Antimatter Galaxies ('+ player.galaxies +'): requires ' + getGalaxyRequirement() + ' Eighth Dimensions';
        else if (player.replicanti.galaxies > 0) document.getElementById("secondResetLabel").innerHTML = 'Antimatter Galaxies ('+ player.galaxies +' + '+ player.replicanti.galaxies +'): requires ' + getGalaxyRequirement() + ' Eighth Dimensions';
        else if (player.currentChallenge != "challenge4") document.getElementById("secondResetLabel").innerHTML = 'Antimatter Galaxies ('+ player.galaxies +'): requires ' + getGalaxyRequirement() + ' Eighth Dimensions';
        else if (player.replicanti.galaxies > 0) document.getElementById("secondResetLabel").innerHTML = 'Antimatter Galaxies ('+ player.galaxies +' + '+ player.replicanti.galaxies +'): requires ' + getGalaxyRequirement() + ' Sixth Dimensions';
        else document.getElementById("secondResetLabel").innerHTML = 'Antimatter Galaxies ('+ player.galaxies +'): requires ' + getGalaxyRequirement() + ' Sixth Dimensions';
    }

    if (canBuyTickSpeed() || player.currentEternityChall == "eterc9") {
        var tickmult = getTickSpeedMultiplier()
        if (tickmult < 1e-9) document.getElementById("tickLabel").innerHTML = "Divide the tick interval by " + shortenDimensions(1 / tickmult) + '.'
        else {
            var places = 0
            if (tickmult < 0.2) places = Math.floor(Math.log10(Math.round(1/tickmult)))
            document.getElementById("tickLabel").innerHTML = 'Reduce the tick interval by ' + ((1 - tickmult) * 100).toFixed(places) + '%.';
        }

        document.getElementById("tickSpeed").style.visibility = "visible";
        document.getElementById("tickSpeedMax").style.visibility = "visible";
        document.getElementById("tickLabel").style.visibility = "visible";
        document.getElementById("tickSpeedAmount").style.visibility = "visible";
    }

    document.getElementById("totalmoney").innerHTML = 'You have made a total of ' + shortenMoney(player.totalmoney) + ' antimatter.';
    document.getElementById("totalresets").innerHTML = 'You have done ' + player.resets + ' dimensional boosts/shifts.';
    document.getElementById("galaxies").innerHTML = 'You have ' + Math.round(player.galaxies) + ' Antimatter Galaxies.';
    document.getElementById("totalTime").innerHTML = "You have played for " + timeDisplay(player.totalTimePlayed) + ".";

    if (player.bestInfinityTime == 9999999999) {
        document.getElementById("bestInfinity").innerHTML = ""
        document.getElementById("infinitied").innerHTML = ""
        document.getElementById("thisInfinity").innerHTML = ""
    } else {
        document.getElementById("bestInfinity").innerHTML = "Your fastest Infinity is in " + timeDisplay(player.bestInfinityTime) + "."
        document.getElementById("thisInfinity").innerHTML = "You have spent " + timeDisplay(player.thisInfinityTime) + " in this Infinity."
        if (player.infinityPoints.equals(1)) {
            document.getElementById("infinityPoints1").innerHTML = "You have 1 Infinity point."
            document.getElementById("infinityPoints2").innerHTML = "You have 1 Infinity point."
        }
        else {
            document.getElementById("infinityPoints1").innerHTML = "You have <span class=\"IPAmount1\">"+shortenDimensions(player.infinityPoints)+"</span> Infinity points."
            document.getElementById("infinityPoints2").innerHTML = "You have <span class=\"IPAmount2\">"+shortenDimensions(player.infinityPoints)+"</span> Infinity points."
        }
        if (player.infinitied == 1) document.getElementById("infinitied").innerHTML = "You have infinitied 1 time."
        else document.getElementById("infinitied").innerHTML = "You have infinitied " + player.infinitied.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " times."
        if (player.infinitiedBank > 0) document.getElementById("infinitied").innerHTML = "You have infinitied " + player.infinitied.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " times this eternity."

    }

    if (player.eternities == 0) {
        document.getElementById("eternitied").innerHTML = ""
        document.getElementById("besteternity").innerHTML = ""
        document.getElementById("thiseternity").innerHTML = ""
    } else {
        document.getElementById("eternitied").innerHTML = "You have Eternitied "+player.eternities+" times."
        document.getElementById("besteternity").innerHTML = "You have spent "+timeDisplay(player.thisEternity)+" in this Eternity"
        document.getElementById("thiseternity").innerHTML = "Your fastest Eternity is in "+timeDisplay(player.bestEternity)+"."
    }
    if (document.getElementById("infinity").style.display == "block") {
        if (document.getElementById("preinf").style.display == "block") {
            document.getElementById("infi11").innerHTML = "Production increase over time <br>Currently: " + (Math.pow(0.5 * player.totalTimePlayed / 600, 0.15)).toFixed(2) + "x<br>Cost: 1 IP"
            document.getElementById("infi12").innerHTML = "First and Eighth Dimension power based on infinitied stat<br>" + formatValue(player.options.notation, dimMults(), 1, 1) + "x<br>Cost: 1 IP"
            document.getElementById("infi13").innerHTML = "Third and Sixth Dimension power based on infinitied stat<br>" + formatValue(player.options.notation, dimMults(), 1, 1) + "x<br>Cost: 1 IP"
            document.getElementById("infi22").innerHTML = "Second and seventh Dimension power based on infinitied stat<br>" + formatValue(player.options.notation, dimMults(), 1, 1) + "x<br>Cost: 1 IP"
            document.getElementById("infi23").innerHTML = "Fourth and Fifth Dimension power based on infinitied stat<br>" + formatValue(player.options.notation, dimMults(), 1, 1) + "x<br>Cost: 1 IP"
            document.getElementById("infi31").innerHTML = "Production increase over time in current infinity<br>Currently: " + Decimal.max(Math.pow(player.thisInfinityTime / 2400, 0.25), 1).toFixed(2) + "x<br>Cost: 3 IP"
            document.getElementById("infi32").innerHTML = "Bonus for unspent Infinity Points on 1st Dimension<br>(Currently " + formatValue(player.options.notation, player.infinityPoints.dividedBy(2).pow(1.5).plus(1), 2, 2) + "x)<br>Cost: 5 IP"
            document.getElementById("infi34").innerHTML = "Infinity Point generation (based on fastest infinity) <br>(Currently "+shortenDimensions(player.infMult.times(kongIPMult))+" every " + timeDisplay(player.bestInfinityTime*10) + ")<br>Cost: 10 IP"
        }
        else if (document.getElementById("postinf").style.display == "block") {
            document.getElementById("postinfi11").innerHTML = "Power up all dimensions based on total antimatter produced<br>Currently: "+ Math.pow(player.totalmoney.e+1, 0.5).toFixed(2)+"x<br>Cost: "+shortenCosts(1e4)+" IP"
            document.getElementById("postinfi21").innerHTML = "Power up all dimensions based on current antimatter<br>Currently: "+ Math.pow(player.money.e+1, 0.5).toFixed(2)+"x<br>Cost: "+shortenCosts(5e4)+" IP"
            document.getElementById("postinfi31").innerHTML = "Tickspeed cost multiplier increase <br>"+player.tickSpeedMultDecrease+"x -> "+(player.tickSpeedMultDecrease-1)+"x<br>Cost: "+shortenDimensions(player.tickSpeedMultDecreaseCost) +" IP"
            if (player.tickSpeedMultDecrease == 2) document.getElementById("postinfi31").innerHTML = "Tickspeed cost multiplier increase <br>"+player.tickSpeedMultDecrease+"x"
            document.getElementById("postinfi22").innerHTML = "Power up all dimensions based on achievements completed <br>Currently: "+Math.max(Math.pow((player.achievements.length-30), 3)/40,1).toFixed(2)+"x<br>Cost: "+shortenCosts(1e6)+" IP"
            document.getElementById("postinfi12").innerHTML = "Power up all dimensions based on amount infinitied <br>Currently: "+(1+Math.log10(getInfinitied()+1)*10).toFixed(2)+"x<br>Cost: "+shortenCosts(1e5)+" IP"
            if (player.timestudy.studies.includes(31)) document.getElementById("postinfi12").innerHTML = "Power up all dimensions based on amount infinitied <br>Currently: "+shortenMoney(Math.pow((Math.log10(getInfinitied()+1)*10).toFixed(2), 4))+"x<br>Cost: "+shortenCosts(1e5)+" IP"
            document.getElementById("postinfi41").innerHTML = "Makes galaxies 50% stronger <br>Cost: "+shortenCosts(5e11)+" IP"
            document.getElementById("postinfi32").innerHTML = "Power up all dimensions based on slowest challenge run<br>Currently:"+Decimal.max(10*3000/worstChallengeTime, 1).toFixed(2)+"x<br>Cost: "+shortenCosts(1e7)+" IP"
            document.getElementById("postinfi42").innerHTML = "Dimension cost multiplier increase <br>"+player.dimensionMultDecrease+"x -> "+(player.dimensionMultDecrease-1)+"x<br>Cost: "+shortenCosts(player.dimensionMultDecreaseCost) +" IP"

            document.getElementById("postinfi13").innerHTML = "You passively generate Infinitied stat based on your fastest infinity.<br>1 Infinity every "+timeDisplay(player.bestInfinityTime*5)+ " <br>Cost: "+shortenCosts(20e6)+" IP"
            document.getElementById("postinfi23").innerHTML = "Option to bulk buy Dimension Boosts <br>Cost: "+shortenCosts(5e9)+" IP"
            document.getElementById("postinfi33").innerHTML = "Autobuyers work twice as fast<br>Cost:"+ shortenCosts(1e15)+" IP"
            if (player.dimensionMultDecrease <= 3) document.getElementById("postinfi42").innerHTML = "Dimension cost multiplier increase <br>"+player.dimensionMultDecrease.toFixed(1)+"x"

            document.getElementById("offlineProd").innerHTML = "Generates "+player.offlineProd+"% > "+Math.max(Math.max(5, player.offlineProd + 5), Math.min(50, player.offlineProd + 5))+"% of your best IP/min from last 10 infinities, works offline<br>Currently: "+shortenMoney(bestRunIppm.times(player.offlineProd/100)) +"IP/min<br> Cost: "+shortenCosts(player.offlineProdCost)+" IP"
            if (player.offlineProd == 50) document.getElementById("offlineProd").innerHTML = "Generates "+player.offlineProd+"% of your best IP/min from last 10 infinities, works offline<br>Currently: "+shortenMoney(bestRunIppm.times(player.offlineProd/100)) +" IP/min"
        }
    }

    
    if (document.getElementById("eternitystore").style.display == "block") {
        document.getElementById("eter1").innerHTML = "Infinity Dimensions multiplier based on unspent EP (x+1)<br>Currently: "+shortenMoney(player.eternityPoints.plus(1))+"x<br>Cost: 5 EP"
        document.getElementById("eter2").innerHTML = "Infinity Dimension multiplier based on eternities ((x/300)^log4(2x))<br>Currently: "+shortenMoney(Decimal.pow(Math.min(player.eternities, 125000)/300 + 1, Math.log(Math.min(player.eternities, 125000)*2+1)/Math.log(4)).times(new Decimal((player.eternities-125000)/300 + 1).times(Math.log((player.eternities- 125000)*2+1)/Math.log(4)).max(1)))+"x<br>Cost: 10 EP"
        document.getElementById("eter3").innerHTML = "Infinity Dimensions multiplier based on sum of Infinity Challenge times<br>Currently: "+shortenMoney(Decimal.pow(2,300/Math.max(infchallengeTimes, player.achievements.includes("r112") ? 6.1 : 7.5)))+"x<br>Cost: "+shortenCosts(50e3)+" EP"
        document.getElementById("eter4").innerHTML = "Your achievement bonus affects Time Dimensions"+"<br>Cost: "+shortenCosts(1e16)+" EP"
        document.getElementById("eter5").innerHTML = "Time Dimensions are multiplied by your unspent time theorems"+"<br>Cost: "+shortenCosts(1e40)+" EP"
        document.getElementById("eter6").innerHTML = "Time Dimensions are multiplied by days played"+"<br>Cost: "+shortenCosts(1e50)+" EP"
        document.getElementById("epmult").innerHTML = "You gain 5 times more EP<p>Currently: "+shortenDimensions(player.epmult)+"x<p>Cost: "+shortenDimensions(player.epmultCost)+" EP"
        document.getElementById("32").innerHTML = "You gain x"+Math.max(player.resets, 1)+" more infinitied stat (based on dimension boosts)<p>Cost: 2 Time Theorems"
        document.getElementById("82").innerHTML = "Dimensional boosts affect Infinity Dimensions <span>Currently "+shortenMoney(Decimal.pow(1.0000109, Decimal.pow(player.resets, 2)))+"x<span>Cost: 6 Time Theorems"
        document.getElementById("91").innerHTML = "Normal dimensions gain a multiplier based on time spent this eternity<span>Currently: "+shortenMoney(Decimal.pow(10, Math.min(player.thisEternity, 18000)/60))+"x<span>Cost: 4 Time Theorems"
        document.getElementById("92").innerHTML = "Infinity dimensions gain a multiplier based on fastest eternity time<span>Currently: "+shortenMoney(Decimal.pow(2, 600/Math.max(player.bestEternity, 20)))+"x<span>Cost: 5 Time Theorems"
        document.getElementById("93").innerHTML = "Time dimensions gain a multiplier based on tick upgrades gained<span>Currently: "+shortenMoney(Decimal.pow(player.totalTickGained, 0.25))+"x<span>Cost: 7 Time Theorems"
        document.getElementById("121").innerHTML = "The worse your average EP/min is, the more EP you get<span>Currently: "+((253 - averageEp.dividedBy(player.epmult).dividedBy(10).min(248).max(3))/5).toFixed(1)+"x<span>Cost: 9 Time Theorems"
        document.getElementById("123").innerHTML = "You gain more EP based on time spent this eternity<span>Currently: "+Math.sqrt(1.39*player.thisEternity/10).toFixed(1)+"x<span>Cost: 9 Time Theorems"
        document.getElementById("141").innerHTML = "Multiplier to IP, decaying over this infinity<span>Currently "+shortenMoney(new Decimal(1e45).dividedBy(Decimal.pow(15, Math.log(player.thisInfinityTime)*Math.pow(player.thisInfinityTime, 0.125))).max(1))+"x<span>Cost: 4 Time Theorems"
        document.getElementById("143").innerHTML = "Multiplier to IP, increasing over this infinity<span>Currently "+shortenMoney(Decimal.pow(15, Math.log(player.thisInfinityTime)*Math.pow(player.thisInfinityTime, 0.125)))+"x<span>Cost: 4 Time Theorems"
        document.getElementById("193").innerHTML = "Normal dimension boost based on eternities<span>Currently "+shortenMoney(Decimal.pow(1.02, Math.min(player.eternities, 1.5e6)))+"<span>Cost: 300 Time Theorems"
        document.getElementById("212").innerHTML = "Galaxies are more effective based on your timeshards<span>Currently "+((Math.pow(player.timeShards.max(2).log2(), 0.005)-1)*100).toFixed(2)+"%<span>Cost: 150 Time Theorems"
        document.getElementById("214").innerHTML = "Sacrifice boosts the 8th dimension even more.<span>Currently "+shortenMoney(((calcTotalSacrificeBoost().pow(8)).min("1e46000").times(calcTotalSacrificeBoost().pow(1.1)).div(calcTotalSacrificeBoost())).max(1).min(new Decimal("1e125000")))+"x<span>Cost: 120 Time Theorems"
        document.getElementById("192").innerHTML = "You can get beyond "+shortenMoney(Number.MAX_VALUE)+" replicantis, but the interval is increased the more you have<span>Cost: 730 Time Theorems"
    }
}

function updateCosts() {
    document.getElementById("first").innerHTML = 'Cost: ' + shortenCosts(player.firstCost);
    document.getElementById("second").innerHTML = 'Cost: ' + shortenCosts(player.secondCost);
    document.getElementById("third").innerHTML = 'Cost: ' + shortenCosts(player.thirdCost);
    document.getElementById("fourth").innerHTML = 'Cost: ' + shortenCosts(player.fourthCost);
    document.getElementById("fifth").innerHTML = 'Cost: ' + shortenCosts(player.fifthCost);
    document.getElementById("sixth").innerHTML = 'Cost: ' + shortenCosts(player.sixthCost);
    document.getElementById("seventh").innerHTML = 'Cost: ' + shortenCosts(player.seventhCost);
    document.getElementById("eight").innerHTML = 'Cost: ' + shortenCosts(player.eightCost);

    document.getElementById("firstMax").innerHTML = 'Until 10, Cost: ' + shortenCosts(player.firstCost.times(10 - dimBought(1)));
    document.getElementById("secondMax").innerHTML = 'Until 10, Cost: ' + shortenCosts(player.secondCost.times(10 - dimBought(2)));
    document.getElementById("thirdMax").innerHTML = 'Until 10, Cost: ' + shortenCosts(player.thirdCost.times(10 - dimBought(3)));
    document.getElementById("fourthMax").innerHTML = 'Until 10, Cost: ' + shortenCosts(player.fourthCost.times(10 - dimBought(4)));
    document.getElementById("fifthMax").innerHTML = 'Until 10, Cost: ' + shortenCosts(player.fifthCost.times(10 - dimBought(5)));
    document.getElementById("sixthMax").innerHTML = 'Until 10, Cost: ' + shortenCosts(player.sixthCost.times(10 - dimBought(6)));
    document.getElementById("seventhMax").innerHTML = 'Until 10, Cost: ' + shortenCosts(player.seventhCost.times(10 - dimBought(7)));
    document.getElementById("eightMax").innerHTML = 'Until 10, Cost: ' + shortenCosts(player.eightCost.times(10 - dimBought(8)));

    document.getElementById("tickSpeed").innerHTML = 'Cost: ' + shortenCosts(player.tickSpeedCost);


    for (var i=1; i<=8; i++) {

        document.getElementById("infMax"+i).innerHTML = "Cost: " + shortenCosts(player["infinityDimension"+i].cost) + " IP"
    }

    for (var i=1; i<=4; i++) {

        document.getElementById("timeMax"+i).innerHTML = "Cost: " + shortenDimensions(player["timeDimension"+i].cost) + " EP"
    }
}

function updateTickSpeed() {
    var exp = player.tickspeed.e;
    if (exp > 1) document.getElementById("tickSpeedAmount").innerHTML = 'Tickspeed: ' + player.tickspeed.toFixed(0);
    else {
        document.getElementById("tickSpeedAmount").innerHTML = 'Tickspeed: ' + player.tickspeed.times(new Decimal(100).dividedBy(Decimal.pow(10, exp))).toFixed(0) + ' / ' + shorten(new Decimal(100).dividedBy(Decimal.pow(10, exp)));
    }
}


function isEterChall(elem) {
    return !elem.id.includes("eter")
}

function updateChallenges() {
    try {
        var buttons = Array.from(document.getElementsByClassName('onchallengebtn')).filter(isEterChall)
        for (var i=0; i < buttons.length; i++) {
            buttons[i].className = "challengesbtn";
            buttons[i].innerHTML = "Start"
        }

        var buttonss = Array.from(document.getElementsByClassName('completedchallengesbtn')).filter(isEterChall)
        for (var i=0; i < buttonss.length; i++) {
            buttonss[i].className = "challengesbtn";
            buttonss[i].innerHTML = "Start"
        }


        for (var i=0; i < player.challenges.length; i++) {
            document.getElementById(player.challenges[i]).className = "completedchallengesbtn";
            document.getElementById(player.challenges[i]).innerHTML = "Completed"
        }

        if (player.currentChallenge != "") {
            document.getElementById(player.currentChallenge).className = "onchallengebtn"
            document.getElementById(player.currentChallenge).innerHTML = "Running"
        }

        for (var i=1; i<=player.postChallUnlocked; i++) document.getElementById("postc"+i+"div").style.display = "inline-block"



    } catch (err) {
        console.log(err)
        updateChallenges()
        
    }




}

function updateEternityChallenges() {

    for (var property in player.eternityChalls) {
        document.getElementById(property+"div").style.display = "inline-block"
        if (player.eternityChalls[property] < 5) {
            document.getElementById(property).innerHTML = "Locked"
            document.getElementById(property).className = "lockedchallengesbtn"
        }
        else {
            document.getElementById(property).innerHTML = "Completed"
            document.getElementById(property).className = "completedchallengesbtn"
        }
    }

    if (player.eternityChallUnlocked !== 0) {
        document.getElementById("eterc"+player.eternityChallUnlocked).innerHTML = "Start"
        document.getElementById("eterc"+player.eternityChallUnlocked).className = "challengesbtn"
        document.getElementById("eterctabbtn").style.display = "block"
    }

    if (player.eternityChallUnlocked == 0 && player.eternityChalls.eterc1 === undefined) {
        document.getElementById("eterctabbtn").style.display = "none"
        for (i=1; i<11; i++) {
            document.getElementById("eterc"+i+"div").style.display = "none"
        }
    }

    if (player.eternityChalls.eterc1 !== undefined) document.getElementById("eterctabbtn").style.display = "block"
    if (player.etercreq !== 0) document.getElementById("eterc"+player.etercreq+"div").style.display = "block"

    if (player.currentEternityChall !== "") {
        document.getElementById(player.currentEternityChall).innerHTML = "Running"
        document.getElementById(player.currentEternityChall).className = "onchallengebtn"
    }
}


//infinity dimensions


function DimensionDescription(tier) {
    var name = TIER_NAMES[tier];

    let description = shortenDimensions(player['infinityDimension'+tier].amount) + ' (' + player['infinityDimension'+tier].bought + ')';

    if (tier < 8) {
        description += '  (+' + formatValue(player.options.notation, DimensionRateOfChange(tier), 2, 2) + '%/s)';
    }

    return description;
}


function DimensionRateOfChange(tier) {
    let toGain = DimensionProduction(tier+1)
    var current = Decimal.max(player["infinityDimension"+tier].amount, 1);
    var change  = toGain.times(10).dividedBy(current);
    return change;
}




function updateInfinityDimensions() {
    for (let tier = 1; tier <= 8; ++tier) {
        document.getElementById("infD"+tier).innerHTML = DISPLAY_NAMES[tier] + " Infinity Dimension x" + shortenDimensions(DimensionPower(tier));
        document.getElementById("infAmount"+tier).innerHTML = DimensionDescription(tier);
        var name = TIER_NAMES[tier];
        if (!player.infDimensionsUnlocked[tier-1]) {
            break;
        }

        document.getElementById("infRow"+tier).style.display = "table-row";
        document.getElementById("infRow"+tier).style.visibility = "visible";
    }
}

function DimensionProduction(tier) {
    if (player.currentEternityChall == "eterc10") return new Decimal(0)
    var dim = player["infinityDimension"+tier]
    var ret = dim.amount
    if (player.currentEternityChall == "eterc7") ret = ret.dividedBy(player.tickspeed.dividedBy(1000))
    if (player.challenges.includes("postc6")) return ret.times(DimensionPower(tier)).dividedBy(player.tickspeed.dividedBy(1000).pow(0.0005))
    else return ret.times(DimensionPower(tier))
}

function DimensionPower(tier) {
    var dim = player["infinityDimension"+tier]
    var mult = dim.power.times(infDimPow)
    if (player.achievements.includes("r94") && tier == 1) mult = mult.times(2);
    if (player.achievements.includes("r75")) mult = mult.times(player.achPow);
    if (player.replicanti.unl && player.replicanti.amount.gt(1)) {
        var replmult = Decimal.pow(Decimal.log2(player.replicanti.amount), 2)

        if (player.timestudy.studies.includes(21)) replmult = replmult.plus(Decimal.pow(player.replicanti.amount, 0.032))
        if (player.timestudy.studies.includes(102)) replmult = replmult.times(Decimal.pow(5, player.replicanti.galaxies))

        mult = mult.times(replmult)
    }

    if (player.timestudy.studies.includes(72) && (tier == 4 || tier == 8)) {
        mult = mult.times(calcTotalSacrificeBoost().pow(0.02))
    }

    if (player.timestudy.studies.includes(82)) {
        mult = mult.times(Decimal.pow(1.0000109,Math.pow(player.resets,2)))
    }

    if (player.eternityUpgrades.includes(1)) {
        mult = mult.times(player.eternityPoints.plus(1))
    }

    if (player.eternityUpgrades.includes(2)) mult = mult.times(Decimal.pow(Math.min(player.eternities, 125000)/300 + 1, Math.log(Math.min(player.eternities, 125000)*2+1)/Math.log(4)).times(new Decimal((player.eternities-125000)/300 + 1).times(Math.log((player.eternities- 125000)*2+1)/Math.log(4)).max(1)))

    if (player.eternityUpgrades.includes(3)) mult = mult.times(Decimal.pow(2,300/Math.max(infchallengeTimes, player.achievements.includes("r112") ? 6.1 : 7.5)))

    if (player.timestudy.studies.includes(92)) mult = mult.times(Decimal.pow(2, 600/Math.max(player.bestEternity, 20)))
    if (player.timestudy.studies.includes(162)) mult = mult.times(1e11)
    if (ECTimesCompleted("eterc2") !== 0 && tier == 1) mult = mult.times(player.infinityPower.pow(1.5/(700-ECTimesCompleted("eterc2")*100)).min(new Decimal("1e100")).plus(1))
    if (player.currentEternityChall == "eterc2") mult = mult.times(0)

    if (ECTimesCompleted("eterc4") !== 0) mult = mult.times(player.infinityPoints.pow(0.003 + ECTimesCompleted("eterc4")*0.002).min(new Decimal("1e200")))

    if (ECTimesCompleted("eterc9") !== 0) mult = mult.times(player.timeShards.pow(ECTimesCompleted("eterc9")*0.1).plus(1).min(new Decimal("1e400")))
    return mult
}




function resetInfDimensions() {

    if (player.infDimensionsUnlocked[0]) {
        player.infinityPower = new Decimal(0)
    }
    if (player.infDimensionsUnlocked[7] && player.infinityDimension6.amount != 0 && ECTimesCompleted("eterc7") > 0){
        player.infinityDimension8.amount = new Decimal(player.infinityDimension8.baseAmount)
        player.infinityDimension7.amount = new Decimal(player.infinityDimension7.baseAmount)
        player.infinityDimension6.amount = new Decimal(player.infinityDimension6.baseAmount)
        player.infinityDimension5.amount = new Decimal(player.infinityDimension5.baseAmount)
        player.infinityDimension4.amount = new Decimal(player.infinityDimension4.baseAmount)
        player.infinityDimension3.amount = new Decimal(player.infinityDimension3.baseAmount)
        player.infinityDimension2.amount = new Decimal(player.infinityDimension2.baseAmount)
        player.infinityDimension1.amount = new Decimal(player.infinityDimension1.baseAmount)
    }
    if (player.infDimensionsUnlocked[7] && player.infinityDimension6.amount != 0){
        player.infinityDimension7.amount = new Decimal(player.infinityDimension7.baseAmount)
        player.infinityDimension6.amount = new Decimal(player.infinityDimension6.baseAmount)
        player.infinityDimension5.amount = new Decimal(player.infinityDimension5.baseAmount)
        player.infinityDimension4.amount = new Decimal(player.infinityDimension4.baseAmount)
        player.infinityDimension3.amount = new Decimal(player.infinityDimension3.baseAmount)
        player.infinityDimension2.amount = new Decimal(player.infinityDimension2.baseAmount)
        player.infinityDimension1.amount = new Decimal(player.infinityDimension1.baseAmount)
    }
    if (player.infDimensionsUnlocked[6] && player.infinityDimension6.amount != 0){
        player.infinityDimension6.amount = new Decimal(player.infinityDimension6.baseAmount)
        player.infinityDimension5.amount = new Decimal(player.infinityDimension5.baseAmount)
        player.infinityDimension4.amount = new Decimal(player.infinityDimension4.baseAmount)
        player.infinityDimension3.amount = new Decimal(player.infinityDimension3.baseAmount)
        player.infinityDimension2.amount = new Decimal(player.infinityDimension2.baseAmount)
        player.infinityDimension1.amount = new Decimal(player.infinityDimension1.baseAmount)
    }
    if (player.infDimensionsUnlocked[5] && player.infinityDimension6.amount != 0){
        player.infinityDimension5.amount = new Decimal(player.infinityDimension5.baseAmount)
        player.infinityDimension4.amount = new Decimal(player.infinityDimension4.baseAmount)
        player.infinityDimension3.amount = new Decimal(player.infinityDimension3.baseAmount)
        player.infinityDimension2.amount = new Decimal(player.infinityDimension2.baseAmount)
        player.infinityDimension1.amount = new Decimal(player.infinityDimension1.baseAmount)
    }
    if (player.infDimensionsUnlocked[4] && player.infinityDimension5.amount != 0){
        player.infinityDimension4.amount = new Decimal(player.infinityDimension4.baseAmount)
        player.infinityDimension3.amount = new Decimal(player.infinityDimension3.baseAmount)
        player.infinityDimension2.amount = new Decimal(player.infinityDimension2.baseAmount)
        player.infinityDimension1.amount = new Decimal(player.infinityDimension1.baseAmount)
    }
    if (player.infDimensionsUnlocked[3] && player.infinityDimension4.amount != 0){
        player.infinityDimension3.amount = new Decimal(player.infinityDimension3.baseAmount)
        player.infinityDimension2.amount = new Decimal(player.infinityDimension2.baseAmount)
        player.infinityDimension1.amount = new Decimal(player.infinityDimension1.baseAmount)
    }
    else if (player.infDimensionsUnlocked[2] && player.infinityDimension3.amount != 0){
        player.infinityDimension2.amount = new Decimal(player.infinityDimension2.baseAmount)
        player.infinityDimension1.amount = new Decimal(player.infinityDimension1.baseAmount)
    }
    else if (player.infDimensionsUnlocked[1] && player.infinityDimension2.amount != 0){
        player.infinityDimension1.amount = new Decimal(player.infinityDimension1.baseAmount)
    }

}


var infCostMults = [null, 1e3, 1e6, 1e8, 1e10, 1e15, 1e20, 1e25, 1e30]
var infPowerMults = [null, 50, 30, 10, 5, 5, 5, 5, 5]
function buyManyInfinityDimension(tier) {
    if (player.eterc8ids <= 0 && player.currentEternityChall == "eterc8") return false
    var dim = player["infinityDimension"+tier]
    if (player.infinityPoints.lt(dim.cost)) return false
    if (!player.infDimensionsUnlocked[tier-1]) return false
    if (player.eterc8ids == 0) return false
    player.infinityPoints = player.infinityPoints.minus(dim.cost)
    dim.amount = dim.amount.plus(10);
    dim.cost = Decimal.round(dim.cost.times(infCostMults[tier]))
    dim.power = dim.power.times(infPowerMults[tier])
    dim.baseAmount += 10

    if (player.currentEternityChall == "eterc8") player.eterc8ids-=1
    document.getElementById("eterc8ids").innerHTML = "You have "+player.eterc8ids+" purchases left."
}

function buyMaxInfDims(tier) {
    var dim = player["infinityDimension"+tier]

    if (player.infinityPoints.lt(dim.cost)) return false
    if (!player.infDimensionsUnlocked[tier-1]) return false

    var toBuy = Math.ceil((player.infinityPoints.e - dim.cost.e) / Math.log10(infCostMults[tier]))
    dim.cost = dim.cost.times(Decimal.pow(infCostMults[tier], toBuy-1))
    player.infinityPoints = player.infinityPoints.minus(dim.cost)
    dim.cost = dim.cost.times(infCostMults[tier])
    dim.amount = dim.amount.plus(10*toBuy);
    dim.power = dim.power.times(Decimal.pow(infPowerMults[tier], toBuy))
    dim.baseAmount += 10*toBuy
}

function switchAutoInf(tier) {
    if (player.infDimBuyers[tier-1]) {
        player.infDimBuyers[tier-1] = false
        document.getElementById("infauto"+tier).innerHTML = "Auto: OFF"
    } else {
        player.infDimBuyers[tier-1] = true
        document.getElementById("infauto"+tier).innerHTML = "Auto: ON"
    }
}

function toggleAllInfDims() {
    if (player.infDimBuyers[0]) {
        for (var i=1; i<9; i++) {
            player.infDimBuyers[i-1] = false
            document.getElementById("infauto"+i).innerHTML = "Auto: OFF"
        }
    } else {
        for (var i=1; i<9; i++) {
            if (player.eternities - 10>=i) {
                player.infDimBuyers[i-1] = true
                document.getElementById("infauto"+i).innerHTML = "Auto: ON"
            }
        }
    }
}

function loadInfAutoBuyers() {
    for (var i=1; i<9; i++) {
        if (player.infDimBuyers[i-1]) document.getElementById("infauto"+i).innerHTML = "Auto: ON"
        else document.getElementById("infauto"+i).innerHTML = "Auto: OFF"
    }
}



var infDimPow = 1


//time dimensions

function getTimeDimensionPower(tier) {
    var dim = player["timeDimension"+tier]
    var ret = new Decimal(dim.power)

    if (player.eternityUpgrades.includes(4)) ret = ret.times(player.achPow)
    if (player.eternityUpgrades.includes(5)) ret = ret.times(Math.max(player.timestudy.theorem, 1))
    if (player.eternityUpgrades.includes(6)) ret = ret.times(player.totalTimePlayed / 10 / 60 / 60 / 24)
    if (player.timestudy.studies.includes(11) && tier == 1) ret = ret.dividedBy(player.tickspeed.dividedBy(1000).pow(0.005).times(0.95).plus(player.tickspeed.dividedBy(1000).pow(0.0003).times(0.05)))
    if (player.timestudy.studies.includes(73) && tier == 3) ret = ret.times(calcTotalSacrificeBoost().pow(0.005).min(new Decimal("1e1300")))
    if (player.timestudy.studies.includes(93)) ret = ret.times(Decimal.pow(player.totalTickGained, 0.25).max(1))
    if (player.timestudy.studies.includes(103)) ret = ret.times(Math.max(player.replicanti.galaxies, 1))
    if (player.timestudy.studies.includes(151)) ret = ret.times(1e4)
    //if (player.achievements.includes("r103")) ret = ret.times(Decimal.pow(player.totalTickGained,0.02).max(1))
    if (player.achievements.includes("r105")) ret = ret.div(player.tickspeed.div(1000).pow(0.000005))
    if (player.currentEternityChall == "eterc9") ret = ret.times((Decimal.pow(Math.max(player.infinityPower.log2(), 1), 4)).max(1))
    if (ECTimesCompleted("eterc1") !== 0) ret = ret.times(Math.pow(Math.max(player.thisEternity*10, 1), 0.3+(ECTimesCompleted("eterc1")*0.05)))
    let ec10bonus = new Decimal(1)
    if (ECTimesCompleted("eterc10") !== 0) ec10bonus = new Decimal(Math.max(getInfinitied() * ECTimesCompleted("eterc10") * 0.000002+1, 1))
    if (player.timestudy.studies.includes(31)) ec10bonus = ec10bonus.pow(4)
    ret = ret.times(ec10bonus)
    return ret

}


function getTimeDimensionProduction(tier) {
    if (player.currentEternityChall == "eterc10") return new Decimal(0)
    var dim = player["timeDimension"+tier]
    var ret = dim.amount.times(dim.power)
    ret = ret.times(getTimeDimensionPower(tier))
    if (player.currentEternityChall == "eterc7") ret = ret.dividedBy(player.tickspeed.dividedBy(1000))
    if (player.currentEternityChall == "eterc1") return new Decimal(0)
    return ret
}


function getTimeDimensionRateOfChange(tier) {
    let toGain = getTimeDimensionProduction(tier+1)
    var current = Decimal.max(player["timeDimension"+tier].amount, 1);
    var change  = toGain.times(10).dividedBy(current);
    return change;
}

function getTimeDimensionDescription(tier) {
    var name = TIER_NAMES[tier];

    let description = shortenDimensions(player['timeDimension'+tier].amount);

    if (tier < 4) {
        description += '  (+' + formatValue(player.options.notation, getTimeDimensionRateOfChange(tier), 2, 2) + '%/s)';
    }

    return description;
}

function updateTimeDimensions() {
    for (let tier = 1; tier <= 4; ++tier) {
        document.getElementById("timeD"+tier).innerHTML = DISPLAY_NAMES[tier] + " Time Dimension x" + shortenMoney(getTimeDimensionPower(tier));
        document.getElementById("timeAmount"+tier).innerHTML = getTimeDimensionDescription(tier);
    }
}

var timeDimCostMults = [null, 3, 9, 27, 81]
var timeDimStartCosts = [null, 1, 5, 100, 1000]
function buyTimeDimension(tier) {

    var dim = player["timeDimension"+tier]
    if (player.eternityPoints.lt(dim.cost)) return false

    player.eternityPoints = player.eternityPoints.minus(dim.cost)
    dim.amount = dim.amount.plus(1);
    dim.bought += 1
    dim.cost = Decimal.pow(timeDimCostMults[tier], dim.bought).times(timeDimStartCosts[tier])
    if (dim.cost.gte(Number.MAX_VALUE)) {
        dim.cost = Decimal.pow(timeDimCostMults[tier]*1.5, dim.bought).times(timeDimStartCosts[tier])
    }
    dim.power = dim.power.times(2)
    updateEternityUpgrades()
    return true
}

function resetTimeDimensions() {
    for (var i=1; i<5; i++) {
        var dim = player["timeDimension"+i]
        dim.amount = new Decimal(dim.bought)
    }

}

function buyMaxTimeDimensions() {
    for(var i=1; i<5; i++) while(buyTimeDimension(i)) continue
}


// Time studies

function buyWithAntimatter() {
    if (player.money.gte(player.timestudy.amcost)) {
        player.money = player.money.minus(player.timestudy.amcost)
        player.timestudy.amcost = player.timestudy.amcost.times(new Decimal("1e20000"))
        player.timestudy.theorem += 1
        updateTheoremButtons()
        updateTimeStudyButtons()
        return true
    } else return false
}

function buyWithIP() {
    if (player.infinityPoints.gte(player.timestudy.ipcost)) {
        player.infinityPoints = player.infinityPoints.minus(player.timestudy.ipcost)
        player.timestudy.ipcost = player.timestudy.ipcost.times(1e100)
        player.timestudy.theorem += 1
        updateTheoremButtons()
        updateTimeStudyButtons()
        return true
    } else return false
}

function buyWithEP() {
    if (player.timeDimension1.bought < 1) {
        alert("You need to buy at least 1 time dimension before you can purchase theorems with Eternity points.")
        return false;
    }
    if (player.eternityPoints.gte(player.timestudy.epcost)) {
        player.eternityPoints = player.eternityPoints.minus(player.timestudy.epcost)
        player.timestudy.epcost = player.timestudy.epcost.times(2)
        player.timestudy.theorem += 1
        updateTheoremButtons()
        updateTimeStudyButtons()
        updateEternityUpgrades()
        return true
    } else return false
}

function maxTheorems() {
    while (buyWithAntimatter()) continue
    while (buyWithIP()) continue
    while (buyWithEP()) continue
}

function updateTheoremButtons() {
    document.getElementById("theoremam").className = player.money.gte(player.timestudy.amcost) ? "timetheorembtn" : "timetheorembtnlocked"
    document.getElementById("theoremip").className = player.infinityPoints.gte(player.timestudy.ipcost) ? "timetheorembtn" : "timetheorembtnlocked"
    document.getElementById("theoremep").className = player.eternityPoints.gte(player.timestudy.epcost) ? "timetheorembtn" : "timetheorembtnlocked"
    document.getElementById("theoremep").innerHTML = "Buy Time Theorems <br>Cost: "+shortenDimensions(player.timestudy.epcost)+" EP"
    document.getElementById("theoremip").innerHTML = "Buy Time Theorems <br>Cost: "+shortenCosts(player.timestudy.ipcost)+" IP"
    document.getElementById("theoremam").innerHTML = "Buy Time Theorems <br>Cost: "+shortenCosts(player.timestudy.amcost)
    document.getElementById("timetheorems").innerHTML = "You have <span style='display:inline' class=\"TheoremAmount\">"+player.timestudy.theorem+"</span> Time "+ (player.timestudy.theorem == 1 ? "Theorem." : "Theorems.")
}

function buyTimeStudy(name, cost, check) {
    if (shiftDown && check === undefined) studiesUntil(name);
    else if (player.timestudy.theorem >= cost && canBuyStudy(name) && !player.timestudy.studies.includes(name)) {
        player.timestudy.studies.push(name)
        player.timestudy.theorem -= cost
        if (name == 71 || name == 81 || name == 91 || name == 101) {
            document.getElementById(""+name).className = "timestudybought normaldimstudy"
        } else if (name == 72 || name == 82 || name == 92 || name == 102) {
            document.getElementById(""+name).className = "timestudybought infdimstudy"
        } else if (name == 73 || name == 83 || name == 93 || name == 103) {
            document.getElementById(""+name).className = "timestudybought timedimstudy"
        } else if (name == 121 || name == 131 || name == 141) {
            document.getElementById(""+name).className = "timestudybought activestudy"
        } else if (name == 122 || name == 132 || name == 142) {
            document.getElementById(""+name).className = "timestudybought passivestudy"
        } else if (name == 123 || name == 133 || name == 143) {
            document.getElementById(""+name).className = "timestudybought idlestudy"
        } else {
            document.getElementById(""+name).className = "timestudybought"
        }
        updateTheoremButtons()
        updateTimeStudyButtons()
        drawStudyTree()
    }
}

function hasRow(row) {
    for (var i=0; i<player.timestudy.studies.length; i++) {
        if (Math.floor(player.timestudy.studies[i]/10) == row) return true
    }
}

function canBuyStudy(name) {
    var row = Math.floor(name/10)
    var col = name%10
    if (name == 33) {
        if (player.timestudy.studies.includes(21)) return true; else return false
    }
    if (name == 62) {
        if (player.eternityChalls.eterc5 !== undefined && player.timestudy.studies.includes(42)) return true; else return false
    }

    if (name == 181) {
        if (player.eternityChalls.eterc1 !== undefined && player.eternityChalls.eterc2 !== undefined && player.eternityChalls.eterc3 !== undefined && player.timestudy.studies.includes(171)) return true; else return false;
    }
    if (name == 201) if(player.timestudy.studies.includes(192)) return true; else return false
    if (name == 211) if(player.timestudy.studies.includes(191)) return true; else return false
    if (name == 212) if(player.timestudy.studies.includes(191)) return true; else return false
    if (name == 213) if(player.timestudy.studies.includes(193)) return true; else return false
    if (name == 214) if(player.timestudy.studies.includes(193)) return true; else return false
    switch(row) {

        case 1: return true
        break;

        case 2:
        case 5:
        case 6:
        case 11:
        case 15:
        case 16:
        case 17:
        if (hasRow(row-1)) return true; else return false
        break;

        case 3:
        case 4:
        case 8:
        case 9:
        case 10:
        case 13:
        case 14:
        if (player.timestudy.studies.includes((row-1)*10 + col)) return true; else return false
        break;

        case 12:
        if (hasRow(row-1) && !hasRow(row)) return true; else return false
        break;

        case 7:
        if (!player.timestudy.studies.includes(201)) {
            if (player.timestudy.studies.includes(61) && !hasRow(row)) return true; else return false
        } else {
            if (player.timestudy.studies.filter(function(x) {return Math.floor(x / 10) == 7}).length < 2) return true; else return false
        }
        break;
    
        case 19:
        if (player.eternityChalls.eterc10 !== undefined && player.timestudy.studies.includes(181)) return true; else return false
        break;

    }
}
var all =      [11, 21, 22, 33, 31, 32, 41, 42, 51, 61, 62, 71, 72, 73, 81, 82 ,83, 91, 92, 93, 101, 102, 103, 111, 121, 122, 123, 131, 132, 133, 141, 142, 143, 151, 161, 162, 171, 181, 191, 192, 193, 201, 211, 212, 213, 214]
var studyCosts = [1, 3, 2, 2, 3, 2, 4, 6, 3, 3, 3, 4, 6, 5, 4, 6, 5, 4, 5, 7, 4, 6, 6, 12, 9, 9, 9, 5, 5, 5, 4, 4, 4, 8, 7, 7, 15, 200, 400, 730, 300, 900, 120, 150, 200, 120]
function updateTimeStudyButtons() {
    for (var i=0; i<all.length; i++) {
        if (!player.timestudy.studies.includes(all[i])) {
            if (canBuyStudy(all[i]) && studyCosts[i]<=player.timestudy.theorem) {
                if (all[i] == 71 || all[i] == 81 || all[i] == 91 || all[i] == 101) {
                    document.getElementById(all[i]).className = "timestudy normaldimstudy"
                } else if (all[i] == 72 || all[i] == 82 || all[i] == 92 || all[i] == 102) {
                    document.getElementById(all[i]).className = "timestudy infdimstudy"
                } else if (all[i] == 73 || all[i] == 83 || all[i] == 93 || all[i] == 103) {
                    document.getElementById(all[i]).className = "timestudy timedimstudy"
                }  else if (all[i] == 121 || all[i] == 131 || all[i] == 141) {
                    document.getElementById(all[i]).className = "timestudy activestudy"
                }  else if (all[i] == 122 || all[i] == 132 || all[i] == 142) {
                    document.getElementById(all[i]).className = "timestudy passivestudy"
                }  else if (all[i] == 123 || all[i] == 133 || all[i] == 143) {
                    document.getElementById(all[i]).className = "timestudy idlestudy"
                } else {
                    document.getElementById(all[i]).className = "timestudy"
                }
            } 
            else {
                if (all[i] == 71 || all[i] == 81 || all[i] == 91 || all[i] == 101) {
                    document.getElementById(all[i]).className = "timestudylocked normaldimstudylocked"
                } else if (all[i] == 72 || all[i] == 82 || all[i] == 92 || all[i] == 102) {
                    document.getElementById(all[i]).className = "timestudylocked infdimstudylocked"
                } else if (all[i] == 73 || all[i] == 83 || all[i] == 93 || all[i] == 103) {
                    document.getElementById(all[i]).className = "timestudylocked timedimstudylocked"
                }  else if (all[i] == 121 || all[i] == 131 || all[i] == 141) {
                    document.getElementById(all[i]).className = "timestudylocked activestudylocked"
                }  else if (all[i] == 122 || all[i] == 132 || all[i] == 142) {
                    document.getElementById(all[i]).className = "timestudylocked passivestudylocked"
                }  else if (all[i] == 123 || all[i] == 133 || all[i] == 143) {
                    document.getElementById(all[i]).className = "timestudylocked idlestudylocked"
                } else {
                    document.getElementById(all[i]).className = "timestudylocked"
                }
            }
        }
    }
}

function studiesUntil(id) {
    var col = id % 10;
    var row = Math.floor(id / 10);
	var path = [0,0];
    for(var i=1;i<4;i++){
        if (player.timestudy.studies.includes(70+i)) path[0] = i;
        if (player.timestudy.studies.includes(120+i))path[1] = i;
    }
    if ((row > 10 && path[0] === 0) || (row > 14 && path[1] === 0)) {
        return;
    }
    for (var i = 1; i < row; i++) {
        var chosenPath = path[i > 11 ? 1 : 0];
        if ((i > 6 && i < 11) || (i > 11 && i < 15)) buyTimeStudy(i * 10 + (chosenPath === 0 ? col : chosenPath), studyCosts[all.indexOf(i * 10 + (chosenPath === 0 ? col : chosenPath))], 0);
        else for (var j = 1; all.includes(i * 10 + j) ; j++) buyTimeStudy(i * 10 + j, studyCosts[all.indexOf(i * 10 + j)], 0);
    }
    buyTimeStudy(id, studyCosts[all.indexOf(id)], 0);
}


function respecTimeStudies() {
    for (var i=0; i<all.length; i++) {
        if (player.timestudy.studies.includes(all[i])) {
            player.timestudy.theorem += studyCosts[i]   
        }
    }
    player.timestudy.studies = []
    switch(player.eternityChallUnlocked) {
        case 1:
        player.timestudy.theorem += 30
        break;

        case 2:
        player.timestudy.theorem += 35
        break;

        case 3:
        player.timestudy.theorem += 40
        break;

        case 4:
        player.timestudy.theorem += 70
        break;

        case 5:
        player.timestudy.theorem += 130
        break;

        case 6:
        player.timestudy.theorem += 85
        break;

        case 7:
        player.timestudy.theorem += 115
        break;

        case 8:
        player.timestudy.theorem += 115
        break;

        case 9:
        player.timestudy.theorem += 415
        break;

        case 10:
        player.timestudy.theorem += 550
        break;
    }
    player.eternityChallUnlocked = 0
    updateTimeStudyButtons()
    updateTheoremButtons()
    drawStudyTree()

    
}



function getDimensionBoostPower() {
    if (player.currentChallenge == "challenge11" || player.currentChallenge == "postc1") return Decimal.fromNumber(1);
    
    var ret = 2
    if (player.infinityUpgrades.includes("resetMult")) ret = 2.5
    if (player.challenges.includes("postc7")) ret = 4
    if (player.currentChallenge == "postc7" || player.timestudy.studies.includes(81)) ret = 10

    if (player.achievements.includes("r101")) ret = ret*1.01
    if (player.timestudy.studies.includes(83)) ret = Decimal.pow(1.0004, player.totalTickGained).times(ret);
    
    return Decimal.fromValue(ret)
}

function softReset(bulk) {
    //if (bulk < 1) bulk = 1 (fixing issue 184)
    if (!player.break && player.money.gt(Number.MAX_VALUE)) return;
    player.resets+=bulk;
    if (bulk >= 750) giveAchievement("Costco sells dimboosts now");
    player = {
        money: player.achievements.includes("r111") ? player.money : new Decimal(10),
        tickSpeedCost: new Decimal(1000),
        tickspeed: new Decimal(1000),
        firstCost: new Decimal(10),
        secondCost: new Decimal(100),
        thirdCost: new Decimal(10000),
        fourthCost: new Decimal(1000000),
        fifthCost: new Decimal(1e9),
        sixthCost: new Decimal(1e13),
        seventhCost: new Decimal(1e18),
        eightCost: new Decimal(1e24),
        firstAmount: new Decimal(0),
        secondAmount: new Decimal(0),
        thirdAmount: new Decimal(0),
        fourthAmount: new Decimal(0),
        firstBought: 0,
        secondBought: 0,
        thirdBought: 0,
        fourthBought: 0,
        fifthAmount: new Decimal(0),
        sixthAmount: new Decimal(0),
        seventhAmount: new Decimal(0),
        eightAmount: new Decimal(0),
        fifthBought: 0,
        sixthBought: 0,
        seventhBought: 0,
        eightBought: 0,
        sacrificed: new Decimal(0),
        achievements: player.achievements,
        challenges: player.challenges,
        currentChallenge: player.currentChallenge,
        infinityUpgrades: player.infinityUpgrades,
        infinityPoints: player.infinityPoints,
        infinitied: player.infinitied,
        infinitiedBank: player.infinitiedBank,
        totalTimePlayed: player.totalTimePlayed,
        bestInfinityTime: player.bestInfinityTime,
        thisInfinityTime: player.thisInfinityTime,
        firstPow: getDimensionBoostPower().pow(player.resets),
        secondPow: getDimensionBoostPower().pow(player.resets-1),
        thirdPow: getDimensionBoostPower().pow(player.resets- 2).max(1),
        fourthPow: getDimensionBoostPower().pow(player.resets- 3).max(1),
        fifthPow: getDimensionBoostPower().pow(player.resets- 4).max(1),
        sixthPow: getDimensionBoostPower().pow(player.resets- 5).max(1),
        seventhPow: getDimensionBoostPower().pow(player.resets- 6).max(1),
        eightPow: getDimensionBoostPower().pow(player.resets- 7).max(1),
        resets: player.resets,
        galaxies: player.galaxies,
        tickDecrease: player.tickDecrease,
        totalmoney: player.totalmoney,
        interval: null,
        lastUpdate: player.lastUpdate,
        achPow: player.achPow,
	    newsArray: player.newsArray,
        autobuyers: player.autobuyers,
        costMultipliers: [new Decimal(1e3), new Decimal(1e4), new Decimal(1e5), new Decimal(1e6), new Decimal(1e8), new Decimal(1e10), new Decimal(1e12), new Decimal(1e15)],
        tickspeedMultiplier: new Decimal(10),
        chall2Pow: player.chall2Pow,
        chall3Pow: new Decimal(0.01),
        matter: new Decimal(0),
        chall11Pow: new Decimal(1),
        partInfinityPoint: player.partInfinityPoint,
        partInfinitied: player.partInfinitied,
        break: player.break,
        challengeTimes: player.challengeTimes,
        infchallengeTimes: player.infchallengeTimes,
        lastTenRuns: player.lastTenRuns,
        lastTenEternities: player.lastTenEternities,
        infMult: player.infMult,
        infMultCost: player.infMultCost,
        tickSpeedMultDecrease: player.tickSpeedMultDecrease,
        tickSpeedMultDecreaseCost: player.tickSpeedMultDecreaseCost,
        dimensionMultDecrease: player.dimensionMultDecrease,
        dimensionMultDecreaseCost: player.dimensionMultDecreaseCost,
        version: player.version,
        overXGalaxies: player.overXGalaxies,
        infDimensionsUnlocked: player.infDimensionsUnlocked,
        infinityPower: player.infinityPower,
        spreadingCancer: player.spreadingCancer,
        postChallUnlocked: player.postChallUnlocked,
        postC4Tier: 1,
        postC3Reward: new Decimal(1),
        infinityDimension1: player.infinityDimension1,
        infinityDimension2: player.infinityDimension2,
        infinityDimension3: player.infinityDimension3,
        infinityDimension4: player.infinityDimension4,
        infinityDimension5: player.infinityDimension5,
        infinityDimension6: player.infinityDimension6,
        infinityDimension7: player.infinityDimension7,
        infinityDimension8: player.infinityDimension8,
        infDimBuyers: player.infDimBuyers,
        timeShards: player.timeShards,
        tickThreshold: player.tickThreshold,
        timeDimension1: player.timeDimension1,
        timeDimension2: player.timeDimension2,
        timeDimension3: player.timeDimension3,
        timeDimension4: player.timeDimension4,
        eternityPoints: player.eternityPoints,
        eternities: player.eternities,
        thisEternity: player.thisEternity,
        bestEternity: player.bestEternity,
        eternityUpgrades: player.eternityUpgrades,
        epmult: player.epmult,
        epmultCost: player.epmultCost,
        totalTickGained: player.totalTickGained,
        offlineProd: player.offlineProd,
        offlineProdCost: player.offlineProdCost,
        challengeTarget: player.challengeTarget,
        autoSacrifice: player.autoSacrifice,
        replicanti: player.replicanti,
        timestudy: player.timestudy,
        eternityChalls: player.eternityChalls,
        eternityChallGoal: player.eternityChallGoal,
        currentEternityChall: player.currentEternityChall,
        eternityChallUnlocked: player.eternityChallUnlocked,
        etercreq: player.etercreq,
        autoIP: player.autoIP,
        autoTime: player.autoTime,
        infMultBuyer: player.infMultBuyer,
        autoCrunchMode: player.autoCrunchMode,
        respec: player.respec,
        eternityBuyer: player.eternityBuyer,
        eterc8ids: player.eterc8ids,
        eterc8repl: player.eterc8repl,
        dimlife: player.dimlife,
        dead: player.dead,
        options: player.options
    };
    if (player.currentChallenge == "challenge10" || player.currentChallenge == "postc1") {
        player.thirdCost = new Decimal(100)
        player.fourthCost = new Decimal(500)
        player.fifthCost = new Decimal(2500)
        player.sixthCost = new Decimal(2e4)
        player.seventhCost = new Decimal(2e5)
        player.eightCost = new Decimal(4e6)
    }
    if (player.currentChallenge == "postc1") player.costMultipliers = [new Decimal(1e3),new Decimal(5e3),new Decimal(1e4),new Decimal(1.2e4),new Decimal(1.8e4),new Decimal(2.6e4),new Decimal(3.2e4),new Decimal(4.2e4)];
    if (player.resets == 1 && player.currentChallenge == "") {
        if (player.infinityUpgrades.includes("skipReset2")) player.resets++;
        if (player.infinityUpgrades.includes("skipReset3")) player.resets++;
        if (player.infinityUpgrades.includes("skipResetGalaxy")) {
            player.resets++;
            if (player.galaxies == 0) player.galaxies = 1
        }
    }
	if (player.currentChallenge == "postc2") {
        player.eightAmount = new Decimal(1);
        player.eightBought = 1;
    }


    if (player.achievements.includes("r36")) player.tickspeed = player.tickspeed.times(0.98);
    if (player.achievements.includes("r45")) player.tickspeed = player.tickspeed.times(0.98);
    if (player.achievements.includes("r66")) player.tickspeed = player.tickspeed.times(0.98);
    if (player.achievements.includes("r83")) player.tickspeed = player.tickspeed.times(Decimal.pow(0.95,player.galaxies));






    clearInterval(player.interval);
    //updateInterval();
    if (player.eternities < 30) {
        document.getElementById("secondRow").style.display = "none";
        document.getElementById("thirdRow").style.display = "none";
        document.getElementById("tickSpeed").style.visibility = "hidden";
        document.getElementById("tickSpeedMax").style.visibility = "hidden";
        document.getElementById("tickLabel").style.visibility = "hidden";
        document.getElementById("tickSpeedAmount").style.visibility = "hidden";
        document.getElementById("fourthRow").style.display = "none";
        document.getElementById("fifthRow").style.display = "none";
        document.getElementById("sixthRow").style.display = "none";
        document.getElementById("seventhRow").style.display = "none";
        document.getElementById("eightRow").style.display = "none";
    }


    player.tickspeed = player.tickspeed.times(Decimal.pow(getTickSpeedMultiplier(), player.totalTickGained))
    if (player.challenges.includes("challenge1")) player.money = new Decimal(100).max(player.money)
    if (player.achievements.includes("r37")) player.money = new Decimal(1000).max(player.money);
    if (player.achievements.includes("r54")) player.money = new Decimal(2e5).max(player.money);
    if (player.achievements.includes("r55")) player.money = new Decimal(1e10).max(player.money);
    if (player.achievements.includes("r78")) player.money = new Decimal(1e25).max(player.money);

    if (player.resets >= 10) {
        giveAchievement("Boosting to the max");
    }
}

/*var mults = [new Decimal(1e3), new Decimal(1e4), new Decimal(1e5), new Decimal(1e6), new Decimal(1e8), new Decimal(1e10), new Decimal(1e12), new Decimal(1e15)]
var bases = [new Decimal(10), new Decimal(100), new Decimal(10000), new Decimal(1000000),new Decimal(1e9), new Decimal(1e13), new Decimal(1e18), new Decimal(1e24)]
var string = "["
for (var tier=1; tier <9; tier++) {
    var cost = bases[tier-1]
    var mult = mults[tier-1]
    string += "["
    for (var i=0; i<3000; i++) {
        string += "'"+cost.toString()+"',"
        cost = cost.times(mult)
        if (cost.gt(Number.MAX_VALUE)) mult = mult.times(3)
    }
    string += "],"
}
console.log(string)*/



MoneyFormat = ['K', 'M', 'B', 'T', 'Qd', 'Qt', 'Sx', 'Sp', 'Oc', 'No', 'Dc', 'UDc', 'DDc', 'TDc', 'QdDc', 'QtDc', 'SxDc', 'SpDc', 'ODc', 'NDc', 'Vg', 'UVg', 'DVg', 'TVg', 'QdVg', 'QtVg', 'SxVg', 'SpVg', 'OVg', 'NVg', 'Tg', 'UTg', 'DTg', 'TTg', 'QdTg', 'QtTg', 'SxTg', 'SpTg', 'OTg', 'NTg', 'Qa', 'UQa', 'DQa', 'TQa', 'QdQa', 'QtQa', 'SxQa', 'SpQa', 'OQa', 'NQa', 'Qi', 'UQi', 'DQi', 'TQi', 'QaQi', 'QtQi', 'SxQi', 'SpQi', 'OQi', 'NQi', 'Se', 'USe', 'DSe', 'TSe', 'QaSe', 'QtSe', 'SxSe', 'SpSe', 'OSe', 'NSe', 'St', 'USt', 'DSt', 'TSt', 'QaSt', 'QtSt', 'SxSt', 'SpSt', 'OSt', 'NSt', 'Og', 'UOg', 'DOg', 'TOg', 'QdOg', 'QtOg', 'SxOg', 'SpOg', 'OOg', 'NOg', 'Nn', 'UNn', 'DNn', 'TNn', 'QdNn', 'QtNn', 'SxNn', 'SpNn', 'ONn', 'NNn', 'Ce', 'UCe'];
MoneyFormat.reverse();

shorten = function (money) {
    return formatValue(player.options.notation, money, 2, 2);
};

shortenCosts = function (money) {
    return formatValue(player.options.notation, money, 0, 0);
};

shortenDimensions = function (money) {
    return formatValue(player.options.notation, money, 2, 0);
};

shortenMoney = function (money) {
    return formatValue(player.options.notation, money, 2, 1);
};

function canBuyTickSpeed() {
    if (player.currentEternityChall == "eterc9") return false
    return canBuyDimension(3);
}

function getTickSpeedMultiplier() {
    if (player.currentChallenge == "postc3") return 1;
    if (player.galaxies + player.replicanti.galaxies < 3) {
        let baseMultiplier = 0.9;
        if (player.galaxies == 0) baseMultiplier = 0.89
        if (player.currentChallenge == "challenge6" || player.currentChallenge == "postc1") baseMultiplier = 0.93;
        let perGalaxy = 0.02;
        let galaxies = player.galaxies+player.replicanti.galaxies
        if (player.timestudy.studies.includes(133)) galaxies += player.replicanti.galaxies/2
        if (player.timestudy.studies.includes(132)) galaxies += player.replicanti.galaxies*0.3
        galaxies += Math.min(player.replicanti.galaxies, player.replicanti.gal) * Math.max(Math.pow(Math.log10(player.infinityPower.plus(1).log10()+1), 0.03 * ECTimesCompleted("eterc8"))-1, 0)
        if (player.infinityUpgrades.includes("galaxyBoost")) perGalaxy *= 2;
        if (player.infinityUpgrades.includes("postGalaxy")) perGalaxy *= 1.5;
        if (player.challenges.includes("postc5")) perGalaxy *= 1.1;
        if (player.achievements.includes("r86")) perGalaxy *= 1.01;
        if (player.timestudy.studies.includes(212)) perGalaxy *= Math.min(Math.pow(player.timeShards.max(2).log2(), 0.005), 1.1)

        return baseMultiplier-(player.galaxies*perGalaxy);
    } else {
        let baseMultiplier = 0.8
        if (player.currentChallenge == "challenge6" || player.currentChallenge == "postc1") baseMultiplier = 0.83
        let perGalaxy = 0.965
        let galaxies = player.galaxies-2+player.replicanti.galaxies
        if (player.timestudy.studies.includes(133)) galaxies += player.replicanti.galaxies/2
        if (player.timestudy.studies.includes(132)) galaxies += player.replicanti.galaxies*0.3
        galaxies +=  Math.min(player.replicanti.galaxies, player.replicanti.gal) * Math.max(Math.pow(Math.log10(player.infinityPower.plus(1).log10()+1), 0.03 * ECTimesCompleted("eterc8"))-1, 0)
        if (player.infinityUpgrades.includes("galaxyBoost")) galaxies *= 2;
        if (player.infinityUpgrades.includes("postGalaxy")) galaxies *= 1.5;
        if (player.challenges.includes("postc5")) galaxies *= 1.1;
        if (player.achievements.includes("r86")) galaxies *= 1.01
        if (player.timestudy.studies.includes(212)) galaxies *= Math.min(Math.pow(player.timeShards.max(2).log2(), 0.005), 1.1)

        return baseMultiplier * (Math.pow(perGalaxy, (galaxies-2)))
    }
}

function buyTickSpeed() {
    if (!canBuyTickSpeed()) {
        return false;
    }

    if (!canAfford(player.tickSpeedCost)) {
        return false;
    }

    player.money = player.money.minus(player.tickSpeedCost);
    if (player.currentChallenge != "challenge5" && player.currentChallenge != "postc5") player.tickSpeedCost = player.tickSpeedCost.times(player.tickspeedMultiplier);
    else multiplySameCosts(player.tickSpeedCost)
    if (player.tickSpeedCost.gte(Number.MAX_VALUE)) player.tickspeedMultiplier = player.tickspeedMultiplier.times(player.tickSpeedMultDecrease);
    if (player.currentChallenge == "challenge2" || player.currentChallenge == "postc1") player.chall2Pow = 0
    player.tickspeed = player.tickspeed.times(getTickSpeedMultiplier());
    if (player.challenges.includes("postc3") || player.currentChallenge == "postc3") player.postC3Reward = player.postC3Reward.times(1.05+(player.galaxies*0.005))
    postc8Mult = new Decimal(1)
    return true;
}

document.getElementById("tickSpeed").onclick = function () {
    buyTickSpeed();

    updateTickSpeed();
};

function buyMaxTickSpeed() {
    if (!canBuyTickSpeed()) return false
    var mult = getTickSpeedMultiplier()
    if (player.currentChallenge == "challenge2" || player.currentChallenge == "postc1") player.chall2Pow = 0
    if (player.currentChallenge == "challenge5" || player.currentChallenge == "postc5" || player.tickSpeedCost.lt(Number.MAX_VALUE) || player.tickSpeedMultDecrease !== 2) {
        while (player.money.gt(player.tickSpeedCost)) {
            player.money = player.money.minus(player.tickSpeedCost);
            if (player.currentChallenge != "challenge5" && player.currentChallenge != "postc5") player.tickSpeedCost = player.tickSpeedCost.times(player.tickspeedMultiplier);
            else multiplySameCosts(player.tickSpeedCost)
            if (player.tickSpeedCost.gte(Number.MAX_VALUE)) player.tickspeedMultiplier = player.tickspeedMultiplier.times(player.tickSpeedMultDecrease);
            player.tickspeed = player.tickspeed.times(mult);
            if (player.challenges.includes("postc3") || player.currentChallenge == "postc3") player.postC3Reward = player.postC3Reward.times(1.05+(player.galaxies*0.005))
            postc8Mult = new Decimal(1)
        }
    } else {

        var a = Math.log10(Math.sqrt(2))
        var b = player.tickspeedMultiplier.dividedBy(Math.sqrt(2)).log10()
        var c = player.tickSpeedCost.dividedBy(player.money).log10()
        var discriminant = Math.pow(b, 2) - (c *a* 4)
        if (discriminant < 0) return false
        var buying = Math.floor((Math.sqrt(Math.pow(b, 2) - (c *a *4))-b)/(2 * a))+1
        if (buying <= 0) return false
        player.tickspeed = player.tickspeed.times(Decimal.pow(mult, buying));
        if (player.challenges.includes("postc3") || player.currentChallenge == "postc3") player.postC3Reward = player.postC3Reward.times(Decimal.pow(1.05+(player.galaxies*0.005), buying))
        for (var i = 0; i<buying-1; i++) {
            player.tickSpeedCost = player.tickSpeedCost.times(player.tickspeedMultiplier)
            player.tickspeedMultiplier = player.tickspeedMultiplier.times(2)
        }
        if (player.money.gte(player.tickSpeedCost)) player.money = player.money.minus(player.tickSpeedCost)
        player.tickSpeedCost = player.tickSpeedCost.times(player.tickspeedMultiplier)
        player.tickspeedMultiplier = player.tickspeedMultiplier.times(2)
    }

    updateTickSpeed()
}

function timeDisplay(time) {
    if (time <= 100) return (time/10).toFixed(2) + " seconds"
    time = Decimal.floor(time / 10)



    if (time >= 31536000) {
        return Decimal.floor(time / 31536000) + " years, " + Decimal.floor((time % 31536000) / 86400) + " days, " + Decimal.floor((time % 86400) / 3600) + " hours, " + Decimal.floor((time % 3600) / 60) + " minutes and " + Decimal.floor(time % 60) + " seconds"
    } else if (time >= 86400) {
        return Decimal.floor(time / 86400) + " days, " + Decimal.floor((time % 86400) / 3600) + " hours, " + Decimal.floor((time % 3600) / 60) + " minutes and " + Decimal.floor(time % 60) + " seconds"
    } else if (time >= 3600) {
        return Decimal.floor(time / 3600) + " hours, " + Decimal.floor((time % 3600) / 60) + " minutes and " + Decimal.floor(time % 60) + " seconds"
    } else if (time >= 60) {
        return Decimal.floor(time / 60) + " minutes and " + Decimal.floor(time % 60) + " seconds"
    } else return Decimal.floor(time % 60) + " seconds"
}

function preformat(int) {
    if (int.toString().length == 1) return "0"+int
    else return int
}

function timeDisplayShort(time) {
    if (time <= 600) return (time/10).toFixed(2) + " seconds"
    time = Decimal.floor(time / 10)
    return preformat(Decimal.floor((time) / 3600)) + ":" + preformat(Decimal.floor((time % 3600) / 60)) + ":" + preformat(Decimal.floor(time % 60))

    }

const allAchievements = {
  r11 : "You gotta start somewhere",
  r12 : "100 antimatter is a lot",
  r13  : "Half life 3 confirmed",
  r14 : "L4D: Left 4 Dimensions",
  r15 : "5 Dimension Antimatter Punch",
  r16 : "We couldn't afford 9",
  r17 : "Not a luck related achievement",
  r18 : "90 degrees to infinity",
  r21 : "To infinity!",
  r22 : "Fake News",
  r23 : "The 9th Dimension is a lie",
  r24 : "Antimatter Apocalypse",
  r25 : "Boosting to the max",
  r26 : "You got past The Big Wall",
  r27 : "Double Galaxy",
  r28 : "There's no point in doing that",
  r31 : "I forgot to nerf that",
  r32 : "The Gods are pleased",
  r33 : "That's a lot of infinites",
  r34 : "You didn't need it anyway",
  r35 : "Don't you dare to sleep",
  r36 : "Claustrophobic",
  r37 : "That's fast!",
  r38 : "I don't believe in Gods",
  r41 : "Spreading Cancer",
  r42 : "Supersanic",
  r43 : "Zero Deaths",
  r44 : "Over in 30 seconds",
  r45 : "Faster than a potato",
  r46 : "Multidimensional",
  r47 : "Daredevil",
  r48 : "AntiChallenged",
  r51 : "Limit Break",
  r52 : "Age of Automation",
  r53 : "Definitely not worth it",
  r54 : "That's faster!",
  r55 : "Forever isn't that long",
  r56 : "Many Deaths",
  r57 : "Gift from the Gods",
  r58 : "Is this hell?",
  r61 : "Bulked up",
  r62 : "Oh hey, you're still here",
  r63 : "A new beginning.",
  r64 : "1 million is a lot",
  r65 : "Not-so-challenging",
  r66 : "Faster than a squared potato",
  r67 : "Infinitely Challenging",
  r68 : "You did this again just for the achievement right?",
  r71 : "ERROR 909: Dimension not found",
  r72 : "Can't hold all these infinities",
  r73 : "This achievement doesn't exist",
  r74 : "End me",
  r75 : "NEW DIMENSIONS???",
  r76 : "One for each dimension",
  r77 : "How the antitables have turned",
  r78 : "Blink of an eye",
  r81 : "Hevipelle did nothing wrong",
  r82 : "Anti-antichallenged",
  r83 : "YOU CAN GET 50 GALAXIES!??",
  r84 : "I got a few to spare",
  r85 : "All your IP are belong to us",
  r86 : "Do you even bend time bro?",
  r87 : "2 Million Infinities",
  r88 : "Yet another infinity reference",
  r91 : "Ludicrous Speed",
  r92 : "I brake for nobody",
  r93 : "MAXIMUM OVERDRIVE",
  r94 : "Minute of infinity",
  r95 : "Is this safe?",
  r96 : "Time is relative",
  r97 : "Yes. This is hell.",
  r98 : "0 degrees from infinity",
  r101 : "Costco sells dimboosts now",
  r102 : "This mile took an Eternity",
  r103 : "This achievement doesn't exist II",
  r104 : "That wasn't an eternity",
  r105 : "Infinite time",
  r106 : "The swarm",
  r107 : "Do you really need a guide for this?",
  r108 : "We could afford 9",
  r111 : "Yo dawg, I heard you liked infinities...",
  r112 : "Never again",
  r113 : "Long lasting relationship",
  r114 : "You're a mistake",
  r115 : "I wish I had gotten 7 eternities",
  r116 : "Do I really need to infinity",
  r117 : "8 nobody got time for that",
  r118 : "IT'S OVER 9000",
  r121 : "Can you get infinite IP?",
  r122 : "You're already dead.",
  r123 : "5 more eternities until the update",
  r124 : "Eternities are the new infinity",
  r125 : "Like feasting on a behind",
  r126 : "Popular music",
  r127 : "But I wanted another prestige layer...",
  r128 : "What do I have to do to get rid of you",
};
const allAchievementNums = Object.invert(allAchievements)
// to retrieve by value: Object.keys(allAchievements).find(key => allAchievements[key] === "L4D: Left 4 Dimensions");

function clearOldAchieves(){
    var toRemove = [];
    var achieveKey;
    var values = Object.keys(allAchievements).map(function(e) { return allAchievements[e] });
    for (var i = 0; i < player.achievements.length; i++) {
      if (values.indexOf(player.achievements[i]) !== -1 ) {  // does index[i] exist in allAchievements as a value?
        toRemove.push(i); // mark it for removal
        achieveKey = Object.keys(allAchievements).find(function(key){ return allAchievements[key] === player.achievements[i];});
        if (!player.achievements.includes(achieveKey)) { // check if new key already exists as well
            player.achievements.push(achieveKey); // if not... add it
        }
      } else if (allAchievements[player.achievements[i]] === undefined){
        toRemove.push(i);
      }
    }


    toRemove.reverse();
    for (var i = 0; i < toRemove.length; i++) {
      player.achievements.splice(toRemove[i], 1);
    }
}

function giveAchievement(name) {

    if (player.achievements.includes(name)){ clearOldAchieves(); }

    if (player.achievements.includes(allAchievementNums[name])) return false

    $.notify(name, "success");
    player.achievements.push((Object.keys(allAchievements).find(key => allAchievements[key] === name)));
    document.getElementById(name).className = "achievementunlocked"
    try {
        kongregate.stats.submit('Achievements', player.achievements.length);
    } catch (err) {console.log("Couldn't load Kongregate API")}
    if (name == "All your IP are belong to us" || name == "MAXIMUM OVERDRIVE") {
        player.infMult = player.infMult.times(4);
        player.autoIP = player.autoIP.times(4);
        if (player.autoCrunchMode == "amount") player.autobuyers[11].priority = player.autobuyers[11].priority.times(4);
    }
    updateAchievements();
}

var TIER_NAMES = [ null, "first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eight" ];
var DISPLAY_NAMES = [ null, "First", "Second", "Third", "Fourth", "Fifth", "Sixth", "Seventh", "Eighth" ];

function canAfford(cost) {
    return ((cost.lt(new Decimal("1.79e308")) && !player.break) || player.break) && cost.lte(player.money);
}



function multiplySameCosts(cost) {
    var tiers = [ null, "first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eight" ];
    var tierCosts = [ null, new Decimal(1e3), new Decimal(1e4), new Decimal(1e5), new Decimal(1e6), new Decimal(1e8), new Decimal(1e10), new Decimal(1e12), new Decimal(1e15) ];

    for (let i = 1; i <= 8; ++i) {
        if (player[tiers[i] + "Cost"].e == cost.e) player[tiers[i] + "Cost"] = player[tiers[i] + "Cost"].times(tierCosts[i])

    }
    if (player.tickSpeedCost.e == cost.e) player.tickSpeedCost = player.tickSpeedCost.times(player.tickspeedMultiplier)
    }


function multiplyPC5Costs(cost, tier) {
    var tiers = [ null, "first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eight" ];

    if (tier < 5) {
        for (var i = 1; i<9; i++) {
            if (player[tiers[i] + "Cost"].e <= cost.e) {
                player[tiers[i] + "Cost"] = player[tiers[i] + "Cost"].times(player.costMultipliers[i-1])
                if (player[tiers[i] + "Cost"].gte(Number.MAX_VALUE)) player.costMultipliers[i-1] = player.costMultipliers[i-1].times(10)
            }
        }
    } else {
        for (var i = 1; i<9; i++) {
            if (player[tiers[i] + "Cost"].e >= cost.e) {
                player[tiers[i] + "Cost"] = player[tiers[i] + "Cost"].times(player.costMultipliers[i-1])
               if (player[tiers[i] + "Cost"].gte(Number.MAX_VALUE)) player.costMultipliers[i-1] = player.costMultipliers[i-1].times(10)
            }
        }
    }
}


function canBuyDimension(tier) {
    if (tier == 9 ) {
        if (player.secondAmount.equals(0)) return false
        else return true
    }

    if (!player.break && player.money.gt(Number.MAX_VALUE)) return false;
    if (tier > player.resets + 4) return false;
    if (tier > 1 && player[TIER_NAMES[tier - 1] + 'Amount'] == 0 && player.eternities < 30) return false;
    if ((player.currentChallenge == "challenge4" || player.currentChallenge == "postc1") && tier >= 7) return false

    return true;
}

function getDimensionPowerMultiplier(tier) {
    let dimMult = 2;


    if (player.currentChallenge == "challenge9" || player.currentChallenge == "postc1") dimMult = Math.pow(10/0.30,Math.random())*0.30

    if (player.infinityUpgrades.includes('dimMult')) dimMult *= 1.1;
    if (player.achievements.includes("r58")) dimMult *= 1.01;
    dimMult += ECTimesCompleted("eterc3") * 0.8
    return dimMult;
}


function clearDimensions(amount) {
	var tiers = [ null, "first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eight" ];

    for (i = 1; i <= amount; i++) {
        player[tiers[i] + "Amount"] = new Decimal(0)
    }
}


function getDimensionCostMultiplier(tier) {

	var multiplier2 = [new Decimal(1e3),new Decimal(5e3),new Decimal(1e4),new Decimal(1.2e4),new Decimal(1.8e4),new Decimal(2.6e4),new Decimal(3.2e4),new Decimal(4.2e4)];
    if (player.currentChallenge == "challenge10") return multiplier2[tier - 1];
    else return player.costMultipliers[tier - 1];
}

function onBuyDimension(tier) {
    if (!player.break) {
        switch (tier) {
            case 1: giveAchievement("You gotta start somewhere"); break;
            case 2: giveAchievement("100 antimatter is a lot"); break;
            case 3: giveAchievement("Half life 3 confirmed"); break;
            case 4: giveAchievement("L4D: Left 4 Dimensions"); break;
            case 5: giveAchievement("5 Dimension Antimatter Punch"); break;
            case 6: giveAchievement("We couldn't afford 9"); break;
            case 7: giveAchievement("Not a luck related achievement"); break;
            case 8: giveAchievement("90 degrees to infinity"); break;
        }
    }

    if (player.eightAmount.round().eq(99)) {
        giveAchievement("The 9th Dimension is a lie");
    }

    player.postC4Tier = tier;
    postc8Mult = new Decimal(1)
    if (tier != 8) player.dimlife = false
    if (tier != 1) player.dead = false


}

function dimBought(tier) {
    return player[TIER_NAMES[tier]+"Bought"] % 10;
}

function buyOneDimension(tier) {
    var name = TIER_NAMES[tier];
    var cost = player[name + 'Cost'];
    auto = false;

    if (player.currentChallenge != "challenge10" && player.currentChallenge != "postc1") {
        if (!canBuyDimension(tier)) {
            return false;
        }
    } else {
        if (tier >= 3) {
            if (player[TIER_NAMES[tier-2] + 'Amount'].lt(cost)) return false
        }
        else if (!canBuyDimension(tier)) {
            return false;
        } else if (tier < 3 && !canAfford(cost)){
            return false;
        }
    }



    if (player.currentChallenge != "challenge10" && player.currentChallenge != "postc1") {
        if (!canAfford(cost)) {
            return false;
        }
    }


    if ((player.currentChallenge != "challenge10" && player.currentChallenge != "postc1") || tier < 3) {
        player.money = player.money.minus(cost);
    } else {
        player[TIER_NAMES[tier-2] + 'Amount'] = player[TIER_NAMES[tier-2] + 'Amount'].minus(cost)
    }

    player[name + 'Amount'] = player[name + 'Amount'].plus(1);
    player[name + 'Bought']++;

    if (dimBought(tier) === 0) {
        player[name + 'Pow']  = player[name + 'Pow'].times(getDimensionPowerMultiplier(tier));
        if (player.currentChallenge != "challenge5" && player.currentChallenge != "postc5") player[name + 'Cost'] = player[name + 'Cost'].times(getDimensionCostMultiplier(tier));
        else if (player.currentChallenge == "postc5") multiplyPC5Costs(player[name + 'Cost'], tier)
        else multiplySameCosts(cost);
        if (player[name + 'Cost'].gte(Number.MAX_VALUE)) player.costMultipliers[tier-1] = player.costMultipliers[tier-1].times(player.dimensionMultDecrease)

    }

    if (player.currentChallenge == "challenge2" || player.currentChallenge == "postc1") player.chall2Pow = 0;
    if (player.currentChallenge == "challenge8" || player.currentChallenge == "postc1") clearDimensions(tier-1);

    onBuyDimension(tier);


    return true;
}

function buyManyDimension(tier) {
    var name = TIER_NAMES[tier];
    var cost = player[name + 'Cost'].times(10 - dimBought(tier));
    
    auto = false;

    if ((player.currentChallenge == "challenge12" || player.currentChallenge == "postc1" || player.currentChallenge == "postc6") && player.matter.equals(0)) player.matter = new Decimal(1);
    if (player.currentChallenge != "challenge10" && player.currentChallenge != "postc1") {
        if (!canBuyDimension(tier)) {
            return false;
        }
    } else {
        if (tier >= 3) {
            if (!canBuyDimension(tier)) return false
            if (player[TIER_NAMES[tier-2] + 'Amount'].lt(cost)) return false
        }
        else if (!canBuyDimension(tier)) {
            return false;
        } else if (tier < 3 && !canAfford(cost)){
            return false;
        }
    }



    if (player.currentChallenge != "challenge10" && player.currentChallenge != "postc1") {
        if (!canAfford(cost)) {
            return false;
        }
    }

    if ((player.currentChallenge != "challenge10" && player.currentChallenge != "postc1") || tier < 3) {
        player.money = player.money.minus(cost);
    } else {
        player[TIER_NAMES[tier-2] + 'Amount'] = player[TIER_NAMES[tier-2] + 'Amount'].minus(cost)
    }

    player[name + 'Amount'] = player[name + 'Amount'].plus(10 - dimBought(tier));
    player[name + 'Bought'] = player[name + 'Bought'] + (10 - dimBought(tier));
    player[name + 'Pow']  = player[name + 'Pow'].times(getDimensionPowerMultiplier(tier));
    if (player.currentChallenge != "challenge5" && player.currentChallenge != "postc5" ) player[name + 'Cost'] = player[name + 'Cost'].times((getDimensionCostMultiplier(tier)));
    else if (player.currentChallenge == "postc5") multiplyPC5Costs(player[name + 'Cost'], tier)
    else multiplySameCosts(player[name + 'Cost']);
    if (player[name + 'Cost'].gte(Number.MAX_VALUE)) player.costMultipliers[tier-1] = player.costMultipliers[tier-1].times(player.dimensionMultDecrease)
    if (player.currentChallenge == "challenge2" || player.currentChallenge == "postc1") player.chall2Pow = 0;
    if (player.currentChallenge == "challenge8" || player.currentChallenge == "postc1") clearDimensions(tier-1);

    onBuyDimension(tier);

    return true;
}


const initCost = [null, new Decimal(10), new Decimal(1e2), new Decimal(1e4), new Decimal(1e6), new Decimal(1e9), new Decimal(1e12), new Decimal(1e18), new Decimal(1e24)]
const costMults = [null, new Decimal(1e3), new Decimal(1e4), new Decimal(1e5), new Decimal(1e6), new Decimal(1e8), new Decimal(1e10), new Decimal(1e12), new Decimal(1e15)]
function buyManyDimensionAutobuyer(tier, bulk) {

        var name = TIER_NAMES[tier];
        var cost = player[name + 'Cost'].times(10 - dimBought(tier))
        if (!player.break && player.money.gt(Number.MAX_VALUE)) return false;
        
        if (tier >= 3 && (player.currentChallenge == "challenge10" || player.currentChallenge == "postc1")) {
            if (!canBuyDimension(tier)) return false
            if (player[TIER_NAMES[tier-2] + 'Amount'].lt(cost)) return false
                if (canBuyDimension(tier)) {
                    if (cost.lt(player[TIER_NAMES[tier-2]+"Amount"]) && dimBought(tier) != 0) {
                        player[TIER_NAMES[tier-2]+"Amount"] = player[TIER_NAMES[tier-2]+"Amount"].minus(cost)
                        player[name + "Amount"] = Decimal.round(player[name + "Amount"].plus(10 - dimBought(tier)))
                        player[name + 'Bought'] += (10 - dimBought(tier));
                        player[name + 'Pow']  = player[name + 'Pow'].times(getDimensionPowerMultiplier(tier))
                        player[name + "Cost"] = player[name + "Cost"].times(getDimensionCostMultiplier(tier))
                    }
                    var x = bulk
                    while (player[TIER_NAMES[tier-2]+"Amount"].gt(player[name + "Cost"].times(10)) && x > 0) {
                        player[TIER_NAMES[tier-2]+"Amount"] = player[TIER_NAMES[tier-2]+"Amount"].minus(player[name + "Cost"].times(10))
                        player[name + "Cost"] = player[name + "Cost"].times(getDimensionCostMultiplier(tier))
                        player[name + "Amount"] = Decimal.round(player[name + "Amount"].plus(10))
                        player[name + 'Bought'] += 10
                        player[name + "Pow"] = player[name + "Pow"].times(getDimensionPowerMultiplier(tier))
                        if (player[name + 'Cost'].gte(Number.MAX_VALUE)) player.costMultipliers[tier-1] = player.costMultipliers[tier-1].times(player.dimensionMultDecrease)
                        x--;
                    }


                    onBuyDimension(tier);
                }
        } else {
        if (!canBuyDimension(tier)) return false
            if (cost.lt(player.money) && dimBought(tier) != 0) {
                player.money = player.money.minus(cost)
                player[name + "Amount"] = Decimal.round(player[name + "Amount"].plus(10 - dimBought(tier)))
                player[name + 'Bought'] += (10 - dimBought(tier));
                player[name + 'Pow']  = player[name + 'Pow'].times(getDimensionPowerMultiplier(tier))
                player[name + "Cost"] = player[name + "Cost"].times(getDimensionCostMultiplier(tier))
            }
            if (player.money.lt(player[name + "Cost"].times(10))) return false
            var x = bulk

        if ((player.dimensionMultDecrease > 3 || player.currentChallenge == "postc5" || player.currentChallenge == "challenge5")) {
            while (player.money.gte(player[name + "Cost"].times(10)) && x > 0) {
                    player.money = player.money.minus(player[name + "Cost"].times(10))
                    if (player.currentChallenge != "challenge5" && player.currentChallenge != "postc5") player[name + "Cost"] = player[name + "Cost"].times(getDimensionCostMultiplier(tier))
                    else if (player.currentChallenge == "postc5") multiplyPC5Costs(player[name + 'Cost'], tier)
                    else multiplySameCosts(player[name + 'Cost'])
                    player[name + "Amount"] = Decimal.round(player[name + "Amount"].plus(10))
                    player[name + 'Bought'] += 10
                    player[name + "Pow"] = player[name + "Pow"].times(getDimensionPowerMultiplier(tier))
                    if (player[name + 'Cost'].gte(Number.MAX_VALUE)) player.costMultipliers[tier-1] = player.costMultipliers[tier-1].times(player.dimensionMultDecrease)
                    if (player.currentChallenge == "challenge8") clearDimensions(tier-1)
                    x--;
            }
        } else {
            if (player[name + "Cost"].lt(Number.MAX_VALUE)) {
                let failsafe = 0
                while (player.money.gt(player[name + "Cost"].times(10)) && x > 0 && player[name + "Cost"].lte(Number.MAX_VALUE) && failsafe < 150) {
                    player.money = player.money.minus(player[name + "Cost"].times(10))
                    if (player.currentChallenge != "challenge5" && player.currentChallenge != "postc5") player[name + "Cost"] = player[name + "Cost"].times(getDimensionCostMultiplier(tier))
                    else if (player.currentChallenge == "postc5") multiplyPC5Costs(player[name + 'Cost'], tier)
                    else multiplySameCosts(player[name + 'Cost'])
                    player[name + "Amount"] = Decimal.round(player[name + "Amount"].plus(10))
                    player[name + 'Bought'] += 10
                    player[name + "Pow"] = player[name + "Pow"].times(getDimensionPowerMultiplier(tier))
                    if (player[name + 'Cost'].gte(Number.MAX_VALUE)) player.costMultipliers[tier-1] = player.costMultipliers[tier-1].times(player.dimensionMultDecrease)
                    if (player.currentChallenge == "challenge8") clearDimensions(tier-1)
                    x--;
                    failsafe++;
                }
            }
            if (player[name + "Cost"].gte(Number.MAX_VALUE)) {
                var a = Math.log10(Math.sqrt(player.dimensionMultDecrease))
                var b = player.costMultipliers[tier-1].dividedBy(Math.sqrt(player.dimensionMultDecrease)).log10()
                var c = player[name + "Cost"].dividedBy(player.money).log10()
                var discriminant = Math.pow(b, 2) - (c *a* 4)
                if (discriminant < 0) return false
                var buying = Math.floor((Math.sqrt(Math.pow(b, 2) - (c *a *4))-b)/(2 * a))+1
                if (buying <= 0) return false
                if (buying > bulk) buying = bulk
                player[name+"Amount"] = Decimal.round(player[name+"Amount"].plus(10*buying))
                preInfBuy = Math.floor(1 + (308 - initCost[tier].log10()) / costMults[tier].log10())
                postInfBuy = player[name + 'Bought']/10+buying - preInfBuy - 1
                postInfInitCost = initCost[tier].times(Decimal.pow(costMults[tier], preInfBuy))
                player[name + 'Bought'] += 10*buying
                player[name + "Pow"] = player[name + "Pow"].times(Decimal.pow(getDimensionPowerMultiplier(tier), buying))
                
                newCost = postInfInitCost.times(Decimal.pow(costMults[tier], postInfBuy)).times(Decimal.pow(player.dimensionMultDecrease, postInfBuy * (postInfBuy+1)/2))
                newMult = costMults[tier].times(Decimal.pow(player.dimensionMultDecrease, postInfBuy+1))
                //if (buying > 0 )player[name + "Cost"] = player.costMultipliers[tier-1].times(Decimal.pow(player.dimensionMultDecrease, (buying * buying - buying)/2)).times(player[name + "Cost"])
                
                player[name + "Cost"] = newCost
                player.costMultipliers[tier-1] = newMult
                if (player.money.gte(player[name + "Cost"])) player.money = player.money.minus(player[name + "Cost"])
                player[name + "Cost"] = player[name + "Cost"].times(player.costMultipliers[tier-1])
                player.costMultipliers[tier-1] = player.costMultipliers[tier-1].times(player.dimensionMultDecrease)
            }
        }




           /*
            // this part is if cost is less than 1e308
            if (player[name+"Cost"].times(10).lt(Number.MAX_VALUE)) {
                var toBuy = Math.ceil((Math.min(308.1, player.money.e-player[name+"Cost"].e) - player[name+"Cost"].e+1) / getDimensionCostMultiplier(tier).e)
                if (bulk < toBuy) toBuy = bulk
                player[name+"Amount"] = player[name+"Amount"].plus(10*toBuy)
                player[name + "Pow"] = player[name + "Pow"].times(Decimal.pow(getDimensionPowerMultiplier(tier), toBuy))
                player[name + "Cost"] = player[name + "Cost"].times(Decimal.pow(getDimensionCostMultiplier(tier), toBuy-1))
                player.money = player.money.minus(player[name + "Cost"].times(10))
                player[name + "Cost"] = player[name + "Cost"].times(getDimensionCostMultiplier(tier))
                if (toBuy > 0 && player.currentChallenge == "challenge8") clearDimensions(tier-1)
            }

            // quadratic formula
            var a = Math.log10(Math.sqrt(player.dimensionMultDecrease))
            var b = player.costMultipliers[tier-1].dividedBy(Math.sqrt(player.dimensionMultDecrease)).log10()
            var c = player[name + "Cost"].dividedBy(player.money).log10()
            var discriminant = Math.pow(b, 2) - (c *a* 4)
            if (discriminant < 0) return false
            var buying = Math.floor((Math.sqrt(Math.pow(b, 2) - (c *a *4))-b)/(2 * a))
            if (buying <= 0) return false
            //console.log("buying = "+buying)
            if (bulk < buying) buying = bulk
            //console.log("CM = "+player.costMultipliers[tier-1].toString() + " Clog = "+player[name + "Cost"].log10())
            var costAfter = Decimal.pow(10, (new Decimal(player.costMultipliers[tier-1].log10()).times(buying).plus((Math.log10(player.dimensionMultDecrease) * (buying) * (buying) + buying)/2).minus(player[name + "Cost"].log10())))
            if (costAfter < 1) return false
            //console.log("costafter = "+costAfter.toString())
            player[name + "Cost"] = costAfter
            player.costMultipliers[tier-1] = player.costMultipliers[tier-1].times(Decimal.pow(player.dimensionMultDecrease, buying))
            //console.log("Player money "+player.money.toString()+" minus "+ costAfter.toString())
            if (buying !== 0) player.money = player.money.minus(player[name + "Cost"].times(10))
            player[name+"Amount"] = player[name+"Amount"].plus(10*buying)
            player[name + "Pow"] = player[name + "Pow"].times(Decimal.pow(getDimensionPowerMultiplier(tier), buying))
            if (buying > 0 && player.currentChallenge == "challenge8") clearDimensions(tier-1)

            buyManyDimension(tier)
            */
                
            


        }
        if ((player.currentChallenge == "challenge12" || player.currentChallenge == "postc1" || player.currentChallenge == "postc6") && player.matter.equals(0)) player.matter = new Decimal(1);
        if (player.currentChallenge == "challenge2" || player.currentChallenge == "postc1") player.chall2Pow = 0;
        if (player.currentChallenge == "postc1") clearDimensions(tier-1);
        player.postC4Tier = tier;
        if (tier != 8) player.dimlife = false
        if (tier != 1) player.dead = false
}












function toggleChallengeRetry() {
    if (player.options.retryChallenge) {
        player.options.retryChallenge = false
        document.getElementById("retry").innerHTML = "Automatically retry challenges OFF"
    } else {
        player.options.retryChallenge = true
        document.getElementById("retry").innerHTML = "Automatically retry challenges ON"
    }
}




document.getElementById("first").onclick = function () {
    if (buyOneDimension(1)) {
        // This achievement is granted only if the buy one button is pressed.
        if (player.firstAmount >= 1e150) {
            giveAchievement("There's no point in doing that");
        }
        if ((player.currentChallenge == "challenge12" || player.currentChallenge == "postc1") && player.matter.equals(0)) player.matter = new Decimal(1);
    }
    if (player.firstAmount.lt(1)) {
        player.money = new Decimal("0")
        player.firstAmount = player.firstAmount.plus(1);
        player.firstBought += 1;
        giveAchievement("You gotta start somewhere");
    }
};



function glowText(id) {
  var text = document.getElementById(id);
  text.style.setProperty("-webkit-animation", "glow 1s");
  text.style.setProperty("animation", "glow 1s");
}



document.getElementById("second").onclick = function () {
    buyOneDimension(2);
    if ((player.currentChallenge == "challenge12" || player.currentChallenge == "postc1" || player.currentChallenge == "postc6") && player.matter.equals(0)) player.matter = new Decimal(1);
};

document.getElementById("third").onclick = function () {
    buyOneDimension(3);
    if ((player.currentChallenge == "challenge12" || player.currentChallenge == "postc1" || player.currentChallenge == "postc6") && player.matter.equals(0))player.matter = new Decimal(1);
};

document.getElementById("fourth").onclick = function () {
    buyOneDimension(4);
    if ((player.currentChallenge == "challenge12" || player.currentChallenge == "postc1" || player.currentChallenge == "postc6") && player.matter.equals(0)) player.matter = new Decimal(1);
};

document.getElementById("fifth").onclick = function () {
    buyOneDimension(5);
};

document.getElementById("sixth").onclick = function () {
    buyOneDimension(6);
};

document.getElementById("seventh").onclick = function () {
    buyOneDimension(7);
};

document.getElementById("eight").onclick = function () {
    buyOneDimension(8);
};

document.getElementById("firstMax").onclick = function () {
    buyManyDimension(1);
    if ((player.currentChallenge == "challenge12" || player.currentChallenge == "postc1") && player.matter.equals(0)) player.matter = new Decimal(1);
};

document.getElementById("secondMax").onclick = function () {
    buyManyDimension(2);
    if ((player.currentChallenge == "challenge12" || player.currentChallenge == "postc1") && player.matter.equals(0)) player.matter = new Decimal(1);
};

document.getElementById("thirdMax").onclick = function () {
    buyManyDimension(3);
};

document.getElementById("fourthMax").onclick = function () {
    buyManyDimension(4);
};

document.getElementById("fifthMax").onclick = function () {
    buyManyDimension(5);
};

document.getElementById("sixthMax").onclick = function () {
    buyManyDimension(6);
};

document.getElementById("seventhMax").onclick = function () {
    buyManyDimension(7);
};

document.getElementById("eightMax").onclick = function () {
    buyManyDimension(8);
};

document.getElementById("softReset").onclick = function () {
  auto = false;
  var name = TIER_NAMES[getShiftRequirement(0).tier]
  if (player[name + "Amount"] >= getShiftRequirement(0).amount) {
      if (player.infinityUpgrades.includes("bulkBoost") && player.eternities >= 10) maxBuyDimBoosts(true);
      else softReset(1)
  }
};

document.getElementById("maxall").onclick = function () {
    if (!player.break && player.money.gt(Number.MAX_VALUE)) return false;
    buyMaxTickSpeed();

    for (var tier=1; tier<9;tier++) {
        var name = TIER_NAMES[tier];
        var cost = player[name + 'Cost'].times(10 - dimBought(tier))
        if (tier >= 3 && (player.currentChallenge == "challenge10" || player.currentChallenge == "postc1")) {
            if (!canBuyDimension(tier)) continue
            if (player[TIER_NAMES[tier-2] + 'Amount'].lt(cost)) continue
                if (canBuyDimension(tier)) {
                    if (cost.lt(player[TIER_NAMES[tier-2]+"Amount"]) && dimBought(tier) != 0) {
                        player[TIER_NAMES[tier-2]+"Amount"] = player[TIER_NAMES[tier-2]+"Amount"].minus(cost)
                        player[name + "Amount"] = Decimal.round(player[name + "Amount"].plus(10 - dimBought(tier)))
                        player[name + 'Bought'] += (10 - dimBought(tier));
                        player[name + 'Pow']  = player[name + 'Pow'].times(getDimensionPowerMultiplier(tier))
                        player[name + "Cost"] = player[name + "Cost"].times(getDimensionCostMultiplier(tier))
                    }
                    while (player[TIER_NAMES[tier-2]+"Amount"].gt(player[name + "Cost"].times(10))) {
                        player[TIER_NAMES[tier-2]+"Amount"] = player[TIER_NAMES[tier-2]+"Amount"].minus(player[name + "Cost"].times(10))
                        player[name + "Cost"] = player[name + "Cost"].times(getDimensionCostMultiplier(tier))
                        player[name + "Amount"] = Decimal.round(player[name + "Amount"].plus(10))
                        player[name + 'Bought'] += 10
                        player[name + "Pow"] = player[name + "Pow"].times(getDimensionPowerMultiplier(tier))
                        if (player[name + 'Cost'].gte(Number.MAX_VALUE)) player.costMultipliers[tier-1] = player.costMultipliers[tier-1].times(player.dimensionMultDecrease)
                    }


                    onBuyDimension(tier);
                }
        } else {
        if (!canBuyDimension(tier)) continue
            if (cost.lt(player.money) && dimBought(tier) != 0) {
                player.money = player.money.minus(cost)
                player[name + "Amount"] = Decimal.round(player[name + "Amount"].plus(10 - dimBought(tier)))
                player[name + 'Bought'] += (10 - dimBought(tier));
                player[name + 'Pow']  = player[name + 'Pow'].times(getDimensionPowerMultiplier(tier))
                player[name + "Cost"] = player[name + "Cost"].times(getDimensionCostMultiplier(tier))
            }
            if (player.money.lt(player[name + "Cost"].times(10))) continue

            if ((player.dimensionMultDecrease > 3 || player.currentChallenge == "postc5" || player.currentChallenge == "challenge5")) {
                while (player.money.gte(player[name + "Cost"].times(10))) {
                        player.money = player.money.minus(player[name + "Cost"].times(10))
                        if (player.currentChallenge != "challenge5" && player.currentChallenge != "postc5") player[name + "Cost"] = player[name + "Cost"].times(getDimensionCostMultiplier(tier))
                        else if (player.currentChallenge == "postc5") multiplyPC5Costs(player[name + 'Cost'], tier)
                        else multiplySameCosts(player[name + 'Cost'])
                        player[name + "Amount"] = Decimal.round(player[name + "Amount"].plus(10))
                        player[name + 'Bought'] += 10
                        player[name + "Pow"] = player[name + "Pow"].times(getDimensionPowerMultiplier(tier))
                        if (player[name + 'Cost'].gte(Number.MAX_VALUE)) player.costMultipliers[tier-1] = player.costMultipliers[tier-1].times(player.dimensionMultDecrease)
                        if (player.currentChallenge == "challenge8") clearDimensions(tier-1)
                }
            } else {
                if (player[name + "Cost"].lt(Number.MAX_VALUE)) {
                    while (player.money.gte(player[name + "Cost"].times(10)) && player[name + "Cost"].lte(Number.MAX_VALUE)) {
                        player.money = player.money.minus(player[name + "Cost"].times(10))
                        if (player.currentChallenge != "challenge5" && player.currentChallenge != "postc5") player[name + "Cost"] = player[name + "Cost"].times(getDimensionCostMultiplier(tier))
                        else if (player.currentChallenge == "postc5") multiplyPC5Costs(player[name + 'Cost'], tier)
                        else multiplySameCosts(player[name + 'Cost'])
                        player[name + "Amount"] = Decimal.round(player[name + "Amount"].plus(10))
                        player[name + 'Bought'] += 10
                        player[name + "Pow"] = player[name + "Pow"].times(getDimensionPowerMultiplier(tier))
                        if (player[name + 'Cost'].gte(Number.MAX_VALUE)) player.costMultipliers[tier-1] = player.costMultipliers[tier-1].times(player.dimensionMultDecrease)
                        if (player.currentChallenge == "challenge8") clearDimensions(tier-1)
                }
                }

                if (player[name + "Cost"].gte(Number.MAX_VALUE)) {
                    var a = Math.log10(Math.sqrt(player.dimensionMultDecrease))
                    var b = player.costMultipliers[tier-1].dividedBy(Math.sqrt(player.dimensionMultDecrease)).log10()
                    var c = player[name + "Cost"].dividedBy(player.money).log10()
                    var discriminant = Math.pow(b, 2) - (c *a* 4)
                    if (discriminant < 0) continue
                    var buying = Math.floor((Math.sqrt(Math.pow(b, 2) - (c *a *4))-b)/(2 * a))+1
                    if (buying <= 0) return false
                    player[name+"Amount"] = Decimal.round(player[name+"Amount"].plus(10*buying))
                    preInfBuy = Math.floor(1 + (308 - initCost[tier].log10()) / costMults[tier].log10())
                    postInfBuy = player[name + 'Bought']/10+buying - preInfBuy - 1
                    postInfInitCost = initCost[tier].times(Decimal.pow(costMults[tier], preInfBuy))
                    player[name + 'Bought'] += 10*buying
                    player[name + "Pow"] = player[name + "Pow"].times(Decimal.pow(getDimensionPowerMultiplier(tier), buying))
                    
                    newCost = postInfInitCost.times(Decimal.pow(costMults[tier], postInfBuy)).times(Decimal.pow(player.dimensionMultDecrease, postInfBuy * (postInfBuy+1)/2))
                    newMult = costMults[tier].times(Decimal.pow(player.dimensionMultDecrease, postInfBuy+1))
                    //if (buying > 0 )player[name + "Cost"] = player.costMultipliers[tier-1].times(Decimal.pow(player.dimensionMultDecrease, (buying * buying - buying)/2)).times(player[name + "Cost"])
                    
                    player[name + "Cost"] = newCost
                    player.costMultipliers[tier-1] = newMult
                    if (player.money.gte(player[name + "Cost"]))player.money = player.money.minus(player[name + "Cost"])
                    player[name + "Cost"] = player[name + "Cost"].times(player.costMultipliers[tier-1])
                    player.costMultipliers[tier-1] = player.costMultipliers[tier-1].times(player.dimensionMultDecrease)
                }

                
        }
        }
        if ((player.currentChallenge == "challenge12" || player.currentChallenge == "postc1" || player.currentChallenge == "postc6") && player.matter.equals(0)) player.matter = new Decimal(1);
        if (player.currentChallenge == "challenge2" || player.currentChallenge == "postc1") player.chall2Pow = 0;
        if (player.currentChallenge == "postc1") clearDimensions(tier-1);
        player.postC4Tier = tier;
        onBuyDimension(tier)
    }
}




document.getElementById("challengeconfirmation").onclick = function () {
    if (!player.options.challConf) {
        player.options.challConf = true;
        document.getElementById("challengeconfirmation").innerHTML = "Challenge confirmation OFF"
    } else {
        player.options.challConf = false;
        document.getElementById("challengeconfirmation").innerHTML = "Challenge confirmation ON"
    }
}




function buyInfinityUpgrade(name, cost) {
    if (player.infinityPoints.gte(cost) && !player.infinityUpgrades.includes(name)) {
        player.infinityUpgrades.push(name);
        player.infinityPoints = player.infinityPoints.minus(cost);
        return true
    } else return false
}

document.getElementById("infiMult").onclick = function() {
    if (player.infinityUpgrades.includes("skipResetGalaxy") && player.infinityUpgrades.includes("passiveGen") && player.infinityUpgrades.includes("galaxyBoost") && player.infinityUpgrades.includes("resetBoost") && player.infinityPoints.gte(player.infMultCost)) {
        player.infinityPoints = player.infinityPoints.minus(player.infMultCost)
        player.infMult = player.infMult.times(2);
        player.autoIP = player.autoIP.times(2);
        player.infMultCost = player.infMultCost.times(10)
        document.getElementById("infiMult").innerHTML = "Multiply infinity points from all sources by 2 <br>currently: "+shorten(player.infMult.times(kongIPMult)) +"x<br>Cost: "+shortenCosts(player.infMultCost)+" IP"
        if (player.autobuyers[11].priority !== undefined && player.autobuyers[11].priority !== null && player.autoCrunchMode == "amount") player.autobuyers[11].priority = player.autobuyers[11].priority.times(2);
        if (player.autoCrunchMode == "amount") document.getElementById("priority12").value = player.autobuyers[11].priority
    }
}


function updateEternityUpgrades() {
    document.getElementById("eter1").className = (player.eternityUpgrades.includes(1)) ? "eternityupbtnbought" : (player.eternityPoints.gte(5)) ? "eternityupbtn" : "eternityupbtnlocked"
    document.getElementById("eter2").className = (player.eternityUpgrades.includes(2)) ? "eternityupbtnbought" : (player.eternityPoints.gte(10)) ? "eternityupbtn" : "eternityupbtnlocked"
    document.getElementById("eter3").className = (player.eternityUpgrades.includes(3)) ? "eternityupbtnbought" : (player.eternityPoints.gte(50e3)) ? "eternityupbtn" : "eternityupbtnlocked"
    document.getElementById("eter4").className = (player.eternityUpgrades.includes(4)) ? "eternityupbtnbought" : (player.eternityPoints.gte(1e16)) ? "eternityupbtn" : "eternityupbtnlocked"
    document.getElementById("eter5").className = (player.eternityUpgrades.includes(5)) ? "eternityupbtnbought" : (player.eternityPoints.gte(1e40)) ? "eternityupbtn" : "eternityupbtnlocked"
    document.getElementById("eter6").className = (player.eternityUpgrades.includes(6)) ? "eternityupbtnbought" : (player.eternityPoints.gte(1e50)) ? "eternityupbtn" : "eternityupbtnlocked"
}


function buyEternityUpgrade(name, cost) {
    if (player.eternityPoints.gte(cost) && !player.eternityUpgrades.includes(name)) {
        player.eternityUpgrades.push(name)
        player.eternityPoints = player.eternityPoints.minus(cost)
        updateEternityUpgrades()
    }
}


function buyEPMult() {
    if (player.eternityPoints.gte(player.epmultCost)) {
        player.epmult = player.epmult.times(5)
        player.eternityBuyer.limit = player.eternityBuyer.limit.times(5)
        document.getElementById("priority13").value = player.eternityBuyer.limit
        player.eternityPoints = player.eternityPoints.minus(player.epmultCost)
        let count = Math.log(player.epmult)/Math.log(5)
        player.epmultCost = Decimal.pow(50, count).times(500)
        if (player.epmultCost.gte(new Decimal("1e100"))) player.epmultCost = Decimal.pow(100, count).times(500)
        if (player.epmultCost.gte(Number.MAX_VALUE)) player.epmultCost = Decimal.pow(500, count).times(500)
        document.getElementById("epmult").innerHTML = "You gain 5 times more EP<p>Currently: "+shortenDimensions(player.epmult)+"x<p>Cost: "+shortenDimensions(player.epmultCost)+" EP"
        updateEternityUpgrades()
    }
}

function updateAchievements() {
    var amount = 0
    for (var i=1; i<13; i++) {
        var n = 0
        var achNum = i * 10
        for (var l=0; l<8; l++) {
            achNum += 1;
            var name = allAchievements["r"+achNum]
            if (player.achievements.includes("r"+achNum)) {
                n++
                document.getElementById(name).className = "achievementunlocked"
            } else {
                document.getElementById(name).className = "achievementlocked"
            }
        }
        if (n == 8) {
            amount++
            document.getElementById("achRow"+i).className = "completedrow"
        } else {
            document.getElementById("achRow"+i).className = ""
        }
    }

    player.achPow = Decimal.pow(1.5, amount)

    document.getElementById("achmultlabel").innerHTML = "Current achievement multiplier on each Dimension: " + player.achPow.toFixed(1) + "x"
}



function timeMult() {
    var mult = new Decimal(1)
    if (player.infinityUpgrades.includes("timeMult")) mult = mult.times(Math.pow(player.totalTimePlayed / 1200, 0.15));
    if (player.infinityUpgrades.includes("timeMult2")) mult = mult.times(Decimal.max(Math.pow(player.thisInfinityTime / 2400, 0.25), 1));
    if (player.achievements.includes("r35")) mult = mult.times(Math.pow(player.totalTimePlayed / (600*60*48), 0.05));
    return mult;
}

function dimMults() {
    if (player.timestudy.studies.includes(31)) return Decimal.pow(1 + (getInfinitied() * 0.2), 4)
    else return new Decimal(1 + (getInfinitied() * 0.2))
}

function playerInfinityUpgradesOnEternity() {
    if (player.eternities < 4) player.infinityUpgrades = []
    else if (player.eternities < 20) player.infinityUpgrades = ["timeMult", "dimMult", "timeMult2", "skipReset1", "skipReset2", "unspentBonus", "27Mult", "18Mult", "36Mult", "resetMult", "skipReset3", "passiveGen", "45Mult", "resetBoost", "galaxyBoost", "skipResetGalaxy"]
    else player.infinityUpgrades = player.infinityUpgrades
}



document.getElementById("infi11").onclick = function () {
    buyInfinityUpgrade("timeMult",1);
}

document.getElementById("infi21").onclick = function () {
    buyInfinityUpgrade("dimMult",1);
}

document.getElementById("infi12").onclick = function () {
    if (player.infinityUpgrades.includes("timeMult")) buyInfinityUpgrade("18Mult",1);
}

document.getElementById("infi22").onclick = function () {
    if (player.infinityUpgrades.includes("dimMult")) buyInfinityUpgrade("27Mult",1);
}

document.getElementById("infi13").onclick = function () {
    if (player.infinityUpgrades.includes("18Mult")) buyInfinityUpgrade("36Mult",1);
}
document.getElementById("infi23").onclick = function () {
    if (player.infinityUpgrades.includes("27Mult")) buyInfinityUpgrade("45Mult",1);
}

document.getElementById("infi14").onclick = function () {
    if (player.infinityUpgrades.includes("36Mult")) buyInfinityUpgrade("resetBoost",1);
}

document.getElementById("infi24").onclick = function () {
    if (player.infinityUpgrades.includes("45Mult")) buyInfinityUpgrade("galaxyBoost",2);
}

document.getElementById("infi31").onclick = function() {
    buyInfinityUpgrade("timeMult2",3);
}

document.getElementById("infi32").onclick = function() {
    if (player.infinityUpgrades.includes("timeMult2")) buyInfinityUpgrade("unspentBonus",5);
}

document.getElementById("infi33").onclick = function() {
    if (player.infinityUpgrades.includes("unspentBonus")) buyInfinityUpgrade("resetMult",7);
}

document.getElementById("infi34").onclick = function() {
    if (player.infinityUpgrades.includes("resetMult")) buyInfinityUpgrade("passiveGen",10);
}

document.getElementById("infi41").onclick = function() {
    buyInfinityUpgrade("skipReset1",20);
}

document.getElementById("infi42").onclick = function() {
    if (player.infinityUpgrades.includes("skipReset1")) buyInfinityUpgrade("skipReset2", 40)
}

document.getElementById("infi43").onclick = function() {
    if (player.infinityUpgrades.includes("skipReset2")) buyInfinityUpgrade("skipReset3", 80)
}

document.getElementById("infi44").onclick = function() {
    if (player.infinityUpgrades.includes("skipReset3")) buyInfinityUpgrade("skipResetGalaxy", 500)
}


document.getElementById("postinfi11").onclick = function() {
    buyInfinityUpgrade("totalMult",1e4);
}

document.getElementById("postinfi21").onclick = function() {
    buyInfinityUpgrade("currentMult",5e4);
}

document.getElementById("postinfi31").onclick = function() {
    if (player.infinityPoints.gte(player.tickSpeedMultDecreaseCost) && player.tickSpeedMultDecrease != 2) {
        player.infinityPoints = player.infinityPoints.minus(player.tickSpeedMultDecreaseCost)
        player.tickSpeedMultDecreaseCost *= 5
        player.tickSpeedMultDecrease--;
        document.getElementById("postinfi31").innerHTML = "Tickspeed cost multiplier increase <br>"+player.tickSpeedMultDecrease+"x -> "+(player.tickSpeedMultDecrease-1)+"x<br>Cost: "+shortenCosts(player.tickSpeedMultDecreaseCost) +" IP"
        if (player.tickSpeedMultDecrease == 2) document.getElementById("postinfi31").innerHTML = "Tickspeed cost multiplier increase <br>"+player.tickSpeedMultDecrease+"x"
    }
}

document.getElementById("postinfi41").onclick = function() {
    buyInfinityUpgrade("postGalaxy",5e11);
}

document.getElementById("postinfi12").onclick = function() {
    buyInfinityUpgrade("infinitiedMult",1e5);
}

document.getElementById("postinfi22").onclick = function() {
    buyInfinityUpgrade("achievementMult",1e6);
}

document.getElementById("postinfi32").onclick = function() {
    buyInfinityUpgrade("challengeMult",1e7);
}

document.getElementById("postinfi42").onclick = function() {
    if (player.infinityPoints.gte(player.dimensionMultDecreaseCost) && player.dimensionMultDecrease > 3) {
        player.infinityPoints = player.infinityPoints.minus(player.dimensionMultDecreaseCost)
        player.dimensionMultDecreaseCost *= 5000
        player.dimensionMultDecrease--;
        document.getElementById("postinfi42").innerHTML = "Dimension cost multiplier increase <br>"+player.dimensionMultDecrease+"x -> "+(player.dimensionMultDecrease-1)+"x<br>Cost: "+shortenCosts(player.dimensionMultDecreaseCost) +" IP"
        if (player.dimensionMultDecrease <= 3) document.getElementById("postinfi42").innerHTML = "Dimension cost multiplier increase <br>"+player.dimensionMultDecrease.toFixed(1)+"x"
    }
}

document.getElementById("offlineProd").onclick = function() {
    if (player.infinityPoints.gte(player.offlineProdCost) && player.offlineProd < 50) {
        player.infinityPoints = player.infinityPoints.minus(player.offlineProdCost)
        player.offlineProdCost *= 10
        player.offlineProd += 5

    }
}


function updateInfCosts() {
    var places = Math.floor(Math.log10(player.replicanti.interval/1000)) * (-1)
    if (player.replicanti.chance < 1) document.getElementById("replicantichance").innerHTML = "Replicate chance: "+Math.round(player.replicanti.chance*100)+"%<br>+"+1+"% Costs: "+shortenCosts(player.replicanti.chanceCost)+" IP"
    else document.getElementById("replicantichance").innerHTML = "Replicate chance: "+Math.round(player.replicanti.chance*100)+"%"
    if (player.timestudy.studies.includes(131)) document.getElementById("replicantimax").innerHTML = "Max Replicanti galaxies: "+player.replicanti.gal+"+"+Math.floor(player.replicanti.gal / 2)+"<br>+1 Costs: "+shortenCosts(player.replicanti.galCost)+" IP"
    else document.getElementById("replicantimax").innerHTML = "Max Replicanti galaxies: "+player.replicanti.gal+"<br>+1 Costs: "+shortenCosts(player.replicanti.galCost)+" IP"
    document.getElementById("replicantiunlock").innerHTML = "Unlock Replicantis<br>Cost: "+shortenCosts(1e140)+" IP"
    document.getElementById("replicantireset").innerHTML = (player.replicanti.galaxies !== 1) ? "Reset replicanti amount, but get a free galaxy<br>"+player.replicanti.galaxies + " replicated galaxies created." : "Reset replicanti amount, but get a free galaxy<br>"+player.replicanti.galaxies + " replicated galaxy created."


    document.getElementById("replicantichance").className = (player.infinityPoints.gte(player.replicanti.chanceCost) && player.replicanti.chance < 1) ? "storebtn" : "unavailablebtn"
    document.getElementById("replicantiinterval").className = (player.infinityPoints.gte(player.replicanti.intervalCost) && ((player.replicanti.interval !== 50) || player.timestudy.studies.includes(22)) && (player.replicanti.interval !== 1)) ? "storebtn" : "unavailablebtn"
    document.getElementById("replicantimax").className = (player.infinityPoints.gte(player.replicanti.galCost)) ? "storebtn" : "unavailablebtn"
    document.getElementById("replicantireset").className = ((player.replicanti.galaxies < player.replicanti.gal && player.replicanti.amount.gte(Number.MAX_VALUE)) || (player.replicanti.galaxies < Math.floor(player.replicanti.gal * 1.5) && player.replicanti.amount.gte(Number.MAX_VALUE) && player.timestudy.studies.includes(131))) ? "storebtn" : "unavailablebtn"
    document.getElementById("replicantiunlock").className = (player.infinityPoints.gte(1e140)) ? "storebtn" : "unavailablebtn"

    document.getElementById("142").innerHTML = "You gain "+shortenCosts(1e25)+"x more IP<span>Cost: 4 Time Theorems"
    document.getElementById("161").innerHTML = shortenCosts(new Decimal("1e616"))+"x multiplier on all normal dimensions<span>Cost: 7 Time Theorems"
    document.getElementById("162").innerHTML = shortenCosts(1e11)+"x multiplier on all Infinity dimensions<span>Cost: 7 Time Theorems"
    document.getElementById("151").innerHTML = shortenCosts(1e4)+"x multiplier on all Time dimensions<span>Cost: 8 Time Theorems"


    document.getElementById("infiMult").innerHTML = "Multiply infinity points from all sources by 2 <br>currently: "+shorten(player.infMult.times(kongIPMult)) +"x<br>Cost: "+shortenCosts(player.infMultCost)+" IP"
    if (player.etercreq !== 1) document.getElementById("ec1unl").innerHTML = "Eternity Challenge 1<span>Requirement: "+(ECTimesCompleted("eterc1")+1)*25000+" Eternities<span>Cost: 30 Time Theorems"
    else document.getElementById("ec1unl").innerHTML = "Eternity Challenge 1<span>Cost: 30 Time Theorems"
    if (player.etercreq !== 2) document.getElementById("ec2unl").innerHTML = "Eternity Challenge 2<span>Requirement: "+(1300+(ECTimesCompleted("eterc2")*150))+" Tickspeed upgrades gained from time dimensions<span>Cost: 35 Time Theorems"
    else document.getElementById("ec2unl").innerHTML = "Eternity Challenge 2<span>Cost: 35 Time Theorems"
    if (player.etercreq !== 3) document.getElementById("ec3unl").innerHTML = "Eternity Challenge 3<span>Requirement: "+(17300+(ECTimesCompleted("eterc3")*1250))+" 8th dimensions<span>Cost: 40 Time Theorems"
    else document.getElementById("ec3unl").innerHTML = "Eternity Challenge 3<span>Cost: 40 Time Theorems"
    if (player.etercreq !== 4) document.getElementById("ec4unl").innerHTML = "Eternity Challenge 4<span>Requirement: "+(1e8 + (ECTimesCompleted("eterc4")*5e7)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+" infinities<span>Cost: 70 Time Theorems"
    else document.getElementById("ec4unl").innerHTML = "Eternity Challenge 4<span>Cost: 70 Time Theorems"
    if (player.etercreq !== 5) document.getElementById("ec5unl").innerHTML = "Eternity Challenge 5<span>Requirement: "+(160+(ECTimesCompleted("eterc5")*14))+" galaxies<span>Cost: 130 Time Theorems"
    else document.getElementById("ec5unl").innerHTML = "Eternity Challenge 5<span>Cost: 130 Time Theorems"
    if (player.etercreq !== 6) document.getElementById("ec6unl").innerHTML = "Eternity Challenge 6<span>Requirement: "+(40+(ECTimesCompleted("eterc6")*5))+" replicanti galaxies<span>Cost: 85 Time Theorems"
    else document.getElementById("ec6unl").innerHTML = "Eternity Challenge 6<span>Cost: 85 Time Theorems"
    if (player.etercreq !== 7) document.getElementById("ec7unl").innerHTML = "Eternity Challenge 7<span>Requirement: "+shortenCosts(new Decimal("1e500000").times(new Decimal("1e300000").pow(ECTimesCompleted("eterc7"))))+" antimatter <span>Cost: 115 Time Theorems"
    else document.getElementById("ec7unl").innerHTML = "Eternity Challenge 7<span>Cost: 115 Time Theorems"
    if (player.etercreq !== 8) document.getElementById("ec8unl").innerHTML = "Eternity Challenge 8<span>Requirement: "+shortenCosts(new Decimal("1e4000").times(new Decimal("1e1000").pow(ECTimesCompleted("eterc8"))))+" IP <span>Cost: 115 Time Theorems"
    else document.getElementById("ec8unl").innerHTML = "Eternity Challenge 8<span>Cost: 115 Time Theorems"
    if (player.etercreq !== 9) document.getElementById("ec9unl").innerHTML = "Eternity Challenge 9<span>Requirement: "+shortenCosts(new Decimal("1e17500").times(new Decimal("1e2000").pow(ECTimesCompleted("eterc9"))))+" infinity power<span>Cost: 415 Time Theorems"
    else document.getElementById("ec9unl").innerHTML = "Eternity Challenge 9<span>Cost: 415 Time Theorems"
    if (player.etercreq !== 10) document.getElementById("ec10unl").innerHTML = "Eternity Challenge 10<span>Requirement: "+shortenCosts(new Decimal("1e100").times(new Decimal("1e20").pow(ECTimesCompleted("eterc10"))))+" EP<span>Cost: 550 Time Theorems"
    else document.getElementById("ec10unl").innerHTML = "Eternity Challenge 10<span>Cost: 550 Time Theorems"
}



// Replicanti stuff

function unlockReplicantis() {
    if (player.infinityPoints.gte(1e140)) {
        document.getElementById("replicantidiv").style.display="inline-block"
        document.getElementById("replicantiunlock").style.display="none"
        player.replicanti.unl = true
        player.replicanti.amount = new Decimal(1)
        player.infinityPoints = player.infinityPoints.minus(1e140)
    }
}

function upgradeReplicantiChance() {
    if (player.infinityPoints.gte(player.replicanti.chanceCost) && player.replicanti.chance < 1 && player.eterc8repl !== 0) {
        player.infinityPoints = player.infinityPoints.minus(player.replicanti.chanceCost)
        player.replicanti.chanceCost = player.replicanti.chanceCost.times(1e15)
        player.replicanti.chance += 0.01
        if (player.currentEternityChall == "eterc8") player.eterc8repl-=1
        document.getElementById("eterc8repl").innerHTML = "You have "+player.eterc8repl+" purchases left."
    }
}



function upgradeReplicantiInterval() {
    if (player.infinityPoints.gte(player.replicanti.intervalCost) && (player.replicanti.interval > 50 || player.timestudy.studies.includes(22)) && player.replicanti.interval !== 1 && player.eterc8repl !== 0) {
        player.infinityPoints = player.infinityPoints.minus(player.replicanti.intervalCost)
        player.replicanti.intervalCost = player.replicanti.intervalCost.times(1e10)
        player.replicanti.interval *= 0.9
        if (!player.timestudy.studies.includes(22) && player.replicanti.interval < 50) player.replicanti.interval = 50
        if (player.timestudy.studies.includes(22) && player.replicanti.interval < 1) player.replicanti.interval = 1
        var places = Math.floor(Math.log10(player.replicanti.interval/1000)) * (-1)
        if (player.currentEternityChall == "eterc8") player.eterc8repl-=1
        document.getElementById("eterc8repl").innerHTML = "You have "+player.eterc8repl+" purchases left."
    }
}

function upgradeReplicantiGalaxy() {
    if (player.infinityPoints.gte(player.replicanti.galCost) && player.eterc8repl !== 0) {
        player.infinityPoints = player.infinityPoints.minus(player.replicanti.galCost)
        if (player.currentEternityChall == "eterc6") player.replicanti.galCost = player.replicanti.galCost.times(Decimal.pow(1e2, player.replicanti.gal)).times(1e2)
        else player.replicanti.galCost = player.replicanti.galCost.times(Decimal.pow(1e5, player.replicanti.gal)).times(1e25)
        if (player.replicanti.gal >= 100) player.replicanti.galCost = player.replicanti.galCost.times(Decimal.pow(1e50, player.replicanti.gal - 95))
        player.replicanti.gal += 1
        if (player.currentEternityChall == "eterc8") player.eterc8repl-=1
        document.getElementById("eterc8repl").innerHTML = "You have "+player.eterc8repl+" purchases left."
    }
}


function replicantiGalaxy() {
    if (player.replicanti.amount.gte(Number.MAX_VALUE) && (!player.timestudy.studies.includes(131) ? player.replicanti.galaxies < player.replicanti.gal : player.replicanti.galaxies < Math.floor(player.replicanti.gal * 1.5))) {
        player.replicanti.amount = new Decimal(1)
        player.replicanti.galaxies += 1
        player.galaxies-=1
        galaxyReset()
        
    }
}



function updateMilestones() {
    var milestoneRequirements = [1, 2, 3, 4, 5, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 25, 30, 40, 50, 60, 80, 100]
    for (i=0; i<milestoneRequirements.length; i++) {
        var name = "reward" + i;
        if (player.eternities >= milestoneRequirements[i]) {
            document.getElementById(name).className = "milestonereward"
        } else {
            document.getElementById(name).className = "milestonerewardlocked"
        }
    }
}

function replicantiGalaxyAutoToggle() {
    if (player.replicanti.galaxybuyer) {
        player.replicanti.galaxybuyer = false
        document.getElementById("replicantiresettoggle").innerHTML = "Auto galaxy OFF"
    } else if (!player.timestudy.studies.includes(131)){
        player.replicanti.galaxybuyer = true
        document.getElementById("replicantiresettoggle").innerHTML = "Auto galaxy ON"
    }
}

function infMultAutoToggle() {
    if (player.infMultBuyer) {
        player.infMultBuyer = false
        document.getElementById("infmultbuyer").innerHTML = "Autobuy IP mult OFF"
    } else {
        player.infMultBuyer = true
        document.getElementById("infmultbuyer").innerHTML = "Autobuy IP mult ON"
    }
}


function toggleCrunchMode() {
    if (player.autoCrunchMode == "amount") {
        player.autoCrunchMode = "time"
        document.getElementById("togglecrunchmode").innerHTML = "Auto crunch mode: time"
        document.getElementById("limittext").innerHTML = "Seconds between crunches:"
    } else if (player.autoCrunchMode == "time"){
        player.autoCrunchMode = "relative"
        document.getElementById("togglecrunchmode").innerHTML = "Auto crunch mode: X times last crunch"
        document.getElementById("limittext").innerHTML = "X times last crunch:"
    } else {
        player.autoCrunchMode = "amount"
        document.getElementById("togglecrunchmode").innerHTML = "Auto crunch mode: amount"
        document.getElementById("limittext").innerHTML = "Amount of IP to wait until reset:"
    }
}

function toggleEternityConf() {
    if (player.options.eternityconfirm) {
        player.options.eternityconfirm = false
        document.getElementById("eternityconf").innerHTML = "Eternity confimation OFF"
    } else {
        player.options.eternityconfirm = true
        document.getElementById("eternityconf").innerHTML = "Eternity confimation ON"
    }
}


function toggleReplAuto(i) {
    if (i == "chance") {
        if (player.replicanti.auto[0]) {
            player.replicanti.auto[0] = false
            document.getElementById("replauto1").innerHTML = "Auto: OFF"
        } else {
            player.replicanti.auto[0] = true
            document.getElementById("replauto1").innerHTML = "Auto: ON"
        }
    } else if (i == "interval") {
        if (player.replicanti.auto[1]) {
            player.replicanti.auto[1] = false
            document.getElementById("replauto2").innerHTML = "Auto: OFF"
        } else {
            player.replicanti.auto[1] = true
            document.getElementById("replauto2").innerHTML = "Auto: ON"
        }
    } else if (i == "galaxy") {
        if (player.replicanti.auto[2]) {
            player.replicanti.auto[2] = false
            document.getElementById("replauto3").innerHTML = "Auto: OFF"
        } else {
            player.replicanti.auto[2] = true
            document.getElementById("replauto3").innerHTML = "Auto: ON"
        }
    }
}




function toggleCommas() {
    player.options.commas = !player.options.commas

    if (player.options.commas) document.getElementById("commas").innerHTML = "Commas on exponents"
    else document.getElementById("commas").innerHTML = "Notation on exponents"
}






buyAutobuyer = function(id) {
    if (player.infinityPoints.lt(player.autobuyers[id].cost)) return false;
    if (player.autobuyers[id].bulk >= 1e100) return false;
    player.infinityPoints = player.infinityPoints.minus(player.autobuyers[id].cost);
    if (player.autobuyers[id].interval <= 100) {
        player.autobuyers[id].bulk = Math.min(player.autobuyers[id].bulk * 2, 1e100);
        player.autobuyers[id].cost = Math.ceil(2.4*player.autobuyers[id].cost);   
        var b1 = true;
	    for (let i=0;i<8;i++) {
            if (player.autobuyers[i].bulk < 512) b1 = false;
        }
        if (b1) giveAchievement("Bulked up");
    } else {
        player.autobuyers[id].interval = Math.max(player.autobuyers[id].interval*0.6, 100);
        if (player.autobuyers[id].interval > 120) player.autobuyers[id].cost *= 2; //if your last purchase wont be very strong, dont double the cost
    }
    updateAutobuyers();
}

document.getElementById("buyerBtn1").onclick = function () {
    buyAutobuyer(0);
}

document.getElementById("buyerBtn2").onclick = function () {

    buyAutobuyer(1);
}

document.getElementById("buyerBtn3").onclick = function () {
    buyAutobuyer(2);
}

document.getElementById("buyerBtn4").onclick = function () {
    buyAutobuyer(3);
}

document.getElementById("buyerBtn5").onclick = function () {
    buyAutobuyer(4);
}

document.getElementById("buyerBtn6").onclick = function () {
    buyAutobuyer(5);
}

document.getElementById("buyerBtn7").onclick = function () {
    buyAutobuyer(6);
}

document.getElementById("buyerBtn8").onclick = function () {
    buyAutobuyer(7);
}

document.getElementById("buyerBtnTickSpeed").onclick = function () {
    buyAutobuyer(8);
}

document.getElementById("buyerBtnDimBoost").onclick = function () {
    buyAutobuyer(9);
}

document.getElementById("buyerBtnGalaxies").onclick = function () {
    buyAutobuyer(10);
}

document.getElementById("buyerBtnInf").onclick = function () {
    buyAutobuyer(11);
}

toggleAutobuyerTarget = function(id) {
    if (player.autobuyers[id-1].target == id) {
        player.autobuyers[id-1].target = 10 + id
        document.getElementById("toggleBtn" + id).innerHTML="Buys until 10"
    } else {
        player.autobuyers[id-1].target = id
        document.getElementById("toggleBtn" + id).innerHTML="Buys singles"
    }
}

document.getElementById("toggleBtn1").onclick = function () {
    toggleAutobuyerTarget(1)
}

document.getElementById("toggleBtn2").onclick = function () {
    toggleAutobuyerTarget(2)
}

document.getElementById("toggleBtn3").onclick = function () {
    toggleAutobuyerTarget(3)
}

document.getElementById("toggleBtn4").onclick = function () {
    toggleAutobuyerTarget(4)
}

document.getElementById("toggleBtn5").onclick = function () {
    toggleAutobuyerTarget(5)
}

document.getElementById("toggleBtn6").onclick = function () {
    toggleAutobuyerTarget(6)
}

document.getElementById("toggleBtn7").onclick = function () {
    toggleAutobuyerTarget(7)
}

document.getElementById("toggleBtn8").onclick = function () {
    toggleAutobuyerTarget(8)
}

document.getElementById("toggleBtnTickSpeed").onclick = function () {
    if (player.autobuyers[8].target == 1) {
        player.autobuyers[8].target = 10
        document.getElementById("toggleBtnTickSpeed").innerHTML="Buys max"
    } else {
        player.autobuyers[8].target = 1
        document.getElementById("toggleBtnTickSpeed").innerHTML="Buys singles"
    }
}















document.getElementById("secondSoftReset").onclick = function() {
    if (player.currentEternityChall == "eterc6") return
    var bool = player.currentChallenge != "challenge11" && player.currentChallenge != "postc1" && player.currentChallenge != "postc7" && (player.break || player.money.lte(Number.MAX_VALUE))
    if (player.currentEternityChall == "eterc6") return
    if (player.currentChallenge == "challenge4" ? player.sixthAmount >= getGalaxyRequirement() && bool : player.eightAmount >= getGalaxyRequirement() && bool) {
        galaxyReset()
    }
}


function galaxyReset() {
    
    if (autoS) auto = false;
    autoS = true;
    if (player.sacrificed == 0) giveAchievement("I don't believe in Gods");
    player = {
        money: player.achievements.includes("r111") ? player.money : new Decimal(10),
        tickSpeedCost: new Decimal(1000),
        tickspeed: new Decimal(1000),
        firstCost: new Decimal(10),
        secondCost: new Decimal(100),
        thirdCost: new Decimal(10000),
        fourthCost: new Decimal(1000000),
        fifthCost: new Decimal(1e9),
        sixthCost: new Decimal(1e13),
        seventhCost: new Decimal(1e18),
        eightCost: new Decimal(1e24),
        firstAmount: new Decimal(0),
        secondAmount: new Decimal(0),
        thirdAmount: new Decimal(0),
        fourthAmount: new Decimal(0),
        firstBought: 0,
        secondBought: 0,
        thirdBought: 0,
        fourthBought: 0,
        fifthAmount: new Decimal(0),
        sixthAmount: new Decimal(0),
        seventhAmount: new Decimal(0),
        eightAmount: new Decimal(0),
        fifthBought: 0,
        sixthBought: 0,
        seventhBought: 0,
        eightBought: 0,
        firstPow: new Decimal(1),
        secondPow: new Decimal(1),
        thirdPow: new Decimal(1),
        fourthPow: new Decimal(1),
        fifthPow: new Decimal(1),
        sixthPow: new Decimal(1),
        seventhPow: new Decimal(1),
        eightPow: new Decimal(1),
        sacrificed: new Decimal(0),
        achievements: player.achievements,
        challenges: player.challenges,
        currentChallenge: player.currentChallenge,
        infinityUpgrades: player.infinityUpgrades,
        infinityPoints: player.infinityPoints,
        infinitied: player.infinitied,
        infinitiedBank: player.infinitiedBank,
        totalTimePlayed: player.totalTimePlayed,
        bestInfinityTime: player.bestInfinityTime,
        thisInfinityTime: player.thisInfinityTime,
        resets: 0,
        galaxies: player.galaxies + 1,
        totalmoney: player.totalmoney,
        tickDecrease: player.tickDecrease - 0.03,
        interval: null,
        lastUpdate: player.lastUpdate,
        achPow: player.achPow,
        newsArray: player.newsArray,
        autobuyers: player.autobuyers,
        costMultipliers: [new Decimal(1e3), new Decimal(1e4), new Decimal(1e5), new Decimal(1e6), new Decimal(1e8), new Decimal(1e10), new Decimal(1e12), new Decimal(1e15)],
        tickspeedMultiplier: new Decimal(10),
        chall2Pow: player.chall2Pow,
        chall3Pow: new Decimal(0.01),
        matter: new Decimal(0),
        chall11Pow: new Decimal(1),
        partInfinityPoint: player.partInfinityPoint,
        partInfinitied: player.partInfinitied,
        break: player.break,
        challengeTimes: player.challengeTimes,
        infchallengeTimes: player.infchallengeTimes,
        lastTenRuns: player.lastTenRuns,
        lastTenEternities: player.lastTenEternities,
        infMult: player.infMult,
        infMultCost: player.infMultCost,
        tickSpeedMultDecrease: player.tickSpeedMultDecrease,
        tickSpeedMultDecreaseCost: player.tickSpeedMultDecreaseCost,
        dimensionMultDecrease: player.dimensionMultDecrease,
        dimensionMultDecreaseCost: player.dimensionMultDecreaseCost,
        version: player.version,
        overXGalaxies: player.overXGalaxies,
        spreadingCancer: player.spreadingCancer,
        infDimensionsUnlocked: player.infDimensionsUnlocked,
        infinityPower: player.infinityPower,
        postChallUnlocked: player.postChallUnlocked,
        postC4Tier: 1,
        postC3Reward: new Decimal(1),
        infinityDimension1: player.infinityDimension1,
        infinityDimension2: player.infinityDimension2,
        infinityDimension3: player.infinityDimension3,
        infinityDimension4: player.infinityDimension4,
        infinityDimension5: player.infinityDimension5,
        infinityDimension6: player.infinityDimension6,
        infinityDimension7: player.infinityDimension7,
        infinityDimension8: player.infinityDimension8,
        infDimBuyers: player.infDimBuyers,
        timeShards: player.timeShards,
        tickThreshold: player.tickThreshold,
        timeDimension1: player.timeDimension1,
        timeDimension2: player.timeDimension2,
        timeDimension3: player.timeDimension3,
        timeDimension4: player.timeDimension4,
        eternityPoints: player.eternityPoints,
        eternities: player.eternities,
        thisEternity: player.thisEternity,
        bestEternity: player.bestEternity,
        eternityUpgrades: player.eternityUpgrades,
        epmult: player.epmult,
        epmultCost: player.epmultCost,
        totalTickGained: player.totalTickGained,
        offlineProd: player.offlineProd,
        offlineProdCost: player.offlineProdCost,
        challengeTarget: player.challengeTarget,
        autoSacrifice: player.autoSacrifice,
        replicanti: player.replicanti,
        timestudy: player.timestudy,
        eternityChalls: player.eternityChalls,
        eternityChallGoal: player.eternityChallGoal,
        currentEternityChall: player.currentEternityChall,
        eternityChallUnlocked: player.eternityChallUnlocked,
        etercreq: player.etercreq,
        autoIP: player.autoIP,
        autoTime: player.autoTime,
        infMultBuyer: player.infMultBuyer,
        autoCrunchMode: player.autoCrunchMode,
        respec: player.respec,
        eternityBuyer: player.eternityBuyer,
        eterc8ids: player.eterc8ids,
        eterc8repl: player.eterc8repl,
        dimlife: player.dimlife,
        dead: player.dead,
        options: player.options
    };

    if (player.currentChallenge == "challenge10" || player.currentChallenge == "postc1") {
        player.thirdCost = new Decimal(100)
        player.fourthCost = new Decimal(500)
        player.fifthCost = new Decimal(2500)
        player.sixthCost = new Decimal(2e4)
        player.seventhCost = new Decimal(2e5)
        player.eightCost = new Decimal(4e6)
    }

    if (player.resets == 0 && player.currentChallenge == "") {
        if (player.infinityUpgrades.includes("skipReset1")) player.resets++;
        if (player.infinityUpgrades.includes("skipReset2")) player.resets++;
        if (player.infinityUpgrades.includes("skipReset3")) player.resets++;
        if (player.infinityUpgrades.includes("skipResetGalaxy")) {
            player.resets++;
            if (player.galaxies == 0) player.galaxies = 1
        }
    }
    if (player.currentChallenge == "postc2") {
        player.eightAmount = new Decimal(1);
        player.eightBought = 1;
        player.resets = 4;
    }
    player.firstPow = getDimensionBoostPower().pow(player.resets+ 1)
    player.secondPow = getDimensionBoostPower().pow(player.resets)
    player.thirdPow = getDimensionBoostPower().pow(player.resets - 1).max(1)
    player.fourthPow = getDimensionBoostPower().pow(player.resets - 2).max(1)
    player.fifthPow = getDimensionBoostPower().pow(player.resets - 3).max(1)
    player.sixthPow = getDimensionBoostPower().pow(player.resets - 4).max(1)
    player.seventhPow = getDimensionBoostPower().pow(player.resets - 5).max(1)
    player.eightPow = getDimensionBoostPower().pow(player.resets - 6).max(1)


    if (player.options.notation == "Emojis") player.spreadingCancer+=1;
    if (player.spreadingCancer >= 10) giveAchievement("Spreading Cancer")
    if (player.achievements.includes("r36")) player.tickspeed = player.tickspeed.times(0.98);
    if (player.achievements.includes("r45")) player.tickspeed = player.tickspeed.times(0.98);
    if (player.achievements.includes("r83")) player.tickspeed = player.tickspeed.times(Decimal.pow(0.95,player.galaxies));
    clearInterval(player.interval);
    //updateInterval();

    if (player.eternities < 30) {
        document.getElementById("secondRow").style.display = "none";
        document.getElementById("thirdRow").style.display = "none";
        document.getElementById("tickSpeed").style.visibility = "hidden";
        document.getElementById("tickSpeedMax").style.visibility = "hidden";
        document.getElementById("tickLabel").style.visibility = "hidden";
        document.getElementById("tickSpeedAmount").style.visibility = "hidden";
        document.getElementById("fourthRow").style.display = "none";
        document.getElementById("fifthRow").style.display = "none";
        document.getElementById("sixthRow").style.display = "none";
        document.getElementById("seventhRow").style.display = "none";
        document.getElementById("eightRow").style.display = "none";
    }

    if (player.galaxies >= 50) giveAchievement("YOU CAN GET 50 GALAXIES!??")
    if (player.galaxies >= 2) giveAchievement("Double Galaxy");
    if (player.galaxies >= 1) giveAchievement("You got past The Big Wall");
    if (player.challenges.includes("challenge1")) player.money = new Decimal(100).max(player.money)
    if (player.achievements.includes("r37")) player.money = new Decimal(1000).max(player.money);
    if (player.achievements.includes("r54")) player.money = new Decimal(2e5).max(player.money);
    if (player.achievements.includes("r55")) player.money = new Decimal(1e10).max(player.money);
    if (player.achievements.includes("r78")) player.money = new Decimal(1e25).max(player.money);
    player.tickspeed = player.tickspeed.times(Decimal.pow(getTickSpeedMultiplier(), player.totalTickGained))
    if (player.achievements.includes("r66")) player.tickspeed = player.tickspeed.times(0.98);
    

};

document.getElementById("exportbtn").onclick = function () {
    let output = document.getElementById('exportOutput');
    let parent = output.parentElement;

    parent.style.display = "";
    output.value = btoa(JSON.stringify(player, function(k, v) { return (v === Infinity) ? "Infinity" : v; }));

    output.onblur = function() {
        parent.style.display = "none";
    }

    output.focus();
    output.select();

    try {
        if (document.execCommand('copy')) {
            $.notify("exported to clipboard", "info");
            output.blur();
        }
    } catch(ex) {
        // well, we tried.
    }
};


document.getElementById("save").onclick = function () {
    save_game();
};

function verify_save(obj) {
    if (typeof obj != 'object') return false;


    return true;
}

document.getElementById("importbtn").onclick = function () {
    var save_data = prompt("Input your save.");
    if (save_data.constructor !== String) save_data = "";
    if (save_data.length < 10) player.options.secretThemeKey = save_data;;
    if (sha512_256(save_data) === "de24687ee7ba1acd8f5dc8f71d41a3d4b7f14432fff53a4d4166e7eea48a88c0") {
        player.options.theme = "S1";
        setTheme(player.options.theme);
    } else if (sha512_256(save_data) === "76269d18c05c9ebec8a990a096cee046dea042a0421f8ab81d17f34dd1cdbdbf") {
        player.options.theme = "S2";
        setTheme(player.options.theme);
    } else if (sha512_256(save_data) === "d764e9a1d1e18081be19f3483b537ae1159ab40d10e096df1d9e857d68d6ba7a") {
        player.options.theme = "S3";
        setTheme(player.options.theme);
    } else if (sha512_256(save_data) === "ae0199482ecfa538a03eb37c67866e67a11f1832516c26c7939e971e514d40c5") {
        player.options.theme = "S4";
        setTheme(player.options.theme);
        
    } else {
        save_data = JSON.parse(atob(save_data), function(k, v) { return (v === Infinity) ? "Infinity" : v; });
        if (!save_data || !verify_save(save_data)) {
            alert('could not load the save..');
            load_custom_game();
            return;
        }
        player = save_data;
        save_game();
        load_game();
        updateChallenges()
        transformSaveToDecimal()
    }
};




document.getElementById("reset").onclick = function () {
    if (confirm("Do you really want to erase all your progress?")) {
        set_save('dimensionSave', defaultStart);
        player = defaultStart
        save_game();
        load_game();
        updateCosts();
        clearInterval(player.interval);
        //updateInterval();

        document.getElementById("secondRow").style.display = "none";
        document.getElementById("thirdRow").style.display = "none";
        document.getElementById("tickSpeed").style.visibility = "hidden";
        document.getElementById("tickSpeedMax").style.visibility = "hidden";
        document.getElementById("tickLabel").style.visibility = "hidden";
        document.getElementById("tickSpeedAmount").style.visibility = "hidden";
        document.getElementById("fourthRow").style.display = "none";
        document.getElementById("fifthRow").style.display = "none";
        document.getElementById("sixthRow").style.display = "none";
        document.getElementById("seventhRow").style.display = "none";
        document.getElementById("eightRow").style.display = "none";
        showDimTab('antimatterdimensions')
        updateTickSpeed();
        updateDimensions();
        updateChallenges();
        updateAutobuyers();
    }
};


function breakInfinity() {
    if (player.autobuyers[11]%1 === 0 || player.autobuyers[11].interval>100) return false
    if (player.break && !player.currentChallenge.includes("post")) {
        player.break = false
        document.getElementById("break").innerHTML = "BREAK INFINITY"
    } else {
        player.break = true
        document.getElementById("break").innerHTML = "FIX INFINITY"
        giveAchievement("Limit Break")
    }
}

function gainedInfinityPoints() {
    let div = 308;
    if (player.timestudy.studies.includes(111)) div = 285;
    else if (player.achievements.includes("r103")) div = 307.8;
    
    var ret = Decimal.pow(10, player.money.e/div -0.75).times(player.infMult).times(kongIPMult)
    if (player.timestudy.studies.includes(41)) ret = ret.times(Decimal.pow(1.2, player.galaxies + player.replicanti.galaxies))
    if (player.timestudy.studies.includes(51)) ret = ret.times(1e15)
    if (player.timestudy.studies.includes(141)) ret = ret.times(new Decimal(1e45).dividedBy(Decimal.pow(15, Math.log(player.thisInfinityTime+1)*Math.pow(player.thisInfinityTime+1, 0.125))).max(1))
    if (player.timestudy.studies.includes(142)) ret = ret.times(1e25)
    if (player.timestudy.studies.includes(143)) ret = ret.times(Decimal.pow(15, Math.log(player.thisInfinityTime+1)*Math.pow(player.thisInfinityTime+1, 0.125)))
    if (player.achievements.includes("r116")) ret = ret.times(Decimal.pow(2, Math.log10(getInfinitied()+1)))
    return ret.floor()
}

function gainedEternityPoints() {
    var ret = Decimal.pow(5, player.infinityPoints.plus(gainedInfinityPoints()).e/308 -0.7).times(player.epmult)
    if (player.timestudy.studies.includes(61)) ret = ret.times(10)
    if (player.timestudy.studies.includes(121)) ret = ret.times(((253 - averageEp.dividedBy(player.epmult).dividedBy(10).min(248).max(3))/5)) //x300 if tryhard, ~x60 if not
    else if (player.timestudy.studies.includes(122)) ret = ret.times(35)
    else if (player.timestudy.studies.includes(123)) ret = ret.times(Math.sqrt(1.39*player.thisEternity/10))

    return ret.floor()
}


function setAchieveTooltip() {
    var apocAchieve = document.getElementById("Antimatter Apocalypse");
    var noPointAchieve = document.getElementById("There's no point in doing that");
    var sanic = document.getElementById("Supersanic")
    var forgotAchieve = document.getElementById("I forgot to nerf that")
    var potato = document.getElementById("Faster than a potato")
    let potato2 = document.getElementById("Faster than a squared potato")
    var dimensional = document.getElementById("Multidimensional")
    var IPBelongs = document.getElementById("All your IP are belong to us")
    var reference = document.getElementById("Yet another infinity reference")
    let blink = document.getElementById("Blink of an eye")
    let exist = document.getElementById("This achievement doesn't exist")
    let exist2 = document.getElementById("I got a few to spare")
    let speed = document.getElementById("Ludicrous Speed")
    let speed2 = document.getElementById("I brake for nobody")
    let overdrive = document.getElementById("MAXIMUM OVERDRIVE")
    let minute = document.getElementById("Minute of infinity")
    let infiniteIP = document.getElementById("Can you get infinite IP?")
    let over9000 = document.getElementById("IT'S OVER 9000")
    let dawg = document.getElementById("Yo dawg, I heard you liked infinities...")
    let eatass = document.getElementById("Like feasting on a behind")
    let layer = document.getElementById("But I wanted another prestige layer...")
    let fkoff = document.getElementById("What do I have to do to get rid of you")

    apocAchieve.setAttribute('ach-tooltip', "Get over " + formatValue(player.options.notation, 1e80, 0, 0) + " antimatter.");
    noPointAchieve.setAttribute('ach-tooltip', "Buy a single First Dimension when you have over " + formatValue(player.options.notation, 1e150, 0, 0) + " of them. Reward: First Dimensions are 10% stronger.");
    forgotAchieve.setAttribute('ach-tooltip', "Get any Dimension multiplier over " + formatValue(player.options.notation, 1e31, 0, 0)) + ". Reward: First Dimensions are 5% stronger.";
    sanic.setAttribute('ach-tooltip', "Have antimatter/sec exceed your current antimatter above " + formatValue(player.options.notation, 1e63, 0, 0));
    potato.setAttribute('ach-tooltip', "Get more than " + formatValue(player.options.notation, 1e29, 0, 0) + " ticks per second. Reward: Reduces starting tick interval by 2%.");
    potato2.setAttribute('ach-tooltip', "Get more than " + formatValue(player.options.notation, 1e58, 0, 0) + " ticks per second. Reward: Reduces starting tick interval by 2%.");    
    dimensional.setAttribute('ach-tooltip', "Reach " + formatValue(player.options.notation, 1e12, 0, 0) + " of all dimensions except 8th.");
    IPBelongs.setAttribute('ach-tooltip', "Big Crunch for "+shortenCosts(1e150)+" IP. Reward: Additional 4x multiplier to IP.")
    reference.setAttribute('ach-tooltip', "Get a x"+shortenDimensions(Number.MAX_VALUE)+" multiplier in a single sacrifice. Reward: Sacrifices are stronger.")
    blink.setAttribute('ach-tooltip', "Get to Infinity in under 200 milliseconds. Reward: Start with " + formatValue(player.options.notation, 1e25, 0, 0) + " antimatter and all dimensions are stronger in first 300ms of Infinity.");
    //exist.setAttribute('ach-tooltip', "Reach " + formatValue(player.options.notation, 9.9999e9999, 0, 0) + " antimatter. Reward: Dimensions are more powerful the more unspent antimatter you have."); (i like the 9 9s thing and no one will see it with a formatted value)
    //exist2.setAttribute('ach-tooltip', "Reach " + formatValue(player.options.notation, 1e35000, 0, 0) + " antimatter. Reward: Dimensions are more powerful the more unspent antimatter you have.")
    speed.setAttribute('ach-tooltip', "Big Crunch for "+shortenCosts(1e200)+" IP in 2 seconds or less. Reward: All dimensions are significantly stronger in first 5 seconds of infinity.")
    speed2.setAttribute('ach-tooltip', "Big Crunch for "+shortenCosts(1e250)+" IP in 20 seconds or less. Reward: All dimensions are significantly stronger in first 60 seconds of infinity.")
    overdrive.setAttribute('ach-tooltip', "Big Crunch with " + shortenCosts(1e300) + " IP/min. Reward: Additional 4x multiplier to IP.")
    minute.setAttribute('ach-tooltip', "Reach " + shortenCosts(1e260) + " infinity power. Reward: Double infinity power gain.")
    infiniteIP.setAttribute('ach-tooltip', "Reach "+shortenCosts(new Decimal("1e30008"))+" IP.")
    over9000.setAttribute('ach-tooltip', "Get a total sacrifice multiplier of "+shortenCosts(new Decimal("1e9000"))+".")
    dawg.setAttribute('ach-tooltip', "Have all your past 10 infinities be at least "+shortenMoney(Number.MAX_VALUE)+" times higher IP than the previous one. Reward: Your antimatter doesn't reset on dimboost/galaxy")
    eatass.setAttribute('ach-tooltip', "Get "+shortenCosts(1e100)+" IP without any infinities or first dimensions")
    layer.setAttribute('ach-tooltip', "Get "+shortenMoney(Number.MAX_VALUE)+" EP")
    fkoff.setAttribute('ach-tooltip', "Gain "+shortenCosts(new Decimal("1e22000"))+" IP without any time studies.")
}

document.getElementById("notation").onclick = function () {
    player.options.scientific = !player.options.scientific;
    if (player.options.notation === "Logarithm") {
        player.options.notation = "Scientific";
        document.getElementById("notation").innerHTML = ("Notation: Scientific")
    } else if (player.options.notation === "Scientific") {
        player.options.notation = "Engineering";
        document.getElementById("notation").innerHTML = ("Notation: Engineering")
    } else if (player.options.notation === "Engineering") {
        player.options.notation = "Letters";
        document.getElementById("notation").innerHTML = ("Notation: Letters")
    } else if (player.options.notation === "Letters") {
        player.options.notation = "Standard";
        document.getElementById("notation").innerHTML = ("Notation: Standard")
    } else if (player.options.notation === "Standard") {
        player.options.notation = "Emojis";
        document.getElementById("notation").innerHTML = ("Notation: Cancer")
    } else if (player.options.notation === "Emojis") {
        player.options.notation = "Mixed scientific";
        document.getElementById("notation").innerHTML = ("Notation: Mixed scientific")
    } else if (player.options.notation === "Mixed scientific") {
        player.options.notation = "Mixed engineering";
        document.getElementById("notation").innerHTML = ("Notation: Mixed engineering")
    } else if (player.options.notation === "Mixed engineering") {
        player.options.notation = "Logarithm";
        document.getElementById("notation").innerHTML = ("Notation: Logarithm")
    }
    setAchieveTooltip();
    updateCosts();
   
};


document.getElementById("newsbtn").onclick = function() {
  if (!player.options.newsHidden) {
    document.getElementById("game").style.display = "none";
    player.options.newsHidden = true
  } else {
    document.getElementById("game").style.display = "block";
    player.options.newsHidden = false
    scrollNextMessage()
  }
}


function resetDimensions() {
    var tiers = [ null, "first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eight" ];

    for (i = 1; i <= 8; i++) {
        player[tiers[i] + "Amount"] = new Decimal(0)
        player[tiers[i] + "Pow"] = new Decimal(1)
    }
    player.firstCost = new Decimal(10)
    player.secondCost = new Decimal(100)
    player.thirdCost = new Decimal(10000)
    player.fourthCost = new Decimal(1e6)
    player.fifthCost = new Decimal(1e9)
    player.sixthCost = new Decimal(1e13)
    player.seventhCost = new Decimal(1e18)
    player.eightCost = new Decimal(1e24)
    player.eightPow = new Decimal(player.chall11Pow)
}

function calcSacrificeBoost() {
    if (player.firstAmount == 0) return new Decimal(1);
    if (player.challenges.includes("postc2")) {
        if (player.achievements.includes("r88")) return player.firstAmount.dividedBy(player.sacrificed.max(1)).pow(0.011).max(1)
        return player.firstAmount.dividedBy(player.sacrificed.max(1)).pow(0.01).max(1)
    }
    if (player.currentChallenge != "challenge11") {
        var sacrificePow=2;
        if (player.achievements.includes("r32")) sacrificePow += 0.2;
        if (player.achievements.includes("r57")) sacrificePow += 0.2; //this upgrade was too OP lol
        return Decimal.pow((player.firstAmount.e/10.0), sacrificePow).dividedBy(((Decimal.max(player.sacrificed.e, 1)).dividedBy(10.0)).pow(sacrificePow).max(1)).max(1);
    } else {
        return player.firstAmount.pow(0.05).dividedBy(player.sacrificed.pow(0.04).max(1)).max(1);
    }
}

function calcTotalSacrificeBoost() {
    if (player.sacrificed == 0) return new Decimal(1);
    if (player.challenges.includes("postc2")) {
        if (player.achievements.includes("r88")) return player.sacrificed.pow(0.011)
        else return player.sacrificed.pow(0.01)
    }
    if (player.currentChallenge != "challenge11") {
        var sacrificePow=2;
        if (player.achievements.includes("r32")) sacrificePow += 0.2;
        if (player.achievements.includes("r57")) sacrificePow += 0.2;
        return Decimal.pow((player.sacrificed.e/10.0), sacrificePow);
    } else {
        return player.sacrificed.pow(0.05) //this is actually off but like im not sure how youd make it good. not that it matters.
    }
}


function sacrifice() {
    if (player.eightAmount == 0) return false;
    if (player.resets < 5) return false
    if (player.currentEternityChall == "eterc3") return false
    if (player.currentChallenge == "challenge11" && (calcTotalSacrificeBoost().gte(Number.MAX_VALUE) || player.chall11Pow.gte(Number.MAX_VALUE))) return false

    if (calcSacrificeBoost().gte(Number.MAX_VALUE)) giveAchievement("Yet another infinity reference");
    player.eightPow = player.eightPow.times(calcSacrificeBoost())
    player.sacrificed = player.sacrificed.plus(player.firstAmount);
    if (player.currentChallenge != "challenge11") {
        if (player.currentChallenge == "challenge7") clearDimensions(6);
        else clearDimensions(7);
    } else {
        player.chall11Pow = player.chall11Pow.times(calcSacrificeBoost())
        resetDimensions();
        player.money = new Decimal(100)

    }
    if (calcTotalSacrificeBoost() >= 600) giveAchievement("The Gods are pleased");
    if (calcTotalSacrificeBoost().gte("1e9000")) giveAchievement("IT'S OVER 9000");
}




document.getElementById("sacrifice").onclick = function () {
    if (!document.getElementById("confirmation").checked) {
        if (!confirm("Dimensional Sacrifice will remove all of your first to seventh dimensions (with the cost and multiplier unchanged) for a boost to Eighth Dimension. It will take time to regain production.")) {
            return false;
        }
    }
    auto = false;
    return sacrifice();
}


function updateAutobuyers() {
    var autoBuyerDim1 = new Autobuyer (1)
    var autoBuyerDim2 = new Autobuyer (2)
    var autoBuyerDim3 = new Autobuyer (3)
    var autoBuyerDim4 = new Autobuyer (4)
    var autoBuyerDim5 = new Autobuyer (5)
    var autoBuyerDim6 = new Autobuyer (6)
    var autoBuyerDim7 = new Autobuyer (7)
    var autoBuyerDim8 = new Autobuyer (8)
    var autoBuyerDimBoost = new Autobuyer (9)
    var autoBuyerGalaxy = new Autobuyer (document.getElementById("secondSoftReset"))
    var autoBuyerTickspeed = new Autobuyer (document.getElementById("tickSpeed"))
    var autoBuyerInf = new Autobuyer (document.getElementById("bigcrunch"))
    var autoSacrifice = new Autobuyer(13)


    autoBuyerDim1.interval = 3000
    autoBuyerDim2.interval = 4000
    autoBuyerDim3.interval = 5000
    autoBuyerDim4.interval = 6000
    autoBuyerDim5.interval = 8000
    autoBuyerDim6.interval = 10000
    autoBuyerDim7.interval = 12000
    autoBuyerDim8.interval = 15000
    autoBuyerDimBoost.interval = 16000
    autoBuyerGalaxy.interval = 300000
    autoBuyerTickspeed.interval = 10000
    autoBuyerInf.interval = 300000

    autoSacrifice.interval = 100
    autoSacrifice.priority = 5

    autoBuyerDim1.tier = 1
    autoBuyerDim2.tier = 2
    autoBuyerDim3.tier = 3
    autoBuyerDim4.tier = 4
    autoBuyerDim5.tier = 5
    autoBuyerDim6.tier = 6
    autoBuyerDim7.tier = 7
    autoBuyerDim8.tier = 8
    autoBuyerTickSpeed.tier = 9

    if (player.challenges.includes("challenge1") && player.autobuyers[0] == 1) {
        player.autobuyers[0] = autoBuyerDim1
        document.getElementById("autoBuyer1").style.display = "inline-block"
    }
    if (player.challenges.includes("challenge2") && player.autobuyers[1] == 2) {
        player.autobuyers[1] = autoBuyerDim2
        document.getElementById("autoBuyer2").style.display = "inline-block"
    }
    if (player.challenges.includes("challenge3") && player.autobuyers[2] == 3) {
        player.autobuyers[2] = autoBuyerDim3
        document.getElementById("autoBuyer3").style.display = "inline-block"
    }
    if (player.challenges.includes("challenge4") && player.autobuyers[9] == 10) {
        player.autobuyers[9] = autoBuyerDimBoost
        document.getElementById("autoBuyerDimBoost").style.display = "inline-block"
    }
    if (player.challenges.includes("challenge5") && player.autobuyers[8] == 9) {
        player.autobuyers[8] = autoBuyerTickspeed
        document.getElementById("autoBuyerTickSpeed").style.display = "inline-block"
    }
    if (player.challenges.includes("challenge6") && player.autobuyers[4] == 5) {
        player.autobuyers[4] = autoBuyerDim5
        document.getElementById("autoBuyer5").style.display = "inline-block"
    }
    if (player.challenges.includes("challenge7") && player.autobuyers[11] == 12) {
        player.autobuyers[11] = autoBuyerInf
        document.getElementById("autoBuyerInf").style.display = "inline-block"
    }
    if (player.challenges.includes("challenge8") && player.autobuyers[3] == 4) {
        player.autobuyers[3] = autoBuyerDim4
        document.getElementById("autoBuyer4").style.display = "inline-block"
    }
    if (player.challenges.includes("challenge9") && player.autobuyers[6] == 7) {
        player.autobuyers[6] = autoBuyerDim7
        document.getElementById("autoBuyer7").style.display = "inline-block"
    }
    if (player.challenges.includes("challenge10") && player.autobuyers[5] == 6) {
        player.autobuyers[5] = autoBuyerDim6
        document.getElementById("autoBuyer6").style.display = "inline-block"
    }
    if (player.challenges.includes("challenge11") && player.autobuyers[7] == 8) {
        player.autobuyers[7] = autoBuyerDim8
        document.getElementById("autoBuyer8").style.display = "inline-block"
    }
    if (player.challenges.includes("challenge12") && player.autobuyers[10] == 11) {
        player.autobuyers[10] = autoBuyerGalaxy
        document.getElementById("autoBuyerGalaxies").style.display = "inline-block"
    }

    if (player.challenges.includes("postc2") && player.autoSacrifice == 1) {
        player.autoSacrifice = autoSacrifice
        document.getElementById("autoBuyerSac").style.display = "inline-block"
    } else {
        document.getElementById("autoBuyerSac").style.display = "none"
    }

    if (player.eternities < 100) {
        document.getElementById("autoBuyerEter").style.display = "none"
    }

    if (player.infinityUpgrades.includes("autoBuyerUpgrade")) {
        document.getElementById("interval1").innerHTML = "Current interval: " + (player.autobuyers[0].interval/2000).toFixed(2) + " seconds";
        document.getElementById("interval2").innerHTML = "Current interval: " + (player.autobuyers[1].interval/2000).toFixed(2) + " seconds";
        document.getElementById("interval3").innerHTML = "Current interval: " + (player.autobuyers[2].interval/2000).toFixed(2) + " seconds";
        document.getElementById("interval4").innerHTML = "Current interval: " + (player.autobuyers[3].interval/2000).toFixed(2) + " seconds";
        document.getElementById("interval5").innerHTML = "Current interval: " + (player.autobuyers[4].interval/2000).toFixed(2) + " seconds";
        document.getElementById("interval6").innerHTML = "Current interval: " + (player.autobuyers[5].interval/2000).toFixed(2) + " seconds";
        document.getElementById("interval7").innerHTML = "Current interval: " + (player.autobuyers[6].interval/2000).toFixed(2) + " seconds";
        document.getElementById("interval8").innerHTML = "Current interval: " + (player.autobuyers[7].interval/2000).toFixed(2) + " seconds";
        document.getElementById("intervalTickSpeed").innerHTML = "Current interval: " + (player.autobuyers[8].interval/2000).toFixed(2) + " seconds";
        document.getElementById("intervalDimBoost").innerHTML = "Current interval: " + (player.autobuyers[9].interval/2000).toFixed(2) + " seconds";
        document.getElementById("intervalGalaxies").innerHTML = "Current interval: " + (player.autobuyers[10].interval/2000).toFixed(2) + " seconds";
        document.getElementById("intervalInf").innerHTML = "Current interval: " + (player.autobuyers[11].interval/2000).toFixed(2) + " seconds";
    } else {
        document.getElementById("interval1").innerHTML = "Current interval: " + (player.autobuyers[0].interval/1000).toFixed(2) + " seconds";
        document.getElementById("interval2").innerHTML = "Current interval: " + (player.autobuyers[1].interval/1000).toFixed(2) + " seconds";
        document.getElementById("interval3").innerHTML = "Current interval: " + (player.autobuyers[2].interval/1000).toFixed(2) + " seconds";
        document.getElementById("interval4").innerHTML = "Current interval: " + (player.autobuyers[3].interval/1000).toFixed(2) + " seconds";
        document.getElementById("interval5").innerHTML = "Current interval: " + (player.autobuyers[4].interval/1000).toFixed(2) + " seconds";
        document.getElementById("interval6").innerHTML = "Current interval: " + (player.autobuyers[5].interval/1000).toFixed(2) + " seconds";
        document.getElementById("interval7").innerHTML = "Current interval: " + (player.autobuyers[6].interval/1000).toFixed(2) + " seconds";
        document.getElementById("interval8").innerHTML = "Current interval: " + (player.autobuyers[7].interval/1000).toFixed(2) + " seconds";
        document.getElementById("intervalTickSpeed").innerHTML = "Current interval: " + (player.autobuyers[8].interval/1000).toFixed(2) + " seconds";
        document.getElementById("intervalDimBoost").innerHTML = "Current interval: " + (player.autobuyers[9].interval/1000).toFixed(2) + " seconds";
        document.getElementById("intervalGalaxies").innerHTML = "Current interval: " + (player.autobuyers[10].interval/1000).toFixed(2) + " seconds";
        document.getElementById("intervalInf").innerHTML = "Current interval: " + (player.autobuyers[11].interval/1000).toFixed(2) + " seconds";
    }

    var maxedAutobuy = 0;
    for (let tier = 1; tier <= 8; ++tier) {
    document.getElementById("toggleBtn" + tier).style.display = "inline-block";
        if (player.autobuyers[tier-1].bulk >= 1e100) {
        player.autobuyers[tier-1].bulk = 1e100;
        document.getElementById("buyerBtn" + tier).innerHTML = shortenDimensions(player.autobuyers[tier-1].bulk)+"x bulk purchase";
        }
        else {
        if (player.autobuyers[tier-1].interval <= 100) {
            if (player.autobuyers[tier-1].bulk * 2 >= 1e100) {
                document.getElementById("buyerBtn" + tier).innerHTML = shortenDimensions(1e100)+"x bulk purchase<br>Cost: " + shortenDimensions(player.autobuyers[tier-1].cost) + " IP";
            }
            else {
                document.getElementById("buyerBtn" + tier).innerHTML = shortenDimensions(player.autobuyers[tier-1].bulk*2)+"x bulk purchase<br>Cost: " + shortenDimensions(player.autobuyers[tier-1].cost) + " IP";
            }
            maxedAutobuy++;
        }
        else document.getElementById("buyerBtn" + tier).innerHTML = "40% smaller interval <br>Cost: " + shortenDimensions(player.autobuyers[tier-1].cost) + " IP"
        }
    }

    if (player.autobuyers[8].interval <= 100) {
        document.getElementById("buyerBtnTickSpeed").style.display = "none"
        document.getElementById("toggleBtnTickSpeed").style.display = "inline-block"
        maxedAutobuy++;
    }
    if (player.autobuyers[9].interval <= 100) {
        document.getElementById("buyerBtnDimBoost").style.display = "none"
        maxedAutobuy++;
    }
    if (player.autobuyers[10].interval <= 100) {
        document.getElementById("buyerBtnGalaxies").style.display = "none"
        maxedAutobuy++;
    }
    if (player.autobuyers[11].interval <= 100) {
        document.getElementById("buyerBtnInf").style.display = "none"
        maxedAutobuy++;
    }
    if (maxedAutobuy >= 9) giveAchievement("Age of Automation");
    if (maxedAutobuy >= 12) giveAchievement("Definitely not worth it");

    document.getElementById("buyerBtnTickSpeed").innerHTML = "40% smaller interval <br>Cost: " + player.autobuyers[8].cost + " IP"
    document.getElementById("buyerBtnDimBoost").innerHTML = "40% smaller interval <br>Cost: " + player.autobuyers[9].cost + " IP"
    document.getElementById("buyerBtnGalaxies").innerHTML = "40% smaller interval <br>Cost: " + player.autobuyers[10].cost + " IP"
    document.getElementById("buyerBtnInf").innerHTML = "40% smaller interval <br>Cost: " + player.autobuyers[11].cost + " IP"


    for (var i=0; i<8; i++) {
        if (player.autobuyers[i]%1 !== 0) document.getElementById("autoBuyer"+(i+1)).style.display = "inline-block"
    }
    if (player.autobuyers[8]%1 !== 0) document.getElementById("autoBuyerTickSpeed").style.display = "inline-block"
    if (player.autobuyers[9]%1 !== 0) document.getElementById("autoBuyerDimBoost").style.display = "inline-block"
    if (player.autobuyers[10]%1 !== 0) document.getElementById("autoBuyerGalaxies").style.display = "inline-block"
    if (player.autobuyers[11]%1 !== 0) document.getElementById("autoBuyerInf").style.display = "inline-block"
    if (player.autoSacrifice%1 !== 0) document.getElementById("autoBuyerSac").style.display = "inline-block"

    for (var i=1; i<=12; i++) {
        player.autobuyers[i-1].isOn = document.getElementById(i + "ison").checked;
    }

    player.autoSacrifice.isOn = document.getElementById("13ison").checked
    player.eternityBuyer.isOn = document.getElementById("eternityison").checked
    priorityOrder()
}


/*function loadAutoBuyers() {
    for (var i=0; i<12; i++) {
        if (player.autobuyers[i]%1 !== 0 ) {
            switch(i) {
                case 8: player.autobuyers[i].target = "buyTickSpeed()";
                case 9: player.autobuyers[i].target = "document.getElementById('softReset').click";
                case 10: player.autobuyers[i].target = "document.getElementById('secondSoftReset').click";
                case 11: player.autobuyers[i].target = "document.getElementById('bigcrunch').click";
                default: player.autobuyers[i].target = "buyOneDimension(" + i+1 + ")";
            }
        }
    }

}*/


function autoBuyerArray() {
    var tempArray = []
    for (var i=0; i<player.autobuyers.length && i<9; i++) {
        if (player.autobuyers[i]%1 !== 0 ) {
            tempArray.push(player.autobuyers[i])
        }
    }
    return tempArray;
}


var priority = []


function priorityOrder() {
    var tempArray = []
    var i = 1;
    while(tempArray.length != autoBuyerArray().length) {

        for (var x=0 ; x< autoBuyerArray().length; x++) {
            if (autoBuyerArray()[x].priority == i) tempArray.push(autoBuyerArray()[x])
        }
        i++;
    }
    priority = tempArray;
}

function fromValue(value) {
  if (value.includes(" ")) {
    let FormatList = [' K',' M',' B']
    for (let i=0;i<3;i++) {
        if (value.includes(FormatList[i])) return Decimal.fromMantissaExponent(parseFloat(value), i*3+3)
        //return parseFloat(value) + "e" + (i*3+3)
    }
    const prefixes = [['', 'U', 'D', 'T', 'Qd', 'Qt', 'Sx', 'Sp', 'O', 'N'],
    ['', 'Dc', 'Vg', 'Tg', 'Qa', 'Qi', 'Se', 'St', 'Og', 'Nn'],
    ['', 'Ce', 'Dn', 'Tc', 'Qe', 'Qu', 'Sc', 'Si', 'Oe', 'Ne']]
    const prefixes2 = ['', 'MI', 'MC', 'NA', 'PC', 'FM', ' ']
    let e = 0;
    let m,k,l;
    for (let i=1;i<5;i++) {
        if (value.includes(prefixes2[i])) {
            m = value.split(prefixes2[i])[1]
            for (k=0;k<3;k++) {
                for (l=1;l<10;l++) {
                    if (m.includes(prefixes[k][l])) break;
                }   
                if (l != 10) e += Math.pow(10,k)*l;
            }
            break;
        }
    }
    for (let i=1;i<=5;i++) {
        if (value.includes(prefixes2[i])) {
            for (let j=1;j+i<6;j++) {
                if (value.includes(prefixes2[i+j])) {
                    m=value.split(prefixes2[i+j])[1].split(prefixes2[i])[0]
                    if (m == "") e += Math.pow(1000,i);
                    else {
                        for (k=0;k<3;k++) {
                            for (l=1;l<10;l++) {
                                if (m.includes(prefixes[k][l])) break;
                            }   
                            if (l != 10) e += Math.pow(10,k+i*3)*l;
                        }
                    }
                    break;
                }
            }
        }
    }
    return Decimal.fromMantissaExponent(parseFloat(value), i*3+3)
    //return parseFloat(value) + "e" + (e*3+3)
  }
  if (!isFinite(parseFloat(value[value.length-1]))) { //needs testing
    const l = " abcdefghijklmnopqrstuvwxyz"
    const v = value.replace(parseFloat(value),"")
    let e = 0;
    for (let i=0;i<v.length;i++) {
        for (let j=1;j<27;j++) {
            if (v[i] == l[j]) e += Math.pow(26,i)*j
        }
    }
    return Decimal.fromMantissaExponent(parseFloat(value), e*3)
    //return parseFloat(value) + "e" + (e*3)
  }
  value = value.replace(',','')
  if (value.split("e")[0] === "") return Decimal.fromMantissaExponent(Math.pow(10,parseFloat(value.split("e")[1])%1), parseInt(value.split("e")[1]))
  return Decimal.fromString(value)
}

function updatePriorities() {
    auto = false;
    for (var x=0 ; x < autoBuyerArray().length; x++) {
        if (x < 9) autoBuyerArray()[x].priority = parseInt(document.getElementById("priority" + (x+1)).value)
    }
    player.autobuyers[9].priority = parseInt(document.getElementById("priority10").value)
    player.autobuyers[10].priority = parseInt(document.getElementById("priority11").value)
    player.autobuyers[11].priority = fromValue(document.getElementById("priority12").value)
    if (player.eternities < 10) {
        var bulk = Math.floor(Math.max(parseFloat(document.getElementById("bulkDimboost").value), 1))
    } else {
        var bulk = Math.max(parseFloat(document.getElementById("bulkDimboost").value), 0.05)
    }
    player.autobuyers[9].bulk = (isNaN(bulk)) ? 1 : bulk
    player.overXGalaxies = parseInt(document.getElementById("overGalaxies").value)
    player.autoSacrifice.priority = fromValue(document.getElementById("prioritySac").value)
    if (isNaN(player.autoSacrifice.priority) || player.autoSacrifice.priority === null || player.autoSacrifice.priority === undefined || player.autoSacrifice.priority <= 1) player.autoSacrifice.priority = Decimal.fromNumber(Number.EPSILON)
    player.autobuyers[10].bulk = parseFloat(document.getElementById("bulkgalaxy").value)
    const eterValue = fromValue(document.getElementById("priority13").value)
    if (!isNaN(eterValue)) player.eternityBuyer.limit = eterValue

    priorityOrder()
}

function updateCheckBoxes() {
    for (var i = 0; i < 12; i++) {
        if (player.autobuyers[i]%1 !== 0) {
            if (player.autobuyers[i].isOn) document.getElementById((i+1) + "ison").checked = "true";
            else document.getElementById((i+1) + "ison").checked = ""
        }
    }
    if (player.autoSacrifice.isOn) document.getElementById("13ison").checked = "true"
    else document.getElementById("13ison").checked = ""
    document.getElementById("eternityison").checked = player.eternityBuyer.isOn

}


function toggleAutoBuyers() {
    var bool = player.autobuyers[0].isOn
    for (var i = 0; i<12; i++) {
        if (player.autobuyers[i]%1 !== 0) {
            player.autobuyers[i].isOn = !bool
        }
    }
    player.autoSacrifice.isOn = !bool
    player.eternityBuyer.isOn = !bool
    updateCheckBoxes()
    updateAutobuyers()
}

function toggleBulk() {

    if (player.options.bulkOn) {
        player.options.bulkOn = false
        document.getElementById("togglebulk").innerHTML = "Enable bulk buy"
    } else {
        player.options.bulkOn = true
        document.getElementById("togglebulk").innerHTML = "Disable bulk buy"
    }
}

function toggleHotkeys() {
    if (player.options.hotkeys) {
        player.options.hotkeys = false
        document.getElementById("hotkeys").innerHTML = "Enable hotkeys"
    } else {
        player.options.hotkeys = true
        document.getElementById("hotkeys").innerHTML = "Disable hotkeys"
    }
}








function updateChallengeTimes() {
document.getElementById("challengetime2").innerHTML = "Challenge  " + 2 + " time record: " + timeDisplayShort(player.challengeTimes[0])
    document.getElementById("challengetime3").innerHTML = "Challenge  " + 3 + " time record: " + timeDisplayShort(player.challengeTimes[1])
    document.getElementById("challengetime4").innerHTML = "Challenge  " + 4 + " time record: " + timeDisplayShort(player.challengeTimes[6])
    document.getElementById("challengetime5").innerHTML = "Challenge  " + 5 + " time record: " + timeDisplayShort(player.challengeTimes[4])
    document.getElementById("challengetime6").innerHTML = "Challenge  " + 6 + " time record: " + timeDisplayShort(player.challengeTimes[8])
    document.getElementById("challengetime7").innerHTML = "Challenge  " + 7 + " time record: " + timeDisplayShort(player.challengeTimes[7])
    document.getElementById("challengetime8").innerHTML = "Challenge  " + 8 + " time record: " + timeDisplayShort(player.challengeTimes[9])
    document.getElementById("challengetime9").innerHTML = "Challenge  " + 9 + " time record: " + timeDisplayShort(player.challengeTimes[3])
    document.getElementById("challengetime10").innerHTML = "Challenge " + 10 + " time record: " + timeDisplayShort(player.challengeTimes[2])
    document.getElementById("challengetime11").innerHTML = "Challenge " + 11 + " time record: " + timeDisplayShort(player.challengeTimes[10])
    document.getElementById("challengetime12").innerHTML = "Challenge " + 12 + " time record: " + timeDisplayShort(player.challengeTimes[5])
	var temp = 0
	for (var i=0; i<11; i++) {
		temp += player.challengeTimes[i]
	}
	document.getElementById("challengetimesum").innerHTML = "Sum of challenge time records is " + timeDisplayShort(temp)
	
	temp = 0
    for (var i=0; i<8; i++) {
        document.getElementById("infchallengetime"+(i+1)).innerHTML = "Infinity Challenge " + (i+1) + " time record: " + timeDisplayShort(player.infchallengeTimes[i])
		temp += player.infchallengeTimes[i]
    }
	document.getElementById("infchallengetimesum").innerHTML = "Sum of infinity challenge time records is " + timeDisplayShort(temp)
    updateWorstChallengeTime();
}

var bestRunIppm = new Decimal(0)
function updateLastTenRuns() {
    let tempBest = 0
    var tempTime = new Decimal(0)
    var tempIP = new Decimal(0)
    for (var i=0; i<10;i++) {
        tempTime = tempTime.plus(player.lastTenRuns[i][0])
        tempIP = tempIP.plus(player.lastTenRuns[i][1])
    }
    tempTime = tempTime.dividedBy(10)
    tempIP = tempIP.dividedBy(10)
    for (var i=0; i<10; i++) {
        var ippm = player.lastTenRuns[i][1].dividedBy(player.lastTenRuns[i][0]/600)
        if (ippm.gt(tempBest)) tempBest = ippm
        var tempstring = shorten(ippm) + " IP/min"
        if (ippm<1) tempstring = shorten(ippm*60) + " IP/hour"
        document.getElementById("run"+(i+1)).innerHTML = "The infinity "+(i+1)+" infinities ago took " + timeDisplayShort(player.lastTenRuns[i][0]) + " and gave " + shortenDimensions(player.lastTenRuns[i][1]) +" IP. "+ tempstring
    }

    var ippm = tempIP.dividedBy(tempTime/600)
    var tempstring = shorten(ippm) + " IP/min"
    if (ippm<1) tempstring = shorten(ippm*60) + " IP/hour"
    document.getElementById("averagerun").innerHTML = "Last 10 infinities average time: "+ timeDisplayShort(tempTime)+" Average IP gain: "+shortenDimensions(tempIP)+" IP. "+tempstring

    if (tempBest.gte(1e8)) giveAchievement("Oh hey, you're still here");
    if (tempBest.gte(1e300)) giveAchievement("MAXIMUM OVERDRIVE");
    
    bestRunIppm = tempBest
}

var averageEp = new Decimal(0)
function updateLastTenEternities() {
    let tempBest = 0
    var tempTime = new Decimal(0)
    var tempEP = new Decimal(0)
    for (var i=0; i<10;i++) {
        tempTime = tempTime.plus(player.lastTenEternities[i][0])
        tempEP = tempEP.plus(player.lastTenEternities[i][1])
    }
    tempTime = tempTime.dividedBy(10)
    tempEP = tempEP.dividedBy(10)
    for (var i=0; i<10; i++) {
        var eppm = player.lastTenEternities[i][1].dividedBy(player.lastTenEternities[i][0]/600)
        if (eppm.gt(tempBest)) tempBest = eppm
        var tempstring = shorten(eppm) + " EP/min"
        if (eppm<1) tempstring = shorten(eppm*60) + " EP/hour"
        document.getElementById("eternityrun"+(i+1)).innerHTML = "The Eternity "+(i+1)+" eternities ago took " + timeDisplayShort(player.lastTenEternities[i][0]) + " and gave " + shortenDimensions(player.lastTenEternities[i][1]) +" EP. "+ tempstring
    }

    var eppm = tempEP.dividedBy(tempTime/600)
    var tempstring = shorten(eppm) + " EP/min"
    averageEp = tempEP
    if (eppm<1) tempstring = shorten(eppm*60) + " EP/hour"
    document.getElementById("averageEternityRun").innerHTML = "Last 10 eternities average time: "+ timeDisplayShort(tempTime)+" Average EP gain: "+shortenDimensions(tempEP)+" EP. "+tempstring
}

function addEternityTime(time, ep) {
    for (var i=player.lastTenEternities.length-1; i>0; i--) {
        player.lastTenEternities[i] = player.lastTenEternities[i-1]
    }
    player.lastTenEternities[0] = [time, ep]
}


document.getElementById("postInfinityButton").onclick = function() {document.getElementById("bigcrunch").click()}

function addTime(time, ip) {
    for (var i=player.lastTenRuns.length-1; i>0; i--) {
        player.lastTenRuns[i] = player.lastTenRuns[i-1]
    }
    player.lastTenRuns[0] = [time, ip]
}

var infchallengeTimes = 999999999

function checkForEndMe() {
    var temp = 0
    for (var i=0; i<11; i++) {
        temp += player.challengeTimes[i]
    }
    if (temp <= 1800) giveAchievement("Not-so-challenging")
    if (temp <= 50) giveAchievement("End me")
    var temp2 = 0
    for (var i=0; i<8;i++) {
        temp2 += player.infchallengeTimes[i]
    }
    infchallengeTimes = temp2
    if (temp2 <= 66.6) giveAchievement("Yes. This is hell.")
}


document.getElementById("bigcrunch").onclick = function () {
    var challNumber = parseInt(player.currentChallenge[player.currentChallenge.length-1])
    if (player.currentChallenge.length == 11) challNumber = parseInt("1"+player.currentChallenge[player.currentChallenge.length-1])
    if ((player.money.gte(Number.MAX_VALUE) && !player.currentChallenge.includes("post")) || (player.currentChallenge !== "" && player.money.gte(player.challengeTarget))) {
        if (player.thisInfinityTime <= 72000) giveAchievement("That's fast!");
        if (player.thisInfinityTime <= 6000) giveAchievement("That's faster!")
        if (player.thisInfinityTime <= 600) giveAchievement("Forever isn't that long")
        if (player.thisInfinityTime <= 2) giveAchievement("Blink of an eye")
        if (player.eightAmount == 0) giveAchievement("You didn't need it anyway");
        if (player.galaxies == 1) giveAchievement("Claustrophobic");
        if (player.galaxies == 0 && player.resets == 0) giveAchievement("Zero Deaths")
        if (player.currentChallenge == "challenge2" && player.thisInfinityTime <= 1800) giveAchievement("Many Deaths")
        if (player.currentChallenge == "challenge11" && player.thisInfinityTime <= 1800) giveAchievement("Gift from the Gods")
        if (player.currentChallenge == "challenge5" && player.thisInfinityTime <= 1800) giveAchievement("Is this hell?")
        if (player.currentChallenge == "challenge3" && player.thisInfinityTime <= 100) giveAchievement("You did this again just for the achievement right?");
        if (player.firstAmount == 1 && player.resets == 0 && player.galaxies == 0 && player.currentChallenge == "challenge12") giveAchievement("ERROR 909: Dimension not found")
        if (player.currentChallenge != "" && player.challengeTimes[challNumber-2] > player.thisInfinityTime) player.challengeTimes[challNumber-2] = player.thisInfinityTime
        if (player.currentChallenge.includes("post") && player.infchallengeTimes[challNumber-1] > player.thisInfinityTime) player.infchallengeTimes[challNumber-1] = player.thisInfinityTime
        if (player.currentChallenge == "postc5" && player.thisInfinityTime <= 100) giveAchievement("Hevipelle did nothing wrong")
        if ((player.bestInfinityTime > 600 && !player.break) || (player.currentChallenge != "" && !player.options.retryChallenge)) showTab("dimensions")
        if (player.currentChallenge == "challenge5") {
            try {
                kongregate.stats.submit('Challenge 9 time record (ms)', Math.floor(player.thisInfinityTime*100));

            } catch (err) {console.log("Couldn't load Kongregate API")}
        }
        if (player.currentChallenge != "" && !player.challenges.includes(player.currentChallenge)) {
            player.challenges.push(player.currentChallenge);
        }
        if (player.challenges.length > 12) giveAchievement("Infinitely Challenging");
        if (player.challenges.length == 20) giveAchievement("Anti-antichallenged");
        if (!player.break || player.currentChallenge != "") {
            var add = new Decimal(player.infMult.times(kongIPMult))
            if (player.timestudy.studies.includes(51)) add = add.times(1e15)
            player.infinityPoints = player.infinityPoints.plus(add);
            addTime(player.thisInfinityTime, add)
        }
        else {
            player.infinityPoints = player.infinityPoints.plus(gainedInfinityPoints())
            addTime(player.thisInfinityTime, gainedInfinityPoints())
            if (gainedInfinityPoints().gte(1e150)) giveAchievement("All your IP are belong to us")
            if (gainedInfinityPoints().gte(1e200) && player.thisInfinityTime <= 20) giveAchievement("Ludicrous Speed")
            if (gainedInfinityPoints().gte(1e250) && player.thisInfinityTime <= 200) giveAchievement("I brake for nobody")
        }
        if (!player.achievements.includes("r111") && player.lastTenRuns[9][1] != 1) {
            var n = 0;
            for (i=0; i<9; i++) {
                if (player.lastTenRuns[i][1].gte(player.lastTenRuns[i+1][1].times(1e300))) n++;
            }
            if (n == 9) giveAchievement("Yo dawg, I heard you liked infinities...")
        }
        let infGain = 1;
        if (player.thisInfinityTime > 50 && player.achievements.includes("r87")) infGain = 250;
        if (player.timestudy.studies.includes(32)) infGain *= Math.max(player.resets,1);
        if (player.currentEternityChall == "eterc4") {
            infGain = 1
            if (player.infinitied >= 16 - (ECTimesCompleted("eterc4")*4)) {
                document.getElementById("challfail").style.display = "block"
                setTimeout(exitChallenge, 500)
                giveAchievement("You're a mistake")
            }
        }
        if (autoS && auto) {
          if (gainedInfinityPoints().dividedBy(player.thisInfinityTime).gt(player.autoIP)) player.autoIP = gainedInfinityPoints().dividedBy(player.thisInfinityTime);
          if (player.thisInfinityTime<player.autoTime) player.autoTime = player.thisInfinityTime;
        }
        auto = autoS; //only allow autoing if prev crunch was autoed
        autoS = true;
        player = {
        money: new Decimal(10),
        tickSpeedCost: new Decimal(1000),
        tickspeed: new Decimal(1000),
        firstCost: new Decimal(10),
        secondCost: new Decimal(100),
        thirdCost: new Decimal(10000),
        fourthCost: new Decimal(1000000),
        fifthCost: new Decimal(1e9),
        sixthCost: new Decimal(1e13),
        seventhCost: new Decimal(1e18),
        eightCost: new Decimal(1e24),
        firstAmount: new Decimal(0),
        secondAmount: new Decimal(0),
        thirdAmount: new Decimal(0),
        fourthAmount: new Decimal(0),
        firstBought: 0,
        secondBought: 0,
        thirdBought: 0,
        fourthBought: 0,
        fifthAmount: new Decimal(0),
        sixthAmount: new Decimal(0),
        seventhAmount: new Decimal(0),
        eightAmount: new Decimal(0),
        fifthBought: 0,
        sixthBought: 0,
        seventhBought: 0,
        eightBought: 0,
        firstPow: new Decimal(1),
        secondPow: new Decimal(1),
        thirdPow: new Decimal(1),
        fourthPow: new Decimal(1),
        fifthPow: new Decimal(1),
        sixthPow: new Decimal(1),
        seventhPow: new Decimal(1),
        eightPow: new Decimal(1),
        sacrificed: new Decimal(0),
        achievements: player.achievements,
        challenges: player.challenges,
        currentChallenge: player.currentChallenge,
        infinityUpgrades: player.infinityUpgrades,
        infinityPoints: player.infinityPoints,
        infinitied: player.infinitied + infGain,
        infinitiedBank: player.infinitiedBank,
        totalTimePlayed: player.totalTimePlayed,
        bestInfinityTime: Math.min(player.bestInfinityTime, player.thisInfinityTime),
        thisInfinityTime: 0,
        resets: 0,
        galaxies: 0,
        tickDecrease: 0.9,
        totalmoney: player.totalmoney,
        interval: null,
        lastUpdate: player.lastUpdate,
        achPow: player.achPow,
        autobuyers: player.autobuyers,
        costMultipliers: [new Decimal(1e3), new Decimal(1e4), new Decimal(1e5), new Decimal(1e6), new Decimal(1e8), new Decimal(1e10), new Decimal(1e12), new Decimal(1e15)],
        tickspeedMultiplier: new Decimal(10),
        chall2Pow: 1,
        chall3Pow: new Decimal(0.01),
        newsArray: player.newsArray,
        matter: new Decimal(0),
        chall11Pow: new Decimal(1),
        partInfinityPoint: player.partInfinityPoint,
        partInfinitied: player.partInfinitied,
        break: player.break,
        challengeTimes: player.challengeTimes,
        infchallengeTimes: player.infchallengeTimes,
        lastTenRuns: player.lastTenRuns,
        lastTenEternities: player.lastTenEternities,
        infMult: player.infMult,
        infMultCost: player.infMultCost,
        tickSpeedMultDecrease: player.tickSpeedMultDecrease,
        tickSpeedMultDecreaseCost: player.tickSpeedMultDecreaseCost,
        dimensionMultDecrease: player.dimensionMultDecrease,
        dimensionMultDecreaseCost: player.dimensionMultDecreaseCost,
        version: player.version,
        postChallUnlocked: player.postChallUnlocked,
        postC4Tier: 1,
        postC3Reward: new Decimal(1),
        overXGalaxies: player.overXGalaxies,
        spreadingCancer: player.spreadingCancer,
        infDimensionsUnlocked: player.infDimensionsUnlocked,
        infinityPower: player.infinityPower,
        infinityDimension1: player.infinityDimension1,
        infinityDimension2: player.infinityDimension2,
        infinityDimension3: player.infinityDimension3,
        infinityDimension4: player.infinityDimension4,
        infinityDimension5: player.infinityDimension5,
        infinityDimension6: player.infinityDimension6,
        infinityDimension7: player.infinityDimension7,
        infinityDimension8: player.infinityDimension8,
        infDimBuyers: player.infDimBuyers,
        timeShards: player.timeShards,
        tickThreshold: player.tickThreshold,
        timeDimension1: player.timeDimension1,
        timeDimension2: player.timeDimension2,
        timeDimension3: player.timeDimension3,
        timeDimension4: player.timeDimension4,
        eternityPoints: player.eternityPoints,
        eternities: player.eternities,
        thisEternity: player.thisEternity,
        bestEternity: player.bestEternity,
        eternityUpgrades: player.eternityUpgrades,
        epmult: player.epmult,
        epmultCost: player.epmultCost,
        totalTickGained: player.totalTickGained,
        offlineProd: player.offlineProd,
        offlineProdCost: player.offlineProdCost,
        challengeTarget: player.challengeTarget,
        autoSacrifice: player.autoSacrifice,
        replicanti: player.replicanti,
        timestudy: player.timestudy,
        eternityChalls: player.eternityChalls,
        eternityChallGoal: player.eternityChallGoal,
        currentEternityChall: player.currentEternityChall,
        eternityChallUnlocked: player.eternityChallUnlocked,
        etercreq: player.etercreq,
        autoIP: player.autoIP,
        autoTime: player.autoTime,
        infMultBuyer: player.infMultBuyer,
        autoCrunchMode: player.autoCrunchMode,
        respec: player.respec,
        eternityBuyer: player.eternityBuyer,
        eterc8ids: player.eterc8ids,
        eterc8repl: player.eterc8repl,
        dimlife: player.dimlife,
        dead: player.dead,
        options: player.options
        };

        if (!player.options.retryChallenge) player.currentChallenge = ""

        if (player.resets == 0 && player.currentChallenge == "") {
            if (player.infinityUpgrades.includes("skipReset1")) player.resets++;
            if (player.infinityUpgrades.includes("skipReset2")) player.resets++;
            if (player.infinityUpgrades.includes("skipReset3")) player.resets++;
            if (player.infinityUpgrades.includes("skipResetGalaxy")) {
                player.resets++;
                if (player.galaxies == 0) player.galaxies = 1
            }
        }

        if (player.replicanti.unl && !player.achievements.includes("r95")) player.replicanti.amount = new Decimal(1)
        
        player.replicanti.galaxies = (player.timestudy.studies.includes(33)) ? Math.floor(player.replicanti.galaxies/2) :0

        player.firstPow = getDimensionBoostPower().pow(player.resets + 1)
        player.secondPow = getDimensionBoostPower().pow(player.resets)
        player.thirdPow = getDimensionBoostPower().pow(player.resets - 1).max(1)
        player.fourthPow = getDimensionBoostPower().pow(player.resets - 2).max(1)
        player.fifthPow = getDimensionBoostPower().pow(player.resets - 3).max(1)
        player.sixthPow = getDimensionBoostPower().pow(player.resets - 4).max(1)
        player.seventhPow = getDimensionBoostPower().pow(player.resets - 5).max(1)
        player.eightPow = getDimensionBoostPower().pow(player.resets - 6).max(1)


        if (player.currentChallenge == "challenge12" || player.currentChallenge == "postc1" || player.currentChallenge == "postc6") document.getElementById("matter").style.display = "block";
        else document.getElementById("matter").style.display = "none";
        
        document.getElementById("replicantireset").innerHTML = "Reset replicanti amount, but get a free galaxy<br>"+player.replicanti.galaxies + " replicated galaxies created."

        if (player.achievements.includes("r36")) player.tickspeed = player.tickspeed.times(0.98);
        if (player.achievements.includes("r45")) player.tickspeed = player.tickspeed.times(0.98);
        if (player.achievements.includes("r66")) player.tickspeed = player.tickspeed.times(0.98);
        if (player.achievements.includes("r83")) player.tickspeed = player.tickspeed.times(Decimal.pow(0.95,player.galaxies));
        clearInterval(player.interval);
        //updateInterval();
        if (player.eternities < 30) {
            document.getElementById("secondRow").style.display = "none";
            document.getElementById("thirdRow").style.display = "none";
            document.getElementById("tickSpeed").style.visibility = "hidden";
            document.getElementById("tickSpeedMax").style.visibility = "hidden";
            document.getElementById("tickLabel").style.visibility = "hidden";
            document.getElementById("tickSpeedAmount").style.visibility = "hidden";
            document.getElementById("fourthRow").style.display = "none";
            document.getElementById("fifthRow").style.display = "none";
            document.getElementById("sixthRow").style.display = "none";
            document.getElementById("seventhRow").style.display = "none";
            document.getElementById("eightRow").style.display = "none";
        }
        document.getElementById("matter").style.display = "none";
        document.getElementById("quickReset").style.display = "none";

        checkForEndMe()

        try {
            kongregate.stats.submit('Infinitied', getInfinitied());
            kongregate.stats.submit('Fastest Infinity time (ms)', Math.floor(player.bestInfinityTime * 100))

        } catch (err) {console.log("Couldn't load Kongregate API")}
        giveAchievement("To infinity!");
        if (player.infinitied >= 10) giveAchievement("That's a lot of infinites");
        if (player.infinitied >= 1 && !player.challenges.includes("challenge1")) player.challenges.push("challenge1");


        updateAutobuyers();
        if (player.challenges.includes("challenge1")) player.money = new Decimal(100)
        if (player.achievements.includes("r37")) player.money = new Decimal(1000);
        if (player.achievements.includes("r54")) player.money = new Decimal(2e5);
        if (player.achievements.includes("r55")) player.money = new Decimal(1e10);
        if (player.achievements.includes("r78")) player.money = new Decimal(1e25);
        if (player.challenges.length >= 2) giveAchievement("Daredevil");
        if (player.challenges.length == 12) giveAchievement("AntiChallenged");
        resetInfDimensions();
        player.tickspeed = player.tickspeed.times(Decimal.pow(getTickSpeedMultiplier(), player.totalTickGained))
        if (player.challenges.length == 20) giveAchievement("Anti-antichallenged");
        IPminpeak = new Decimal(0)
        

        if (player.eternities > 10 && player.currentEternityChall !== "eterc8" && player.currentEternityChall !== "eterc2" && player.currentEternityChall !== "eterc10") {
            for (var i=1;i<player.eternities-9 && i < 9; i++) {
                if (player.infDimBuyers[i-1]) {
                    buyMaxInfDims(i)
                    buyManyInfinityDimension(i)
                }
            }
        }

        if (player.eternities >= 40 && player.replicanti.auto[0] && player.currentEternityChall !== "eterc8") {
            while (player.infinityPoints.gte(player.replicanti.chanceCost) && player.currentEternityChall !== "eterc8" && player.replicanti.chance < 1) upgradeReplicantiChance()
        }

        if (player.eternities >= 60 && player.replicanti.auto[1] && player.currentEternityChall !== "eterc8") {
            while (player.infinityPoints.gte(player.replicanti.intervalCost) && player.currentEternityChall !== "eterc8" && ((player.timestudy.studies.includes(22)) ? player.replicanti.interval > 1 : player.replicanti.interval > 50)) upgradeReplicantiInterval()
        }

        if (player.eternities >= 80 && player.replicanti.auto[2] && player.currentEternityChall !== "eterc8") {
            while (player.infinityPoints.gte(player.replicanti.galCost)) upgradeReplicantiGalaxy()
        }

        Marathon2 = 0;

    }
  updateChallenges();
  updateChallengeTimes()
  updateLastTenRuns()


}


function respecToggle() {
    if (player.respec) {
        player.respec = false
        document.getElementById("respec").className = "storebtn"
    } else {
        player.respec = true
        document.getElementById("respec").className = "timestudybought"
    }
}

function eternity(force) {
    if ((player.infinityPoints.gte(Number.MAX_VALUE) && (!player.options.eternityconfirm || confirm("Eternity will reset everything except achievements and challenge records. You will also gain an Eternity point and unlock various upgrades."))) || force === true) {
        if (player.currentEternityChall !== "" && player.infinityPoints.lt(player.eternityChallGoal)) return false
        if (player.thisEternity<player.bestEternity) {
            player.bestEternity = player.thisEternity
            if (player.bestEternity < 300) giveAchievement("That wasn't an eternity");
        }
        if (player.thisEternity < 2) giveAchievement("Eternities are the new infinity")
        if (player.currentEternityChall == "eterc6" && ECTimesCompleted("eterc6") < 5) player.dimensionMultDecrease -= 0.2
        if (player.infinitied < 10) giveAchievement("Do you really need a guide for this?");
        if (Decimal.round(player.replicanti.amount) == 9) giveAchievement("We could afford 9");
        if (player.dimlife && !force) giveAchievement("8 nobody got time for that")
        if (player.dead && !force) giveAchievement("You're already dead.")
        if (player.infinitied <= 1 && !force) giveAchievement("Do I really need to infinity")
        temp = []
        player.eternityPoints = player.eternityPoints.plus(gainedEternityPoints())
        addEternityTime(player.thisEternity, gainedEternityPoints())
        if (player.currentEternityChall !== "") {
            if (player.eternityChalls[player.currentEternityChall] === undefined) {
                player.eternityChalls[player.currentEternityChall] = 1
            } else if (player.eternityChalls[player.currentEternityChall] < 5) player.eternityChalls[player.currentEternityChall] += 1
            player.etercreq = 0
            respecTimeStudies()
            if (Object.keys(player.eternityChalls).length === 10) {
                var eterchallscompletedtotal = 0;
                for (i=1; i<11; i++) {
                    eterchallscompletedtotal += player.eternityChalls["eterc"+i]
                }
                if (eterchallscompletedtotal === 50) {
                    giveAchievement("5 more eternities until the update");
                }
            }
        }
        for (var i=0; i<player.challenges.length; i++) {

            if (!player.challenges[i].includes("post") && player.eternities > 1) temp.push(player.challenges[i])
        }
        if (player.timestudy.studies.includes(191)) player.infinitiedBank += Math.floor(player.infinitied*0.05)
        player.challenges = temp
        player = {
            money: new Decimal(10),
            tickSpeedCost: new Decimal(1000),
            tickspeed: new Decimal(1000),
            firstCost: new Decimal(10),
            secondCost: new Decimal(100),
            thirdCost: new Decimal(10000),
            fourthCost: new Decimal(1000000),
            fifthCost: new Decimal(1e9),
            sixthCost: new Decimal(1e13),
            seventhCost: new Decimal(1e18),
            eightCost: new Decimal(1e24),
            firstAmount: new Decimal(0),
            secondAmount: new Decimal(0),
            thirdAmount: new Decimal(0),
            fourthAmount: new Decimal(0),
            firstBought: 0,
            secondBought: 0,
            thirdBought: 0,
            fourthBought: 0,
            fifthAmount: new Decimal(0),
            sixthAmount: new Decimal(0),
            seventhAmount: new Decimal(0),
            eightAmount: new Decimal(0),
            fifthBought: 0,
            sixthBought: 0,
            seventhBought: 0,
            eightBought: 0,
            firstPow: new Decimal(1),
            secondPow: new Decimal(1),
            thirdPow: new Decimal(1),
            fourthPow: new Decimal(1),
            fifthPow: new Decimal(1),
            sixthPow: new Decimal(1),
            seventhPow: new Decimal(1),
            eightPow: new Decimal(1),
            sacrificed: new Decimal(0),
            achievements: player.achievements,
            challenges: (player.eternities > 0) ? ["challenge1", "challenge2", "challenge3", "challenge4", "challenge5", "challenge6", "challenge7", "challenge8", "challenge9", "challenge10", "challenge11", "challenge12"] : [],
            currentChallenge: "",
            infinityUpgrades: player.infinityUpgrades,
            infinityPoints: new Decimal(0),
            infinitied: 0,
            infinitiedBank: player.infinitiedBank,
            totalTimePlayed: player.totalTimePlayed,
            bestInfinityTime: 9999999999,
            thisInfinityTime: 0,
            resets: (player.eternities > 2) ? 4 : 0,
            galaxies: (player.eternities > 2) ? 1 : 0,
            tickDecrease: 0.9,
            totalmoney: player.totalmoney,
            interval: null,
            lastUpdate: player.lastUpdate,
            achPow: player.achPow,
            autobuyers: (player.eternities > 0) ? player.autobuyers : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            partInfinityPoint: 0,
            partInfinitied: 0,
            break: player.eternities > 0 ? player.break : false,
            costMultipliers: [new Decimal(1e3), new Decimal(1e4), new Decimal(1e5), new Decimal(1e6), new Decimal(1e8), new Decimal(1e10), new Decimal(1e12), new Decimal(1e15)],
            tickspeedMultiplier: new Decimal(10),
            chall2Pow: 1,
            chall3Pow: new Decimal(0.01),
            newsArray: player.newsArray,
            matter: new Decimal(0),
            chall11Pow: new Decimal(1),
            challengeTimes: player.challengeTimes,
            infchallengeTimes: player.infchallengeTimes,
            lastTenRuns: [[600*60*24*31, new Decimal(1)], [600*60*24*31, new Decimal(1)], [600*60*24*31, new Decimal(1)], [600*60*24*31, new Decimal(1)], [600*60*24*31, new Decimal(1)], [600*60*24*31, new Decimal(1)], [600*60*24*31, new Decimal(1)], [600*60*24*31, new Decimal(1)], [600*60*24*31, new Decimal(1)], [600*60*24*31, new Decimal(1)]],
            lastTenEternities: player.lastTenEternities,
            infMult: new Decimal(1),
            infMultCost: new Decimal(10),
            tickSpeedMultDecrease: player.eternities > 18 ? player.tickSpeedMultDecrease : 10,
            tickSpeedMultDecreaseCost: player.eternities > 18 ? player.tickSpeedMultDecreaseCost : 3e6,
            dimensionMultDecrease: player.eternities > 18 ? player.dimensionMultDecrease : 10,
            dimensionMultDecreaseCost: player.eternities > 18 ? player.dimensionMultDecreaseCost : 1e8,
            version: player.version,
            postChallUnlocked: 0,
            postC4Tier: 1,
            postC3Reward: new Decimal(1),
            overXGalaxies: player.overXGalaxies,
            spreadingCancer: player.spreadingCancer,
            infDimensionsUnlocked: [false, false, false, false, false, false, false, false],
            infinityPower: new Decimal(1),
            infinityDimension1 : {
                cost: new Decimal(1e8),
                amount: new Decimal(0),
                bought: 0,
                power: new Decimal(1),
                baseAmount: 0
            },
            infinityDimension2 : {
                cost: new Decimal(1e9),
                amount: new Decimal(0),
                bought: 0,
                power: new Decimal(1),
                baseAmount: 0
            },
            infinityDimension3 : {
                cost: new Decimal(1e10),
                amount: new Decimal(0),
                bought: 0,
                power: new Decimal(1),
                baseAmount: 0
            },
            infinityDimension4 : {
                cost: new Decimal(1e20),
                amount: new Decimal(0),
                bought: 0,
                power: new Decimal(1),
                baseAmount: 0
            },
            infinityDimension5 : {
                cost: new Decimal(1e140),
                amount: new Decimal(0),
                bought: 0,
                power: new Decimal(1),
                baseAmount: 0
            },
            infinityDimension6 : {
                cost: new Decimal(1e200),
                amount: new Decimal(0),
                bought: 0,
                power: new Decimal(1),
                baseAmount: 0
            },
            infinityDimension7 : {
                cost: new Decimal(1e250),
                amount: new Decimal(0),
                bought: 0,
                power: new Decimal(1),
                baseAmount: 0
            },
            infinityDimension8 : {
                cost: new Decimal(1e280),
                amount: new Decimal(0),
                bought: 0,
                power: new Decimal(1),
                baseAmount: 0
            },
            infDimBuyers: player.infDimBuyers,
            timeShards: new Decimal(0),
            tickThreshold: new Decimal(1),
            totalTickGained: 0,
            timeDimension1: player.timeDimension1,
            timeDimension2: player.timeDimension2,
            timeDimension3: player.timeDimension3,
            timeDimension4: player.timeDimension4,
            eternityPoints: player.eternityPoints,
            eternities: player.eternities+1,
            thisEternity: 0,
            bestEternity: player.bestEternity,
            eternityUpgrades: player.eternityUpgrades,
            epmult: player.epmult,
            epmultCost: player.epmultCost,
            totalTickGained: 0,
            offlineProd: player.eternities > 18 ? player.offlineProd : 0,
            offlineProdCost: player.eternities > 18 ? player.offlineProdCost : 1e7,
            challengeTarget: 0,
            autoSacrifice: player.eternities > 5 ? player.autoSacrifice : 1,
            replicanti: {
                amount: player.eternities > 48 ? new Decimal(1) : new Decimal(0),
                unl: player.eternities > 48 ? true : false,
                chance: 0.01,
                chanceCost: new Decimal(1e150),
                interval: 1000,
                intervalCost: new Decimal(1e140),
                gal: 0,
                galaxies: 0,
                galCost: new Decimal(1e170),
                galaxybuyer: (player.eternities > 1) ? player.replicanti.galaxybuyer : undefined,
                auto: player.replicanti.auto
            },
            timestudy: player.timestudy,
            eternityChalls: player.eternityChalls,
            eternityChallGoal: new Decimal(Number.MAX_VALUE),
            currentEternityChall: "",
            eternityChallUnlocked: player.eternityChallUnlocked,
            etercreq: player.etercreq,
            autoIP: new Decimal(0),
            autoTime: 1e300,
            infMultBuyer: player.infMultBuyer,
            autoCrunchMode: player.autoCrunchMode,
            respec: player.respec,
            eternityBuyer: player.eternityBuyer,
            eterc8ids: 50,
            eterc8repl: 40,
            dimlife: true,
            dead: true,
            options: player.options
        };
        if (player.respec) respecTimeStudies()
        player.respec = false
        giveAchievement("Time is relative")
        if (player.eternities >= 100) giveAchievement("This mile took an Eternity");
        if (player.replicanti.unl) player.replicanti.amount = new Decimal(1)
        player.replicanti.galaxies = 0
        document.getElementById("respec").className = "storebtn"
        if (player.achievements.includes("r36")) player.tickspeed = player.tickspeed.times(0.98);
        if (player.achievements.includes("r45")) player.tickspeed = player.tickspeed.times(0.98);
        clearInterval(player.interval);
        //updateInterval();
        if (player.eternities <= 30) {
            document.getElementById("secondRow").style.display = "none";
            document.getElementById("thirdRow").style.display = "none";
            document.getElementById("tickSpeed").style.visibility = "hidden";
            document.getElementById("tickSpeedMax").style.visibility = "hidden";
            document.getElementById("tickLabel").style.visibility = "hidden";
            document.getElementById("tickSpeedAmount").style.visibility = "hidden";
            document.getElementById("fourthRow").style.display = "none";
        }
        document.getElementById("fifthRow").style.display = "none";
        document.getElementById("sixthRow").style.display = "none";
        document.getElementById("seventhRow").style.display = "none";
        document.getElementById("eightRow").style.display = "none";
        document.getElementById("matter").style.display = "none";
        document.getElementById("quickReset").style.display = "none";
        if (player.infinitied >= 1 && !player.challenges.includes("challenge1")) player.challenges.push("challenge1");
        var autobuyers = document.getElementsByClassName('autoBuyerDiv')
        if (player.eternities < 2) {
            for (var i=0; i<autobuyers.length;i++) autobuyers.item(i).style.display = "none"
            document.getElementById("buyerBtnDimBoost").style.display = "inline-block"
            document.getElementById("buyerBtnGalaxies").style.display = "inline-block"
            document.getElementById("buyerBtnInf").style.display = "inline-block"
            document.getElementById("buyerBtnTickSpeed").style.display = "inline-block"
        }
        updateAutobuyers();
        if (player.achievements.includes("r37")) player.money = new Decimal(1000);
        if (player.achievements.includes("r54")) player.money = new Decimal(2e5);
        if (player.achievements.includes("r55")) player.money = new Decimal(1e10);
        if (player.achievements.includes("r78")) player.money = new Decimal(1e25);
        if (player.achievements.includes("r85")) player.infMult = player.infMult.times(4);
        if (player.achievements.includes("r93")) player.infMult = player.infMult.times(4);
        if (player.achievements.includes("r104")) player.infinityPoints = new Decimal(2e25);
        resetInfDimensions();
        updateChallenges();
        updateChallengeTimes()
        updateLastTenRuns()
        updateLastTenEternities()
        var infchalls = Array.from(document.getElementsByClassName('infchallengediv'))
        for (var i = 0; i< infchalls.length; i++) infchalls[i].style.display = "none"
        IPminpeak = new Decimal(0)
        updateMilestones()
        resetTimeDimensions()
        if (player.eternities < 20) player.autobuyers[9].bulk = 1
        if (player.eternities < 20) document.getElementById("bulkDimboost").value = player.autobuyers[9].bulk
        if (player.eternities < 50) {
            document.getElementById("replicantidiv").style.display="none"
            document.getElementById("replicantiunlock").style.display="inline-block"
        }
        try {
            kongregate.stats.submit('Eternities', player.eternities);
        } catch (err) {console.log("Couldn't load Kongregate API")}
        if (player.eternities > 2 && player.replicanti.galaxybuyer === undefined) player.replicanti.galaxybuyer = false
        document.getElementById("infinityPoints1").innerHTML = "You have <span class=\"IPAmount1\">"+shortenDimensions(player.infinityPoints)+"</span> Infinity points."
        document.getElementById("infinityPoints2").innerHTML = "You have <span class=\"IPAmount2\">"+shortenDimensions(player.infinityPoints)+"</span> Infinity points."
        if (player.eternities < 2) document.getElementById("break").innerHTML = "BREAK INFINITY"
        document.getElementById("replicantireset").innerHTML = "Reset replicanti amount, but get a free galaxy<br>"+player.replicanti.galaxies + " replicated galaxies created."
        document.getElementById("eternitybtn").style.display = player.infinityPoints.gte(player.eternityChallGoal) ? "inline-block" : "none"
        document.getElementById("eternityPoints2").style.display = "inline-block"
        document.getElementById("eternitystorebtn").style.display = "inline-block"
        document.getElementById("infiMult").innerHTML = "Multiply infinity points from all sources by 2 <br>currently: "+shorten(player.infMult.times(kongIPMult)) +"x<br>Cost: "+shortenCosts(player.infMultCost)+" IP"
        updateEternityUpgrades()
        document.getElementById("totaltickgained").innerHTML = "You've gained "+shortenDimensions(player.totalTickGained)+" tickspeed upgrades."
        playerInfinityUpgradesOnEternity()
        document.getElementById("eternityPoints2").innerHTML = "You have <span class=\"EPAmount2\">"+shortenDimensions(player.eternityPoints)+"</span> Eternity points."
        updateEternityChallenges()
        if (player.eternities == 1) {
            showTab("dimensions")
            showDimTab("timedimensions")
        }
        if (player.replicanti.galaxybuyer) document.getElementById("replicantiresettoggle").innerHTML = "Auto galaxy ON"
        else document.getElementById("replicantiresettoggle").innerHTML = "Auto galaxy OFF"
        
    }
}

function exitChallenge() {
    if (player.currentChallenge !== "") {
        document.getElementById(player.currentChallenge).innerHTML = "Start"
        startChallenge("");
        updateChallenges();
    } else if (player.currentEternityChall !== "") {
        player.currentEternityChall = ""
        player.eternityChallGoal = new Decimal(Number.MAX_VALUE)
        eternity(true)
        updateEternityChallenges();
    }
}

function startChallenge(name, target) {
  if(player.options.challConf || name == "" ? true : confirm("You will start over with just your infinity upgrades and achievements. You need to reach infinity with special conditions. NOTE: The rightmost infinity upgrade column doesn't work on challenges.")) {
    if (player.currentChallenge != "") document.getElementById(player.currentChallenge).innerHTML = "Start"
    player = {
        money: new Decimal(10),
        tickSpeedCost: new Decimal(1000),
        tickspeed: new Decimal(1000),
        firstCost: new Decimal(10),
        secondCost: new Decimal(100),
        thirdCost: new Decimal(10000),
        fourthCost: new Decimal(1000000),
        fifthCost: new Decimal(1e9),
        sixthCost: new Decimal(1e13),
        seventhCost: new Decimal(1e18),
        eightCost: new Decimal(1e24),
        firstAmount: new Decimal(0),
        secondAmount: new Decimal(0),
        thirdAmount: new Decimal(0),
        fourthAmount: new Decimal(0),
        firstBought: 0,
        secondBought: 0,
        thirdBought: 0,
        fourthBought: 0,
        fifthAmount: new Decimal(0),
        sixthAmount: new Decimal(0),
        seventhAmount: new Decimal(0),
        eightAmount: new Decimal(0),
        fifthBought: 0,
        sixthBought: 0,
        seventhBought: 0,
        eightBought: 0,
        firstPow: new Decimal(1),
        secondPow: new Decimal(1),
        thirdPow: new Decimal(1),
        fourthPow: new Decimal(1),
        fifthPow: new Decimal(1),
        sixthPow: new Decimal(1),
        seventhPow: new Decimal(1),
        eightPow: new Decimal(1),
        sacrificed: new Decimal(0),
      achievements: player.achievements,
      challenges: player.challenges,
      currentChallenge: name,
      infinityUpgrades: player.infinityUpgrades,
      infinityPoints: player.infinityPoints,
      infinitied: player.infinitied,
      infinitiedBank: player.infinitiedBank,
      totalTimePlayed: player.totalTimePlayed,
      bestInfinityTime: player.bestInfinityTime,
      thisInfinityTime: 0,
      resets: 0,
      galaxies: 0,
      tickDecrease: 0.9,
      totalmoney: player.totalmoney,
      interval: null,
      lastUpdate: player.lastUpdate,
      achPow: player.achPow,
      autobuyers: player.autobuyers,
      costMultipliers: [new Decimal(1e3), new Decimal(1e4), new Decimal(1e5), new Decimal(1e6), new Decimal(1e8), new Decimal(1e10), new Decimal(1e12), new Decimal(1e15)],
      tickspeedMultiplier: new Decimal(10),
      chall2Pow: 1,
      chall3Pow: new Decimal(0.01),
      matter: new Decimal(0),
      newsArray: player.newsArray,
      chall11Pow: new Decimal(1),
      partInfinityPoint: player.partInfinityPoint,
      partInfinitied: player.partInfinitied,
      break: player.break,
      challengeTimes: player.challengeTimes,
      infchallengeTimes: player.infchallengeTimes,
      lastTenRuns: player.lastTenRuns,
      lastTenEternities: player.lastTenEternities,
      infMult: player.infMult,
      infMultCost: player.infMultCost,
      tickSpeedMultDecrease: player.tickSpeedMultDecrease,
      tickSpeedMultDecreaseCost: player.tickSpeedMultDecreaseCost,
      dimensionMultDecrease: player.dimensionMultDecrease,
      dimensionMultDecreaseCost: player.dimensionMultDecreaseCost,
      version: player.version,
      postChallUnlocked: player.postChallUnlocked,
      postC4Tier: 1,
      postC3Reward: new Decimal(1),
      overXGalaxies: player.overXGalaxies,
      spreadingCancer: player.spreadingCancer,
      infDimensionsUnlocked: player.infDimensionsUnlocked,
      infinityPower: player.infinityPower,
      infinityDimension1: player.infinityDimension1,
      infinityDimension2: player.infinityDimension2,
      infinityDimension3: player.infinityDimension3,
      infinityDimension4: player.infinityDimension4,
      infinityDimension5: player.infinityDimension5,
      infinityDimension6: player.infinityDimension6,
      infinityDimension7: player.infinityDimension7,
      infinityDimension8: player.infinityDimension8,
      infDimBuyers: player.infDimBuyers,
      timeShards: player.timeShards,
      tickThreshold: player.tickThreshold,
      timeDimension1: player.timeDimension1,
      timeDimension2: player.timeDimension2,
      timeDimension3: player.timeDimension3,
      timeDimension4: player.timeDimension4,
      eternityPoints: player.eternityPoints,
      eternities: player.eternities,
      thisEternity: player.thisEternity,
      bestEternity: player.bestEternity,
      eternityUpgrades: player.eternityUpgrades,
      epmult: player.epmult,
      epmultCost: player.epmultCost,
      totalTickGained: player.totalTickGained,
      offlineProd: player.offlineProd,
      offlineProdCost: player.offlineProdCost,
      challengeTarget: target,
      autoSacrifice: player.autoSacrifice,
      replicanti: player.replicanti,
      timestudy: player.timestudy,
      eternityChalls: player.eternityChalls,
      eternityChallGoal: player.eternityChallGoal,
      currentEternityChall: player.currentEternityChall,
      eternityChallUnlocked: player.eternityChallUnlocked,
      etercreq: player.etercreq,
      autoIP: player.autoIP,
      autoTime: player.autoTime,
      infMultBuyer: player.infMultBuyer,
      autoCrunchMode: player.autoCrunchMode,
      respec: player.respec,
      eternityBuyer: player.eternityBuyer,
      eterc8ids: player.eterc8ids,
      eterc8repl: player.eterc8repl,
      dimlife: player.dimlife,
      dead: player.dead,
      options: player.options
    };
	if (player.currentChallenge == "challenge10" || player.currentChallenge == "postc1") {
        player.thirdCost = new Decimal(100)
        player.fourthCost = new Decimal(500)
        player.fifthCost = new Decimal(2500)
        player.sixthCost = new Decimal(2e4)
        player.seventhCost = new Decimal(2e5)
        player.eightCost = new Decimal(4e6)
    }
    if (player.currentChallenge == "postc1") player.costMultipliers = [new Decimal(1e3),new Decimal(5e3),new Decimal(1e4),new Decimal(1.2e4),new Decimal(1.8e4),new Decimal(2.6e4),new Decimal(3.2e4),new Decimal(4.2e4)];
    if (player.currentChallenge == "postc2") {
        player.eightAmount = new Decimal(1);
        player.eightBought = 1;
        player.resets = 4;
    }

    if (player.replicanti.unl) player.replicanti.amount = new Decimal(1)
    player.replicanti.galaxies = 0

    IPminpeak = new Decimal(0)
    if (player.currentChallenge.includes("post")) player.break = true
    if (player.achievements.includes("r36")) player.tickspeed = player.tickspeed.times(0.98);
    if (player.achievements.includes("r45")) player.tickspeed = player.tickspeed.times(0.98);
    if (player.achievements.includes("r66")) player.tickspeed = player.tickspeed.times(0.98);
    if (player.achievements.includes("r83")) player.tickspeed = player.tickspeed.times(Decimal.pow(0.95,player.galaxies));
    clearInterval(player.interval);
    //updateInterval();
    if (player.eternities < 30) {
        document.getElementById("secondRow").style.display = "none";
        document.getElementById("thirdRow").style.display = "none";
        document.getElementById("tickSpeed").style.visibility = "hidden";
        document.getElementById("tickSpeedMax").style.visibility = "hidden";
        document.getElementById("tickLabel").style.visibility = "hidden";
        document.getElementById("tickSpeedAmount").style.visibility = "hidden";
        document.getElementById("fourthRow").style.display = "none";
    }
    document.getElementById("fifthRow").style.display= "none";
    document.getElementById("sixthRow").style.display= "none";
    document.getElementById("seventhRow").style.display= "none";
    document.getElementById("eightRow").style.display= "none";
    if (name == "challenge12" || player.currentChallenge == "postc1" || player.currentChallenge == "postc6") document.getElementById("matter").style.display = "block";
    else document.getElementById("matter").style.display = "none";

    if (name == "challenge12" || name == "challenge9" || name == "challenge5" || player.currentChallenge == "postc1" || player.currentChallenge == "postc4" || player.currentChallenge == "postc5" || player.currentChallenge == "postc6" || player.currentChallenge == "postc8") document.getElementById("quickReset").style.display = "inline-block";
    else document.getElementById("quickReset").style.display = "none";

    showTab('dimensions');
    updateChallenges();
    if (player.challenges.includes("challenge1")) player.money = new Decimal(100)
    if (player.achievements.includes("r37")) player.money = new Decimal(1000);
    if (player.achievements.includes("r54")) player.money = new Decimal(2e5);
    if (player.achievements.includes("r55")) player.money = new Decimal(1e10);
    if (player.achievements.includes("r78")) player.money = new Decimal(1e25);
    showTab("dimensions")
    try {
        kongregate.stats.submit('Infinitied', getInfinitied());
        kongregate.stats.submit('Fastest Infinity time', Math.floor(player.bestInfinityTime / 10))
    } catch (err) {console.log("Couldn't load Kongregate API")}

    if (player.infinitied >= 10) giveAchievement("That's a lot of infinites");

    document.getElementById("replicantireset").innerHTML = "Reset replicanti amount, but get a free galaxy<br>"+player.replicanti.galaxies + " replicated galaxies created."

    resetInfDimensions();
    player.tickspeed = player.tickspeed.times(Decimal.pow(getTickSpeedMultiplier(), player.totalTickGained))

    if (player.resets == 0 && player.currentChallenge == "") {
        if (player.infinityUpgrades.includes("skipReset1")) player.resets++;
        if (player.infinityUpgrades.includes("skipReset2")) player.resets++;
        if (player.infinityUpgrades.includes("skipReset3")) player.resets++;
        if (player.infinityUpgrades.includes("skipResetGalaxy")) {
            player.resets++;
            if (player.galaxies == 0) player.galaxies = 1
        }
    }
    if (player.currentChallenge.includes("post") && player.currentEternityChall !== "") giveAchievement("I wish I had gotten 7 eternities")
}
}

function unlockEChall(idx) {
    if (player.eternityChallUnlocked == 0) {
        player.eternityChallUnlocked = idx
        document.getElementById("eterc"+player.eternityChallUnlocked+"div").style.display = "inline-block"
        showTab("challenges")
        showChallengesTab("eternitychallenges")
        player.etercreq = idx
    }
    updateEternityChallenges()
    updateTimeStudyButtons()
}

function ECTimesCompleted(name) {
    if (player.eternityChalls[name] === undefined) return 0
    else return player.eternityChalls[name]
}

function canUnlockEC(idx, cost, study) {
    if (player.eternityChallUnlocked !== 0) return false
    if (!player.timestudy.studies.includes(study)) return false
    if (player.timestudy.theorem < cost) return false
    if (player.etercreq == idx) return true

    switch(idx) {
        case 1:
        if (player.eternities >= 25000+(ECTimesCompleted("eterc1")*25000)) return true
        break;

        case 2:
        if (player.totalTickGained >= 1300+(ECTimesCompleted("eterc2")*150)) return true
        break;

        case 3:
        if (player.eightAmount.gte(17300+(ECTimesCompleted("eterc3")*1250))) return true
        break;

        case 4:
        if (1e8 + (ECTimesCompleted("eterc4")*5e7) <= getInfinitied()) return true
        break;

        case 5:
        if (160 + (ECTimesCompleted("eterc5")*14) <= player.galaxies) return true
        break;

        case 6:
        if (40 + (ECTimesCompleted("eterc6")*5) <= player.replicanti.galaxies) return true
        break;

        case 7:
        if (player.money.gte(new Decimal("1e500000").times(new Decimal("1e300000").pow(ECTimesCompleted("eterc7"))))) return true
        break;

        case 8:
        if (player.infinityPoints.gte(new Decimal("1e4000").times(new Decimal("1e1000").pow(ECTimesCompleted("eterc8"))))) return true
        break;

        case 9:
        if (player.infinityPower.gte(new Decimal("1e17500").times(new Decimal("1e2000").pow(ECTimesCompleted("eterc9"))))) return true
        break;

        case 10:
        if (player.eternityPoints.gte(new Decimal("1e100").times(new Decimal("1e20").pow(ECTimesCompleted("eterc10"))))) return true
        break;
    }
}

function updateECUnlockButtons() {
    if (canUnlockEC(1, 30, 171)) {
        document.getElementById("ec1unl").className = "eternitychallengestudy"
    } else {
        document.getElementById("ec1unl").className = "eternitychallengestudylocked"
    }

    if (canUnlockEC(2, 35, 171)) {
        document.getElementById("ec2unl").className = "eternitychallengestudy"
    } else {
        document.getElementById("ec2unl").className = "eternitychallengestudylocked"
    }

    if (canUnlockEC(3, 40, 171)) {
        document.getElementById("ec3unl").className = "eternitychallengestudy"
    } else {
        document.getElementById("ec3unl").className = "eternitychallengestudylocked"
    }

    if (canUnlockEC(4, 70, 143)) {
        document.getElementById("ec4unl").className = "eternitychallengestudy"
    } else {
        document.getElementById("ec4unl").className = "eternitychallengestudylocked"
    }

    if (canUnlockEC(5, 130, 42)) {
        document.getElementById("ec5unl").className = "eternitychallengestudy"
    } else {
        document.getElementById("ec5unl").className = "eternitychallengestudylocked"
    }

    if (canUnlockEC(6, 85, 121)) {
        document.getElementById("ec6unl").className = "eternitychallengestudy"
    } else {
        document.getElementById("ec6unl").className = "eternitychallengestudylocked"
    }

    if (canUnlockEC(7, 115, 111)) {
        document.getElementById("ec7unl").className = "eternitychallengestudy"
    } else {
        document.getElementById("ec7unl").className = "eternitychallengestudylocked"
    }

    if (canUnlockEC(8, 115, 123)) {
        document.getElementById("ec8unl").className = "eternitychallengestudy"
    } else {
        document.getElementById("ec8unl").className = "eternitychallengestudylocked"
    }

    if (canUnlockEC(9, 415, 151)) {
        document.getElementById("ec9unl").className = "eternitychallengestudy"
    } else {
        document.getElementById("ec9unl").className = "eternitychallengestudylocked"
    }

    if (canUnlockEC(10, 550, 181)) {
        document.getElementById("ec10unl").className = "eternitychallengestudy"
    } else {
        document.getElementById("ec10unl").className = "eternitychallengestudylocked"
    }

    if (player.eternityChallUnlocked !== 0 )document.getElementById("ec"+player.eternityChallUnlocked+"unl").className = "eternitychallengestudybought"
}

document.getElementById("ec1unl").onclick = function() {
    if (canUnlockEC(1, 30, 171)) {
        unlockEChall(1)
        player.timestudy.theorem -= 30
        updateTheoremButtons()
        updateTimeStudyButtons()
        drawStudyTree()
    }
}

document.getElementById("ec2unl").onclick = function() {
    if (canUnlockEC(2, 35, 171)) {
        unlockEChall(2)
        player.timestudy.theorem -= 35
        updateTheoremButtons()
        updateTimeStudyButtons()
        drawStudyTree()
    }
}

document.getElementById("ec3unl").onclick = function() {
    if (canUnlockEC(3, 40, 171)) {
        unlockEChall(3)
        player.timestudy.theorem -= 40
        updateTheoremButtons()
        updateTimeStudyButtons()
        drawStudyTree()
    }
}

document.getElementById("ec4unl").onclick = function() {
    if (canUnlockEC(4, 70, 143)) {
        unlockEChall(4)
        player.timestudy.theorem -= 70
        updateTheoremButtons()
        updateTimeStudyButtons()
        drawStudyTree()
    }
}

document.getElementById("ec5unl").onclick = function() {
    if (canUnlockEC(5, 130, 42)) {
        unlockEChall(5)
        player.timestudy.theorem -= 130
        updateTheoremButtons()
        updateTimeStudyButtons()
        drawStudyTree()
    }
}

document.getElementById("ec6unl").onclick = function() {
    if (canUnlockEC(6, 85, 121)) {
        unlockEChall(6)
        player.timestudy.theorem -= 85
        updateTheoremButtons()
        updateTimeStudyButtons()
        drawStudyTree()
    }
}

document.getElementById("ec7unl").onclick = function() {
    if (canUnlockEC(7, 115, 111)) {
        unlockEChall(7)
        player.timestudy.theorem -= 115
        updateTheoremButtons()
        updateTimeStudyButtons()
        drawStudyTree()
    }
}

document.getElementById("ec8unl").onclick = function() {
    if (canUnlockEC(8, 115, 123)) {
        unlockEChall(8)
        player.timestudy.theorem -= 115
        updateTheoremButtons()
        updateTimeStudyButtons()
        drawStudyTree()
    }
}

document.getElementById("ec9unl").onclick = function() {
    if (canUnlockEC(9, 415, 151)) {
        unlockEChall(9)
        player.timestudy.theorem -= 415
        updateTheoremButtons()
        updateTimeStudyButtons()
        drawStudyTree()
    }
}

document.getElementById("ec10unl").onclick = function() {
    if (canUnlockEC(10, 550, 171)) {
        unlockEChall(10)
        player.timestudy.theorem -= 550
        updateTheoremButtons()
        updateTimeStudyButtons()
        drawStudyTree()
    }
}

function startEternityChallenge(name, startgoal, goalIncrease) {
    if (!name.includes(player.eternityChallUnlocked)) return
    if((player.options.challConf) || name == "" ? true :  (confirm("You will start over with just your time studies, eternity upgrades and achievements. You need to reach a set IP with special conditions."))) {
        player = {
            money: new Decimal(10),
            tickSpeedCost: new Decimal(1000),
            tickspeed: new Decimal(1000),
            firstCost: new Decimal(10),
            secondCost: new Decimal(100),
            thirdCost: new Decimal(10000),
            fourthCost: new Decimal(1000000),
            fifthCost: new Decimal(1e9),
            sixthCost: new Decimal(1e13),
            seventhCost: new Decimal(1e18),
            eightCost: new Decimal(1e24),
            firstAmount: new Decimal(0),
            secondAmount: new Decimal(0),
            thirdAmount: new Decimal(0),
            fourthAmount: new Decimal(0),
            firstBought: 0,
            secondBought: 0,
            thirdBought: 0,
            fourthBought: 0,
            fifthAmount: new Decimal(0),
            sixthAmount: new Decimal(0),
            seventhAmount: new Decimal(0),
            eightAmount: new Decimal(0),
            fifthBought: 0,
            sixthBought: 0,
            seventhBought: 0,
            eightBought: 0,
            firstPow: new Decimal(1),
            secondPow: new Decimal(1),
            thirdPow: new Decimal(1),
            fourthPow: new Decimal(1),
            fifthPow: new Decimal(1),
            sixthPow: new Decimal(1),
            seventhPow: new Decimal(1),
            eightPow: new Decimal(1),
            sacrificed: new Decimal(0),
            achievements: player.achievements,
            challenges: ["challenge1", "challenge2", "challenge3", "challenge4", "challenge5", "challenge6", "challenge7", "challenge8", "challenge9", "challenge10", "challenge11", "challenge12"],
            currentChallenge: "",
            infinityUpgrades: player.infinityUpgrades,
            infinityPoints: new Decimal(0),
            infinitied: 0,
            infinitiedBank: player.infinitiedBank,
            totalTimePlayed: player.totalTimePlayed,
            bestInfinityTime: 9999999999,
            thisInfinityTime: 0,
            resets: (player.eternities > 2) ? 4 : 0,
            galaxies: (player.eternities > 2) ? 1 : 0,
            tickDecrease: 0.9,
            totalmoney: player.totalmoney,
            interval: null,
            lastUpdate: player.lastUpdate,
            achPow: player.achPow,
            autobuyers: player.autobuyers,
            partInfinityPoint: 0,
            partInfinitied: 0,
            break: player.break,
            costMultipliers: [new Decimal(1e3), new Decimal(1e4), new Decimal(1e5), new Decimal(1e6), new Decimal(1e8), new Decimal(1e10), new Decimal(1e12), new Decimal(1e15)],
            tickspeedMultiplier: new Decimal(10),
            chall2Pow: 1,
            chall3Pow: new Decimal(0.01),
            newsArray: player.newsArray,
            matter: new Decimal(0),
            chall11Pow: new Decimal(1),
            challengeTimes: player.challengeTimes,
            infchallengeTimes: player.infchallengeTimes,
            lastTenRuns: [[600*60*24*31, new Decimal(1)], [600*60*24*31, new Decimal(1)], [600*60*24*31, new Decimal(1)], [600*60*24*31, new Decimal(1)], [600*60*24*31, new Decimal(1)], [600*60*24*31, new Decimal(1)], [600*60*24*31, new Decimal(1)], [600*60*24*31, new Decimal(1)], [600*60*24*31, new Decimal(1)], [600*60*24*31, new Decimal(1)]],
            lastTenEternities: player.lastTenEternities,
            infMult: new Decimal(1),
            infMultCost: new Decimal(10),
            tickSpeedMultDecrease: player.eternities > 18 ? player.tickSpeedMultDecrease : 10,
            tickSpeedMultDecreaseCost: player.eternities > 18 ? player.tickSpeedMultDecreaseCost : 3e6,
            dimensionMultDecrease: player.eternities > 18 ? player.dimensionMultDecrease : 10,
            dimensionMultDecreaseCost: player.eternities > 18 ? player.dimensionMultDecreaseCost : 1e8,
            version: player.version,
            postChallUnlocked: 0,
            postC4Tier: 1,
            postC3Reward: new Decimal(1),
            overXGalaxies: player.overXGalaxies,
            spreadingCancer: player.spreadingCancer,
            infDimensionsUnlocked: [false, false, false, false, false, false, false, false],
            infinityPower: new Decimal(1),
            infinityDimension1 : {
                cost: new Decimal(1e8),
                amount: new Decimal(0),
                bought: 0,
                power: new Decimal(1),
                baseAmount: 0
            },
            infinityDimension2 : {
                cost: new Decimal(1e9),
                amount: new Decimal(0),
                bought: 0,
                power: new Decimal(1),
                baseAmount: 0
            },
            infinityDimension3 : {
                cost: new Decimal(1e10),
                amount: new Decimal(0),
                bought: 0,
                power: new Decimal(1),
                baseAmount: 0
            },
            infinityDimension4 : {
                cost: new Decimal(1e20),
                amount: new Decimal(0),
                bought: 0,
                power: new Decimal(1),
                baseAmount: 0
            },
            infinityDimension5 : {
                cost: new Decimal(1e140),
                amount: new Decimal(0),
                bought: 0,
                power: new Decimal(1),
                baseAmount: 0
            },
            infinityDimension6 : {
                cost: new Decimal(1e200),
                amount: new Decimal(0),
                bought: 0,
                power: new Decimal(1),
                baseAmount: 0
            },
            infinityDimension7 : {
                cost: new Decimal(1e250),
                amount: new Decimal(0),
                bought: 0,
                power: new Decimal(1),
                baseAmount: 0
            },
            infinityDimension8 : {
                cost: new Decimal(1e280),
                amount: new Decimal(0),
                bought: 0,
                power: new Decimal(1),
                baseAmount: 0
            },
            infDimBuyers: player.infDimBuyers,
            timeShards: new Decimal(0),
            tickThreshold: new Decimal(1),
            totalTickGained: 0,
            timeDimension1: player.timeDimension1,
            timeDimension2: player.timeDimension2,
            timeDimension3: player.timeDimension3,
            timeDimension4: player.timeDimension4,
            eternityPoints: player.eternityPoints,
            eternities: player.eternities+1,
            thisEternity: 0,
            bestEternity: player.bestEternity,
            eternityUpgrades: player.eternityUpgrades,
            epmult: player.epmult,
            epmultCost: player.epmultCost,
            totalTickGained: 0,
            offlineProd: player.eternities > 18 ? player.offlineProd : 0,
            offlineProdCost: player.eternities > 18 ? player.offlineProdCost : 1e7,
            challengeTarget: 0,
            autoSacrifice: player.eternities > 5 ? player.autoSacrifice : 1,
            replicanti: {
                amount: player.eternities > 48 ? 1 : 0,
                unl: player.eternities > 48 ? true : false,
                chance: 0.01,
                chanceCost: new Decimal(1e150),
                interval: 1000,
                intervalCost: new Decimal(1e140),
                gal: 0,
                galaxies: 0,
                galCost: new Decimal(1e170),
                galaxybuyer: (player.eternities > 1) ? player.replicanti.galaxybuyer : undefined,
                auto: player.replicanti.auto
            },
            timestudy: player.timestudy,
            eternityChalls: player.eternityChalls,
            eternityChallGoal: startgoal.times(goalIncrease.pow(ECTimesCompleted(name))).max(startgoal),
            currentEternityChall: name,
            eternityChallUnlocked: player.eternityChallUnlocked,
            etercreq: player.etercreq,
            autoIP: new Decimal(0),
            autoTime: 1e300,
            infMultBuyer: player.infMultBuyer,
            autoCrunchMode: player.autoCrunchMode,
            respec: player.respec,
            eternityBuyer: player.eternityBuyer,
            eterc8ids: 50,
            eterc8repl: 40,
            dimlife: true,
            dead: true,
            options: player.options
        };
        
        if (player.replicanti.unl) player.replicanti.amount = new Decimal(1)
        player.replicanti.galaxies = 0
        if (player.achievements.includes("r36")) player.tickspeed = player.tickspeed.times(0.98);
        if (player.achievements.includes("r45")) player.tickspeed = player.tickspeed.times(0.98);
        clearInterval(player.interval);
        if (player.eternities < 30) {
            document.getElementById("secondRow").style.display = "none";
            document.getElementById("thirdRow").style.display = "none";
            document.getElementById("tickSpeed").style.visibility = "hidden";
            document.getElementById("tickSpeedMax").style.visibility = "hidden";
            document.getElementById("tickLabel").style.visibility = "hidden";
            document.getElementById("tickSpeedAmount").style.visibility = "hidden";
            document.getElementById("fourthRow").style.display = "none";
        }
        document.getElementById("fifthRow").style.display = "none";
        document.getElementById("sixthRow").style.display = "none";
        document.getElementById("seventhRow").style.display = "none";
        document.getElementById("eightRow").style.display = "none";
        document.getElementById("matter").style.display = "none";
        document.getElementById("quickReset").style.display = "none";
        var autobuyers = document.getElementsByClassName('autoBuyerDiv')
        if (player.eternities < 2) {
            for (var i=0; i<autobuyers.length;i++) autobuyers.item(i).style.display = "none"
            document.getElementById("buyerBtnDimBoost").style.display = "inline-block"
            document.getElementById("buyerBtnGalaxies").style.display = "inline-block"
            document.getElementById("buyerBtnInf").style.display = "inline-block"
            document.getElementById("buyerBtnTickSpeed").style.display = "inline-block"
        }
        updateAutobuyers();
        if (player.achievements.includes("r37")) player.money = new Decimal(1000);
        if (player.achievements.includes("r54")) player.money = new Decimal(2e5);
        if (player.achievements.includes("r55")) player.money = new Decimal(1e10);
        if (player.achievements.includes("r78")) player.money = new Decimal(1e25);
        if (player.achievements.includes("r85")) player.infMult = player.infMult.times(4);
        if (player.achievements.includes("r93")) player.infMult = player.infMult.times(4);
        if (player.achievements.includes("r104")) player.infinityPoints = new Decimal(2e25);
        resetInfDimensions();
        updateChallenges();
        updateChallengeTimes()
        updateLastTenRuns()
        updateLastTenEternities()
        var infchalls = Array.from(document.getElementsByClassName('infchallengediv'))
        for (var i = 0; i< infchalls.length; i++) infchalls[i].style.display = "none"
        IPminpeak = new Decimal(0)
        updateMilestones()
        resetTimeDimensions()
        if (player.eternities < 20) player.autobuyers[9].bulk = 1
        if (player.eternities < 20) document.getElementById("bulkDimboost").value = player.autobuyers[9].bulk
        if (player.eternities < 50) {
            document.getElementById("replicantidiv").style.display="none"
            document.getElementById("replicantiunlock").style.display="inline-block"
        }
        try {
            kongregate.stats.submit('Eternities', player.eternities);
        } catch (err) {console.log("Couldn't load Kongregate API")}
        if (player.eternities > 2 && player.replicanti.galaxybuyer === undefined) player.replicanti.galaxybuyer = false
        document.getElementById("infinityPoints1").innerHTML = "You have <span class=\"IPAmount1\">"+shortenDimensions(player.infinityPoints)+"</span> Infinity points."
        document.getElementById("infinityPoints2").innerHTML = "You have <span class=\"IPAmount2\">"+shortenDimensions(player.infinityPoints)+"</span> Infinity points."
        if (player.eternities < 2) document.getElementById("break").innerHTML = "BREAK INFINITY"
        document.getElementById("replicantireset").innerHTML = "Reset replicanti amount, but get a free galaxy<br>"+player.replicanti.galaxies + " replicated galaxies created."
        document.getElementById("eternitybtn").style.display = player.infinityPoints.gte(player.eternityChallGoal) ? "inline-block" : "none"
        document.getElementById("eternityPoints2").style.display = "inline-block"
        document.getElementById("eternitystorebtn").style.display = "inline-block"
        document.getElementById("infiMult").innerHTML = "Multiply infinity points from all sources by 2 <br>currently: "+shorten(player.infMult.times(kongIPMult)) +"x<br>Cost: "+shortenCosts(player.infMultCost)+" IP"
        updateEternityUpgrades()
        document.getElementById("totaltickgained").innerHTML = "You've gained "+shortenDimensions(player.totalTickGained)+" tickspeed upgrades."
        
        playerInfinityUpgradesOnEternity()
        document.getElementById("eternityPoints2").innerHTML = "You have <span class=\"EPAmount2\">"+shortenDimensions(player.eternityPoints)+"</span> Eternity points."
        updateEternityChallenges()
        if (player.replicanti.galaxybuyer) document.getElementById("replicantiresettoggle").innerHTML = "Auto galaxy ON"
        else document.getElementById("replicantiresettoggle").innerHTML = "Auto galaxy OFF"


    }
}

function getDimensionProductionPerSecond(tier) {
    let ret = Decimal.floor(player[TIER_NAMES[tier] + 'Amount']).times(getDimensionFinalMultiplier(tier)).times(1000).dividedBy(player.tickspeed)
    if (player.currentChallenge == "challenge7") {
        if (tier == 4) ret = player[TIER_NAMES[tier] + 'Amount'].floor().pow(1.3).times(getDimensionFinalMultiplier(tier)).dividedBy(player.tickspeed.dividedBy(1000))
        else if (tier == 2) ret = player[TIER_NAMES[tier] + 'Amount'].floor().pow(1.5).times(getDimensionFinalMultiplier(tier)).dividedBy(player.tickspeed.dividedBy(1000))
    }
    if (player.currentChallenge == "challenge2" || player.currentChallenge == "postc1") ret = ret.times(player.chall2Pow)
    return ret;
}




function calcPerSec(amount, pow, hasMult) {
    if (!hasMult) return Decimal.floor(amount).times(pow).times(player.achPow).times(timeMult()).times(player.chall2Pow).dividedBy(player.tickspeed.dividedBy(1000));
    else return Decimal.floor(amount).times(pow).times(player.achPow).times(dimMults()).times(timeMult()).times(player.chall2Pow).dividedBy(player.tickspeed.dividedBy(1000));
}

document.getElementById("quickReset").onclick = function () {
    if (player.resets == 0) player.resets--;
    else player.resets -= 2;
    softReset(1);
}


function updateInfPower() {
    document.getElementById("infPowAmount").innerHTML = shortenMoney(player.infinityPower)
    if (player.currentEternityChall == "eterc9") document.getElementById("infDimMultAmount").innerHTML = shortenMoney((Decimal.pow(Math.max(player.infinityPower.log2(), 1), 4)).max(1))
    else document.getElementById("infDimMultAmount").innerHTML = shortenMoney(player.infinityPower.pow(7))
    if (player.currentEternityChall == "eterc7") document.getElementById("infPowPerSec").innerHTML = "You are getting " +shortenDimensions(DimensionProduction(1))+" Seventh Dimensions per second."
    else document.getElementById("infPowPerSec").innerHTML = "You are getting " +shortenDimensions(DimensionProduction(1))+" Infinity Power per second."
}

function updateTimeShards() {
    document.getElementById("timeShardAmount").innerHTML = shortenMoney(player.timeShards)
    document.getElementById("tickThreshold").innerHTML = shortenMoney(player.tickThreshold)
    if (player.currentEternityChall == "eterc7") document.getElementById("timeShardsPerSec").innerHTML = "You are getting "+shortenDimensions(getTimeDimensionProduction(1))+" Eighth Infinity Dimensions per second."
    else document.getElementById("timeShardsPerSec").innerHTML = "You are getting "+shortenDimensions(getTimeDimensionProduction(1))+" Timeshards per second."
}


function getNewInfReq() {
    if (!player.infDimensionsUnlocked[0]) return new Decimal("1e1100")
    else if (!player.infDimensionsUnlocked[1]) return new Decimal("1e1900")
    else if (!player.infDimensionsUnlocked[2]) return new Decimal("1e2400")
    else if (!player.infDimensionsUnlocked[3]) return new Decimal("1e10500")
    else if (!player.infDimensionsUnlocked[4]) return new Decimal("1e30000")
    else if (!player.infDimensionsUnlocked[5]) return new Decimal("1e45000")
    else if (!player.infDimensionsUnlocked[6]) return new Decimal("1e54000")
    else return new Decimal("1e60000")
}


function newDimension() {
    if (player.money.gte(getNewInfReq())) {
        if (!player.infDimensionsUnlocked[0]) player.infDimensionsUnlocked[0] = true
        else if (!player.infDimensionsUnlocked[1]) player.infDimensionsUnlocked[1] = true
        else if (!player.infDimensionsUnlocked[2]) player.infDimensionsUnlocked[2] = true
        else if (!player.infDimensionsUnlocked[3]) {
            player.infDimensionsUnlocked[3] = true
            giveAchievement("NEW DIMENSIONS???")
        }
        else if (!player.infDimensionsUnlocked[4]) player.infDimensionsUnlocked[4] = true
        else if (!player.infDimensionsUnlocked[5]) player.infDimensionsUnlocked[5] = true
        else if (!player.infDimensionsUnlocked[6]) player.infDimensionsUnlocked[6] = true
        else if (!player.infDimensionsUnlocked[7]) {
            player.infDimensionsUnlocked[7] = true
            giveAchievement("0 degrees from infinity")
        }
    }
}
var blink = true
setInterval(function() {
    $.getJSON('version.txt', function(data){
        //data is actual content of version.txt, so
        //do whatever you need with it
        //I'd compare it with last result and if it's different
        //show the message received and nag for attention
        //like this:
        if (data.version > player.version) {
            player.version = data.version
            document.getElementById("update").style.display = "block"
            document.getElementById("updatePopup").innerHTML = data.message
            //or some more resilient method
            //like forced news bar with message running over and over
        }
    })
}, 60000)





setInterval(function() {
    try {
        kongregate.stats.submit('Log10 of total antimatter', player.totalmoney.e);
        kongregate.stats.submit('Log10 of Infinity Points', player.infinityPoints.e);
    } catch (err) {console.log("Couldn't load Kongregate API")}
}, 10000)

var nextAt = [new Decimal("1e2000"), new Decimal("1e5000"), new Decimal("1e12000"), new Decimal("1e14000"), new Decimal("1e18000"), new Decimal("1e20000"), new Decimal("1e23000"), new Decimal("1e28000")]

var goals = [new Decimal("1e850"), new Decimal("1e10500"), new Decimal("1e5000"), new Decimal("1e13000"), new Decimal("1e11111"), new Decimal("2e22222"), new Decimal("1e10000"), new Decimal("1e27000")]
setInterval(function() {
    if (getDimensionFinalMultiplier(1).gte(new Decimal("1e308")) &&
        getDimensionFinalMultiplier(2).gte(new Decimal("1e308")) &&
        getDimensionFinalMultiplier(3).gte(new Decimal("1e308")) &&
        getDimensionFinalMultiplier(4).gte(new Decimal("1e308")) &&
        getDimensionFinalMultiplier(5).gte(new Decimal("1e308")) &&
        getDimensionFinalMultiplier(6).gte(new Decimal("1e308")) &&
        getDimensionFinalMultiplier(7).gte(new Decimal("1e308")) &&
        getDimensionFinalMultiplier(8).gte(new Decimal("1e308"))) giveAchievement("Can't hold all these infinities")

    if (getDimensionFinalMultiplier(1).lt(getDimensionFinalMultiplier(2)) &&
        getDimensionFinalMultiplier(2).lt(getDimensionFinalMultiplier(3)) &&
        getDimensionFinalMultiplier(3).lt(getDimensionFinalMultiplier(4)) &&
        getDimensionFinalMultiplier(4).lt(getDimensionFinalMultiplier(5)) &&
        getDimensionFinalMultiplier(5).lt(getDimensionFinalMultiplier(6)) &&
        getDimensionFinalMultiplier(6).lt(getDimensionFinalMultiplier(7)) &&
        getDimensionFinalMultiplier(7).lt(getDimensionFinalMultiplier(8))) giveAchievement("How the antitables have turned")



    if (player.infinitied == 0 && player.infinityPoints.lt(new Decimal(1e50)) && player.eternities == 0) document.getElementById("infinityPoints2").style.display = "none"
    else document.getElementById("infinityPoints2").style.display = "inline-block"

    if (blink && !player.achievements.includes("r78")) {
        document.getElementById("Blink of an eye").style.display = "none"
        blink = false
    }
    else {
        document.getElementById("Blink of an eye").style.display = "block"
        blink = true
    }
    if (player.challenges.includes("postc1")) {
        let temp = 1
        for (var i=0; i < player.challenges.length; i++) {
            if (player.challenges[i].includes("post")) {
                temp *= 1.3
                document.getElementById("infchallengesbtn").style.display = "inline-block"
            }
        }
        infDimPow = temp
    } else {
        document.getElementById("infchallengesbtn").style.display = "none"
    }

    if (player.money.gte(new Decimal("1e2000"))) document.getElementById("challTabButtons").style.display = "table"

    document.getElementById("kongip").innerHTML = "Double your IP gain from all sources (additive). Forever. Currently: x"+kongIPMult+", next: x"+(kongIPMult==1? 2: kongIPMult+2)
    document.getElementById("kongdim").innerHTML = "Double all your dimension multipliers (dimensions 1-8) (multiplicative). Forever. Currently: x"+kongDimMult+", next: x"+(kongDimMult*2)
    document.getElementById("eternityPoints2").innerHTML = "You have <span class=\"EPAmount2\">"+shortenDimensions(player.eternityPoints)+"</span> Eternity points."

    document.getElementById("eternitybtn").style.display = (player.infinityPoints.gte(player.eternityChallGoal) && player.infDimensionsUnlocked[7]) ? "inline-block" : "none"

    
    if (player.eternities !== 0)document.getElementById("eternitystorebtn").style.display = "inline-block"
    for (var i=1; i <=8; i++) {
        document.getElementById("postc"+i+"goal").innerHTML = "Goal: "+shortenCosts(goals[i-1])
    }

    if (player.replicanti.galaxybuyer !== undefined) document.getElementById("replicantiresettoggle").style.display = "inline-block"

    if (player.eternities > 0) document.getElementById("infmultbuyer").style.display = "inline-block"
    if (player.eternities > 4) document.getElementById("togglecrunchmode").style.display = "inline-block"
    if (player.eternities > 8) document.getElementById("galaxybulk").style.display = "inline-block"
    
    document.getElementById("replicantichance").className = (player.infinityPoints.gte(player.replicanti.chanceCost) && player.replicanti.chance < 1) ? "storebtn" : "unavailablebtn"
    document.getElementById("replicantiinterval").className = (player.infinityPoints.gte(player.replicanti.intervalCost) && ((player.replicanti.interval !== 50) || player.timestudy.studies.includes(22)) && (player.replicanti.interval !== 1)) ? "storebtn" : "unavailablebtn"
    document.getElementById("replicantimax").className = (player.infinityPoints.gte(player.replicanti.galCost)) ? "storebtn" : "unavailablebtn"
    document.getElementById("replicantireset").className = (player.replicanti.galaxies < player.replicanti.gal && player.replicanti.amount.gte(Number.MAX_VALUE)) ? "storebtn" : "unavailablebtn"
    document.getElementById("replicantiunlock").className = (player.infinityPoints.gte(1e140)) ? "storebtn" : "unavailablebtn"
    updateTheoremButtons()

    if (getTickSpeedMultiplier() < 0.001) giveAchievement("Do you even bend time bro?")

    if (player.eternities > 9) document.getElementById("bulklabel").innerHTML="Buy max dimboosts every X seconds:"
    else document.getElementById("bulklabel").innerHTML="Bulk DimBoost Amount:"

    if (player.eternities > 10) {
        for (var i=1;i<player.eternities-9 && i < 9; i++) {
            document.getElementById("infauto"+i).style.visibility = "visible"
        }
        document.getElementById("toggleallinfdims").style.visibility = "visible"
    }

    if (player.eternities !== 0) document.getElementById("eternityconf").style.display = "inline-block"
    if (player.eternities >= 40) document.getElementById("replauto1").style.visibility = "visible"
    if (player.eternities >= 60) document.getElementById("replauto2").style.visibility = "visible"
    if (player.eternities >= 80) document.getElementById("replauto3").style.visibility = "visible"
    if (player.eternities >= 100) document.getElementById("autoBuyerEter").style.display = "inline-block"

    if (player.eternities == 0) document.getElementById("pasteternities").style.display = "none"
    else document.getElementById("pasteternities").style.display = "inline-block"
    if (player.challenges.length > 1) document.getElementById("challengetimesbtn").style.display = "inline-block"
    else document.getElementById("challengetimesbtn").style.display = "none"
    if (player.infinitied > 0  || player.eternities > 0) document.getElementById("pastinfs").style.display = "inline-block"
    else document.getElementById("pastinfs").style.display = "none"

    if (player.eternities > 10 && player.currentEternityChall !== "eterc8") {
        for (var i=1;i<player.eternities-9 && i < 9; i++) {
            if (player.infDimBuyers[i-1]) {
                buyMaxInfDims(i)
                buyManyInfinityDimension(i)
            }
        }
    }

    if (player.eternities >= 40 && player.replicanti.auto[0] && player.currentEternityChall !== "eterc8") {
        while (player.infinityPoints.gte(player.replicanti.chanceCost) && player.currentEternityChall !== "eterc8" && player.replicanti.chance < 1) upgradeReplicantiChance()
    }

    if (player.eternities >= 60 && player.replicanti.auto[1] && player.currentEternityChall !== "eterc8") {
        while (player.infinityPoints.gte(player.replicanti.intervalCost) && player.currentEternityChall !== "eterc8" && ((player.timestudy.studies.includes(22)) ? player.replicanti.interval > 1 : player.replicanti.interval > 50)) upgradeReplicantiInterval()
    }

    if (player.eternities >= 80 && player.replicanti.auto[2] && player.currentEternityChall !== "eterc8") {
        while (player.infinityPoints.gte(player.replicanti.galCost)) upgradeReplicantiGalaxy()
    }

    document.getElementById("eterc1goal").innerHTML = "Goal: "+shortenCosts(new Decimal("1e1800").times(new Decimal("1e200").pow(ECTimesCompleted("eterc1"))).max(new Decimal("1e1800"))) + " IP"
    document.getElementById("eterc1completed").innerHTML = "Completed "+ECTimesCompleted("eterc1")+" times."

    document.getElementById("eterc2goal").innerHTML = "Goal: "+shortenCosts(new Decimal("1e975").times(new Decimal("1e175").pow(ECTimesCompleted("eterc2"))).max(new Decimal("1e975"))) + " IP"
    document.getElementById("eterc2completed").innerHTML = "Completed "+ECTimesCompleted("eterc2")+" times."

    document.getElementById("eterc3goal").innerHTML = "Goal: "+shortenCosts(new Decimal("1e600").times(new Decimal("1e75").pow(ECTimesCompleted("eterc3"))).max(new Decimal("1e575"))) + " IP"
    document.getElementById("eterc3completed").innerHTML = "Completed "+ECTimesCompleted("eterc3")+" times."

    document.getElementById("eterc4goal").innerHTML = "Goal: "+shortenCosts(new Decimal("1e2750").times(new Decimal("1e550").pow(ECTimesCompleted("eterc4"))).max(new Decimal("1e2750"))) + " IP in less than "+(16 - (ECTimesCompleted("eterc4")*4))+" infinities."
    document.getElementById("eterc4completed").innerHTML = "Completed "+ECTimesCompleted("eterc4")+" times."

    document.getElementById("eterc5goal").innerHTML = "Goal: "+shortenCosts(new Decimal("1e750").times(new Decimal("1e400").pow(ECTimesCompleted("eterc5"))).max(new Decimal("1e750"))) + " IP"
    document.getElementById("eterc5completed").innerHTML = "Completed "+ECTimesCompleted("eterc5")+" times."

    document.getElementById("eterc6goal").innerHTML = "Goal: "+shortenCosts(new Decimal("1e850").times(new Decimal("1e250").pow(ECTimesCompleted("eterc6"))).max(new Decimal("1e850"))) + " IP"
    document.getElementById("eterc6completed").innerHTML = "Completed "+ECTimesCompleted("eterc6")+" times."

    document.getElementById("eterc7goal").innerHTML = "Goal: "+shortenCosts(new Decimal("1e2000").times(new Decimal("1e530").pow(ECTimesCompleted("eterc7"))).max(new Decimal("1e2000"))) + " IP"
    document.getElementById("eterc7completed").innerHTML = "Completed "+ECTimesCompleted("eterc7")+" times."

    document.getElementById("eterc8goal").innerHTML = "Goal: "+shortenCosts(new Decimal("1e1300").times(new Decimal("1e900").pow(ECTimesCompleted("eterc8"))).max(new Decimal("1e1300"))) + " IP"
    document.getElementById("eterc8completed").innerHTML = "Completed "+ECTimesCompleted("eterc8")+" times."

    document.getElementById("eterc9goal").innerHTML = "Goal: "+shortenCosts(new Decimal("1e1750").times(new Decimal("1e250").pow(ECTimesCompleted("eterc9"))).max(new Decimal("1e1750"))) + " IP"
    document.getElementById("eterc9completed").innerHTML = "Completed "+ECTimesCompleted("eterc9")+" times."

    document.getElementById("eterc10goal").innerHTML = "Goal: "+shortenCosts(new Decimal("1e3000").times(new Decimal("1e300").pow(ECTimesCompleted("eterc10"))).max(new Decimal("1e3000"))) + " IP"
    document.getElementById("eterc10completed").innerHTML = "Completed "+ECTimesCompleted("eterc10")+" times."
    updateECUnlockButtons()




    if (player.currentEternityChall == "eterc8") {
        document.getElementById("eterc8repl").style.display = "block"
        document.getElementById("eterc8ids").style.display = "block"
        document.getElementById("eterc8repl").innerHTML = "You have "+player.eterc8repl+" purchases left." 
        document.getElementById("eterc8ids").innerHTML = "You have "+player.eterc8ids+" purchases left." 
    } else {
        document.getElementById("eterc8repl").style.display = "none"
        document.getElementById("eterc8ids").style.display = "none"
    }
    

    document.getElementById("infinitiedBank").style.display = (player.infinitiedBank > 0) ? "block" : "none"
    document.getElementById("infinitiedBank").innerHTML = "You have " + player.infinitiedBank.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " banked infinities."

    if (infchallengeTimes < 7.5) giveAchievement("Never again")
    if (player.infinityPoints.gte(new Decimal("1e22000")) && player.timestudy.studies.length == 0) giveAchievement("What do I have to do to get rid of you")
    if (player.replicanti.galaxies >= 180*player.galaxies && player.galaxies > 0) giveAchievement("Popular music")
    if (player.eternityPoints.gte(Number.MAX_VALUE)) giveAchievement("But I wanted another prestige layer...")
    if (player.infinityPoints.gte(1e100) && player.firstAmount.equals(0) && player.infinitied == 0 && player.resets <= 4 && player.galaxies <= 1 && player.replicanti.galaxies == 0) giveAchievement("Like feasting on a behind")
    if (player.infinityPoints.gte('9.99999e999')) giveAchievement("This achievement doesn't exist II");
    if (player.infinityPoints.gte('1e30008')) giveAchievement("Can you get infinite IP?");
    if (player.infinitied > 2e6) giveAchievement("2 Million Infinities")
    if (player.money.gte("9.9999e9999")) giveAchievement("This achievement doesn't exist")
    if (player.money.gte("1e35000")) giveAchievement("I got a few to spare")
    if (player.infinityPower.gt(1)) giveAchievement("A new beginning.");
    if (player.infinityPower.gt(1e6)) giveAchievement("1 million is a lot"); //TBD
    if (player.infinityPower.gt(1e260)) giveAchievement("Minute of infinity"); //TBD
    if (player.totalTickGained >= 308) giveAchievement("Infinite time");
    if (player.firstPow >= 10e30) giveAchievement("I forgot to nerf that")
    if (player.money >= 10e79) giveAchievement("Antimatter Apocalypse")
    if (player.totalTimePlayed >= 10 * 60 * 60 * 24 * 8) giveAchievement("One for each dimension")
    if (player.seventhAmount > 1e12) giveAchievement("Multidimensional");
    if (player.tickspeed.lt(1e-26)) giveAchievement("Faster than a potato");
    if (player.tickspeed.lt(1e-55)) giveAchievement("Faster than a squared potato");

}, 1000)

function fact(v) {
    let ret=1;
    do {ret *= v} while (--v > 1)
    return ret;
}


var postC2Count = 0;
var IPminpeak = new Decimal(0)
var replicantiTicks = 0


function gameLoop(diff) {
    var thisUpdate = new Date().getTime();
    if (thisUpdate - player.lastUpdate >= 21600000) giveAchievement("Don't you dare to sleep")
    if (typeof diff === 'undefined') var diff = Math.min(thisUpdate - player.lastUpdate, 21600000);
    diff = diff / 100;
    if (diff < 0) diff = 1;
    if (player.thisInfinityTime < -10) player.thisInfinityTime = Infinity
    if (player.bestInfinityTime < -10) player.bestInfinityTime = Infinity
    if (diff > player.autoTime && !player.break) player.infinityPoints = player.infinityPoints.plus(player.autoIP.times(diff -player.autoTime))
    /*if (player.currentChallenge == "postc6" && player.matter.gte(1)) player.matter = player.matter.plus(diff/10)
    else */
    player.matter = player.matter.times(Decimal.pow((1.03 + player.resets/200 + player.galaxies/100), diff));
    if (player.matter.gt(player.money) && (player.currentChallenge == "challenge12" || player.currentChallenge == "postc1")) {
        if (player.resets > 0) player.resets--;
        softReset(0);
    }

    if (player.currentChallenge == "postc8") postc8Mult = postc8Mult.times(Math.pow(0.000000046416, diff))

    if (player.currentChallenge == "challenge3" || player.matter.gte(1)) player.chall3Pow = player.chall3Pow.times(Decimal.pow(1.00038, diff));
    player.chall2Pow = Math.min(player.chall2Pow + diff/1800, 1);
    if (player.currentChallenge == "postc2") {
        postC2Count++;
        if (postC2Count >= 8 || diff > 80) {
            sacrifice();
            postC2Count = 0;
        }
    }
    if (player.infinityUpgrades.includes("passiveGen")) player.partInfinityPoint += diff / player.bestInfinityTime;
    if (player.partInfinityPoint >= 100) {
        player.infinityPoints = player.infinityPoints.plus(player.infMult.times(kongIPMult * (player.partInfinityPoint/10)));
        player.partInfinityPoint = 0;
    }

    if (player.partInfinityPoint >= 10) {
        player.partInfinityPoint -= 10;
        player.infinityPoints = player.infinityPoints.plus(player.infMult.times(kongIPMult));
    }

    

    if (player.infinityUpgrades.includes("infinitiedGeneration") && player.currentEternityChall !== "eterc4") player.partInfinitied += diff / player.bestInfinityTime;
    if (player.partInfinitied >= 50) {
        player.infinitied += Math.floor(player.partInfinitied/5)
        player.partInfinitied = 0;
    }

    if (player.partInfinitied >= 5) {
        player.partInfinitied -= 5;
        player.infinitied ++;
    }
    
    player.infinityPoints = player.infinityPoints.plus(bestRunIppm.times(player.offlineProd/100).times(diff/600))

    if (player.money.lte(Number.MAX_VALUE) || (player.break && player.currentChallenge == "") || (player.currentChallenge != "" && player.money.lte(player.challengeTarget))) {

        if (player.currentChallenge != "challenge7" && player.currentEternityChall != "eterc3") {
            for (let tier = 7; tier >= 1; --tier) {
                var name = TIER_NAMES[tier];

                player[name + 'Amount'] = player[name + 'Amount'].plus(getDimensionProductionPerSecond(tier + 1).times(diff / 100));
            }
        } else if (player.currentEternityChall != "eterc3") {
            for (let tier = 6; tier >= 1; --tier) {
                var name = TIER_NAMES[tier];

                player[name + 'Amount'] = player[name + 'Amount'].plus(getDimensionProductionPerSecond(tier + 2).times(diff / 100));
            }
        } else {
            for (let tier = 3; tier >= 1; --tier) {
                var name = TIER_NAMES[tier];

                player[name + 'Amount'] = player[name + 'Amount'].plus(getDimensionProductionPerSecond(tier + 1).times(diff / 100));
            }
        }
        if (player.currentChallenge != "" && getDimensionProductionPerSecond(1).gte(player.challengeTarget)) {
            player.money = player.money.plus(player.challengeTarget);
            player.totalmoney = player.totalmoney.plus(player.challengeTarget);
        } else {
            if (player.currentChallenge == "challenge3" || player.currentChallenge == "postc1") {
                player.money = player.money.plus(getDimensionProductionPerSecond(1).times(diff/10).times(player.chall3Pow));
                player.totalmoney = player.totalmoney.plus(getDimensionProductionPerSecond(1).times(diff/10).times(player.chall3Pow));
            } else {
                player.money = player.money.plus(getDimensionProductionPerSecond(1).times(diff/10));
                player.totalmoney = player.totalmoney.plus(getDimensionProductionPerSecond(1).times(diff/10));
            }
            if (player.currentChallenge == "challenge7") {
                player.money = player.money.plus(getDimensionProductionPerSecond(2).times(diff/10));
                player.totalmoney = player.totalmoney.plus(getDimensionProductionPerSecond(2).times(diff/10))
            }
        }
    }

    document.getElementById("dimTabButtons").style.display = "none"

    player.totalTimePlayed += diff
    player.thisInfinityTime += diff
    player.thisEternity += diff

    if (player.eternities > 0) document.getElementById("tdtabbtn").style.display = "inline-block"

    for (let tier=1;tier<9;tier++) {
        if (tier != 8 && player.infDimensionsUnlocked[tier-1]) player["infinityDimension"+tier].amount = player["infinityDimension"+tier].amount.plus(DimensionProduction(tier+1).times(diff/100))
        if (player.infDimensionsUnlocked[tier-1]) {
            document.getElementById("infRow"+tier).style.display = "inline-block"
            document.getElementById("dimTabButtons").style.display = "inline-block"
            var idtabshown = true;
        } else {
            document.getElementById("infRow"+tier).style.display = "none"
            document.getElementById("idtabbtn").style.display = "none"
        }
        if (idtabshown === true || player.eternities >= 1) {
            document.getElementById("idtabbtn").style.display = "inline-block"
        }

        if (tier <4) player["timeDimension"+tier].amount = player["timeDimension"+tier].amount.plus(getTimeDimensionProduction(tier+1).times(diff/100))
    }

    if (player.infinitied > 0 && player.eternities < 1) {
        document.getElementById("dimTabButtons").style.display = "inline-block"
        document.getElementById("dtabbtn").style.display = "inline-block"
        document.getElementById("prodtabbtn").style.display = "inline-block"
    }
    if (player.eternities > 0) document.getElementById("dimTabButtons").style.display = "inline-block"

    if (player.currentEternityChall !== "eterc7") player.infinityPower = player.infinityPower.plus(DimensionProduction(1).times(diff/10))
    else if (player.currentChallenge !== "challenge4") player.seventhAmount = player.seventhAmount.plus(DimensionProduction(1).times(diff/10))
    

    

    if (player.currentEternityChall == "eterc7") player.infinityDimension8.amount = player.infinityDimension8.amount.plus(getTimeDimensionProduction(1).times(diff/10))
    else player.timeShards = player.timeShards.plus(getTimeDimensionProduction(1).times(diff/10))

    if (getTimeDimensionProduction(1).gt(0) && ECTimesCompleted("eterc7") > 0) player.infinityDimension8.amount = player.infinityDimension8.amount.plus(getTimeDimensionProduction(1).pow(ECTimesCompleted("eterc7")*0.2).minus(1).times(diff/10))
    
    let gain;
    if (player.timeShards.gt(0)) {
        if (player.timestudy.studies.includes(171)) gain = Math.ceil(new Decimal(player.timeShards).dividedBy(player.tickThreshold).log10() / Math.log10(1.25))
        else gain = Math.ceil(new Decimal(player.timeShards).dividedBy(player.tickThreshold).log10() / Math.log10(1.33))
        player.totalTickGained += gain
        player.tickspeed = player.tickspeed.times(Decimal.pow(getTickSpeedMultiplier(), gain))
        if (player.timestudy.studies.includes(171)) player.tickThreshold = new Decimal(1).times(1.25).pow(player.totalTickGained)
        else player.tickThreshold = new Decimal(1).times(1.33).pow(player.totalTickGained)
        document.getElementById("totaltickgained").innerHTML = "You've gained "+shortenDimensions(player.totalTickGained)+" tickspeed upgrades."
        updateTickSpeed();
    }

    if (player.eternities == 0) {
        document.getElementById("eternityPoints2").style.display = "none"
        document.getElementById("eternitystorebtn").style.display = "none"
        }


    if (player.money.gte(Number.MAX_VALUE) && (!player.break || (player.currentChallenge != "" && player.money.gte(player.challengeTarget)))) {
        document.getElementById("bigcrunch").style.display = 'inline-block';
        if ((player.currentChallenge == "" || player.options.retryChallenge) && (player.bestInfinityTime <= 600 || player.break)) {}
        else showTab('emptiness');
    } else document.getElementById("bigcrunch").style.display = 'none';

    if (player.break && player.money.gte(Number.MAX_VALUE) && player.currentChallenge == "") {
        document.getElementById("postInfinityButton").style.display = "inline-block"
    } else {
        document.getElementById("postInfinityButton").style.display = "none"
    }


    if (player.break) document.getElementById("iplimit").style.display = "inline"
    else document.getElementById("iplimit").style.display = "none"

    var currentIPmin = gainedInfinityPoints().dividedBy(player.thisInfinityTime/600)
    if (currentIPmin.gt(IPminpeak)) IPminpeak = currentIPmin
    document.getElementById("postInfinityButton").innerHTML = "<b>Big Crunch for "+shortenDimensions(gainedInfinityPoints())+" Infinity Points</b><br>"+shortenDimensions(currentIPmin) + " IP/min"+
                                                                "<br>Peaked at "+shortenDimensions(IPminpeak)+" IP/min"

    if (nextAt[player.postChallUnlocked] === undefined) document.getElementById("nextchall").innerHTML = ""
    else {
        document.getElementById("nextchall").innerHTML = "Next challenge unlocks at "+ shortenCosts(nextAt[player.postChallUnlocked]) + " antimatter."
        while (player.money.gte(nextAt[player.postChallUnlocked]) && player.challenges.includes("postc8") === false && player.postChallUnlocked != 8) {
            if (player.postChallUnlocked != 8) player.postChallUnlocked += 1
            if (player.eternities > 6) player.challenges.push("postc"+player.postChallUnlocked)
            updateChallenges()
        }
    }
    let interval = player.replicanti.interval
    if (player.timestudy.studies.includes(62)) interval = interval/3
    if (player.timestudy.studies.includes(133) || player.replicanti.amount.gt(Number.MAX_VALUE)) interval *= 10
    if (player.timestudy.studies.includes(213)) interval /= 20
    if (player.replicanti.amount.gt(Number.MAX_VALUE)) interval = Math.max(interval * Math.pow(1.2, (player.replicanti.amount.log10() - 308)/308), interval)
    var est = Math.log(player.replicanti.chance+1) * 1000 / interval
    
    var current = player.replicanti.amount.ln()
    
    if (player.replicanti.unl && (diff > 5 || interval < 50)) {
        var gained = Decimal.pow(Math.E, current +(diff*est/10))
        if (player.timestudy.studies.includes(192)) gained = Decimal.pow(Math.E, current +Math.log((diff*est/10) * (Math.log10(1.2)/308)+1) / (Math.log10(1.2)/308))
        player.replicanti.amount = Decimal.min(Number.MAX_VALUE, gained)
        if (player.timestudy.studies.includes(192)) player.replicanti.amount = gained
        replicantiTicks = 0
    } else {
        if (interval <= replicantiTicks && player.replicanti.unl) {
            if (player.replicanti.amount.lte(100)) {
                var temp = player.replicanti.amount
                for (var i=0; temp.gt(i); i++) {
                    if (player.replicanti.chance > Math.random()) player.replicanti.amount = player.replicanti.amount.plus(1)
                }
            } else {
                var temp = Decimal.round(player.replicanti.amount.dividedBy(100))
                if (Math.round(player.replicanti.chance) !== 1) {
                    let counter = 0
                    for (var i=0; i<100; i++) {
                        if (player.replicanti.chance > Math.random()) {
                            counter++;
                        }
                    }
                    player.replicanti.amount = Decimal.min(Number.MAX_VALUE, temp.times(counter).plus(player.replicanti.amount))
                    if (player.timestudy.studies.includes(192)) player.replicanti.amount = temp.times(counter).plus(player.replicanti.amount)
                    counter = 0
                } else {
                    if (player.timestudy.studies.includes(192)) player.replicanti.amount = player.replicanti.amount.times(2)
                    else player.replicanti.amount = Decimal.min(Number.MAX_VALUE, player.replicanti.amount.times(2))
                    
                }
            }
            replicantiTicks -= interval
        }

    }
    if (player.replicanti.amount !== 0) replicantiTicks += player.options.updateRate


    if (current == Decimal.ln(Number.MAX_VALUE) && player.thisInfinityTime < 600*30) giveAchievement("Is this safe?");
    if (player.replicanti.galaxies >= 10 && player.thisInfinityTime < 150) giveAchievement("The swarm");

    if (player.replicanti.galaxybuyer && player.replicanti.amount.gte(Number.MAX_VALUE) && !player.timestudy.studies.includes(131)) {
        document.getElementById("replicantireset").click()
    }
    if (player.timestudy.studies.includes(22) ? player.replicanti.interval !== 1 : (player.replicanti.interval !== 50)) document.getElementById("replicantiinterval").innerHTML = "Interval: "+(interval).toFixed(3)+"ms<br>-> "+Math.max(interval*0.9).toFixed(3)+" Costs: "+shortenCosts(player.replicanti.intervalCost)+" IP"
    else document.getElementById("replicantiinterval").innerHTML = "Interval: "+(interval).toFixed(3)+"ms"


    if (player.infMultBuyer) {
        var dif = player.infinityPoints.e - player.infMultCost.e +1
        if (dif > 0) {
            player.infMult = player.infMult.times(Decimal.pow(2, dif))
            player.infMultCost = player.infMultCost.times(Decimal.pow(10, dif))
            document.getElementById("infiMult").innerHTML = "Multiply infinity points from all sources by 2 <br>currently: "+shorten(player.infMult.times(kongIPMult)) +"x<br>Cost: "+shortenCosts(player.infMultCost)+" IP"
            player.infinityPoints = player.infinityPoints.minus(player.infMultCost.dividedBy(10))
            if (player.autobuyers[11].priority !== undefined && player.autobuyers[11].priority !== null && player.autoCrunchMode == "amount") player.autobuyers[11].priority = player.autobuyers[11].priority.times(Decimal.pow(2, dif));
            if (player.autoCrunchMode == "amount") document.getElementById("priority12").value = player.autobuyers[11].priority
        }
    }


    var estimate = Math.max((Math.log(Number.MAX_VALUE) - current) / est, 0)
    document.getElementById("replicantiapprox").innerHTML ="Approximately "+ timeDisplay(estimate*10) + " Until Infinite Replicanti"

    document.getElementById("replicantiamount").innerHTML = shortenDimensions(player.replicanti.amount)
    var replmult = Decimal.pow(Decimal.log2(Decimal.max(player.replicanti.amount, 1)), 2)
    if (player.timestudy.studies.includes(21)) replmult = replmult.plus(Decimal.pow(player.replicanti.amount, 0.032))
    if (player.timestudy.studies.includes(102))replmult = replmult.times(Decimal.pow(5, player.replicanti.galaxies, 150))
    document.getElementById("replicantimult").innerHTML = shorten(replmult)


    document.getElementById("eternitybtn").innerHTML = (player.eternities == 0) ? "Other times await.. I need to become Eternal" : "I need to become Eternal.<br>"+"Gain "+shortenDimensions(gainedEternityPoints())+" Eternity points."
    if (player.currentEternityChall !== "") document.getElementById("eternitybtn").innerHTML = "Other challenges await.. I need to become Eternal"
    updateMoney();
    updateCoinPerSec();
    updateDimensions()
    updateInfCosts()
    updateInfinityDimensions();
    updateInfPower();
    updateTimeDimensions()
    updateTimeShards()
    if (getDimensionProductionPerSecond(1).gt(player.money) && !player.achievements.includes("r44")) {
        Marathon+=player.options.updateRate/1000;
        if (Marathon >= 30) giveAchievement("Over in 30 seconds");
    } else {
        Marathon = 0; 
    }

    if(player.money.gt(Math.pow(10,63))) giveAchievement("Supersanic");

    if (DimensionProduction(1).gt(player.infinityPower) && !player.achievements.includes("r113")) {
        Marathon2+=player.options.updateRate/1000;
        if (Marathon2 >= 60) giveAchievement("Long lasting relationship");
    } else {
        Marathon2 = 0; 
    }

    for (let tier = 1; tier <= 8; ++tier) {
        var name = TIER_NAMES[tier];
        if (player.currentChallenge != "challenge10" && player.currentChallenge != "postc1") {
            document.getElementById(name).className = canAfford(player[name + 'Cost']) ? 'storebtn' : 'unavailablebtn';
            document.getElementById(name + 'Max').className = canAfford(player[name + 'Cost'].times(10 - dimBought(tier))) ? 'storebtn' : 'unavailablebtn';
        } else {
            if (tier >= 3) {
                document.getElementById(name).className = player[TIER_NAMES[tier-2] + 'Amount'].gte(player[name + 'Cost']) ? 'storebtn' : 'unavailablebtn';
                document.getElementById(name + 'Max').className = player[TIER_NAMES[tier-2] + 'Amount'].gte(player[name + 'Cost'].times(10 - dimBought(tier))) ? 'storebtn' : 'unavailablebtn';
            } else {
                document.getElementById(name).className = canAfford(player[name + 'Cost']) ? 'storebtn' : 'unavailablebtn';
                document.getElementById(name + 'Max').className = canAfford(player[name + 'Cost'].times(10 - dimBought(tier))) ? 'storebtn' : 'unavailablebtn';
            }
        }
    }
    if (player.firstAmount.lt(1)) document.getElementById("first").className = 'storebtn';

    for (var tier = 1; tier < 9; tier++) {
        if (player.infinityPoints.gte(player["infinityDimension"+tier].cost)) document.getElementById("infMax"+tier).className = "storebtn"
        else document.getElementById("infMax"+tier).className = "unavailablebtn"
    }

    for (var tier = 1; tier < 5; tier++) {
        if (player.eternityPoints.gte(player["timeDimension"+tier].cost)) document.getElementById("timeMax"+tier).className = "storebtn"
        else document.getElementById("timeMax"+tier).className = "unavailablebtn"
    }




    if (canAfford(player.tickSpeedCost)) {
        document.getElementById("tickSpeed").className = 'storebtn';
        document.getElementById("tickSpeedMax").className = 'storebtn';
    } else {
        document.getElementById("tickSpeed").className = 'unavailablebtn';
        document.getElementById("tickSpeedMax").className = 'unavailablebtn';
    }

    if (player.infinityPoints.gt(0) || player.eternities !== 0) {
        document.getElementById("infinitybtn").style.display = "block";
        document.getElementById("infi11").className = "infinistorebtn1"
        document.getElementById("infi21").className = "infinistorebtn2"
        if (player.infinityUpgrades.includes("timeMult")) document.getElementById("infi12").className = "infinistorebtn1"
        else document.getElementById("infi12").className = "infinistorebtnlocked"
        if (player.infinityUpgrades.includes("dimMult")) document.getElementById("infi22").className = "infinistorebtn2"
        else document.getElementById("infi22").className = "infinistorebtnlocked"
        if (player.infinityUpgrades.includes("18Mult")) document.getElementById("infi13").className = "infinistorebtn1"
        else document.getElementById("infi13").className = "infinistorebtnlocked"
        if (player.infinityUpgrades.includes("27Mult")) document.getElementById("infi23").className = "infinistorebtn2"
        else document.getElementById("infi23").className = "infinistorebtnlocked"
        if (player.infinityUpgrades.includes("36Mult")) document.getElementById("infi14").className = "infinistorebtn1"
        else document.getElementById("infi14").className = "infinistorebtnlocked"
        if (player.infinityUpgrades.includes("45Mult") && player.infinityPoints.gte(2)) document.getElementById("infi24").className = "infinistorebtn2"
        else document.getElementById("infi24").className = "infinistorebtnlocked"
        if (player.infinityPoints.gte(3)) document.getElementById("infi31").className = "infinistorebtn3"
        else document.getElementById("infi31").className = "infinistorebtnlocked"
        if (player.infinityUpgrades.includes("timeMult2") && player.infinityPoints.gte(5)) document.getElementById("infi32").className = "infinistorebtn3"
        else document.getElementById("infi32").className = "infinistorebtnlocked"
        if (player.infinityUpgrades.includes("unspentBonus") && player.infinityPoints.gte(7)) document.getElementById("infi33").className = "infinistorebtn3"
        else document.getElementById("infi33").className = "infinistorebtnlocked"
        if (player.infinityUpgrades.includes("resetMult") && player.infinityPoints.gte(10)) document.getElementById("infi34").className = "infinistorebtn3"
        else document.getElementById("infi34").className = "infinistorebtnlocked"
        if (player.infinityPoints.gte(20)) document.getElementById("infi41").className = "infinistorebtn4"
        else document.getElementById("infi41").className = "infinistorebtnlocked"
        if (player.infinityUpgrades.includes("skipReset1") && player.infinityPoints.gte(40)) document.getElementById("infi42").className = "infinistorebtn4"
        else document.getElementById("infi42").className = "infinistorebtnlocked"
        if (player.infinityUpgrades.includes("skipReset2") && player.infinityPoints.gte(80)) document.getElementById("infi43").className = "infinistorebtn4"
        else document.getElementById("infi43").className = "infinistorebtnlocked"
        if (player.infinityUpgrades.includes("skipReset3") && player.infinityPoints.gte(500)) document.getElementById("infi44").className = "infinistorebtn4"
        else document.getElementById("infi44").className = "infinistorebtnlocked"
        if (player.infinityUpgrades.includes("skipResetGalaxy") && player.infinityUpgrades.includes("passiveGen") && player.infinityUpgrades.includes("galaxyBoost") && player.infinityUpgrades.includes("resetBoost") && player.infinityPoints.gte(player.infMultCost)) {
            document.getElementById("infiMult").className = "infinimultbtn"
        } else document.getElementById("infiMult").className = "infinistorebtnlocked"

        if (player.infinityPoints.gte(1e4)) document.getElementById("postinfi11").className = "infinistorebtn1"
        else document.getElementById("postinfi11").className = "infinistorebtnlocked"

        if (player.infinityPoints.gte(5e4)) document.getElementById("postinfi21").className = "infinistorebtn1"
        else document.getElementById("postinfi21").className = "infinistorebtnlocked"

        if (player.infinityPoints.gte(player.tickSpeedMultDecreaseCost)) document.getElementById("postinfi31").className = "infinimultbtn"
        else document.getElementById("postinfi31").className = "infinistorebtnlocked"

        if (player.infinityPoints.gte(5e11)) document.getElementById("postinfi41").className = "infinistorebtn1"
        else document.getElementById("postinfi41").className = "infinistorebtnlocked"

        if (player.infinityPoints.gte(1e5)) document.getElementById("postinfi12").className = "infinistorebtn1"
        else document.getElementById("postinfi12").className = "infinistorebtnlocked"

        if (player.infinityPoints.gte(1e6)) document.getElementById("postinfi22").className = "infinistorebtn1"
        else document.getElementById("postinfi22").className = "infinistorebtnlocked"

        if (player.infinityPoints.gte(1e7)) document.getElementById("postinfi32").className = "infinistorebtn1"
        else document.getElementById("postinfi32").className = "infinistorebtnlocked"

        if (player.infinityPoints.gte(player.dimensionMultDecreaseCost)) document.getElementById("postinfi42").className = "infinimultbtn"
        else document.getElementById("postinfi42").className = "infinistorebtnlocked"

        if (player.infinityPoints.gte(20e6)) document.getElementById("postinfi13").className = "infinistorebtn1"
        else document.getElementById("postinfi13").className = "infinistorebtnlocked"

        if (player.infinityPoints.gte(5e9)) document.getElementById("postinfi23").className = "infinistorebtn1"
        else document.getElementById("postinfi23").className = "infinistorebtnlocked"

        if (player.infinityPoints.gte(1e15)) document.getElementById("postinfi33").className = "infinistorebtn1"
        else document.getElementById("postinfi33").className = "infinistorebtnlocked"

        if (player.infinityPoints.gte(player.offlineProdCost)) document.getElementById("offlineProd").className = "infinimultbtn"
        else document.getElementById("offlineProd").className = "infinistorebtnlocked"

    }
    if (player.infinityPoints.equals(0)){
        document.getElementById("infi11").className = "infinistorebtnlocked"
        document.getElementById("infi12").className = "infinistorebtnlocked"
        document.getElementById("infi13").className = "infinistorebtnlocked"
        document.getElementById("infi14").className = "infinistorebtnlocked"
        document.getElementById("infi21").className = "infinistorebtnlocked"
        document.getElementById("infi22").className = "infinistorebtnlocked"
        document.getElementById("infi23").className = "infinistorebtnlocked"
        document.getElementById("infi24").className = "infinistorebtnlocked"
        document.getElementById("infi31").className = "infinistorebtnlocked"
        document.getElementById("infi32").className = "infinistorebtnlocked"
        document.getElementById("infi33").className = "infinistorebtnlocked"
        document.getElementById("infi34").className = "infinistorebtnlocked"
        document.getElementById("infi41").className = "infinistorebtnlocked"
        document.getElementById("infi42").className = "infinistorebtnlocked"
        document.getElementById("infi43").className = "infinistorebtnlocked"
        document.getElementById("infi44").className = "infinistorebtnlocked"
        document.getElementById("infiMult").className = "infinistorebtnlocked"

    }

    if (player.autobuyers[11]%1 === 0 || player.autobuyers[11].interval>100) document.getElementById("break").className = "infinistorebtnlocked"
    else document.getElementById("break").className = "infinistorebtn2"


    if (player.resets > 4) {
        document.getElementById("confirmation").style.display = "inline-block";
        document.getElementById("sacrifice").style.display = "inline-block";
    } else {
        document.getElementById("confirmation").style.display = "none";
        document.getElementById("sacrifice").style.display = "none";
    }

    if (player.infinitied > 0) document.getElementById("sacrifice").style.display = "inline-block";

    if (player.eightAmount > 0 && player.resets > 4 && player.currentEternityChall !== "eterc3") document.getElementById("sacrifice").className = "storebtn"
    else document.getElementById("sacrifice").className = "unavailablebtn"

    if (player.autobuyers[11]%1 !== 0 && player.autobuyers[11].interval == 100) {
        document.getElementById("postinftable").style.display = "inline-block"
    } else {
        document.getElementById("postinftable").style.display = "none"
    }

    if (player.autobuyers[11].interval == 100) document.getElementById("abletobreak").style.display = "none"


    document.getElementById("infinitybtn").style.display = "none";
    document.getElementById("challengesbtn").style.display = "none";

    if (player.money.gte(Number.MAX_VALUE) && (((player.currentChallenge != "" && player.money.gte(player.challengeTarget)) && !player.options.retryChallenge) || (player.bestInfinityTime > 600 && !player.break))) {
        document.getElementById("dimensionsbtn").style.display = "none";
        document.getElementById("optionsbtn").style.display = "none";
        document.getElementById("statisticsbtn").style.display = "none";
        document.getElementById("achievementsbtn").style.display = "none";
        document.getElementById("challengesbtn").style.display = "none";
        document.getElementById("infinitybtn").style.display = "none";
        document.getElementById("tickSpeed").style.visibility = "hidden";
        document.getElementById("tickSpeedMax").style.visibility = "hidden";
        document.getElementById("tickLabel").style.visibility = "hidden";
        document.getElementById("tickSpeedAmount").style.visibility = "hidden";
    } else {
        document.getElementById("dimensionsbtn").style.display = "inline-block";
        document.getElementById("optionsbtn").style.display = "inline-block";
        document.getElementById("statisticsbtn").style.display = "inline-block";
        document.getElementById("achievementsbtn").style.display = "inline-block";
        if (player.infinitied > 0) {
            document.getElementById("infinitybtn").style.display = "inline-block";
            document.getElementById("challengesbtn").style.display = "inline-block";
        }
    }

    document.getElementById("epmult").className = player.eternityPoints.gte(player.epmultCost) ? "eternityupbtn" : "eternityupbtnlocked"

    if (player.infinityUpgrades.includes("bulkBoost")) document.getElementById("bulkdimboost").style.display = "inline"
    else document.getElementById("bulkdimboost").style.display = "none"

    if (player.infinityUpgrades.includes("timeMult")) document.getElementById("infi11").className = "infinistorebtnbought"
    if (player.infinityUpgrades.includes("dimMult")) document.getElementById("infi21").className = "infinistorebtnbought"
    if (player.infinityUpgrades.includes("18Mult")) document.getElementById("infi12").className = "infinistorebtnbought"
    if (player.infinityUpgrades.includes("27Mult")) document.getElementById("infi22").className = "infinistorebtnbought"
    if (player.infinityUpgrades.includes("36Mult")) document.getElementById("infi13").className = "infinistorebtnbought"
    if (player.infinityUpgrades.includes("45Mult")) document.getElementById("infi23").className = "infinistorebtnbought"
    if (player.infinityUpgrades.includes("resetBoost")) document.getElementById("infi14").className = "infinistorebtnbought"
    if (player.infinityUpgrades.includes("galaxyBoost")) document.getElementById("infi24").className = "infinistorebtnbought"
    if (player.infinityUpgrades.includes("timeMult2")) document.getElementById("infi31").className = "infinistorebtnbought"
    if (player.infinityUpgrades.includes("unspentBonus")) document.getElementById("infi32").className = "infinistorebtnbought"
    if (player.infinityUpgrades.includes("resetMult")) document.getElementById("infi33").className = "infinistorebtnbought"
    if (player.infinityUpgrades.includes("passiveGen")) document.getElementById("infi34").className = "infinistorebtnbought"
    if (player.infinityUpgrades.includes("skipReset1")) document.getElementById("infi41").className = "infinistorebtnbought"
    if (player.infinityUpgrades.includes("skipReset2")) document.getElementById("infi42").className = "infinistorebtnbought"
    if (player.infinityUpgrades.includes("skipReset3")) document.getElementById("infi43").className = "infinistorebtnbought"
    if (player.infinityUpgrades.includes("skipResetGalaxy")) document.getElementById("infi44").className = "infinistorebtnbought"

    if (player.infinityUpgrades.includes("totalMult")) document.getElementById("postinfi11").className = "infinistorebtnbought"
    if (player.infinityUpgrades.includes("currentMult")) document.getElementById("postinfi21").className = "infinistorebtnbought"
    if (player.tickSpeedMultDecrease == 2) document.getElementById("postinfi31").className = "infinistorebtnbought"
    if (player.infinityUpgrades.includes("achievementMult")) document.getElementById("postinfi22").className = "infinistorebtnbought"
    if (player.infinityUpgrades.includes("infinitiedMult")) document.getElementById("postinfi12").className = "infinistorebtnbought"
    if (player.infinityUpgrades.includes("postGalaxy")) document.getElementById("postinfi41").className = "infinistorebtnbought"
    if (player.infinityUpgrades.includes("challengeMult")) document.getElementById("postinfi32").className = "infinistorebtnbought"
    if (player.dimensionMultDecrease <= 3) document.getElementById("postinfi42").className = "infinistorebtnbought"
    if (player.offlineProd == 50) document.getElementById("offlineProd").className = "infinistorebtnbought"


    if (player.infinityUpgrades.includes("infinitiedGeneration")) document.getElementById("postinfi13").className = "infinistorebtnbought"
    if (player.infinityUpgrades.includes("bulkBoost")) document.getElementById("postinfi23").className = "infinistorebtnbought"
    if (player.infinityUpgrades.includes("autoBuyerUpgrade")) document.getElementById("postinfi33").className = "infinistorebtnbought"

    if (player.currentChallenge !== "") {
        document.getElementById("progressbar").style.width = Decimal.min((Decimal.log10(player.money.plus(1)) / Decimal.log10(player.challengeTarget) * 100), 100).toFixed(2) + "%"
        document.getElementById("progressbar").innerHTML = Decimal.min((Decimal.log10(player.money.plus(1)) / Decimal.log10(player.challengeTarget) * 100), 100).toFixed(2) + "%"
        document.getElementById("progress").setAttribute('ach-tooltip',"Percentage to challenge goal")
    } else if (!player.break) {
        document.getElementById("progressbar").style.width = Decimal.min((Decimal.log10(player.money.plus(1)) / Decimal.log10(Number.MAX_VALUE) * 100), 100).toFixed(2) + "%"
        document.getElementById("progressbar").innerHTML = Decimal.min((Decimal.log10(player.money.plus(1)) / Decimal.log10(Number.MAX_VALUE) * 100), 100).toFixed(2) + "%"
        document.getElementById("progress").setAttribute('ach-tooltip',"Percentage to Infinity")
    } else if (player.infDimensionsUnlocked.includes(false)) {
        document.getElementById("progressbar").style.width = Decimal.min(player.money.e / getNewInfReq().e * 100, 100).toFixed(2) + "%"
        document.getElementById("progressbar").innerHTML = Decimal.min(player.money.e / getNewInfReq().e * 100, 100).toFixed(2) + "%"
        document.getElementById("progress").setAttribute('ach-tooltip',"Percentage to next dimension unlock")
    } else {
        document.getElementById("progressbar").style.width = Decimal.min(Decimal.log10(player.infinityPoints.plus(1)) / Decimal.log10(Number.MAX_VALUE)  * 100, 100).toFixed(2) + "%"
        document.getElementById("progressbar").innerHTML = Decimal.min(Decimal.log10(player.infinityPoints.plus(1)) / Decimal.log10(Number.MAX_VALUE)  * 100, 100).toFixed(2) + "%"
        document.getElementById("progress").setAttribute('ach-tooltip',"Percentage to Eternity")
    }

    if (player.eternities > 0) {
        document.getElementById("infinitybtn").style.display = "inline-block";
        document.getElementById("challengesbtn").style.display = "inline-block";
    }

    document.getElementById("ec1reward").innerHTML = "Reward: "+shortenMoney(Math.pow(Math.max(player.thisEternity*10, 1), 0.3+(ECTimesCompleted("eterc1")*0.05)))+"x on all Time Dimensions (based on time spent this Eternity)"
    document.getElementById("ec2reward").innerHTML = "Reward: Infinity power affects Infinity Dimensions with reduced effect, Currently: "+shortenMoney(player.infinityPower.pow(1.5/(700 - ECTimesCompleted("eterc2")*100)).min(new Decimal("1e100")).max(1))+"x"
    document.getElementById("ec3reward").innerHTML = "Reward: Increase the multiplier for buying 10 dimensions, Currently: "+getDimensionPowerMultiplier().toFixed(2)+"x"
    document.getElementById("ec4reward").innerHTML = "Reward: Infinity Dimension multiplier from unspent IP, Currently: "+shortenMoney(player.infinityPoints.pow(0.003 + ECTimesCompleted("eterc4")*0.002).min(new Decimal("1e200")))+"x"
    document.getElementById("ec5reward").innerHTML = "Reward: Galaxy cost scaling starts "+((ECTimesCompleted("eterc5")*5))+" galaxies later."
    document.getElementById("ec6reward").innerHTML = "Reward: Further reduction dimension cost multiplier increase, Currently: "+player.dimensionMultDecrease.toFixed(1)+"x "
    document.getElementById("ec7reward").innerHTML = "Reward: First Time dimension produces Eighth Infinity Dimensions, Currently: "+shortenMoney(getTimeDimensionProduction(1).pow(ECTimesCompleted("eterc7")*0.2).minus(1))+" per second. "
    document.getElementById("ec8reward").innerHTML = "Reward: Infinity power powers up replicanti galaxies, Currently: " + (Math.max(Math.pow(Math.log10(player.infinityPower.plus(1).log10()+1), 0.03 * ECTimesCompleted("eterc8"))-1, 0) * 100).toFixed(2) + "%"
    document.getElementById("ec9reward").innerHTML = "Reward: Infinity Dimension multiplier based on time shards, Currently: "+shortenMoney(player.timeShards.pow(ECTimesCompleted("eterc9")*0.1).min(new Decimal("1e400")))+"x "
    document.getElementById("ec10reward").innerHTML = "Reward: Time dimensions gain a multiplier from infinitied stat, Currently: "+shortenMoney(Math.max(getInfinitied() * ECTimesCompleted("eterc10") * 0.000002+1, 1))+"x "
    if (player.timestudy.studies.includes(31)) document.getElementById("ec10reward").innerHTML = "Reward: Time dimensions gain a multiplier from infinitied stat, Currently: "+shortenMoney(Decimal.pow(Math.max(getInfinitied() * ECTimesCompleted("eterc10") * 0.000002+1, 1), 4))+"x "
    document.getElementById("ec10span").innerHTML = shortenMoney(ec10bonus) + "x"
    var scale1 = [2.82e-45,1e-42,7.23e-30,5e-21,9e-17,6.2e-11,5e-8,3.555e-6,7.5e-4,1,2.5e3,2.6006e6,3.3e8,5e12,4.5e17,1.08e21,1.53e24,1.41e27,5e32,8e36,1.7e45,1.7e48,3.3e55,3.3e61,5e68,1e73,3.4e80,1e113,Number.MAX_VALUE,new Decimal("1e65000")];
    var scale2 = [" protons."," nucleuses."," Hydrogen atoms."," viruses."," red blood cells."," grains of sand."," grains of rice."," teaspoons."," wine bottles."," fridge-freezers."," Olympic-sized swimming pools."," Great Pyramids of Giza."," Great Walls of China."," large asteroids.",
                " dwarf planets."," Earths."," Jupiters."," Suns."," red giants."," hypergiant stars."," nebulas."," Oort clouds."," Local Bubbles."," galaxies."," Local Groups."," Sculptor Voids."," observable universes."," Dimensions.", " Infinity Dimensions.", " Time Dimensions."];
    var id = 0;
    if (player.money.times(4.22419e-105).gt(2.82e-45)) {
        if (player.money.times(4.22419e-105).gt(scale1[scale1.length - 1])) id = scale1.length - 1;
        else {
            while (player.money.times(4.22419e-105).gt(scale1[id])) id++;
            if (id > 0) id--;
        }
        if (id >= 7 && id < 11) document.getElementById("infoScale").innerHTML = "If every antimatter were a planck volume, you would have enough to fill " + formatValue(player.options.notation, player.money * 4.22419e-105 / scale1[id], 2, 1) + scale2[id];
        else document.getElementById("infoScale").innerHTML = "If every antimatter were a planck volume, you would have enough to make " + formatValue(player.options.notation, player.money.times(4.22419e-105).dividedBy(scale1[id]), 2, 1) + scale2[id];
    } else { //does this part work correctly? i doubt it does
        if (player.money.times(1e-54) < 2.82e-45) document.getElementById("infoScale").innerHTML = "If every antimatter were " + formatValue(player.options.notation,2.82e-45 / 1e-54 / player.money, 2, 1) + " attometers cubed, you would have enough to make a proton.";
        else if (player.money * 1e-63 < 2.82e-45) document.getElementById("infoScale").innerHTML = "If every antimatter were " + formatValue(player.options.notation,2.82e-45 / 1e-63 / player.money, 2, 1) + " zeptometers cubed, you would have enough to make a proton.";
        else if (player.money * 1e-72 < 2.82e-45) document.getElementById("infoScale").innerHTML = "If every antimatter were " + formatValue(player.options.notation,2.82e-45 / 1e-72 / player.money, 2, 1) + " yoctometers cubed, you would have enough to make a proton.";
        else document.getElementById("infoScale").innerHTML = "If every antimatter were " + formatValue(player.options.notation,2.82e-45 / 4.22419e-105 / player.money, 2, 1) + " planck volumes, you would have enough to make a proton.";
    }
    if (player.money.gt(new Decimal("1e100000"))) {
        document.getElementById("infoScale").innerHTML = "<br>If you wrote 3 numbers a second, it would take you <br>" + timeDisplay(player.money.log10()*10/3) + "<br> to write down your antimatter amount.";
    }

    var shiftRequirement = getShiftRequirement(0);

    if (player[TIER_NAMES[shiftRequirement.tier] + 'Amount'] >= shiftRequirement.amount) {
        document.getElementById("softReset").className = 'storebtn';
    } else {
        document.getElementById("softReset").className = 'unavailablebtn';
    }

    if (player.eightAmount >= getGalaxyRequirement()) {
        document.getElementById("secondSoftReset").className = 'storebtn';
    } else {
        document.getElementById("secondSoftReset").className = 'unavailablebtn';
    }

    if (player.currentChallenge == "challenge4" && player.sixthAmount >= getGalaxyRequirement()) {
        document.getElementById("secondSoftReset").className = 'storebtn';
    }

    if (player.currentChallenge == "challenge2" || player.currentChallenge == "postc1") document.getElementById("chall2Pow").style.display = "inline-block"
    else document.getElementById("chall2Pow").style.display = "none"
    if (player.currentChallenge == "challenge3" || player.currentChallenge == "postc1") document.getElementById("chall3Pow").style.display = "inline-block"
    else document.getElementById("chall3Pow").style.display = "none"

    document.getElementById("chall2Pow").innerHTML = (player.chall2Pow*100).toFixed(2) + "%"
    document.getElementById("chall3Pow").innerHTML = shorten(player.chall3Pow*100) + "%"


    if (player.infDimensionsUnlocked[7] == false && player.break) {
        document.getElementById("newDimensionButton").style.display = "inline-block"
    } else document.getElementById("newDimensionButton").style.display = "none"

    if (player.money.gte(getNewInfReq())) document.getElementById("newDimensionButton").className = "newdim"
    else document.getElementById("newDimensionButton").className = "newdimlocked"

    while (player.eternities > 24 && getNewInfReq().lt(player.money) && player.infDimensionsUnlocked[7] === false) newDimension()

    document.getElementById("newDimensionButton").innerHTML = "Get " + shortenCosts(getNewInfReq()) + " antimatter to unlock a new Dimension."

    document.getElementById("sacrifice").setAttribute('ach-tooltip', "Boosts 8th Dimension by " + formatValue(player.options.notation, calcSacrificeBoost(), 2, 2) + "x");

    document.getElementById("sacrifice").innerHTML = "Dimensional Sacrifice ("+formatValue(player.options.notation, calcSacrificeBoost(), 2, 2)+"x)";
    if (isNaN(player.totalmoney)) player.totalmoney = new Decimal(10)
    if (player.timestudy.studies.includes(181)) player.infinityPoints = player.infinityPoints.plus(gainedInfinityPoints().times(diff/1000))

    document.getElementById("infinityPoints1").innerHTML = "You have <span class=\"IPAmount1\">"+shortenDimensions(player.infinityPoints)+"</span> Infinity points."
    document.getElementById("infinityPoints2").innerHTML = "You have <span class=\"IPAmount2\">"+shortenDimensions(player.infinityPoints)+"</span> Infinity points."
    
    player.lastUpdate = thisUpdate;
}

var gameLoopIntervalId;

function simulateTime(seconds) {
    
    //the game is simulated at a 50ms update rate, with a max of 1000 ticks
    document.getElementById("offlineprogress").style.display = "block"
    var ticks = seconds * 20;
    var bonusDiff = 0;
    var playerStart = Object.assign({}, player);
    if (ticks > 1000) {
        bonusDiff = (ticks - 1000) / 20;
        ticks = 1000;
    }
    let ticksDone = 0
    for (i=0; i<ticks; i++) {
        gameLoop(50+bonusDiff)
        ticksDone++;
    }
    var popupString = "While you were away"
    if (player.money.gt(playerStart.money)) popupString+= ",<br> your antimatter increased "+shortenMoney(player.money.log10() - (playerStart.money).log10())+" orders of magnitude"
    if (player.infinityPower.gt(playerStart.infinityPower)) popupString+= ",<br> infinity power increased "+shortenMoney(player.infinityPower.log10() - (playerStart.infinityPower).log10())+" orders of magnitude"
    if (player.timeShards.gt(playerStart.timeShards)) popupString+= ",<br> time shards increased "+shortenMoney(player.timeShards.log10() - (playerStart.timeShards).log10())+" orders of magnitude"
    popupString+= "."
    if (player.infinitied > playerStart.infinitied) popupString+= "<br>You infinitied "+(player.infinitied-playerStart.infinitied)+" times"
    if (player.eternities > playerStart.eternities) popupString+= " <br>and eternitied "+(player.eternities-playerStart.eternities)+" times"
    if (popupString.includes("times")) popupString+= "."
    if (popupString.length == 19) popupString+= " ...nothing happened."
    
    document.getElementById("offlinePopup").innerHTML = popupString
}

function startInterval() {
    gameLoopIntervalId = setInterval(gameLoop, player.options.updateRate);
}

function enableChart() {
    if (document.getElementById("chartOnOff").checked) {
        player.options.chart.on = true;
        if (player.options.chart.warning < 1) alert("Warning: the chart can cause performance issues. Please disable it if you're experiencing lag.")
    } else {
        player.options.chart.on = false;
    }
}

function updateChart(first) {
    if (first !== true && (player.infinitied >= 1 || player.eternities >= 1) && player.options.chart.on === true) {
        if (player.currentChallenge == "challenge3" || player.currentChallenge == "postc1") {
            addData(normalDimChart, "0", getDimensionProductionPerSecond(1).times(player.chall3Pow));
        } else {
            addData(normalDimChart, "0", getDimensionProductionPerSecond(1));
        }
    }
    if (player.options.chart.updateRate) {
        setTimeout(updateChart, player.options.chart.updateRate);
    } else {
        setTimeout(updateChart, 1000);
    }
}
updateChart(true);

var slider = document.getElementById("updaterateslider");
var sliderText = document.getElementById("updaterate");

slider.oninput = function() {
    player.options.updateRate = parseInt(this.value);
    sliderText.innerHTML = "Update rate: " + this.value + "ms"
    clearInterval(gameLoopIntervalId);
        gameLoopIntervalId = setInterval(gameLoop, player.options.updateRate);
}

function dimBoolean() {
    var name = TIER_NAMES[getShiftRequirement(0).tier]
    if (!player.autobuyers[9].isOn) return false
    if (player.autobuyers[9].ticks*100 < player.autobuyers[9].interval) return false
    if (player[name + "Amount"] > getShiftRequirement(0)) return true
    if (player.eternities < 10 && player[name + "Amount"] < getShiftRequirement(player.autobuyers[9].bulk-1).amount) return false
    if (player.overXGalaxies <= player.galaxies) return true
    if ((player.currentChallenge =="challenge4" || player.currentChallenge == "postc1") && player.autobuyers[9].priority < getShiftRequirement(0).amount && getShiftRequirement(0).tier == 6) return false
    if (player.autobuyers[9].priority < getShiftRequirement(0).amount && getShiftRequirement(0).tier == 8) return false
    return true
}


function maxBuyGalaxies() {
    if (player.currentEternityChall == "eterc6") return
    if (player.autobuyers[10].priority > player.galaxies) {
        while(player.eightAmount >= getGalaxyRequirement() && player.autobuyers[10].priority > player.galaxies) player.galaxies++
        player.galaxies--
        galaxyReset()
    }
}

function maxBuyDimBoosts(manual) {
    if (player.autobuyers[9].priority > player.resets || player.overXGalaxies <= player.galaxies || getShiftRequirement(0).tier < 8 || manual == true) {
        var r = 0;
        while(player[TIER_NAMES[getShiftRequirement(r).tier]+"Amount"] >= getShiftRequirement(r).amount && (player.autobuyers[9].priority > player.resets+r || player.overXGalaxies <= player.galaxies || getShiftRequirement(r).tier < 8 || manual == true)) r+=1;
        
        if (r >= 750) giveAchievement("Costco sells dimboosts now")
        if (r > 0) softReset(r)
    }
    
}

var timer = 0
function autoBuyerTick() {

    if (player.eternities >= 100 && player.eternityBuyer.isOn && gainedEternityPoints().gte(player.eternityBuyer.limit)) eternity()

    if (player.autobuyers[11]%1 !== 0) {
    if (player.autobuyers[11].ticks*100 >= player.autobuyers[11].interval && player.money.gte(Number.MAX_VALUE)) {
        if (player.autobuyers[11].isOn) {
            if (player.autoCrunchMode == "amount") {
                if (!player.break || player.currentChallenge != "" || player.autobuyers[11].priority.lt(gainedInfinityPoints())) {
                    autoS = false;
                    document.getElementById("bigcrunch").click()
                }
            } else if (player.autoCrunchMode == "time"){
                if (!player.break || player.currentChallenge != "" || player.autobuyers[11].priority.lt(player.thisInfinityTime/10)) {
                    autoS = false;
                    document.getElementById("bigcrunch").click()
                }
            } else {
                if (!player.break || player.currentChallenge != "" || gainedInfinityPoints().gte(player.lastTenRuns[0][1].times(player.autobuyers[11].priority))) {
                    autoS = false;
                    document.getElementById("bigcrunch").click()
                }
            }
            player.autobuyers[11].ticks = 1;
        }
    } else player.autobuyers[11].ticks += 1;

    }


    if (player.autobuyers[10]%1 !== 0) {
        if (player.autobuyers[10].ticks*100 >= player.autobuyers[10].interval && (player.currentChallenge == "challenge4" ? player.sixthAmount >= getGalaxyRequirement() : player.eightAmount >= getGalaxyRequirement())) {
            if (player.eternities < 9 || player.autobuyers[10].bulk == 0) {
                if (player.autobuyers[10].isOn && player.autobuyers[10].priority > player.galaxies) {
                    autoS = false;
                    document.getElementById("secondSoftReset").click()
                    player.autobuyers[10].ticks = 1;
                }
            } else if (player.autobuyers[10].isOn && (Math.round(timer * 100))%(Math.round(player.autobuyers[10].bulk * 100)) == 0){
                maxBuyGalaxies()
            }
        } else player.autobuyers[10].ticks += 1;
    }


    if (player.autobuyers[9]%1 !== 0) {
        if (player.autobuyers[9].isOn && dimBoolean()) {
            if (player.resets < 4) softReset(1)
            else if (player.eternities < 10) softReset(player.autobuyers[9].bulk)
            else if ((Math.round(timer * 100))%(Math.round(player.autobuyers[9].bulk * 100)) == 0 && player.eightAmount >= getShiftRequirement(0).amount) maxBuyDimBoosts()
            player.autobuyers[9].ticks = 0
        }
        player.autobuyers[9].ticks += 1;
    }

    if (player.autoSacrifice%1 !== 0) {
        if (calcSacrificeBoost().gte(player.autoSacrifice.priority) && player.autoSacrifice.isOn) {
            sacrifice()
        }
    }




    for (var i=0; i<priority.length; i++) {
        if (priority[i].ticks*100 >= priority[i].interval || priority[i].interval == 100) {
            if ((priority[i].isOn && canBuyDimension(priority[i].tier)) ) {
                if (priority[i] == player.autobuyers[8] ) {
                    if (priority[i].target == 10) buyMaxTickSpeed()
                    else buyTickSpeed()
                } else {
                    if (priority[i].target > 10) {

                        if (player.options.bulkOn) buyManyDimensionAutobuyer(priority[i].target-10, priority[i].bulk)
                        else buyManyDimensionAutobuyer(priority[i].target-10, 1)
                    }
                    else {
                        buyOneDimension(priority[i].target)
                    }
                }
                priority[i].ticks = 0;
            }
        } else priority[i].ticks += 1;
    }
    updateCosts()

}


setInterval(function() {
    timer += 0.05
    if (!player.infinityUpgrades.includes("autoBuyerUpgrade")) autoBuyerTick()
}, 100)

setInterval(function() {
    if (player.infinityUpgrades.includes("autoBuyerUpgrade")) autoBuyerTick()
}, 50)

/*function cheat() {
    player.infinitied = 1500
    player.totalTimePlayed = 600*60*24*5
    player.infinityPoints = 99999
    player.challenges.push("challenge1")
    player.challenges.push("challenge2")
    player.challenges.push("challenge3")
    player.challenges.push("challenge4")
    player.challenges.push("challenge5")
    player.challenges.push("challenge6")
    player.challenges.push("challenge7")
    player.challenges.push("challenge8")
    player.challenges.push("challenge9")
    player.challenges.push("challenge10")
    player.challenges.push("challenge11")
    player.challenges.push("challenge12")
    updateChallenges()
    updateAutobuyers()
}
function chall7cheat() {
    player.infinitied = 50
    player.infinityPoints = 50
    player.totalTimePlayed = 600*60*24*5
    player.challenges.push("challenge1")
    updateChallenges()
    updateAutobuyers()
    setInterval(function() {
        document.getElementById("maxall").click()
        document.getElementById("secondSoftReset").click()
        document.getElementById("softReset").click()
    }, 100)
}*/



var newsArray;

function updateNewsArray() {
newsArray = [//always true
["The cookie is a lie.", true, "a1"], ["Antimatter cookies have been confirmed to not exist, whoever claims that, stop.", true, "a4"], ["Antimatter ghosts do not exist. Just like matter ghosts. They don't have any matter, for that matter.", true, "a2"],
["Nuclear power plants have been abandoned in favor of antimatter power.", true, "a3"], 
["Antimatter prices have drastically dropped due to newfound abundance.", true, "a5"], ["In the news today, humans make a antimatter animal sacrifice to the antimatter god.", true, "a6"], ["You made one antimatter! Whatever that means.", true, "a7"],
["Scientists confirm that the colour of antimatter is Blurple", true, "a11"], ["How does it matter if its antimatter?", true, "a10"], ["None of this matters", true, "a9"], ["IN THE END, IT DOESN'T ANTIMATTER -hevipelle", true, "a8"],
["How does NASA organise a party? They planet.", true, "a12"], ["Electrons are now seeing the happy things in life. We're calling these happy electrons 'Positrons.' Wait, that's taken?", true, "a13"],
["This completely useless sentence will get you nowhere and you know it. What a horrible obnoxious man would come up with it, he will probably go to hell, and why would the developer even implement it? Even if you kept reading it you wouldn't be able to finish it (the first time).", true, "a14"],
["GHOST SAYS HELLO -Boo-chan", true, "a15"], ["Can someone tell hevi to calm down? -Mee6", true, "a16"], ["Due to Antimatter messing with physics, a creature that was once a moose is now a human", true, "a17"], ["!hi", true, "a18"], 
["Alright -Alright", true, "a19"], ["The English greeting is not present in Antimatter speak.", true, "a20"], ["To buy max or not to buy max, that is the question", true, "a21"], ["This antimatter triggers me", true, "a22"],
["No, mom, I can't pause this game.", true, "a23"], ["Scientific notation has entered the battlefield.", true, "a24"], ["Make the Universe Great Again! -Tronald Dump", true, "a25"], ["#dank-maymays", true, "a26"],
["A new religion has been created, and it's spreading like wildfire. The believers of this religion worship the Heavenly Pelle, the goddess of antimatter. They also believe that 10^308 is infinite.", true, "a27"], ["Someone has just touched a blob, and blown up. Was the blob antimatter, or was the guy made of Explodium?", true, "a28"], 
["If you are not playing on Kongregate or ivark.github.io, the site is bootleg.", true, "a29"], ["Rate 5 on Kongregate so more people can experience this 5 star Rating", true, "a30"], ["BOO!", true, "a31"], ["You ate for too long. -hevipelle", true, "a32"], ["I hate myself. -Boo-chan", true, "a33"],
["Gee golly -Xandawesome", true, "a34"], ["Above us, there is nothing above, But the stars, above.", true, "a35"], ["If black lives matter, do white lives antimatter?", true, "a36"], ["Somebody wasn't nice, he got an antimatter-storm.", true, "a37"],
["You are living, you occupy space, you have a mass, you matter... unless you antimatter.", true, "a38"], ["I clicked too fast... my PC is now dematerialised.", true, "a39"],
["If an alien lands on your front lawn and extends an appendage as a gesture of greeting, before you get friendly, toss it an eightball. If the appendage explodes, then the alien was probably made of antimatter. If not, then you can proceed to take it to your leader. -Neil deGrasse Tyson", true, "a40"],
["There always must be equal matter than there is antimatter, I guess your mom balances that a bit", true, "a41"], ["Nothing is created, nothing is destroyed.", true, "a42"], ["We dug a big hole to store this antimatter... Adele's rolling in it.", true, "a43"],
["If everything is antimatter, how can you see yourself?", true, "a44"], ["The stock markets have crashed due to antimatter beings somehow knowing what they will be tomorrow.", true, "a45"], ["My dog ate too much antimatter, now he is doing 'meow!'", true, "a46"], ["If you put infinity into your calculator it will result in 42!", true, "a47"],
["You have found the rarest antimatter pepe, it's ultra rare!", true, "a48"], ["Can we get 1e169 likes on this video??? Smash that like button!!", true, "a49"],
["The smell of antimatter has been revealed. It smells like kittens", true, "a50"], ["Just another antimatter in the wall", true, "a51"], ["GET SNIPED, WEAKLING", true, "a52"], ["Thanks a lot -dankesehr", true, "a53"],
["This world situation is a SOS situation to the world!! MAYDAY, MAYDAY!!", true, "a54"], ["As for sure as the sun rises in the west, of all the singers and poets on earth, I am the bestest. - hevipelle", true, "a55"], ["I'm good at using github -hevipelle", true, "a56"],
["A new chat server has been created for Antimatter people to spy on Matter people, and the world has fallen into chaos and discord", true, "a57"], ["A new study has come out linking the consumption of potatoes with increased risk of Antimatter implosion.  Scientists suggest eating more.", true, "a58"], ["I thought that I fixed that bug but apparently some update broke it again -hevipelle", true, "a59"],
["Maybe I'm gay then -Bootato", true, "a60"], ["Breaking news! Hevipelle has just announced that the buy max button is in fact going to be removed!", true, "a61"], ["I dedicate this game to my girlfriend", true, "a62"],
["Antimatter guns don't kill antimatter people, antimatter people kill antimatter people but does that mean that antimatter toaster doesn't toast antimatter toasts, antimatter toast toasts antimatter toasts?", true, "a63"],
["But to an antimatter person, wouldn't they be matter and us antimatter?", true, "a64"], ["And nothing Antimatters", true, "a65"], 
["School starting up strikes fear in students universe-wide, as schools are no longer segregated between Matter and antimatter. Annihilation is prominent.", true, "a66"],
["Why does no one talk about the 0th dimension?", true, "a67"], ["The fatter catter satter on the antimatter.", true, "a68"], ["Who let the DOgs out?", true, "a69"], ["If you can't read this you disabled the news.", true, "a70"],
["Doesn't leave, just mutes the server so he doesn't receive notifications", true, "a71"], ["Most quotes found online are falsely atributed -Abraham Lincoln", true, "a72"], ["It should work now, but it doesn't -hevipelle", true, "a73"],
["This game doesn't have any errors... they're alternative successes.", true, "a74"], ["A third type of matter has been discovered: null matter. It doesn't do anything and is basically useless. The scientists who discovered it were fired.", true, "a75"],
["Your Mother-in-Law keeps nagging you about all these antimatter colliders.", true, "a76"], ["If matter exists, then does antimatter not exist?", true, "a77"], ["Antimatter=Life. Not cobblestone, not dirt, nothing like that. Antimatter.", true, "a78"],
["Breaking News: Error Error Error", true, "a79"], ["How much antiwood could an antiwoodchuck chuck if an antiwoodchuck could chuck antiwood?", true, "a80"], ["Chaos isnt a pit, chaos is a matter", true, "a81"],
["That's because I'm a good game developer and pushed some code that totally works -hevipelle", true, "a82"], ["What's the matter with anti matter?", true, "a83"],
["Doesn't it annoy you when people don't finish their", true, "a84"], ["Don't anti-quote me on this", true, "a85"], ["Antimatter is honest, matter makes up everything", true, "a86"],
["According to no known laws of aviation, there are multiple ways a bee should be able to be swallowed up by antimatter", true, "a87"], ["You either die as matter or live long enough to be consumed by the antimatter, and then die again", true, "a88"],
["If you gaze long enough into the antimatter, the antimatter gazes back into you", true, "a89"], ["Always gonna give you up. Always gonna let you down. - anti-Rick Astley", true, "a90"],
["Antimatter Dimensions: the next update is always 5 hours away. Always.", true, "a91"], ["#DimensionLivesAntimatter", true, "a92"],
["Do antimatter people with suicidal thoughts get depressants?", true, "a93"], ["To matter or to antimatter, that is the question.", true, "a94"], ["Why is everything so Hevi?",  true, "a95"],
["It has been scientifically proven ages ago, that cats made of matter are assholes. We have good news, because cats made of antimatter are still assholes",  true, "a96"],
["Nobody once told me the anti-world wasn’t gonna roll me", true, "a97"], ["Antimatter is like internet. If you're reading this, you can't have enough of it.",  true, "a98"],
["Antimatter has made time travel possible and I'm here to make the past great again. - 2nd President of the World",  true, "a99"],
["Please insert Disc -1 to continue playing  Antimatter Dimensions ™.", true, "a100"], ["Lore - coming soon ™", true, "a101"], 
["I was a part of antimatter like you once. But then I got matter in my knee.", true, "a101"], ["Antimatter... antimatter never changes... until you get to quantum physics of antimatter, but we don't have enough tachyon particles for that.", true, "a102"], 
["There is no war in Antimatter Dimensions. Here we are safe. Here we are free.", true, "a103"], ["Antimatter has solved global warming.  In unrelated news, the Earth no longer exists.",  true, "a104"],
["Anti-water, anti-Earth, anti-fire, anti-air. Long ago, the four anti-nations lived together in harmony. Then, everything changed when the anti-Fire Nation attacked. Only the anti-Avatar, the master of all 4 anti-elements could bring balance to the anti-world, but when the world needed him most, he accidentally touched some regular matter and exploded.",  true, "a105"],
["If you open an anti-lootbox, are you selling random possessions for in-game currency?", true, "a106"], ["People are beginning to question Hevipelle's existence.",  true, "a107"], ["Antimatter Dimensions is proud to be sponsored by Lehmä! Now offering - grass eating lessons! Learn what grass is safe to eat and what grass isn't.",  true, "a108"],
["It is the year 2422. The update still isn't out. Hevi is working on balancing unfunity dimension dimensions and challenges for the 38th layer of prestige. There are over 100 rows of achievements. They're getting ready to start using breaking_breaking_breaking_infinity.js", true, "a109"],
["Import Christmas for a secret theme", true, "a110"],
["What the f*ck did you just f*cking say about me, you little b*tch? I’ll have you know I graduated top of my class in the Antimatter Seals, and I’ve been involved in numerous secret raids on the 9th Dimension, and I have over 300 NNnNeMI-NNnNe confirmed kills. I am trained in potato warfare and I’m the top sniper in the entire Antimatter Galactic armed forces. You are nothing to me but just another infinity. I will wipe you the f*ck out with Max All mashing the likes of which has never been seen before in this dimension, mark my f*cking words. You think you can get away with saying that shit to me over the Interdimensional network? Think again, f*cker. As we speak I am contacting my secret network of autobuyers across the galaxy and your IP is being traced right now so you better prepare for the Big Crunch, maggot. The Big Crunch that wipes out the pathetic little thing you call your life. You’re f*cking dead, kid. I can be anywhere, anytime, and I can kill you in over seven 😠💩 different ways, and that’s just with my mouse. Not only am I extensively trained in dimension shift combat, but I have access to the entire arsenal of the Antimatter Marine Corps and I will use it to its full extent to wipe your miserable ass off the face of the universe, you little shit. If only you could have known what unhevi retribution your little “clever” comment was about to bring down upon you, maybe you would have held your f*cking tongue. But you couldn’t, you didn’t, and now you’re buying until 10, you goddamn idiot. I will shit antimatter shit all over you and you will drown in it. You’re f*cking dead, kiddo.", true, "a111"],
["So I've pondered this question for a long time. Antimatter Dimensions... what does it mean? I mean it's game, that's clear. You buy the first dimension, and it gives you antimatter, and the second dimension provides more first dimensions and so on... But what does it mean? It can't just be a game, it seems too plain for that. The developer must have made it as a metaphor. I was doing my weekly ritual of using the fingernail clipper to cut my pubic hair, when finally the realization came to me. The dimensions are just thinly veiled misspellings of the word 'depression'. Regular matter are the cruel and negative thoughts that add to and fuel depression, while antimatter is the positive thoughts and good friends that dispel it You start off with something simple, and it fights almost imperceptibly against the depression, but as you keep going the fight builds. But it never seems to fix everything. The depression seems like it could go on to infinity. So you keep going. But eventually, you figure out, depression isn't infinite. It's just very very large. But your 'dimensions' eventually, with enough work, make enough 'antimatter' to usurp that seeming infinity of depression. Then the possibilities are endless. You are actually happy for once, and your happiness grows exponentially as you go beyond and seemingly 'break' the 'infinity' of depression. And you go on until that 'infinity' seems tiny in comparison to the happiness you've managed to achieve in your life, where if you reset you get over that infinity in less than the blink of an eye. If you want to know what the multiple layers of prestige are...'Dimensional Shifts' are getting new things and methods to give you happiness. 'Dimensional Boosts' are upgrading the things and methods. Examples would be getting a new car being a 'Dimensional Shift' and trading that car in for a new one would be a 'Dimensional Boost'. 'Eternities' are major tragedies such as a loved one dying. That lapse brings you straight back to the beginning, with seemingly no hope of return. But with time, you grow back stronger and happier than ever before. 'Dimesional Sacrifice' is moving away. You have to give up a lot of the things you had that made you happy, but there is new opportunity in where you move to. And that new opportunity gives you more happiness than you ever had. 'Tickspeed' is how easy it is to make you happy, and 'Time Dimensions' make it even easier to be happy. Antimatter Dimensions is a metaphor for a depressed man's successful battle against his illness.",true ,"a112"],
[`(Make me sleep) 
    Put me to sleep inside. 
    (I can't sleep) 
    Put me to sleep inside. 
    (Leave me) 
    Whisper my name and give me to the dark. 
    (Make me sleep) 
    Bid my milk to stay. 
    (I can't fall asleep) 
    Before I become done. 
    (Leave me) 
    Leave me to the nothing I've become.`, true, "a113"],
["A preview of the next update - loot boxes! Feel a sense of pride and progression as you open cosmic, galactic, and universal lootboxes for chances at rare skins, unique challenges with uniquer rewards, time skips and even new dimensions!", true, "a114"],
["The intent of dimensions is to give a sense of pride and accomplishment", true, "a115"],
["Refreshing cures cancer", true, "a116"],
["I have a 9th, i have a dimension... UHH... IT DOESN'T EXIST!", true, "a117"],
["Since when did we start reporting stuff like this? Half of it isn't even proper news, it's just jokes and meta-references, it doesn't even make sens-HAHAHA DISREGARD THAT I SUCK CO-", true, "a118"],
["The year is 1944, Hevipelle can't release updates for AD because he doesn't exist", true, "a119"],
[`"THAT DIMENSION DOESN'T EXIST" -GhostBot`, true, "a120"],
["Most things you know as nuts are actually Drupe seeds or Legumes. Hevipelle on the other hand is quite crazy and can thus be considered a dry uncompartmented fruit.", true, "a121"],
[eval(`LZString.decompressFromEncodedURIComponent("GISwdgNghmAmAEsCmBjaAnJBneAXAFlLvCLgOQ5a5Tq7gDmeA9iQLYAOTt8AwjCknRA")`), true, "a122"],
[eval(`LZString.decompressFromEncodedURIComponent("IIGxAIBcAsEsGdywLYAcD2AnSsB2BzJRZAQwGs9DkBTcAYXVwDMBXeagEyA")`), true, "a123"],
//basic (pre-inf)
["You just made your 1,000,000,000,000,000 antimatter. This one tastes like chicken", player.money.e == 15, "b1"],
["Nerf the galaxies please.", player.galaxies == 2 || player.infinitied > 0, "b2"],
["What do you mean, more than two dimensions??? We're on a screen, clearly there are only 2 dimensions.", player.thirdAmount.gt(0) || player.resets > 0, "b3"],
["How much is Infinity? -literally everyone at least once", player.eightAmount.eq(190) || player.infinitied > 0, "b4"], 
["Eh, the Fourth Dimension is alright...", player.fourthAmount.gt(0) && player.fifthAmount.eq(0), "b5"],
["Antimatter people seem to be even more afraid of 13 then we are. They destroyed entire galaxies just to remove 13 from their percents.", player.galaxies > 0 || player.infinitied > 0, "b8"],
["To understand dimensional sacrifice, you do actually need a PhD in theoretical physics. Sorry!", player.sacrificed.e >= 10 || player.resets >= 6, "b9"], 
["A new group for the standardisation of numbers have come forward with a novel new format involving emoji's.", player.spreadingCancer > 0, "b11"], 
["Antimatter ice cream stand has recently opened- they have octillions of flavors!", player.totalmoney.e >= 27, "b13"], 
["The Heavenly Pelle has generated too much antimatter and needed to create another galaxy. This one can be seen in the southwestern sky.", player.galaxies > 0 || player.infinitied > 0, "b21"],
["What does the CTRL button do again?", controlDown, "b27"],
//9th dim
["9th Dimension is a lie.", player.resets >= 5 || player.galaxies > 0, "b6"],
["The square root of 9 is 3, therefore the 9th dimension can't exist.", player.resets >= 5 || player.galaxies > 0, "b7"], 
["You got assimilated by the 9th dimension? Just call your doctor for mental illness!", player.resets >= 5 || player.galaxies > 0, "b10"], 
["Why is there no 9th dimension? Because 7 8 9.", player.resets >= 5 || player.galaxies > 0, "b12"],
["The 9th dimension cannot exist because the Nein-speaking nazis died in WW2.", player.resets >= 5 || player.galaxies > 0, "b14"],
["If you break the fourth wall... well, there's still the fifth, sixth, seventh, and eighth to get through before you encounter bad things, so you should be fine", player.resets >= 5 || player.galaxies > 0, "b17"], 
["Conditions must be met for Hevipelle to sleep. First, it needs to be a blue moon. Second, a specific town in the arctic must have not seen light for a month. Third, he needs to release an AD update. And finally, no one on the discord can be on dimension 9. Only then can he rest, for up to 6 hours, before waking up forcefully to avoid getting the offline achievement.", (player.resets >= 5 || player.galaxies > 0) && player.achievements.includes("r22"), "b22"],
["If the 9th dimension is all evil, then is 3 the root of all evil?", player.resets >= 5 || player.galaxies > 0, "b24"],
//basic (post-inf pre-rep)
["I've got 1.79e308 problems, but none of them antimatters", player.infinitied > 0 && !player.break, "b15"],
["Anti Emoji Movie a huge hit", player.spreadingCancer >= 5, "b18"],
["If this game was made by Valve, Zero Deaths would be impossible.", player.achievements.includes("r43"), "b19"],
["Florida man attempts to get Zero Deaths on first run, is stopped by heat death of the universe.", player.achievements.includes("r43"), "b16"], 
["Having done half the achievements isn't much of an achievement -Boo", player.achievements.length >= 40, "b20"], 
//basic (post-rep)
["Thanos is gonna be super dissapointed when he shows up with a fully powered infinity gauntlet, and Hevi has a fully powered eternity gauntlet", player.eternities > 0, "b23"], 
["New strange material was been found. It seems to grow exponentially, but only helps with antimatter production.", player.replicanti.unl && player.replicanti.chance == 0.01, "b25"],
["It seems this \"replicanti\" stuff won't be growing any faster now.", player.replicanti.chance == 1 && player.replicanti.interval == 1, "b26"],
//newsarray
["Does Hevi just pick quotes to put into the game?", player.newsArray.length >= 30, "n3"],
["New news company has become rivals with us. They are made entirely of antimatter.", player.newsArray.length >= 80, "n1"], 
["How many times can we use \"Anti\" in a row before people stop listening?", player.newsArray.length >= 100, "n5"],
["Need more quotes! -hevipelle", player.newsArray.length >= 135, "n2"], 
["You're almost there!", player.newsArray.length >= 160, "n11"],
["You can stop now", player.newsArray.length >= 165, "n9"],
["fucking hacker", player.newsArray.length >= 175, "n10"],
["Asian man trys to steal the trophy of fastest infinty of -1 seconds, AND HE DOES IT!", player.newsArray.includes("c1"), "n4"],
["I broke the 8th wall, there is only chaos, Slabdrill is ritually sacrificing antimatter to the 9th dimension. This will be my last entry, may Hevipelle have mercy on our souls, we didn't listen, We should have listened.", player.newsArray.includes("b17"), "n6"],
["I thought the update was 5 hours away... -new players after more than 5 hours of gameplay", player.newsArray.includes("a91") && player.totalTimePlayed >= 600*300, "n7"],
["Somebody told me to wait five hours for the update yesterday but it's today and it still hasn't come! What do I do?", player.newsArray.includes("a91") && player.totalTimePlayed >= 600*300, "n8"], 
//hard
["You do know that you won't reach Infinity in -1 seconds, right?", player.bestInfinityTime == 0.1, "c1"],
["Where does Antimatter Nemo live? In a NNnNeMI-NNnNe.", player.totalmoney.e >= 3e6, "c2"],  //might not be poss?
["Anti Emoji Movie MMMCMXCIX is a major hit!", player.spreadingCancer >= 3999, "c3"],
["Achievement Unlocked!", player.achievements.length == 88, "c4"],
["Did you use an autoclicker for that?", player.timestudy.studies.includes(131) && player.thisInfinityTime <= 600 && player.replicanti.galaxies >= 50, "c5"],
["Timing is key.", player.thisEternity < 1, "c6"],
["If you want to farm infinitied, why don't you just get the time study?", !player.timestudy.studies.includes(32) && player.infinitied > 72000 * 168, "c7"],
["The achievement is for two million, not two billion...", player.infinitied > 2e9, "c8"],
["Keep up the quick pace!", Marathon > 1200, "c9"],
["One day you will stop your incessant grind.", player.eternities > 50000, "c10"],
["You can probably stop farming for eternities now...", player.eternities > 2000000, "c11"],
["Are you serious?", worstChallengeTime <= 0.1, "c12"],
["The amazing speedster", infchallengeTimes <= 0.8, "c13"],
//luck
["This news message is 1000x rarer than all the others.", Math.random() < 0.001, "l1"],
["You just won a small prize in the lottery.", Math.random() < 1e-4, "l2"],
["You just won a moderate prize in the lottery.", Math.random() < 1e-5, "l3"],
["You just won a large prize in the lottery.", Math.random() < 1e-6, "l4"],
["You just won a huge prize in the lottery.", Math.random() < 1e-7, "l5"],
["You just won a massive prize in the lottery.", Math.random() < 1e-8, "l6"],
["You just won a very massive prize in the lottery.", Math.random() < 1e-9, "l7"],
["You just won the lottery.", Math.random() < 1e-10, "l8"],
["Just how lucky are you?", Math.random() < 1e-11, "l9"],
["This news message is 1000000000000x rarer than all the others.", Math.random() <= 1e-12, "l10"],
//missable / pay req
["How dare you actually get zero deaths on a first run?", player.achievements.includes("r43") && player.infinitied == 1 && player.eternities == 0, "s1"],
["Legend says the ninth dimension is supposed to be found here, but I don't see anything.", player.money.e >= 41900 && !player.replicanti.unl && player.eternities == 0, "s2"],
["Person with money likes to support this game.", kongDimMult > 1 || kongIPMult > 1, "s3"],
["Whale is bad at making smart purchases.", kongIPMult > 500 && kongDimMult < 5e307, "s4"],
["Whale complains that the game broke.", kongDimMult > 5e307, "s5"],
["Whale complains that their buying isn't doing anything.", kongIPMult > 1.8e16, "s6"]
];}

var s = document.getElementById('news');
document.addEventListener("visibilitychange", function() {if (!document.hidden) {scrollNextMessage();}}, false);
var scrollTimeouts = [];
var nextMsgIndex;
function scrollNextMessage() {
  //don't run if hidden to save performance
  if (player.options.newsHidden) return false
  updateNewsArray();
  //select a message at random
  
  try {
    do {nextMsgIndex = Math.floor(Math.random() * newsArray.length)} while (!newsArray[nextMsgIndex][1])
  } catch(e) {
      console.log("Newsarray doesn't work at idx " + nextMsgIndex)
  }

  scrollTimeouts.forEach(function(v) {clearTimeout(v);});
  scrollTimeouts = [];

  //set the text
  s.innerHTML = newsArray[nextMsgIndex][0];

  //get the parent width so we can start the message beyond it
  let parentWidth = s.parentElement.clientWidth;

  //set the transition to blank so the move happens immediately
  s.style.transition = '';
  //move div_text to the right, beyond the edge of the div_container
  s.style.transform = 'translateX('+parentWidth+'px)';

  //we need to use a setTimeout here to allow the browser time to move the div_text before we start the scrolling
  scrollTimeouts.push(setTimeout( function() {
    //distance to travel is s.parentElement.clientWidth + s.clientWidth + parent padding
    //we want to travel at rate pixels per second so we need to travel for (distance / rate) seconds
    let dist = s.parentElement.clientWidth + s.clientWidth + 20; //20 is div_container padding
    let rate = 100; //change this value to change the scroll speed
    let transformDuration = dist / rate;

    if (!player.options.newsHidden && !player.newsArray.includes(newsArray[nextMsgIndex][2])) {
        player.newsArray.push(newsArray[nextMsgIndex][2]);
        if (player.newsArray.length>=50) giveAchievement("Fake News")
    }


    //set the transition duration
    s.style.transition = 'transform '+transformDuration+'s linear';
    let textWidth = s.clientWidth;
    //we need to move it to -(width+parent padding) before it won't be visible
    s.style.transform = 'translateX(-'+(textWidth+5)+'px)';
    //automatically start the next message scrolling after this one finishes
    //you could add more time to this timeout if you wanted to have some time between messages
    scrollTimeouts.push(setTimeout(scrollNextMessage, Math.ceil(transformDuration * 1000)));
  }, 100));
}

  //start scrolling
  scrollNextMessage();

document.getElementById("challenge2").onclick = function () {
  startChallenge("challenge2", Number.MAX_VALUE)
}

document.getElementById("challenge3").onclick = function () {
  startChallenge("challenge3", Number.MAX_VALUE)
}

document.getElementById("challenge4").onclick = function () {
  startChallenge("challenge4", Number.MAX_VALUE)
}

document.getElementById("challenge5").onclick = function () {
  startChallenge("challenge5", Number.MAX_VALUE);
}

document.getElementById("challenge6").onclick = function () {
  startChallenge("challenge6", Number.MAX_VALUE);
}

document.getElementById("challenge7").onclick = function () {
  startChallenge("challenge7", Number.MAX_VALUE);
}

document.getElementById("challenge8").onclick = function () {
  startChallenge("challenge8", Number.MAX_VALUE);
}

document.getElementById("challenge9").onclick = function () {
  startChallenge("challenge9", Number.MAX_VALUE);
}

document.getElementById("challenge10").onclick = function () {
  startChallenge("challenge10", Number.MAX_VALUE);
}

document.getElementById("challenge11").onclick = function () {
    startChallenge("challenge11", Number.MAX_VALUE);
  }

document.getElementById("challenge12").onclick = function () {
  startChallenge("challenge12", Number.MAX_VALUE);
}



function showInfTab(tabName) {
    //iterate over all elements in div_tab class. Hide everything that's not tabName and show tabName
    var tabs = document.getElementsByClassName('inftab');
    var tab;
    for (var i = 0; i < tabs.length; i++) {
        tab = tabs.item(i);
        if (tab.id === tabName) {
            tab.style.display = 'block';
        } else {
            tab.style.display = 'none';
        }
    }
}

function showStatsTab(tabName) {
    //iterate over all elements in div_tab class. Hide everything that's not tabName and show tabName
    var tabs = document.getElementsByClassName('statstab');
    var tab;
    for (var i = 0; i < tabs.length; i++) {
        tab = tabs.item(i);
        if (tab.id === tabName) {
            tab.style.display = 'block';
        } else {
            tab.style.display = 'none';
        }
    }
}

function showDimTab(tabName) {
    //iterate over all elements in div_tab class. Hide everything that's not tabName and show tabName
    var tabs = document.getElementsByClassName('dimtab');
    var tab;
    for (var i = 0; i < tabs.length; i++) {
        tab = tabs.item(i);
        if (tab.id === tabName) {
            tab.style.display = 'block';
        } else {
            tab.style.display = 'none';
        }
    }
}

function showChallengesTab(tabName) {
    //iterate over all elements in div_tab class. Hide everything that's not tabName and show tabName
    var tabs = document.getElementsByClassName('challengeTab');
    var tab;
    for (var i = 0; i < tabs.length; i++) {
        tab = tabs.item(i);
        if (tab.id === tabName) {
            tab.style.display = 'block';
        } else {
            tab.style.display = 'none';
        }
    }
}

function showEternityTab(tabName) {
    //iterate over all elements in div_tab class. Hide everything that's not tabName and show tabName
    var tabs = document.getElementsByClassName('eternitytab');
    var tab;
    for (var i = 0; i < tabs.length; i++) {
        tab = tabs.item(i);
        if (tab.id === tabName) {
            tab.style.display = 'block';
        } else {
            tab.style.display = 'none';
        }
    }
    resizeCanvas();
    drawStudyTree();
}




function init() {
    console.log('init');

    //setup the onclick callbacks for the buttons
    document.getElementById('dimensionsbtn').onclick = function () {
        showTab('dimensions');
    };
    document.getElementById('optionsbtn').onclick = function () {
        showTab('options');
    };
    document.getElementById('statisticsbtn').onclick = function () {
        showTab('statistics');
    };
    document.getElementById('achievementsbtn').onclick = function () {
        showTab('achievements');
    };
    document.getElementById('challengesbtn').onclick=function () {
      showTab('challenges');
    };
    document.getElementById('infinitybtn').onclick = function () {
        showTab('infinity');
    };
    document.getElementById("shopbtn").onclick = function () {
        showTab('shop')
        updateKongPurchases()
    }
    document.getElementById("eternitystorebtn").onclick = function () {
        showTab('eternitystore')
        resizeCanvas()
        drawStudyTree()
    }
    //show one tab during init or they'll all start hidden
    showTab('dimensions')
    showInfTab('preinf')
    showStatsTab('stats')
    showDimTab('antimatterdimensions')
    showChallengesTab('challenges')
    showEternityTab('timestudies')
    load_game();
    updateTickSpeed();
    updateAutobuyers();
    updateChallengeTimes()
    try {
        kongregateAPI.loadAPI(function () {
            window.kongregate = kongregateAPI.getAPI();
        });
        updateKongPurchases()
    } catch (err) {console.log("Couldn't load Kongregate API")}

    //if (typeof kongregate === 'undefined') document.getElementById("shopbtn").style.display = "none"

}


//kongregate purchases



function purchaseIP() {
    console.log("purchase ip")
    kongregate.mtx.purchaseItems(['doubleip'], onPurchaseResult)
}

function purchaseDimMult() {
    kongregate.mtx.purchaseItems(['doublemult'], onPurchaseResult)
}


function purchaseTimeSkip() {
    kongregate.mtx.purchaseItems(['timeskip'], onPurchaseTimeSkip)
}


function onPurchaseResult(result) {
    console.log("purchasing...")
    if (result.success) {
        console.log("purchase successfull!")
        updateKongPurchases()
    }
}


function onPurchaseTimeSkip(result) {
    if (result.success) {
        simulateTime(21600)
    }
}






function updateKongPurchases() {
    console.log("updating kong purchases")
    try {
        kongregate.mtx.requestUserItemList("", items)
        
    } catch(e) {console.log(e)}
    
    function items(result) {
        console.log("checking for all items")
        let ipmult = 0
        let dimmult = 1
        for(var i = 0; i < result.data.length; i++) {
            var item = result.data[i];
            console.log((i+1) + ". " + item.identifier + ", " +
            item.id + "," + item.data);
            if (item.identifier == "doublemult") dimmult *= 2
            if (item.identifier == "doubleip") ipmult += 2

        }
        kongDimMult = dimmult
        if (ipmult !== 0) kongIPMult = ipmult
        else kongIPMult = 1
    }

    document.getElementById("kongip").innerHTML = "Double your IP gain from all sources (additive). Forever. Currently: x"+kongIPMult+", next: "+(kongIPMult==1? 2: kongIPMult+2)+"x"
    document.getElementById("kongdim").innerHTML = "Double all your dimension multipliers (dimensions 1-8) (multiplicative). Forever. Currently: x"+kongDimMult+", next: "+(kongDimMult*2)+"x"
}











//Playfab stuff



function closeToolTip() {
    var elements = document.getElementsByClassName("popup")
    for (var i=0; i<elements.length; i++) elements[i].style.display = "none"
}

function tooltipLoad() {
    loadFromPlayFab()
    closeToolTip()
}

function tooltipSave() {
    saveToPlayFab()
    closeToolTip()
}


function playFabLogin(){


    try {
        var authTicket = kongregate.services.getGameAuthToken();
        var requestData = {
            TitleId: "5695",
            KongregateId: kongregate.services.getUserId(),
            AuthTicket: authTicket,
            CreateAccount: true
        }
        try {
            PlayFab.ClientApi.LoginWithKongregate(requestData, playFabLoginCallback);
        }
        catch (e){
            console.log("Unable to send login request to PlayFab.");
        }
    } catch (e) {console.log(e)}
}

var playFabId = -1
function playFabLoginCallback(data, error){
    if (error){
        console.log(error.errorMessage);
        $.notify("Couldn't log in to PlayFab Cloud. You need to be logged in to Kongregate.", "error")
        document.getElementById("cloudOptions").style.display = "none"
        document.getElementById("cloud").style.display = "none"
        return;
    }
    if (data){
        //NOTE: SAVE 'playFabId' to a global variable somewhere, I just declare mine at the start of the playfab stuff. Use this variable to tell if your player is logged in to playfab or not.
        playFabId = data.data.PlayFabId;
        $.notify("Logged in to PlayFab Cloud", "info")

        if (player.options.cloud) playFabLoadCheck()
        console.log("Logged in to playFab")
    }
}


function playFabSaveCheck(){
	if (playFabId == -1) return false;
	if (typeof PlayFab === 'undefined' || typeof PlayFab.ClientApi === 'undefined'){
		//Should never get this far without the api
		console.log(error);
		return;
	}
	var requestData = {
		Keys: ["infinitied", "eternities"],
		PlayFabId: playFabId
	}
	try {
		PlayFab.ClientApi.GetUserData(requestData, playFabSaveCheckCallback);
	}
	catch (e){console.log(e);}
}

function playFabSaveCheckCallback(data, error){
	if (error){
		console.log("error checking existing PlayFab data");
        console.log(error);
        playFabLogin()
		return;
	}
	if (data){
        var playFabInfinitied = (data.data.Data.infinitied) ? parseInt(data.data.Data.infinitied.Value) : 0;
        var playFabEternities = (data.data.Data.eternities) ? parseInt(data.data.Data.eternities.Value) : 0;
        if (playFabEternities > player.eternities){
            document.getElementById("saveCloud").style.display = "block";
            document.getElementById("savePopup").innerHTML = "You have a cloud save with "+playFabInfinitied+ " Infinities and "+playFabEternities+" Eternities your local save has "+player.infinitied+" Infinities and "+player.eternities+" Eternities. Do you want to overwrite the cloud save?"
			return;
        }
		else if (playFabEternities == player.eternities && playFabInfinitied > player.infinitied){
            document.getElementById("saveCloud").style.display = "block";
            document.getElementById("savePopup").innerHTML = "You have a cloud save with "+playFabInfinitied+ " Infinities and "+playFabEternities+" Eternities your local save has "+player.infinitied+" Infinities and "+player.eternities+" Eternities. Do you want to overwrite the cloud save?"
			return;
		}
		else saveToPlayFab();
	}
}

function saveToPlayFab(){
    if (!playFabId || typeof PlayFab === 'undefined' || typeof PlayFab.ClientApi === 'undefined') return false;
    var requestData = {
        TitleId: "5695",
        PlayFabId: playFabId,
        Data: {
            save: LZString.compressToEncodedURIComponent(JSON.stringify(player)),
            infinitied: player.infinitied,
            eternities: player.eternities
        }
    }
    try{
        PlayFab.ClientApi.UpdateUserData(requestData, saveToPlayFabCallback);
    }
    catch(e){console.log(e);}
}

function saveToPlayFabCallback(data, error){
    if (error){
        console.log(error);
        return false;

    }
    if (data){
        console.log("Game Saved!");
        $.notify("Game saved to cloud", "info")
        save_game()
        return true;
    }
}

function loadFromPlayFab(){
    if (!playFabId || typeof PlayFab === 'undefined' || typeof PlayFab.ClientApi === 'undefined'){
        console.log(playFabId, PlayFab);
         return false;
    }
    var requestData = {
        Keys: ["save"],
        PlayFabId: playFabId
    }
    try{
        console.log('attempting to send load request');
        PlayFab.ClientApi.GetUserData(requestData, loadFromPlayFabCallback);
        console.log('sent load request');
    }
    catch(e){console.log(e);}
}

function loadFromPlayFabCallback(data, error){
    console.log('loading callback fired');
    console.log(data, error);
    if (error){
        console.log(error);
        return;
    }
    if (data){
        console.log(data)
        $.notify("Loaded from cloud", "info")
        var id = playFabId;
        loadFromString(data.data.Data.save.Value);
    }
}


function playFabLoadCheck() {
    if (!playFabId || typeof PlayFab === 'undefined' || typeof PlayFab.ClientApi === 'undefined'){
        console.log(playFabId, PlayFab);
         return false;
    }
    var requestData = {
        Keys: ["infinitied", "eternities"],
        PlayFabId: playFabId
    }
    try{
        console.log('attempting to send load request');
        PlayFab.ClientApi.GetUserData(requestData, playFabLoadCheckCallback);
        console.log('sent load request');
    }
    catch(e){console.log(e);}
}

function playFabLoadCheckCallback(data, error) {
    if (error){
		console.log("error checking existing PlayFab data");
		console.log(error);
		return;
	}
	if (data){
        var playFabInfinitied = (data.data.Data.infinitied) ? parseInt(data.data.Data.infinitied.Value) : 0;
        var playFabEternities = (data.data.Data.eternities) ? parseInt(data.data.Data.eternities.Value) : 0;
		if (playFabInfinitied <= player.infinitied && playFabEternities <= player.eternities){
            document.getElementById("loadCloud").style.display = "block";
            document.getElementById("loadPopup").innerHTML = "You have a cloud save with "+playFabInfinitied+ " Infinities and "+playFabEternities+" Eternities your local save has "+player.infinitied+" Infinities and "+player.eternities+" Eternities. Do you want to load the cloud save?"
			return;
		}
		else loadFromPlayFab();
	}
}

function toggleCloud() {
    if (player.options.cloud) {
        player.options.cloud = false
        document.getElementById("cloud").innerHTML = "Automatic cloud saving/loading OFF"
    } else {
        player.options.cloud = true
        document.getElementById("cloud").innerHTML = "Automatic cloud saving/loading ON"
    }
}


setInterval(function () {
    save_game()
}, 30000);

setInterval(function () {
    if (playFabId != -1 && player.options.cloud) playFabSaveCheck();
}, 1000*60*5)
updateCosts();
//updateInterval();
updateDimensions();
document.getElementById("hiddenheader").style.display = "none";


window.onload = function() {
    startInterval()
    setTimeout(function() {
        playFabLogin();
        updateKongPurchases()
        try {
            if (kongregate.services.getGameAuthToken() === undefined) document.getElementById("shopbtn").style.display = "none"
        } catch(e) {
            console.log(e)
            document.getElementById("shopbtn").style.display = "none"
        }
        document.getElementById("container").style.display = "block"
        document.getElementById("loading").style.display = "none"
    }, 1000)
    
}

window.addEventListener('keydown', function(event) {
    if (event.keyCode == 17) controlDown = true;
    if (event.keyCode == 16) shiftDown = true;
}, false);

window.addEventListener('keyup', function(event) {
    if (event.keyCode == 17) controlDown = false;
    if (event.keyCode == 16) shiftDown = false;
}, false);

window.onfocus = function() {
    controlDown = false;
    shiftDown = false;
}

window.addEventListener('keydown', function(event) {
    if (!player.options.hotkeys || controlDown === true) return false
    const tmp = event.keyCode;
    if (tmp >= 49 && tmp <= 56) {
        if (shiftDown) buyOneDimension(tmp-48)
        else buyManyDimension(tmp-48)
        return false;
    } else if (tmp >= 97 && tmp <= 104) {
        if (shiftDown) buyOneDimension(tmp-96)
        else buyManyDimension(tmp-96)
        return false;
    }
    switch (event.keyCode) {
        case 65: // A
            toggleAutoBuyers();
        break;

        case 68: // D
            var name = TIER_NAMES[getShiftRequirement(0).tier]
            if (player[name + "Amount"] >= getShiftRequirement(0).amount) {
                if (player.infinityUpgrades.includes("bulkBoost")) maxBuyDimBoosts(true);
                else softReset(1)
            }
        break;

        case 71: // G
            document.getElementById("secondSoftReset").onclick();
        break;

        case 77: // M
            document.getElementById("maxall").onclick()
        break;

        case 83: // S
            document.getElementById("sacrifice").onclick()
        break;

        case 84: // T
            if (shiftDown) buyTickSpeed()
            else buyMaxTickSpeed()
        break;

        case 82: //R
            replicantiGalaxy()
        break;
    }
  }, false);

  window.addEventListener('keyup', function(event) {
    if (!player.options.hotkeys || controlDown === true) return false
    switch (event.keyCode) {
        case 67: // C
            document.getElementById("bigcrunch").onclick()
        break;

        case 70: // F
            $.notify("Paying respects", "info")
        break;
    }
  }, false);




init();
var totalMult = 1
var currentMult = 1
var infinitiedMult = 1
var achievementMult = 1
var challengeMult = 1
var unspentBonus = 1
var postc8Mult = new Decimal(0)
var mult18 = 1
var ec10bonus = new Decimal(1)
setInterval( function() {
    totalMult = Math.pow(player.totalmoney.e+1, 0.5)
    currentMult = Math.pow(player.money.e+1, 0.5)
    if (player.timestudy.studies.includes(31)) infinitiedMult = 1 + Math.pow(Math.log10(getInfinitied()+1)*10, 4)
    else infinitiedMult = 1+Math.log10(getInfinitied()+1)*10
    achievementMult = Math.max(Math.pow((player.achievements.length-30), 3)/40,1)
    challengeMult = Decimal.max(10*3000/worstChallengeTime, 1)
    unspentBonus = player.infinityPoints.dividedBy(2).pow(1.5).plus(1)
    mult18 = getDimensionFinalMultiplier(1).times(getDimensionFinalMultiplier(8)).pow(0.02)
    if (player.currentEternityChall == "eterc10") {
        ec10bonus = Decimal.pow(getInfinitied(), 1000).max(1)
        if (player.timestudy.studies.includes(31)) ec10bonus = ec10bonus.pow(4)
    } else {
        ec10bonus = new Decimal(1)
    }
}, 100)
