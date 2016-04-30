var money = 10;
var tickSpeedCost = 1000;
var tickspeed = 1000;
var firstCost = 10;
var secondCost = 100;
var thirdCost = 10000;
var fourthCost = 1000000;
var firstAmount = 0;
var secondAmount = 0;
var thirdAmount = 0;
var fourthAmount = 0;
var interval;
function updateMoney() {
	var element = document.getElementById("coinAmount");
  element.innerHTML = 'You have ' + shorten(Math.round(money * 10) /10) + ' antimatter.'
}

function updateCoinPerSec() {
	var element = document.getElementById("coinsPerSec")
  element.innerHTML = 'You are getting ' + shorten(Math.round(firstAmount*(1000/tickspeed)*10)/10) + ' antimatter per second.'
}

function updateDimensions() {
	document.getElementById("firstAmount").innerHTML = shorten(firstAmount);
  document.getElementById("secondAmount").innerHTML = shorten(secondAmount);
  document.getElementById("thirdAmount").innerHTML = shorten(thirdAmount);
  document.getElementById("fourthAmount").innerHTML = shorten(fourthAmount);
}

function updateInterval() {
clearInterval(interval)
interval = setInterval(function() {
	firstAmount += secondAmount;
  secondAmount += thirdAmount;
  thirdAmount += fourthAmount;
  updateDimensions();
}, tickspeed*10);
}

function updateCosts() {
document.getElementById("third").innerHTML = 'Cost ' + shorten(thirdCost)
document.getElementById("fourth").innerHTML = 'Cost ' + shorten(fourthCost)
}

function shorten(x) {
if (x < 1000) return x;
else if (x < 1000000) return Math.round(x/1000 * 100)/100 + ' K';
else if (x < 1000000000) return Math.round(x/1000000 * 100)/100 + ' M';
else if (x < 1000000000000) return Math.round(x/1000000000 * 100)/100 + ' B';
}

document.getElementById("tickSpeed").onclick = function() {
	if (money >= tickSpeedCost) {
  money -= tickSpeedCost;
  tickspeed = tickspeed * .9;
  tickSpeedCost = tickSpeedCost*5;
  document.getElementById("tickSpeedAmount").innerHTML = 'Tickspeed: ' + tickspeed;
  document.getElementById("tickSpeed").innerHTML = 'Cost: ' + shorten(tickSpeedCost);
  updateMoney();
  updateInterval();
  }
}

document.getElementById("first").onclick = function() {
	if (money >= firstCost) {
	firstAmount++;
  money -= firstCost;
  firstCost = Math.round(firstCost*1.15 * 10) / 10;
  updateCoinPerSec();
  var element = document.getElementById("first");
  element.innerHTML = 'Cost: ' + shorten(firstCost);
  updateMoney();
  document.getElementById("firstAmount").innerHTML = firstAmount;
  }
}

document.getElementById("second").onclick = function() {
	if (money >= secondCost) {
	secondAmount++;
  money -= secondCost;
  secondCost = Math.round(secondCost*1.15 * 10) / 10;
  updateCoinPerSec();
  var element = document.getElementById("second");
  element.innerHTML = 'Cost: ' + shorten(secondCost);
  updateMoney();
  document.getElementById("secondAmount").innerHTML = secondAmount;
  }
}

document.getElementById("third").onclick = function() {
  if (money >= thirdCost) {
    thirdAmount++;
    money -= thirdCost;
    thirdCost = Math.round(thirdCost * 1.15 * 10) / 10;
    updateCoinPerSec();
    var element = document.getElementById("third");
    element.innerHTML = 'Cost: ' + shorten(thirdCost);
    updateMoney();
    document.getElementById("thirdAmount").innerHTML = thirdAmount;
  }
}

document.getElementById("fourth").onclick = function() {
  if (money >= fourthCost) {
    fourthAmount++;
    money -= fourthCost;
    fourthCost = Math.round(fourthCost * 1.15 * 10) / 10;
    updateCoinPerSec();
    var element = document.getElementById("fourth");
    element.innerHTML = 'Fourth Dimension: ' + shorten(fourthCost);
    updateMoney();
    document.getElementById("fourthAmount").innerHTML = fourthAmount;
  }
}

setInterval(function() {
	money += firstAmount/(tickspeed/100);
  updateMoney();
  updateCoinPerSec();;
}, 100);

updateCosts();
updateInterval();
