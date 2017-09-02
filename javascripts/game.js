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
    interval: null,
    lastUpdate: new Date().getTime(),
    chall2Pow: 1,
    chall3Pow: 0.01,
    options: {
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

var defaultStart = player;
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
    expiry = new Date();
    expiry.setTime(new Date().getTime() + (365 * 24 * 60 * 60 * 1000));
    var c_value = escape(btoa(JSON.stringify(value))) +
        "; expires=" + expiry.toUTCString();
    document.cookie = cookie_name + "=" + c_value;
}

function get_cookie(cookie_name) {
    var c_value = document.cookie;
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
    return JSON.parse(c_value);
}

kongregateAPI.loadAPI(function () {
    window.kongregate = kongregateAPI.getAPI();
    // You can now access the Kongregate API with:
    // kongregate.services.getUsername(), etc
    // Proceed with loading your game...
});



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
    if (player.options.logoVisible === undefined) player.options.logoVisible = true;
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
    if (player.chall2Pow === undefined) player.chall2Pow = 1;
    if (player.chall3Pow === undefined) player.chall3Pow = 0.01;
    if (player.firstAmount !== 0) document.getElementById("secondRow").style.display = "table-row";
    if (player.challenges === undefined) player.challenges = []
    if (player.currentChallenge === undefined) player.currentChallenge = ""
	  if (player.infinitied > 0) player.challenges.push("challenge1")
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
        } else {
            return ((Math.round(matissa * 100) / 100).toFixed(places) + "e" + power);
        }
    } else if (value < 1000) {
        return ((Math.round(value * Math.pow(10, places)) / Math.pow(10, places))).toFixed(placesUnder1000);
    } else {
        return "Infinite";
    }
}


function updateMoney() {
    var element = document.getElementById("coinAmount");
    element.innerHTML = formatValue(player.options.notation, player.money, 2, 1);


}

function updateCoinPerSec() {
    var element = document.getElementById("coinsPerSec");
    if (player.currentChallenge == "challenge3") {
      element.innerHTML = 'You are getting ' + shortenDimensions(calcPerSec(player.firstAmount, player.firstPow, player.infinityUpgrades.includes("18Mult"))*player.chall3Pow) + ' antimatter per second.';
    } else {
      element.innerHTML = 'You are getting ' + shortenDimensions(calcPerSec(player.firstAmount, player.firstPow, player.infinityUpgrades.includes("18Mult"))) + ' antimatter per second.';
    }
}




