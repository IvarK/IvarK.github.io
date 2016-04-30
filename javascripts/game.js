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
	interval: null
};
var defaultStart = player
var firstButton = document.getElementById("first")
var secondButton = document.getElementById("second")
var thirdButton = document.getElementById("third")
var fourthButton = document.getElementById("fourth")

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
    	if (player.firstAmount != 0) document.getElementById("secondRow").style.visibility = "visible";
    	if (player.secondAmount != 0) { 
    		document.getElementById("thirdRow").style.visibility = "visible";
  		document.getElementById("tickSpeed").style.visibility = "visible";
  		document.getElementById("tickLabel").style.visibility = "visible";
  		document.getElementById("tickSpeedAmount").style.visibility = "visible";
    	}
    	if (player.thirdAmount != 0) document.getElementById("fourthRow").style.visibility = "visible";
    	if (player.fourthAmount != 0) document.getElementById("fifthRow").style.visibility = "visible";
    	if (player.fifthAmount != 0) document.getElementById("sixthRow").style.visibility = "visible";
    	if (player.sixthAmount != 0) document.getElementById("seventhRow").style.visibility = "visible";
    	if (player.seventhAmount != 0) document.getElementById("eightRow").style.visibility = "visible";
    	updateCosts;
}

function save_game() {
    set_cookie('dimensionSave', player);
}

function updateMoney() {
	var element = document.getElementById("coinAmount");
  element.innerHTML = 'You have ' + shortenMoney(player.money) + ' antimatter.'
}

function updateCoinPerSec() {
	var element = document.getElementById("coinsPerSec")
  element.innerHTML = 'You are getting ' + shorten(Math.round(player.firstAmount* player.firstPow*(1000/player.tickspeed)*10)/10) + ' antimatter per second.'
}

function updateDimensions() {
	document.getElementById("firstAmount").innerHTML = 'x' + player.firstPow + '  ' + shorten(player.firstAmount) + ' (' + player.firstBought + ')';
  document.getElementById("secondAmount").innerHTML = 'x' + player.secondPow + '  ' + shorten(player.secondAmount) + ' (' + player.secondBought + ')';
  document.getElementById("thirdAmount").innerHTML = 'x' + player.thirdPow + '  ' + shorten(player.thirdAmount) + ' (' + player.thirdBought + ')';
  document.getElementById("fourthAmount").innerHTML = 'x' + player.fourthPow + '  ' + shorten(player.fourthAmount) + ' (' + player.fourthBought + ')';
  document.getElementById("fifthAmount").innerHTML = 'x' + player.fifthPow + '  ' + shorten(player.fifthAmount) + ' (' + player.fifthBought + ')';
  document.getElementById("sixthAmount").innerHTML = 'x' + player.sixthPow + '  ' + shorten(player.sixthAmount) + ' (' + player.sixthBought + ')';
  document.getElementById("seventhAmount").innerHTML = 'x' + player.seventhPow + '  ' + shorten(player.seventhAmount) + ' (' + player.seventhBought + ')';
  document.getElementById("eightAmount").innerHTML = 'x' + player.eightPow + '  ' + shorten(player.eightAmount) + ' (' + player.eightBought + ')';
  document.getElementById("tickSpeedAmount").innerHTML = 'Tickspeed: ' + Math.round(player.tickspeed);
}

