function canSeeTickSpeed() {
  return canBuyDimension(3);
}

function canBuyTickSpeed() {
  if (player.currentEternityChall == "eterc9") return false
  if (player.currentChallenge === "challenge14" && player.tickBoughtThisInf.current >= 308) return false
  return canSeeTickSpeed();
}

function getPurelyGalaxies (offset) {
    let galaxies = player.galaxies+player.replicanti.galaxies+player.dilation.freeGalaxies-offset;
    if (player.timestudy.studies.includes(133)) galaxies += player.replicanti.galaxies/2
    if (player.timestudy.studies.includes(132)) galaxies += player.replicanti.galaxies*0.4
    if (player.timestudy.studies.includes(225)) galaxies += Math.floor(player.replicanti.amount.e / 1000)
    if (player.timestudy.studies.includes(226)) galaxies += Math.floor(player.replicanti.gal / 15)
    galaxies += Math.min(player.replicanti.galaxies, player.replicanti.gal) * Math.max(Math.pow(Math.log10(player.infinityPower.plus(1).log10()+1), 0.03 * ECTimesCompleted("eterc8"))-1, 0)
    if (player.currentChallenge === 'challenge7') galaxies = Math.pow(galaxies, 2);
    return galaxies;
}

function getFinalGalaxies(offset) {
    let galaxies = getPurelyGalaxies(offset);
    if (player.galacticSacrifice.upgrades.includes(22)) galaxies *= 5;
    if (player.infinityUpgrades.includes("galaxyBoost")) galaxies *= 2;
    if (player.infinityUpgrades.includes("postGalaxy")) galaxies *= 1.7;
    if (player.challenges.length > 14) galaxies *= .07*player.challenges.length
    if (player.challenges.includes("postc7")) galaxies *= 1.3;
    if (player.achievements.includes("r86")) galaxies *= 1.05;
    if (player.achievements.includes("r83")) galaxies *= 1.05;
    if (player.achievements.includes("r45")) galaxies *= 1.02;
    if (player.infinityUpgrades.includes("postinfi51")) galaxies *= 1.2;
    if (player.timestudy.studies.includes(212)) galaxies *= Math.min(Math.pow(player.timeShards.max(2).log2(), 0.005), 1.1)
    if (player.timestudy.studies.includes(232)) galaxies *= Math.pow(1+player.galaxies/1000, 0.2)
    return galaxies;
}

function getTickSpeedMultiplier() {
  if (player.challenges.includes("postc3")) return Math.pow(.998, getFinalGalaxies(0))
  if (player.currentChallenge === "postc3") return Math.pow(.998, getFinalGalaxies(0))
  return 1;
}

function getPostC3RewardMult () {
  let perGalaxy = 0.005;
  if (player.challenges.length > 15) perGalaxy = -0.01+0.001*player.challenges.length
  let ret = 1.05+getFinalGalaxies(0)*perGalaxy;
  if (player.currentChallenge === "postc3") return 1;
  if (player.currentChallenge === 'challenge6' || player.currentChallenge === 'postc4') ret -= 0.05
  if (player.challenges.includes("postc7")) ret = Math.pow(ret,2)
  return ret;
}

function getTickSpeedCostMultiplierIncrease (adjust) {
  let ret = player.tickSpeedMultDecrease + (adjust || 0);
  if (player.currentChallenge === 'postc2') {
    ret = Math.pow(ret, .5);
  } else if (player.challenges.includes('postc2')) {
    ret = Math.pow(ret, .9);
    ret = Math.pow(ret, 1 / (1 + Math.pow(player.galaxies, 0.7) / 10));
  }
  return ret;
}

function buyTickSpeed() {
  if (!canBuyTickSpeed()) {
      return false;
  }

  if (!canAfford(player.tickSpeedCost)) {
      return false;
  }

  player.money = player.money.minus(player.tickSpeedCost);
  player.tickBoughtThisInf.current++;
  if (player.currentChallenge != "challenge5" && player.currentChallenge != "postc7") player.tickSpeedCost = player.tickSpeedCost.times(player.tickspeedMultiplier);
  else multiplySameCosts(player.tickSpeedCost)
  if (costIncreaseActive(player.tickSpeedCost)) player.tickspeedMultiplier = player.tickspeedMultiplier.times(getTickSpeedCostMultiplierIncrease());
  if (player.currentChallenge == "challenge2" || player.currentChallenge == "postc4") player.chall2Pow = 0
  player.tickspeed = player.tickspeed.times(getTickSpeedMultiplier());
  player.postC3Reward = player.postC3Reward.times(getPostC3RewardMult())
  postc10Mult = new Decimal(1)
  player.why = player.why + 1
  return true;
}