function updateDimensions() {
    document.getElementById("firstAmount").innerHTML = shortenDimensions(player.firstAmount) + ' (' + player.firstBought + ')  (+' + (calcPerSec(player.secondAmount, player.secondPow, player.infinityUpgrades.includes("27Mult")) * 10 / Math.max(player.firstAmount, 1)).toFixed(1) + '%/s)';
    document.getElementById("secondAmount").innerHTML = shortenDimensions(player.secondAmount) + ' (' + player.secondBought + ')  (+' + (calcPerSec(player.thirdAmount, player.thirdPow, player.infinityUpgrades.includes("36Mult")) * 10 / Math.max(player.secondAmount, 1)).toFixed(1) + '%/s)';
    document.getElementById("thirdAmount").innerHTML = shortenDimensions(player.thirdAmount) + ' (' + player.thirdBought + ')  (+' + (calcPerSec(player.fourthAmount, player.fourthPow, player.infinityUpgrades.includes("45Mult")) * 10 / Math.max(player.thirdAmount, 1)).toFixed(1) + '%/s)';
    document.getElementById("fourthAmount").innerHTML = shortenDimensions(player.fourthAmount) + ' (' + player.fourthBought + ')  (+' + (calcPerSec(player.fifthAmount, player.fifthPow, player.infinityUpgrades.includes("45Mult")) * 10 / Math.max(player.fourthAmount, 1)).toFixed(1) + '%/s)';
    document.getElementById("fifthAmount").innerHTML = shortenDimensions(player.fifthAmount) + ' (' + player.fifthBought + ')  (+' + (calcPerSec(player.sixthAmount, player.sixthPow, player.infinityUpgrades.includes("36Mult")) * 10 / Math.max(player.fifthAmount, 1)).toFixed(1) + '%/s)';
    document.getElementById("sixthAmount").innerHTML = shortenDimensions(player.sixthAmount) + ' (' + player.sixthBought + ')  (+' + (calcPerSec(player.seventhAmount, player.seventhPow, player.infinityUpgrades.includes("27Mult")) * 10 / Math.max(player.sixthAmount, 1)).toFixed(1) + '%/s)';
    document.getElementById("seventhAmount").innerHTML = shortenDimensions(player.seventhAmount) + ' (' + player.seventhBought + ')  (+' + (calcPerSec(player.eightAmount, player.eightPow, player.infinityUpgrades.includes("18Mult")) * 10 / Math.max(player.seventhAmount, 1)).toFixed(1) + '%/s)';
    document.getElementById("eightAmount").innerHTML = shortenDimensions(player.eightAmount) + ' (' + player.eightBought + ')';
    if (!player.infinityUpgrades.includes("timeMult")) {
        document.getElementById("firstD").innerHTML = 'First Dimension  ' + 'x' + formatValue(player.options.notation, !player.infinityUpgrades.includes("18Mult") ? player.firstPow * player.achPow : player.firstPow * player.achPow * dimMults(), 1, 0);
        document.getElementById("secondD").innerHTML = 'Second Dimension  ' + 'x' + formatValue(player.options.notation, !player.infinityUpgrades.includes("27Mult") ? player.secondPow * player.achPow : player.secondPow * player.achPow * dimMults(), 1, 0);
        document.getElementById("thirdD").innerHTML = 'Third Dimension  ' + 'x' + formatValue(player.options.notation, !player.infinityUpgrades.includes("36Mult") ? player.thirdPow * player.achPow : player.thirdPow * player.achPow * dimMults(), 1, 0);
        document.getElementById("fourthD").innerHTML = 'Fourth Dimension  ' + 'x' + formatValue(player.options.notation, !player.infinityUpgrades.includes("45Mult") ? player.fourthPow * player.achPow : player.fourthPow * player.achPow * dimMults(), 1, 0);
        document.getElementById("fifthD").innerHTML = 'Fifth Dimension  ' + 'x' + formatValue(player.options.notation, !player.infinityUpgrades.includes("45Mult") ? player.fifthPow * player.achPow : player.fifthPow * player.achPow * dimMults(), 1, 0);
        document.getElementById("sixthD").innerHTML = 'Sixth Dimension  ' + 'x' + formatValue(player.options.notation, !player.infinityUpgrades.includes("36Mult") ? player.sixthPow * player.achPow : player.sixthPow * player.achPow * dimMults(), 1, 0);
        document.getElementById("seventhD").innerHTML = 'Seventh Dimension  ' + 'x' + formatValue(player.options.notation, !player.infinityUpgrades.includes("27Mult") ? player.seventhPow * player.achPow : player.seventhPow * player.achPow * dimMults(), 1, 0);
        document.getElementById("eightD").innerHTML = 'Eighth Dimension  ' + 'x' + formatValue(player.options.notation, !player.infinityUpgrades.includes("18Mult") ? player.eightPow * player.achPow : player.eightPow * player.achPow * dimMults(), 1, 0);
    } else {
        document.getElementById("firstD").innerHTML = 'First Dimension  ' + 'x' + formatValue(player.options.notation, (!player.infinityUpgrades.includes("18Mult") ? player.firstPow * player.achPow : player.firstPow * player.achPow * dimMults()) * timeMult(), 1, 0);
        document.getElementById("secondD").innerHTML = 'Second Dimension  ' + 'x' + formatValue(player.options.notation, (!player.infinityUpgrades.includes("27Mult") ? player.secondPow * player.achPow : player.secondPow * player.achPow * dimMults()) * timeMult(), 1, 0);
        document.getElementById("thirdD").innerHTML = 'Third Dimension  ' + 'x' + formatValue(player.options.notation, (!player.infinityUpgrades.includes("36Mult") ? player.thirdPow * player.achPow : player.thirdPow * player.achPow * dimMults()) * timeMult(), 1, 0);
        document.getElementById("fourthD").innerHTML = 'Fourth Dimension  ' + 'x' + formatValue(player.options.notation, (!player.infinityUpgrades.includes("45Mult") ? player.fourthPow * player.achPow : player.fourthPow * player.achPow * dimMults()) * timeMult(), 1, 0);
        document.getElementById("fifthD").innerHTML = 'Fifth Dimension  ' + 'x' + formatValue(player.options.notation, (!player.infinityUpgrades.includes("45Mult") ? player.fifthPow * player.achPow : player.fifthPow * player.achPow * dimMults()) * timeMult(), 1, 0);
        document.getElementById("sixthD").innerHTML = 'Sixth Dimension  ' + 'x' + formatValue(player.options.notation, (!player.infinityUpgrades.includes("36Mult") ? player.sixthPow * player.achPow : player.sixthPow * player.achPow * dimMults()) * timeMult(), 1, 0);
        document.getElementById("seventhD").innerHTML = 'Seventh Dimension  ' + 'x' + formatValue(player.options.notation, (!player.infinityUpgrades.includes("27Mult") ? player.seventhPow * player.achPow : player.seventhPow * player.achPow * dimMults()) * timeMult(), 1, 0);
        document.getElementById("eightD").innerHTML = 'Eighth Dimension  ' + 'x' + formatValue(player.options.notation, (!player.infinityUpgrades.includes("18Mult") ? player.eightPow * player.achPow : player.eightPow * player.achPow * dimMults()) * timeMult(), 1, 0);
    }
    if (player.infinityUpgrades.includes("galaxyBoost")) document.getElementById("tickLabel").innerHTML = 'Make the game ' + Math.round((1 - (0.9 - (player.galaxies * 0.04))) * 100) + '% faster.';
    else document.getElementById("tickLabel").innerHTML = 'Make the game ' + Math.round((1 - (0.9 - (player.galaxies * 0.02))) * 100) + '% faster.';
            
    if (player.currentChallenge == "challenge4" && player.resets > 1) {
	if (player.fifthAmount !== 0) document.getElementById("sixthRow").style.visibility = "visible";
        document.getElementById("resetLabel").innerHTML = 'Dimension Boost: requires ' + ((player.resets - 1) * 20 - player.infinityUpgrades.includes("resetBoost")*9) + ' Sixth Dimension';
    } else if (player.infinityUpgrades.includes("resetBoost")) {
        if (player.resets > 3) {
            document.getElementById("resetLabel").innerHTML = 'Dimension Boost: requires ' + ((player.resets - 4) * 15 + 11) + ' Eighth Dimension';
            if (player.seventhAmount !== 0) document.getElementById("eightRow").style.visibility = "visible";
        } else if (player.resets > 2) {
            document.getElementById("resetLabel").innerHTML = 'Dimension Shift: requires 11 Seventh Dimension';
            if (player.sixthAmount !== 0) document.getElementById("seventhRow").style.visibility = "visible";
        } else if (player.resets > 1) {
            document.getElementById("resetLabel").innerHTML = 'Dimension Shift: requires 11 Sixth Dimension';
            if (player.fifthAmount !== 0) document.getElementById("sixthRow").style.visibility = "visible";
        } else if (player.resets > 0) {
            document.getElementById("resetLabel").innerHTML = 'Dimension Shift: requires 11 Fifth Dimension';
            if (player.fourthAmount !== 0) document.getElementById("fifthRow").style.visibility = "visible";
        } else document.getElementById("resetLabel").innerHTML = 'Dimension Shift: requires 11 Fourth Dimension';
    } else {
        if (player.resets > 3) {
            document.getElementById("resetLabel").innerHTML = 'Dimension Boost: requires ' + ((player.resets - 4) * 15 + 20) + ' Eighth Dimension';
            if (player.seventhAmount !== 0) document.getElementById("eightRow").style.visibility = "visible";
        } else if (player.resets > 2) {
            document.getElementById("resetLabel").innerHTML = 'Dimension Shift: requires 20 Seventh Dimension';
            if (player.sixthAmount !== 0) document.getElementById("seventhRow").style.visibility = "visible";
        } else if (player.resets > 1) {
            document.getElementById("resetLabel").innerHTML = 'Dimension Shift: requires 20 Sixth Dimension';
            if (player.fifthAmount !== 0) document.getElementById("sixthRow").style.visibility = "visible";
        } else if (player.resets > 0) {
            document.getElementById("resetLabel").innerHTML = 'Dimension Shift: requires 20 Fifth Dimension';
            if (player.fourthAmount !== 0) document.getElementById("fifthRow").style.visibility = "visible";
        } else document.getElementById("resetLabel").innerHTML = 'Dimension Shift: requires 20 Fourth Dimension';
    }
    if (player.currentChallenge == "challenge4" && player.resets > 1) {
        if (player.infinityUpgrades.includes("resetBoost")) document.getElementById("resetLabel").innerHTML = 'Dimension Boost: requires ' + player.resets * 20 - 29 + ' Sixth Dimension';
        else document.getElementById("resetLabel").innerHTML = 'Dimension Boost: requires ' + player.resets * 20 - 20 + ' Sixth Dimension'; 
    }
    if (player.resets > 3 || (player.resets > 1 && player.currentChallenge == "challenge4")) document.getElementById("softReset").innerHTML = "Reset the game for a Boost";
    else document.getElementById("softReset").innerHTML = "Reset the game for a new Dimension";
    if (player.currentChallenge == "challenge4") document.getElementById("secondResetLabel").innerHTML = 'Antimatter Galaxies: requires ' + (player.galaxies * 90 + 130 - player.infinityUpgrades.includes("resetBoost")*9) + ' Sixth Dimensions'
    else document.getElementById("secondResetLabel").innerHTML = player.infinityUpgrades.includes("resetBoost") ? 'Antimatter Galaxies: requires ' + ((player.galaxies * 60 + 80) - 9) + ' Eighth Dimensions' : 'Antimatter Galaxies: requires ' + (player.galaxies * 60 + 80) + ' Eighth Dimensions';
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
        document.getElementById("infinityPoints").innerHTML = "You have  " + player.infinityPoints + " Infinity points."
        document.getElementById("infinitied").innerHTML = "You have infinitied " + player.infinitied + " times."
    }
    document.getElementById("infi11").innerHTML = "Production increase over time <br>currently: " + timeMult().toFixed(2)
    document.getElementById("infi12").innerHTML = "First and Eighth Dimension power <br>" + dimMults().toFixed(2)
    document.getElementById("infi13").innerHTML = "Third and Sixth Dimension power <br>" + dimMults().toFixed(2)
    document.getElementById("infi22").innerHTML = "Second and seventh Dimension power <br>" + dimMults().toFixed(2)
    document.getElementById("infi23").innerHTML = "Fourth and Fifth Dimension power <br>" + dimMults().toFixed(2)
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
    document.getElementById("tickSpeed").innerHTML = 'Cost: ' + shortenCosts(player.tickSpeedCost);
    document.getElementById("firstMax").innerHTML = 'Until 10, Cost: ' + shortenCosts(player.firstCost * (10 - player.firstBought));
    document.getElementById("secondMax").innerHTML = 'Until 10, Cost: ' + shortenCosts(player.secondCost * (10 - player.secondBought));
    document.getElementById("thirdMax").innerHTML = 'Until 10, Cost: ' + shortenCosts(player.thirdCost * (10 - player.thirdBought));
    document.getElementById("fourthMax").innerHTML = 'Until 10, Cost: ' + shortenCosts(player.fourthCost * (10 - player.fourthBought));
    document.getElementById("fifthMax").innerHTML = 'Until 10, Cost: ' + shortenCosts(player.fifthCost * (10 - player.fifthBought));
    document.getElementById("sixthMax").innerHTML = 'Until 10, Cost: ' + shortenCosts(player.sixthCost * (10 - player.sixthBought));
    document.getElementById("seventhMax").innerHTML = 'Until 10, Cost: ' + shortenCosts(player.seventhCost * (10 - player.seventhBought));
    document.getElementById("eightMax").innerHTML = 'Until 10, Cost: ' + shortenCosts(player.eightCost * (10 - player.eightBought));
}