function updateInterval() {
if (player.tickspeed > 100) {
clearInterval(player.interval)
player.interval = setInterval(function() {
	player.firstAmount += player.secondAmount * player.secondPow;
  player.secondAmount += player.thirdAmount * player.thirdPow;
  player.thirdAmount += player.fourthAmount * player.fourthPow;
  player.fourthAmount += player.fifthAmount * player.fifthPow;
  player.fifthAmount += player.sixthAmount * player.sixthPow;
  player.sixthAmount += player.seventhAmount * player.seventhPow;
  player.seventhAmount += player.eightAmount * player.eightPow;
  updateDimensions();
}, player.tickspeed*10);
}
else if (player.tickspeed > 10) {
clearInterval(player.interval)
player.interval = setInterval(function() {
	player.firstAmount += player.secondAmount * player.secondPow*10;
  player.secondAmount += player.thirdAmount * player.thirdPow*10;
  player.thirdAmount += player.fourthAmount * player.fourthPow*10;
  player.fourthAmount += player.fifthAmount * player.fifthPow*10;
  player.fifthAmount += player.sixthAmount * player.sixthPow*10;
  player.sixthAmount += player.seventhAmount * player.seventhPow*10;
  player.seventhAmount += player.eightAmount * player.eightPow*10;
  updateDimensions();
}, player.tickspeed*100);
}
else {
clearInterval(player.interval)
player.interval = setInterval(function() {
	player.firstAmount += player.secondAmount * player.secondPow*100;
  player.secondAmount += player.thirdAmount * player.thirdPow*100;
  player.thirdAmount += player.fourthAmount * player.fourthPow*100;
  player.fourthAmount += player.fifthAmount * player.fifthPow*100;
  player.fifthAmount += player.sixthAmount * player.sixthPow*100;
  player.sixthAmount += player.seventhAmount * player.seventhPow*100;
  player.seventhAmount += player.eightAmount * player.eightPow*100;
  updateDimensions();
}, player.tickspeed*1000);
}
}

function updateCosts() {
document.getElementById("first").innerHTML = 'Cost: ' + shorten(player.firstCost)
document.getElementById("second").innerHTML = 'Cost: ' + shorten(player.secondCost)
document.getElementById("third").innerHTML = 'Cost: ' + shorten(player.thirdCost)
document.getElementById("fourth").innerHTML = 'Cost: ' + shorten(player.fourthCost)
document.getElementById("fifth").innerHTML = 'Cost: ' + shorten(player.fifthCost)
document.getElementById("sixth").innerHTML = 'Cost: ' + shorten(player.sixthCost)
document.getElementById("seventh").innerHTML = 'Cost: ' + shorten(player.seventhCost)
document.getElementById("eight").innerHTML = 'Cost: ' + shorten(player.eightCost)
document.getElementById("tickSpeed").innerHTML = 'Cost: ' + shorten(player.tickSpeedCost)
}


function shorten(x) {
if (x < 1000) return x;
else if (Math.round(x * 100)/100 < 1000000) return Math.round(x/1000 * 100)/100 + ' K';
else if (Math.round(x * 100)/100 < 1000000000) return Math.round(x/1000000 * 100)/100 + ' M';
else if (Math.round(x * 100)/100 < 1000000000000) return Math.round(x/1000000000 * 100)/100 + ' B';
else if (Math.round(x * 100)/100 < 1e15) return Math.round(x/1e12 * 100)/100 + ' T'
else if (Math.round(x * 100)/100 < 1e18) return Math.round(x/1e15 * 100)/100 + ' Qd'
else if (Math.round(x * 100)/100 < 1e21) return Math.round(x/1e18 * 100)/100 + ' Qt'
else if (Math.round(x * 100)/100 < 1e24) return Math.round(x/1e21 * 100)/100 + ' Sx'
else if (Math.round(x * 100)/100 < 1e27) return Math.round(x/1e24 * 100)/100 + ' Sp'
else if (Math.round(x * 100)/100 < 1e30) return Math.round(x/1e27 * 100)/100 + ' Oc'
else if (Math.round(x * 100)/100 < 1e33) return Math.round(x/1e30 * 100)/100 + ' No'
else if (Math.round(x * 100)/100 < 1e36) return Math.round(x/1e33 * 100)/100 + ' Dc'
else if (Math.round(x * 100)/100 < 1e39) return Math.round(x/1e36 * 100)/100 + ' UDc'
else if (Math.round(x * 100)/100 < 1e42) return Math.round(x/1e39 * 100)/100 + ' DDc'
else if (Math.round(x * 100)/100 < 1e45) return Math.round(x/1e42 * 100)/100 + ' TDc'
else if (Math.round(x * 100)/100 < 1e48) return Math.round(x/1e45 * 100)/100 + ' QdDc'
}