document.getElementById("tickSpeed").onclick = function () {
  buyTickSpeed();

  updateTickSpeed();
};

function buyMaxTickSpeed() {
  if (!canBuyTickSpeed()) return false
  var mult = getTickSpeedMultiplier()
  if (player.currentChallenge == "challenge2" || player.currentChallenge == "postc4") player.chall2Pow = 0
  if (player.currentChallenge == "challenge5" || player.currentChallenge == "postc7" || player.tickSpeedCost.lt(Number.MAX_VALUE) || player.tickSpeedMultDecrease > 2) {
      while (player.money.gte(player.tickSpeedCost) && canBuyTickSpeed() && (player.tickSpeedCost.lt(Number.MAX_VALUE) || player.tickSpeedMultDecrease > 2 || player.currentChallenge == "postc7")) {
          player.money = player.money.minus(player.tickSpeedCost);
          player.tickBoughtThisInf.current++;
          if (player.currentChallenge != "challenge5" && player.currentChallenge != "postc7") player.tickSpeedCost = player.tickSpeedCost.times(player.tickspeedMultiplier);
          else multiplySameCosts(player.tickSpeedCost)
          if (costIncreaseActive(player.tickSpeedCost)) player.tickspeedMultiplier = player.tickspeedMultiplier.times(getTickSpeedCostMultiplierIncrease());
          player.tickspeed = player.tickspeed.times(mult);
          player.postC3Reward = player.postC3Reward.times(getPostC3RewardMult())
          postc10Mult = new Decimal(1)
          if (costIncreaseActive(player.tickSpeedCost)) buyMaxTickSpeed()
      }
  } else {

      var a = Math.log10(Math.sqrt(getTickSpeedCostMultiplierIncrease()));
      var b = player.tickspeedMultiplier.dividedBy(Math.sqrt(getTickSpeedCostMultiplierIncrease())).log10()
      var c = player.tickSpeedCost.dividedBy(player.money).log10()
      var discriminant = Math.pow(b, 2) - (c *a* 4)
      if (discriminant < 0) return false
      var buying = Math.floor((Math.sqrt(Math.pow(b, 2) - (c *a *4))-b)/(2 * a))+1
      if (player.currentChallenge === 'challenge14') buying = Math.min(buying, 308 - player.tickBoughtThisInf.current);
      if (buying <= 0) return false
      player.tickspeed = player.tickspeed.times(Decimal.pow(mult, buying));
      player.tickBoughtThisInf.current += buying;
      player.postC3Reward = player.postC3Reward.times(Decimal.pow(getPostC3RewardMult(), buying))
      for (var i = 0; i<buying-1; i++) {
          player.tickSpeedCost = player.tickSpeedCost.times(player.tickspeedMultiplier)
          player.tickspeedMultiplier = player.tickspeedMultiplier.times(getTickSpeedCostMultiplierIncrease())
      }
      if (player.money.gte(player.tickSpeedCost)) player.money = player.money.minus(player.tickSpeedCost)
      player.tickSpeedCost = player.tickSpeedCost.times(player.tickspeedMultiplier)
      player.tickspeedMultiplier = player.tickspeedMultiplier.times(getTickSpeedCostMultiplierIncrease())
  }

  updateTickSpeed()
}


function updateTickSpeed() {
  var exp = player.tickspeed.e;
  if (exp > 1) {
      document.getElementById("tickSpeedAmount").textContent = 'Tickspeed: ' + player.tickspeed.toFixed(0);
  } else {
      document.getElementById("tickSpeedAmount").textContent = 'Tickspeed: ' + player.tickspeed.times(new Decimal(100).dividedBy(Decimal.pow(10, exp))).toFixed(0) + ' / ' + shorten(new Decimal(100).dividedBy(Decimal.pow(10, exp)));
  }
  document.getElementById("tickSpeedAmount").textContent += ', Tickspeed multiplier: ' + formatValue(player.options.notation, player.postC3Reward, 3, 3);
  document.getElementById("tickSpeedPurchases").textContent = 'You have ' + (308 - player.tickBoughtThisInf.current) + ' tickspeed purchases left.';
}
