var money = 1e30;
var tickSpeedCost = 1000;
var tickspeed = 1000;
var firstCost = 10;
var secondCost = 100;
var thirdCost = 10000;
var fourthCost = 1000000;
var fifthCost = 1e9;
var sixthCost = 1e13;
var seventhCost = 1e18;
var eightCost = 1e24;
var firstAmount = 0;
var secondAmount = 0;
var thirdAmount = 0;
var fourthAmount = 0;
var firstBought = 0;
var secondBought = 0;
var thirdBought = 0;
var fourthBought = 0;
var fifthAmount = 0;
var sixthAmount = 0;
var seventhAmount = 0;
var eightAmount = 0;
var fifthBought = 0;
var sixthBought = 0;
var seventhBought = 0;
var eightBought = 0;
var firstPow = 1
var secondPow = 1
var thirdPow = 1
var fourthPow = 1
var fifthPow = 1
var sixthPow = 1
var seventhPow = 1
var eightPow = 1
var interval;
var firstButton = document.getElementById("first")
var secondButton = document.getElementById("second")
var thirdButton = document.getElementById("third")
var fourthButton = document.getElementById("fourth")
function updateMoney() {
	var element = document.getElementById("coinAmount");
  element.innerHTML = 'You have ' + shorten(Math.round(money * 10) /10) + ' antimatter.'
}

function updateCoinPerSec() {
	var element = document.getElementById("coinsPerSec")
  element.innerHTML = 'You are getting ' + shorten(Math.round(firstAmount* firstPow*(1000/tickspeed)*10)/10) + ' antimatter per second.'
}

function updateDimensions() {
	document.getElementById("firstAmount").innerHTML = 'x' + firstPow + '  ' + shorten(firstAmount) + ' (' + firstBought + ')';
  document.getElementById("secondAmount").innerHTML = 'x' + secondPow + '  ' + shorten(secondAmount) + ' (' + secondBought + ')';
  document.getElementById("thirdAmount").innerHTML = 'x' + thirdPow + '  ' + shorten(thirdAmount) + ' (' + thirdBought + ')';
  document.getElementById("fourthAmount").innerHTML = 'x' + fourthPow + '  ' + shorten(fourthAmount) + ' (' + fourthBought + ')';
  	document.getElementById("fifthAmount").innerHTML = 'x' + fifthPow + '  ' + shorten(fifthAmount) + ' (' + fifthBought + ')';
  document.getElementById("sixthAmount").innerHTML = 'x' + sixthPow + '  ' + shorten(sixthAmount) + ' (' + sixthBought + ')';
  document.getElementById("seventhAmount").innerHTML = 'x' + seventhPow + '  ' + shorten(seventhAmount) + ' (' + seventhBought + ')';
  document.getElementById("eightAmount").innerHTML = 'x' + eightPow + '  ' + shorten(eightAmount) + ' (' + eightBought + ')';
}

function updateInterval() {
clearInterval(interval)
interval = setInterval(function() {
	firstAmount += secondAmount * secondPow;
  secondAmount += thirdAmount * thirdPow;
  thirdAmount += fourthAmount * fourthPow;
  fourthAmount += fifthAmount * fifthPow;
  fifthAmount += sixthAmount * sixthPow;
  sixthAmount += seventhAmount * seventhPow;
  seventhAmount += eightAmount * eightPow;
  updateDimensions();
}, tickspeed*10);
}

function updateCosts() {
document.getElementById("third").innerHTML = 'Cost: ' + shorten(thirdCost)
document.getElementById("fourth").innerHTML = 'Cost: ' + shorten(fourthCost)
document.getElementById("fifth").innerHTML = 'Cost: ' + shorten(fifthCost)
document.getElementById("sixth").innerHTML = 'Cost: ' + shorten(sixthCost)
document.getElementById("seventh").innerHTML = 'Cost: ' + shorten(seventhCost)
document.getElementById("eight").innerHTML = 'Cost: ' + shorten(eightCost)
}


function shorten(x) {
if (x < 1000) return x;
else if (x < 1000000) return Math.round(x/1000 * 100)/100 + ' K';
else if (x < 1000000000) return Math.round(x/1000000 * 100)/100 + ' M';
else if (x < 1000000000000) return Math.round(x/1000000000 * 100)/100 + ' B';
else if (x < 1e15) return Math.round(x/1e12 * 100)/100 + ' T'
else if (x < 1e18) return Math.round(x/1e15 * 100)/100 + ' Qd'
else if (x < 1e21) return Math.round(x/1e18 * 100)/100 + ' Qt'
else if (x < 1e24) return Math.round(x/1e21 * 100)/100 + ' Sx'
else if (x < 1e27) return Math.round(x/1e24 * 100)/100 + ' Sp'
else if (x < 1e30) return Math.round(x/1e27 * 100)/100 + ' Oc'
else if (x < 1e33) return Math.round(x/1e30 * 100)/100 + ' No'
else if (x < 1e36) return Math.round(x/1e33 * 100)/100 + ' Dc'
else if (x < 1e39) return Math.round(x/1e36 * 100)/100 + ' UDc'
else if (x < 1e42) return Math.round(x/1e39 * 100)/100 + ' DDc'
else if (x < 1e45) return Math.round(x/1e42 * 100)/100 + ' TDc'
else if (x < 1e48) return Math.round(x/1e45 * 100)/100 + ' QdDc'
}

