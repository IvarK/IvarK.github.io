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
	interval: null
};
var defaultStart = player
var firstButton = document.getElementById("first")
var secondButton = document.getElementById("second")
var thirdButton = document.getElementById("third")
var fourthButton = document.getElementById("fourth")
var fifthButton = document.getElementById("fifth")
var sixthButton = document.getElementById("sixth")
var seventhButton = document.getElementById("seventh")
var eightButton = document.getElementById("eight")
var tickSpeedButton = document.getElementById("tickSpeed")

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
	document.getElementById("firstAmount").innerHTML = shorten(player.firstAmount) + ' (' + player.firstBought + ')';
  document.getElementById("secondAmount").innerHTML = shorten(player.secondAmount) + ' (' + player.secondBought + ')';
  document.getElementById("thirdAmount").innerHTML = shorten(player.thirdAmount) + ' (' + player.thirdBought + ')';
  document.getElementById("fourthAmount").innerHTML = shorten(player.fourthAmount) + ' (' + player.fourthBought + ')';
  document.getElementById("fifthAmount").innerHTML = shorten(player.fifthAmount) + ' (' + player.fifthBought + ')';
  document.getElementById("sixthAmount").innerHTML = shorten(player.sixthAmount) + ' (' + player.sixthBought + ')';
  document.getElementById("seventhAmount").innerHTML = shorten(player.seventhAmount) + ' (' + player.seventhBought + ')';
  document.getElementById("eightAmount").innerHTML = shorten(player.eightAmount) + ' (' + player.eightBought + ')';
  document.getElementById("firstD").innerHTML = 'First Dimension  ' +  'x' + player.firstPow
  document.getElementById("secondD").innerHTML = 'Second Dimension  ' +  'x' + player.secondPow
  document.getElementById("thirdD").innerHTML = 'Third Dimension  ' +  'x' + player.thirdPow
  document.getElementById("fourthD").innerHTML = 'Fourth Dimension  ' +  'x' + player.fourthPow
  document.getElementById("fifthD").innerHTML = 'Fifth Dimension  ' +  'x' + player.fifthPow
  document.getElementById("sixthD").innerHTML = 'Sixth Dimension  ' +  'x' + player.sixthPow
  document.getElementById("seventhD").innerHTML = 'Seventh Dimension  ' +  'x' + player.seventhPow
  document.getElementById("eightD").innerHTML = 'Eight Dimension  ' +  'x' + player.eightPow
  if (player.resets == 0) document.getElementById("resetLabel").innerHTML = 'Soft Reset: requires 20 Fourth Dimension'
  
 
  	if (player.resets > 0) {
    document.getElementById("resetLabel").innerHTML = 'Soft Reset: requires 20 Fifth Dimension'
    }
  	if (player.resets > 1) {
    document.getElementById("resetLabel").innerHTML = 'Soft Reset: requires 20 Sixth Dimension'
  }

  	if (player.resets > 2) {
    document.getElementById("resetLabel").innerHTML = 'Soft Reset: requires 20 Seventh Dimension'
  }
  	if (player.resets > 3) {
    document.getElementById("resetLabel").innerHTML = 'Soft Reset: requires 20 Eight Dimension'
    
  }
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

function updateTickSpeed() {
	if (player.tickspeed <= 100) document.getElementById("tickSpeedAmount").innerHTML = 'Tickspeed: ' + Math.round(player.tickspeed*10)  + ' x10';
  	else if (player.tickspeed <= 10) document.getElementById("tickSpeedAmount").innerHTML = 'Tickspeed: ' + Math.round(player.tickspeed*100)  + ' x100';
  	else document.getElementById("tickSpeedAmount").innerHTML = 'Tickspeed: ' + Math.round(player.tickspeed);
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
	fifthPow: 1,
	sixthPow: 1,
	seventhPow: 1,
	eightPow: 1,
  resets: player.resets,
	interval: null
};
player.resets++;
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
  updateTickSpeed();
  updateCosts();
}