function updateTickSpeed() {
    var exp = Math.floor(Math.log10(player.tickspeed));
    if (exp > 1) document.getElementById("tickSpeedAmount").innerHTML = 'Tickspeed: ' + Math.round(player.tickspeed);
    else {
        document.getElementById("tickSpeedAmount").innerHTML = 'Tickspeed: ' + Math.round(player.tickspeed * (100 / Math.pow(10, exp))) + ' / ' + shorten(100 / Math.pow(10, exp));
    }

    /*	else if (player.tickspeed > 10) document.getElementById("tickSpeedAmount").innerHTML = 'Tickspeed: ' + Math.round(player.tickspeed*10)  + ' / 10';
    	else if (player.tickspeed > 1) document.getElementById("tickSpeedAmount").innerHTML = 'Tickspeed: ' + Math.round(player.tickspeed*100) + ' / 100';
    else if (player.tickspeed > .1) document.getElementById("tickSpeedAmount").innerHTML = 'Tickspeed: ' + Math.round(player.tickspeed*1000) + ' / 1000';
    else document.getElementById("tickSpeedAmount").innerHTML = 'Tickspeed: ' + Math.round(player.tickspeed*10000) + ' / 10000';*/
}


function updateChallenges() {
  
  for (challenge in player.challenges) {
    document.getElementById(player.challenges[challenge]).className = "completedchallengesbtn";
  }
  
  
  if (player.currentChallenge != "") {
    document.getElementById(player.currentChallenge).className = "onchallengebtn"
  }
  
  
  
  
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
        chall2Pow: player.chall2Pow,
        chall3Pow: 0.01,
        options: {
            notation: player.options.notation,
            animationsOn: player.options.animationsOn,
            invert: player.options.invert,
            logoVisible: player.options.logoVisible
        }
    };
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
    if (!player.achievements.includes("Boosting to the max") && player.resets >= 10) giveAchievement("Boosting to the max")
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

document.getElementById("tickSpeed").onclick = function () {
    if (player.money >= player.tickSpeedCost) {
        player.money -= player.tickSpeedCost;
        if (player.infinityUpgrades.includes("galaxyBoost")) player.tickspeed = player.tickspeed * (0.9 - (player.galaxies * 0.04));
        else player.tickspeed = player.tickspeed * (0.9 - (player.galaxies * 0.02));
        player.tickSpeedCost = player.tickSpeedCost * 10;
        document.getElementById("tickSpeed").innerHTML = 'Cost: ' + shortenCosts(player.tickSpeedCost);
        updateTickSpeed();
        updateMoney();
        if (player.currentChallenge == "challenge2") player.chall2Pow = 0
    }
};

function buyMaxTickSpeed() {
    if (player.money >= player.tickSpeedCost) {
        player.money -= player.tickSpeedCost;
        if (player.infinityUpgrades.includes("galaxyBoost")) player.tickspeed = player.tickspeed * (0.9 - (player.galaxies * 0.04));
        else player.tickspeed = player.tickspeed * (0.9 - (player.galaxies * 0.02));
        player.tickSpeedCost = player.tickSpeedCost * 10;
        document.getElementById("tickSpeed").innerHTML = 'Cost: ' + shortenCosts(player.tickSpeedCost);
        updateTickSpeed();
        updateMoney();
        if (player.currentChallenge == "challenge2") player.chall2Pow = 0
        buyMaxTickSpeed();
    }
}

function timeDisplay(time) {
    time = Math.floor(time / 10)
    if (time >= 31536000) {
        return Math.floor(time / 31536000) + " years, " + Math.round((time % 31536000) / 86400) + " days, " + Math.round((time % 86400) / 3600) + " hours, " + Math.round((time % 3600) / 60) + " minutes and " + Math.round(time % 60) + " seconds"
    } else if (time >= 86400) {
        return Math.floor(time / 86400) + " days, " + Math.round((time % 86400) / 3600) + " hours, " + Math.round((time % 3600) / 60) + " minutes and " + Math.round(time % 60) + " seconds"
    } else if (time >= 3600) {
        return Math.floor(time / 3600) + " hours, " + Math.round((time % 3600) / 60) + " minutes and " + Math.round(time % 60) + " seconds"
    } else if (time >= 60) {
        return Math.floor(time / 60) + " minutes and " + Math.round(time % 60) + " seconds"
    } else return Math.floor(time % 60) + " seconds"
}




function giveAchievement(name) {
    $.notify(name, "success");
    player.achievements.push(name);
    document.getElementById(name).className = "achievementunlocked"
    kongregate.stats.submit('Achievements', player.achievements.length);

    updateAchPow();
    document.getElementById("")

}

function doubleAllDimensionCosts() {
    const tiers = [ null, "first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eight" ];
	
    for (let i = 1; i <= 8; ++i) {
        player[tiers[i] + "Cost"] *= 2;
    }
}

document.getElementById("first").onclick = function () {
    if (player.money >= player.firstCost) {
        player.firstAmount++;
        player.money -= player.firstCost;
        if (player.firstBought == 9) {
            player.firstBought = 0;
            if (player.infinityUpgrades.includes('dimMult')) player.firstPow *= 2.2;
            else player.firstPow *= 2;
            player.firstCost = player.firstCost * 1000;
            if (player.currentChallenge === "doubling cost") {
                doubleAllDimensionCosts()
            }
        } else player.firstBought++;
        updateCoinPerSec();
        var element = document.getElementById("first");
        element.innerHTML = 'Cost: ' + shortenCosts(player.firstCost);
        updateCosts();
        updateMoney();
        updateDimensions();
        document.getElementById("secondRow").style.display = "table-row";
        if (!player.achievements.includes("You gotta start somewhere")) {
            giveAchievement("You gotta start somewhere")
        }
        if (player.currentChallenge == "challenge2") player.chall2Pow = 0
        if (!player.achievements.includes("There's no point in doing that") && player.firstAmount >= 1e150) giveAchievement("There's no point in doing that");
    }
};

