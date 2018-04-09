function getDimensionFinalMultiplier(tier) {
  //if (player.currentEternityChall == "eterc3" && tier > 4) return new Decimal(0)
  var name = TIER_NAMES[tier];

  let multiplier = new Decimal(player[name + 'Pow']);

  if (player.currentEternityChall == "eterc11") return player.infinityPower.pow(7).max(1).times(getDimensionBoostPower().pow(player.resets - tier + 1).max(1))
  if (player.currentChallenge == "challenge7") {
      if (tier == 4) multiplier = multiplier.pow(1.4)
      if (tier == 2) multiplier = multiplier.pow(1.7)
  }

  multiplier = multiplier.times(player.achPow);
  multiplier = multiplier.times(kongDimMult)
  multiplier = multiplier.times(kongAllDimMult)

  if (player.currentEternityChall == "eterc9") multiplier = multiplier;
  else multiplier = multiplier.times(player.infinityPower.pow(7).max(1))

  if (player.infinityUpgrades.includes("totalMult")) multiplier = multiplier.times(totalMult)
  if (player.infinityUpgrades.includes("currentMult")) multiplier = multiplier.times(currentMult)
  if (player.infinityUpgrades.includes("infinitiedMult")) multiplier = multiplier.times(infinitiedMult)
  if (player.infinityUpgrades.includes("achievementMult")) multiplier = multiplier.times(achievementMult)
  if (player.infinityUpgrades.includes("challengeMult")) multiplier = multiplier.times(challengeMult)

  if (hasInfinityMult(tier)) multiplier = multiplier.times(dimMults());
  if (tier == 1) {
      if (player.infinityUpgrades.includes("unspentBonus")) multiplier = multiplier.times(unspentBonus);
      if (player.achievements.includes("r28")) multiplier = multiplier.times(1.1);
      if (player.achievements.includes("r31")) multiplier = multiplier.times(1.05);
      if (player.achievements.includes("r71")) multiplier = multiplier.times(3);
      if (player.achievements.includes("r68")) multiplier = multiplier.times(1.5);
  }

  multiplier = multiplier.times(timeMult());
  if (tier == 8 && player.achievements.includes("r23")) multiplier = multiplier.times(1.1);
  else if (player.achievements.includes("r34")) multiplier = multiplier.times(1.02);
  if (tier <= 4 && player.achievements.includes("r43")) multiplier = multiplier.times(1.25);
  if (player.achievements.includes("r48")) multiplier = multiplier.times(1.1);
  if (player.achievements.includes("r72")) multiplier = multiplier.times(1.1); // tbd
  if (player.achievements.includes("r74") && player.currentChallenge != "") multiplier = multiplier.times(1.4);
  if (player.achievements.includes("r77")) multiplier = multiplier.times(1+tier/100);
  if (player.achievements.includes("r56") && player.thisInfinityTime < 1800) multiplier = multiplier.times(3600/(player.thisInfinityTime+1800));
  if (player.achievements.includes("r78") && player.thisInfinityTime < 3) multiplier = multiplier.times(3.3/(player.thisInfinityTime+0.3));
  if (player.achievements.includes("r65") && player.currentChallenge != "" && player.thisInfinityTime < 1800) multiplier = multiplier.times(Math.max(2400/(player.thisInfinityTime+600), 1))
  if (player.achievements.includes("r91") && player.thisInfinityTime < 50) multiplier = multiplier.times(Math.max(301-player.thisInfinityTime*6, 1))
  if (player.achievements.includes("r92") && player.thisInfinityTime < 600) multiplier = multiplier.times(Math.max(101-player.thisInfinityTime/6, 1));
  if (player.achievements.includes("r84")) multiplier = multiplier.times(player.money.pow(0.00004).plus(1));
  else if (player.achievements.includes("r73")) multiplier = multiplier.times(player.money.pow(0.00002).plus(1));


  if (player.timestudy.studies.includes(71) && tier !== 8) multiplier = multiplier.times(calcTotalSacrificeBoost().pow(0.25).min("1e210000"));
  if (player.timestudy.studies.includes(91)) multiplier = multiplier.times(Decimal.pow(10, Math.min(player.thisEternity, 18000)/60));
  if (player.timestudy.studies.includes(101)) multiplier = multiplier.times(Decimal.max(player.replicanti.amount, 1))
  if (player.timestudy.studies.includes(161)) multiplier = multiplier.times(new Decimal("1e616"))
  if (player.timestudy.studies.includes(234) && tier == 1) multiplier = multiplier.times(calcTotalSacrificeBoost())

  multiplier = multiplier.times(player.postC3Reward)
  if (player.challenges.includes("postc8") && tier < 8 && tier > 1) multiplier = multiplier.times(mult18);

  if (player.currentChallenge == "postc6") multiplier = multiplier.dividedBy(player.matter.max(1))
  if (player.currentChallenge == "postc8") multiplier = multiplier.times(postc8Mult)

  if (player.currentChallenge == "postc4" && player.postC4Tier != tier) multiplier = multiplier.pow(0.25)
  if (player.challenges.includes("postc4")) multiplier = multiplier.pow(1.05);
  if (player.currentEternityChall == "eterc10") multiplier = multiplier.times(ec10bonus)
  if (player.timestudy.studies.includes(193)) multiplier = multiplier.times(Decimal.pow(1.02, Math.min(player.eternities, 1.5e6)))
  if (tier == 8 && player.timestudy.studies.includes(214)) multiplier = multiplier.times((calcTotalSacrificeBoost().pow(8)).min("1e46000").times(calcTotalSacrificeBoost().pow(1.1).min(new Decimal("1e125000"))))
  if (player.dilation.active) {
      multiplier.e = Math.floor(Math.pow(multiplier.e, 0.75))
  }
  return multiplier;
}


function getMoneyPerSecond() {
  return getDimensionFinalMultiplier(1)*Math.floor(player.firstAmount)/player.tickspeed;
}

function getDimensionDescription(tier) {
  var name = TIER_NAMES[tier];

  let description = shortenDimensions(player[name + 'Amount']) + ' (' + dimBought(tier) + ')';
  if (tier == 8) description = Math.round(player[name + 'Amount']) + ' (' + dimBought(tier) + ')';

  if (tier < 8) {
      description += '  (+' + formatValue(player.options.notation, getDimensionRateOfChange(tier), 2, 2) + '%/s)';
  }

  return description;
}

function getDimensionRateOfChange(tier) {
  if (tier == 8 || (player.currentEternityChall == "eterc3" && tier > 3)) {
      return 0;
  }

  let toGain = getDimensionProductionPerSecond(tier + 1)

  var name = TIER_NAMES[tier];
  if (player.currentChallenge == "challenge7") {
      if (tier == 7) return 0
      else toGain = getDimensionProductionPerSecond(tier + 2);
  }
  var current = player[name + 'Amount'].max(1);
  var change  = toGain.times(10).dividedBy(current);

  return change;
}