function getGSAmount() {
  let galaxies = player.galaxies + player.replicanti.galaxies + player.dilation.freeGalaxies;
  let ret = new Decimal(galaxies * player.eightAmount.div(50).toNumber());
  if (player.galacticSacrifice.upgrades.includes(32)) {
    return ret.times(galUpgrade32()).floor();
  } else {
    return ret.floor();
  }
}

let galUpgrade12 = function () {
  return Math.pow(1 + (Date.now() - player.galacticSacrifice.last) / 60000, 0.5);
}

let galUpgrade13 = function () {
  return 1 + player.galacticSacrifice.galaxyPoints / 5;
}

let galUpgrade23 = function () {
  return 2 + player.galacticSacrifice.galaxyPoints / 50;
}

let galUpgrade32 = function () {
  return (player.totalmoney || player.money).pow(0.003);
}

let galUpgrade33 = function () {
  return 2 + player.galacticSacrifice.galaxyPoints / 200;
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
  document.getElementById('galspan12').innerHTML = galUpgrade12().toFixed(2);
  document.getElementById('galspan13').innerHTML = galUpgrade13().toFixed(2);
  document.getElementById('galspan23').innerHTML = galUpgrade23().toFixed(2);
  document.getElementById('galspan32').innerHTML = galUpgrade32().toFixed(2);
  document.getElementById('galspan33').innerHTML = galUpgrade33().toFixed(2);
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

function galacticUpgradeButtonTypeDisplay () {
  for (let i = 1; i <= 3; i++) {
    for (let j = 1; j <= 3; j++) {
      let e = document.getElementById('galaxy' + i + j);
      if (player.galacticSacrifice.upgrades.includes(+(i + '' + j))) {
        e.className = 'infinistorebtnbought'
      } else if (player.galacticSacrifice.galaxyPoints.gte(galUpgradeCosts[i + '' + j]) && (i === 1 || player.galacticSacrifice.upgrades.includes(+((i - 1) + '' + j)))) {
        e.className = 'infinistorebtn' + j;
      } else {
        e.className = 'infinistorebtnlocked'
      }
    }
  }
}

function buyGalaxyUpgrade (i) {
  if (player.galacticSacrifice.upgrades.includes(i) || player.galacticSacrifice.galaxyPoints.lt(galUpgradeCosts[i])) {
    return false;
  } else {
    player.galacticSacrifice.upgrades.push(i);
    player.galacticSacrifice.galaxyPoints = player.galacticSacrifice.galaxyPoints.minus(galUpgradeCosts[i]);
    return true;
  }
}