document.getElementById("second").onclick = function () {
    if (player.money >= player.secondCost) {
        player.secondAmount++;
        player.money -= player.secondCost;
        if (player.secondBought == 9) {
            player.secondBought = 0;
            if (player.infinityUpgrades.includes('dimMult')) player.secondPow *= 2.2;
            else player.secondPow *= 2;
            player.secondCost = player.secondCost * 10000;
            if (player.currentChallenge === "doubling cost") {
                doubleAllDimensionCosts()
            }
        } else player.secondBought++;
        updateCoinPerSec();
        var element = document.getElementById("second");
        element.innerHTML = 'Cost: ' + shortenCosts(player.secondCost);
        updateCosts();
        updateMoney();
        updateDimensions();
        document.getElementById("thirdRow").style.display = "table-row";
        document.getElementById("tickSpeed").style.visibility = "visible";
        document.getElementById("tickSpeedMax").style.visibility = "visible";
        document.getElementById("tickLabel").style.visibility = "visible";
        document.getElementById("tickSpeedAmount").style.visibility = "visible";
        if (!player.achievements.includes("100 antimatter is a lot")) {
            giveAchievement("100 antimatter is a lot")
        }
        if (player.currentChallenge == "challenge2") player.chall2Pow = 0
    }
};

document.getElementById("third").onclick = function () {
    if (player.money >= player.thirdCost) {
        player.thirdAmount++;
        player.money -= player.thirdCost;
        if (player.thirdBought == 9) {
            player.thirdBought = 0;
            if (player.infinityUpgrades.includes('dimMult')) player.thirdPow *= 2.2;
            else player.thirdPow *= 2;
            player.thirdCost = player.thirdCost * 100000;
            if (player.currentChallenge === "doubling cost") {
                doubleAllDimensionCosts()
            }
        } else player.thirdBought++;
        updateCoinPerSec();
        var element = document.getElementById("third");
        element.innerHTML = 'Cost: ' + shortenCosts(player.thirdCost);
        updateCosts();
        updateMoney();
        updateDimensions();
        document.getElementById("fourthRow").style.display = "table-row";
        if (!player.achievements.includes("Half life 3 confirmed")) {
            giveAchievement("Half life 3 confirmed")
        }
        if (player.currentChallenge == "challenge2") player.chall2Pow = 0
    }
};

document.getElementById("fourth").onclick = function () {
    if (player.money >= player.fourthCost) {
        player.fourthAmount++;
        player.money -= player.fourthCost;
        if (player.fourthBought == 9) {
            player.fourthBought = 0;
            if (player.infinityUpgrades.includes('dimMult')) player.fourthPow *= 2.2;
            else player.fourthPow *= 2;
            player.fourthCost = player.fourthCost * 1000000;
            if (player.currentChallenge === "doubling cost") {
                doubleAllDimensionCosts()
            }
        } else player.fourthBought++;
        updateCoinPerSec();
        var element = document.getElementById("fourth");
        element.innerHTML = 'Cost: ' + shortenCosts(player.fourthCost);
        updateCosts();
        updateMoney();
        updateDimensions();
        if (player.resets > 0) document.getElementById("fifthRow").style.display = "table-row";
        if (!player.achievements.includes("L4D: Left 4 Dimensions")) {
            giveAchievement("L4D: Left 4 Dimensions")
        }
        if (player.currentChallenge == "challenge2") player.chall2Pow = 0
    }
};

document.getElementById("fifth").onclick = function () {
    if (player.money >= player.fifthCost) {
        player.fifthAmount++;
        player.money -= player.fifthCost;
        if (player.fifthBought == 9) {
            player.fifthBought = 0;
            if (player.infinityUpgrades.includes('dimMult')) player.fifthPow *= 2.2;
            else player.fifthPow *= 2;
            player.fifthCost = player.fifthCost * 1e8;
            if (player.currentChallenge === "doubling cost") {
                doubleAllDimensionCosts()
            }
        } else player.fifthBought++;
        updateCoinPerSec();
        var element = document.getElementById("fifth");
        element.innerHTML = 'Cost: ' + shortenCosts(player.fifthCost);
        updateCosts();
        updateMoney();
        updateDimensions();
        if (player.resets > 1) document.getElementById("sixthRow").style.display = "table-row";
        if (!player.achievements.includes("5 Dimension Antimatter Punch")) {
            giveAchievement("5 Dimension Antimatter Punch")
        }
        if (player.currentChallenge == "challenge2") player.chall2Pow = 0
    }
};

document.getElementById("sixth").onclick = function () {
    if (player.money >= player.sixthCost) {
        player.sixthAmount++;
        player.money -= player.sixthCost;
        if (player.sixthBought == 9) {
            player.sixthBought = 0;
            if (player.infinityUpgrades.includes('dimMult')) player.sixthPow *= 2.2;
            else player.sixthPow *= 2;
            player.sixthCost = player.sixthCost * 1e10;
            if (player.currentChallenge === "doubling cost") {
                doubleAllDimensionCosts()
            }
        } else player.sixthBought++;
        updateCoinPerSec();
        var element = document.getElementById("sixth");
        element.innerHTML = 'Cost: ' + shortenCosts(player.sixthCost);
        updateCosts();
        updateMoney();
        updateDimensions();
        if (player.resets > 2 && player.currentChallenge !== "challenge4") document.getElementById("seventhRow").style.display = "table-row";
        if (!player.achievements.includes("We couldn't afford 9")) {
            giveAchievement("We couldn't afford 9")
        }
        if (player.currentChallenge == "challenge2") player.chall2Pow = 0
    }
};

document.getElementById("seventh").onclick = function () {
    if (player.money >= player.seventhCost) {
        player.seventhAmount++;
        player.money -= player.seventhCost;
        if (player.seventhBought == 9) {
            player.seventhBought = 0;
            if (player.infinityUpgrades.includes('dimMult')) player.seventhPow *= 2.2;
            else player.seventhPow *= 2;
            player.seventhCost = player.seventhCost * 1e12;
            if (player.currentChallenge === "doubling cost") {
                doubleAllDimensionCosts()
            }
        } else player.seventhBought++;
        updateCoinPerSec();
        var element = document.getElementById("seventh");
        element.innerHTML = 'Cost: ' + shortenCosts(player.seventhCost);
        updateCosts();
        updateMoney();
        updateDimensions();
        if (player.resets > 3) document.getElementById("eightRow").style.display = "table-row";
        if (!player.achievements.includes("Not a luck related achievement")) {
            giveAchievement("Not a luck related achievement")
        }
        if (player.currentChallenge == "challenge2") player.chall2Pow = 0
    }
};