function shortenMoney(x) {
if (x < 1000) return x.toFixed(1);
else if (x < 1000000) return (x/1e3).toFixed(2) + ' K';
else if (x < 1000000000) return (x/1e6).toFixed(2) + ' M';
else if (x < 1000000000000) return (x/1e9).toFixed(2) + ' B';
else if (x < 1e15) return (x/1e12).toFixed(2) + ' T'
else if (x < 1e18) return (x/1e15).toFixed(2) + ' Qd'
else if (x < 1e21) return (x/1e18).toFixed(2) + ' Qt'
else if (x < 1e24) return (x/1e21).toFixed(2) + ' Sx'
else if (x < 1e27) return (x/1e24).toFixed(2) + ' Sp'
else if (x < 1e30) return (x/1e27).toFixed(2) + ' Oc'
else if (x < 1e33) return (x/1e30).toFixed(2) + ' No'
else if (x < 1e36) return (x/1e33).toFixed(2) + ' Dc'
else if (x < 1e39) return (x/1e36).toFixed(2) + ' UDc'
else if (x < 1e42) return (x/1e39).toFixed(2) + ' DDc'
else if (x < 1e45) return (x/1e42).toFixed(2) + ' TDc'
else if (x < 1e48) return (x/1e45).toFixed(2) + ' QdDc'
}

document.getElementById("tickSpeed").onclick = function() {
	if (player.money >= player.tickSpeedCost) {
  player.money -= player.tickSpeedCost;
  player.tickspeed = player.tickspeed * .9;
  player.tickSpeedCost = player.tickSpeedCost*10;
  document.getElementById("tickSpeedAmount").innerHTML = 'Tickspeed: ' + Math.round(player.tickspeed);
  document.getElementById("tickSpeed").innerHTML = 'Cost: ' + shorten(player.tickSpeedCost);
  updateMoney();
  updateInterval();
  }
}

document.getElementById("first").onclick = function() {
	if (player.money >= player.firstCost) {
	player.firstAmount++;
  player.money -= player.firstCost;
  if (player.firstBought == 9) {
  player.firstBought = 0
  player.firstPow = player.firstPow * 2
  player.firstCost = player.firstCost*1000
  }
  else player.firstBought++;
  updateCoinPerSec();
  var element = document.getElementById("first");
  element.innerHTML = 'Cost: ' + shorten(player.firstCost);
  updateMoney();
  updateDimensions();
  document.getElementById("secondRow").style.visibility = "visible";
  }
}

document.getElementById("second").onclick = function() {
	if (player.money >= player.secondCost) {
	player.secondAmount++;
  player.money -= player.secondCost;
  if (player.secondBought == 9) {
  player.secondBought = 0
  player.secondPow = player.secondPow * 2
  player.secondCost = player.secondCost*10000
  }
  else player.secondBought++;
  updateCoinPerSec();
  var element = document.getElementById("second");
  element.innerHTML = 'Cost: ' + shorten(player.secondCost);
  updateMoney();
  updateDimensions();
  document.getElementById("thirdRow").style.visibility = "visible";
  document.getElementById("tickSpeed").style.visibility = "visible";
  document.getElementById("tickLabel").style.visibility = "visible";
  document.getElementById("tickSpeedAmount").style.visibility = "visible";
  }
}

document.getElementById("third").onclick = function() {
	if (player.money >= player.thirdCost) {
	player.thirdAmount++;
  player.money -= player.thirdCost;
  if (player.thirdBought == 9) {
  player.thirdBought = 0
  player.thirdPow = player.thirdPow * 2
  player.thirdCost = player.thirdCost*100000
  }
  else player.thirdBought++;
  updateCoinPerSec();
  var element = document.getElementById("third");
  element.innerHTML = 'Cost: ' + shorten(player.thirdCost);
  updateMoney();
  updateDimensions();
  document.getElementById("fourthRow").style.visibility = "visible";
  }
}

