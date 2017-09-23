var Marathon = 0;
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
    chall11Pow: 1,
    partInfinityPoint: 0,
    partInfinitied: 0,
    break: false,
    challengeTimes: [600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31, 600*60*24*31],
    lastTenRuns: [[600*60*24*31, 1], [600*60*24*31, 1], [600*60*24*31, 1], [600*60*24*31, 1], [600*60*24*31, 1], [600*60*24*31, 1], [600*60*24*31, 1], [600*60*24*31, 1], [600*60*24*31, 1], [600*60*24*31, 1]],
    infMult: 1,
    infMultCost: 100,
    tickSpeedMultDecrease: 10,
    tickSpeedMultDecreaseCost: 3e6,
    dimensionMultDecrease: 10,
    dimensionMultDecreaseCost: 1e8,
    overXGalaxies: 10,
    version: 1,
    infDimensionsUnlocked: [false, false, false, false],
    infinityPower: new Decimal(1),
    infinityDimension1 : {
        cost: 1e6,
        amount: new Decimal(0),
        bought: 0,
        power: 1
    },
    infinityDimension2 : {
        cost: 1e7,
        amount: new Decimal(0),
        bought: 0,
        power: 1
    },
    infinityDimension3 : {
        cost: 1e10,
        amount: new Decimal(0),
        bought: 0,
        power: 1
    },
    infinityDimension4 : {
        cost: 1e20,
        amount: new Decimal(0),
        bought: 0,
        power: 1
    },
    options: {
        newsHidden: false,
        notation: "Standard",
        //Standard = normal prefixed numbers, Scientific = standard form, Engineering = powers of 3.
        scientific: false,
        invert: false,
        challConf: false
    }
};

var c = document.getElementById("game");
var ctx = c.getContext("2d");

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

function set_cookie(cookie_name, value) {
    localStorage.setItem(cookie_name, btoa(JSON.stringify(value, function(k, v) { return (v === Infinity) ? "Infinity" : v; })))
}

function get_cookie(cookie_name) {
    var c_value = document.cookie;
    if (localStorage.getItem("dimensionSave") !== null) {
        return JSON.parse(atob(localStorage.getItem(cookie_name), function(k, v) { return (v === Infinity) ? "Infinity" : v; }))
    } else {
        var c_start = c_value.indexOf(" " + cookie_name + "=");
        if (c_start == -1) {
            c_start = c_value.indexOf(cookie_name + "=");
        }
        if (c_start == -1) return false;
        c_start = c_value.indexOf("=", c_start) + 1;
        var c_end = c_value.indexOf(";", c_start);
        if (c_end == -1) {
            c_end = c_value.length;
        }
        c_value = atob(unescape(c_value.substring(c_start, c_end)));
        set_cookie("dimensionSave", player)
    }
    return JSON.parse(c_value, function(k, v) { return (v === Infinity) ? "Infinity" : v; });
}

try {
	kongregateAPI.loadAPI(function () {
	    window.kongregate = kongregateAPI.getAPI();
	    // You can now access the Kongregate API with:
	    // kongregate.services.getUsername(), etc
	    // Proceed with loading your game...
	});
} catch (err) {console.log("Couldn't load Kongregate API")}

function loadFromString(string) {
    player = JSON.parse(atob(string))
}



function load_game() {
    var save_data = get_cookie('dimensionSave');
    if (!save_data) return;
    player = save_data;
    if (player.totalmoney === undefined) player.totalmoney = player.money;
    if (player.options === undefined) {
        player.options = {
            scientific: false,
            animationOn: true
        }
    }
    if (player.options.notation === undefined) player.options.notation = "Standard"
    if (player.options.invert === undefined) player.options.invert = false;
    if (player.options.challConf === undefined) player.options.challConf = false
	if (player.options.notation === undefined) player.options.notation = "Standard";
	if (player.options.newsHidden === undefined) player.options.newsHidden = false;
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
    if (player.lastTenRuns === undefined) player.lastTenRuns = [[600*60*24*31, 1], [600*60*24*31, 1], [600*60*24*31, 1], [600*60*24*31, 1], [600*60*24*31, 1], [600*60*24*31, 1], [600*60*24*31, 1], [600*60*24*31, 1], [600*60*24*31, 1], [600*60*24*31, 1]]
    if (player.infMult === undefined) player.infMult = 1
    if (player.infMultCost === undefined) player.infMultCost = 100
    if (player.tickSpeedMultDecrease === undefined) player.tickSpeedMultDecrease = 10
    if (player.tickSpeedMultDecreaseCost === undefined) player.tickSpeedMultDecreaseCost = 3e6
    if (player.dimensionMultDecrease === undefined) player.dimensionMultDecrease = 10
    if (player.dimensionMultDecreaseCost === undefined) player.dimensionMultDecreaseCost = 1e8
    if (player.overXGalaxies === undefined) player.overXGalaxies = 10;
    if (player.partInfinitied === undefined) player.partInfinitied = 0
    if (player.secondAmount !== 0) {
        document.getElementById("thirdRow").style.display = "table-row";
        document.getElementById("tickSpeed").style.visibility = "visible";
        document.getElementById("tickSpeedMax").style.visibility = "visible";
        document.getElementById("tickLabel").style.visibility = "visible";
        document.getElementById("tickSpeedAmount").style.visibility = "visible";
    }

    if (player.infinityPower === undefined) {
        player.infinityPower = new Decimal(1)
        player.infinityDimension1 = {
            cost: 1e6,
            amount: new Decimal(0),
            bought: 0,
            power: 1
        }
        player.infinityDimension2 = {
            cost: 1e7,
            amount: new Decimal(0),
            bought: 0,
            power: 1
        }
        player.infinityDimension3 = {
            cost: 1e9,
            amount: new Decimal(0),
            bought: 0,
            power: 1
        }
        player.infinityDimension4 = {
            cost: 1e15,
            amount: new Decimal(0),
            bought: 0,
            power: 1
        }
        player.infDimensionsUnlocked = [false, false, false, false]
    }

    if (player.matter === null) player.matter = new Decimal(0)
    for (var i=0; i<12; i++) {
        if (player.autobuyers[i]%1 !== 0 && player.autobuyers[i].tier === undefined) {
            player.autobuyers[i].tier = i+1
        }
        if (player.autobuyers[i]%1 !== 0 && player.autobuyers[i].target%1 !== 0) {
            player.autobuyers[i].target = i+1
            if (i == 8) player.autobuyers[i].target = 1
        }

        if (player.autobuyers[i]%1 !== 0 && player.autobuyers[i].bulk === undefined) {
            player.autobuyers[i].bulk = 1
        }
    }
    if (player.autobuyers[8].tier == 10) player.autobuyers[8].tier = 9
    if (player.thirdAmount !== 0) document.getElementById("fourthRow").style.display = "table-row";
    if (player.fourthAmount !== 0)
        if (player.resets > 0) document.getElementById("fifthRow").style.display = "table-row";
    if (player.fifthAmount !== 0)
        if (player.resets > 1) document.getElementById("sixthRow").style.display = "table-row";
    if (player.sixthAmount !== 0)
        if (player.resets > 2 && player.currentChallenge !== "challenge4") document.getElementById("seventhRow").style.display = "table-row";
    if (player.seventhAmount !== 0)
        if (player.resets > 3 && player.currentChallenge !== "challenge4") document.getElementById("eightRow").style.display = "table-row";
    transformSaveToDecimal();
    updateCosts();
    updateTickSpeed();
    updateAchPow();
    updateChallenges();
    updateCheckBoxes();
    
    loadAutoBuyerSettings();
    updateLastTenRuns()
    if (player.currentChallenge == "challenge12" || player.currentChallenge == "challenge9" || player.currentChallenge == "challenge5") document.getElementById("quickReset").style.display = "inline-block";
    else document.getElementById("quickReset").style.display = "none";
 

    if (player.break == true) document.getElementById("break").innerHTML = "FIX INFINITY"
    document.getElementById("infiMult").innerHTML = "Multiply infinity points from all sources by 2 <br>currently: "+player.infMult +"x<br>Cost: "+shortenCosts(player.infMultCost)+" IP"

    document.getElementById("notation").innerHTML = "Notation: " + player.options.notation


    if (name == "challenge12") document.getElementById("matter").style.display = "inline-block";
    else document.getElementById("matter").style.display = "none";

    var achievements = document.getElementsByClassName('achievement');
    var achievement;
    for (var i = 0; i < achievements.length; i++) {
        achievement = achievements.item(i);
        if (player.achievements.includes(achievement.id)) {
            achievement.className = 'achievement achievementunlocked';
        } else {
            achievement.className = 'achievement achievementlocked';
        }
    }
    if (player.version === undefined) { // value will need to be adjusted when update goes live
        for (var i = 0; i < player.autobuyers.length; i++) {
            if (player.autobuyers[i]%1 !== 0) player.infinityPoints = player.infinityPoints.plus(player.autobuyers[i].cost - 1)
        }
        player.autobuyers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        player.version = 1
    }

    if (player.options.invert) {
        document.getElementById("body").classList.add("invert");
    }
    if (player.options.newsHidden) {
        document.getElementById("game").style.display = "none";
    }
    if (player.options.challConf) {
        document.getElementById("challengeconfirmation").innerHTML = "Challenge confirmation off"
    } else {
        document.getElementById("challengeconfirmation").innerHTML = "Challenge confirmation on"
    }
    updateAutobuyers();
    setAchieveTooltip();
    totalMult = Math.pow(player.totalmoney.e+1, 0.5)
    currentMult = Math.pow(player.money.e+1, 0.5)
    infinitiedMult = Math.log10(player.infinitied)*10
    achievementMult = Math.max(Math.pow((player.achievements.length-30), 3)/40,1)
    challengeMult = Decimal.max(10*3000/worstChallengeTime, 1)
    unspentBonus = Decimal.pow(player.infinityPoints.dividedBy(2),1.5).plus(1)
}

function save_game() {
    set_cookie('dimensionSave', player);
    $.notify("Game saved", "info")
}