document.getElementById("eight").onclick = function () {
    if (player.money >= player.eightCost) {
        player.eightAmount++;
        player.money -= player.eightCost;
        if (player.eightBought == 9) {
            player.eightBought = 0;
            if (player.infinityUpgrades.includes('dimMult')) player.eightPow *= 2.2;
            else player.eightPow *= 2;
            player.eightCost = player.eightCost * 1e15;
            if (player.currentChallenge === "doubling cost") {
                doubleAllDimensionCosts()
            }
        } else player.eightBought++;
        updateCoinPerSec();
        var element = document.getElementById("eight");
        element.innerHTML = 'Cost: ' + shortenCosts(player.eightCost);
        updateCosts();
        updateMoney();
        updateDimensions();
        if (!player.achievements.includes("90 degrees to infinity")) {
            giveAchievement("90 degrees to infinity")
        }
        if (player.currentChallenge == "challenge2") player.chall2Pow = 0
        if (!player.achievements.includes("The 9th Dimension is a lie") && player.eightAmount == 99) giveAchivement("The 9th Dimension is a lie")
    }
};

document.getElementById("firstMax").onclick = function () {
    if (player.money >= player.firstCost * (10 - player.firstBought)) {
        player.firstAmount += (10 - player.firstBought);
        player.money -= player.firstCost * (10 - player.firstBought);
        player.firstBought = 0;
        if (player.infinityUpgrades.includes('dimMult')) player.firstPow *= 2.2;
        else player.firstPow *= 2;
        player.firstCost *= 1e3;
        if (player.currentChallenge === "doubling cost") {
            doubleAllDimensionCosts()
        }
        updateCosts();
        updateMoney();
        updateDimensions();
        document.getElementById("secondRow").style.display = "table-row";
        if (!player.achievements.includes("You gotta start somewhere")) {
            giveAchievement("You gotta start somewhere")
        }
        if (player.currentChallenge == "challenge2") player.chall2Pow = 0
    }
};

document.getElementById("secondMax").onclick = function () {
    if (player.money >= player.secondCost * (10 - player.secondBought)) {
        player.secondAmount += (10 - player.secondBought);
        player.money -= player.secondCost * (10 - player.secondBought);
        player.secondBought = 0;
        if (player.infinityUpgrades.includes('dimMult')) player.secondPow *= 2.2;
        else player.secondPow *= 2;
        player.secondCost *= 1e4;
        if (player.currentChallenge === "doubling cost") {
            doubleAllDimensionCosts()
        }
        updateCosts();
        updateMoney();
        updateDimensions();
        document.getElementById("thirdRow").style.display = "table-row";
        document.getElementById("tickSpeed").style.visibility = "visible";
        document.getElementById("tickSpeedMax").style.visibility = "visible";
        document.getElementById("tickLabel").style.visibility = "visible";
        document.getElementById("tickSpeedAmount").style.visibility = "visible";
        if (!player.achievements.includes("100 antimatter is a lot")) {
            giveAchievement("100 antimatter is a lot")
        }
        if (player.currentChallenge == "challenge2") player.chall2Pow = 0
    }
};

document.getElementById("thirdMax").onclick = function () {
    if (player.money >= player.thirdCost * (10 - player.thirdBought)) {
        player.thirdAmount += (10 - player.thirdBought);
        player.money -= player.thirdCost * (10 - player.thirdBought);
        player.thirdBought = 0;
        if (player.infinityUpgrades.includes('dimMult')) player.thirdPow *= 2.2;
        else player.thirdPow *= 2;
        player.thirdCost *= 1e5;
        if (player.currentChallenge === "doubling cost") {
            doubleAllDimensionCosts()
        }
        updateCosts();
        updateMoney();
        updateDimensions();
        document.getElementById("fourthRow").style.display = "table-row";
        if (!player.achievements.includes("Half life 3 confirmed")) {
            giveAchievement("Half life 3 confirmed")
        }
        if (player.currentChallenge == "challenge2") player.chall2Pow = 0
    }
};

document.getElementById("fourthMax").onclick = function () {
    if (player.money >= player.fourthCost * (10 - player.fourthBought)) {
        player.fourthAmount += (10 - player.fourthBought);
        player.money -= player.fourthCost * (10 - player.fourthBought);
        player.fourthBought = 0;
        if (player.infinityUpgrades.includes('dimMult')) player.fourthPow *= 2.2;
        else player.fourthPow *= 2;
        player.fourthCost *= 1e6;
        if (player.currentChallenge === "doubling cost") {
            doubleAllDimensionCosts()
        }
        updateCosts();
        updateMoney();
        updateDimensions();
        if (player.resets > 0) document.getElementById("fifthRow").style.display = "table-row";
        if (!player.achievements.includes("L4D: Left 4 Dimensions")) {
            giveAchievement("L4D: Left 4 Dimensions")
        }
        if (player.currentChallenge == "challenge2") player.chall2Pow = 0
    }
};

document.getElementById("fifthMax").onclick = function () {
    if (player.money >= player.fifthCost * (10 - player.fifthBought)) {
        player.fifthAmount += (10 - player.fifthBought);
        player.money -= player.fifthCost * (10 - player.fifthBought);
        player.fifthBought = 0;
        if (player.infinityUpgrades.includes('dimMult')) player.fifthPow *= 2.2;
        else player.fifthPow *= 2;
        player.fifthCost *= 1e8;
        if (player.currentChallenge === "doubling cost") {
            doubleAllDimensionCosts()
        }
        updateCosts();
        updateMoney();
        updateDimensions();
        if (player.resets > 1) document.getElementById("sixthRow").style.display = "table-row";
        if (!player.achievements.includes("5 Dimension Antimatter Punch")) {
            giveAchievement("5 Dimension Antimatter Punch")
        }
        if (player.currentChallenge == "challenge2") player.chall2Pow = 0
    }
};

document.getElementById("sixthMax").onclick = function () {
    if (player.money >= player.sixthCost * (10 - player.sixthBought)) {
        player.sixthAmount += (10 - player.sixthBought);
        player.money -= player.sixthCost * (10 - player.sixthBought);
        player.sixthBought = 0;
        if (player.infinityUpgrades.includes('dimMult')) player.sixthPow *= 2.2;
        else player.sixthPow *= 2;
        player.sixthCost *= 1e10;
        if (player.currentChallenge === "doubling cost") {
            doubleAllDimensionCosts()
        }
        updateCosts();
        updateMoney();
        updateDimensions();
        if (player.resets > 2 && player.currentChallenge !== "challenge4") document.getElementById("seventhRow").style.display = "table-row";
        if (!player.achievements.includes("We couldn't afford 9")) {
            giveAchievement("We couldn't afford 9")
        }
        if (player.currentChallenge == "challenge2") player.chall2Pow = 0
    }
};

document.getElementById("seventhMax").onclick = function () {
    if (player.money >= player.seventhCost * (10 - player.seventhBought)) {
        player.seventhAmount += (10 - player.seventhBought);
        player.money -= player.seventhCost * (10 - player.seventhBought);
        player.seventhBought = 0;
        if (player.infinityUpgrades.includes('dimMult')) player.seventhPow *= 2.2;
        else player.seventhPow *= 2;
        player.seventhCost *= 1e12;
        if (player.currentChallenge === "doubling cost") {
            doubleAllDimensionCosts()
        }
        updateCosts();
        updateMoney();
        updateDimensions();
        if (player.resets > 3) document.getElementById("eightRow").style.display = "table-row";
        if (!player.achievements.includes("Not a luck related achievement")) {
            giveAchievement("Not a luck related achievement")
        }
        if (player.currentChallenge == "challenge2") player.chall2Pow = 0
    }
};