document.getElementById("tickSpeed").onclick = function() {
	if (money >= tickSpeedCost) {
  money -= tickSpeedCost;
  tickspeed = tickspeed * .9;
  tickSpeedCost = tickSpeedCost*5;
  document.getElementById("tickSpeedAmount").innerHTML = 'Tickspeed: ' + Math.round(tickspeed);
  document.getElementById("tickSpeed").innerHTML = 'Cost: ' + shorten(tickSpeedCost);
  updateMoney();
  updateInterval();
  }
}

document.getElementById("first").onclick = function() {
	if (money >= firstCost) {
	firstAmount++;
  money -= firstCost;
  if (firstBought == 9) {
  firstBought = 0
  firstPow = firstPow * 2
  firstCost = firstCost*100
  }
  else firstBought++;
  updateCoinPerSec();
  var element = document.getElementById("first");
  element.innerHTML = 'Cost: ' + shorten(firstCost);
  updateMoney();
  updateDimensions();
  document.getElementById("secondRow").style.visibility = "visible";
  }
}

document.getElementById("second").onclick = function() {
	if (money >= secondCost) {
	secondAmount++;
  money -= secondCost;
  if (secondBought == 9) {
  secondBought = 0
  secondPow = secondPow * 2
  secondCost = secondCost*1000
  }
  else secondBought++;
  updateCoinPerSec();
  var element = document.getElementById("second");
  element.innerHTML = 'Cost: ' + shorten(secondCost);
  updateMoney();
  updateDimensions();
  document.getElementById("thirdRow").style.visibility = "visible";
  document.getElementById("tickSpeed").style.visibility = "visible";
  document.getElementById("tickLabel").style.visibility = "visible";
  document.getElementById("tickSpeedAmount").style.visibility = "visible";
  }
}

document.getElementById("third").onclick = function() {
	if (money >= thirdCost) {
	thirdAmount++;
  money -= thirdCost;
  if (thirdBought == 9) {
  thirdBought = 0
  thirdPow = thirdPow * 2
  thirdCost = thirdCost*10000
  }
  else thirdBought++;
  updateCoinPerSec();
  var element = document.getElementById("third");
  element.innerHTML = 'Cost: ' + shorten(thirdCost);
  updateMoney();
  updateDimensions();
  document.getElementById("fourthRow").style.visibility = "visible";
  }
}

document.getElementById("fourth").onclick = function() {
	if (money >= fourthCost) {
	fourthAmount++;
  money -= fourthCost;
  if (fourthBought == 9) {
  fourthBought = 0
  fourthPow = fourthPow * 2
  fourthCost = fourthCost*100000
  }
  else fourthBought++;
  updateCoinPerSec();
  var element = document.getElementById("fourth");
  element.innerHTML = 'Cost: ' + shorten(fourthCost);
  updateMoney();
  updateDimensions();
  document.getElementById("fifthRow").style.visibility="visible";
  }
}

document.getElementById("fifth").onclick = function() {
	if (money >= fifthCost) {
	fifthAmount++;
  money -= fifthCost;
  if (fifthBought == 9) {
  fifthBought = 0
  fifthPow = fifthPow * 2
  fifthCost = fifthCost*1e6
  }
  else fifthBought++;
  updateCoinPerSec();
  var element = document.getElementById("fifth");
  element.innerHTML = 'Cost: ' + shorten(fifthCost);
  updateMoney();
  updateDimensions();
  document.getElementById("sixthRow").style.visibility = "visible";
  }
}

document.getElementById("sixth").onclick = function() {
	if (money >= sixthCost) {
	sixthAmount++;
  money -= sixthCost;
  if (sixthBought == 9) {
  sixthBought = 0
  sixthPow = sixthPow * 2
  sixthCost = sixthCost*1e7
  }
  else sixthBought++;
  updateCoinPerSec();
  var element = document.getElementById("sixth");
  element.innerHTML = 'Cost: ' + shorten(sixthCost);
  updateMoney();
  updateDimensions();
  document.getElementById("seventhRow").style.visibility = "visible";
  }
}

document.getElementById("seventh").onclick = function() {
	if (money >= seventhCost) {
	seventhAmount++;
  money -= seventhCost;
  if (seventhBought == 9) {
  seventhBought = 0
  seventhPow = seventhPow * 2
  seventhCost = seventhCost*1e8
  }
  else seventhBought++;
  updateCoinPerSec();
  var element = document.getElementById("seventh");
  element.innerHTML = 'Cost: ' + shorten(seventhCost);
  updateMoney();
  updateDimensions();
  document.getElementById("eightRow").style.visibility = "visible";
  }
}

document.getElementById("eight").onclick = function() {
	if (money >= eightCost) {
	eightAmount++;
  money -= eightCost;
  if (eightBought == 9) {
  eightBought = 0
  eightPow = eightPow * 2
  eightCost = eightCost*1e9
  }
  else eightBought++;
  updateCoinPerSec();
  var element = document.getElementById("eight");
  element.innerHTML = 'Cost: ' + shorten(eightCost);
  updateMoney();
  updateDimensions();
  }
}


setInterval(function() {
	money += firstAmount*firstPow/(tickspeed/100);
  updateMoney();
  updateCoinPerSec();
  updateVisibility
}, 100);

updateCosts();
updateInterval();
updateDimensions();
