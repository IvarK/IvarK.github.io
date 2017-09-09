var Marathon = 0;
var player = {
    money: 10,
    tickSpeedCost: 1000,
    tickspeed: 1000,
    firstCost: 10,
    secondCost: 100,
    thirdCost: 10000,
    fourthCost: 1000000,
    fifthCost: 1e9,
    sixthCost: 1e13,
    seventhCost: 1e18,
    eightCost: 1e24,
    firstAmount: 0,
    secondAmount: 0,
    thirdAmount: 0,
    fourthAmount: 0,
    firstBought: 0,
    secondBought: 0,
    thirdBought: 0,
    fourthBought: 0,
    fifthAmount: 0,
    sixthAmount: 0,
    seventhAmount: 0,
    eightAmount: 0,
    fifthBought: 0,
    sixthBought: 0,
    seventhBought: 0,
    eightBought: 0,
    firstPow: 1,
    secondPow: 1,
    thirdPow: 1,
    fourthPow: 1,
    fifthPow: 1,
    sixthPow: 1,
    seventhPow: 1,
    eightPow: 1,
    sacrificed: 0,
    achievements: [],
    infinityUpgrades: [],
    challenges: [],
    currentChallenge: "",
    infinityPoints: 0,
    infinitied: 0,
    totalTimePlayed: 0,
    bestInfinityTime: 9999999999,
    thisInfinityTime: 0,
    resets: 0,
    galaxies: 0,
    tickDecrease: 0.9,
    totalmoney: 0,
    achPow: 1,
    newsArray: [],
    interval: null,
    lastUpdate: new Date().getTime(),
    autobuyers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    chall2Pow: 1,
    chall3Pow: 0.01,
    matter: 0,
    chall11Pow: 1,
    partInfinityPoint: 0,
    options: {
        newsHidden: false,
        notation: "Standard",
        //Standard = normal prefixed numbers, Scientific = standard form, Engineering = powers of 3.
        scientific: false,
        animationsOn: true,
        invert: false,
        logoVisible: true
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
    if (player.options.logoVisible === undefined) player.options.logoVisible = true
	if (player.options.notation === undefined) player.options.notation = "Standard";
    if (player.achievements === undefined) player.achievements = [];
    if (player.sacrificed === undefined) player.sacrificed = 0;
    if (player.infinityUpgrades === undefined) player.infinityUpgrades = [];
    if (player.infinityPoints === undefined) player.infinityPoints = 0;
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
    if (player.matter === undefined) player.matter = 0
    if (player.autobuyers === undefined) player.autobuyers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    if (player.partInfinityPoint === undefined) player.partInfinityPoint = 0
    if (player.secondAmount !== 0) {
        document.getElementById("thirdRow").style.display = "table-row";
        document.getElementById("tickSpeed").style.visibility = "visible";
        document.getElementById("tickSpeedMax").style.visibility = "visible";
        document.getElementById("tickLabel").style.visibility = "visible";
        document.getElementById("tickSpeedAmount").style.visibility = "visible";
    }

    if (player.thirdAmount !== 0) document.getElementById("fourthRow").style.display = "table-row";
    if (player.fourthAmount !== 0)
        if (player.resets > 0) document.getElementById("fifthRow").style.display = "table-row";
    if (player.fifthAmount !== 0)
        if (player.resets > 1) document.getElementById("sixthRow").style.display = "table-row";
    if (player.sixthAmount !== 0)
        if (player.resets > 2 && player.currentChallenge !== "challenge4") document.getElementById("seventhRow").style.display = "table-row";
    if (player.seventhAmount !== 0)
        if (player.resets > 3) document.getElementById("eightRow").style.display = "table-row";
    updateCosts();
    updateTickSpeed();
    updateAchPow();
    updateChallenges();
    loadAutoBuyers();
    updateCheckBoxes();
    updateAutobuyers();
    if (player.currentChallenge == "challenge12" || player.currentChallenge == "challenge9" || player.currentChallenge == "challenge5") document.getElementById("quickReset").style.display = "inline-block";
    else document.getElementById("quickReset").style.display = "none";
 
    document.getElementById("notation").innerHTML = "Notation: " + player.options.notation

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
    setAchieveTooltip();
}

function save_game() {
    set_cookie('dimensionSave', player);
    $.notify("Game saved", "info")
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

var FormatList = ['', 'K', 'M', 'B', 'T', 'Qd', 'Qt', 'Sx', 'Sp', 'Oc', 'No', 'Dc', 'UDc', 'DDc', 'TDc', 'QdDc', 'QtDc', 'SxDc', 'SpDc', 'ODc', 'NDc', 'Vg', 'UVg', 'DVg', 'TVg', 'QdVg', 'QtVg', 'SxVg', 'SpVg', 'OVg', 'NVg', 'Tg', 'UTg', 'DTg', 'TTg', 'QdTg', 'QtTg', 'SxTg', 'SpTg', 'OTg', 'NTg', 'Qa', 'UQa', 'DQa', 'TQa', 'QdQa', 'QtQa', 'SxQa', 'SpQa', 'OQa', 'NQa', 'Qi', 'UQi', 'DQi', 'TQi', 'QaQi', 'QtQi', 'SxQi', 'SpQi', 'OQi', 'NQi', 'Se', 'USe', 'DSe', 'TSe', 'QaSe', 'QtSe', 'SxSe', 'SpSe', 'OSe', 'NSe', 'St', 'USt', 'DSt', 'TSt', 'QaSt', 'QtSt', 'SxSt', 'SpSt', 'OSt', 'NSt', 'Og', 'UOg', 'DOg', 'TOg', 'QdOg', 'QtOg', 'SxOg', 'SpOg', 'OOg', 'NOg', 'Nn', 'UNn', 'DNn', 'TNn', 'QdNn', 'QtNn', 'SxNn', 'SpNn', 'ONn', 'NNn', 'Ce', 'UCe'];

var FormatList = ['', 'K', 'M', 'B', 'T', 'Qd', 'Qt', 'Sx', 'Sp', 'Oc', 'No', 'Dc', 'UDc', 'DDc', 'TDc', 'QdDc', 'QtDc', 'SxDc', 'SpDc', 'ODc', 'NDc', 'Vg', 'UVg', 'DVg', 'TVg', 'QdVg', 'QtVg', 'SxVg', 'SpVg', 'OVg', 'NVg', 'Tg', 'UTg', 'DTg', 'TTg', 'QdTg', 'QtTg', 'SxTg', 'SpTg', 'OTg', 'NTg', 'Qa', 'UQa', 'DQa', 'TQa', 'QdQa', 'QtQa', 'SxQa', 'SpQa', 'OQa', 'NQa', 'Qi', 'UQi', 'DQi', 'TQi', 'QaQi', 'QtQi', 'SxQi', 'SpQi', 'OQi', 'NQi', 'Se', 'USe', 'DSe', 'TSe', 'QaSe', 'QtSe', 'SxSe', 'SpSe', 'OSe', 'NSe', 'St', 'USt', 'DSt', 'TSt', 'QaSt', 'QtSt', 'SxSt', 'SpSt', 'OSt', 'NSt', 'Og', 'UOg', 'DOg', 'TOg', 'QdOg', 'QtOg', 'SxOg', 'SpOg', 'OOg', 'NOg', 'Nn', 'UNn', 'DNn', 'TNn', 'QdNn', 'QtNn', 'SxNn', 'SpNn', 'ONn', 'NNn', 'Ce', 'UCe'];

var letterList1 = ['', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var letterList2 = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

var emojiList1 = ['', '😠', '🎂', '🎄', '💀', '🍆', '👪', '🌈', '💯', '🍦', '🎃', '💋', '😂', '🌙', '⛔', '🐙', '💩', '❓', '☢️', '🙈', '👍', '☂️', '✌️', '⚠️', '❌', '😋', '⚡'];
var emojiList2 = ['😠', '🎂', '🎄', '💀', '🍆', '👪', '🌈', '💯', '🍦', '🎃', '💋', '😂', '🌙', '⛔', '🐙', '💩', '❓', '☢️', '🙈', '👍', '☂️', '✌️', '⚠️', '❌', '😋', '⚡'];


function formatValue(notation, value, places, placesUnder1000) {
    if ((value != Infinity) && (value >= 1000)) {
        var matissa = value / Math.pow(10, Math.floor(Math.log10(value)));
        var power = Math.floor(Math.log10(value));

        if ((notation === "Standard") && (((power - (power % 3)) / 3) <= FormatList.length - 1)) {
            return ((Math.round(matissa * Math.pow(10, power % 3) * Math.pow(10, places)) / Math.pow(10, places)).toFixed(places) + " " + FormatList[(power - (power % 3)) / 3]);
        } else if (notation === "Scientific") {
            return ((Math.round(matissa * Math.pow(10, places)) / Math.pow(10, places)).toFixed(places) + "e" + power);
        } else if (notation === "Engineering") {
            return ((Math.round(matissa * Math.pow(10, power % 3) * Math.pow(10, places)) / Math.pow(10, places)).toFixed(places) + "ᴇ" + (power - (power % 3)));
        } else if (notation === "Letters") {
            power -= 3;
            return ((Math.round(matissa * Math.pow(10, power % 3) * Math.pow(10, places)) / Math.pow(10, places)).toFixed(places) +
                letterList1[Math.floor(((power - (power % 3)) / 3) / letterList2.length)] + letterList2[((power - (power % 3)) / 3) % letterList2.length]);
        } else if (notation === "Emojis") {
            power -= 3;
            return ((Math.round(matissa * Math.pow(10, power % 3) * Math.pow(10, places)) / Math.pow(10, places)).toFixed(places) +
                emojiList1[Math.floor(((power - (power % 3)) / 3) / emojiList2.length)] + emojiList2[((power - (power % 3)) / 3) % emojiList2.length]);
            
            
            } else return ((Math.round(matissa * 100) / 100).toFixed(places) + "e" + power);
    } else if (value < 1000) {
        return ((Math.round(value * Math.pow(10, places)) / Math.pow(10, places))).toFixed(placesUnder1000);    
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
      element.innerHTML = 'You are getting ' + shortenDimensions(calcPerSec(player.firstAmount, player.firstPow, player.infinityUpgrades.includes("18Mult"))*player.chall3Pow) + ' antimatter per second.';
    } else if (player.currentChallenge == "challenge7") {
      element.innerHTML = 'You are getting ' + shortenDimensions(calcPerSec(player.firstAmount, player.firstPow, player.infinityUpgrades.includes("18Mult")) + 
			  calcPerSec(Math.pow(player.secondAmount,1.5), Math.pow(player.secondPow,1.7)*10, player.infinityUpgrades.includes("27Mult"))) + ' antimatter per second.';
    } else {
      element.innerHTML = 'You are getting ' + shortenDimensions(calcPerSec(player.firstAmount, player.firstPow, player.infinityUpgrades.includes("18Mult"))) + ' antimatter per second.';
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

    let multiplier = player[name + 'Pow'];
    if (player.currentChallenge == "challenge7") {
        if (tier == 4) multiplier = Math.pow(multiplier, 1.4)
        if (tier == 2) multiplier = Math.pow(multiplier, 1.7)
    }
    multiplier *= player.achPow;
    
    if (hasInfinityMult(tier)) multiplier *= dimMults();
    if (tier == 1 && player.infinityUpgrades.includes("unspentBonus")) multiplier *= 1+Math.pow(player.infinityPoints/2,1.5);
    multiplier *= timeMult();
    
    return multiplier;
}

function getDimensionDescription(tier) {
    const name = TIER_NAMES[tier];
    
    let description = shortenDimensions(player[name + 'Amount']) + ' (' + player[name + 'Bought'] + ')';
    
    if (tier < 8) {
        description += '  (+' + formatValue(player.options.notation, getDimensionRateOfChange(tier).toFixed(1), 2, 1) + '%/s)';
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
    const current = Math.max(player[name + 'Amount'], 1);
    const change  = toGain * 10 / current;
    
    return change;
}

function getShiftRequirement() {
    let tier   = Math.min(player.resets + 4, 8);
    let amount = 20;
    if (player.currentChallenge == "challenge4") {
        tier = Math.min(player.resets + 4, 6)
        if (tier == 6) amount += (player.resets - 2) * 20;
    }
    if (tier == 8) {
        amount += (player.resets - 4) * 15;
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
        value += getDimensionRateOfChange(tier) / div * Math.pow(t,tier);
    }
    return value
}

function updateDimensions() {
    
    for (let tier = 1; tier <= 8; ++tier) {
        const name = TIER_NAMES[tier];
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
        document.getElementById("tickLabel").innerHTML = 'Reduce the tick interval by ' + Math.round((1 - getTickSpeedMultiplier()) * 100) + '%.';
        
        document.getElementById("tickSpeed").style.visibility = "visible";
        document.getElementById("tickSpeedMax").style.visibility = "visible";
        document.getElementById("tickLabel").style.visibility = "visible";
        document.getElementById("tickSpeedAmount").style.visibility = "visible";
    }
    
    const shiftRequirement = getShiftRequirement();
    document.getElementById("resetLabel").innerHTML = 'Dimension Boost: requires ' + shiftRequirement.amount + " " + DISPLAY_NAMES[shiftRequirement.tier] + " Dimensions";
    
    if (player.currentChallenge == "challenge4" ? player.resets > 2 : player.resets > 3) {
        document.getElementById("softReset").innerHTML = "Reset the game for a Boost";
    } else {
        document.getElementById("softReset").innerHTML = "Reset the game for a new Dimension";
    }

    if (player.currentChallenge != "challenge4") document.getElementById("secondResetLabel").innerHTML = 'Antimatter Galaxies: requires ' + getGalaxyRequirement() + ' Eighth Dimensions';
    else document.getElementById("secondResetLabel").innerHTML = 'Antimatter Galaxies: requires ' + getGalaxyRequirement() + ' Sixth Dimensions';
    document.getElementById("totalmoney").innerHTML = 'You have made a total of ' + shortenMoney(player.totalmoney) + ' antimatter.';
    document.getElementById("totalresets").innerHTML = 'You have done ' + player.resets + ' soft resets.';
    document.getElementById("galaxies").innerHTML = 'You have ' + Math.round(player.galaxies) + ' Antimatter Galaxies.';
    document.getElementById("totalTime").innerHTML = "You have played for " + timeDisplay(player.totalTimePlayed) + ".";

    if (player.bestInfinityTime == 9999999999) {
        document.getElementById("bestInfinity").innerHTML = ""
        document.getElementById("infinitied").innerHTML = ""
        document.getElementById("infinityPoints").innerHTML = ""
        document.getElementById("thisInfinity").innerHTML = ""
    } else {
        document.getElementById("bestInfinity").innerHTML = "Your fastest infinity is in " + timeDisplay(player.bestInfinityTime) + "."
        document.getElementById("thisInfinity").innerHTML = "You have spent " + timeDisplay(player.thisInfinityTime) + " in this infinity."
        document.getElementById("infinityPoints").innerHTML = "You have  " + formatValue(player.options.notation, player.infinityPoints, 2, 0) + " Infinity points."
        document.getElementById("infinitied").innerHTML = "You have infinitied " + player.infinitied + " times."
    }
    document.getElementById("infi11").innerHTML = "Production increase over time <br>Currently: " + (Math.pow(0.5 * player.totalTimePlayed / 600, 0.15)).toFixed(2) + "x<br>Cost: 1 IP"
    document.getElementById("infi12").innerHTML = "First and Eighth Dimension power <br>" + formatValue(player.options.notation, dimMults(), 1, 1) + "x<br>Cost: 1 IP"
    document.getElementById("infi13").innerHTML = "Third and Sixth Dimension power <br>" + formatValue(player.options.notation, dimMults(), 1, 1) + "x<br>Cost: 1 IP"
    document.getElementById("infi22").innerHTML = "Second and seventh Dimension power <br>" + formatValue(player.options.notation, dimMults(), 1, 1) + "x<br>Cost: 1 IP"
    document.getElementById("infi23").innerHTML = "Fourth and Fifth Dimension power <br>" + formatValue(player.options.notation, dimMults(), 1, 1) + "x<br>Cost: 1 IP"
    document.getElementById("infi31").innerHTML = "Production increase over time in current infinity<br>Currently: " + Math.max(Math.pow(player.thisInfinityTime / 2400, 0.25), 1).toFixed(2) + "x<br>Cost: 3 IP"
    document.getElementById("infi32").innerHTML = "Bonus for unspent Infinity Points on 1st Dimension<br>(Currently " + formatValue(player.options.notation, 1+Math.pow(player.infinityPoints/2,1.5), 2, 2) + "x)<br>Cost: 5 IP"
    document.getElementById("infi34").innerHTML = "Infinity Point generation (based on fastest infinity) <br>(Currently 1 every " + timeDisplay(player.bestInfinityTime*10) + ")<br>Cost: 10 IP"
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
    
    document.getElementById("firstMax").innerHTML = 'Until 10, Cost: ' + shortenCosts(player.firstCost * (10 - player.firstBought));
    document.getElementById("secondMax").innerHTML = 'Until 10, Cost: ' + shortenCosts(player.secondCost * (10 - player.secondBought));
    document.getElementById("thirdMax").innerHTML = 'Until 10, Cost: ' + shortenCosts(player.thirdCost * (10 - player.thirdBought));
    document.getElementById("fourthMax").innerHTML = 'Until 10, Cost: ' + shortenCosts(player.fourthCost * (10 - player.fourthBought));
    document.getElementById("fifthMax").innerHTML = 'Until 10, Cost: ' + shortenCosts(player.fifthCost * (10 - player.fifthBought));
    document.getElementById("sixthMax").innerHTML = 'Until 10, Cost: ' + shortenCosts(player.sixthCost * (10 - player.sixthBought));
    document.getElementById("seventhMax").innerHTML = 'Until 10, Cost: ' + shortenCosts(player.seventhCost * (10 - player.seventhBought));
    document.getElementById("eightMax").innerHTML = 'Until 10, Cost: ' + shortenCosts(player.eightCost * (10 - player.eightBought));
    
    document.getElementById("tickSpeed").innerHTML = 'Cost: ' + shortenCosts(player.tickSpeedCost);
}

function updateTickSpeed() {
    var exp = Math.floor(Math.log10(player.tickspeed));
    if (exp > 1) document.getElementById("tickSpeedAmount").innerHTML = 'Tickspeed: ' + Math.round(player.tickspeed);
    else {
        document.getElementById("tickSpeedAmount").innerHTML = 'Tickspeed: ' + Math.round(player.tickspeed * (100 / Math.pow(10, exp))) + ' / ' + shorten(100 / Math.pow(10, exp));
    }
    if (player.tickspeed < 1e-28 && !player.achievements.includes("Faster than a potato")) giveAchievement("Faster than a potato");

    /*	else if (player.tickspeed > 10) document.getElementById("tickSpeedAmount").innerHTML = 'Tickspeed: ' + Math.round(player.tickspeed*10)  + ' / 10';
    	else if (player.tickspeed > 1) document.getElementById("tickSpeedAmount").innerHTML = 'Tickspeed: ' + Math.round(player.tickspeed*100) + ' / 100';
    else if (player.tickspeed > .1) document.getElementById("tickSpeedAmount").innerHTML = 'Tickspeed: ' + Math.round(player.tickspeed*1000) + ' / 1000';
    else document.getElementById("tickSpeedAmount").innerHTML = 'Tickspeed: ' + Math.round(player.tickspeed*10000) + ' / 10000';*/
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







function softReset() {
    player = {
        money: 10,
        tickSpeedCost: 1000,
        tickspeed: 1000,
        firstCost: 10,
        secondCost: 100,
        thirdCost: 10000,
        fourthCost: 1000000,
        fifthCost: 1e9,
        sixthCost: 1e13,
        seventhCost: 1e18,
        eightCost: 1e24,
        firstAmount: 0,
        secondAmount: 0,
        thirdAmount: 0,
        fourthAmount: 0,
        firstBought: 0,
        secondBought: 0,
        thirdBought: 0,
        fourthBought: 0,
        fifthAmount: 0,
        sixthAmount: 0,
        seventhAmount: 0,
        eightAmount: 0,
        fifthBought: 0,
        sixthBought: 0,
        seventhBought: 0,
        eightBought: 0,
        sacrificed: 0,
        achievements: player.achievements,
        challenges: player.challenges,
        currentChallenge: player.currentChallenge,
        infinityUpgrades: player.infinityUpgrades,
        infinityPoints: player.infinityPoints,
        infinitied: player.infinitied,
        totalTimePlayed: player.totalTimePlayed,
        bestInfinityTime: player.bestInfinityTime,
        thisInfinityTime: player.thisInfinityTime,
        firstPow: Math.pow(2, player.resets + 1),
        secondPow: Math.pow(2, player.resets),
        thirdPow: Math.max(Math.pow(2, player.resets - 1), 1),
        fourthPow: Math.max(Math.pow(2, player.resets - 2), 1),
        fifthPow: Math.max(Math.pow(2, player.resets - 3), 1),
        sixthPow: Math.max(Math.pow(2, player.resets - 4), 1),
        seventhPow: Math.max(Math.pow(2, player.resets - 5), 1),
        eightPow: Math.max(Math.pow(2, player.resets - 6), 1),
        resets: player.resets,
        galaxies: player.galaxies,
        tickDecrease: player.tickDecrease,
        totalmoney: player.totalmoney,
        interval: null,
        lastUpdate: player.lastUpdate,
        achPow: player.achPow,
	      newsArray: player.newsArray,
        autobuyers: player.autobuyers,
        chall2Pow: player.chall2Pow,
        chall3Pow: 0.01,
        matter: 0,
        chall11Pow: 1,
        partInfinityPoint: player.partInfinityPoint,
        options: {
            newsHidden: player.newsHidden,
            notation: player.options.notation,
            animationsOn: player.options.animationsOn,
            invert: player.options.invert,
            logoVisible: player.options.logoVisible
        }
    };
    if (player.currentChallenge == "challenge10") {
        player.thirdCost = 100
        player.fourthCost = 500
        player.fifthCost = 2500
        player.sixthCost = 2e4
        player.seventhCost = 2e5
        player.eightCost = 4e6
    }
    if (player.infinityUpgrades.includes("resetMult")) {
        player.firstPow = Math.pow(2.5, player.resets + 1)
        player.secondPow = Math.pow(2.5, player.resets)
        player.thirdPow = Math.max(Math.pow(2.5, player.resets - 1), 1)
        player.fourthPow = Math.max(Math.pow(2.5, player.resets - 2), 1)
        player.fifthPow = Math.max(Math.pow(2.5, player.resets - 3), 1)
        player.sixthPow = Math.max(Math.pow(2.5, player.resets - 4), 1)
        player.seventhPow = Math.max(Math.pow(2.5, player.resets - 5), 1)
        player.eightPow = Math.max(Math.pow(2.5, player.resets - 6), 1)
    }
    if (player.currentChallenge == "challenge11") {
        player.firstPow = 1
        player.secondPow = 1
        player.thirdPow = 1
        player.fourthPow = 1
        player.fifthPow = 1
        player.sixthPow = 1
        player.seventhPow = 1
        player.eightPow = 1
    }
    
    player.resets++;
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

    if (player.challenges.includes("challenge1")) player.money = 100
    
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
    let baseMultiplier = 0.9;
    if (player.currentChallenge == "challenge6") baseMultiplier = 0.93
    let perGalaxy = 0.02;
    
    if (player.infinityUpgrades.includes("galaxyBoost")) {
        perGalaxy += 0.02;
    }
    
    return baseMultiplier - (player.galaxies * perGalaxy);
}

function buyTickSpeed() {
    if (!canBuyTickSpeed()) {
        return false;
    }
    
    if (!canAfford(player.tickSpeedCost)) {
        return false;
    }
    
    player.money -= player.tickSpeedCost;
    if (player.currentChallenge != "challenge5") player.tickSpeedCost *= 10;
    else multiplySameCosts(player.tickSpeedCost)
    if (player.currentChallenge == "challenge2") player.chall2Pow = 0
    player.tickspeed *= getTickSpeedMultiplier();
    
    return true;
}

document.getElementById("tickSpeed").onclick = function () {
    buyTickSpeed();
    
    updateTickSpeed();
    updateMoney();
    updateCosts();
};

function buyMaxTickSpeed() {

    while (buyTickSpeed()) {
        continue;
    }

    updateTickSpeed();
    updateMoney();
    updateCosts();
}

function timeDisplay(time) {
    time = Math.floor(time / 10)
    if (time >= 31536000) {
        return Math.floor(time / 31536000) + " years, " + Math.floor((time % 31536000) / 86400) + " days, " + Math.floor((time % 86400) / 3600) + " hours, " + Math.floor((time % 3600) / 60) + " minutes and " + Math.floor(time % 60) + " seconds"
    } else if (time >= 86400) {
        return Math.floor(time / 86400) + " days, " + Math.floor((time % 86400) / 3600) + " hours, " + Math.floor((time % 3600) / 60) + " minutes and " + Math.floor(time % 60) + " seconds"
    } else if (time >= 3600) {
        return Math.floor(time / 3600) + " hours, " + Math.floor((time % 3600) / 60) + " minutes and " + Math.floor(time % 60) + " seconds"
    } else if (time >= 60) {
        return Math.floor(time / 60) + " minutes and " + Math.floor(time % 60) + " seconds"
    } else return Math.floor(time % 60) + " seconds"
}




function giveAchievement(name) {
    if (player.achievements.includes(name)) {
        return
    }
    
    $.notify(name, "success");
    player.achievements.push(name);
    document.getElementById(name).className = "achievementunlocked"
    kongregate.stats.submit('Achievements', player.achievements.length);

    updateAchPow();
}

const TIER_NAMES = [ null, "first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eight" ];
const DISPLAY_NAMES = [ null, "First", "Second", "Third", "Fourth", "Fifth", "Sixth", "Seventh", "Eighth" ];

function canAfford(cost) {
    return cost < Infinity && cost <= player.money;
}



function multiplySameCosts(cost) {
    const tiers = [ null, "first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eight" ];
    const tierCosts = [ null, 1e3, 1e4, 1e5, 1e6, 1e8, 1e10, 1e12, 1e15 ];
    
    for (let i = 1; i <= 8; ++i) {
        if (Math.log10(player[tiers[i] + "Cost"]) == Math.log10(cost)) player[tiers[i] + "Cost"] *= tierCosts[i]
        
    }
    if (Math.log10(player.tickSpeedCost) == Math.log10(cost)) player.tickSpeedCost *= 10
    }


function canBuyDimension(tier) {
    if (tier == 9 ) {
        if (player.secondAmount == 0) return false
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

    if (player.currentChallenge == "challenge9") dimMult = Math.pow(10/0.30,Math.random())*0.30
    
    if (player.infinityUpgrades.includes('dimMult')) {
        dimMult *= 1.1;
    }
    
    return dimMult;
}


function clearDimensions(amount) {
	const tiers = [ null, "first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eight" ];
    
    for (i = 1; i <= amount; i++) {
        player[tiers[i] + "Amount"] = 0
    }   
}


function getDimensionCostMultiplier(tier) {
    const multiplier = [
        1e3,
        1e4,
        1e5,
        1e6,
        1e8,
        1e10,
        1e12,
        1e15
    ];
	const multiplier2 = [1e3,5e3,1e4,1e4,2e4,2e4,4e4,4e4]
    
    if (player.currentChallenge == "challenge10") return multiplier2[tier - 1];
    else return multiplier[tier - 1];
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
    
    if (tier == 8 && player.eightAmount == 99) {
        giveAchievement("The 9th Dimension is a lie");
    }
    
    updateCosts();
    updateMoney();
    updateDimensions();
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
            if (player[TIER_NAMES[tier-2] + 'Amount'] < cost) return false
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
        player.money -= cost;
    } else {
        player[TIER_NAMES[tier-2] + 'Amount'] -= cost
    }
    
    player[name + 'Amount']++;
    player[name + 'Bought']++;
    
    if (player[name + 'Bought'] === 10) {
        player[name + 'Bought'] = 0;
        player[name + 'Pow']  *= getDimensionPowerMultiplier(tier);
        if (player.currentChallenge != "challenge5" ) player[name + 'Cost'] *= getDimensionCostMultiplier(tier);
        else multiplySameCosts(cost);
    }

    if (player.currentChallenge == "challenge2") player.chall2Pow = 0;
    if (player.currentChallenge == "challenge8") clearDimensions(tier-1)

    onBuyDimension(tier);
    
    return true;
}

function buyManyDimension(tier) {
    const name = TIER_NAMES[tier];
    const cost = player[name + 'Cost'] * (10 - player[name + 'Bought']);
    
    if (player.currentChallenge == "challenge12" && player.matter == 0) player.matter = 1;
    if (player.currentChallenge != "challenge10") {
        if (!canBuyDimension(tier)) {
            return false;
        }
    } else {
        if (tier >= 3) {
            if (player[TIER_NAMES[tier-2] + 'Amount'] < cost) return false
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
        player.money -= cost;
    } else {
        player[TIER_NAMES[tier-2] + 'Amount'] -= cost
    }
    
    player[name + 'Amount'] += 10 - player[name + 'Bought'];
    player[name + 'Bought']  = 0;
    player[name + 'Pow']  *= getDimensionPowerMultiplier(tier);
    if (player.currentChallenge != "challenge5" ) player[name + 'Cost'] *= getDimensionCostMultiplier(tier);
    else multiplySameCosts(player[name + 'Cost']);  
    
    if (player.currentChallenge == "challenge2") player.chall2Pow = 0;
    if (player.currentChallenge == "challenge8") clearDimensions(tier-1)

    onBuyDimension(tier);
    
    return true;
}

document.getElementById("first").onclick = function () {
    if (buyOneDimension(1)) {
        // This achievement is granted only if the buy one button is pressed.
        if (player.firstAmount >= 1e150) {
            giveAchievement("There's no point in doing that");
        }
        if (player.currentChallenge == "challenge12" && player.matter == 0) player.matter = 1;
    }
};



function glowText(id) {
  var text = document.getElementById(id);
  text.style.setProperty("-webkit-animation", "glow 1s");
  text.style.setProperty("animation", "glow 1s");
}



document.getElementById("second").onclick = function () {
    buyOneDimension(2);
    if (player.currentChallenge == "challenge12" && player.matter == 0) player.matter = 1;
};

document.getElementById("third").onclick = function () {
    buyOneDimension(3);
    if (player.currentChallenge == "challenge12" && player.matter == 0) player.matter = 1;
};

document.getElementById("fourth").onclick = function () {
    buyOneDimension(4);
    if (player.currentChallenge == "challenge12" && player.matter == 0) player.matter = 1;
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
    if (player.currentChallenge == "challenge12" && player.matter == 0) player.matter = 1;
};

document.getElementById("secondMax").onclick = function () {
    buyManyDimension(2);
    if (player.currentChallenge == "challenge12" && player.matter == 0) player.matter = 1;
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
  if (player.currentChallenge == "challenge4" && player.resets >= 2) {
    if (player.sixthAmount >= ((player.resets - 1) * 20) - player.infinityUpgrades.includes("resetBoost")*9) softReset();
    document.getElementById("resetLabel").innerHTML = 'Dimension Boost: requires ' + ((player.resets - 1) * 20 - player.infinityUpgrades.includes("resetBoost")*9) + ' Sixth Dimensions'
  } else {
    if (player.resets === 0) {
        if (player.infinityUpgrades.includes("resetBoost") ? player.fourthAmount >= 11 : player.fourthAmount >= 20) {
            softReset();
            document.getElementById("resetLabel").innerHTML = 'Dimension Shift: requires 20 Fifth Dimension';
        }
    } else if (player.resets == 1) {
        if (player.infinityUpgrades.includes("resetBoost") ? player.fifthAmount >= 11 : player.fifthAmount >= 20) {
            softReset();
            if (player.currentChallenge == "challenge4") document.getElementById("resetLabel").innerHTML = 'Dimension Boost: requires 20 Sixth Dimension';
            else document.getElementById("resetLabel").innerHTML = 'Dimension Shift: requires 20 Sixth Dimension';
        }
    } else if (player.resets == 2) {
        if (player.infinityUpgrades.includes("resetBoost") ? player.sixthAmount >= 11 : player.sixthAmount >= 20) {
            softReset();
            document.getElementById("resetLabel").innerHTML = 'Dimension Shift: requires 20 Seventh Dimension';
        }
    } else if (player.resets == 3) {
        if (player.infinityUpgrades.includes("resetBoost") ? player.seventhAmount >= 11 : player.seventhAmount >= 20) {
            softReset();
            document.getElementById("resetLabel").innerHTML = 'Dimension Shift: requires 20 Eighth Dimension';
        }
    } else if (player.resets > 3) {
        if (player.infinityUpgrades.includes("resetBoost") ? player.eightAmount >= (player.resets - 4) * 15 + 11 : player.eightAmount >= (player.resets - 4) * 15 + 20) {
            softReset();
            document.getElementById("resetLabel").innerHTML = 'Dimension Boost: requires ' + (player.resets - 3) * 20 + ' Eighth Dimension';
        }
  } }
};

document.getElementById("maxall").onclick = function () {    
    buyMaxTickSpeed();

    for (let tier = 8; tier >= 1; tier--) {
        while (buyManyDimension(tier)) {
            continue;
        }
    }
};

document.getElementById("animation").onclick = function () {
    if (player.options.animationsOn) {
        player.options.animationsOn = false;
        document.getElementById("logoanimation").src = "animation.png";
    } else {
        player.options.animationsOn = true;
        document.getElementById("logoanimation").src = "animation.gif";
    }
}

document.getElementById("invert").onclick = function () {
    if (player.options.invert) {
        player.options.invert = false;
        document.getElementById("body").classList.remove("invert");
    } else {
        player.options.invert = true;
        document.getElementById("body").classList.add("invert");
    }
}

document.getElementById("logo").onclick = function () {
    if (player.options.logoVisible) {
        player.options.logoVisible = false;
        document.getElementById("logoanimation").style.display = "none";
        document.getElementById("logodiv").style.display = "none";
    } else {
        player.options.logoVisible = true;
        document.getElementById("logoanimation").style.display = "block";
        document.getElementById("logodiv").style.display = "block";
    }
}




function buyInfinityUpgrade(name, cost) {
    if (player.infinityPoints >= cost && !player.infinityUpgrades.includes(name)) {
        player.infinityUpgrades.push(name);
        player.infinityPoints -= cost;
        return true
    } else return false
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

    for (i = amount; i > 0; i--) {
        player.achPow = Math.pow(1.5, amount)
    }

    document.getElementById("achmultlabel").innerHTML = "Current achievement multiplier on each Dimension: " + player.achPow.toFixed(1) + "x"


}



function timeMult() {
    var mult = 1
    if (player.infinityUpgrades.includes("timeMult")) mult *= Math.pow(player.totalTimePlayed / 1200, 0.15);
    if (player.infinityUpgrades.includes("timeMult2")) mult *= Math.max(Math.pow(player.thisInfinityTime / 2400, 0.25), 1);
    return mult;
}

function dimMults() {
    return 1 + (player.infinitied * 0.2)
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

document.getElementById("buyerBtn1").onclick = function () {
    if (player.autobuyers[0].cost <= player.infinityPoints) {
        player.autobuyers[0].interval = Math.max(player.autobuyers[0].interval*0.61, 100)
        player.infinityPoints -= player.autobuyers[0].cost
        player.autobuyers[0].cost *= 2
        updateAutobuyers();
    }
}

document.getElementById("buyerBtn2").onclick = function () {
    if (player.autobuyers[1].cost <= player.infinityPoints) {
        player.autobuyers[1].interval = Math.max(player.autobuyers[1].interval*0.61, 100)
        player.infinityPoints -= player.autobuyers[1].cost
        player.autobuyers[1].cost *= 2
        updateAutobuyers();
    }
}

document.getElementById("buyerBtn3").onclick = function () {
    if (player.autobuyers[2].cost <= player.infinityPoints) {
        player.autobuyers[2].interval = Math.max(player.autobuyers[2].interval*0.61, 100)
        player.infinityPoints -= player.autobuyers[2].cost
        player.autobuyers[2].cost *= 2
        updateAutobuyers();
    }
}

document.getElementById("buyerBtn4").onclick = function () {
    if (player.autobuyers[3].cost <= player.infinityPoints) {
        player.autobuyers[3].interval = Math.max(player.autobuyers[3].interval*0.61, 100)
        player.infinityPoints -= player.autobuyers[3].cost
        player.autobuyers[3].cost *= 2
        updateAutobuyers();
    }
}

document.getElementById("buyerBtn5").onclick = function () {
    if (player.autobuyers[4].cost <= player.infinityPoints) {
        player.autobuyers[4].interval = Math.max(player.autobuyers[4].interval*0.61, 100)
        player.infinityPoints -= player.autobuyers[4].cost
        player.autobuyers[4].cost *= 2
        updateAutobuyers();
    }
}

document.getElementById("buyerBtn6").onclick = function () {
    if (player.autobuyers[5].cost <= player.infinityPoints) {
        player.autobuyers[5].interval = Math.max(player.autobuyers[5].interval*0.61, 100)
        player.infinityPoints -= player.autobuyers[5].cost
        player.autobuyers[5].cost *= 2
        updateAutobuyers();
    }
}

document.getElementById("buyerBtn7").onclick = function () {
    if (player.autobuyers[6].cost <= player.infinityPoints) {
        player.autobuyers[6].interval = Math.max(player.autobuyers[6].interval*0.61, 100)
        player.infinityPoints -= player.autobuyers[6].cost
        player.autobuyers[6].cost *= 2
        updateAutobuyers();
    }
}

document.getElementById("buyerBtn8").onclick = function () {
    if (player.autobuyers[7].cost <= player.infinityPoints) {
        player.autobuyers[7].interval = Math.max(player.autobuyers[7].interval*0.61, 100)
        player.infinityPoints -= player.autobuyers[7].cost
        player.autobuyers[7].cost *= 2
        updateAutobuyers();
    }
}

document.getElementById("buyerBtnTickSpeed").onclick = function () {
    if (player.autobuyers[8].cost <= player.infinityPoints) {
        player.autobuyers[8].interval = Math.max(player.autobuyers[8].interval*0.61, 100)
        player.infinityPoints -= player.autobuyers[8].cost
        player.autobuyers[8].cost *= 2
        updateAutobuyers();
    }
}

document.getElementById("buyerBtnDimBoost").onclick = function () {
    if (player.autobuyers[9].cost <= player.infinityPoints) {
        player.autobuyers[9].interval = Math.max(player.autobuyers[9].interval*0.61, 100)
        player.infinityPoints -= player.autobuyers[9].cost
        player.autobuyers[9].cost *= 2
        updateAutobuyers();
    }
}

document.getElementById("buyerBtnGalaxies").onclick = function () {
    if (player.autobuyers[10].cost <= player.infinityPoints) {
        player.autobuyers[10].interval = Math.max(player.autobuyers[10].interval*0.61, 100)
        player.infinityPoints -= player.autobuyers[10].cost
        player.autobuyers[10].cost *= 2
        updateAutobuyers();
    }
}

document.getElementById("buyerBtnInf").onclick = function () {
    if (player.autobuyers[11].cost <= player.infinityPoints) {
        player.autobuyers[11].interval = Math.max(player.autobuyers[11].interval*0.61, 100)
        player.infinityPoints -= player.autobuyers[11].cost
        player.autobuyers[11].cost *= 2
        updateAutobuyers();
    }
}


document.getElementById("toggleBtn1").onclick = function () {
    if (player.autobuyers[0].target == document.getElementById("first")) {
        player.autobuyers[0].target = document.getElementById("firstMax")
        document.getElementById("toggleBtn1").innerHTML="Buys until 10"
    } else {
        player.autobuyers[0].target = document.getElementById("first")
        document.getElementById("toggleBtn1").innerHTML="Buys singles"
    }
}

document.getElementById("toggleBtn2").onclick = function () {
    if (player.autobuyers[1].target == document.getElementById("second")) {
        player.autobuyers[1].target = document.getElementById("secondMax")
        document.getElementById("toggleBtn2").innerHTML="Buys until 10"
    } else {
        player.autobuyers[1].target = document.getElementById("second")
        document.getElementById("toggleBtn2").innerHTML="Buys singles"
    }
}

document.getElementById("toggleBtn3").onclick = function () {
    if (player.autobuyers[2].target == document.getElementById("third")) {
        player.autobuyers[2].target = document.getElementById("thirdMax")
        document.getElementById("toggleBtn3").innerHTML="Buys until 10"
    } else {
        player.autobuyers[2].target = document.getElementById("third")
        document.getElementById("toggleBtn3").innerHTML="Buys singles"
    }
}

document.getElementById("toggleBtn4").onclick = function () {
    if (player.autobuyers[3].target == document.getElementById("fourth")) {
        player.autobuyers[3].target = document.getElementById("fourthMax")
        document.getElementById("toggleBtn4").innerHTML="Buys until 10"
    } else {
        player.autobuyers[3].target = document.getElementById("fourth")
        document.getElementById("toggleBtn4").innerHTML="Buys singles"
    }
}

document.getElementById("toggleBtn5").onclick = function () {
    if (player.autobuyers[4].target == document.getElementById("fifth")) {
        player.autobuyers[4].target = document.getElementById("fifthMax")
        document.getElementById("toggleBtn5").innerHTML="Buys until 10"
    } else {
        player.autobuyers[4].target = document.getElementById("fifth")
        document.getElementById("toggleBtn5").innerHTML="Buys singles"
    }
}

document.getElementById("toggleBtn6").onclick = function () {
    if (player.autobuyers[5].target == document.getElementById("sixth")) {
        player.autobuyers[5].target = document.getElementById("sixthMax")
        document.getElementById("toggleBtn6").innerHTML="Buys until 10"
    } else {
        player.autobuyers[5].target = document.getElementById("sixth")
        document.getElementById("toggleBtn6").innerHTML="Buys singles"
    }
}

document.getElementById("toggleBtn7").onclick = function () {
    if (player.autobuyers[6].target == document.getElementById("seventh")) {
        player.autobuyers[6].target = document.getElementById("seventhMax")
        document.getElementById("toggleBtn7").innerHTML="Buys until 10"
    } else {
        player.autobuyers[6].target = document.getElementById("seventh")
        document.getElementById("toggleBtn7").innerHTML="Buys singles"
    }
}

document.getElementById("toggleBtn8").onclick = function () {
    if (player.autobuyers[7].target == document.getElementById("eight")) {
        player.autobuyers[7].target = document.getElementById("eightMax")
        document.getElementById("toggleBtn8").innerHTML="Buys until 10"
    } else {
        player.autobuyers[7].target = document.getElementById("eight")
        document.getElementById("toggleBtn8").innerHTML="Buys singles"
    }
}

document.getElementById("toggleBtnTickSpeed").onclick = function () {
    if (player.autobuyers[8].target == document.getElementById("tickSpeed")) {
        player.autobuyers[8].target = document.getElementById("tickSpeedMax")
        document.getElementById("toggleBtnTickSpeed").innerHTML="Buys max"
    } else {
        player.autobuyers[8].target = document.getElementById("tickSpeed")
        document.getElementById("toggleBtnTickSpeed").innerHTML="Buys singles"
    }
}















document.getElementById("secondSoftReset").onclick = function () {
    var bool = player.currentChallenge != "challenge11"
    if (player.currentChallenge == "challenge4" ?
    player.sixthAmount >= (player.galaxies * 90 + 99 - player.infinityUpgrades.includes("resetBoost") * 9) &&bool : player.eightAmount >= (player.galaxies * 60 + 80 - player.infinityUpgrades.includes("resetBoost") * 9) &&bool) {
      if (player.sacrificed == 0) giveAchievement("I don't believe in Gods");
        player = {
            money: 10,
            tickSpeedCost: 1000,
            tickspeed: 1000,
            firstCost: 10,
            secondCost: 100,
            thirdCost: 10000,
            fourthCost: 1000000,
            fifthCost: 1e9,
            sixthCost: 1e13,
            seventhCost: 1e18,
            eightCost: 1e24,
            firstAmount: 0,
            secondAmount: 0,
            thirdAmount: 0,
            fourthAmount: 0,
            firstBought: 0,
            secondBought: 0,
            thirdBought: 0,
            fourthBought: 0,
            fifthAmount: 0,
            sixthAmount: 0,
            seventhAmount: 0,
            eightAmount: 0,
            fifthBought: 0,
            sixthBought: 0,
            seventhBought: 0,
            eightBought: 0,
            firstPow: 1,
            secondPow: 1,
            thirdPow: 1,
            fourthPow: 1,
            fifthPow: 1,
            sixthPow: 1,
            seventhPow: 1,
            eightPow: 1,
            sacrificed: 0,
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
            chall2Pow: player.chall2Pow,
            chall3Pow: 0.01,
            matter: 0,
            chall11Pow: 1,
            partInfinityPoint: player.partInfinityPoint,
            options: {
                newsHidden: player.newsHidden,
                scientific: player.options.scientific,
                notation: player.options.notation,
                animationsOn: player.options.animationsOn,
                invert: player.options.invert,
                logoVisible: player.options.logoVisible
            }
        };
	    if (player.currentChallenge == "challenge10") {
            player.thirdCost = 100
            player.fourthCost = 500
            player.fifthCost = 2500
            player.sixthCost = 2e4
            player.seventhCost = 2e5
            player.eightCost = 4e6
        }
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
        if (player.challenges.includes("challenge1")) player.money = 100

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

function setAchieveTooltip() {
    var apocAchieve = document.getElementById("Antimatter Apocalypse");
    var noPointAchieve = document.getElementById("There's no point in doing that");
    var sanic = document.getElementById("Supersanic")
    var forgotAchieve = document.getElementById("I forgot to nerf that")
    var potato = document.getElementById("Faster than a potato")
    var dimensional = document.getElementById("Multidimensional")

    apocAchieve.setAttribute('ach-tooltip', "Get over " + formatValue(player.options.notation, 1e80, 0, 0) + " antimatter");
    noPointAchieve.setAttribute('ach-tooltip', "Buy a single First Dimension when you have over " + formatValue(player.options.notation, 1e150, 0, 0) + " of them");
    forgotAchieve.setAttribute('ach-tooltip', "Get any Dimension multiplier over " + formatValue(player.options.notation, 1e31, 0, 0));
    sanic.setAttribute('ach-tooltip', "Have antimatter/sec exceed your current antimatter above " + formatValue(player.options.notation, 1e63, 0, 0));
    potato.setAttribute('ach-tooltip', "Get more than " + formatValue(player.options.notation, 1e28, 0, 0) + " ticks per second");
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
    updateDimensions();
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
        player[tiers[i] + "Amount"] = 0
        player[tiers[i] + "Pow"] = 1
    }
    player.firstCost = 10
    player.secondCost = 100
    player.thirdCost = 10000
    player.fourthCost = 1e6
    player.fifthCost = 1e9
    player.sixthCost = 1e13
    player.seventhCost = 1e18
    player.eightCost = 1e24
    player.eightPow = player.chall11Pow
    updateDimensions();
}

function calcSacrificeBoost() {
    if (player.currentChallenge != "challenge11") {
        if (player.firstAmount != 0) return Math.max(Math.pow((Math.log10(player.firstAmount) / 10.0), 2) / Math.max(Math.pow((Math.log10(Math.max(player.sacrificed, 1)) / 10.0), 2), 1), 1);
        else return 1;
    } else {
        if (player.firstAmount != 0) return Math.pow(player.firstAmount, 0.05) / Math.max(Math.pow(player.sacrificed, 0.04), 1)
        else return 1
    }
}


function sacrifice() {
    player.eightPow *= calcSacrificeBoost()
    player.sacrificed += player.firstAmount;
    if (player.currentChallenge != "challenge11") {
        if (player.currentChallenge == "challenge7") clearDimensions(6);
        else clearDimensions(7);
        if (Math.max(Math.pow((Math.log10(Math.max(player.sacrificed, 1)) / 10.0), 2), 2) >= 600) giveAchievement("The Gods are pleased");
    } else {
        player.chall11Pow *= calcSacrificeBoost()
        resetDimensions();
        player.money = 100
        
    }
    updateDimensions();
    updateCosts();

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
    var autoBuyerDim1 = new Autobuyer (document.getElementById("first"))
    var autoBuyerDim2 = new Autobuyer (document.getElementById("second"))
    var autoBuyerDim3 = new Autobuyer (document.getElementById("third"))
    var autoBuyerDim4 = new Autobuyer (document.getElementById("fourth"))
    var autoBuyerDim5 = new Autobuyer (document.getElementById("fifth"))
    var autoBuyerDim6 = new Autobuyer (document.getElementById("sixth"))
    var autoBuyerDim7 = new Autobuyer (document.getElementById("seventh"))
    var autoBuyerDim8 = new Autobuyer (document.getElementById("eight"))
    var autoBuyerDimBoost = new Autobuyer (document.getElementById("softReset"))
    autoBuyerDimBoost.interval = 30000
    var autoBuyerGalaxy = new Autobuyer (document.getElementById("secondSoftReset"))
    autoBuyerGalaxy.interval = 30000
    var autoBuyerTickspeed = new Autobuyer (document.getElementById("tickSpeed"))
    var autoBuyerInf = new Autobuyer (document.getElementById("bigcrunch"))
    autoBuyerInf.interval = 60000
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
    
    document.getElementById("interval1").innerHTML = "Current interval: " + (player.autobuyers[0].interval/1000).toFixed(1) + " seconds";
    document.getElementById("interval2").innerHTML = "Current interval: " + (player.autobuyers[1].interval/1000).toFixed(1) + " seconds";
    document.getElementById("interval3").innerHTML = "Current interval: " + (player.autobuyers[2].interval/1000).toFixed(1) + " seconds";
    document.getElementById("interval4").innerHTML = "Current interval: " + (player.autobuyers[3].interval/1000).toFixed(1) + " seconds";
    document.getElementById("interval5").innerHTML = "Current interval: " + (player.autobuyers[4].interval/1000).toFixed(1) + " seconds";
    document.getElementById("interval6").innerHTML = "Current interval: " + (player.autobuyers[5].interval/1000).toFixed(1) + " seconds";
    document.getElementById("interval7").innerHTML = "Current interval: " + (player.autobuyers[6].interval/1000).toFixed(1) + " seconds";
    document.getElementById("interval8").innerHTML = "Current interval: " + (player.autobuyers[7].interval/1000).toFixed(1) + " seconds";
    document.getElementById("intervalTickSpeed").innerHTML = "Current interval: " + (player.autobuyers[8].interval/1000).toFixed(1) + " seconds";
    document.getElementById("intervalDimBoost").innerHTML = "Current interval: " + (player.autobuyers[9].interval/1000).toFixed(1) + " seconds";
    document.getElementById("intervalGalaxies").innerHTML = "Current interval: " + (player.autobuyers[10].interval/1000).toFixed(1) + " seconds";
    document.getElementById("intervalInf").innerHTML = "Current interval: " + (player.autobuyers[11].interval/1000).toFixed(1) + " seconds";


    if (player.autobuyers[0].interval <= 100) {
        document.getElementById("buyerBtn1").style.display = "none"
    }
    if (player.autobuyers[1].interval <= 100) {
        document.getElementById("buyerBtn2").style.display = "none"
    }
    if (player.autobuyers[2].interval <= 100) {
        document.getElementById("buyerBtn3").style.display = "none"
    }
    if (player.autobuyers[3].interval <= 100) {
        document.getElementById("buyerBtn4").style.display = "none"
    }
    if (player.autobuyers[4].interval <= 100) {
        document.getElementById("buyerBtn5").style.display = "none"
    }
    if (player.autobuyers[5].interval <= 100) {
        document.getElementById("buyerBtn6").style.display = "none"
    }
    if (player.autobuyers[6].interval <= 100) {
        document.getElementById("buyerBtn7").style.display = "none"
    }
    if (player.autobuyers[7].interval <= 100) {
        document.getElementById("buyerBtn8").style.display = "none"
    }
    if (player.autobuyers[8].interval <= 100) {
        document.getElementById("buyerBtnTickSpeed").style.display = "none"
    }
    if (player.autobuyers[9].interval <= 100) {
        document.getElementById("buyerBtnDimBoost").style.display = "none"
    }
    if (player.autobuyers[10].interval <= 100) {
        document.getElementById("buyerBtnGalaxies").style.display = "none"
    }
    if (player.autobuyers[11].interval <= 100) {
        document.getElementById("buyerBtnInf").style.display = "none"
    }



    document.getElementById("buyerBtn1").innerHTML = "39% smaller interval <br>Cost: " + player.autobuyers[0].cost + " points"
    document.getElementById("buyerBtn2").innerHTML = "39% smaller interval <br>Cost: " + player.autobuyers[1].cost + " points"
    document.getElementById("buyerBtn3").innerHTML = "39% smaller interval <br>Cost: " + player.autobuyers[2].cost + " points"
    document.getElementById("buyerBtn4").innerHTML = "39% smaller interval <br>Cost: " + player.autobuyers[3].cost + " points"
    document.getElementById("buyerBtn5").innerHTML = "39% smaller interval <br>Cost: " + player.autobuyers[4].cost + " points"
    document.getElementById("buyerBtn6").innerHTML = "39% smaller interval <br>Cost: " + player.autobuyers[5].cost + " points"
    document.getElementById("buyerBtn7").innerHTML = "39% smaller interval <br>Cost: " + player.autobuyers[6].cost + " points"
    document.getElementById("buyerBtn8").innerHTML = "39% smaller interval <br>Cost: " + player.autobuyers[7].cost + " points"
    document.getElementById("buyerBtnTickSpeed").innerHTML = "39% smaller interval <br>Cost: " + player.autobuyers[8].cost + " points"
    document.getElementById("buyerBtnDimBoost").innerHTML = "39% smaller interval <br>Cost: " + player.autobuyers[9].cost + " points"
    document.getElementById("buyerBtnGalaxies").innerHTML = "39% smaller interval <br>Cost: " + player.autobuyers[10].cost + " points"
    document.getElementById("buyerBtnInf").innerHTML = "39% smaller interval <br>Cost: " + player.autobuyers[11].cost + " points"


    for (var i=0; i<8; i++) {
        if (player.autobuyers[i]%1 !== 0) document.getElementById("autoBuyer"+(i+1)).style.display = "inline-block"
    }
    if (player.autobuyers[8]%1 !== 0) document.getElementById("autoBuyerTickSpeed").style.display = "inline-block"
    if (player.autobuyers[9]%1 !== 0) document.getElementById("autoBuyerDimBoost").style.display = "inline-block"
    if (player.autobuyers[10]%1 !== 0) document.getElementById("autoBuyerGalaxies").style.display = "inline-block"
    if (player.autobuyers[11]%1 !== 0) document.getElementById("autoBuyerInf").style.display = "inline-block"


    if (document.getElementById("1ison").checked) player.autobuyers[0].isOn = true; else player.autobuyers[0].isOn = false
    if (document.getElementById("2ison").checked) player.autobuyers[1].isOn = true; else player.autobuyers[1].isOn = false
    if (document.getElementById("3ison").checked) player.autobuyers[2].isOn = true; else player.autobuyers[2].isOn = false
    if (document.getElementById("4ison").checked) player.autobuyers[3].isOn = true; else player.autobuyers[3].isOn = false
    if (document.getElementById("5ison").checked) player.autobuyers[4].isOn = true; else player.autobuyers[4].isOn = false
    if (document.getElementById("6ison").checked) player.autobuyers[5].isOn = true; else player.autobuyers[5].isOn = false
    if (document.getElementById("7ison").checked) player.autobuyers[6].isOn = true; else player.autobuyers[6].isOn = false
    if (document.getElementById("8ison").checked) player.autobuyers[7].isOn = true; else player.autobuyers[7].isOn = false
    if (document.getElementById("9ison").checked) player.autobuyers[8].isOn = true; else player.autobuyers[8].isOn = false
    if (document.getElementById("10ison").checked) player.autobuyers[9].isOn = true; else player.autobuyers[9].isOn = false
    if (document.getElementById("11ison").checked) player.autobuyers[10].isOn = true; else player.autobuyers[10].isOn = false
    if (document.getElementById("12ison").checked) player.autobuyers[11].isOn = true; else player.autobuyers[11].isOn = false


}

function loadAutoBuyers() {
    const tiers = ["first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eight", "tickSpeed", "softReset", "secondSoftReset", "bigcrunch"];
    for (var i=0; i<12; i++) {
        if (player.autobuyers[i]%1 !== 0 ) {
            player.autobuyers[i].target = document.getElementById(tiers[i])
        }
    }
    
}

function autoBuyerArray() {
    var tempArray = []
    for (var i=0; i<player.autobuyers.length && i<9; i++) {
        if (player.autobuyers[i]%1 !== 0 ) {
            tempArray.push(player.autobuyers[i])
        }
    }
    return tempArray;
}


function priorityOrder() {
    var tempArray = []
    var i = 1;
    while(tempArray.length != autoBuyerArray().length) {
        
        for (var x=0 ; x< autoBuyerArray().length; x++) {
            if (autoBuyerArray()[x].priority == i) tempArray.push(autoBuyerArray()[x])
        }
        i++;
    } 
    return tempArray;
}


function updatePriorities() {
    for (var x=0 ; x < autoBuyerArray().length; x++) {
        if (x < 9) autoBuyerArray()[x].priority = parseInt(document.getElementById("priority" + (x+1)).value)
    }
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







document.getElementById("bigcrunch").onclick = function () {
  if (player.money == Infinity) {
      if (!player.achievements.includes("That's fast!") && player.thisInfinityTime <= 72000) giveAchievement("That's fast!");
      if (!player.achievements.includes("You didn't need it anyway") && player.eightAmount == 0) giveAchievement("You didn't need it anyway");
      if (!player.achievements.includes("Claustrophobic") && player.galaxies == 1) giveAchievement("Claustrophobic");
      if (!player.achievements.includes("Zero Deaths") && player.galaxies == 0 && player.resets == 0) giveAchievement("Zero Deaths")
      if (player.currentChallenge != "" && !player.challenges.includes(player.currentChallenge)) {
      player.challenges.push(player.currentChallenge);
    }
      player = {
          money: 10,
          tickSpeedCost: 1000,
          tickspeed: 1000,
          firstCost: 10,
          secondCost: 100,
          thirdCost: 10000,
          fourthCost: 1000000,
          fifthCost: 1e9,
          sixthCost: 1e13,
          seventhCost: 1e18,
          eightCost: 1e24,
          firstAmount: 0,
          secondAmount: 0,
          thirdAmount: 0,
          fourthAmount: 0,
          firstBought: 0,
          secondBought: 0,
          thirdBought: 0,
          fourthBought: 0,
          fifthAmount: 0,
          sixthAmount: 0,
          seventhAmount: 0,
          eightAmount: 0,
          fifthBought: 0,
          sixthBought: 0,
          seventhBought: 0,
          eightBought: 0,
          firstPow: 1,
          secondPow: 1,
          thirdPow: 1,
          fourthPow: 1,
          fifthPow: 1,
          sixthPow: 1,
          seventhPow: 1,
          eightPow: 1,
          sacrificed: 0,
          achievements: player.achievements,
          challenges: player.challenges,
          currentChallenge: "",
          infinityUpgrades: player.infinityUpgrades,
          infinityPoints: player.infinityPoints + 1,
          infinitied: player.infinitied + 1,
          totalTimePlayed: player.totalTimePlayed,
          bestInfinityTime: Math.min(player.bestInfinityTime, player.thisInfinityTime),
          thisInfinityTime: 0,
          resets: 0,
          galaxies: 0,
          tickDecrease: 0.9,
          totalmoney: 0,
          interval: null,
          lastUpdate: player.lastUpdate,
          achPow: player.achPow,
          autobuyers: player.autobuyers,
          chall2Pow: 1,
          chall3Pow: 0.01,
          newsArray: player.newsArray,
          matter: 0,
          chall11Pow: 1,
          partInfinityPoint: player.partInfinityPoint,
          options: {
              newsHidden: player.newsHidden,
              scientific: player.options.scientific,
              notation: player.options.notation,
              animationsOn: player.options.animationsOn,
              invert: player.options.invert,
              logoVisible: player.options.logoVisible
          }
      };
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
      document.getElementById("matter").style.visibility = "hidden";
      document.getElementById("quickReset").style.display = "none";
      updateTickSpeed();
      showTab("dimensions")
      kongregate.stats.submit('Infinitied', player.infinitied);
      kongregate.stats.submit('Fastest Infinity time', Math.floor(player.bestInfinityTime / 10))
      if (!player.achievements.includes("To infinity!")) giveAchievement("To infinity!");
      if (!player.achievements.includes("That's a lot of infinites") && player.infinitied >= 10) giveAchievement("That's a lot of infinites");
      if (player.infinitied >= 1 && !player.challenges.includes("challenge1")) player.challenges.push("challenge1");
      
      updateAutobuyers();
      if (player.challenges.includes("challenge1")) player.money = 100
    if (player.challenges.length >= 2 && !player.achievements.includes("Daredevil")) giveAchievement("Daredevil");
    if (player.challenges.length == 12 && !player.achievements.includes("AntiChallenged")) giveAchievement("AntiChallenged");

  }
  updateChallenges();
}

function exitChallenge() {
    document.getElementById(player.currentChallenge).innerHTML = "Start"
    startChallenge("");
    updateChallenges();
}

function startChallenge(name) {
  if(name == "" ? true : confirm("You will start over with just your infinity upgrades and achievements. You need to reach infinity with special conditions.")) {
    if (player.currentChallenge != "") document.getElementById(player.currentChallenge).innerHTML = "Start"
    player = {
      money: 10,
      tickSpeedCost: 1000,
      tickspeed: 1000,
      firstCost: 10,
      secondCost: 100,
      thirdCost: 10000,
      fourthCost: 1000000,
      fifthCost: 1e9,
      sixthCost: 1e13,
      seventhCost: 1e18,
      eightCost: 1e24,
      firstAmount: 0,
      secondAmount: 0,
      thirdAmount: 0,
      fourthAmount: 0,
      firstBought: 0,
      secondBought: 0,
      thirdBought: 0,
      fourthBought: 0,
      fifthAmount: 0,
      sixthAmount: 0,
      seventhAmount: 0,
      eightAmount: 0,
      fifthBought: 0,
      sixthBought: 0,
      seventhBought: 0,
      eightBought: 0,
      firstPow: 1,
      secondPow: 1,
      thirdPow: 1,
      fourthPow: 1,
      fifthPow: 1,
      sixthPow: 1,
      seventhPow: 1,
      eightPow: 1,
      sacrificed: 0,
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
      totalmoney: 0,
      interval: null,
      lastUpdate: player.lastUpdate,
      achPow: player.achPow,
      autobuyers: player.autobuyers,
      chall2Pow: 1,
      chall3Pow: 0.01,
      matter: 0,
      newsArray: player.newsArray,
      chall11Pow: 1,
      partInfinityPoint: player.partInfinityPoint,
      options: {
        newsHidden: player.newsHidden,
	    notation: player.options.notation,
        scientific: player.options.scientific,
        animationsOn: player.options.animationsOn,
        invert: player.options.invert,
        logoVisible: player.options.logoVisible
      }
    };
	if (player.currentChallenge == "challenge10") {
        player.thirdCost = 100
        player.fourthCost = 500
        player.fifthCost = 2500
        player.sixthCost = 2e4
        player.seventhCost = 2e5
        player.eightCost = 4e6
    }
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
    if (name == "challenge12") document.getElementById("matter").style.visibility = "visible";
    else document.getElementById("matter").style.visibility = "hidden";
    if (name == "challenge12" || name == "challenge9" || name == "challenge5") document.getElementById("quickReset").style.display = "inline-block";
    else document.getElementById("quickReset").style.visibility = "hidden";
    updateTickSpeed();
    showTab('dimensions');
    updateChallenges();
    if (player.challenges.includes("challenge1")) player.money = 100
    showTab("dimensions")
    kongregate.stats.submit('Infinitied', player.infinitied);
    kongregate.stats.submit('Fastest Infinity time', Math.floor(player.bestInfinityTime / 10))
    
    giveAchievement("To infinity!");
    if (player.infinitied >= 10) giveAchievement("That's a lot of infinites");
  }
  
}

function getDimensionProductionPerSecond(tier) {
    let ret = Math.floor(player[TIER_NAMES[tier] + 'Amount']) * getDimensionFinalMultiplier(tier) / (player.tickspeed / 1000)
    if (player.currentChallenge == "challenge7") {
        if (tier == 4) ret = Math.pow(Math.floor(player[TIER_NAMES[tier] + 'Amount']), 1.3) * getDimensionFinalMultiplier(tier) / (player.tickspeed / 1000)
        else if (tier == 2) ret = Math.pow(Math.floor(player[TIER_NAMES[tier] + 'Amount']), 1.5) * getDimensionFinalMultiplier(tier) / (player.tickspeed / 1000)
    }
    if (player.currentChallenge == "challenge2") ret *= player.chall2Pow
    return ret;
}

function updateETAs() {
    for (let tier = 1; tier <= 8; ++tier) {
        const name = TIER_NAMES[tier] + "Cost";
        document.getElementById("ETADim" + tier).innerHTML = timeDisplay(getETA(name))
    }
    const resetCosts = [1e12,1e17,1e23,1e30]
    if (player.resets<4) document.getElementById("ETAreset1").innerHTML = timeDisplay(getETA(resetCosts[player.resets]))
    else document.getElementById("ETAreset1").innerHTML = timeDisplay(getETA(Math.pow(10,Math.ceiling(player.resets*1.5)*15-31)))
    document.getElementById("ETAreset2").innerHTML = timeDisplay(getETA(Math.pow(10,player.galaxies*90+129)))
    document.getElementById("ETAreset3").innerHTML = timeDisplay(getETA(Number.MAX_VALUE))
}




function calcPerSec(amount, pow, hasMult) {
    if (!hasMult) return Math.floor(amount) * pow * player.achPow * timeMult() * player.chall2Pow / (player.tickspeed / 1000);
    else return Math.floor(amount) * pow * player.achPow * dimMults() * timeMult() * player.chall2Pow / (player.tickspeed / 1000);
}

document.getElementById("quickReset").onclick = function () {
    if (player.resets == 0) player.resets--;
    else player.resets -= 2;
    softReset();
}

var index = 0;

setInterval(function () {
    var thisUpdate = new Date().getTime();
    if (thisUpdate - player.lastUpdate >= 21600000) giveAchievement("Don't you dare to sleep")
    var diff = Math.min(thisUpdate - player.lastUpdate, 21600000);
    diff = diff / 100;
    if (diff < 0) diff = 1;
    player.matter *= Math.pow((1.02 + player.resets/200 + player.galaxies/100), diff)
    if (player.matter > player.money && player.currentChallenge == "challenge12") {
        if (player.resets == 0) player.resets--;
        else player.resets -= 2;
        softReset();
    }
    player.chall3Pow *= Math.pow(1.00038, diff)
    player.chall2Pow = Math.min(player.chall2Pow + diff/1800, 1)

    if (player.infinityUpgrades.includes("passiveGen")) player.partInfinityPoint += diff / player.bestInfinityTime;
    if (player.partInfinityPoint >= 10) {
        player.partInfinityPoint -= 10;
        player.infinityPoints += 1;
    }
    if (player.currentChallenge != "challenge7") {
        for (let tier = 7; tier >= 1; --tier) {
            const name = TIER_NAMES[tier];
            
            player[name + 'Amount'] += getDimensionProductionPerSecond(tier + 1) * diff / 100;
        }
    } else {
        for (let tier = 6; tier >= 1; --tier) {
            const name = TIER_NAMES[tier];
            
            player[name + 'Amount'] += getDimensionProductionPerSecond(tier + 2) * diff / 100;
        }
    }
    
    if (player.money != Infinity) {
      if (player.currentChallenge == "challenge3") {
        player.money += calcPerSec(player.firstAmount, player.firstPow, player.infinityUpgrades.includes("18Mult")) * diff * player.chall3Pow / 10;
        player.totalmoney += calcPerSec(player.firstAmount, player.firstPow, player.infinityUpgrades.includes("18Mult")) * diff * player.chall3Pow / 10;
      } else {
        player.money += calcPerSec(player.firstAmount, player.firstPow, player.infinityUpgrades.includes("18Mult")) * diff / 10;
        player.totalmoney += calcPerSec(player.firstAmount, player.firstPow, player.infinityUpgrades.includes("18Mult")) * diff / 10;
      }
      if (player.currentChallenge == "challenge7") {
          player.money += getDimensionProductionPerSecond(2)
          player.totalmoney += getDimensionProductionPerSecond(2)
      }
    }
    
    player.totalTimePlayed += diff
    player.thisInfinityTime += diff
    if (player.money == Infinity) {
        document.getElementById("bigcrunch").style.display = 'inline-block';
        showTab('emptiness');
    } else document.getElementById("bigcrunch").style.display = 'none';

    updateMoney();
    updateCoinPerSec();
    updateDimensions();
    if (calcPerSec(player.firstAmount, player.firstPow, player.infinityUpgrades.includes("18Mult")) > player.money) {
	if(player.money > Math.pow(10,63) && !player.achievements.includes("Supersanic")) giveAchievement("Supersanic");
	Marathon++;
	if (Marathon >= 300 && !player.achievements.includes("Over in 30 seconds")) giveAchievement("Over in 30 seconds");
    } else {
	Marathon = 0; }

    for (let tier = 1; tier <= 8; ++tier) {
        const name = TIER_NAMES[tier];
        if (player.currentChallenge != "challenge10") {
            document.getElementById(name).className = canAfford(player[name + 'Cost']) ? 'storebtn' : 'unavailablebtn';
            document.getElementById(name + 'Max').className = canAfford(player[name + 'Cost'] * (10 - player[name + 'Bought'])) ? 'storebtn' : 'unavailablebtn';
        } else {
            if (tier >= 3) {
                document.getElementById(name).className = player[TIER_NAMES[tier-2] + 'Amount'] >= player[name + 'Cost'] ? 'storebtn' : 'unavailablebtn';
                document.getElementById(name + 'Max').className = player[TIER_NAMES[tier-2] + 'Amount'] >= player[name + 'Cost'] * (10 - player[name + 'Bought']) ? 'storebtn' : 'unavailablebtn';
            } else {
                document.getElementById(name).className = canAfford(player[name + 'Cost']) ? 'storebtn' : 'unavailablebtn';
                document.getElementById(name + 'Max').className = canAfford(player[name + 'Cost'] * (10 - player[name + 'Bought'])) ? 'storebtn' : 'unavailablebtn';
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
    
    if (player.infinityPoints > 0) {
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
        if (player.infinityUpgrades.includes("45Mult") && player.infinityPoints >= 2) document.getElementById("infi24").className = "infinistorebtn2"
        else document.getElementById("infi24").className = "infinistorebtnlocked"
        if (player.infinityPoints >= 3) document.getElementById("infi31").className = "infinistorebtn3"
        else document.getElementById("infi31").className = "infinistorebtnlocked"
        if (player.infinityUpgrades.includes("timeMult2") && player.infinityPoints >= 5) document.getElementById("infi32").className = "infinistorebtn3"
        else document.getElementById("infi32").className = "infinistorebtnlocked"
        if (player.infinityUpgrades.includes("unspentBonus") && player.infinityPoints >= 7) document.getElementById("infi33").className = "infinistorebtn3"
        else document.getElementById("infi33").className = "infinistorebtnlocked"
        if (player.infinityUpgrades.includes("resetMult") && player.infinityPoints >= 10) document.getElementById("infi34").className = "infinistorebtn3"
        else document.getElementById("infi34").className = "infinistorebtnlocked"
    } else {
        document.getElementById("infinitybtn").style.display = "none";
        document.getElementById("challengesbtn").style.display = "none";
        document.getElementById("infi11").className = "infinistorebtnlocked"
        document.getElementById("infi21").className = "infinistorebtnlocked"
        document.getElementById("infi12").className = "infinistorebtnlocked"
        document.getElementById("infi22").className = "infinistorebtnlocked"
        document.getElementById("infi13").className = "infinistorebtnlocked"
        document.getElementById("infi23").className = "infinistorebtnlocked"
        document.getElementById("infi14").className = "infinistorebtnlocked"
        document.getElementById("infi24").className = "infinistorebtnlocked"
        document.getElementById("infi31").className = "infinistorebtnlocked"
        document.getElementById("infi32").className = "infinistorebtnlocked"
        document.getElementById("infi33").className = "infinistorebtnlocked"
        document.getElementById("infi34").className = "infinistorebtnlocked"
    }

    if (player.resets > 4) {
        document.getElementById("confirmation").style.display = "inline-block";
        document.getElementById("sacrifice").style.display = "inline-block";
    } else {
        document.getElementById("confirmation").style.display = "none";
        document.getElementById("sacrifice").style.display = "none";
    }

    if (player.money == Infinity) {
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

    document.getElementById("progressbar").style.width = (Math.log10(player.money+1) / Math.log10(Number.MAX_VALUE) * 100).toFixed(2) + "%"
    document.getElementById("progressbar").innerHTML = (Math.log10(player.money+1) / Math.log10(Number.MAX_VALUE) * 100).toFixed(2) + "%"





    const shiftRequirement = getShiftRequirement();
    
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


    document.getElementById("sacrifice").setAttribute('ach-tooltip', "Boosts 8th Dimension by " + formatValue(player.options.notation, calcSacrificeBoost(), 2, 2) + "x");

    if (player.firstPow >= 10e30) giveAchievement("I forgot to nerf that")
    if (player.money >= 10e79) giveAchievement("Antimatter Apocalypse")
    if (player.totalTimePlayed >= 10 * 60 * 60 * 24 * 8) giveAchievement("One for each dimension")
    if (player.seventhAmount > 1e12) giveAchievement("Multidimensional");

    if (player.money == Infinity) {
        if (player.autobuyers[11]%1 !== 0) {
            if (player.autobuyers[11].ticks*100 >= player.autobuyers[11].interval) {
                if (player.autobuyers[11].isOn) {
                    player.autobuyers[11].target.click()
                    player.autobuyers[11].ticks = 0;
                } 
            } else player.autobuyers[11].ticks += 1;
        }
    } else {
        if (player.autobuyers[10]%1 !== 0) {
            if (player.autobuyers[10].ticks*100 >= player.autobuyers[10].interval && parseInt(document.getElementById("priority11").value) > player.galaxies) {
                if (player.autobuyers[10].isOn) {
                    player.autobuyers[10].target.click()
                    player.autobuyers[10].ticks = 0;
                } 
            } else player.autobuyers[10].ticks += 1;
        }
        if (player.autobuyers[9]%1 !== 0) {
            if (player.autobuyers[9].ticks*100 >= player.autobuyers[9].interval && !player.infinityUpgrades.includes("resetboost") ? parseInt(document.getElementById("priority10").value) >= ((player.resets - 4) * 15 + 20) : parseInt(document.getElementById("priority10").value) >= ((player.resets - 4) * 15 + 11)) {
                if (player.autobuyers[9].isOn) {
                    player.autobuyers[9].target.click()
                    player.autobuyers[9].ticks = 0;
                } 
            } else player.autobuyers[9].ticks += 1;
        }
        for (var i=0; i<priorityOrder().length; i++) {
            if (priorityOrder()[i].ticks*100 >= priorityOrder()[i].interval) {
                if (priorityOrder()[i].isOn && canBuyDimension(i+1)) {
                    priorityOrder()[i].target.click()
                    priorityOrder()[i].ticks = 0;
                }
            } else priorityOrder()[i].ticks += 1;
        }
    }





    index++;
    player.lastUpdate = thisUpdate;
}, 100);



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
"Doesn't leave, just mutes the server so he doesn't receive notifications", "Most quotes found online are falsely atributed -Abraham Lincoln"]


var conditionalNewsArray = ["Our universe is falling apart. We are all evacuating. This is the last news cast", "THIS NEWS STATION HAS SHUT DOWN DUE TO COLLAPSING UNIVERSE", 
"Researchers have confirmed that there is another dimension to this world. However, only antimatter beings can interact with it", 
"Studies show a massive problem with the time-space continuum. In other words, a large amount of antimatter has dissapeared from the cosmos", 
"Should we call antimatter Matter now? There seems to be more of it."]

var initpos = c.width;
ctx.textBaseline = 'top';
var newsTextValue = Math.round(Math.random() * (newsArray.length - 1))
var newsText = newsArray[newsTextValue];

setInterval(function () {
    //document.getElementById("news").innerHTML = newsArray[Math.round(Math.random() * (newsArray.length - 1))];
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
    load_game();
    updateTickSpeed();
	updateAutobuyers();
    if (!player.options.animationsOn) document.getElementById("logoanimation").src = "animation.png";
    if (player.options.invert) {
        document.getElementById("body").classList.add("invert");
    }
    if (!player.options.logoVisible) {
        document.getElementById("logoanimation").style.display = "none";
        document.getElementById("logodiv").style.display = "none";
    }
    if (player.options.newsHidden) {
        document.getElementById("game").style.display = "none";
    }

    TIER_NAMES.forEach(function(name) {
	var el = document.getElementById(name + "D");
	el.addEventListener('animationEnd', function(){
	el.style.removeProperty("animation");
        el.style.removeProperty("-webkit-animation");
    	}, false);
    });
}


setInterval(function () {
    save_game();
}, 30000);
updateCosts();
//updateInterval();
updateDimensions();
document.getElementById("hiddenheader").style.display = "none";
init();

function resize() {
    c.width = window.innerWidth;
    c.height = 64;
}
resize();