document.getElementById("eightMax").onclick = function () {
    if (player.money >= player.eightCost * (10 - player.eightBought)) {
        player.eightAmount += (10 - player.eightBought);
        player.money -= player.eightCost * (10 - player.eightBought);
        player.eightBought = 0;
        if (player.infinityUpgrades.includes('dimMult')) player.eightPow *= 2.2;
        else player.eightPow *= 2;
        player.eightCost *= 1e15;
        if (player.currentChallenge === "doubling cost") {
            doubleAllDimensionCosts()
        }
        updateCosts();
        updateMoney();
        updateDimensions();
        if (!player.achievements.includes("90 degrees to infinity")) {
            giveAchievement("90 degrees to infinity")
        }
        if (player.currentChallenge == "challenge2") player.chall2Pow = 0
    }
};

document.getElementById("softReset").onclick = function () {
  if (player.currentChallenge == "challenge4" && player.resets >= 2) {
    if (player.sixthAmount >= (player.resets - 1) * 20 - player.infinityUpgrades.includes("resetBoost")*9) softReset();
    document.getElementById("resetLabel").innerHTML = 'Dimension Boost: requires ' + player.resets * 20 + ' Sixth Dimension'
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

function maxAll() {
    buyMaxTickSpeed();
    if (player.money >= player.eightCost * (10 - player.eightBought) && player.resets > 3) {
        document.getElementById("eightMax").click();
        maxAll();
    } else if (player.money >= player.seventhCost * (10 - player.seventhBought) && player.resets > 2) {
        document.getElementById("seventhMax").click();
        maxAll();
    } else if (player.money >= player.sixthCost * (10 - player.sixthBought) && player.resets > 1) {
        document.getElementById("sixthMax").click();
        maxAll();
    } else if (player.money >= player.fifthCost * (10 - player.fifthBought) && player.resets > 0) {
        document.getElementById("fifthMax").click();
        maxAll();
    } else if (player.money >= player.fourthCost * (10 - player.fourthBought)) {
        document.getElementById("fourthMax").click();
        maxAll();
    } else if (player.money >= player.thirdCost * (10 - player.thirdBought)) {
        document.getElementById("thirdMax").click();
        maxAll();
    } else if (player.money >= player.secondCost * (10 - player.secondBought)) {
        document.getElementById("secondMax").click();
        maxAll();
    } else if (player.money >= player.firstCost * (10 - player.firstBought)) {
        document.getElementById("firstMax").click();
        maxAll();
    }

}

document.getElementById("maxall").onclick = function () {
    maxAll();
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




function buyInfinityUpgrade(name) {
    if (player.infinityPoints >= 1 && !player.infinityUpgrades.includes(name)) {
        player.infinityUpgrades.push(name);
        player.infinityPoints -= 1;
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


    for (i = amount; i > 0; i--) {
        player.achPow = Math.pow(1.5, amount)
    }

    document.getElementById("achmultlabel").innerHTML = "Current achievement multiplier on each Dimension: " + player.achPow.toFixed(1) + "x"


}



function timeMult() {
    return Math.pow(0.5 * player.totalTimePlayed / 600, 0.15)
}

function dimMults() {
    return 1 + (player.infinitied * 0.2)
}



document.getElementById("infi11").onclick = function () {
    buyInfinityUpgrade("timeMult");
}

document.getElementById("infi21").onclick = function () {
    buyInfinityUpgrade("dimMult");
}

document.getElementById("infi12").onclick = function () {
    if (player.infinityUpgrades.includes("timeMult")) buyInfinityUpgrade("18Mult");
}

document.getElementById("infi22").onclick = function () {
    if (player.infinityUpgrades.includes("dimMult")) buyInfinityUpgrade("27Mult");
}

document.getElementById("infi13").onclick = function () {
    if (player.infinityUpgrades.includes("18Mult")) buyInfinityUpgrade("36Mult");
}
document.getElementById("infi23").onclick = function () {
    if (player.infinityUpgrades.includes("27Mult")) buyInfinityUpgrade("45Mult");
}

document.getElementById("infi14").onclick = function () {
    if (player.infinityUpgrades.includes("36Mult")) buyInfinityUpgrade("resetBoost");
}

document.getElementById("infi24").onclick = function () {
    if (player.infinityUpgrades.includes("45Mult")) buyInfinityUpgrade("galaxyBoost");
}




document.getElementById("secondSoftReset").onclick = function () {
    if (player.currentChallenge == "challenge4" ?
    player.sixthAmount >= (player.galaxies * 90 + 130 - player.infinityUpgrades.includes("resetBoost") * 9) : player.eightAmount >= (player.galaxies * 60 + 80 - player.infinityUpgrades.includes("resetBoost") * 9)) {
      if (!player.achievements.includes("I don't believe in Gods") && player.sacrificed == 0) giveAchievement("I don't believe in Gods");
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
            chall2Pow: player.chall2Pow,
            chall3Pow: 0.01,
            options: {
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
        updateTickSpeed();
        if (!player.achievements.includes("Double Galaxy") && player.galaxies >= 2) giveAchievement("Double Galaxy");
        if (!player.achievements.includes("You got past The Big Wall") && player.galaxies >= 1) giveAchievement("You got past The Big Wall");
    }
};

document.getElementById("exportbtn").onclick = function () {
    prompt("Save this somewhere.", btoa(JSON.stringify(player)));
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
    save_data = JSON.parse(atob(save_data));
    if (!save_data || !verify_save(save_data)) {
        alert('could not load the save..');
        load_custom_game();
        return;
    }
    player = save_data;
    save_game();
    load_game();
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
    }
};

function setAchieveTooltip() {
    var apocAchieve = document.getElementById("Antimatter Apocalypse");
    var noPointAchieve = document.getElementById("There's no point in doing that");

    var forgotAchieve = document.getElementById("I forgot to nerf that")

    apocAchieve.setAttribute('ach-tooltip', "Get over " + formatValue(player.options.notation, 1e80, 0, 0) + " antimatter");
    noPointAchieve.setAttribute('ach-tooltip', "Buy a single First Dimension when you have over " + formatValue(player.options.notation, 1e150, 0, 0) + " of them");
    forgotAchieve.setAttribute('ach-tooltip', "Get any Dimension multiplier over " + formatValue(player.options.notation, 1e31, 0, 0));

}

document.getElementById("notation").onclick = function () {
    player.options.scientific = !player.options.scientific;
    if (player.options.notation === "Standard") {
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
    }
    setAchieveTooltip();
    updateDimensions();
    updateCosts();
};

var newsHidden = false
document.getElementById("newsbtn").onclick = function() {
  if (!newsHidden) {
    document.getElementById("game").style.display = "none";
    newsHidden = true
  } else {
    document.getElementById("game").style.display = "inline-block";
    newsHidden = false
  }
}




function calcSacrificeBoost() {
    if (player.firstAmount != 0) return Math.max(Math.pow((Math.log10(player.firstAmount) / 10.0), 2) / Math.max(Math.pow((Math.log10(Math.max(player.sacrificed, 1)) / 10.0), 2), 1), 1);
    else return 1;
}


function sacrifice() {
    player.eightPow *= calcSacrificeBoost()
    player.sacrificed += player.firstAmount;
    player.firstAmount = 0;
    player.secondAmount = 0;
    player.thirdAmount = 0;
    player.fourthAmount = 0;
    player.fifthAmount = 0;
    player.sixthAmount = 0;
    player.seventhAmount = 0;

    if (Math.max(Math.pow((Math.log10(Math.max(player.sacrificed, 1)) / 10.0), 2), 2) >= 600 && !player.achievements.includes("The Gods are pleased")) giveAchievement("The Gods are pleased");

}




document.getElementById("sacrifice").onclick = function () {
    if (document.getElementById("confirmation").checked && player.eightAmount != 0) sacrifice();
    else if (confirm("Dimensional Sacrifice will reduce the amount of dimensions from 1 to 7 to 0, but the cost and the multiplier stays the same, you will also get a boost to Eighth Dimension. THIS MIGHT AFFECT YOUR PROGRESS NEGATIVELY.") && player.eightAmount != 0) sacrifice();

}



document.getElementById("bigcrunch").onclick = function () {
    if (!player.achievements.includes("That's fast!") && player.thisInfinityTime <= 72000) giveAchievement("That's fast!");
    if (!player.achievements.includes("You didn't need it anyway") && player.eightAmount == 0) giveAchievement("You didn't need it anyway");
    if (!player.achievements.includes("Claustrophobic") && player.galaxies == 1) giveAchievement("Claustrophobic");
    if (player.currentChallenge != "") {
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
        chall2Pow: 1,
        chall3Pow: 0.01,
        options: {
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
    updateTickSpeed();
    showTab("dimensions")
    kongregate.stats.submit('Infinitied', player.infinitied);
    kongregate.stats.submit('Fastest Infinity time', Math.floor(player.bestInfinityTime / 10))
    if (!player.achievements.includes("To infinity!")) giveAchievement("To infinity!");
    if (!player.achievements.includes("That's a lot of infinites") && player.infinitied >= 10) giveAchievement("That's a lot of infinites");
    if (player.infinitied == 1) player.challenges.push("challenge1");
    updateChallenges();
}

function startChallenge(name) {
  if(confirm("You will start over with just your infinity upgrades and achievements. You need to reach infinity with special conditions.")) {
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
      chall2Pow: 1,
      chall3Pow: 0.01,
      options: {
        scientific: player.options.scientific,
        animationsOn: player.options.animationsOn,
        invert: player.options.invert,
        logoVisible: player.options.logoVisible
      }
    };
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
    updateTickSpeed();
    showTab('dimensions');
    updateChallenges();
  }
}






function calcPerSec(amount, pow, hasMult) {
    var hasTimeMult = player.infinityUpgrades.includes("timeMult")
    if (!hasMult && !hasTimeMult) return Math.floor(amount) * pow * player.achPow * player.chall2Pow / (player.tickspeed / 1000);
    else if (!hasMult && hasTimeMult) return Math.floor(amount) * pow * player.achPow * timeMult() * player.chall2Pow / (player.tickspeed / 1000);
    else if (hasMult && !hasTimeMult) return Math.floor(amount) * pow * player.achPow * dimMults() * player.chall2Pow / (player.tickspeed / 1000);
    else return Math.floor(amount) * pow * player.achPow * dimMults() * timeMult() * player.chall2Pow / (player.tickspeed / 1000);
}


var index = 0;

setInterval(function () {
    var thisUpdate = new Date().getTime();
    if (!player.achievements.includes("Don't you dare to sleep") && thisUpdate - player.lastUpdate >= 21600000) giveAchievement("Don't you dare to sleep")
    var diff = Math.min(thisUpdate - player.lastUpdate, 21600000);
    diff = diff / 100;
    player.chall3Pow *= 1.00038
    player.chall2Pow = Math.min(player.chall2Pow + diff/1800, 1)
    player.seventhAmount += calcPerSec(player.eightAmount, player.eightPow, player.infinityUpgrades.includes("18Mult")) * diff / 100;
    player.sixthAmount += calcPerSec(player.seventhAmount, player.seventhPow, player.infinityUpgrades.includes("27Mult")) * diff / 100;
    player.fifthAmount += calcPerSec(player.sixthAmount, player.sixthPow, player.infinityUpgrades.includes("36Mult")) * diff / 100;
    player.fourthAmount += calcPerSec(player.fifthAmount, player.fifthPow, player.infinityUpgrades.includes("45Mult")) * diff / 100;
    player.thirdAmount += calcPerSec(player.fourthAmount, player.fourthPow, player.infinityUpgrades.includes("45Mult")) * diff / 100;
    player.secondAmount += calcPerSec(player.thirdAmount, player.thirdPow, player.infinityUpgrades.includes("36Mult")) * diff / 100;
    player.firstAmount += calcPerSec(player.secondAmount, player.secondPow, player.infinityUpgrades.includes("27Mult")) * diff / 100;
    if (player.money != Infinity) {
      if (player.currentChallenge == "challenge3") {
        player.money += calcPerSec(player.firstAmount, player.firstPow, player.infinityUpgrades.includes("18Mult")) * diff * player.chall3Pow / 10;
        player.totalmoney += calcPerSec(player.firstAmount, player.firstPow, player.infinityUpgrades.includes("18Mult")) * diff * player.chall3Pow / 10;
      } else {
        player.money += calcPerSec(player.firstAmount, player.firstPow, player.infinityUpgrades.includes("18Mult")) * diff / 10;
        player.totalmoney += calcPerSec(player.firstAmount, player.firstPow, player.infinityUpgrades.includes("18Mult")) * diff * player.chall3Pow / 10;
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

    if (player.firstCost > player.money) firstButton.className = 'unavailablebtn';
    else firstButton.className = 'storebtn';
    if (player.secondCost > player.money) secondButton.className = 'unavailablebtn';
    else secondButton.className = 'storebtn';
    if (player.thirdCost > player.money) thirdButton.className = 'unavailablebtn';
    else thirdButton.className = 'storebtn';
    if (player.fourthCost > player.money) fourthButton.className = 'unavailablebtn';
    else fourthButton.className = 'storebtn';
    if (player.fifthCost > player.money) fifthButton.className = 'unavailablebtn';
    else fifthButton.className = 'storebtn';
    if (player.sixthCost > player.money) sixthButton.className = 'unavailablebtn';
    else sixthButton.className = 'storebtn';
    if (player.seventhCost > player.money) seventhButton.className = 'unavailablebtn';
    else seventhButton.className = 'storebtn';
    if (player.eightCost > player.money) eightButton.className = 'unavailablebtn';
    else eightButton.className = 'storebtn';
    if (player.tickSpeedCost > player.money) tickSpeedButton.className = 'unavailablebtn';
    else tickSpeedButton.className = 'storebtn';
    if (player.tickSpeedCost > player.money) document.getElementById("tickSpeedMax").className = 'unavailablebtn';
    else document.getElementById("tickSpeedMax").className = 'storebtn';
    if (player.firstCost * (10 - player.firstBought) > player.money) document.getElementById("firstMax").className = 'unavailablebtn';
    else document.getElementById("firstMax").className = 'storebtn';
    if (player.secondCost * (10 - player.secondBought) > player.money) document.getElementById("secondMax").className = 'unavailablebtn';
    else document.getElementById("secondMax").className = 'storebtn';
    if (player.thirdCost * (10 - player.thirdBought) > player.money) document.getElementById("thirdMax").className = 'unavailablebtn';
    else document.getElementById("thirdMax").className = 'storebtn';
    if (player.fourthCost * (10 - player.fourthBought) > player.money) document.getElementById("fourthMax").className = 'unavailablebtn';
    else document.getElementById("fourthMax").className = 'storebtn';
    if (player.fifthCost * (10 - player.fifthBought) > player.money) document.getElementById("fifthMax").className = 'unavailablebtn';
    else document.getElementById("fifthMax").className = 'storebtn';
    if (player.sixthCost * (10 - player.sixthBought) > player.money) document.getElementById("sixthMax").className = 'unavailablebtn';
    else document.getElementById("sixthMax").className = 'storebtn';
    if (player.seventhCost * (10 - player.seventhBought) > player.money) document.getElementById("seventhMax").className = 'unavailablebtn';
    else document.getElementById("seventhMax").className = 'storebtn';
    if (player.eightCost * (10 - player.eightBought) > player.money) document.getElementById("eightMax").className = 'unavailablebtn';
    else document.getElementById("eightMax").className = 'storebtn';
    if (player.infinityPoints > 0) {
    document.getElementById("infinitybtn").style.display = "inline-block";
    document.getElementById("challengesbtn").style.display = "inline-block";
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
    if (player.infinityUpgrades.includes("45Mult")) document.getElementById("infi24").className = "infinistorebtn2"
    else document.getElementById("infi24").className = "infinistorebtnlocked"
    
  }
  else {
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
    document.getElementById("infinitybtn").style.display = "none";
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


    document.getElementById("progressbar").style.width = (Math.log10(player.money) * 0.3247).toFixed(2) + "%"
    document.getElementById("progressbar").innerHTML = (Math.log10(player.money) * 0.3247).toFixed(2) + "%"

    if (player.infinityUpgrades.includes("resetBoost")) {
        if (player.resets === 0) {
            if (player.fourthAmount >= 11) {
                document.getElementById("softReset").className = 'storebtn';
            } else document.getElementById("softReset").className = 'unavailablebtn';
        }
        if (player.resets == 1) {
            if (player.fifthAmount >= 11) {
                document.getElementById("softReset").className = 'storebtn';
            } else document.getElementById("softReset").className = 'unavailablebtn';
        } else if (player.resets == 2 || player.currentChallenge == "challenge4") {
            if (player.sixthAmount >= player.resets * 20 - 29) {
                document.getElementById("softReset").className = 'storebtn';
            } else document.getElementById("softReset").className = 'unavailablebtn';
        } else if (player.resets == 3) {
            if (player.seventhAmount >= 11) {
                document.getElementById("softReset").className = 'storebtn';
            } else document.getElementById("softReset").className = 'unavailablebtn';
        } else if (player.resets > 3) {
            if (player.eightAmount >= (player.resets - 4) * 15 + 11) {
                document.getElementById("softReset").className = 'storebtn';
            } else document.getElementById("softReset").className = 'unavailablebtn';
        }
        if (player.currentChallenge == "challenge4" ? player.sixthAmount >= player.galaxies * 90 + 121: player.eightAmount >= player.galaxies * 60 + 71) document.getElementById("secondSoftReset").className = 'storebtn';
        else document.getElementById("secondSoftReset").className = 'unavailablebtn';
    } else {
        if (player.resets === 0) {
            if (player.fourthAmount >= 20) {
                document.getElementById("softReset").className = 'storebtn';
            } else document.getElementById("softReset").className = 'unavailablebtn';
        }
        if (player.resets == 1) {
            if (player.fifthAmount >= 20) {
                document.getElementById("softReset").className = 'storebtn';
            } else document.getElementById("softReset").className = 'unavailablebtn';
        } else if (player.resets == 2 || player.currentChallenge == "challenge4") {
            if (player.sixthAmount >= player.resets * 20 - 20) {
                document.getElementById("softReset").className = 'storebtn';
            } else document.getElementById("softReset").className = 'unavailablebtn';
        } else if (player.resets == 3) {
            if (player.seventhAmount >= 20) {
                document.getElementById("softReset").className = 'storebtn';
            } else document.getElementById("softReset").className = 'unavailablebtn';
        } else if (player.resets > 3) {
            if (player.eightAmount >= (player.resets - 4) * 15 + 20) {
                document.getElementById("softReset").className = 'storebtn';
            } else document.getElementById("softReset").className = 'unavailablebtn';
        }
        if (player.currentChallenge == "challenge4" ? player.sixthAmount >= player.galaxies * 90 + 130: player.eightAmount >= player.galaxies * 60 + 80) document.getElementById("secondSoftReset").className = 'storebtn';
        else document.getElementById("secondSoftReset").className = 'unavailablebtn';
    }
    
    if (player.currentChallenge == "challenge2") document.getElementById("chall2Pow").style.display = "inline-block"
    else document.getElementById("chall2Pow").style.display = "none"
    if (player.currentChallenge == "challenge3") document.getElementById("chall3Pow").style.display = "inline-block"
    else document.getElementById("chall3Pow").style.display = "none"
    
    document.getElementById("chall2Pow").innerHTML = (player.chall2Pow*100).toFixed(2) + "%"
    document.getElementById("chall3Pow").innerHTML = (player.chall3Pow*100).toFixed(2) + "%"


    document.getElementById("sacrifice").setAttribute('ach-tooltip', "Boosts 8th Dimension by " + formatValue(player.options.notation, calcSacrificeBoost(), 2, 2) + "x");

    if (!player.achievements.includes("I forgot to nerf that") && player.firstPow >= 10e30) giveAchievement("I forgot to nerf that")
    if (!player.achievements.includes("Antimatter Apocalypse") && player.money >= 10e79) giveAchievement("Antimatter Apocalypse")
    if (!player.achievements.includes("One for each dimension") && player.totalTimePlayed >= 10 * 60 * 60 * 24 * 8) giveAchievement("One for each dimension")

    index++;
    player.lastUpdate = thisUpdate;
}, 100);


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
]


var conditionalNewsArray = ["Our universe is falling apart. We are all evacuating. This is the last news cast", "THIS NEWS STATION HAS SHUT DOWN DUE TO COLLAPSING UNIVERSE", 
"Researchers have confirmed that there is another dimension to this world. However, only antimatter beings can interact with it", 
"Studies show a massive problem with the time-space continuum. In other words, a large amount of antimatter has dissapeared from the cosmos", 
"Should we call antimatter Matter now? There seems to be more of it."]

var initpos = c.width;
var newsText = newsArray[Math.round(Math.random() * (newsArray.length - 1))];
ctx.textBaseline = 'top';

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
        newsText = next;
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
    if (!player.options.animationsOn) document.getElementById("logoanimation").src = "animation.png";
    if (player.options.invert) {
        document.getElementById("body").classList.add("invert");
    }
    if (!player.options.logoVisible) {
        document.getElementById("logoanimation").style.display = "none";
        document.getElementById("logodiv").style.display = "none";
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

function resize() {
    c.width = window.innerWidth;
    c.height = 64;
}
resize();