document.getElementById("fourth").onclick = function() {
	if (player.money >= player.fourthCost) {
	player.fourthAmount++;
  player.money -= player.fourthCost;
  if (player.fourthBought == 9) {
  player.fourthBought = 0
  player.fourthPow = player.fourthPow * 2
  player.fourthCost = player.fourthCost*1000000
  }
  else player.fourthBought++;
  updateCoinPerSec();
  var element = document.getElementById("fourth");
  element.innerHTML = 'Cost: ' + shorten(player.fourthCost);
  updateMoney();
  updateDimensions();
  document.getElementById("fifthRow").style.visibility="visible";
  }
}

document.getElementById("fifth").onclick = function() {
	if (player.money >= player.fifthCost) {
	player.fifthAmount++;
  player.money -= player.fifthCost;
  if (player.fifthBought == 9) {
  player.fifthBought = 0
  player.fifthPow = player.fifthPow * 2
  player.fifthCost = player.fifthCost*1e7
  }
  else player.fifthBought++;
  updateCoinPerSec();
  var element = document.getElementById("fifth");
  element.innerHTML = 'Cost: ' + shorten(player.fifthCost);
  updateMoney();
  updateDimensions();
  document.getElementById("sixthRow").style.visibility = "visible";
  }
}

document.getElementById("sixth").onclick = function() {
	if (player.money >= player.sixthCost) {
	player.sixthAmount++;
  player.money -= player.sixthCost;
  if (player.sixthBought == 9) {
  player.sixthBought = 0
  player.sixthPow = player.sixthPow * 2
  player.sixthCost = player.sixthCost*1e8
  }
  else player.sixthBought++;
  updateCoinPerSec();
  var element = document.getElementById("sixth");
  element.innerHTML = 'Cost: ' + shorten(player.sixthCost);
  updateMoney();
  updateDimensions();
  document.getElementById("seventhRow").style.visibility = "visible";
  }
}

document.getElementById("seventh").onclick = function() {
	if (player.money >= player.seventhCost) {
	player.seventhAmount++;
  player.money -= player.seventhCost;
  if (player.seventhBought == 9) {
  player.seventhBought = 0
  player.seventhPow = player.seventhPow * 2
  player.seventhCost = player.seventhCost*1e9
  }
  else player.seventhBought++;
  updateCoinPerSec();
  var element = document.getElementById("seventh");
  element.innerHTML = 'Cost: ' + shorten(player.seventhCost);
  updateMoney();
  updateDimensions();
  document.getElementById("eightRow").style.visibility = "visible";
  }
}

document.getElementById("eight").onclick = function() {
	if (player.money >= player.eightCost) {
	player.eightAmount++;
  player.money -= player.eightCost;
  if (player.eightBought == 9) {
  player.eightBought = 0
  player.eightPow = player.eightPow * 2
  player.eightCost = player.eightCost*1e10
  }
  else player.eightBought++;
  updateCoinPerSec();
  var element = document.getElementById("eight");
  element.innerHTML = 'Cost: ' + shorten(player.eightCost);
  updateMoney();
  updateDimensions();
  }
}

document.getElementById("reset").onclick = function() {
	if(confirm("Do you really want to erase all your progress?")) {
  set_cookie('dimensionSave', defaultStart)
  load_game();
  updateCosts();
  clearInterval(player.interval)
	updateInterval();
	updateDimensions();
  document.getElementById("secondRow").style.visibility = "hidden";
  document.getElementById("thirdRow").style.visibility = "hidden";
  document.getElementById("tickSpeed").style.visibility = "hidden";
 	document.getElementById("tickLabel").style.visibility = "hidden";
 	document.getElementById("tickSpeedAmount").style.visibility = "hidden";
  document.getElementById("fourthRow").style.visibility = "hidden";
  document.getElementById("fifthRow").style.visibility = "hidden";
  document.getElementById("sixthRow").style.visibility = "hidden";
  document.getElementById("seventhRow").style.visibility = "hidden";
  document.getElementById("eightRow").style.visibility = "hidden";
  }
}

load_game();
setInterval(function() {
	player.money += player.firstAmount*player.firstPow/(player.tickspeed/100);
  updateMoney();
  updateCoinPerSec();
}, 100);

setInterval(function () { save_game(); }, 10000);
updateCosts();
updateInterval();
updateDimensions();
