function getGSAmount() {
  let galaxies = player.galaxies + player.replicanti.galaxies + player.dilation.freeGalaxies;
  let y = 1.5 + Math.max(0, 0.05*(galaxies - 10)) + 0.005 * Math.pow(Math.max(0, galaxies-30) , 2) + 0.0005 * Math.pow(Math.max(0, galaxies-50) , 3);
  if (!player.challenges.includes("postc1")) y = 1.5
  if (y>100) y = Math.pow(316.22*y,1/3)
  else if (y>10) y = Math.pow(10*y , .5)
  let ret = new Decimal(Math.max(Math.pow(galaxies, y) * (player.resets - (player.currentChallenge=="challenge4"?2:4)), 0));
  ret = ret.times(1 + player.eightAmount/50)
  if (player.galacticSacrifice.upgrades.includes(32)) {
    ret = ret.times(galUpgrade32());
  }
  if (player.infinityUpgrades.includes("galPointMult")) {
    ret = ret.times(getPost01Mult())
  }
  if (player.achievements.includes('r37')) {
    ret = ret.times(thatsFastReward());
  }
  if (player.achievements.includes("r62")) ret = ret.times(Math.max(1, player.infinityPoints.log10()))
  return ret.floor();
}

function thatsFastReward () {
  if (player.bestInfinityTime >= 18000) {
    return Math.max(180000 / player.bestInfinityTime, 1);
  } else {
    return 10 * (1 + Math.pow(Math.log10(18000 / player.bestInfinityTime), 2));
  }
}

function getPost01Mult() {
  return Math.min(Math.pow(player.infinitied + 1, .3), Math.pow(Math.log(player.infinitied + 3), 3))
}

function decreaseDimCosts () {
  if (player.galacticSacrifice.upgrades.includes(11)) {
    let upg = galUpgrade11();
    TIER_NAMES.forEach(function(name) {
        if (name !== null) player[name+"Cost"] = player[name+"Cost"].div(upg)
    });
    if (player.achievements.includes('r48')) player.tickSpeedCost = player.tickSpeedCost.div(upg)
  } else if (player.achievements.includes('r21') && !player.galacticSacrifice.upgrades.includes(11)) {
    TIER_NAMES.forEach(function(name)  {
        if (name !== null) player[name+"Cost"] = player[name+"Cost"].div(10)
    });
    if (player.achievements.includes('r48')) player.tickSpeedCost = player.tickSpeedCost.div(10)
  }
}

let galUpgrade11 = function () {
  let x = player.infinitied;
  let y;
  let z = 10
  if (player.challenges.length > 14) z -= (player.challenges.length-8)/3
  if (x <= 0) {
    y = 2;
  } else if (x < 5) {
    y = x + 2;
  } else if (x < 100) {
    y = Math.pow(x + 5, .5) + 4;
  } else {
    y = Math.pow(Math.log(x), Math.log(x) / z) + 14;
  }
  return Decimal.pow(10, y);
}

let galUpgrade12 = function () {
  return 2 * Math.pow(1 + Math.max(0,(Date.now() - player.galacticSacrifice.last)) / 60000, 0.5);
}

let galUpgrade13 = function () {
  return player.galacticSacrifice.galaxyPoints.div(5).plus(1).pow(3);
}

let galUpgrade23 = function () {
  return Math.max(2 + Math.log10(player.galacticSacrifice.galaxyPoints)*1.5, 2);
}

let galUpgrade31 = function () {
  return 1.1 + .02 * player.extraDimPowerIncrease;
}

let galUpgrade32 = function () {
  let x = (player.totalmoney || player.money);
  if (!player.break) {
    x = x.min(Number.MAX_VALUE);
  }
  return x.pow(0.003).add(1);
}

let galUpgrade33 = function () {
  return Math.max(2 + Math.log10(player.galacticSacrifice.galaxyPoints)*0.5, 2)
}

function galacticSacrifice() {
    let gsAmount = getGSAmount();
    if (gsAmount.lt(1)) return false
    player.galaxies = -1
    player.galacticSacrifice.galaxyPoints = player.galacticSacrifice.galaxyPoints.plus(gsAmount);
    player.galacticSacrifice.times++;
    player.galacticSacrifice.last = Date.now();
    galaxyReset()
}

function GSUnlocked() {
    return player.galacticSacrifice && player.galacticSacrifice.times > 0;
}

function galacticUpgradeSpanDisplay () {
  document.getElementById('galspan11').innerHTML = shortenDimensions(galUpgrade11());
  document.getElementById('galspan12').innerHTML = galUpgrade12().toFixed(2);
  document.getElementById('galspan13').innerHTML = formatValue(player.options.notation, galUpgrade13(), 2, 2);
  document.getElementById('galspan23').innerHTML = (galUpgrade23()/2).toFixed(2);
  document.getElementById('galspan31').innerHTML = galUpgrade31().toFixed(2);
  document.getElementById('galspan32').innerHTML = formatValue(player.options.notation, galUpgrade32(), 2, 2);
  document.getElementById('galspan33').innerHTML = (galUpgrade33()/2).toFixed(2);
  document.getElementById("galcost33").innerHTML = shortenCosts(1e3);
}

function newGalacticDataOnInfinity () {
  if (player.achievements.includes('r36')) {
    return {
      galaxyPoints: player.galacticSacrifice.galaxyPoints.plus(getGSAmount()),
      last: Date.now(),
      times: player.galacticSacrifice.times,
      upgrades: player.galacticSacrifice.upgrades
    }
  } else {
    return {
      galaxyPoints: new Decimal(0),
      last: Date.now(),
      times: 0,
      upgrades: []
    }
  }
}

let galUpgradeCosts = {
  11: 1,
  12: 3,
  13: 20,
  21: 1,
  22: 5,
  23: 100,
  31: 2,
  32: 8,
  33: 1000
}

function canBuyGalUpgrade(num) {
    return !player.galacticSacrifice.upgrades.includes(num) &&
    player.galacticSacrifice.galaxyPoints.gte(galUpgradeCosts[num]) &&
    (Math.floor(num / 10) === 1 || player.galacticSacrifice.upgrades.includes(num - 10));
}

function galacticUpgradeButtonTypeDisplay () {
  for (let i = 1; i <= 3; i++) {
    for (let j = 1; j <= 3; j++) {
      let e = document.getElementById('galaxy' + i + j);
      let num = +(i + '' + j);
      if (player.galacticSacrifice.upgrades.includes(num)) {
        e.className = 'infinistorebtnbought'
      } else if (canBuyGalUpgrade(num)) {
        e.className = 'infinistorebtn' + j;
      } else {
        e.className = 'infinistorebtnlocked'
      }
    }
  }
}

function buyGalaxyUpgrade (i) {
  if (!canBuyGalUpgrade(i)) {
    return false;
  } else {
    player.galacticSacrifice.upgrades.push(i);
    player.galacticSacrifice.galaxyPoints = player.galacticSacrifice.galaxyPoints.minus(galUpgradeCosts[i]);
    if (i == 11) {
      TIER_NAMES.forEach(function(name) {
          if (name !== null) player[name+"Cost"] = player[name+"Cost"].div(100)
      })
    }
    return true;
  }
}