function transformSaveToDecimal() {
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
    player.costMultipliers = [new Decimal(player.costMultipliers[0]), new Decimal(player.costMultipliers[1]), new Decimal(player.costMultipliers[2]), new Decimal(player.costMultipliers[3]), new Decimal(player.costMultipliers[4]), new Decimal(player.costMultipliers[5]), new Decimal(player.costMultipliers[6]), new Decimal(player.costMultipliers[7])]
    player.tickspeedMultiplier = new Decimal(player.tickspeedMultiplier)
    player.matter = new Decimal(player.matter)
    player.infinityPower = new Decimal(player.infinityPower)
    player.infinityDimension1.amount = new Decimal(player.infinityDimension1.amount)
    player.infinityDimension2.amount = new Decimal(player.infinityDimension2.amount)
    player.infinityDimension3.amount = new Decimal(player.infinityDimension3.amount)
    player.infinityDimension4.amount = new Decimal(player.infinityDimension4.amount)
    player.infinityPoints = new Decimal(player.infinityPoints)
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

var letterList1 = ['', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var letterList2 = ['', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var letterList3 = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

var emojiList1 = ['', '😠', '🎂', '🎄', '💀', '🍆', '👪', '🌈', '💯', '🍦', '🎃', '💋', '😂', '🌙', '⛔', '🐙', '💩', '❓', '☢️', '🙈', '👍', '☂️', '✌️', '⚠️', '❌', '😋', '⚡'];
var emojiList2 = ['', '😠', '🎂', '🎄', '💀', '🍆', '👪', '🌈', '💯', '🍦', '🎃', '💋', '😂', '🌙', '⛔', '🐙', '💩', '❓', '☢️', '🙈', '👍', '☂️', '✌️', '⚠️', '❌', '😋', '⚡'];
var emojiList3 = ['😠', '🎂', '🎄', '💀', '🍆', '👪', '🌈', '💯', '🍦', '🎃', '💋', '😂', '🌙', '⛔', '🐙', '💩', '❓', '☢️', '🙈', '👍', '☂️', '✌️', '⚠️', '❌', '😋', '⚡'];



function isDecimal(value) {
    try {
        value.times(1)
        return true
    } catch (err) {return false}
}



function getAbbreviation(e) {
    const prefixes = ['', 'U', 'D', 'T', 'Qd', 'Qt', 'Sx', 'Sp', 'O', 'N']
    const prefixes2 = ['', 'Dc', 'Vg', 'Tg', 'Qa', 'Qi', 'Se', 'St', 'Og', 'Nn']
    const prefixes3 = ['', 'Ce', 'Dn', 'Tc', 'Qe', 'Qu', 'Sc', 'Si', 'Oe', 'Ne']
    const prefixes4 = ['', 'D', 'T', 'Qd', 'Qt', 'Sx', 'Sp', 'O', 'N']
    var index = Decimal.floor(e/3)-1
    var index2 = Decimal.floor(index/10)
    var index3 = Decimal.floor(index2/10)
    var index4 = Decimal.floor(index3/10)
    var prefix = prefixes[index%10]
    var prefix2 = prefixes2[index2%10]
    var prefix3 = prefixes3[index3%10]
    if (e <= 3002) {
        return prefix + prefix2 + prefix3
    } else {
        var secondIndex = Decimal.floor(index/1000)-1
        var secondIndex2 = Decimal.floor(secondIndex/10)
        var secondIndex3 = Decimal.floor(secondIndex2/10)
        var secondIndex4 = Decimal.floor(secondIndex3/10)
        var secondPrefix = prefixes4[secondIndex%10]
        var secondPrefix2 = prefixes2[secondIndex2%10]
        var secondPrefix3 = prefixes3[secondIndex3%10]
        var x = "MI"
        if ((index)%1000 !== 0) x += "-" 
        return secondPrefix + secondPrefix2 + secondPrefix3 + x + prefix + prefix2 + prefix3
    }
}



function formatValue(notation, value, places, placesUnder1000) {

    if ((value <= Number.MAX_VALUE || (player.break && player.currentChallenge == "")) && (value >= 1000)) {
        if (isDecimal(value)) {
           var power = value.e
           var temp = value.toExponential(4).split("e")
           var matissa = parseFloat(temp[0])
           if (parseInt(temp[1]) != power) power++;
        } else {
            var matissa = value / Math.pow(10, Math.floor(Math.log10(value)));
            var power = Decimal.floor(Math.log10(value));
        }
        if ((notation === "Standard")) {
            if (power <= 303) return (matissa * Decimal.pow(10, power % 3)).toFixed(places) + " " + FormatList[(power - (power % 3)) / 3];
            else return (matissa * Decimal.pow(10, power % 3)).toFixed(places) + " " + getAbbreviation(power)
        } else if (notation === "Scientific") {
            return ((matissa).toFixed(places) + "e" + power);
        } else if (notation === "Engineering") {
            return ((matissa * Decimal.pow(10, power % 3)).toFixed(places) + "ᴇ" + (power - (power % 3)));
        } else if (notation === "Letters") {
            power -= 3;
            return ((matissa * Decimal.pow(10, power % 3)).toFixed(places) +
                letterList1[Decimal.floor(((power - (power % 3)) / 3) / (letterList2.length*letterList3.length))] +letterList2[Decimal.floor(((power - (power % 3)) / 3) / letterList3.length) % letterList2.length] + letterList3[((power - (power % 3)) / 3) % letterList3.length]);
        } else if (notation === "Emojis") {
            power -= 3;
            return ((Decimal.round(matissa * Decimal.pow(10, power % 3) * Decimal.pow(10, places)) / Decimal.pow(10, places)).toFixed(places) +
            emojiList1[Decimal.floor(((power - (power % 3)) / 3) / (emojiList2.length*emojiList3.length))] +emojiList2[Decimal.floor(((power - (power % 3)) / 3) / emojiList3.length) % emojiList2.length] + emojiList3[((power - (power % 3)) / 3) % emojiList3.length]);
            
            
            } else return ((matissa).toFixed(places) + "e" + power);
    } else if (value < 1000) {
        return ((Decimal.round(value * Decimal.pow(10, places)) / Decimal.pow(10, places))).toFixed(placesUnder1000);    
    } else {
        return "Infinite";
    }
}


function updateMoney() {
    var element = document.getElementById("coinAmount");
    element.innerHTML = formatValue(player.options.notation, player.money, 2, 1);
    if (player.currentChallenge == "challenge12") {
	var element2 = document.getElementById("matter");
	element2.innerHTML = "There is " + formatValue(player.options.notation, player.matter, 2, 1) + " matter.";
}}

function updateCoinPerSec() {
    var element = document.getElementById("coinsPerSec");
    if (player.currentChallenge == "challenge3") {
      element.innerHTML = 'You are getting ' + shortenDimensions(getDimensionProductionPerSecond(1).times(player.chall3Pow)) + ' antimatter per second.';
    } else if (player.currentChallenge == "challenge7") {
      element.innerHTML = 'You are getting ' + (shortenDimensions(getDimensionProductionPerSecond(1).plus(calcPerSec(player.secondAmount.pow(1.5), player.secondPow.pow(1.7).times(10), player.infinityUpgrades.includes("27Mult"))))) + ' antimatter per second.';
    } else {
      element.innerHTML = 'You are getting ' + shortenDimensions(getDimensionProductionPerSecond(1)) + ' antimatter per second.';
    }
}

function hasInfinityMult(tier) {
    switch (tier) {
        case 1: case 8: return player.infinityUpgrades.includes("18Mult");
        case 2: case 7: return player.infinityUpgrades.includes("27Mult");
        case 3: case 6: return player.infinityUpgrades.includes("36Mult");
        case 4: case 5: return player.infinityUpgrades.includes("45Mult");
    }
}








function getDimensionFinalMultiplier(tier) {
    const name = TIER_NAMES[tier];

    let multiplier = new Decimal(player[name + 'Pow']);
    if (player.currentChallenge == "challenge7") {
        if (tier == 4) multiplier = multiplier.pow(1.4)
        if (tier == 2) multiplier = multiplier.pow(1.7)
    }
    multiplier = multiplier.times(player.achPow);

    multiplier = multiplier.times(Decimal.max(Decimal.pow(player.infinityPower, 7), 1))
    
    if (player.infinityUpgrades.includes("totalMult")) multiplier = multiplier.times(totalMult)
    if (player.infinityUpgrades.includes("currentMult")) multiplier = multiplier.times(currentMult)
    if (player.infinityUpgrades.includes("infinitiedMult")) multiplier = multiplier.times(infinitiedMult)
    if (player.infinityUpgrades.includes("achievementMult")) multiplier = multiplier.times(achievementMult)
    if (player.infinityUpgrades.includes("challengeMult")) multiplier = multiplier.times(challengeMult)

    if (hasInfinityMult(tier)) multiplier = multiplier.times(dimMults());
    if (tier == 1) {
        if (player.infinityUpgrades.includes("unspentBonus")) multiplier = multiplier.times(unspentBonus);
        if (player.achievements.includes("There's no point in doing that...")) multiplier = multiplier.times(1.1);
        if (player.achievements.includes("I forgot to nerf that")) multiplier = multiplier.times(1.05);
    }
    multiplier = multiplier.times(timeMult());
    if (tier == 8 && player.achievements.includes("The 9th Dimension is a lie")) multiplier = multiplier.times(1.1);
    else if (player.achievements.includes("You didn't need it anyway")) multiplier = multiplier.times(1.02);
    if (tier <= 4 && player.achievements.includes("Zero Deaths")) multiplier = multiplier.times(1.25);
    if (player.achievements.includes("Antichallenged")) multiplier = multiplier.times(1.1);
    
    return multiplier;
}

function getMoneyPerSecond() {
    return getDimensionFinalMultiplier(1)*Math.floor(player.firstAmount)/player.tickspeed;
}

function getDimensionDescription(tier) {
    const name = TIER_NAMES[tier];
    
    let description = shortenDimensions(player[name + 'Amount']) + ' (' + player[name + 'Bought'] + ')';
    
    if (tier < 8) {
        description += '  (+' + formatValue(player.options.notation, getDimensionRateOfChange(tier), 2, 2) + '%/s)';
    }
    
    return description;
}

function getDimensionRateOfChange(tier) {
    if (tier == 8) {
        return 0;
    }

    let toGain = getDimensionProductionPerSecond(tier + 1)

    const name = TIER_NAMES[tier];
    if (player.currentChallenge == "challenge7") {
        if (tier == 7) return 0
        else toGain = getDimensionProductionPerSecond(tier + 2);
    }
    const current = Decimal.max(player[name + 'Amount'], 1);
    const change  = toGain.times(10).dividedBy(current);
    
    return change;
}

function getShiftRequirement(bulk) {
    let tier = Decimal.min(player.resets + 4, 8);
    let amount = 20;
    if (player.currentChallenge == "challenge4") {
        tier = Decimal.min(player.resets + 4, 6)
        if (tier == 6) amount += (player.resets+bulk - 2) * 20;
    }
    if (tier == 8) {
        amount += (player.resets+bulk - 4) * 15;
    }
    
    if (player.infinityUpgrades.includes("resetBoost")) {
        amount -= 9;
    }
    
    return { tier: tier, amount: amount };
}

function getGalaxyRequirement() {
    let amount = 80 + (player.galaxies * 60);
    if (player.currentChallenge == "challenge4") amount = 99 + (player.galaxies * 90)
    if (player.infinityUpgrades.includes("resetBoost")) {
        amount -= 9;
    }
    
    return amount;
}

function getETA(cost) {
    var a = 100;
    while (ETACalc(a) < cost) {
        a *= 10;
        if (a > 1e20) return Infinity;
    }
    var b = a / 10;
    var q = ETACalc((a+b)/2);
    while (cost+100 < q || q < cost-100) {
        if (q < cost) a = (a+b)/2;
        else b = (a+b)/2;
        q = ETACalc((a+b)/2);
    }
    return (a+b)/2;
}

function ETACalc(t) {
    var value = player.money + calcPerSec(player.firstAmount, player.firstPow, player.infinityUpgrades.includes("18Mult"));
    var div = 1;
    for (let tier = 1; tier <= 8; ++tier) {
        div *= (tier+1);
        value += getDimensionRateOfChange(tier) / div * Decimal.pow(t,tier);
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


function updateDimensions() {
    
    for (let tier = 1; tier <= 8; ++tier) {
        const name = TIER_NAMES[tier];
        if (!canBuyDimension(tier)) {
            break;
        }
        document.getElementById(name + "D").innerHTML = DISPLAY_NAMES[tier] + " Dimension x" + formatValue(player.options.notation, getDimensionFinalMultiplier(tier), 1, 1);
        document.getElementById(name + "Amount").innerHTML = getDimensionDescription(tier);  
    }


    for (let tier = 1; tier <= 8; ++tier) {
        const name = TIER_NAMES[tier];
        if (!canBuyDimension(tier)) {
            break;
        }
        
        document.getElementById(name + "Row").style.display = "table-row";
        document.getElementById(name + "Row").style.visibility = "visible";
        
        
    }
    
    if (canBuyTickSpeed()) {
        document.getElementById("tickLabel").innerHTML = 'Reduce the tick interval by ' + ((1 - getTickSpeedMultiplier()) * 100).toFixed(1) + '%.';
        
        document.getElementById("tickSpeed").style.visibility = "visible";
        document.getElementById("tickSpeedMax").style.visibility = "visible";
        document.getElementById("tickLabel").style.visibility = "visible";
        document.getElementById("tickSpeedAmount").style.visibility = "visible";
    }
    
    const shiftRequirement = getShiftRequirement(0);
    if (player.currentChallenge == "challenge4" ? shiftRequirement.tier < 6 : shiftRequirement.tier < 8) {
        document.getElementById("resetLabel").innerHTML = 'Dimension Shift: requires ' + shiftRequirement.amount + " " + DISPLAY_NAMES[shiftRequirement.tier] + " Dimensions";
    }
    else document.getElementById("resetLabel").innerHTML = 'Dimension Boost: requires ' + shiftRequirement.amount + " " + DISPLAY_NAMES[shiftRequirement.tier] + " Dimensions";
    
    if (player.currentChallenge == "challenge4" ? player.resets > 2 : player.resets > 3) {
        document.getElementById("softReset").innerHTML = "Reset the game for a Boost";
    } else {
        document.getElementById("softReset").innerHTML = "Reset the game for a new Dimension";
    }

    if (player.currentChallenge != "challenge4") document.getElementById("secondResetLabel").innerHTML = 'Antimatter Galaxies: requires ' + getGalaxyRequirement() + ' Eighth Dimensions';
    else document.getElementById("secondResetLabel").innerHTML = 'Antimatter Galaxies: requires ' + getGalaxyRequirement() + ' Sixth Dimensions';
    document.getElementById("totalmoney").innerHTML = 'You have made a total of ' + shortenMoney(player.totalmoney) + ' antimatter.';
    document.getElementById("totalresets").innerHTML = 'You have done ' + player.resets + ' soft resets.';
    document.getElementById("galaxies").innerHTML = 'You have ' + Decimal.round(player.galaxies) + ' Antimatter Galaxies.';
    document.getElementById("totalTime").innerHTML = "You have played for " + timeDisplay(player.totalTimePlayed) + ".";

    if (player.bestInfinityTime == 9999999999) {
        document.getElementById("bestInfinity").innerHTML = ""
        document.getElementById("infinitied").innerHTML = ""
        document.getElementById("thisInfinity").innerHTML = ""
    } else {
        document.getElementById("bestInfinity").innerHTML = "Your fastest infinity is in " + timeDisplay(player.bestInfinityTime) + "."
        document.getElementById("thisInfinity").innerHTML = "You have spent " + timeDisplay(player.thisInfinityTime) + " in this infinity."
        if (player.infinityPoints.equals(1)) {
            document.getElementById("infinityPoints1").innerHTML = "You have 1 Infinity point."
            document.getElementById("infinityPoints2").innerHTML = "You have 1 Infinity point."
        }
        else {
            document.getElementById("infinityPoints1").innerHTML = "You have  " + shortenDimensions(player.infinityPoints) + " Infinity points."
            document.getElementById("infinityPoints2").innerHTML = "You have  " + shortenDimensions(player.infinityPoints) + " Infinity points."
        }
        if (player.infinitied == 1) document.getElementById("infinitied").innerHTML = "You have infinitied 1 time."
        else document.getElementById("infinitied").innerHTML = "You have infinitied " + player.infinitied + " times."

    }

    document.getElementById("infi11").innerHTML = "Production increase over time <br>Currently: " + (Math.pow(0.5 * player.totalTimePlayed / 600, 0.15)).toFixed(2) + "x<br>Cost: 1 IP"
    document.getElementById("infi12").innerHTML = "First and Eighth Dimension power <br>" + formatValue(player.options.notation, dimMults(), 1, 1) + "x<br>Cost: 1 IP"
    document.getElementById("infi13").innerHTML = "Third and Sixth Dimension power <br>" + formatValue(player.options.notation, dimMults(), 1, 1) + "x<br>Cost: 1 IP"
    document.getElementById("infi22").innerHTML = "Second and seventh Dimension power <br>" + formatValue(player.options.notation, dimMults(), 1, 1) + "x<br>Cost: 1 IP"
    document.getElementById("infi23").innerHTML = "Fourth and Fifth Dimension power <br>" + formatValue(player.options.notation, dimMults(), 1, 1) + "x<br>Cost: 1 IP"
    document.getElementById("infi31").innerHTML = "Production increase over time in current infinity<br>Currently: " + Decimal.max(Math.pow(player.thisInfinityTime / 2400, 0.25), 1).toFixed(2) + "x<br>Cost: 3 IP"
    document.getElementById("infi32").innerHTML = "Bonus for unspent Infinity Points on 1st Dimension<br>(Currently " + formatValue(player.options.notation, Decimal.pow(player.infinityPoints/2,1.5).plus(1), 2, 2) + "x)<br>Cost: 5 IP"
    document.getElementById("infi34").innerHTML = "Infinity Point generation (based on fastest infinity) <br>(Currently "+shortenDimensions(player.infMult)+" every " + timeDisplay(player.bestInfinityTime*10) + ")<br>Cost: 10 IP"
    document.getElementById("postinfi11").innerHTML = "Power up all dimensions based on total antimatter produced<br>Currently: "+ Math.pow(player.totalmoney.e+1, 0.5).toFixed(2)+"x<br>Cost: "+shortenCosts(1e4)+" IP"
    document.getElementById("postinfi21").innerHTML = "Power up all dimensions based on current antimatter<br>Currently: "+ Math.pow(player.money.e+1, 0.5).toFixed(2)+"x<br>Cost: "+shortenCosts(5e4)+" IP"
    document.getElementById("postinfi31").innerHTML = "Tickspeed cost multiplier increase <br>"+player.tickSpeedMultDecrease+"x -> "+(player.tickSpeedMultDecrease-1)+"x<br>Cost: "+shortenCosts(player.tickSpeedMultDecreaseCost) +" IP"
    if (player.tickSpeedMultDecrease == 2) document.getElementById("postinfi31").innerHTML = "Tickspeed cost multiplier increase <br>"+player.tickSpeedMultDecrease+"x"
    document.getElementById("postinfi22").innerHTML = "Power up all dimensions based on achievements completed <br>Currently: "+Math.max(Math.pow((player.achievements.length-30), 3)/40,1).toFixed(2)+"x<br>Cost: "+shortenCosts(1e6)+" IP"
    document.getElementById("postinfi12").innerHTML = "Power up all dimensions based on amount infinitied <br>Currently: "+(Math.log10(player.infinitied)*10).toFixed(2)+"x<br>Cost: "+shortenCosts(1e5)+" IP"
    document.getElementById("postinfi41").innerHTML = "Makes galaxies 50% stronger <br>Cost: "+shortenCosts(5e11)+" IP"
    document.getElementById("postinfi32").innerHTML = "Power up all dimensions based on slowest challenge run<br>Currently:"+Decimal.max(10*3000/worstChallengeTime, 1).toFixed(2)+"x<br>Cost: "+shortenCosts(1e7)+" IP"
    document.getElementById("postinfi42").innerHTML = "Dimension cost multiplier increase <br>"+player.dimensionMultDecrease+"x -> "+(player.dimensionMultDecrease-1)+"x<br>Cost: "+shortenCosts(player.dimensionMultDecreaseCost) +" IP"

    document.getElementById("postinfi13").innerHTML = "You passively generate Infinitied stat based on your fastest infinity.<br>"+timeDisplay(player.bestInfinityTime*5)+ "every <br>Cost: "+shortenCosts(20e6)+" IP"
    document.getElementById("postinfi23").innerHTML = "Option to bulk buy Dimension Boosts <br>Cost: "+shortenCosts(5e9)+" IP"
    document.getElementById("postinfi33").innerHTML = "Autobuyers work twice as fast<br>Cost:"+ shortenCosts(1e15)+" IP"
    if (player.dimensionMultDecrease == 2) document.getElementById("postinfi42").innerHTML = "Dimension cost multiplier increase <br>"+player.dimensionMultDecrease+"x"
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
    
    document.getElementById("firstMax").innerHTML = 'Until 10, Cost: ' + shortenCosts(player.firstCost.times((10 - player.firstBought)));
    document.getElementById("secondMax").innerHTML = 'Until 10, Cost: ' + shortenCosts(player.secondCost.times((10 - player.secondBought)));
    document.getElementById("thirdMax").innerHTML = 'Until 10, Cost: ' + shortenCosts(player.thirdCost.times((10 - player.thirdBought)));
    document.getElementById("fourthMax").innerHTML = 'Until 10, Cost: ' + shortenCosts(player.fourthCost.times((10 - player.fourthBought)));
    document.getElementById("fifthMax").innerHTML = 'Until 10, Cost: ' + shortenCosts(player.fifthCost.times((10 - player.fifthBought)));
    document.getElementById("sixthMax").innerHTML = 'Until 10, Cost: ' + shortenCosts(player.sixthCost.times((10 - player.sixthBought)));
    document.getElementById("seventhMax").innerHTML = 'Until 10, Cost: ' + shortenCosts(player.seventhCost.times((10 - player.seventhBought)));
    document.getElementById("eightMax").innerHTML = 'Until 10, Cost: ' + shortenCosts(player.eightCost.times((10 - player.eightBought)));
    
    document.getElementById("tickSpeed").innerHTML = 'Cost: ' + shortenCosts(player.tickSpeedCost);


    for (var i=1; i<=4; i++) {
        
        document.getElementById("infMax"+i).innerHTML = "Cost: " + shortenCosts(player["infinityDimension"+i].cost)
    }
}

function updateTickSpeed() {
    var exp = Decimal.floor(Decimal.log10(player.tickspeed));
    if (exp > 1) document.getElementById("tickSpeedAmount").innerHTML = 'Tickspeed: ' + Decimal.round(player.tickspeed);
    else {
        document.getElementById("tickSpeedAmount").innerHTML = 'Tickspeed: ' + Decimal.round(player.tickspeed.times(new Decimal(100).dividedBy(Decimal.pow(10, exp)))) + ' / ' + shorten(new Decimal(100).dividedBy(Decimal.pow(10, exp)));
    }
    if (player.tickspeed.lt(1e-26) && !player.achievements.includes("Faster than a potato")) giveAchievement("Faster than a potato");

    /*	else if (player.tickspeed > 10) document.getElementById("tickSpeedAmount").innerHTML = 'Tickspeed: ' + Decimal.round(player.tickspeed*10)  + ' / 10';
    	else if (player.tickspeed > 1) document.getElementById("tickSpeedAmount").innerHTML = 'Tickspeed: ' + Decimal.round(player.tickspeed*100) + ' / 100';
    else if (player.tickspeed > .1) document.getElementById("tickSpeedAmount").innerHTML = 'Tickspeed: ' + Decimal.round(player.tickspeed*1000) + ' / 1000';
    else document.getElementById("tickSpeedAmount").innerHTML = 'Tickspeed: ' + Decimal.round(player.tickspeed*10000) + ' / 10000';*/
}


function updateChallenges() {
    try {
        var buttons = document.getElementsByClassName('onchallengebtn')
        for (var i=0; i < buttons.length; i++) {
            buttons[i].className = "challengesbtn";
            buttons[i].innerHTML = "Start"
        }
        
        for (var i=0; i < player.challenges.length; i++) {
            document.getElementById(player.challenges[i]).className = "completedchallengesbtn";
            document.getElementById(player.challenges[i]).innerHTML = "Completed"
        }
        
        if (player.currentChallenge != "") {
            document.getElementById(player.currentChallenge).className = "onchallengebtn"
            document.getElementById(player.currentChallenge).innerHTML = "Running"
        }
    } catch (err) {updateChallenges()}
  

  
  
}



function getInfinityDimensionDescription(tier) {
    const name = TIER_NAMES[tier];
    
    let description = shortenDimensions(player['infinityDimension'+tier].amount) + ' (' + player['infinityDimension'+tier].bought + ')';
    
    if (tier < 4) {
        description += '  (+' + formatValue(player.options.notation, getInfinityDimensionRateOfChange(tier), 2, 2) + '%/s)';
    }
    
    return description;
}


function getInfinityDimensionRateOfChange(tier) {
    let toGain = player["infinityDimension"+(tier+1)].amount
    const current = Decimal.max(player["infinityDimension"+tier].amount, 1);
    const change  = toGain.times(10).dividedBy(current);
    return change;
}




function updateInfinityDimensions() {
    for (let tier = 1; tier <= 4; ++tier) {
        document.getElementById("infD"+tier).innerHTML = DISPLAY_NAMES[tier] + " Infinity Dimension x" + shortenDimensions(player["infinityDimension"+tier].power);
        document.getElementById("infAmount"+tier).innerHTML = getInfinityDimensionDescription(tier);  
    }


    for (let tier = 1; tier <= 4; ++tier) {
        const name = TIER_NAMES[tier];
        if (!player.infDimensionsUnlocked[tier-1]) {
            break;
        }
        
        document.getElementById("infRow"+tier).style.display = "table-row";
        document.getElementById("infRow"+tier).style.visibility = "visible";
        
        
    }
}








function softReset(bulk) {
    player.resets+=bulk;
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
        sacrificed: new Decimal(0),
        achievements: player.achievements,
        challenges: player.challenges,
        currentChallenge: player.currentChallenge,
        infinityUpgrades: player.infinityUpgrades,
        infinityPoints: player.infinityPoints,
        infinitied: player.infinitied,
        totalTimePlayed: player.totalTimePlayed,
        bestInfinityTime: player.bestInfinityTime,
        thisInfinityTime: player.thisInfinityTime,
        firstPow: Decimal.pow(2, player.resets),
        secondPow: Decimal.pow(2, player.resets-1),
        thirdPow: Decimal.max(Decimal.pow(2, player.resets - 2), 1),
        fourthPow: Decimal.max(Decimal.pow(2, player.resets - 3), 1),
        fifthPow: Decimal.max(Decimal.pow(2, player.resets - 4), 1),
        sixthPow: Decimal.max(Decimal.pow(2, player.resets - 5), 1),
        seventhPow: Decimal.max(Decimal.pow(2, player.resets - 6), 1),
        eightPow: Decimal.max(Decimal.pow(2, player.resets - 7), 1),
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
        chall11Pow: 1,
        partInfinityPoint: player.partInfinityPoint,
        partInfinitied: player.partInfinitied,
        break: player.break,
        challengeTimes: player.challengeTimes,
        lastTenRuns: player.lastTenRuns,
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
        infinityDimension1: player.infinityDimension1,
        infinityDimension2: player.infinityDimension2,
        infinityDimension3: player.infinityDimension3,
        infinityDimension4: player.infinityDimension4,
        options: {
            newsHidden: player.options.newsHidden,
            notation: player.options.notation,
            invert: player.options.invert,
            challConf: player.options.challConf
        }
    };
    if (player.currentChallenge == "challenge10") {
        player.thirdCost = new Decimal(100)
        player.fourthCost = new Decimal(500)
        player.fifthCost = new Decimal(2500)
        player.sixthCost = new Decimal(2e4)
        player.seventhCost = new Decimal(2e5)
        player.eightCost = new Decimal(4e6)
    }
    if (player.resets == 1 && player.currentChallenge == "") {
        if (player.infinityUpgrades.includes("skipReset2")) player.resets++;
        if (player.infinityUpgrades.includes("skipReset3")) player.resets++;
        if (player.infinityUpgrades.includes("skipResetGalaxy")) {
            player.resets++;
            if (player.galaxies == 0) player.galaxies = 1
        }
    }

   /* player.firstPow = Decimal.pow(2, player.resets + 1)
    player.secondPow = Decimal.pow(2, player.resets)
    player.thirdPow = Decimal.max(Decimal.pow(2, player.resets - 1), 1)
    player.fourthPow = Decimal.max(Decimal.pow(2, player.resets - 2), 1)
    player.fifthPow = Decimal.max(Decimal.pow(2, player.resets - 3), 1)
    player.sixthPow = Decimal.max(Decimal.pow(2, player.resets - 4), 1)
    player.seventhPow = Decimal.max(Decimal.pow(2, player.resets - 5), 1)
    player.eightPow = Decimal.max(Decimal.pow(2, player.resets - 6), 1)
*/

    if (player.infinityUpgrades.includes("resetMult")) {
        player.firstPow = Decimal.pow(2.5, player.resets + 1)
        player.secondPow = Decimal.pow(2.5, player.resets)
        player.thirdPow = Decimal.max(Decimal.pow(2.5, player.resets - 1), 1)
        player.fourthPow = Decimal.max(Decimal.pow(2.5, player.resets - 2), 1)
        player.fifthPow = Decimal.max(Decimal.pow(2.5, player.resets - 3), 1)
        player.sixthPow = Decimal.max(Decimal.pow(2.5, player.resets - 4), 1)
        player.seventhPow = Decimal.max(Decimal.pow(2.5, player.resets - 5), 1)
        player.eightPow = Decimal.max(Decimal.pow(2.5, player.resets - 6), 1)
    }
    if (player.currentChallenge == "challenge11") {
        player.firstPow = new Decimal(1)
        player.secondPow = new Decimal(1)
        player.thirdPow = new Decimal(1)
        player.fourthPow = new Decimal(1)
        player.fifthPow = new Decimal(1)
        player.sixthPow = new Decimal(1)
        player.seventhPow = new Decimal(1)
        player.eightPow = new Decimal(1)
    }
    if (player.achievements.includes("Claustrophobic")) player.tickspeed = player.tickspeed.times(0.98);
    if (player.achievements.includes("Faster than a potato")) player.tickspeed = player.tickspeed.times(0.98);
    

    


    
    updateCosts();
    clearInterval(player.interval);
    //updateInterval();
    updateDimensions();
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
    updateTickSpeed();

    if (player.challenges.includes("challenge1")) player.money = new Decimal(100)
    if (player.achievements.includes("That's fast!")) player.money = new Decimal(1000);
    
    if (player.resets >= 10) {
        giveAchievement("Boosting to the max");
    }
}

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
    return canBuyDimension(3);
}

function getTickSpeedMultiplier() {
    if (player.galaxies < 3) {
        let baseMultiplier = 0.9;
        if (player.galaxies == 0) baseMultiplier = 0.89
        if (player.currentChallenge == "challenge6") baseMultiplier = 0.93
        let perGalaxy = 0.02;
        
        if (player.infinityUpgrades.includes("galaxyBoost")) {
            perGalaxy *= 2
        }
        if (player.infinityUpgrades.includes("postGalaxy")) {
            perGalaxy *= 1.5
        }
        
        return baseMultiplier-(player.galaxies*perGalaxy);
    } else {
        let baseMultiplier = 0.8
        if (player.currentChallenge == "challenge6") baseMultiplier = 0.83
        let perGalaxy = 0.965
        let galaxies = player.galaxies-2
        if (player.infinityUpgrades.includes("galaxyBoost")) {
            galaxies *= 2
        }
        if (player.infinityUpgrades.includes("postGalaxy")) {
            galaxies *= 1.5
        }

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
    if (player.currentChallenge != "challenge5") player.tickSpeedCost = player.tickSpeedCost.times(player.tickspeedMultiplier);
    else multiplySameCosts(player.tickSpeedCost)
    if (player.tickSpeedCost.gte(Number.MAX_VALUE)) player.tickspeedMultiplier = player.tickspeedMultiplier.times(player.tickSpeedMultDecrease);
    if (player.currentChallenge == "challenge2") player.chall2Pow = 0
    player.tickspeed = player.tickspeed.times(getTickSpeedMultiplier());
    return true;
}

document.getElementById("tickSpeed").onclick = function () {
    buyTickSpeed();
    
    updateTickSpeed();
    updateMoney();
    updateCosts();
};

function buyMaxTickSpeed() {
    if (!canBuyTickSpeed()) return false
    while (player.money.gt(player.tickSpeedCost)) {
        player.money = player.money.minus(player.tickSpeedCost);
        if (player.currentChallenge != "challenge5") player.tickSpeedCost = player.tickSpeedCost.times(player.tickspeedMultiplier);
        else multiplySameCosts(player.tickSpeedCost)
        if (player.tickSpeedCost.gte(Number.MAX_VALUE)) player.tickspeedMultiplier = player.tickspeedMultiplier.times(player.tickSpeedMultDecrease);
        player.tickspeed = player.tickspeed.times(getTickSpeedMultiplier());
        if (player.currentChallenge == "challenge2") player.chall2Pow = 0
    }

    
    updateTickSpeed();
    updateMoney();
    updateCosts();
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




function giveAchievement(name) {
    if (player.achievements.includes(name)) {
        return
    }
    
    $.notify(name, "success");
    player.achievements.push(name);
    document.getElementById(name).className = "achievementunlocked"
    try {
        kongregate.stats.submit('Achievements', player.achievements.length);
    } catch (err) {console.log("Couldn't load Kongregate API")}

    updateAchPow();
}

const TIER_NAMES = [ null, "first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eight" ];
const DISPLAY_NAMES = [ null, "First", "Second", "Third", "Fourth", "Fifth", "Sixth", "Seventh", "Eighth" ];

function canAfford(cost) {
    return ((cost.lt(new Decimal("1.79e308")) && !player.break) || player.break) && cost.lte(player.money);
}



function multiplySameCosts(cost) {
    const tiers = [ null, "first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eight" ];
    const tierCosts = [ null, new Decimal(1e3), new Decimal(1e4), new Decimal(1e5), new Decimal(1e6), new Decimal(1e8), new Decimal(1e10), new Decimal(1e12), new Decimal(1e15) ];
    
    for (let i = 1; i <= 8; ++i) {
        if (Decimal.log10(player[tiers[i] + "Cost"]).equals(Decimal.log10(cost))) player[tiers[i] + "Cost"] = player[tiers[i] + "Cost"].times(tierCosts[i])
        
    }
    if (Decimal.log10(player.tickSpeedCost).equals(Decimal.log10(cost))) player.tickSpeedCost = player.tickSpeedCost.times(10)
    }


function canBuyDimension(tier) {
    if (tier == 9 ) {
        if (player.secondAmount.equals(0)) return false
        else return true
    }

    if (tier > player.resets + 4) {
        return false;
    }
    
    if (tier > 1 && player[TIER_NAMES[tier - 1] + 'Amount'] == 0) {
        return false;
    }

    if (player.currentChallenge == "challenge4") {
        if (tier == 7 || tier == 8) return false
    }
    
    return true;
}

function getDimensionPowerMultiplier(tier) {
    let dimMult = 2;


    if (player.currentChallenge == "challenge9") dimMult = Decimal.pow(10/0.30,Decimal.random())*0.30

    if (player.infinityUpgrades.includes('dimMult')) {
        dimMult *= 1.1;
    }
    
    return dimMult;
}


function clearDimensions(amount) {
	const tiers = [ null, "first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eight" ];
    
    for (i = 1; i <= amount; i++) {
        player[tiers[i] + "Amount"] = new Decimal(0)
    }   
}


function getDimensionCostMultiplier(tier) {

	const multiplier2 = [new Decimal(1e3),new Decimal(5e3),new Decimal(1e4),new Decimal(1e4),new Decimal(2e4),new Decimal(2e4),new Decimal(4e4),new Decimal(4e4)]
    
    if (player.currentChallenge == "challenge10") return multiplier2[tier - 1];
    else return player.costMultipliers[tier - 1];
}

function onBuyDimension(tier) {
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
    
    if (tier == 8 && player.eightAmount.equals(99)) {
        giveAchievement("The 9th Dimension is a lie");
    }

    

    updateCosts();
    updateMoney();
}

function buyOneDimension(tier) {
    const name = TIER_NAMES[tier];
    const cost = player[name + 'Cost'];

    if (player.currentChallenge != "challenge10") {
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
    
    
    
    if (player.currentChallenge != "challenge10") {
        if (!canAfford(cost)) {
            return false;
        }
    }
    
    
    if (player.currentChallenge != "challenge10" || tier < 3) {
        player.money = player.money.minus(cost);
    } else {
        player[TIER_NAMES[tier-2] + 'Amount'] = player[TIER_NAMES[tier-2] + 'Amount'].minus(cost)
    }
    
    player[name + 'Amount'] = player[name + 'Amount'].plus(1);
    player[name + 'Bought']++;
    
    if (player[name + 'Bought'] === 10) {
        player[name + 'Bought'] = 0;
        player[name + 'Pow']  = player[name + 'Pow'].times(getDimensionPowerMultiplier(tier));
        if (player.currentChallenge != "challenge5" ) player[name + 'Cost'] = player[name + 'Cost'].times((getDimensionCostMultiplier(tier)));
        
        else multiplySameCosts(cost);
        if (player[name + 'Cost'].gte(Number.MAX_VALUE)) player.costMultipliers[tier-1] = player.costMultipliers[tier-1].times(player.dimensionMultDecrease)
        
    }

    if (player.currentChallenge == "challenge2") player.chall2Pow = 0;
    if (player.currentChallenge == "challenge8") clearDimensions(tier-1)

    onBuyDimension(tier);
    
    return true;
}

function buyManyDimension(tier) {
    const name = TIER_NAMES[tier];
    const cost = player[name + 'Cost'].times(10 - player[name + 'Bought']);
    
    if (player.currentChallenge == "challenge12" && player.matter.equals(0)) player.matter = new Decimal(1);
    if (player.currentChallenge != "challenge10") {
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
    
    
    
    if (player.currentChallenge != "challenge10") {
        if (!canAfford(cost)) {
            return false;
        }
    }
    
    if (player.currentChallenge != "challenge10" || tier < 3) {
        player.money = player.money.minus(cost);
    } else {
        player[TIER_NAMES[tier-2] + 'Amount'] = player[TIER_NAMES[tier-2] + 'Amount'].minus(cost)
    }
    
    player[name + 'Amount'] = player[name + 'Amount'].plus(10 - player[name + 'Bought']);
    player[name + 'Bought']  = 0;
    player[name + 'Pow']  = player[name + 'Pow'].times(getDimensionPowerMultiplier(tier));
    if (player.currentChallenge != "challenge5" ) player[name + 'Cost'] = player[name + 'Cost'].times((getDimensionCostMultiplier(tier)));
    else multiplySameCosts(player[name + 'Cost']);  
    if (player[name + 'Cost'].gte(Number.MAX_VALUE)) player.costMultipliers[tier-1] = player.costMultipliers[tier-1].times(player.dimensionMultDecrease)
    if (player.currentChallenge == "challenge2") player.chall2Pow = 0;
    if (player.currentChallenge == "challenge8") clearDimensions(tier-1)

    onBuyDimension(tier);
    
    return true;
}

function buyManyDimensionAutobuyer(tier, bulk) {

        const name = TIER_NAMES[tier];
        const cost = player[name + 'Cost'].times(10 - player[name + 'Bought'])
        if (tier >= 3 && player.currentChallenge == "challenge10") {
            if (!canBuyDimension(tier)) return false
            if (player[TIER_NAMES[tier-2] + 'Amount'].lt(cost)) return false
                if (canBuyDimension(tier)) {
                    if (cost.lt(player[TIER_NAMES[tier-2]+"Amount"]) && player[name + 'Bought'] != 0) {
                        player[TIER_NAMES[tier-2]+"Amount"] = player[TIER_NAMES[tier-2]+"Amount"].minus(cost)
                        player[name + "Amount"] = player[name + "Amount"].plus(10 - player[name + 'Bought'])
                        player[name + 'Pow']  = player[name + 'Pow'].times(getDimensionPowerMultiplier(tier))
                        player[name + "Cost"] = player[name + "Cost"].times(getDimensionCostMultiplier(tier))
                        player[name + 'Bought'] = 0
                    }
                    var x = bulk
                    while (player[TIER_NAMES[tier-2]+"Amount"].gt(player[name + "Cost"].times(10)) && x > 0) {
                        player[TIER_NAMES[tier-2]+"Amount"] = player[TIER_NAMES[tier-2]+"Amount"].minus(player[name + "Cost"].times(10))
                        player[name + "Cost"] = player[name + "Cost"].times(getDimensionCostMultiplier(tier))
                        player[name + "Amount"] = player[name + "Amount"].plus(10)
                        player[name + "Pow"] = player[name + "Pow"].times(getDimensionPowerMultiplier(tier))
                        if (player[name + 'Cost'].gte(Number.MAX_VALUE)) player.costMultipliers[tier-1] = player.costMultipliers[tier-1].times(player.dimensionMultDecrease)
                        x--;
                    }
                    
                    
                    onBuyDimension(tier);
                }
        } else {
        if (!canBuyDimension(tier)) return false
            if (cost.lt(player.money) && player[name + 'Bought'] != 0) {
                player.money = player.money.minus(cost)
                player[name + "Amount"] = player[name + "Amount"].plus(10 - player[name + 'Bought'])
                player[name + 'Pow']  = player[name + 'Pow'].times(getDimensionPowerMultiplier(tier))
                player[name + "Cost"] = player[name + "Cost"].times(getDimensionCostMultiplier(tier))
                player[name + 'Bought'] = 0
            }
            if (player.money.lt(player[name + "Cost"].times(10))) return false
            var x = bulk
            while (player.money.gte(player[name + "Cost"].times(10)) && x > 0) {
                player.money = player.money.minus(player[name + "Cost"].times(10))
                if (player.currentChallenge != "challenge5") player[name + "Cost"] = player[name + "Cost"].times(getDimensionCostMultiplier(tier))
                else multiplySameCosts(player[name + 'Cost'])
                player[name + "Amount"] = player[name + "Amount"].plus(10)
                player[name + "Pow"] = player[name + "Pow"].times(getDimensionPowerMultiplier(tier))
                if (player[name + 'Cost'].gte(Number.MAX_VALUE)) player.costMultipliers[tier-1] = player.costMultipliers[tier-1].times(player.dimensionMultDecrease)
                if (player.currentChallenge == "challenge8") clearDimensions(tier-1)
                x--;
            }
            
            
            
        
        }
        if (player.currentChallenge == "challenge12" && player.matter.equals(0)) player.matter = new Decimal(1);
        if (player.currentChallenge == "challenge2") player.chall2Pow = 0;
        
}

const infCostMults = [null, 1e2, 1e4, 1e6, 1e8]
const infPowerMults = [null, 10, 5, 3, 2]
function buyManyInfinityDimension(tier) {
    
    var dim = player["infinityDimension"+tier]
    if (player.infinityPoints.lt(dim.cost)) return false
    if (!player.infDimensionsUnlocked[tier-1]) return false
    
    player.infinityPoints = player.infinityPoints.minus(dim.cost)
    dim.amount = dim.amount.plus(10);
    dim.cost *= infCostMults[tier]
    dim.power *= infPowerMults[tier]
    

}





function getInfinityDimensionProduction(tier) {
    var dim = player["infinityDimension"+tier]

    return dim.amount.times(dim.power)
}




function resetInfDimensions() {

    if (player.infDimensionsUnlocked[0]) {
        player.infinityPower = new Decimal(0)
    }
    if (player.infDimensionsUnlocked[3] && player.infinityDimension4.amount != 0){
        player.infinityDimension3.amount = new Decimal(0)
        player.infinityDimension2.amount = new Decimal(0)
        player.infinityDimension1.amount = new Decimal(0)
    } 
    else if (player.infDimensionsUnlocked[2] && player.infinityDimension3.amount != 0){
        player.infinityDimension2.amount = new Decimal(0)
        player.infinityDimension1.amount = new Decimal(0)
    } 
    else if (player.infDimensionsUnlocked[1] && player.infinityDimension2.amount != 0){
        player.infinityDimension1.amount = new Decimal(0)
    }
    
}




document.getElementById("first").onclick = function () {
    if (buyOneDimension(1)) {
        // This achievement is granted only if the buy one button is pressed.
        if (player.firstAmount >= 1e150) {
            giveAchievement("There's no point in doing that");
        }
        if (player.currentChallenge == "challenge12" && player.matter.equals(0)) player.matter = new Decimal(1);
    }
};



function glowText(id) {
  var text = document.getElementById(id);
  text.style.setProperty("-webkit-animation", "glow 1s");
  text.style.setProperty("animation", "glow 1s");
}



document.getElementById("second").onclick = function () {
    buyOneDimension(2);
    if (player.currentChallenge == "challenge12" && player.matter.equals(0)) player.matter = new Decimal(1);
};

document.getElementById("third").onclick = function () {
    buyOneDimension(3);
    if (player.currentChallenge == "challenge12" && player.matter.equals(0))player.matter = new Decimal(1);
};

document.getElementById("fourth").onclick = function () {
    buyOneDimension(4);
    if (player.currentChallenge == "challenge12" && player.matter.equals(0)) player.matter = new Decimal(1);
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
    if (player.currentChallenge == "challenge12" && player.matter.equals(0)) player.matter = new Decimal(1);
};

document.getElementById("secondMax").onclick = function () {
    buyManyDimension(2);
    if (player.currentChallenge == "challenge12" && player.matter.equals(0)) player.matter = new Decimal(1);
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
    const name = TIER_NAMES[getShiftRequirement(0).tier]
    if (player[name + "Amount"] >= getShiftRequirement(0).amount) {  
        softReset(1)
    }
};

document.getElementById("maxall").onclick = function () {    
    buyMaxTickSpeed();
    
    for (let tier = 8; tier >= 1; tier--) {
        const name = TIER_NAMES[tier];
        const cost = player[name + 'Cost'].times(10 - player[name + 'Bought'])
        if (tier >= 3 && player.currentChallenge == "challenge10") {
            if (canBuyDimension(tier) && player[TIER_NAMES[tier-2] + 'Amount'].gte(cost)) {
                
                    if (canBuyDimension(tier)) {
                        
                        if (cost.lt(player[TIER_NAMES[tier-2]+"Amount"]) && player[name + 'Bought'] != 0) {
                            player[TIER_NAMES[tier-2]+"Amount"] = player[TIER_NAMES[tier-2]+"Amount"].minus(cost)
                            player[name + "Amount"] = player[name + "Amount"].plus(10 - player[name + 'Bought'])
                            player[name + 'Pow']  = player[name + 'Pow'].times(getDimensionPowerMultiplier(tier))
                            player[name + "Cost"] = player[name + "Cost"].times(getDimensionCostMultiplier(tier))
                            player[name + 'Bought'] = 0
                        }
            
                        var i = 0
                        while (player[TIER_NAMES[tier-2]+"Amount"].gt(player[name + "Cost"].times(10))) {
                            player[TIER_NAMES[tier-2]+"Amount"] = player[TIER_NAMES[tier-2]+"Amount"].minus(player[name + "Cost"].times(10))
                            player[name + "Cost"] = player[name + "Cost"].times(getDimensionCostMultiplier(tier))
                            player[name + "Amount"] = player[name + "Amount"].plus(10)
                            player[name + "Pow"] = player[name + "Pow"].times(getDimensionPowerMultiplier(tier))
                            if (player[name + 'Cost'].gte(Number.MAX_VALUE)) player.costMultipliers[tier-1] = player.costMultipliers[tier-1].times(player.dimensionMultDecrease)
                            
                            onBuyDimension(tier)
                        }
                        
                        
                    }
                }
        } else {
        if (canBuyDimension(tier)) {
            if (cost.lt(player.money) && player[name + 'Bought'] != 0) {
                player.money = player.money.minus(cost)
                player[name + "Amount"] = player[name + "Amount"].plus(10 - player[name + 'Bought'])
                player[name + 'Pow']  = player[name + 'Pow'].times(getDimensionPowerMultiplier(tier))
                player[name + "Cost"] = player[name + "Cost"].times(getDimensionCostMultiplier(tier))
                player[name + 'Bought'] = 0
            }

            while (player.money.gte(player[name + "Cost"].times(10))) {
                if (player.currentChallenge == "challenge12" && player.matter.equals(0)) player.matter = new Decimal(1);
                if (player.currentChallenge == "challenge2") player.chall2Pow = 0;
                player.money = player.money.minus(player[name + "Cost"].times(10))
                if (player.currentChallenge != "challenge5") player[name + "Cost"] = player[name + "Cost"].times(getDimensionCostMultiplier(tier))
                else multiplySameCosts(player[name + 'Cost'])
                player[name + "Amount"] = player[name + "Amount"].plus(10)
                player[name + "Pow"] = player[name + "Pow"].times(getDimensionPowerMultiplier(tier))
                if (player[name + 'Cost'].gte(Number.MAX_VALUE)) player.costMultipliers[tier-1] = player.costMultipliers[tier-1].times(player.dimensionMultDecrease)
                if (player.currentChallenge == "challenge8") clearDimensions(tier-1)
                    onBuyDimension(tier);
            }
            
            
            
            
        }
        }
        }
        
        
        
    updateCosts()
};


document.getElementById("invert").onclick = function () {
    if (player.options.invert) {
        player.options.invert = false;
        document.getElementById("body").classList.remove("invert");
    } else {
        player.options.invert = true;
        document.getElementById("body").classList.add("invert");
    }
}

document.getElementById("challengeconfirmation").onclick = function () {
    if (!player.options.challConf) {
        player.options.challConf = true;
        document.getElementById("challengeconfirmation").innerHTML = "Challenge confirmation off"
    } else {
        player.options.challConf = false;
        document.getElementById("challengeconfirmation").innerHTML = "Challenge confirmation on"
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
        player.infMult *= 2
        player.infMultCost *= 10
        document.getElementById("infiMult").innerHTML = "Multiply infinity points from all sources by 2 <br>currently: "+player.infMult +"x<br>Cost: "+shortenCosts(player.infMultCost)+" IP"
    }
}




function updateAchPow() {
    var amount = 0
    if (player.achievements.includes("You gotta start somewhere") &&
        player.achievements.includes("100 antimatter is a lot") &&
        player.achievements.includes("Half life 3 confirmed") &&
        player.achievements.includes("L4D: Left 4 Dimensions") &&
        player.achievements.includes("5 Dimension Antimatter Punch") &&
        player.achievements.includes("We couldn't afford 9") &&
        player.achievements.includes("Not a luck related achievement") &&
        player.achievements.includes("90 degrees to infinity")) {
        amount += 1;
        document.getElementById("achRow1").className = "completedrow"
    }

    if (player.achievements.includes("To infinity!") &&
        player.achievements.includes("Don't you dare to sleep") &&
        player.achievements.includes("The 9th Dimension is a lie") &&
        player.achievements.includes("Antimatter Apocalypse") &&
        player.achievements.includes("Boosting to the max") &&
        player.achievements.includes("You got past The Big Wall") &&
        player.achievements.includes("Double Galaxy") &&
        player.achievements.includes("There's no point in doing that")) {
        amount += 1;
        document.getElementById("achRow2").className = "completedrow"
    }

    if (player.achievements.includes("I forgot to nerf that") &&
        player.achievements.includes("The Gods are pleased") &&
        player.achievements.includes("That's a lot of infinites") &&
        player.achievements.includes("You didn't need it anyway") &&
        player.achievements.includes("One for each dimension") &&
        player.achievements.includes("Claustrophobic") &&
        player.achievements.includes("That's fast!") &&
        player.achievements.includes("I don't believe in Gods")) {
        amount += 1;
        document.getElementById("achRow3").className = "completedrow"
    }

    if (player.achievements.includes("Fake News") &&
        player.achievements.includes("Supersanic") &&
        player.achievements.includes("Zero Deaths") &&
        player.achievements.includes("Over in 30 seconds") &&
        player.achievements.includes("Faster than a potato") &&
        player.achievements.includes("Multidimensional") &&
        player.achievements.includes("Daredevil") &&
        player.achievements.includes("AntiChallenged")) {
        amount += 1;
        document.getElementById("achRow4").className = "completedrow"
    }

    if (player.achievements.includes("Limit Break") &&
        player.achievements.includes("Age of Automation") &&
        player.achievements.includes("Definitely not worth it") &&
        player.achievements.includes("That's faster!") &&
        player.achievements.includes("Forever isn't that long") &&
        player.achievements.includes("Many Deaths") &&
        player.achievements.includes("Gift from the Gods") &&
        player.achievements.includes("Is this hell?")) {
        amount += 1;
        document.getElementById("achRow5").className = "completedrow"
    }

    for (i = amount; i > 0; i--) {
        player.achPow = Decimal.pow(1.5, amount)
    }

    document.getElementById("achmultlabel").innerHTML = "Current achievement multiplier on each Dimension: " + player.achPow.toFixed(1) + "x"


}



function timeMult() {
    var mult = new Decimal(1)
    if (player.infinityUpgrades.includes("timeMult")) mult = mult.times(Math.pow(player.totalTimePlayed / 1200, 0.15));
    if (player.infinityUpgrades.includes("timeMult2")) mult = mult.times(Decimal.max(Math.pow(player.thisInfinityTime / 2400, 0.25), 1));
    if (player.achievements.includes("One for each dimension")) mult = mult.times(Math.pow(player.totalTimePlayed / (600*60*48), 0.05));
    return mult;
}

function dimMults() {
    return new Decimal(1 + (player.infinitied * 0.2))
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
    if (player.infinityPoints.gte(player.dimensionMultDecreaseCost) && player.dimensionMultDecrease != 3) {
        player.infinityPoints = player.infinityPoints.minus(player.dimensionMultDecreaseCost)
        player.dimensionMultDecreaseCost *= 2000
        player.dimensionMultDecrease--;
        document.getElementById("postinfi42").innerHTML = "Dimension cost multiplier increase <br>"+player.dimensionMultDecrease+"x -> "+(player.dimensionMultDecrease-1)+"x<br>Cost: "+shortenCosts(player.dimensionMultDecreaseCost) +" IP"
        if (player.dimensionMultDecrease == 3) document.getElementById("postinfi42").innerHTML = "Dimension cost multiplier increase <br>"+player.dimensionMultDecrease+"x"
    }
}







buyAutobuyer = function(id) {
    if (player.autobuyers[id].cost > player.infinityPoints) return false;
    player.infinityPoints = player.infinityPoints.minus(player.autobuyers[id].cost);
    if (player.autobuyers[id].interval <= 100) {
        player.autobuyers[id].bulk *= 2;
        player.autobuyers[id].cost = Math.ceil(2.4*player.autobuyers[id].cost);
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















document.getElementById("secondSoftReset").onclick = function () {
    var bool = player.currentChallenge != "challenge11"
    if (player.currentChallenge == "challenge4" ?
    player.sixthAmount >= (player.galaxies * 90 + 99 - player.infinityUpgrades.includes("resetBoost") * 9) &&bool : player.eightAmount >= (player.galaxies * 60 + 80 - player.infinityUpgrades.includes("resetBoost") * 9) &&bool) {
      if (player.sacrificed == 0) giveAchievement("I don't believe in Gods");
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
            infinitied: player.infinitied,
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
            chall11Pow: 1,
            partInfinityPoint: player.partInfinityPoint,
            partInfinitied: player.partInfinitied,
            break: player.break,
            challengeTimes: player.challengeTimes,
            lastTenRuns: player.lastTenRuns,
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
            infinityDimension1: player.infinityDimension1,
            infinityDimension2: player.infinityDimension2,
            infinityDimension3: player.infinityDimension3,
            infinityDimension4: player.infinityDimension4,
            options: {
                newsHidden: player.options.newsHidden,
                scientific: player.options.scientific,
                notation: player.options.notation,
                invert: player.options.invert,
                challConf: player.options.challConf
            }
        };

	    if (player.currentChallenge == "challenge10") {
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
    
        player.firstPow = Decimal.pow(2, player.resets + 1)
        player.secondPow = Decimal.pow(2, player.resets)
        player.thirdPow = Decimal.max(Decimal.pow(2, player.resets - 1), 1)
        player.fourthPow = Decimal.max(Decimal.pow(2, player.resets - 2), 1)
        player.fifthPow = Decimal.max(Decimal.pow(2, player.resets - 3), 1)
        player.sixthPow = Decimal.max(Decimal.pow(2, player.resets - 4), 1)
        player.seventhPow = Decimal.max(Decimal.pow(2, player.resets - 5), 1)
        player.eightPow = Decimal.max(Decimal.pow(2, player.resets - 6), 1)
    
    
        if (player.infinityUpgrades.includes("resetMult")) {
            player.firstPow = Decimal.pow(2.5, player.resets + 1)
            player.secondPow = Decimal.pow(2.5, player.resets)
            player.thirdPow = Decimal.max(Decimal.pow(2.5, player.resets - 1), 1)
            player.fourthPow = Decimal.max(Decimal.pow(2.5, player.resets - 2), 1)
            player.fifthPow = Decimal.max(Decimal.pow(2.5, player.resets - 3), 1)
            player.sixthPow = Decimal.max(Decimal.pow(2.5, player.resets - 4), 1)
            player.seventhPow = Decimal.max(Decimal.pow(2.5, player.resets - 5), 1)
            player.eightPow = Decimal.max(Decimal.pow(2.5, player.resets - 6), 1)
        }


        if (player.achievements.includes("Claustrophobic")) player.tickspeed = player.tickspeed.times(0.98);
        if (player.achievements.includes("Faster than a potato")) player.tickspeed = player.tickspeed.times(0.98);
        updateCosts();
        clearInterval(player.interval);
        //updateInterval();
        updateDimensions();
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
        updateTickSpeed();
        if (player.galaxies >= 2) giveAchievement("Double Galaxy");
        if (player.galaxies >= 1) giveAchievement("You got past The Big Wall");
        if (player.challenges.includes("challenge1")) player.money = new Decimal(100)
        if (player.achievements.includes("That's fast!")) player.money = new Decimal(1000);

    }
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
};




document.getElementById("reset").onclick = function () {
    if (confirm("Do you really want to erase all your progress?")) {
        set_cookie('dimensionSave', defaultStart);
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
        updateTickSpeed();
        updateDimensions();
        updateChallenges();
        updateAutobuyers();
    }
};


function breakInfinity() {
    if (player.autobuyers[11]%1 === 0 || player.autobuyers[11].interval>100) return false
    if (player.break) {
        player.break = false
        document.getElementById("break").innerHTML = "BREAK INFINITY"
    } else {
        player.break = true
        document.getElementById("break").innerHTML = "FIX INFINITY"
        giveAchievement("Limit Break")
    }
}

function gainedInfinityPoints() {
    return Decimal.floor(Decimal.pow(10, Decimal.log10(player.money).dividedBy(308).minus(0.75)).times(player.infMult))
}


function setAchieveTooltip() {
    var apocAchieve = document.getElementById("Antimatter Apocalypse");
    var noPointAchieve = document.getElementById("There's no point in doing that");
    var sanic = document.getElementById("Supersanic")
    var forgotAchieve = document.getElementById("I forgot to nerf that")
    var potato = document.getElementById("Faster than a potato")
    var dimensional = document.getElementById("Multidimensional")

    apocAchieve.setAttribute('ach-tooltip', "Get over " + formatValue(player.options.notation, 1e80, 0, 0) + " antimatter");
    noPointAchieve.setAttribute('ach-tooltip', "Buy a single First Dimension when you have over " + formatValue(player.options.notation, 1e150, 0, 0) + " of them. Reward: First Dimensions are 10% stronger");
    forgotAchieve.setAttribute('ach-tooltip', "Get any Dimension multiplier over " + formatValue(player.options.notation, 1e31, 0, 0)) + ". Reward: First Dimensions are 5% stronger";
    sanic.setAttribute('ach-tooltip', "Have antimatter/sec exceed your current antimatter above " + formatValue(player.options.notation, 1e63, 0, 0));
    potato.setAttribute('ach-tooltip', "Get more than " + formatValue(player.options.notation, 1e26, 0, 0) + " ticks per second. Reward: Reduces starting tick interval by 2%");
    dimensional.setAttribute('ach-tooltip', "Reach " + formatValue(player.options.notation, 1e12, 0, 0) + " of all dimensions except 8th");
}

document.getElementById("notation").onclick = function () {
    player.options.scientific = !player.options.scientific;
    if (player.options.notation === "Emojis") {
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
    }
    setAchieveTooltip();
    updateCosts();
};


document.getElementById("newsbtn").onclick = function() {
  if (!player.options.newsHidden) {
    document.getElementById("game").style.display = "none";
    player.options.newsHidden = true
  } else {
    document.getElementById("game").style.display = "inline-block";
    player.options.newsHidden = false
  }
}


function resetDimensions() {
    const tiers = [ null, "first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eight" ];
    
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
    if (player.firstAmount == 0) return 1;
    if (player.currentChallenge != "challenge11") {
        if (player.achievements.includes("The Gods are pleased")) return Decimal.max(Decimal.pow((Decimal.log10(player.firstAmount).dividedBy(10.0)), 2.05).dividedBy(Decimal.max(Decimal.pow((Decimal.log10(Decimal.max(player.sacrificed, 1)).dividedBy(10.0)), 2.05), 1), 1), 1);
        else return Decimal.max(Decimal.pow((Decimal.log10(player.firstAmount).dividedBy(10.0)), 2).dividedBy(Decimal.max(Decimal.pow((Decimal.log10(Decimal.max(player.sacrificed, 1)).dividedBy(10.0)), 2), 1), 1), 1);
    } else {
        if (player.firstAmount != 0) return Decimal.max(Decimal.pow(player.firstAmount, 0.05).dividedBy(Decimal.max(Decimal.pow(player.sacrificed, 0.04), 1)), 1)
        else return 1
    }
}


function sacrifice() {
    player.eightPow = player.eightPow.times(calcSacrificeBoost())
    player.sacrificed = player.sacrificed.plus(player.firstAmount)
    if (player.currentChallenge != "challenge11") {
        if (player.currentChallenge == "challenge7") clearDimensions(6);
        else clearDimensions(7);
        if (Decimal.max(Decimal.pow((Decimal.log10(Decimal.max(player.sacrificed, 1)) / 10.0), 2), 2) >= 600) giveAchievement("The Gods are pleased");
    } else {
        player.chall11Pow *= calcSacrificeBoost()
        resetDimensions();
        player.money = new Decimal(100)
        
    }
    updateCosts();
    for (let tier = 1; tier <= 8; ++tier) {
        const name = TIER_NAMES[tier];
        document.getElementById(name + "D").innerHTML = DISPLAY_NAMES[tier] + " Dimension x" + formatValue(player.options.notation, getDimensionFinalMultiplier(tier), 1, 1);
        document.getElementById(name + "Amount").innerHTML = getDimensionDescription(tier);  
    }

}




document.getElementById("sacrifice").onclick = function () {
    if (player.eightAmount == 0) {
        return false;
    }
    
    if (!document.getElementById("confirmation").checked) {
        if (!confirm("Dimensional Sacrifice will remove all of your first to seventh dimensions (with the cost and multiplier unchanged) for a boost to Eighth Dimension. It will take time to regain production.")) {
            return false;
        }
    }
    
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


    var maxedAutobuy = 0;
    for (let tier = 1; tier <= 8; ++tier) {
        document.getElementById("toggleBtn" + tier).style.display = "inline-block";
        if (player.autobuyers[tier-1].interval <= 100) {
            document.getElementById("buyerBtn" + tier).innerHTML = shortenDimensions(player.autobuyers[tier-1].bulk*2)+"x bulk purchase<br>Cost: " + shortenDimensions(player.autobuyers[tier-1].cost) + " IP"
            maxedAutobuy++;
        }
        else document.getElementById("buyerBtn" + tier).innerHTML = "40% smaller interval <br>Cost: " + shortenDimensions(player.autobuyers[tier-1].cost) + " IP"

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

    for (var i=1; i<=12; i++) {
        player.autobuyers[i-1].isOn = document.getElementById(i + "ison").checked;
    }
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


function updatePriorities() {
    for (var x=0 ; x < autoBuyerArray().length; x++) {
        if (x < 9) autoBuyerArray()[x].priority = parseInt(document.getElementById("priority" + (x+1)).value)
    }
    player.autobuyers[9].priority = parseInt(document.getElementById("priority10").value)
    player.autobuyers[10].priority = parseInt(document.getElementById("priority11").value)
    var infvalue = document.getElementById("priority12").value
    if (infvalue.includes("e")) infvalue = parseInt(infvalue.split("e")[0]) * Math.pow(10, parseInt(infvalue.split("e")[1]))
    else infvalue = parseInt(infvalue)
    player.autobuyers[11].priority = infvalue
    player.autobuyers[9].bulk = Math.max(Math.floor(parseInt(document.getElementById("bulkDimboost").value)), 1)
    player.overXGalaxies = parseInt(document.getElementById("overGalaxies").value)
    priorityOrder()
}

function updateCheckBoxes() {
    for (var i = 0; i < 12; i++) {
        if (player.autobuyers[i]%1 !== 0) {
            if (player.autobuyers[i].isOn) document.getElementById((i+1) + "ison").checked = "true";
            else document.getElementById((i+1) + "ison").checked = ""
        }
    }


}


function toggleAutoBuyers() {
    var bool = player.autobuyers[0].isOn
    for (var i = 0; i<12; i++) {
        if (player.autobuyers[i]%1 !== 0) {
            if (bool) player.autobuyers[i].isOn = false
            else player.autobuyers[i].isOn = true
        }
    }
    updateCheckBoxes()
    updateAutobuyers()
}








function updateChallengeTimes() {
    document.getElementById("challengetime2").innerHTML = "Challenge  " + 2 + " time record " + timeDisplayShort(player.challengeTimes[0])
    document.getElementById("challengetime3").innerHTML = "Challenge  " + 3 + " time record " + timeDisplayShort(player.challengeTimes[1])
    document.getElementById("challengetime4").innerHTML = "Challenge  " + 4 + " time record " + timeDisplayShort(player.challengeTimes[6])
    document.getElementById("challengetime5").innerHTML = "Challenge  " + 5 + " time record " + timeDisplayShort(player.challengeTimes[4])
    document.getElementById("challengetime6").innerHTML = "Challenge  " + 6 + " time record " + timeDisplayShort(player.challengeTimes[8])
    document.getElementById("challengetime7").innerHTML = "Challenge  " + 7 + " time record " + timeDisplayShort(player.challengeTimes[7])
    document.getElementById("challengetime8").innerHTML = "Challenge  " + 8 + " time record " + timeDisplayShort(player.challengeTimes[9])
    document.getElementById("challengetime9").innerHTML = "Challenge  " + 9 + " time record " + timeDisplayShort(player.challengeTimes[3])
    document.getElementById("challengetime10").innerHTML = "Challenge " + 10 + " time record " + timeDisplayShort(player.challengeTimes[2])
    document.getElementById("challengetime11").innerHTML = "Challenge " + 11 + " time record " + timeDisplayShort(player.challengeTimes[10])
    document.getElementById("challengetime12").innerHTML = "Challenge " + 12 + " time record " + timeDisplayShort(player.challengeTimes[5])
    updateWorstChallengeTime();
}

function updateLastTenRuns() {
    var tempTime = 0
    var tempIP = 0
    for (var i=0; i<10;i++) {
        tempTime += player.lastTenRuns[i][0]
        tempIP += player.lastTenRuns[i][1]
    }
    tempTime /= 10
    tempIP /= 10
    for (var i=0; i<10; i++) {
        var ippm = player.lastTenRuns[i][1]/(player.lastTenRuns[i][0]/600)
        var tempstring = shorten(ippm) + " IP/min"
        if (ippm<1) tempstring = shorten(ippm*60) + " IP/hour"
        document.getElementById("run"+(i+1)).innerHTML = "The infinity "+(i+1)+" infinities ago took " + timeDisplayShort(player.lastTenRuns[i][0]) + " and gave " + shortenDimensions(player.lastTenRuns[i][1]) +" IP. "+ tempstring
    }
    
    var ippm = tempIP/(tempTime/600)
    var tempstring = shorten(ippm) + " IP/min"
    if (ippm<1) tempstring = shorten(ippm*60) + " IP/hour"
    document.getElementById("averagerun").innerHTML = "Last 10 infinities average time: "+ timeDisplayShort(tempTime)+" Average IP gain: "+shortenDimensions(tempIP)+" IP. "+tempstring
}


document.getElementById("postInfinityButton").onclick = function() {document.getElementById("bigcrunch").click()}

function addTime(time, ip) {
    for (var i=player.lastTenRuns.length-1; i>0; i--) {
        player.lastTenRuns[i] = player.lastTenRuns[i-1]
    }
    player.lastTenRuns[0] = [time, ip]
}


document.getElementById("bigcrunch").onclick = function () {
    var challNumber = parseInt(player.currentChallenge[player.currentChallenge.length-1])
    if (player.currentChallenge.length == 11) challNumber = parseInt("1"+player.currentChallenge[player.currentChallenge.length-1])
  if (player.money.gte(Number.MAX_VALUE)) {
      if (!player.achievements.includes("That's fast!") && player.thisInfinityTime <= 72000) giveAchievement("That's fast!");
      if (player.thisInfinityTime <= 6000) giveAchievement("That's faster!")
      if (player.thisInfinityTime <= 600) giveAchievement("Forever isn't that long")
      if (!player.achievements.includes("You didn't need it anyway") && player.eightAmount == 0) giveAchievement("You didn't need it anyway");
      if (!player.achievements.includes("Claustrophobic") && player.galaxies == 1) giveAchievement("Claustrophobic");
      if (!player.achievements.includes("Zero Deaths") && player.galaxies == 0 && player.resets == 0) giveAchievement("Zero Deaths")
      if (player.currentChallenge == "challenge2" && player.thisInfinityTime <= 1800) giveAchievement("Many Deaths")
      if (player.currentChallenge == "challenge11" && player.thisInfinityTime <= 1800) giveAchievement("Gift from the Gods")
      if (player.currentChallenge == "challenge5" && player.thisInfinityTime <= 1800) giveAchievement("Is this hell?")
      if (player.currentChallenge != "" && player.challengeTimes[challNumber-2] > player.thisInfinityTime) player.challengeTimes[challNumber-2] = player.thisInfinityTime
        if ((player.bestInfinityTime > 600 && !player.break) || player.currentChallenge != "") showTab("dimensions")
        if (player.currentChallenge == "challenge5") {
            try {
            kongregate.stats.submit('Challenge 9 time record (ms)', Math.floor(player.thisInfinityTime*100));
            
        } catch (err) {console.log("Couldn't load Kongregate API")}
    }
      if (player.currentChallenge != "" && !player.challenges.includes(player.currentChallenge)) {
      player.challenges.push(player.currentChallenge);
        }
        if (!player.break) {
            player.infinityPoints = player.infinityPoints.plus(player.infMult);
            addTime(player.thisInfinityTime, player.infMult)
        }
        else {
          player.infinityPoints = player.infinityPoints.plus(gainedInfinityPoints())
          addTime(player.thisInfinityTime, gainedInfinityPoints())
        }
        
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
        currentChallenge: "",
        infinityUpgrades: player.infinityUpgrades,
        infinityPoints: player.infinityPoints,
        infinitied: player.infinitied + 1,
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
        chall11Pow: 1,
        partInfinityPoint: player.partInfinityPoint,
        partInfinitied: player.partInfinitied,
        break: player.break,
        challengeTimes: player.challengeTimes,
        lastTenRuns: player.lastTenRuns,
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
        infinityDimension1: player.infinityDimension1,
        infinityDimension2: player.infinityDimension2,
        infinityDimension3: player.infinityDimension3,
        infinityDimension4: player.infinityDimension4,
        options: {
            newsHidden: player.options.newsHidden,
            scientific: player.options.scientific,
            notation: player.options.notation,
            invert: player.options.invert,
            challConf: player.options.challConf
        }
      };

      if (player.resets == 0 && player.currentChallenge == "") {
        if (player.infinityUpgrades.includes("skipReset1")) player.resets++;
        if (player.infinityUpgrades.includes("skipReset2")) player.resets++;
        if (player.infinityUpgrades.includes("skipReset3")) player.resets++;
        if (player.infinityUpgrades.includes("skipResetGalaxy")) {
            player.resets++;
            if (player.galaxies == 0) player.galaxies = 1
        }
    }
  
      player.firstPow = Decimal.pow(2, player.resets + 1)
      player.secondPow = Decimal.pow(2, player.resets)
      player.thirdPow = Decimal.max(Decimal.pow(2, player.resets - 1), 1)
      player.fourthPow = Decimal.max(Decimal.pow(2, player.resets - 2), 1)
      player.fifthPow = Decimal.max(Decimal.pow(2, player.resets - 3), 1)
      player.sixthPow = Decimal.max(Decimal.pow(2, player.resets - 4), 1)
      player.seventhPow = Decimal.max(Decimal.pow(2, player.resets - 5), 1)
      player.eightPow = Decimal.max(Decimal.pow(2, player.resets - 6), 1)


      
  
      if (player.infinityUpgrades.includes("resetMult")) {
          player.firstPow = Decimal.pow(2.5, player.resets + 1)
          player.secondPow = Decimal.pow(2.5, player.resets)
          player.thirdPow = Decimal.max(Decimal.pow(2.5, player.resets - 1), 1)
          player.fourthPow = Decimal.max(Decimal.pow(2.5, player.resets - 2), 1)
          player.fifthPow = Decimal.max(Decimal.pow(2.5, player.resets - 3), 1)
          player.sixthPow = Decimal.max(Decimal.pow(2.5, player.resets - 4), 1)
          player.seventhPow = Decimal.max(Decimal.pow(2.5, player.resets - 5), 1)
          player.eightPow = Decimal.max(Decimal.pow(2.5, player.resets - 6), 1)
      }

      if (player.achievements.includes("Claustrophobic")) player.tickspeed = player.tickspeed.times(0.98);
      if (player.achievements.includes("Faster than a potato")) player.tickspeed = player.tickspeed.times(0.98);
      updateCosts();
      clearInterval(player.interval);
      //updateInterval();
      updateDimensions();
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
      document.getElementById("matter").style.display = "none";
      document.getElementById("quickReset").style.display = "none";
      updateTickSpeed();
      
      try {
        kongregate.stats.submit('Infinitied', player.infinitied);
        kongregate.stats.submit('Fastest Infinity time (ms)', Math.floor(player.bestInfinityTime * 100))
        
    } catch (err) {console.log("Couldn't load Kongregate API")}
      if (!player.achievements.includes("To infinity!")) giveAchievement("To infinity!");
      if (!player.achievements.includes("That's a lot of infinites") && player.infinitied >= 10) giveAchievement("That's a lot of infinites");
      if (player.infinitied >= 1 && !player.challenges.includes("challenge1")) player.challenges.push("challenge1");

      
      updateAutobuyers();
      if (player.challenges.includes("challenge1")) player.money = new Decimal(100)
      if (player.achievements.includes("That's fast!")) player.money = new Decimal(1000);
      if (player.challenges.length >= 2 && !player.achievements.includes("Daredevil")) giveAchievement("Daredevil");
      if (player.challenges.length == 12 && !player.achievements.includes("AntiChallenged")) giveAchievement("AntiChallenged");

  }
  updateChallenges();
  updateChallengeTimes()
  updateLastTenRuns()
  resetInfDimensions();
  
}

function exitChallenge() {
    document.getElementById(player.currentChallenge).innerHTML = "Start"
    startChallenge("");
    updateChallenges();
}

function startChallenge(name) {
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
      chall11Pow: 1,
      partInfinityPoint: player.partInfinityPoint,
      partInfinitied: player.partInfinitied,
      break: player.break,
      challengeTimes: player.challengeTimes,
      lastTenRuns: player.lastTenRuns,
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
      infinityDimension1: player.infinityDimension1,
      infinityDimension2: player.infinityDimension2,
      infinityDimension3: player.infinityDimension3,
      infinityDimension4: player.infinityDimension4,
      options: {
        newsHidden: player.options.newsHidden,
	    notation: player.options.notation,
        scientific: player.options.scientific,
        invert: player.options.invert,
        challConf: player.options.challConf
      }
    };
	if (player.currentChallenge == "challenge10") {
        player.thirdCost = new Decimal(100)
        player.fourthCost = new Decimal(500)
        player.fifthCost = new Decimal(2500)
        player.sixthCost = new Decimal(2e4)
        player.seventhCost = new Decimal(2e5)
        player.eightCost = new Decimal(4e6)
    }
    if (player.achievements.includes("Claustrophobic")) player.tickspeed = player.tickspeed.times(0.98);
    if (player.achievements.includes("Faster than a potato")) player.tickspeed = player.tickspeed.times(0.98);
    updateCosts();
    clearInterval(player.interval);
    //updateInterval();
    updateDimensions();
    document.getElementById("secondRow").style.display= "none";
    document.getElementById("thirdRow").style.display= "none";
    document.getElementById("tickSpeed").style.visibility = "hidden";
    document.getElementById("tickSpeedMax").style.visibility = "hidden";
    document.getElementById("tickLabel").style.visibility = "hidden";
    document.getElementById("tickSpeedAmount").style.visibility = "hidden";
    document.getElementById("fourthRow").style.display= "none";
    document.getElementById("fifthRow").style.display= "none";
    document.getElementById("sixthRow").style.display= "none";
    document.getElementById("seventhRow").style.display= "none";
    document.getElementById("eightRow").style.display= "none";
    if (name == "challenge12") document.getElementById("matter").style.display = "block";
    else document.getElementById("matter").style.display = "none";
    if (name == "challenge12" || name == "challenge9" || name == "challenge5") document.getElementById("quickReset").style.display = "inline-block";
    else document.getElementById("quickReset").style.display = "none";
    updateTickSpeed();
    showTab('dimensions');
    updateChallenges();
    if (player.challenges.includes("challenge1")) player.money = new Decimal(100)
    if (player.achievements.includes("That's fast!")) player.money = new Decimal(1000);
    showTab("dimensions")
    try {
        kongregate.stats.submit('Infinitied', player.infinitied);
        kongregate.stats.submit('Fastest Infinity time', Math.floor(player.bestInfinityTime / 10))
    } catch (err) {console.log("Couldn't load Kongregate API")}
    
    giveAchievement("To infinity!");
    if (player.infinitied >= 10) giveAchievement("That's a lot of infinites");
  }
  resetInfDimensions();
  
}

function getDimensionProductionPerSecond(tier) {
    let ret = Decimal.floor(player[TIER_NAMES[tier] + 'Amount']).times(getDimensionFinalMultiplier(tier)).times(new Decimal(1000).dividedBy(player.tickspeed))
    if (player.currentChallenge == "challenge7") {
        if (tier == 4) ret = Decimal.pow(Decimal.floor(player[TIER_NAMES[tier] + 'Amount']), 1.3).times(getDimensionFinalMultiplier(tier)).dividedBy(player.tickspeed.dividedBy(1000))
        else if (tier == 2) ret = Decimal.pow(Decimal.floor(player[TIER_NAMES[tier] + 'Amount']), 1.5).times(getDimensionFinalMultiplier(tier)).dividedBy(player.tickspeed.dividedBy(1000))
    }
    if (player.currentChallenge == "challenge2") ret = ret.times(player.chall2Pow)
    return ret;
}

function updateETAs() {
    for (let tier = 1; tier <= 8; ++tier) {
        const name = TIER_NAMES[tier] + "Cost";
        document.getElementById("ETADim" + tier).innerHTML = timeDisplay(getETA(name))
    }
    const resetCosts = [1e12,1e17,1e23,1e30]
    if (player.resets<4) document.getElementById("ETAreset1").innerHTML = timeDisplay(getETA(resetCosts[player.resets]))
    else document.getElementById("ETAreset1").innerHTML = timeDisplay(getETA(Decimal.pow(10,Decimal.ceiling(player.resets*1.5)*15-31)))
    document.getElementById("ETAreset2").innerHTML = timeDisplay(getETA(Decimal.pow(10,player.galaxies*90+129)))
    document.getElementById("ETAreset3").innerHTML = timeDisplay(getETA(Number.MAX_VALUE))
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
    document.getElementById("infDimMultAmount").innerHTML = shortenMoney(Decimal.pow(player.infinityPower, 7))
    document.getElementById("infPowPerSec").innerHTML = "You are getting " +shortenDimensions(getInfinityDimensionProduction(1))+" Infinity Power per second."
}


function getNewInfReq() {
    if (!player.infDimensionsUnlocked[0]) return new Decimal("1e1100")
    else if (!player.infDimensionsUnlocked[1]) return new Decimal("1e1750")
    else if (!player.infDimensionsUnlocked[2]) return new Decimal("1e2500")
    else return new Decimal("1e696969")
}


function newDimension() {
    if (player.money.gte(getNewInfReq())) {
        if (!player.infDimensionsUnlocked[0]) player.infDimensionsUnlocked[0] = true
        else if (!player.infDimensionsUnlocked[1]) player.infDimensionsUnlocked[1] = true
        else if (!player.infDimensionsUnlocked[2]) player.infDimensionsUnlocked[2] = true
        else if (!player.infDimensionsUnlocked[3]) player.infDimensionsUnlocked[3] = true
    }
}





setInterval(function () {
    var thisUpdate = new Date().getTime();
    if (thisUpdate - player.lastUpdate >= 21600000) giveAchievement("Don't you dare to sleep")
    var diff = Math.min(thisUpdate - player.lastUpdate, 21600000);
    diff = diff / 100;
    if (diff < 0) diff = 1;
    if (player.thisInfinityTime < -10) player.thisInfinityTime = Infinity
    if (player.bestInfinityTime < -10) player.bestInfinityTime = Infinity
    player.matter = player.matter.times(Decimal.pow((1.02 + player.resets/200 + player.galaxies/100), diff))
    if (player.matter.gt(player.money) && player.currentChallenge == "challenge12") {
        if (player.resets == 0) player.resets--;
        else player.resets -= 2;
        softReset(1);
    }
    player.chall3Pow = player.chall3Pow.times(Decimal.pow(1.00038, diff))
    player.chall2Pow = Math.min(player.chall2Pow + diff/1800, 1)
    if (player.infinityUpgrades.includes("passiveGen")) player.partInfinityPoint += diff / player.bestInfinityTime;
    if (player.partInfinityPoint >= 10) {
        player.partInfinityPoint -= 10;
        player.infinityPoints = player.infinityPoints.plus(player.infMult);
    }

    if (player.infinityUpgrades.includes("infinitiedGeneration")) player.partInfinitied += diff / player.bestInfinityTime;
    if (player.partInfinitied >= 5) {
        player.partInfinitied -= 5;
        player.infinitied ++;
    }

    if (player.currentChallenge != "challenge7") {
        for (let tier = 7; tier >= 1; --tier) {
            const name = TIER_NAMES[tier];
            
            player[name + 'Amount'] = player[name + 'Amount'].plus(getDimensionProductionPerSecond(tier + 1).times(diff / 100));
    }
    } else {
        for (let tier = 6; tier >= 1; --tier) {
            const name = TIER_NAMES[tier];
            
            player[name + 'Amount'] = player[name + 'Amount'].plus(getDimensionProductionPerSecond(tier + 2).times(diff / 100));
        }
    }
        
        if (player.money.lte(Number.MAX_VALUE) || (player.break && player.currentChallenge == "")) {
      if (player.currentChallenge == "challenge3") {
        player.money = player.money.plus(getDimensionProductionPerSecond(1).times(diff/10).times(player.chall3Pow));
        player.totalmoney = player.totalmoney.plus(getDimensionProductionPerSecond(1).times(diff/10).times(player.chall3Pow));
      } else {
        player.money = player.money.plus(getDimensionProductionPerSecond(1).times(diff/10));
        player.totalmoney = player.totalmoney.plus(getDimensionProductionPerSecond(1).times(diff/10));
      }
      if (player.currentChallenge == "challenge7") {
          player.money = player.money.plus(getDimensionProductionPerSecond(2).times(diff/10))
          player.totalmoney = player.totalmoney.plus(getDimensionProductionPerSecond(2).times(diff/10))
      
    }
    }

    document.getElementById("dimTabButtons").style.display = "none"

    player.totalTimePlayed += diff
    player.thisInfinityTime += diff

 

    for (var tier=1;tier<4;tier++) {
        if (tier != 4 && player.infDimensionsUnlocked[tier-1]) player["infinityDimension"+tier].amount = player["infinityDimension"+tier].amount.plus(getInfinityDimensionProduction(tier+1).times(diff/100))
        if (player.infDimensionsUnlocked[tier-1]) {
            document.getElementById("infRow"+tier).style.display = "inline-block"
            document.getElementById("dimTabButtons").style.display = "inline-block"
        }
        else document.getElementById("infRow"+tier).style.display = "none"
    }



    


        player.infinityPower = player.infinityPower.plus(getInfinityDimensionProduction(1).times(diff/10))




    
    if (player.money.gte(Number.MAX_VALUE) && (!player.break || player.currentChallenge != "")) {
        document.getElementById("bigcrunch").style.display = 'inline-block';
        if (player.currentChallenge == "" && (player.bestInfinityTime <= 600 || player.break)) {}
        else showTab('emptiness');
    } else document.getElementById("bigcrunch").style.display = 'none';

    if (player.break && player.money.gte(Number.MAX_VALUE) && player.currentChallenge == "") {
        document.getElementById("postInfinityButton").style.display = "inline-block"
    } else {
        document.getElementById("postInfinityButton").style.display = "none"
    }


    if (player.break) document.getElementById("iplimit").style.display = "inline"
    else document.getElementById("iplimit").style.display = "none"

    document.getElementById("postInfinityButton").innerHTML = "Big Crunch for "+shortenDimensions(gainedInfinityPoints())+" Infinity Points"

    updateMoney();
    updateCoinPerSec();
    updateDimensions();
    updateInfinityDimensions();
    updateInfPower();
    if (calcPerSec(player.firstAmount, player.firstPow, player.infinityUpgrades.includes("18Mult")).gt(player.money)) {
	if(player.money.gt(Math.pow(10,63)) && !player.achievements.includes("Supersanic")) giveAchievement("Supersanic");
    Marathon++;
    
	if (Marathon >= 300 && !player.achievements.includes("Over in 30 seconds")) giveAchievement("Over in 30 seconds");
    } else {
	Marathon = 0; }

    for (let tier = 1; tier <= 8; ++tier) {
        const name = TIER_NAMES[tier];
        if (player.currentChallenge != "challenge10") {
            document.getElementById(name).className = canAfford(player[name + 'Cost']) ? 'storebtn' : 'unavailablebtn';
            document.getElementById(name + 'Max').className = canAfford(player[name + 'Cost'].times(10 - player[name + 'Bought'])) ? 'storebtn' : 'unavailablebtn';
        } else {
            if (tier >= 3) {
                document.getElementById(name).className = player[TIER_NAMES[tier-2] + 'Amount'].gte(player[name + 'Cost']) ? 'storebtn' : 'unavailablebtn';
                document.getElementById(name + 'Max').className = player[TIER_NAMES[tier-2] + 'Amount'].gte(player[name + 'Cost'].times(10 - player[name + 'Bought'])) ? 'storebtn' : 'unavailablebtn';
            } else {
                document.getElementById(name).className = canAfford(player[name + 'Cost']) ? 'storebtn' : 'unavailablebtn';
                document.getElementById(name + 'Max').className = canAfford(player[name + 'Cost'].times(10 - player[name + 'Bought'])) ? 'storebtn' : 'unavailablebtn';
            }
        }
    }

    

    
    if (canAfford(player.tickSpeedCost)) {
        document.getElementById("tickSpeed").className = 'storebtn';
        document.getElementById("tickSpeedMax").className = 'storebtn';
    } else {
        document.getElementById("tickSpeed").className = 'unavailablebtn';
        document.getElementById("tickSpeedMax").className = 'unavailablebtn';
    }
    
    if (player.infinityPoints.gt(0)) {
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
        if (player.infinityUpgrades.includes("skipReset3") && player.infinityPoints.gte(50)) document.getElementById("infi44").className = "infinistorebtn4"
        else document.getElementById("infi44").className = "infinistorebtnlocked"
        if (player.infinityUpgrades.includes("skipResetGalaxy") && player.infinityUpgrades.includes("passiveGen") && player.infinityUpgrades.includes("galaxyBoost") && player.infinityUpgrades.includes("resetBoost") && player.infinityPoints >= player.infMultCost) {
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

        if (player.infinityPoints.gte(player.dimensionMultDecreaseCost)) document.getElementById("postinfi42").className = "infinistorebtn1"
        else document.getElementById("postinfi42").className = "infinistorebtnlocked"

        if (player.infinityPoints.gte(20e6)) document.getElementById("postinfi13").className = "infinistorebtn1"
        else document.getElementById("postinfi13").className = "infinistorebtnlocked"

        if (player.infinityPoints.gte(5e9)) document.getElementById("postinfi23").className = "infinistorebtn1"
        else document.getElementById("postinfi23").className = "infinistorebtnlocked"

        if (player.infinityPoints.gte(1e15)) document.getElementById("postinfi33").className = "infinistorebtn1"
        else document.getElementById("postinfi33").className = "infinistorebtnlocked"


    } else {
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

    if (player.autobuyers[11]%1 !== 0 && player.autobuyers[11].interval == 100) {
        document.getElementById("postinftable").style.display = "inline-block"
        document.getElementById("postinftable2").style.display = "inline-block"
    } else {
        document.getElementById("postinftable").style.display = "none"
        document.getElementById("postinftable2").style.display = "none"
    }

    if (player.autobuyers[11].interval == 100) document.getElementById("abletobreak").style.display = "none"


    document.getElementById("infinitybtn").style.display = "none";
    document.getElementById("challengesbtn").style.display = "none";

    if (player.money.gte(Number.MAX_VALUE) && (player.currentChallenge != "" || (player.bestInfinityTime > 600 && !player.break))) {
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
    if (player.dimensionMultDecrease == 2) document.getElementById("postinfi42").className = "infinistorebtnbought"

    if (player.infinityUpgrades.includes("infinitiedGeneration")) document.getElementById("postinfi13").className = "infinistorebtnbought"
    if (player.infinityUpgrades.includes("bulkBoost")) document.getElementById("postinfi23").className = "infinistorebtnbought"
    if (player.infinityUpgrades.includes("autobuyerUpgrade")) document.getElementById("postinfi33").className = "infinistorebtnbought"
            

    document.getElementById("progressbar").style.width = Decimal.min((Decimal.log10(player.money.plus(1)) / Decimal.log10(Number.MAX_VALUE) * 100), 100).toFixed(2) + "%"
    document.getElementById("progressbar").innerHTML = Decimal.min((Decimal.log10(player.money.plus(1)) / Decimal.log10(Number.MAX_VALUE) * 100), 100).toFixed(2) + "%"

    
    const scale1 = [2.82e-45,1e-42,7.23e-30,5e-21,9e-17,6.2e-11,5e-8,3.555e-6,7.5e-4,1,2.5e3,2.6006e6,3.3e8,5e12,4.5e17,1.08e21,1.53e24,1.41e27,5e32,8e36,1.7e45,1.7e48,3.3e55,3.3e61,5e68,1e73,3.4e80,1e113];
    const scale2 = [" protons."," nucleuses."," Hydrogen atoms."," viruses."," red blood cells."," grains of sand."," grains of rice."," teaspoons."," wine bottles."," fridge-freezers."," Olympic-sized swimming pools."," Great Pyramids of Giza."," Great Walls of China."," large asteroids.",
                   " dwarf planets."," Earths."," Jupiters."," Suns."," red giants."," hypergiant stars."," nebulas."," Oort clouds."," Local Bubbles."," galaxies."," Local Groups."," Sculptor Voids."," observable universes."," Dimensions."];
    var id = 0;
    if (player.money.times(4.22419e-105).gt(2.82e-45)) {
        if (player.money.times(4.22419e-105).gt(1e113)) id = scale1.length - 1;
        else {
            while (player.money.times(4.22419e-105).gt(scale1[id])) id++;
            if (id > 0) id--;
        }
        if (id >= 7 && id < 11) document.getElementById("infoScale").innerHTML = "If every antimatter were a planck volume, you would have enough to fill " + formatValue(player.options.notation, player.money * 4.22419e-105 / scale1[id], 2, 1) + scale2[id];
        else document.getElementById("infoScale").innerHTML = "If every antimatter were a planck volume, you would have enough to make " + formatValue(player.options.notation, player.money.times(4.22419e-105).dividedBy(scale1[id]), 2, 1) + scale2[id];
    } else {
        if (player.money.times(1e-54) < 2.82e-45) document.getElementById("infoScale").innerHTML = "If every antimatter were " + formatValue(player.options.notation,2.82e-45 / 1e-54 / player.money, 2, 1) + " attometers cubed, you would have enough to make a proton.";
        else if (player.money * 1e-63 < 2.82e-45) document.getElementById("infoScale").innerHTML = "If every antimatter were " + formatValue(player.options.notation,2.82e-45 / 1e-63 / player.money, 2, 1) + " zeptometers cubed, you would have enough to make a proton.";
        else if (player.money * 1e-72 < 2.82e-45) document.getElementById("infoScale").innerHTML = "If every antimatter were " + formatValue(player.options.notation,2.82e-45 / 1e-72 / player.money, 2, 1) + " yoctometers cubed, you would have enough to make a proton.";
        else document.getElementById("infoScale").innerHTML = "If every antimatter were " + formatValue(player.options.notation,2.82e-45 / 4.22419e-105 / player.money, 2, 1) + " planck volumes, you would have enough to make a proton.";
    }
    
    const shiftRequirement = getShiftRequirement(0);
    
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
    
    if (player.currentChallenge == "challenge2") document.getElementById("chall2Pow").style.display = "inline-block"
    else document.getElementById("chall2Pow").style.display = "none"
    if (player.currentChallenge == "challenge3") document.getElementById("chall3Pow").style.display = "inline-block"
    else document.getElementById("chall3Pow").style.display = "none"
    
    document.getElementById("chall2Pow").innerHTML = (player.chall2Pow*100).toFixed(2) + "%"
    document.getElementById("chall3Pow").innerHTML = shorten(player.chall3Pow*100) + "%"


    if (player.infDimensionsUnlocked.includes(false) && player.break) {
        document.getElementById("newDimensionButton").style.display = "inline-block"
    } else document.getElementById("newDimensionButton").style.display = "none"

    if (player.money.gte(getNewInfReq())) document.getElementById("newDimensionButton").className = "newdim"
    else document.getElementById("newDimensionButton").className = "newdimlocked"

    document.getElementById("newDimensionButton").innerHTML = "Get " + shortenCosts(getNewInfReq()) + " antimatter to unlock a new Dimension."

    document.getElementById("sacrifice").setAttribute('ach-tooltip', "Boosts 8th Dimension by " + formatValue(player.options.notation, calcSacrificeBoost(), 2, 2) + "x");

    document.getElementById("sacrifice").innerHTML = "Dimensional Sacrifice ("+formatValue(player.options.notation, calcSacrificeBoost(), 2, 2)+"x)";

    if (player.firstPow >= 10e30) giveAchievement("I forgot to nerf that")
    if (player.money >= 10e79) giveAchievement("Antimatter Apocalypse")
    if (player.totalTimePlayed >= 10 * 60 * 60 * 24 * 8) giveAchievement("One for each dimension")
    if (player.seventhAmount > 1e12) giveAchievement("Multidimensional");


    player.lastUpdate = thisUpdate;
}, 50);


function dimBoolean() {
    const name = TIER_NAMES[getShiftRequirement(0).tier]
    if (!player.autobuyers[9].isOn) return false
    if (player.autobuyers[9].ticks*100 < player.autobuyers[9].interval) return false
    if (player[name + "Amount"] < getShiftRequirement(player.autobuyers[9].bulk-1).amount) return false
    if (player.overXGalaxies <= player.galaxies) return true
    if (player.currentChallenge =="challenge4" && player.autobuyers[9].priority < getShiftRequirement(0).amount && getShiftRequirement(0).tier == 6) return false
    if (player.autobuyers[9].priority < getShiftRequirement(0).amount && getShiftRequirement(0).tier == 8) return false
    return true
}



setInterval(function() {
    if (!player.infinityUpgrades.includes("autoBuyerUpgrade")) {
        if (player.autobuyers[11]%1 !== 0) {
            if (player.autobuyers[11].ticks*100 >= player.autobuyers[11].interval && player.money.gte(Number.MAX_VALUE)) {
                if (player.autobuyers[11].isOn) {
                    if (!player.break) {
                        document.getElementById("bigcrunch").click()
                    } else if (player.autobuyers[11].priority <= gainedInfinityPoints()) {
                        document.getElementById("bigcrunch").click()
                    }
                    
                    player.autobuyers[11].ticks = 1;
                } 
            } else player.autobuyers[11].ticks += 1;
            
        }


            if (player.autobuyers[10]%1 !== 0) {
                if (player.autobuyers[10].ticks*100 >= player.autobuyers[10].interval && (player.currentChallenge == "challenge4" ? player.sixthAmount >= getGalaxyRequirement() : player.eightAmount >= getGalaxyRequirement())) {
                    if (player.autobuyers[10].isOn && player.autobuyers[10].priority > player.galaxies) {
                        document.getElementById("secondSoftReset").click()
                        player.autobuyers[10].ticks = 1;
                    } 
                } else player.autobuyers[10].ticks += 1;
            }


            if (player.autobuyers[9]%1 !== 0) {
                if (dimBoolean()) {
                    if (player.autobuyers[9].isOn) {
                        softReset(player.autobuyers[9].bulk)
                        player.autobuyers[9].ticks = 1;
                    } 
                } else player.autobuyers[9].ticks += 1;
            }

            for (var i=0; i<priority.length; i++) {
                if (priority[i].ticks*100 >= priority[i].interval || priority[i].interval == 100) {
                    if ((priority[i].isOn && canBuyDimension(priority[i].tier)) ) {
                        if (priority[i] == player.autobuyers[8] ) {
                            if (priority[i].target == 10) buyMaxTickSpeed()
                            else buyTickSpeed()
                        } else {
                            if (priority[i].target > 10) {
                                
                                    buyManyDimensionAutobuyer(priority[i].target-10, priority[i].bulk)
                                    
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
}, 100)

setInterval(function() {
    if (player.infinityUpgrades.includes("autoBuyerUpgrade")) {
        if (player.autobuyers[11]%1 !== 0) {
            if (player.autobuyers[11].ticks*100 >= player.autobuyers[11].interval && player.money.gte(Number.MAX_VALUE)) {
                if (player.autobuyers[11].isOn) {
                    if (!player.break) {
                        document.getElementById("bigcrunch").click()
                    } else if (player.autobuyers[11].priority <= gainedInfinityPoints()) {
                        document.getElementById("bigcrunch").click()
                    }
                    
                    player.autobuyers[11].ticks = 1;
                } 
            } else player.autobuyers[11].ticks += 1;
            
        }


            if (player.autobuyers[10]%1 !== 0) {
                if (player.autobuyers[10].ticks*100 >= player.autobuyers[10].interval && (player.currentChallenge == "challenge4" ? player.sixthAmount >= getGalaxyRequirement() : player.eightAmount >= getGalaxyRequirement())) {
                    if (player.autobuyers[10].isOn && player.autobuyers[10].priority > player.galaxies) {
                        document.getElementById("secondSoftReset").click()
                        player.autobuyers[10].ticks = 1;
                    } 
                } else player.autobuyers[10].ticks += 1;
            }


            if (player.autobuyers[9]%1 !== 0) {
                if (dimBoolean()) {
                    if (player.autobuyers[9].isOn) {
                        softReset(player.autobuyers[9].bulk)
                        player.autobuyers[9].ticks = 1;
                    } 
                } else player.autobuyers[9].ticks += 1;
            }

            for (var i=0; i<priority.length; i++) {
                if (priority[i].ticks*100 >= priority[i].interval || priority[i].interval == 100) {
                    if ((priority[i].isOn && canBuyDimension(priority[i].tier)) ) {
                        if (priority[i] == player.autobuyers[8] ) {
                            if (priority[i].target == 10) buyMaxTickSpeed()
                            else buyTickSpeed()
                        } else {
                            if (priority[i].target > 10) {
                                
                                    buyManyDimensionAutobuyer(priority[i].target-10, priority[i].bulk)
                                    
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





var newsArray = ["You just made your 1,000,000,000,000,000 antimatter. This one tastes like chicken", "Nerf the galaxies please.", "9th Dimension is a lie.",
"The cookie is a lie.", "Antimatter cookies have been confirmed to not exist, whoever claims that, stop.", "Antimatter ghosts do not exist. Just like matter ghosts. They don't have any matter, for that matter.",
"Nuclear power plants have been abandoned in favor of antimatter power.", "What do you mean, more than two dimensions??? We're on a screen, clearly there are only 2 dimensions.",
"Antimatter prices have drastically dropped due to newfound abundance.", "In the news today, humans make a antimatter animal sacrifice to the antimatter god.", "You made one antimatter! Whatever that means.",
"Scientists confirm that the colour of antimatter is Blurple", "How does it matter if its antimatter?", "None of this matters", "IN THE END, IT DOESN'T ANTIMATTER -hevipelle",
"New news company has become rivals with us. They are made entirely of antimatter.", "How much is Infinity? -literally everyone at least once", "How does NASA organise a party? They planet.",
"The square root of 9 is 3, therefore the 9th dimension can't exist.", "Electrons are now seeing the happy things in life. We're calling these happy electrons 'Positrons.' Wait, that's taken?",
"This completely useless sentence will get you nowhere and you know it. What a horrible obnoxious man would come up with it, he will probably go to hell, and why would the developer even implement it? Even if you kept reading it you wouldn't be able to finish it (the first time).",
"GHOST SAYS HELLO -Boo-chan", "Can someone tell hevi to calm down? -Mee6", "Due to Antimatter messing with physics, a creature that was once a moose is now a human", "!hi", "Eh, the Fourth Dimension is alright...",
"Alright -Alright", "The English greeting is not present in Antimatter speak.", "To buy max or not to buy max, that is the question", "You do know that you won't reach Infinity in -1 seconds, right?", "This antimatter triggers me",
"No, mom, I can't pause this game.", "Scientific notation has entered the battlefield.", "Make the Universe Great Again! -Tronald Dump", "#dank-maymays",
"A new religion has been created, and it's spreading like wildfire. The believers of this religion worship the Heavenly Pelle, the goddess of antimatter. They also believe that 10^308 is infinite.",
"Someone has just touched a blob, and blown up. Was the blob antimatter, or was the guy made of Explodium?", "Antimatter people seem to be even more afraid of 13 then we are. They destroyed entire galaxies just to remove 13 from their percents.",
"If you are not playing on Kongregate or ivark.github.io, the site is bootleg.", "Rate 5 on Kongregate so more people can experience this 5 star Rating", "BOO!", "You ate for too long. -hevipelle", "I hate myself. -Boo-chan",
"Gee golly -Xandawesome", "Need more quotes! -hevipelle", "Above us, there is nothing above, But the stars, above.", "If black lives matter, do white lives antimatter?", "Somebody wasn't nice, he got an antimatter-storm.",
"You are living, you occupy space, you have a mass, you matter... unless you antimatter.", "I clicked too fast... my PC is now dematerialised.",
"If an alien lands on your front lawn and extends an appendage as a gesture of greeting, before you get friendly, toss it an eightball. If the appendage explodes, then the alien was probably made of antimatter. If not, then you can proceed to take it to your leader. -Neil deGrasse Tyson",
"There always must be equal matter than there is antimatter, I guess your mom balances that a bit", "Nothing is created, nothing is destroyed.", "We dug a big hole to store this antimatter... Adele's rolling in it.",
"If everything is antimatter, how can you see yourself?", "The stock markets have crashed due to antimatter beings somehow knowing what they will be tomorrow.", "My dog ate too much antimatter, now he is doing 'meow!'", "If you put infinity into your calculator it will result in 42!",
"To understand dimensional sacrifice, you do actually need a PhD in theoretical physics. Sorry!", "You have found the rarest antimatter pepe, it's ultra rare!", "Can we get 1e169 likes on this video??? Smash that like button!!",
"You got assimilated by the 9th dimension? Just call your doctor for mental illness!", "The smell of antimatter has been revealed. It smells like kittens", "Just another antimatter in the wall", "GET SNIPED, WEAKLING", "Thanks a lot -dankesehr",
"This world situation is a SOS situation to the world!! MAYDAY, MAYDAY!!", "As for sure as the sun rises in the west, of all the singers and poets on earth, I am the bestest. - hevipelle", "I'm good at using github -hevipelle",
"A new chat server has been created for Antimatter people to spy on Matter people, and the world has fallen into chaos and discord", "A new study has come out linking the consumption of potatoes with increased risk of Antimatter implosion.  Scientists suggest eating more.",
"A new group for the standardisation of numbers have come forward with a novel new format involving emoji's.", "I thought that I fixed that bug but apparently some update broke it again -hevipelle",
"Maybe I'm gay then -Bootato", "Breaking news! Hevipelle has just announced that the buy max button is in fact going to be removed!", "I dedicate this game to my girlfriend", 
"Antimatter guns don't kill antimatter people, antimatter people kill antimatter people but does that mean that antimatter toaster doesn't toast antimatter toasts, antimatter toast toasts antimatter toasts?", 
"But to an antimatter person, wouldn't they be matter and us antimatter?", "And nothing Antimatters", "Why is there no 9th dimension? Because 7 8 9.", 
"School starting up strikes fear in students universe-wide, as schools are no longer segregated between Matter and antimatter. Annihilation is prominent.",
"Why does no one talk about the 0th dimension?", "Antimatter ice cream stand has recently opened- they have octillions of flavors!", "The 9th dimension cannot exist because the Nein-speaking nazis died in WW2.",
"The fatter catter satter on the antimatter.", "Who let the DOgs out?", "I've got 1.79e308 problems, but none of them antimatters", "If you can't read this you disabled the news.", 
"Doesn't leave, just mutes the server so he doesn't receive notifications", "Most quotes found online are falsely atributed -Abraham Lincoln", "It should work now, but it doesn't -hevipelle",
"This game doesn't have any errors... they're alternative successes.", "A third type of matter has been discovered: null matter. It doesn't do anything and is basically useless. The scientists who discovered it were fired.",
"Where does Antimatter Nemo live? In a NNnNeMI-NNnNe.", "Your Mother-in-Law keeps nagging you about all these antimatter colliders.", "If matter exists, then does antimatter not exist?", "Does Hevi just pick quotes to put into the game?",
"If you break the fourth wall... well, there's still the fifth, sixth, seventh, and eighth to get through before you encounter bad things, so you should be fine", "Antimatter=Life. Not cobblestone, not dirt, nothing like that. Antimatter.",
"Breaking News: Error Error Error", "Anti Emoji Movie a huge hit", "How much antiwood could an antiwoodchuck chuck if an antiwoodchuck could chuck antiwood?", "Chaos isnt a pit, chaos is a matter"]


var conditionalNewsArray = ["Our universe is falling apart. We are all evacuating. This is the last news cast", "THIS NEWS STATION HAS SHUT DOWN DUE TO COLLAPSING UNIVERSE", 
"Researchers have confirmed that there is another dimension to this world. However, only antimatter beings can interact with it", 
"Studies show a massive problem with the time-space continuum. In other words, a large amount of antimatter has dissapeared from the cosmos", 
"Should we call antimatter Matter now? There seems to be more of it."]

var initpos = c.width;
ctx.textBaseline = 'top';
var newsTextValue = Decimal.round(Decimal.random() * (newsArray.length - 1))
var newsText = newsArray[newsTextValue];

setInterval(function () {
    //document.getElementById("news").innerHTML = newsArray[Decimal.round(Decimal.random() * (newsArray.length - 1))];
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.font = "24px Typewriter";
    ctx.fillText(newsText, initpos, 30);
    initpos -= 6;
    
    if (player.fourthAmount != 0 && !newsArray.includes(conditionalNewsArray[2])) newsArray.push(conditionalNewsArray[2])
    if (player.resets != 0 && !newsArray.includes(conditionalNewsArray[3])) newsArray.push(conditionalNewsArray[3])
    if (player.achievements.includes("Antimatter Apocalypse") && !newsArray.includes(conditionalNewsArray[4])) newsArray.push(conditionalNewsArray[4])
      
    var next = newsArray[Math.round(Math.random() * (newsArray.length - 1))]
    if (player.money >= 1e306) next = conditionalNewsArray[0]
    if (player.money == Infinity) next = conditionalNewsArray[1]
    if (initpos < (newsText.length * 32 * -1)) {
        initpos = c.width;
        newsTextValue = Math.round(Math.random() * (newsArray.length - 1))
        newsText = newsArray[newsTextValue];
        if (!player.options.newsHidden) {
  			if (conditionalNewsArray.includes(newsText) && !player.newsArray.includes(newsText)) player.newsArray.push(newsText);
            else if (!conditionalNewsArray.includes(newsText) && !player.newsArray.includes(newsTextValue)) player.newsArray.push(newsTextValue);
  			if (player.newsArray.length>=50 && !player.achievements.includes("Fake News")) giveAchievement("Fake News") 
        }


    }
}, 1000 / 30);

document.getElementById("challenge2").onclick = function () {
  startChallenge("challenge2")
}

document.getElementById("challenge3").onclick = function () {
  startChallenge("challenge3")
}

document.getElementById("challenge4").onclick = function () {
  startChallenge("challenge4")
}

document.getElementById("challenge5").onclick = function () {
  startChallenge("challenge5");
}

document.getElementById("challenge6").onclick = function () {
  startChallenge("challenge6");
}

document.getElementById("challenge7").onclick = function () {
  startChallenge("challenge7");
}

document.getElementById("challenge8").onclick = function () {
  startChallenge("challenge8");
}

document.getElementById("challenge9").onclick = function () {
  startChallenge("challenge9");
}

document.getElementById("challenge10").onclick = function () {
  startChallenge("challenge10");
}

document.getElementById("challenge11").onclick = function () {
    startChallenge("challenge11");
  }

document.getElementById("challenge12").onclick = function () {
  startChallenge("challenge12");
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
    //show one tab during init or they'll all start hidden
    showTab('dimensions')
    showInfTab('preinf')
    showStatsTab('stats')
    showDimTab('antimatterdimensions')
    load_game();
    updateTickSpeed();
    updateAutobuyers();
    updateChallengeTimes()
    
    

}


//Playfab stuff

function playFabLogin(){
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
}

var playFabId = -1
function playFabLoginCallback(data, error){
    if (error){
        console.log(error.errorMessage);
        return;
    }
    if (data){
        //NOTE: SAVE 'playFabId' to a global variable somewhere, I just declare mine at the start of the playfab stuff. Use this variable to tell if your player is logged in to playfab or not.
        playFabId = data.data.PlayFabId;
        console.log("Logged in to playFab")
    }
}

function saveToPlayFab(){
    if (!playFabId || typeof PlayFab === 'undefined' || typeof PlayFab.ClientApi === 'undefined') return false;
    var requestData = {
        TitleId: "5695",
            Data: {
                save: btoa(JSON.stringify(player))
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
        return true;
    }
}

function loadFromPlayFab(){
    if (!playFabId || typeof PlayFab === 'undefined' || typeof PlayFab.ClientApi === 'undefined') return false;
    var requestData = {
        Keys: ["save"],
        PlayFabId: playFabId
    }
    try{
        PlayFab.ClientApi.GetUserData(requestData, loadFromPlayFabCallback);
    }
    catch(e){console.log(e);}
}

function loadFromPlayFabCallback(data, error){
    if (error){
        console.log(error);
        return;
    }
    if (data){
        var id = playFabId;
        loadFromString(data.data.Data.save.value);
    }
}




setInterval(function () {
    save_game();
}, 30000);
updateCosts();
//updateInterval();
updateDimensions();
document.getElementById("hiddenheader").style.display = "none";
init();
var totalMult = Math.pow(player.totalmoney.e+1, 0.5)
var currentMult = Math.pow(player.money.e+1, 0.5)
var infinitiedMult = Math.log10(player.infinitied)*10
var achievementMult = Math.max(Math.pow((player.achievements.length-30), 3)/40,1)
var challengeMult = Decimal.max(10*3000/worstChallengeTime, 1)
var unspentBonus = Decimal.pow(player.infinityPoints.dividedBy(2),1.5).plus(1)
setInterval( function() {
    totalMult = Math.pow(player.totalmoney.e+1, 0.5)
    currentMult = Math.pow(player.money.e+1, 0.5)
    infinitiedMult = Math.log10(player.infinitied)*10
    achievementMult = Math.max(Math.pow((player.achievements.length-30), 3)/40,1)
    challengeMult = Decimal.max(10*3000/worstChallengeTime, 1)
    unspentBonus = Decimal.pow(player.infinityPoints.dividedBy(2),1.5).plus(1)
}, 500)
function resize() {
    c.width = window.innerWidth;
    c.height = 64;
}
resize();
