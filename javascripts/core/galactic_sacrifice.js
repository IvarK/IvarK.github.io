function getGSAmount() {
  let galaxies = player.galaxies + player.replicanti.galaxies + player.dilation.freeGalaxies;
  let ret = new Decimal(Math.max(Math.pow(galaxies,1.5) * (player.resets - (player.currentChallenge=="challenge4"?2:4)), 0));
  ret = ret.times(1 + player.eightAmount/50)
  if (player.galacticSacrifice.upgrades.includes(32)) {
    return ret.times(galUpgrade32()).floor();
  } else {
    return ret.floor();
  }
}

function decreaseDimCosts () {
  if (player.galacticSacrifice.upgrades.includes(11)) {
    TIER_NAMES.forEach(function(name)  {
        if (name !== null) player[name+"Cost"] = player[name+"Cost"].div(galUpgrade11())
    });
  }
}

let galUpgrade11 = function () {
  let x = player.infinitied;
  let y;
  if (x === 0) {
    y = 2;
  } else if (x < 5) {
    y = x + 2;
  } else if (x < 100) {
    y = Math.pow(x + 5, .5) + 5;
  } else {
    y = Math.pow(Math.log(x), Math.log(x) / 10) + 15;
  }
  return Decimal.pow(10, y);
}

let galUpgrade12 = function () {
  return 2 * Math.pow(1 + (Date.now() - player.galacticSacrifice.last) / 60000, 0.5);
}

let galUpgrade13 = function () {
  return Math.pow(1 + player.galacticSacrifice.galaxyPoints / 5, 3);
}

let galUpgrade23 = function () {
  return Math.max(Math.min(2 + Math.log10(player.galacticSacrifice.galaxyPoints)*1.5, 10), 2);
}

let galUpgrade32 = function () {
  return (player.totalmoney || player.money).pow(0.003).add(1);
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
  document.getElementById('galspan32').innerHTML = galUpgrade32().toFixed(2);
  document.getElementById('galspan33').innerHTML = (galUpgrade33()/2).toFixed(2);
  document.getElementById("galcost33").innerHTML = shortenCosts(1e3);
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
    if (i == 11) {
      TIER_NAMES.forEach(function(name) {
          if (name !== null) player[name+"Cost"] = player[name+"Cost"].div(100)
      })
    }
    return true;
  }
}