function shorten(x) {
if (x < 1000) return Math.floor(x);
else if (Math.log10(x) < 6) return Math.round(x/1000 * 100)/100 + ' K';
else if (Math.log10(x) < 9) return Math.round(x/1000000 * 100)/100 + ' M';
else if (Math.log10(x) < 12) return Math.round(x/1000000000 * 100)/100 + ' B';
else if (Math.log10(x) < 15) return Math.round(x/1e12 * 100)/100 + ' T'
else if (Math.log10(x) < 18) return Math.round(x/1e15 * 100)/100 + ' Qd'
else if (Math.log10(x) < 21) return Math.round(x/1e18 * 100)/100 + ' Qt'
else if (Math.log10(x) < 24) return Math.round(x/1e21 * 100)/100 + ' Sx'
else if (Math.log10(x) < 27) return Math.round(x/1e24 * 100)/100 + ' Sp'
else if (Math.log10(x) < 30) return Math.round(x/1e27 * 100)/100 + ' Oc'
else if (Math.log10(x) < 33) return Math.round(x/1e30 * 100)/100 + ' No'
else if (Math.log10(x) < 36) return Math.round(x/1e33 * 100)/100 + ' Dc'
else if (Math.log10(x) < 39) return Math.round(x/1e36 * 100)/100 + ' UDc'
else if (Math.log10(x) < 42) return Math.round(x/1e39 * 100)/100 + ' DDc'
else if (Math.log10(x) < 45) return Math.round(x/1e42 * 100)/100 + ' TDc'
else if (Math.log10(x) < 48) return Math.round(x/1e45 * 100)/100 + ' QdDc'
else if (Math.log10(x) < 51) return Math.round(x/1e48 * 100)/100 + ' QtDc'
else if (Math.log10(x) < 54) return Math.round(x/1e51 * 100)/100 + ' SxDc'
else if (Math.log10(x) < 57) return Math.round(x/1e54 * 100)/100 + ' SpDc'
else if (Math.log10(x) < 60) return Math.round(x/1e57 * 100)/100 + ' ODc'
else if (Math.log10(x) < 63) return Math.round(x/1e60 * 100)/100 + ' NDc'
else if (Math.log10(x) < 66) return Math.round(x/1e63 * 100)/100 + ' Vg'
else if (Math.log10(x) < 69) return Math.round(x/1e66 * 100)/100 + ' UVg'
else if (Math.log10(x) < 72) return Math.round(x/1e69 * 100)/100 + ' DVg'
else if (Math.log10(x) < 75) return Math.round(x/1e72 * 100)/100 + ' TVg'
else if (Math.log10(x) < 78) return Math.round(x/1e75 * 100)/100 + ' QdVg'
else if (Math.log10(x) < 81) return Math.round(x/1e78 * 100)/100 + ' QtVg'
else if (Math.log10(x) < 84) return Math.round(x/1e81 * 100)/100 + ' SxVg'
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
else if (x < 1e51) return (x/1e48).toFixed(2) + ' QtDc'
else if (x < 1e54) return (x/1e51).toFixed(2) + ' SxDc'
else if (x < 1e57) return (x/1e54).toFixed(2) + ' SpDc'
else if (x < 1e60) return (x/1e57).toFixed(2) + ' ODc'
else if (x < 1e63) return (x/1e60).toFixed(2) + ' NDc'
else if (x < 1e66) return (x/1e63).toFixed(2) + ' Vg'
else if (x < 1e69) return (x/1e66).toFixed(2) + ' UVg'
else if (x < 1e72) return (x/1e69).toFixed(2) + ' DVg'
else if (x < 1e75) return (x/1e72).toFixed(2) + ' TVg'
else if (x < 1e78) return (x/1e75).toFixed(2) + ' QdVg'
else if (x < 1e81) return (x/1e78).toFixed(2) + ' QtVg'
else if (x < 1e84) return (x/1e81).toFixed(2) + ' SxVg'
}

document.getElementById("tickSpeed").onclick = function() {
	if (player.money >= player.tickSpeedCost) {
  player.money -= player.tickSpeedCost;
  player.tickspeed = player.tickspeed * .9;
  player.tickSpeedCost = player.tickSpeedCost*10;
  document.getElementById("tickSpeed").innerHTML = 'Cost: ' + shorten(player.tickSpeedCost);
  updateTickSpeed();
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
  if (player.resets > 0) document.getElementById("fifthRow").style.visibility="visible";
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
  if (player.resets > 1) document.getElementById("sixthRow").style.visibility = "visible";
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
  if (player.resets > 2) document.getElementById("seventhRow").style.visibility = "visible";
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
  if (player.resets > 3) document.getElementById("eightRow").style.visibility = "visible";
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

document.getElementById("softReset").onclick = function() {
   if (player.resets == 1) {
  	if (player.fifthAmount >= 20) {
    softReset();
    document.getElementById("resetLabel").innerHTML = 'Soft Reset: requires 20 Sixth Dimension'
    }
  }
  else if (player.resets == 2) {
  	if (player.sixthAmount >= 20) {
    softReset();
    document.getElementById("resetLabel").innerHTML = 'Soft Reset: requires 20 Seventh Dimension'
    }
  }
  else if (player.resets == 3) {
  	if (player.seventhAmount >= 20) {
    softReset();
    document.getElementById("resetLabel").innerHTML = 'Soft Reset: requires 20 Eight Dimension'
    }
  }
  else if (player.fourthAmount >= 20) {
    softReset();
    document.getElementById("resetLabel").innerHTML = 'Soft Reset: requires 20 Fifth Dimension'
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
  updateTickSpeed();
  }
}

load_game();
setInterval(function() {
	player.money += player.firstAmount*player.firstPow/(player.tickspeed/100);
  updateMoney();
  updateCoinPerSec();
  if (player.firstCost > player.money) firstButton.className = 'unavailablebtn'
  else firstButton.className = 'storebtn'
  if (player.secondCost > player.money) secondButton.className = 'unavailablebtn'
  else secondButton.className = 'storebtn'
  if (player.thirdCost > player.money) thirdButton.className = 'unavailablebtn'
  else thirdButton.className = 'storebtn'
  if (player.fourthCost > player.money) fourthButton.className = 'unavailablebtn'
  else fourthButton.className = 'storebtn'
  if (player.fifthCost > player.money) fifthButton.className = 'unavailablebtn'
  else fifthButton.className = 'storebtn'
  if (player.sixthCost > player.money) sixthButton.className = 'unavailablebtn'
  else sixthButton.className = 'storebtn'
  if (player.seventhCost > player.money) seventhButton.className = 'unavailablebtn'
  else seventhButton.className = 'storebtn'
  if (player.eightCost > player.money) eightButton.className = 'unavailablebtn'
  else eightButton.className = 'storebtn'
  if (player.tickSpeedCost > player.money) tickSpeedButton.className = 'unavailablebtn'
  else tickSpeedButton.className = 'storebtn'
}, 100);

setInterval(function () { save_game(); }, 10000);
updateCosts();
updateInterval();
updateDimensions();
updateTickSpeed();
