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
  resets: 0,
  tickDecrease: 0.9,
  totalmoney: 0,
	interval: null
};
var lastUpdate = new Date().getTime();
var scientific = false;
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
    expiry.setTime(new Date().getTime() + (10*60*1000)); 
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

function load_game() {
    var save_data = get_cookie('dimensionSave');
       if (!save_data) return;
    	player = save_data;
        if (player.totalmoney === undefined) player.totalmoney = player.money;
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
}

function save_game() {
    set_cookie('dimensionSave', player);
}


function showTab(tabName) {
    console.log('show tab ' + tabName);
    
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
  element.innerHTML = 'You are getting ' + shortenDimensions(Math.round(player.firstAmount* player.firstPow*(1000/player.tickspeed)*10)/10) + ' antimatter per second.';
}

function updateDimensions() {
	document.getElementById("firstAmount").innerHTML = shortenDimensions(player.firstAmount) + ' (' + player.firstBought + ')';
  document.getElementById("secondAmount").innerHTML = shortenDimensions(player.secondAmount) + ' (' + player.secondBought + ')';
  document.getElementById("thirdAmount").innerHTML = shortenDimensions(player.thirdAmount) + ' (' + player.thirdBought + ')';
  document.getElementById("fourthAmount").innerHTML = shortenDimensions(player.fourthAmount) + ' (' + player.fourthBought + ')';
  document.getElementById("fifthAmount").innerHTML = shortenDimensions(player.fifthAmount) + ' (' + player.fifthBought + ')';
  document.getElementById("sixthAmount").innerHTML = shortenDimensions(player.sixthAmount) + ' (' + player.sixthBought + ')';
  document.getElementById("seventhAmount").innerHTML = shortenDimensions(player.seventhAmount) + ' (' + player.seventhBought + ')';
  document.getElementById("eightAmount").innerHTML = shortenDimensions(player.eightAmount) + ' (' + player.eightBought + ')';
  document.getElementById("firstD").innerHTML = 'First Dimension  ' +  'x' + shorten(player.firstPow);
  document.getElementById("secondD").innerHTML = 'Second Dimension  ' +  'x' + shorten(player.secondPow);
  document.getElementById("thirdD").innerHTML = 'Third Dimension  ' +  'x' + shorten(player.thirdPow);
  document.getElementById("fourthD").innerHTML = 'Fourth Dimension  ' +  'x' + shorten(player.fourthPow);
  document.getElementById("fifthD").innerHTML = 'Fifth Dimension  ' +  'x' + shorten(player.fifthPow);
  document.getElementById("sixthD").innerHTML = 'Sixth Dimension  ' +  'x' + shorten(player.sixthPow);
  document.getElementById("seventhD").innerHTML = 'Seventh Dimension  ' +  'x' + shorten(player.seventhPow);
  document.getElementById("eightD").innerHTML = 'Eight Dimension  ' +  'x' + shorten(player.eightPow);
  document.getElementById("tickLabel").innerHTML = 'Make the game ' + Math.round(((1 - player.tickDecrease) * 100)) + '% faster.';
  	if (player.resets > 3) {
    document.getElementById("resetLabel").innerHTML = 'Dimension Boost: requires '+ ((player.resets - 4)*15+20) +' Eight Dimension';
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
  if (player.resets > 3) document.getElementById("softReset").innerHTML = "Reset the game for a Boost";
  else document.getElementById("softReset").innerHTML = "Reset the game for a new Dimension";
  document.getElementById("secondResetLabel").innerHTML = 'Antimatter Galaxies: requires ' + Math.round((((1-player.tickDecrease)*100-7)/3*80)) + ' Eight Dimensions';
  document.getElementById("totalmoney").innerHTML = 'You have made a total of ' + shortenMoney(player.totalmoney) + ' antimatter.';
  document.getElementById("totalresets").innerHTML = 'You have done ' + player.resets + ' soft resets.';
  document.getElementById("galaxies").innerHTML = 'You have ' + Math.round((((1-player.tickDecrease)*100-7)/3)-1) + ' Antimatter Galaxies.';
  
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
	firstPow: Math.pow(2, player.resets +1),
	secondPow: Math.pow(2, player.resets),
	thirdPow: Math.max(Math.pow(2, player.resets - 1), 1),
	fourthPow: Math.max(Math.pow(2, player.resets - 2), 1),
	fifthPow: Math.max(Math.pow(2, player.resets - 3), 1),
	sixthPow: Math.max(Math.pow(2, player.resets - 4), 1),
	seventhPow: Math.max(Math.pow(2, player.resets - 5), 1),
	eightPow: Math.max(Math.pow(2, player.resets - 6), 1),
  resets: player.resets,
  tickDecrease: player.tickDecrease,
  totalmoney: player.totalmoney,
	interval: null
  
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
}

MoneyFormat = ['K', 'M', 'B', 'T', 'Qd', 'Qt', 'Sx', 'Sp', 'Oc', 'No', 'Dc', 'UDc', 'DDc', 'TDc', 'QdDc', 'QtDc', 'SxDc', 'SpDc', 'ODc', 'NDc', 'Vg', 'UVg', 'DVg', 'TVg', 'QdVg', 'QtVg', 'SxVg', 'SpVg', 'OVg', 'NVg', 'Tg', 'UTg', 'DTg', 'TTg', 'QdTg', 'QtTg', 'SxTg', 'SpTg', 'OTg','NTg', 'Qa', 'UQa', 'DQa', 'TQa', 'QdQa', 'QtQa', 'SxQa', 'SpQa', 'OQa', 'NQa', 'Qi', 'UQi', 'DQi', 'TQi', 'QaQi', 'QtQi', 'SxQi', 'SpQi', 'OQi', 'NQi', 'Se', 'USe', 'DSe', 'TSe', 'QaSe', 'QtSe', 'SxSe', 'SpSe', 'OSe', 'NSe', 'St', 'USt', 'DSt', 'TSt', 'QaSt', 'QtSt', 'SxSt', 'SpSt', 'OSt', 'NSt', 'Og', 'UOg', 'DOg', 'TOg', 'QdOg', 'QtOg', 'SxOg', 'SpOg', 'OOg', 'NOg', 'Nn', 'UNn', 'DNn', 'TNn', 'QdNn', 'QtNn', 'SxNn', 'SpNn', 'ONn', 'NNn'];
MoneyFormat.reverse();

shorten = function(money) {
	var temp = MoneyFormat.length;
	var digitMul = Math.pow(10, 2);
	for (var i = 0; i < MoneyFormat.length; i++) {
		if ( Math.pow(10, temp * 3) <= money ) {
			money = money / Math.pow(10, temp * 3);
          if ((Math.round(money * digitMul) / digitMul) == 1000) {
            return scientific ? (Math.round((money * digitMul) / digitMul)/1000) + 'e+' + (MoneyFormat.length-i+1)*3 :(Math.round((money * digitMul) / digitMul)/1000) + ' ' + MoneyFormat[i+1];
          }
			else return scientific ? (Math.round(money * digitMul) / digitMul) + 'e+' + (MoneyFormat.length-i)*3 :(Math.round(money * digitMul) / digitMul) + ' ' + MoneyFormat[i];
		}
		temp--;
	}
	return Math.floor(money);
};

shortenDimensions = function(money) {
  var temp = MoneyFormat.length;
	var digitMul = Math.pow(10, 2);
	for (var i = 0; i < MoneyFormat.length; i++) {
		if ( Math.pow(10, temp * 3) <= money ) {
			money = money / Math.pow(10, temp * 3);
			return scientific ? money.toFixed(2) + 'e+' + (MoneyFormat.length-i)*3 : money.toFixed(2) + ' ' + MoneyFormat[i];
		}
		temp--;
	}
	return Math.round(money);
};

shortenMoney = function(money) {
	var temp = MoneyFormat.length;
	var digitMul = Math.pow(10, 2);
	for (var i = 0; i < MoneyFormat.length; i++) {
		if ( Math.pow(10, temp * 3) <= money ) {
			money = money / Math.pow(10, temp * 3);
			return scientific ? money.toFixed(2) + 'e+' + (MoneyFormat.length-i)*3 : money.toFixed(2) + ' ' + MoneyFormat[i];
		}
		temp--;
	}
	return money.toFixed(1);
};


document.getElementById("tickSpeed").onclick = function() {
	if (player.money >= player.tickSpeedCost) {
  player.money -= player.tickSpeedCost;
  player.tickspeed = player.tickspeed * player.tickDecrease;
  player.tickSpeedCost = player.tickSpeedCost*10;
  document.getElementById("tickSpeed").innerHTML = 'Cost: ' + shorten(player.tickSpeedCost);
  updateTickSpeed();
  updateMoney();
  }
};

function buyMaxTickSpeed() {
  if (player.money >= player.tickSpeedCost) {
    player.money -= player.tickSpeedCost;
    player.tickspeed = player.tickspeed * player.tickDecrease;
    player.tickSpeedCost = player.tickSpeedCost*10;
    document.getElementById("tickSpeed").innerHTML = 'Cost: ' + shorten(player.tickSpeedCost);
    updateTickSpeed();
    updateMoney();
    buyMaxTickSpeed();
  }
}



document.getElementById("first").onclick = function() {
	if (player.money >= player.firstCost) {
	player.firstAmount++;
  player.money -= player.firstCost;
  if (player.firstBought == 9) {
  player.firstBought = 0;
  player.firstPow = player.firstPow * 2;
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
  }
};

document.getElementById("second").onclick = function() {
	if (player.money >= player.secondCost) {
	player.secondAmount++;
  player.money -= player.secondCost;
  if (player.secondBought == 9) {
  player.secondBought = 0;
  player.secondPow = player.secondPow * 2;
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
  }
};

document.getElementById("third").onclick = function() {
	if (player.money >= player.thirdCost) {
	player.thirdAmount++;
  player.money -= player.thirdCost;
  if (player.thirdBought == 9) {
  player.thirdBought = 0;
  player.thirdPow = player.thirdPow * 2;
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
  }
};

document.getElementById("fourth").onclick = function() {
	if (player.money >= player.fourthCost) {
	player.fourthAmount++;
  player.money -= player.fourthCost;
  if (player.fourthBought == 9) {
  player.fourthBought = 0;
  player.fourthPow = player.fourthPow * 2;
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
  }
};

document.getElementById("fifth").onclick = function() {
	if (player.money >= player.fifthCost) {
	player.fifthAmount++;
  player.money -= player.fifthCost;
  if (player.fifthBought == 9) {
  player.fifthBought = 0;
  player.fifthPow = player.fifthPow * 2;
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
  }
};

document.getElementById("sixth").onclick = function() {
	if (player.money >= player.sixthCost) {
	player.sixthAmount++;
  player.money -= player.sixthCost;
  if (player.sixthBought == 9) {
  player.sixthBought = 0;
  player.sixthPow = player.sixthPow * 2;
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
  }
};

document.getElementById("seventh").onclick = function() {
	if (player.money >= player.seventhCost) {
	player.seventhAmount++;
  player.money -= player.seventhCost;
  if (player.seventhBought == 9) {
  player.seventhBought = 0;
  player.seventhPow = player.seventhPow * 2;
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
  }
};

document.getElementById("eight").onclick = function() {
	if (player.money >= player.eightCost) {
	player.eightAmount++;
  player.money -= player.eightCost;
  if (player.eightBought == 9) {
  player.eightBought = 0;
  player.eightPow = player.eightPow * 2;
  player.eightCost = player.eightCost*1e15;
  }
  else player.eightBought++;
  updateCoinPerSec();
  var element = document.getElementById("eight");
  element.innerHTML = 'Cost: ' + shorten(player.eightCost);
  updateCosts();
  updateMoney();
  updateDimensions();
  }
};

document.getElementById("firstMax").onclick = function() {
if (player.money >= player.firstCost*(10-player.firstBought)) {
	player.firstAmount += (10-player.firstBought);
  player.money -= player.firstCost*(10-player.firstBought);
	player.firstBought = 0;
	player.firstPow *= 2;
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
	player.secondPow *= 2;
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
	player.thirdPow *= 2;
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
	player.fourthPow *= 2;
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
	player.fifthPow *= 2;
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
	player.sixthPow *= 2;
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
	player.seventhPow *= 2;
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
	player.eightPow *= 2;
	player.eightCost *= 1e15;
  updateCosts();
  updateMoney();
  updateDimensions();
}
};

document.getElementById("softReset").onclick = function() {
	if (player.resets === 0) {
  	if (player.fourthAmount >= 20) {
  		softReset();
    	document.getElementById("resetLabel").innerHTML = 'Dimension Shift: requires 20 Fifth Dimension';
      }
    }
  else if (player.resets == 1) {
  	if (player.fifthAmount >= 20) {
    softReset();
    document.getElementById("resetLabel").innerHTML = 'Dimension Shift: requires 20 Sixth Dimension';
    }
  }
  else if (player.resets == 2) {
  	if (player.sixthAmount >= 20) {
    softReset();
    document.getElementById("resetLabel").innerHTML = 'Dimension Shift: requires 20 Seventh Dimension';
    }
  }
  else if (player.resets == 3) {
  	if (player.seventhAmount >= 20) {
    softReset();
    document.getElementById("resetLabel").innerHTML = 'Dimension Shift: requires 20 Eight Dimension';
    }
  }
  else if (player.resets > 3) {
  if (player.eightAmount >= (player.resets - 4)*15+20) {
    softReset();
    document.getElementById("resetLabel").innerHTML = 'Dimension Boost: requires ' + (player.resets - 3)*20 +' Eight Dimension';
    }
    document.getElementById("secondResetLabel").innerHTML = 'Antimatter Galaxies: requires ' + Math.round((((1-player.tickDecrease)*100-7)/3*80)) + 'Eight Dimensions';
    }
};

function maxAll() {
  buyMaxTickSpeed();
  if (player.money >= player.eightCost*(10-player.eightBought) && player.resets > 3) {
    document.getElementById("eightMax").click();
    maxAll();
  }
  else if (player.money >= player.seventhCost*(10-player.seventhBought) && player.resets == 3) {
    document.getElementById("seventhMax").click();
    maxAll();
  }
  else if (player.money >= player.sixthCost*(10-player.sixthBought) && player.resets == 2) {
    document.getElementById("sixthMax").click();
    maxAll();
  }
  else if (player.money >= player.fifthCost*(10-player.fifthBought) && player.resets == 1) {
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

document.getElementById("secondSoftReset").onclick = function() {
	if (player.eightAmount >= (((1-player.tickDecrease)*100-7)/3*80)) {
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
  resets: 0,
  totalmoney: player.totalmoney,
  tickDecrease: player.tickDecrease - 0.03,
	interval: null
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
  scientific = !scientific;
  updateDimensions();
  updateCosts();
};


var index = 0;
load_game();
setInterval(function() {
  var thisUpdate = new Date().getTime();
  var diff = thisUpdate - lastUpdate;
  diff = diff/100;
  player.totalmoney += player.firstAmount*player.firstPow*diff/(player.tickspeed/100);
  player.money += player.firstAmount*player.firstPow*diff/(player.tickspeed/100);
  player.firstAmount += (Math.floor(player.secondAmount) * player.secondPow/10)*diff/(player.tickspeed/100);
  player.secondAmount += (Math.floor(player.thirdAmount) * player.thirdPow/10)*diff/(player.tickspeed/100);
  player.thirdAmount += (Math.floor(player.fourthAmount) * player.fourthPow/10)*diff/(player.tickspeed/100);
  player.fourthAmount += (Math.floor(player.fifthAmount) * player.fifthPow/10)*diff/(player.tickspeed/100);
  player.fifthAmount += (Math.floor(player.sixthAmount) * player.sixthPow/10)*diff/(player.tickspeed/100);
  player.sixthAmount += (Math.floor(player.seventhAmount) * player.seventhPow/10)*diff/(player.tickspeed/100);
  player.seventhAmount += (Math.floor(player.eightAmount) * player.eightPow/10)*diff/(player.tickspeed/100);
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
    if (player.eightAmount >= (((1-player.tickDecrease)*100-7)/3*80)) document.getElementById("secondSoftReset").className = 'storebtn';
    else document.getElementById("secondSoftReset").className = 'unavailablebtn';
    index++;
  lastUpdate = thisUpdate;
}, 100);


function init() {
    console.log('init');
    
    //setup the onclick callbacks for the buttons
    document.getElementById('dimensionsbtn').onclick=function () {showTab('dimensions');};
    document.getElementById('optionsbtn').onclick=function () {showTab('options');};
    document.getElementById('statisticsbtn').onclick=function () {showTab('statistics');};
    
    //show one tab during init or they'll all start hidden
    showTab('dimensions');
}


setInterval(function () { save_game(); }, 10000);
updateCosts();
//updateInterval();
updateDimensions();
updateTickSpeed();
init();
