
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
  achievements: [],
  infinityUpgrades: [],
	infinityPoints: 0,
	infinitied: 0,
	totalTimePlayed: 0,
	bestInfinityTime: 9999999999,
	thisInfinityTime: 0,
  resets: 0,
  galaxies: 0,
  tickDecrease: 0.9,
  totalmoney: 0,
	interval: null,
  lastUpdate: new Date().getTime(),
  options: {
    scientific: false,
    animationsOn: true,
    invert: false,
    logoVisible: true
  }
};

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
function set_cookie(cookie_name,value) {
    expiry = new Date();   
    expiry.setTime(new Date().getTime() + (365*24*60*60*1000)); 
    var c_value=escape(btoa(JSON.stringify(value))) + 
    "; expires="+expiry.toUTCString();
    document.cookie=cookie_name + "=" + c_value;
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
    c_value = atob(unescape(c_value.substring(c_start,c_end)));
    return JSON.parse(c_value);
}

kongregateAPI.loadAPI(function(){
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
      if (player.options.invert === undefined) player.options.invert = false;
      if (player.options.logoVisible === undefined) player.options.logoVisible = true;
      if (player.achievements === undefined) player.achievements = []; 
	    if (player.infinityUpgrades === undefined) player.infinityUpgrades = [];
      if (player.infinityPoints === undefined) player.infinityPoints = 0;
	    if (player.infinitied === undefined) player.infinitied = 0;
	    if (player.totalTimePlayed === undefined) player.totalTimePlayed = 0;
	    if (player.bestInfinityTime === undefined) player.bestInfinityTime = 9999999999;
	    if (player.thisInfinityTime === undefined) player.thisInfinityTime = 9999999999;
	    if (player.galaxies === undefined) player.galaxies = 0;
      if (player.lastUpdate === undefined) player.lastUpdate = new Date().getTime();
    	if (player.firstAmount !== 0) document.getElementById("secondRow").style.display = "table-row";
    	if (player.secondAmount !== 0) { 
    	document.getElementById("thirdRow").style.display = "table-row";
  		document.getElementById("tickSpeed").style.visibility = "visible";
      document.getElementById("tickSpeedMax").style.visibility = "visible";
  		document.getElementById("tickLabel").style.visibility = "visible";
  		document.getElementById("tickSpeedAmount").style.visibility = "visible";
    	}
	
    	if (player.thirdAmount !== 0) document.getElementById("fourthRow").style.display = "table-row";
    	if (player.fourthAmount !== 0) if (player.resets > 0) document.getElementById("fifthRow").style.display = "table-row";
    	if (player.fifthAmount !== 0) if (player.resets > 1) document.getElementById("sixthRow").style.display = "table-row";
    	if (player.sixthAmount !== 0) if (player.resets > 2) document.getElementById("seventhRow").style.display = "table-row";
    	if (player.seventhAmount !== 0) if (player.resets > 3) document.getElementById("eightRow").style.display = "table-row";
    	updateCosts();
      updateTickSpeed();
      
      var achievements = document.getElementsByClassName('achievement');
      var achievement;
      for (var i = 0; i < achievements.length; i++) {
        achievement = achievements.item(i);
        if (player.achievements.includes(achievement.id)) {
            achievement.className = 'achievement achievementunlocked';
        }
      }
      
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

function updateMoney() {
	var element = document.getElementById("coinAmount");
  element.innerHTML =shortenMoney(player.money);
  
  
}

function updateCoinPerSec() {
	var element = document.getElementById("coinsPerSec");
  element.innerHTML = 'You are getting ' + shortenDimensions(calcPerSec(player.firstAmount, player.firstPow, player.infinityUpgrades.includes("18Mult"))) + ' antimatter per second.';
}




function updateDimensions() {
	document.getElementById("firstAmount").innerHTML = shortenDimensions(player.firstAmount) + ' (' + player.firstBought + ')  (+' + (calcPerSec(player.secondAmount, player.secondPow, player.infinityUpgrades.includes("27Mult"))*10/Math.max(player.firstAmount, 1)).toFixed(1) + '%/s)';
  document.getElementById("secondAmount").innerHTML = shortenDimensions(player.secondAmount) + ' (' + player.secondBought + ')  (+' + (calcPerSec(player.thirdAmount, player.thirdPow, player.infinityUpgrades.includes("36Mult"))*10/Math.max(player.secondAmount, 1)).toFixed(1) + '%/s)';
  document.getElementById("thirdAmount").innerHTML = shortenDimensions(player.thirdAmount) + ' (' + player.thirdBought + ')  (+' + (calcPerSec(player.fourthAmount, player.fourthPow, player.infinityUpgrades.includes("45Mult"))*10/Math.max(player.thirdAmount, 1)).toFixed(1) + '%/s)';
  document.getElementById("fourthAmount").innerHTML = shortenDimensions(player.fourthAmount) + ' (' + player.fourthBought + ')  (+' + (calcPerSec(player.fifthAmount, player.fifthPow, player.infinityUpgrades.includes("45Mult"))*10/Math.max(player.fourthAmount, 1)).toFixed(1) + '%/s)';
  document.getElementById("fifthAmount").innerHTML = shortenDimensions(player.fifthAmount) + ' (' + player.fifthBought + ')  (+' + (calcPerSec(player.sixthAmount, player.sixthPow, player.infinityUpgrades.includes("36Mult"))*10/Math.max(player.fifthAmount, 1)).toFixed(1) + '%/s)';
  document.getElementById("sixthAmount").innerHTML = shortenDimensions(player.sixthAmount) + ' (' + player.sixthBought + ')  (+' + (calcPerSec(player.seventhAmount, player.seventhPow, player.infinityUpgrades.includes("27Mult"))*10/Math.max(player.sixthAmount, 1)).toFixed(1) + '%/s)';
  document.getElementById("seventhAmount").innerHTML = shortenDimensions(player.seventhAmount) + ' (' + player.seventhBought + ')  (+' + (calcPerSec(player.eightAmount, player.eightPow, player.infinityUpgrades.includes("18Mult"))*10/Math.max(player.seventhAmount, 1)).toFixed(1) + '%/s)';
  document.getElementById("eightAmount").innerHTML = shortenDimensions(player.eightAmount) + ' (' + player.eightBought + ')';
  if (!player.infinityUpgrades.includes("timeMult")) {
    document.getElementById("firstD").innerHTML = 'First Dimension  ' +  'x' + shortenMoney(!player.infinityUpgrades.includes("18Mult") ? player.firstPow : player.firstPow * dimMults());
    document.getElementById("secondD").innerHTML = 'Second Dimension  ' +  'x' + shortenMoney(!player.infinityUpgrades.includes("27Mult") ? player.secondPow : player.secondPow * dimMults());
    document.getElementById("thirdD").innerHTML = 'Third Dimension  ' +  'x' + shortenMoney(!player.infinityUpgrades.includes("36Mult") ? player.thirdPow : player.thirdPow * dimMults());
    document.getElementById("fourthD").innerHTML = 'Fourth Dimension  ' +  'x' + shortenMoney(!player.infinityUpgrades.includes("45Mult") ? player.fourthPow : player.fourthPow * dimMults());
    document.getElementById("fifthD").innerHTML = 'Fifth Dimension  ' +  'x' + shortenMoney(!player.infinityUpgrades.includes("45Mult") ? player.fifthPow : player.fifthPow * dimMults());
    document.getElementById("sixthD").innerHTML = 'Sixth Dimension  ' +  'x' + shortenMoney(!player.infinityUpgrades.includes("36Mult") ? player.sixthPow : player.sixthPow * dimMults());
    document.getElementById("seventhD").innerHTML = 'Seventh Dimension  ' +  'x' + shortenMoney(!player.infinityUpgrades.includes("27Mult") ? player.seventhPow : player.seventhPow * dimMults());
    document.getElementById("eightD").innerHTML = 'Eighth Dimension  ' +  'x' + shortenMoney(!player.infinityUpgrades.includes("18Mult") ? player.eightPow : player.eightPow * dimMults());
  } else {
    document.getElementById("firstD").innerHTML = 'First Dimension  ' +  'x' + shortenMoney((!player.infinityUpgrades.includes("18Mult") ? player.firstPow : player.firstPow * dimMults())*timeMult());
    document.getElementById("secondD").innerHTML = 'Second Dimension  ' +  'x' + shortenMoney((!player.infinityUpgrades.includes("27Mult") ? player.secondPow : player.secondPow * dimMults())*timeMult());
    document.getElementById("thirdD").innerHTML = 'Third Dimension  ' +  'x' + shortenMoney((!player.infinityUpgrades.includes("36Mult") ? player.thirdPow : player.thirdPow * dimMults())*timeMult());
    document.getElementById("fourthD").innerHTML = 'Fourth Dimension  ' +  'x' + shortenMoney((!player.infinityUpgrades.includes("45Mult") ? player.fourthPow : player.fourthPow * dimMults())*timeMult());
    document.getElementById("fifthD").innerHTML = 'Fifth Dimension  ' +  'x' + shortenMoney((!player.infinityUpgrades.includes("45Mult") ? player.fifthPow : player.fifthPow * dimMults())*timeMult());
    document.getElementById("sixthD").innerHTML = 'Sixth Dimension  ' +  'x' + shortenMoney((!player.infinityUpgrades.includes("36Mult") ? player.sixthPow : player.sixthPow * dimMults())*timeMult());
    document.getElementById("seventhD").innerHTML = 'Seventh Dimension  ' +  'x' + shortenMoney((!player.infinityUpgrades.includes("27Mult") ? player.seventhPow : player.seventhPow * dimMults())*timeMult());
    document.getElementById("eightD").innerHTML = 'Eighth Dimension  ' +  'x' + shortenMoney((!player.infinityUpgrades.includes("18Mult") ? player.eightPow : player.eightPow * dimMults())*timeMult());
  }
  if (player.infinityUpgrades.includes("galaxyBoost")) document.getElementById("tickLabel").innerHTML = 'Make the game ' + Math.round(((0.9 - (player.galaxies*0.06)) * 100)) + '% faster.';
  else document.getElementById("tickLabel").innerHTML = 'Make the game ' + Math.round((1-(0.9 - (player.galaxies*0.03))) * 100) + '% faster.';
  if (player.infinityUpgrades.includes("resetBoost")) {
    if (player.resets > 3) {
      document.getElementById("resetLabel").innerHTML = 'Dimension Boost: requires '+ ((player.resets - 4)*15+11) +' Eighth Dimension';
      if (player.seventhAmount !== 0) document.getElementById("eightRow").style.visibility="visible";
    }
    else if (player.resets > 2) {
      document.getElementById("resetLabel").innerHTML = 'Dimension Shift: requires 11 Seventh Dimension';
      if (player.sixthAmount !== 0) document.getElementById("seventhRow").style.visibility="visible";
    }
    else if (player.resets > 1) {
      document.getElementById("resetLabel").innerHTML = 'Dimension Shift: requires 11 Sixth Dimension';
      if (player.fifthAmount !== 0) document.getElementById("sixthRow").style.visibility="visible";
    }
    else if (player.resets > 0) {
      document.getElementById("resetLabel").innerHTML = 'Dimension Shift: requires 11 Fifth Dimension';
      if (player.fourthAmount !== 0) document.getElementById("fifthRow").style.visibility="visible";
    } else document.getElementById("resetLabel").innerHTML = 'Dimension Shift: requires 11 Fourth Dimension';
  } else {
    if (player.resets > 3) {
      document.getElementById("resetLabel").innerHTML = 'Dimension Boost: requires '+ ((player.resets - 4)*15+20) +' Eighth Dimension';
      if (player.seventhAmount !== 0) document.getElementById("eightRow").style.visibility="visible";
    }
    else if (player.resets > 2) {
      document.getElementById("resetLabel").innerHTML = 'Dimension Shift: requires 20 Seventh Dimension';
      if (player.sixthAmount !== 0) document.getElementById("seventhRow").style.visibility="visible";
    }
    else if (player.resets > 1) {
      document.getElementById("resetLabel").innerHTML = 'Dimension Shift: requires 20 Sixth Dimension';
      if (player.fifthAmount !== 0) document.getElementById("sixthRow").style.visibility="visible";
    }
    else if (player.resets > 0) {
      document.getElementById("resetLabel").innerHTML = 'Dimension Shift: requires 20 Fifth Dimension';
      if (player.fourthAmount !== 0) document.getElementById("fifthRow").style.visibility="visible";
    } else document.getElementById("resetLabel").innerHTML = 'Dimension Shift: requires 20 Fourth Dimension';
  }
  if (player.resets > 3) document.getElementById("softReset").innerHTML = "Reset the game for a Boost";
  else document.getElementById("softReset").innerHTML = "Reset the game for a new Dimension";
  document.getElementById("secondResetLabel").innerHTML = player.infinityUpgrades.includes("resetBoost") ? 'Antimatter Galaxies: requires ' + Math.round((((1-player.tickDecrease)*100-7)/3*80) - 9) + ' Eighth Dimensions' : 'Antimatter Galaxies: requires ' + Math.round((((1-player.tickDecrease)*100-7)/3*80)) + ' Eighth Dimensions';
  document.getElementById("totalmoney").innerHTML = 'You have made a total of ' + shortenMoney(player.totalmoney) + ' antimatter.';
  document.getElementById("totalresets").innerHTML = 'You have done ' + player.resets + ' soft resets.';
  document.getElementById("galaxies").innerHTML = 'You have ' + Math.round((((1-player.tickDecrease)*100-7)/3)-1) + ' Antimatter Galaxies.';
  document.getElementById("totalTime").innerHTML = "You have played for " + timeDisplay(player.totalTimePlayed)

  if (player.bestInfinityTime == 9999999999 ) {
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
document.getElementById("first").innerHTML = 'Cost: ' + shorten(player.firstCost);
document.getElementById("second").innerHTML = 'Cost: ' + shorten(player.secondCost);
document.getElementById("third").innerHTML = 'Cost: ' + shorten(player.thirdCost);
document.getElementById("fourth").innerHTML = 'Cost: ' + shorten(player.fourthCost);
document.getElementById("fifth").innerHTML = 'Cost: ' + shorten(player.fifthCost);
document.getElementById("sixth").innerHTML = 'Cost: ' + shorten(player.sixthCost);
document.getElementById("seventh").innerHTML = 'Cost: ' + shorten(player.seventhCost);
document.getElementById("eight").innerHTML = 'Cost: ' + shorten(player.eightCost);
document.getElementById("tickSpeed").innerHTML = 'Cost: ' + shorten(player.tickSpeedCost);
document.getElementById("firstMax").innerHTML = 'Until 10, Cost: ' + shorten(player.firstCost*(10-player.firstBought));
document.getElementById("secondMax").innerHTML = 'Until 10, Cost: ' + shorten(player.secondCost*(10-player.secondBought));
document.getElementById("thirdMax").innerHTML = 'Until 10, Cost: ' + shorten(player.thirdCost*(10-player.thirdBought));
document.getElementById("fourthMax").innerHTML = 'Until 10, Cost: ' + shorten(player.fourthCost*(10-player.fourthBought));
document.getElementById("fifthMax").innerHTML = 'Until 10, Cost: ' + shorten(player.fifthCost*(10-player.fifthBought));
document.getElementById("sixthMax").innerHTML = 'Until 10, Cost: ' + shorten(player.sixthCost*(10-player.sixthBought));
document.getElementById("seventhMax").innerHTML = 'Until 10, Cost: ' + shorten(player.seventhCost*(10-player.seventhBought));
document.getElementById("eightMax").innerHTML = 'Until 10, Cost: ' + shorten(player.eightCost*(10-player.eightBought));
}

function updateTickSpeed() {
  var exp = Math.floor(Math.log10(player.tickspeed));
	if (exp > 1) document.getElementById("tickSpeedAmount").innerHTML = 'Tickspeed: ' + Math.round(player.tickspeed);
    else {
      document.getElementById("tickSpeedAmount").innerHTML = 'Tickspeed: ' + Math.round(player.tickspeed*(100/Math.pow(10, exp))) + ' / ' + shorten(100/Math.pow(10, exp));
    }
  
  /*	else if (player.tickspeed > 10) document.getElementById("tickSpeedAmount").innerHTML = 'Tickspeed: ' + Math.round(player.tickspeed*10)  + ' / 10';
  	else if (player.tickspeed > 1) document.getElementById("tickSpeedAmount").innerHTML = 'Tickspeed: ' + Math.round(player.tickspeed*100) + ' / 100';
  else if (player.tickspeed > .1) document.getElementById("tickSpeedAmount").innerHTML = 'Tickspeed: ' + Math.round(player.tickspeed*1000) + ' / 1000';
  else document.getElementById("tickSpeedAmount").innerHTML = 'Tickspeed: ' + Math.round(player.tickspeed*10000) + ' / 10000';*/
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
  achievements: player.achievements,
  infinityUpgrades: player.infinityUpgrades,
	infinityPoints: player.infinityPoints,
	infinitied: player.infinitied,
	totalTimePlayed: player.totalTimePlayed,
	bestInfinityTime: player.bestInfinityTime,
	thisInfinityTime: player.thisInfinityTime,
	firstPow: Math.pow(2, player.resets +1),
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
  options: {
    scientific: player.options.scientific,
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
  if (!player.achievements.includes("Boosting to the max") && player.resets >= 10) giveAchievement("Boosting to the max")
}

MoneyFormat = ['K', 'M', 'B', 'T', 'Qd', 'Qt', 'Sx', 'Sp', 'Oc', 'No', 'Dc', 'UDc', 'DDc', 'TDc', 'QdDc', 'QtDc', 'SxDc', 'SpDc', 'ODc', 'NDc', 'Vg', 'UVg', 'DVg', 'TVg', 'QdVg', 'QtVg', 'SxVg', 'SpVg', 'OVg', 'NVg', 'Tg', 'UTg', 'DTg', 'TTg', 'QdTg', 'QtTg', 'SxTg', 'SpTg', 'OTg','NTg', 'Qa', 'UQa', 'DQa', 'TQa', 'QdQa', 'QtQa', 'SxQa', 'SpQa', 'OQa', 'NQa', 'Qi', 'UQi', 'DQi', 'TQi', 'QaQi', 'QtQi', 'SxQi', 'SpQi', 'OQi', 'NQi', 'Se', 'USe', 'DSe', 'TSe', 'QaSe', 'QtSe', 'SxSe', 'SpSe', 'OSe', 'NSe', 'St', 'USt', 'DSt', 'TSt', 'QaSt', 'QtSt', 'SxSt', 'SpSt', 'OSt', 'NSt', 'Og', 'UOg', 'DOg', 'TOg', 'QdOg', 'QtOg', 'SxOg', 'SpOg', 'OOg', 'NOg', 'Nn', 'UNn', 'DNn', 'TNn', 'QdNn', 'QtNn', 'SxNn', 'SpNn', 'ONn', 'NNn', 'Ce', 'UCe'];
MoneyFormat.reverse();

shorten = function(money) {
  if (money != Infinity) {
    var temp = MoneyFormat.length;
    var digitMul = Math.pow(10, 2);
    for (var i = 0; i < MoneyFormat.length; i++) {
      if ( Math.pow(10, temp * 3) <= money ) {
        money = money / Math.pow(10, temp * 3);
            if ((Math.round(money * digitMul) / digitMul) == 1000) {
              return player.options.scientific ? (Math.round((money * digitMul) / digitMul)/1000) + 'e' + (MoneyFormat.length-i+1)*3 :(Math.round((money * digitMul) / digitMul)/1000) + ' ' + MoneyFormat[i-1];
            }
        else return player.options.scientific ? (Math.round(money * digitMul) / digitMul) + 'e' + (MoneyFormat.length-i)*3 :(Math.round(money * digitMul) / digitMul) + ' ' + MoneyFormat[i];
      }
      temp--;
    }
    return Math.floor(money);
  } else return "Infinite";
};

shortenDimensions = function(money) {
  if (money != Infinity) {
    var temp = MoneyFormat.length;
    var digitMul = Math.pow(10, 2);
    for (var i = 0; i < MoneyFormat.length; i++) {
      if ( Math.pow(10, temp * 3) <= money ) {
        money = money / Math.pow(10, temp * 3);
        return player.options.scientific ? money.toFixed(2) + 'e' + (MoneyFormat.length-i)*3 : money.toFixed(2) + ' ' + MoneyFormat[i];
      }
      temp--;
    }
    return Math.round(money);
  } else return "Infinite";
};

shortenMoney = function(money) {
  if (money != Infinity) {
    var temp = MoneyFormat.length;
    var digitMul = Math.pow(10, 2);
    for (var i = 0; i < MoneyFormat.length; i++) {
      if ( Math.pow(10, temp * 3) <= money ) {
        money = money / Math.pow(10, temp * 3);
        return player.options.scientific ? money.toFixed(2) + 'e' + (MoneyFormat.length-i)*3 : money.toFixed(2) + ' ' + MoneyFormat[i];
      }
      temp--;
    }
    if (money == 1) return 1
    else return money.toFixed(1);
  } else return "Infinite";
};


document.getElementById("tickSpeed").onclick = function() {
	if (player.money >= player.tickSpeedCost) {
  player.money -= player.tickSpeedCost;
  if (player.infinityUpgrades.includes("galaxyBoost")) player.tickspeed = player.tickspeed * (0.9-(player.galaxies*0.06));
  else player.tickspeed = player.tickspeed * (0.9-(player.galaxies*0.03));
  player.tickSpeedCost = player.tickSpeedCost*10;
  document.getElementById("tickSpeed").innerHTML = 'Cost: ' + shorten(player.tickSpeedCost);
  updateTickSpeed();
  updateMoney();
  }
};

function buyMaxTickSpeed() {
  if (player.money >= player.tickSpeedCost) {
    player.money -= player.tickSpeedCost;
    if (player.infinityUpgrades.includes("galaxyBoost")) player.tickspeed = player.tickspeed * (0.9-(player.galaxies*0.06));
    else player.tickspeed = player.tickspeed * (0.9-(player.galaxies*0.03));
    player.tickSpeedCost = player.tickSpeedCost*10;
    document.getElementById("tickSpeed").innerHTML = 'Cost: ' + shorten(player.tickSpeedCost);
    updateTickSpeed();
    updateMoney();
    buyMaxTickSpeed();
  }
}

function timeDisplay(time) {
  time = Math.floor(time/10)
  if (time >= 31536000) {
    return Math.floor(time/31536000) + " years, " + Math.round((time%31536000)/86400) + " days, " + Math.round((time%86400)/3600) + " hours, " + Math.round((time%3600)/60) + " minutes and " + Math.round(time%60) + " seconds"
  } else if (time >= 86400) {
    return Math.floor(time/86400) + " days, " + Math.round((time%86400)/3600) + " hours, " + Math.round((time%3600)/60) + " minutes and " + Math.round(time%60) + " seconds"
  } else if (time >= 3600) {
      return Math.floor(time/3600) + " hours, " + Math.round((time%3600)/60) + " minutes and " + Math.round(time%60) + " seconds"
    } else if (time >= 60) {
      return Math.floor(time/60) + " minutes and " + Math.round(time%60) + " seconds"
    }
  else return Math.floor(time%60) + " seconds"
}

function giveAchievement(name) {
  $.notify(name, "success");
  player.achievements.push(name);
  document.getElementById(name).className = "achievementunlocked"
  
  kongregate.stats.submit('Achievements', player.achievements.length);
}





document.getElementById("first").onclick = function() {
  if (player.money >= player.firstCost) {
  player.firstAmount++;
  player.money -= player.firstCost;
  if (player.firstBought == 9) {
    player.firstBought = 0;
    if (player.infinityUpgrades.includes('dimMult')) player.firstPow *= 2.2;
    else player.firstPow *= 2;
    player.firstCost = player.firstCost*1000;
  }
  else player.firstBought++;
  updateCoinPerSec();
  var element = document.getElementById("first");
  element.innerHTML = 'Cost: ' + shorten(player.firstCost);
  updateCosts();
  updateMoney();
  updateDimensions();
  document.getElementById("secondRow").style.display = "table-row";
  
  if (!player.achievements.includes("You gotta start somewhere")) {
    giveAchievement("You gotta start somewhere")
  }
  }
};

document.getElementById("second").onclick = function() {
	if (player.money >= player.secondCost) {
	player.secondAmount++;
  player.money -= player.secondCost;
  if (player.secondBought == 9) {
  player.secondBought = 0;
  if (player.infinityUpgrades.includes('dimMult')) player.secondPow *= 2.2;
  else player.secondPow *= 2;
  player.secondCost = player.secondCost*10000;
  }
  else player.secondBought++;
  updateCoinPerSec();
  var element = document.getElementById("second");
  element.innerHTML = 'Cost: ' + shorten(player.secondCost);
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
  }
};

document.getElementById("third").onclick = function() {
	if (player.money >= player.thirdCost) {
	player.thirdAmount++;
  player.money -= player.thirdCost;
  if (player.thirdBought == 9) {
  player.thirdBought = 0;
  if (player.infinityUpgrades.includes('dimMult')) player.thirdPow *= 2.2;
  else player.thirdPow *= 2;
  player.thirdCost = player.thirdCost*100000;
  }
  else player.thirdBought++;
  updateCoinPerSec();
  var element = document.getElementById("third");
  element.innerHTML = 'Cost: ' + shorten(player.thirdCost);
  updateCosts();
  updateMoney();
  updateDimensions();
  document.getElementById("fourthRow").style.display = "table-row";
  if (!player.achievements.includes("Half life 3 confirmed")) {
    giveAchievement("Half life 3 confirmed")
  }
  }
};

document.getElementById("fourth").onclick = function() {
	if (player.money >= player.fourthCost) {
	player.fourthAmount++;
  player.money -= player.fourthCost;
  if (player.fourthBought == 9) {
  player.fourthBought = 0;
  if (player.infinityUpgrades.includes('dimMult')) player.fourthPow *= 2.2;
  else player.fourthPow *= 2;
  player.fourthCost = player.fourthCost*1000000;
  }
  else player.fourthBought++;
  updateCoinPerSec();
  var element = document.getElementById("fourth");
  element.innerHTML = 'Cost: ' + shorten(player.fourthCost);
  updateCosts();
  updateMoney();
  updateDimensions();
  if (player.resets > 0) document.getElementById("fifthRow").style.display = "table-row";
  if (!player.achievements.includes("L4D: Left 4 Dimensions")) {
    giveAchievement("L4D: Left 4 Dimensions")
  }
  }
};

document.getElementById("fifth").onclick = function() {
	if (player.money >= player.fifthCost) {
	player.fifthAmount++;
  player.money -= player.fifthCost;
  if (player.fifthBought == 9) {
  player.fifthBought = 0;
  if (player.infinityUpgrades.includes('dimMult')) player.fifthPow *= 2.2;
  else player.fifthPow *= 2;
  player.fifthCost = player.fifthCost*1e8;
  }
  else player.fifthBought++;
  updateCoinPerSec();
  var element = document.getElementById("fifth");
  element.innerHTML = 'Cost: ' + shorten(player.fifthCost);
  updateCosts();
  updateMoney();
  updateDimensions();
  if (player.resets > 1) document.getElementById("sixthRow").style.display = "table-row";
  if (!player.achievements.includes("5 Dimension Antimatter Punch")) {
    giveAchievement("5 Dimension Antimatter Punch")
  }
  }
};

document.getElementById("sixth").onclick = function() {
	if (player.money >= player.sixthCost) {
	player.sixthAmount++;
  player.money -= player.sixthCost;
  if (player.sixthBought == 9) {
  player.sixthBought = 0;
  if (player.infinityUpgrades.includes('dimMult')) player.sixthPow *= 2.2;
  else player.sixthPow *= 2;
  player.sixthCost = player.sixthCost*1e10;
  }
  else player.sixthBought++;
  updateCoinPerSec();
  var element = document.getElementById("sixth");
  element.innerHTML = 'Cost: ' + shorten(player.sixthCost);
  updateCosts();
  updateMoney();
  updateDimensions();
  if (player.resets > 2) document.getElementById("seventhRow").style.display = "table-row";
  if (!player.achievements.includes("We couldn't afford 9")) {
    giveAchievement("We couldn't afford 9")
  }
  }
};

document.getElementById("seventh").onclick = function() {
	if (player.money >= player.seventhCost) {
	player.seventhAmount++;
  player.money -= player.seventhCost;
  if (player.seventhBought == 9) {
  player.seventhBought = 0;
  if (player.infinityUpgrades.includes('dimMult')) player.seventhPow *= 2.2;
  else player.seventhPow *= 2;
  player.seventhCost = player.seventhCost*1e12;
  }
  else player.seventhBought++;
  updateCoinPerSec();
  var element = document.getElementById("seventh");
  element.innerHTML = 'Cost: ' + shorten(player.seventhCost);
  updateCosts();
  updateMoney();
  updateDimensions();
  if (player.resets > 3) document.getElementById("eightRow").style.display = "table-row";
  if (!player.achievements.includes("Not a luck related achievement")) {
    giveAchievement("Not a luck related achievement")
  }
  }
};

document.getElementById("eight").onclick = function() {
	if (player.money >= player.eightCost) {
	player.eightAmount++;
  player.money -= player.eightCost;
  if (player.eightBought == 9) {
  player.eightBought = 0;
  if (player.infinityUpgrades.includes('dimMult')) player.eightPow *= 2.2;
  else player.eightPow *= 2;
  player.eightCost = player.eightCost*1e15;
  }
  else player.eightBought++;
  updateCoinPerSec();
  var element = document.getElementById("eight");
  element.innerHTML = 'Cost: ' + shorten(player.eightCost);
  updateCosts();
  updateMoney();
  updateDimensions();
  if (!player.achievements.includes("90 degrees to infinity")) {
    giveAchievement("90 degrees to infinity")
  }
  }
};

document.getElementById("firstMax").onclick = function() {
if (player.money >= player.firstCost*(10-player.firstBought)) {
	player.firstAmount += (10-player.firstBought);
  player.money -= player.firstCost*(10-player.firstBought);
	player.firstBought = 0;
	if (player.infinityUpgrades.includes('dimMult')) player.firstPow *= 2.2;
    else player.firstPow *= 2;
	player.firstCost *= 1e3;
  updateCosts();
  updateMoney();
  updateDimensions();
  document.getElementById("secondRow").style.display = "table-row";
}
};

document.getElementById("secondMax").onclick = function() {
if (player.money >= player.secondCost*(10-player.secondBought)) {
	player.secondAmount += (10-player.secondBought);
  player.money -= player.secondCost*(10-player.secondBought);
	player.secondBought = 0;
	if (player.infinityUpgrades.includes('dimMult')) player.secondPow *= 2.2;
  else player.secondPow *= 2;
	player.secondCost *= 1e4;
  updateCosts();
  updateMoney();
  updateDimensions();
  document.getElementById("thirdRow").style.display = "table-row";
  document.getElementById("tickSpeed").style.visibility = "visible";
  document.getElementById("tickSpeedMax").style.visibility = "visible";
  document.getElementById("tickLabel").style.visibility = "visible";
  document.getElementById("tickSpeedAmount").style.visibility = "visible";
}
};

document.getElementById("thirdMax").onclick = function() {
if (player.money >= player.thirdCost*(10-player.thirdBought)) {
	player.thirdAmount += (10-player.thirdBought);
  player.money -= player.thirdCost*(10-player.thirdBought);
	player.thirdBought = 0;
	if (player.infinityUpgrades.includes('dimMult')) player.thirdPow *= 2.2;
  else player.thirdPow *= 2;
	player.thirdCost *= 1e5;
  updateCosts();
  updateMoney();
  updateDimensions();
  document.getElementById("fourthRow").style.display = "table-row";
}
};

document.getElementById("fourthMax").onclick = function() {
	if (player.money >= player.fourthCost*(10-player.fourthBought)) {
	player.fourthAmount += (10-player.fourthBought);
  player.money -= player.fourthCost*(10-player.fourthBought);
	player.fourthBought = 0;
	if (player.infinityUpgrades.includes('dimMult')) player.fourthPow *= 2.2;
  else player.fourthPow *= 2;
	player.fourthCost *= 1e6;
  updateCosts();
  updateMoney();
  updateDimensions();
  if (player.resets > 0) document.getElementById("fifthRow").style.display = "table-row";
}
};

document.getElementById("fifthMax").onclick = function() {
	if (player.money >= player.fifthCost*(10-player.fifthBought)) {
	player.fifthAmount += (10-player.fifthBought);
  player.money -= player.fifthCost*(10-player.fifthBought);
	player.fifthBought = 0;
	if (player.infinityUpgrades.includes('dimMult')) player.fifthPow *= 2.2;
  else player.fifthPow *= 2;
	player.fifthCost *= 1e8;
  updateCosts();
  updateMoney();
  updateDimensions();
  if (player.resets > 1) document.getElementById("sixthRow").style.display = "table-row";
}
};

document.getElementById("sixthMax").onclick = function() {
	if (player.money >= player.sixthCost*(10-player.sixthBought)) {
	player.sixthAmount += (10-player.sixthBought);
  player.money -= player.sixthCost*(10-player.sixthBought);
	player.sixthBought = 0;
	if (player.infinityUpgrades.includes('dimMult')) player.sixthPow *= 2.2;
  else player.sixthPow *= 2;
	player.sixthCost *= 1e10;
  updateCosts();
  updateMoney();
  updateDimensions();
  if (player.resets > 2) document.getElementById("seventhRow").style.display = "table-row";
}
};

document.getElementById("seventhMax").onclick = function() {
	if (player.money >= player.seventhCost*(10-player.seventhBought)) {
	player.seventhAmount += (10-player.seventhBought);
  player.money -= player.seventhCost*(10-player.seventhBought);
	player.seventhBought = 0;
	if (player.infinityUpgrades.includes('dimMult')) player.seventhPow *= 2.2;
  else player.seventhPow *= 2;
	player.seventhCost *= 1e12;
  updateCosts();
  updateMoney();
  updateDimensions();
  if (player.resets > 3) document.getElementById("eightRow").style.display = "table-row";
}
};

document.getElementById("eightMax").onclick = function() {
	if (player.money >= player.eightCost*(10-player.eightBought)) {
	player.eightAmount += (10-player.eightBought);
  player.money -= player.eightCost*(10-player.eightBought);
	player.eightBought = 0;
	if (player.infinityUpgrades.includes('dimMult')) player.eightPow *= 2.2;
  else player.eightPow *= 2;
	player.eightCost *= 1e15;
  updateCosts();
  updateMoney();
  updateDimensions();
}
};

document.getElementById("softReset").onclick = function() {
	if (player.resets === 0) {
  	if (player.infinityUpgrades.includes("resetBoost") ? player.fourthAmount >= 11 : player.fourthAmount >= 20) {
  		softReset();
    	document.getElementById("resetLabel").innerHTML = 'Dimension Shift: requires 20 Fifth Dimension';
      }
    }
  else if (player.resets == 1) {
  	if (player.infinityUpgrades.includes("resetBoost") ? player.fifthAmount >= 11 : player.fifthAmount >= 20) {
    softReset();
    document.getElementById("resetLabel").innerHTML = 'Dimension Shift: requires 20 Sixth Dimension';
    }
  }
  else if (player.resets == 2) {
  	if (player.infinityUpgrades.includes("resetBoost") ? player.sixthAmount >= 11 : player.sixthAmount >= 20) {
    softReset();
    document.getElementById("resetLabel").innerHTML = 'Dimension Shift: requires 20 Seventh Dimension';
    }
  }
  else if (player.resets == 3) {
  	if (player.infinityUpgrades.includes("resetBoost") ? player.seventhAmount >= 11 : player.seventhAmount >= 20) {
    softReset();
    document.getElementById("resetLabel").innerHTML = 'Dimension Shift: requires 20 Eighth Dimension';
    }
  }
  else if (player.resets > 3) {
  if (player.infinityUpgrades.includes("resetBoost") ? player.eightAmount >= (player.resets - 4)*15+11 : player.eightAmount >= (player.resets - 4)*15+20) {
    softReset();
    document.getElementById("resetLabel").innerHTML = 'Dimension Boost: requires ' + (player.resets - 3)*20 +' Eighth Dimension';
    }
    document.getElementById("secondResetLabel").innerHTML = 'Antimatter Galaxies: requires ' + Math.round((((1-player.tickDecrease)*100-7)/3*80)) + 'Eighth Dimensions';
    }
};

function maxAll() {
  buyMaxTickSpeed();
  if (player.money >= player.eightCost*(10-player.eightBought) && player.resets > 3) {
    document.getElementById("eightMax").click();
    maxAll();
  }
  else if (player.money >= player.seventhCost*(10-player.seventhBought) && player.resets > 2) {
    document.getElementById("seventhMax").click();
    maxAll();
  }
  else if (player.money >= player.sixthCost*(10-player.sixthBought) && player.resets > 1) {
    document.getElementById("sixthMax").click();
    maxAll();
  }
  else if (player.money >= player.fifthCost*(10-player.fifthBought) && player.resets > 0) {
    document.getElementById("fifthMax").click();
    maxAll();
  }
  else if (player.money >= player.fourthCost*(10-player.fourthBought)) {
    document.getElementById("fourthMax").click();
    maxAll();
  }
  else if (player.money >= player.thirdCost*(10-player.thirdBought)) {
    document.getElementById("thirdMax").click();
    maxAll();
  }
  else if (player.money >= player.secondCost*(10-player.secondBought)) {
    document.getElementById("secondMax").click();
    maxAll();
  }
  else if (player.money >= player.firstCost*(10-player.firstBought)) {
    document.getElementById("firstMax").click();
    maxAll();
  }
  
}

document.getElementById("maxall").onclick = function() {
  maxAll();
};

document.getElementById("animation").onclick = function() {
  if (player.options.animationsOn) {
    player.options.animationsOn = false;
    document.getElementById("logoanimation").src = "animation.png";
  }
  
  
  else {
    player.options.animationsOn = true;
    document.getElementById("logoanimation").src = "animation.gif";
  }
}

document.getElementById("invert").onclick = function() {
  if (player.options.invert) {
    player.options.invert = false;
    document.getElementById("body").classList.remove("invert");
  } else {
    player.options.invert = true;
    document.getElementById("body").classList.add("invert");
  }
}

document.getElementById("logo").onclick = function() {
  if (player.options.logoVisible) {
    player.options.logoVisible = false;
    document.getElementById("logoanimation").style.display = "none";
    document.getElementById("logodiv").style.display = "none";
    document.getElementById("logospace").style.display = "none";
  } else {
    player.options.logoVisible = true;
    document.getElementById("logoanimation").style.display = "block";
    document.getElementById("logodiv").style.display = "block";
    document.getElementById("logospace").style.display = "block";
  }
}




function buyInfinityUpgrade(name) {
  if (player.infinityPoints >= 1 && !player.infinityUpgrades.includes(name)) {
    player.infinityUpgrades.push(name);
    player.infinityPoints -= 1;
    return true
  } else return false
}

function timeMult() {
  return Math.pow(0.5*player.totalTimePlayed/600, 0.15)
}

function dimMults() {
  return 1+(player.infinitied*0.2)
}



document.getElementById("infi11").onclick = function() {
  buyInfinityUpgrade("timeMult");
}

document.getElementById("infi21").onclick = function() {
  buyInfinityUpgrade("dimMult");
}

document.getElementById("infi12").onclick = function() {
  if (player.infinityUpgrades.includes("timeMult")) buyInfinityUpgrade("18Mult");
}

document.getElementById("infi22").onclick = function() {
  if (player.infinityUpgrades.includes("dimMult")) buyInfinityUpgrade("27Mult");
}

document.getElementById("infi13").onclick = function() {
  if (player.infinityUpgrades.includes("18Mult")) buyInfinityUpgrade("36Mult");
}
document.getElementById("infi23").onclick = function() {
  if (player.infinityUpgrades.includes("27Mult")) buyInfinityUpgrade("45Mult");
}

document.getElementById("infi14").onclick = function() {
  if (player.infinityUpgrades.includes("36Mult")) buyInfinityUpgrade("resetBoost");
}

document.getElementById("infi24").onclick = function() {
  if (player.infinityUpgrades.includes("45Mult")); buyInfinityUpgrade("galaxyBoost")
}





document.getElementById("secondSoftReset").onclick = function() {
	if (player.infinityUpgrades.includes("resetBoost") ? player.eightAmount >= (((1-player.tickDecrease)*100-7)/3*80) - 9 : player.eightAmount >= (((1-player.tickDecrease)*100-7)/3*80)) {
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
  achievements: player.achievements,
  infinityUpgrades: player.infinityUpgrades,
	infinityPoints: player.infinityPoints,
	infinitied: player.infinitied,
	totalTimePlayed: player.totalTimePlayed,
	bestInfinityTime: player.bestInfinityTime,
	thisInfinityTime: player.thisInfinityTime,
  resets: 0,
  galaxies: player.galaxies+1,
  totalmoney: player.totalmoney,
  tickDecrease: player.tickDecrease - 0.03,
	interval: null,
  lastUpdate: player.lastUpdate,
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
  if (!player.achievements.includes("Double Galaxy") && player.galaxies >= 2) giveAchievement("Double Galaxy");
  if (!player.achievements.includes("You got past The Big Wall") && player.galaxies >= 1) giveAchievement("You got past The Big Wall");
	}
};

document.getElementById("exportbtn").onclick = function() {
  prompt("Save this somewhere.",btoa(JSON.stringify(player)));
};


document.getElementById("save").onclick = function() {
  save_game();
};

function verify_save(obj) {
    if (typeof obj != 'object') return false;
    

    return true;
}

document.getElementById("importbtn").onclick = function() {
  var save_data = prompt("Input your save.");
  save_data = JSON.parse(atob(save_data));
    if (!save_data || !verify_save(save_data)){
      alert('could not load the save..');
      load_custom_game();
      return;
    }
  player = save_data;
  save_game();
  load_game();
};




document.getElementById("reset").onclick = function() {
	if(confirm("Do you really want to erase all your progress?")) {
  set_cookie('dimensionSave', defaultStart);
  load_game();
  updateCosts();
  clearInterval(player.interval);
	//updateInterval();
	
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
      updateDimensions();
  }
};

document.getElementById("notation").onclick = function() {
  player.options.scientific = !player.options.scientific;
  updateDimensions();
  updateCosts();
};

document.getElementById("bigcrunch").onclick = function() {
  if (!player.achievements.includes("That's fast!") && player.thisInfinityTime <= 72000) giveAchievement("That's fast!");
  if (!player.achievements.includes("You didn't need it anyway") && player.eightAmount == 0) giveAchievement("You didn't need it anyway");
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
  achievements: player.achievements,
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
  showTab("dimensions")
	kongregate.stats.submit('Infinitied', player.infinitied);
  kongregate.stats.submit('Fastest Infinity time', Math.floor(player.bestInfinityTime/10))
  
  if (!player.achievements.includes("To infinity!")) giveAchievement("To infinity!");
  if (!player.achievements.includes("That's a lot of infinites") && player.infinitied >= 10) giveAchievement("That's a lot of infinites");
}



function calcPerSec(amount, pow,  hasMult) {
  var hasTimeMult = player.infinityUpgrades.includes("timeMult")
  if (!hasMult && !hasTimeMult) return Math.floor(amount)*pow/(player.tickspeed/1000);
  else if (!hasMult && hasTimeMult) return Math.floor(amount)*pow*timeMult()/(player.tickspeed/1000);
  else if (hasMult && !hasTimeMult) return Math.floor(amount)*pow*dimMults()/(player.tickspeed/1000);
  else return Math.floor(amount)*pow*dimMults()*timeMult()/(player.tickspeed/1000);
}


var index = 0;

setInterval(function() {
  var thisUpdate = new Date().getTime();
  var diff = Math.min(thisUpdate - player.lastUpdate, 21600000);
  diff = diff/100;
  player.seventhAmount += calcPerSec(player.eightAmount, player.eightPow, player.infinityUpgrades.includes("18Mult"))*diff/100;
  player.sixthAmount += calcPerSec(player.seventhAmount, player.seventhPow, player.infinityUpgrades.includes("27Mult"))*diff/100;
  player.fifthAmount += calcPerSec(player.sixthAmount, player.sixthPow, player.infinityUpgrades.includes("36Mult"))*diff/100;
  player.fourthAmount += calcPerSec(player.fifthAmount, player.fifthPow, player.infinityUpgrades.includes("45Mult"))*diff/100;
  player.thirdAmount += calcPerSec(player.fourthAmount, player.fourthPow, player.infinityUpgrades.includes("45Mult"))*diff/100;
  player.secondAmount += calcPerSec(player.thirdAmount, player.thirdPow, player.infinityUpgrades.includes("36Mult"))*diff/100;
  player.firstAmount += calcPerSec(player.secondAmount, player.secondPow, player.infinityUpgrades.includes("27Mult"))*diff/100;
  if (player.money != Infinity) {
    player.money += calcPerSec(player.firstAmount, player.firstPow, player.infinityUpgrades.includes("18Mult"))*diff/10;
    player.totalMoney += calcPerSec(player.firstAmount, player.firstPow, player.infinityUpgrades.includes("18Mult"))*diff/10;
  }
  player.totalTimePlayed += diff
  player.thisInfinityTime += diff
  if (player.money == Infinity) {
    document.getElementById("bigcrunch").style.display = 'inline-block';
    showTab('emptiness');
  }
  else document.getElementById("bigcrunch").style.display = 'none';
  
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
  if (player.firstCost*(10-player.firstBought) > player.money) document.getElementById("firstMax").className = 'unavailablebtn';
  else document.getElementById("firstMax").className = 'storebtn';
  if (player.secondCost*(10-player.secondBought) > player.money) document.getElementById("secondMax").className = 'unavailablebtn';
  else document.getElementById("secondMax").className = 'storebtn';
  if (player.thirdCost*(10-player.thirdBought) > player.money) document.getElementById("thirdMax").className = 'unavailablebtn';
  else document.getElementById("thirdMax").className = 'storebtn';
  if (player.fourthCost*(10-player.fourthBought) > player.money) document.getElementById("fourthMax").className = 'unavailablebtn';
  else document.getElementById("fourthMax").className = 'storebtn';
  if (player.fifthCost*(10-player.fifthBought) > player.money) document.getElementById("fifthMax").className = 'unavailablebtn';
  else document.getElementById("fifthMax").className = 'storebtn';
  if (player.sixthCost*(10-player.sixthBought) > player.money) document.getElementById("sixthMax").className = 'unavailablebtn';
  else document.getElementById("sixthMax").className = 'storebtn';
  if (player.seventhCost*(10-player.seventhBought) > player.money) document.getElementById("seventhMax").className = 'unavailablebtn';
  else document.getElementById("seventhMax").className = 'storebtn';
  if (player.eightCost*(10-player.eightBought) > player.money) document.getElementById("eightMax").className = 'unavailablebtn';
  else document.getElementById("eightMax").className = 'storebtn';
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
    if (player.infinityUpgrades.includes("45Mult")) document.getElementById("infi24").className = "infinistorebtn2"
    else document.getElementById("infi24").className = "infinistorebtnlocked"
    
  }
  else {
    document.getElementById("infinitybtn").style.display = "none";
    document.getElementById("infi11").className = "infinistorebtnlocked"
    document.getElementById("infi21").className = "infinistorebtnlocked"
    document.getElementById("infi12").className = "infinistorebtnlocked"
    document.getElementById("infi22").className = "infinistorebtnlocked"
    document.getElementById("infi13").className = "infinistorebtnlocked"
    document.getElementById("infi23").className = "infinistorebtnlocked"
    document.getElementById("infi14").className = "infinistorebtnlocked"
    document.getElementById("infi24").className = "infinistorebtnlocked"
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
    if (player.infinitied > 0) document.getElementById("infinitybtn").style.display = "inline-block";
  }
  
  if (player.infinityUpgrades.includes("timeMult")) document.getElementById("infi11").className = "infinistorebtnbought"
  if (player.infinityUpgrades.includes("dimMult")) document.getElementById("infi21").className = "infinistorebtnbought"
  if (player.infinityUpgrades.includes("18Mult")) document.getElementById("infi12").className = "infinistorebtnbought"
  if (player.infinityUpgrades.includes("27Mult")) document.getElementById("infi22").className = "infinistorebtnbought"
  if (player.infinityUpgrades.includes("36Mult")) document.getElementById("infi13").className = "infinistorebtnbought"
  if (player.infinityUpgrades.includes("45Mult")) document.getElementById("infi23").className = "infinistorebtnbought"
  if (player.infinityUpgrades.includes("resetBoost")) document.getElementById("infi14").className = "infinistorebtnbought"
  if (player.infinityUpgrades.includes("galaxyBoost")) document.getElementById("infi24").className = "infinistorebtnbought"
  
    
  document.getElementById("progressbar").style.width = (Math.log10(player.money)*0.3247).toFixed(2) + "%"
  document.getElementById("progressbar").innerHTML = (Math.log10(player.money)*0.3247).toFixed(2) + "%"
  
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
    }
    else if (player.resets == 2) {
      if (player.sixthAmount >= 11) {
        document.getElementById("softReset").className = 'storebtn';
      } else document.getElementById("softReset").className = 'unavailablebtn';
    }
    else if (player.resets == 3) {
      if (player.seventhAmount >= 11) {
        document.getElementById("softReset").className = 'storebtn';
      } else document.getElementById("softReset").className = 'unavailablebtn';
    }
    else if (player.resets > 3) {
      if (player.eightAmount >= (player.resets - 4)*15+11) {
        document.getElementById("softReset").className = 'storebtn';
      } else document.getElementById("softReset").className = 'unavailablebtn';
    }
    if (player.eightAmount >= player.galaxies*60+71) document.getElementById("secondSoftReset").className = 'storebtn';
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
    }
    else if (player.resets == 2) {
      if (player.sixthAmount >= 20) {
        document.getElementById("softReset").className = 'storebtn';
      } else document.getElementById("softReset").className = 'unavailablebtn';
    }
    else if (player.resets == 3) {
      if (player.seventhAmount >= 20) {
        document.getElementById("softReset").className = 'storebtn';
      } else document.getElementById("softReset").className = 'unavailablebtn';
    }
    else if (player.resets > 3) {
      if (player.eightAmount >= (player.resets - 4)*15+20) {
        document.getElementById("softReset").className = 'storebtn';
      } else document.getElementById("softReset").className = 'unavailablebtn';
    }
    if (player.eightAmount >= (player.galaxies*60+80)) document.getElementById("secondSoftReset").className = 'storebtn';
    else document.getElementById("secondSoftReset").className = 'unavailablebtn';
  }
  
  if (!player.achievements.includes("One for each dimension") && player.totalTimePlayed >= 10*60*60*24*8) giveAchievement("One for each dimension")
  
    index++;
  player.lastUpdate = thisUpdate;
}, 100);


function init() {
    console.log('init');
    
    //setup the onclick callbacks for the buttons
    document.getElementById('dimensionsbtn').onclick=function () {showTab('dimensions');};
    document.getElementById('optionsbtn').onclick=function () {showTab('options');};
    document.getElementById('statisticsbtn').onclick=function () {showTab('statistics');};
    document.getElementById('achievementsbtn').onclick=function () {showTab('achievements');};
    document.getElementById('infinitybtn').onclick=function () {showTab('infinity');};
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
      document.getElementById("logospace").style.display = "none";
    }
    
}


setInterval(function () { save_game(); }, 30000);
updateCosts();
//updateInterval();
updateDimensions();
document.getElementById("hiddenheader").style.display = "none";
init();

