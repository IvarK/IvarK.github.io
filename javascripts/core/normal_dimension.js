function getDimensionPreDilationMultiplier(tier) {
  //if (player.currentEternityChall == "eterc3" && tier > 4) return new Decimal(0)
  var name = TIER_NAMES[tier];

  let multiplier = new Decimal(player[name + 'Pow']);

  if (player.currentEternityChall == "eterc11") return player.infinityPower.pow(7).max(1).times(getDimensionBoostPower().pow(player.resets - tier + 1).max(1))

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
  if (tier == 1) {
      // this is pre-dilation again.
      if (player.infinityUpgrades.includes("unspentBonus")) multiplier = multiplier.times(unspentBonus);
      if (player.achievements.includes("r28")) multiplier = multiplier.times(1.1);
      if (player.achievements.includes("r31")) multiplier = multiplier.times(1.05);
      if (player.achievements.includes("r71")) multiplier = multiplier.times(909);
      if (player.achievements.includes("r68")) multiplier = multiplier.times(5);
      if (player.achievements.includes("r64")) multiplier = multiplier.times(1e6);
  }

  if (!player.challenges.includes("postc1") && player.currentChallenge !== "postc1") {
    multiplier = multiplier.times(infUpgradeMult(tier));
  }
  if (tier == 8 && player.achievements.includes("r23")) multiplier = multiplier.times(1.1);
  else if (player.achievements.includes("r34")) multiplier = multiplier.times(2);
  if (tier <= 4 && player.achievements.includes("r43")) multiplier = multiplier.times(1.25);
  if (player.achievements.includes("r31")) multiplier = multiplier.times(productAllTotalBought1());
  if (player.achievements.includes("r48")) multiplier = multiplier.times(1.1);
  if (player.achievements.includes("r72")) multiplier = multiplier.times(10); // tbd
  if (player.achievements.includes("r46")) multiplier = multiplier.times(productAllDims1())
  if (player.achievements.includes("r74") && player.currentChallenge != "") multiplier = multiplier.times(40);
  if (player.achievements.includes("r77")) multiplier = multiplier.times(1+tier/10);
  if (player.achievements.includes("r84")) multiplier = multiplier.times(player.money.pow(0.0002).plus(1));
  else if (player.achievements.includes("r73")) multiplier = multiplier.times(player.money.pow(0.0001).plus(1));


  if (player.timestudy.studies.includes(71) && tier !== 8) multiplier = multiplier.times(calcTotalSacrificeBoost().pow(0.25).min("1e210000"));
  if (player.timestudy.studies.includes(91)) multiplier = multiplier.times(Decimal.pow(10, Math.min(player.thisEternity, 18000)/60));
  if (player.timestudy.studies.includes(101)) multiplier = multiplier.times(Decimal.max(player.replicanti.amount, 1))
  if (player.timestudy.studies.includes(161)) multiplier = multiplier.times(new Decimal("1e616"))
  if (player.timestudy.studies.includes(234) && tier == 1) multiplier = multiplier.times(calcTotalSacrificeBoost())

  multiplier = multiplier.times(player.postC3Reward)
  if (player.challenges.includes("postc10") && tier < 8 && tier > 1) multiplier = multiplier.times(mult18);

  if (player.currentChallenge === 'challenge13' || player.currentChallenge === "postc4") multiplier = multiplier.times(productAllTotalBought());

  if (player.currentChallenge == "postc6" && player.postC6Tier != tier) multiplier = multiplier.pow(0.25)
  if (player.currentEternityChall == "eterc10") multiplier = multiplier.times(ec10bonus)
  if (player.timestudy.studies.includes(193)) multiplier = multiplier.times(Decimal.pow(1.03, player.eternities).min("1e13000"))
  if (tier == 8 && player.timestudy.studies.includes(214)) multiplier = multiplier.times((calcTotalSacrificeBoost().pow(8)).min("1e46000").times(calcTotalSacrificeBoost().pow(1.1).min(new Decimal("1e125000"))))

  if (player.galacticSacrifice.upgrades.includes(12)) {
    multiplier = multiplier.times(galUpgrade12())
  }
  if (player.galacticSacrifice.upgrades.includes(13)) {
    multiplier = multiplier.times(galUpgrade13())
  }

  if (player.challenges.includes("postc6")) multiplier = multiplier.pow(1.05);
  if (player.galacticSacrifice.upgrades.includes(31)) multiplier = multiplier.pow(galUpgrade31());

  if (multiplier.lt(1)) multiplier = new Decimal(1);
  return multiplier;
}

function infUpgradeMult (tier) {
  let multiplier = timeMult();
  if (hasInfinityMult(tier)) multiplier = multiplier.times(dimMults());
  return multiplier;
}

function getDimensionFinalMultiplier(tier) {
  multiplier = getDimensionPreDilationMultiplier(tier);
//if (player.dilation.active) {
    multiplier = Decimal.pow(10, Math.pow(multiplier.log10(), 0.75))
    if (player.dilation.upgrades.includes(9)) {
      multiplier = Decimal.pow(10, Math.pow(multiplier.log10(), 1.05))
    }
//}
  if (player.achievements.includes("r56") && player.thisInfinityTime < 1800) multiplier = multiplier.times(3600/(player.thisInfinityTime+1800));
  if (player.achievements.includes("r78") && player.thisInfinityTime < 3) multiplier = multiplier.times(3.3/(player.thisInfinityTime+0.3));
  if (player.achievements.includes("r65") && player.currentChallenge != "" && player.thisInfinityTime < 1800) multiplier = multiplier.times(Math.max(2400/(player.thisInfinityTime+600), 1))
  if (player.achievements.includes("r91") && player.thisInfinityTime < 50) multiplier = multiplier.times(Math.max(301-player.thisInfinityTime*6, 1))
  if (player.achievements.includes("r92") && player.thisInfinityTime < 600) multiplier = multiplier.times(Math.max(101-player.thisInfinityTime/6, 1));

  if (player.dilation.upgrades.includes(6)) multiplier = multiplier.times(player.dilation.dilatedTime.pow(308))

  // penalties, thus post-dilation.
  if (player.currentChallenge == "postc8") multiplier = multiplier.dividedBy(player.matter.max(1))
  if (player.currentChallenge == "postc10") multiplier = multiplier.times(postc10Mult)

  if (player.challenges.includes("postc1") || player.currentChallenge === "postc1") {
    multiplier = multiplier.times(infUpgradeMult(tier));
  }

  if (multiplier.lt(1)) multiplier = new Decimal(1);
  return multiplier;
}

function productAllTotalBought () {
    var tiers = [ null, "first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eight" ];
    var ret = 1;
    for (i = 1; i <= 8; i++) {
        ret *= Math.max(player[tiers[i] + "TotalBought"], 1);
    }
    return ret;
}

function productAllTotalBought1 () {
    return Math.pow(Math.log10(Math.max(productAllTotalBought(), 10)), 2);
}

function productAllDims1(){
        var tiers = [ null, "first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eight" ];
        var ret = 0;
        for (i = 1; i <= 8; i++) {
            ret += Math.max(player[tiers[i] + "Amount"].log10(), 0);
        }
        return ret = Math.min(1,ret);
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
  if (tier == 7 && player.currentEternityChall == "eterc7") toGain = DimensionProduction(1).times(10)

  var name = TIER_NAMES[tier];
  if (player.currentChallenge == "challenge7") {
      if (tier == 7) return 0
      else toGain = getDimensionProductionPerSecond(tier + 2);
  }
  var current = player[name + 'Amount'].max(1);
  var change  = toGain.times(10).dividedBy(current);

  return change;
}

function hasInfinityMult(tier) {
    switch (tier) {
        case 1: case 8: return player.infinityUpgrades.includes("18Mult");
        case 2: case 7: return player.infinityUpgrades.includes("27Mult");
        case 3: case 6: return player.infinityUpgrades.includes("36Mult");
        case 4: case 5: return player.infinityUpgrades.includes("45Mult");
    }
}



    function multiplySameCosts(cost) {
        var tiers = [ null, "first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eight" ];
        var tierCosts = [ null, new Decimal(1e3), new Decimal(1e4), new Decimal(1e5), new Decimal(1e6), new Decimal(1e8), new Decimal(1e10), new Decimal(1e12), new Decimal(1e15) ];

        for (let i = 1; i <= 8; ++i) {
            if (player[tiers[i] + "Cost"].e == cost.e) player[tiers[i] + "Cost"] = player[tiers[i] + "Cost"].times(tierCosts[i])

        }
        if (player.tickSpeedCost.e == cost.e) player.tickSpeedCost = player.tickSpeedCost.times(player.tickspeedMultiplier)
        }


    function multiplyPC5Costs(cost, tier) {
        var tiers = [ null, "first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eight" ];

        if (tier < 5) {
            for (var i = 1; i<9; i++) {
                if (player[tiers[i] + "Cost"].e <= cost.e) {
                    player[tiers[i] + "Cost"] = player[tiers[i] + "Cost"].times(player.costMultipliers[i-1])
                    if (costIncreaseActive(player[tiers[i] + "Cost"])) player.costMultipliers[i-1] = player.costMultipliers[i-1].times(10)
                }
            }
        } else {
            for (var i = 1; i<9; i++) {
                if (player[tiers[i] + "Cost"].e >= cost.e) {
                    player[tiers[i] + "Cost"] = player[tiers[i] + "Cost"].times(player.costMultipliers[i-1])
                   if (costIncreaseActive(player[tiers[i] + "Cost"])) player.costMultipliers[i-1] = player.costMultipliers[i-1].times(10)
                }
            }
        }
    }

    function infUpg12Pow() {
        return 2.1 + .005 * Math.min(Math.max(player.infinitied, 0), 60)
    }


    function canBuyDimension(tier) {
        if (tier == 9 ) {
            if (player.secondAmount.equals(0)) return false
            else return true
        }

        if (!player.break && player.money.gt(Number.MAX_VALUE)) return false;
        if (tier > player.resets + 4) return false;
        if (tier > 1 && player[TIER_NAMES[tier - 1] + 'Amount'] == 0 && player.eternities < 30) return false;
        if ((player.currentChallenge == "challenge4" || player.currentChallenge == "postc4") && tier >= 7) return false

        return true;
    }

    function getDimensionPowerMultiplier(tier) {
        if (player.currentChallenge === 'challenge13' || player.currentChallenge === "postc4") {
            return 1;
        }
        let dimMult = 2;


        if (player.currentChallenge == "challenge9" || player.currentChallenge == "postc4") dimMult = Math.pow(10/0.30,Math.random())*0.30

        if (player.infinityUpgrades.includes('dimMult')) dimMult *= infUpg12Pow() / 2;
        dimMult += ECTimesCompleted("eterc3") * 0.8
        if (player.galacticSacrifice.upgrades.includes(33)) {
          dimMult *= galUpgrade33() / 2;
        }

        if (player.achievements.includes("r58")) dimMult = Math.pow(dimMult, 1.0666);
        return dimMult;
    }


    function clearDimensions(amount) {
        var tiers = [ null, "first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eight" ];

        for (i = 1; i <= amount; i++) {
            player[tiers[i] + "Amount"] = new Decimal(0)
        }
    }


    function getDimensionCostMultiplier(tier) {
        return player.costMultipliers[tier - 1];
    }

    function onBuyDimension(tier) {
        if (!player.break) {
            switch (tier) {
                case 1: giveAchievement("You gotta start somewhere"); break;
                case 2: giveAchievement("100 antimatter is a lot"); break;
                case 3: giveAchievement("Half life 3 confirmed"); break;
                case 4: giveAchievement("L4D: Left 4 Dimensions"); break;
                case 5: giveAchievement("5 Dimension Antimatter Punch"); break;
                case 6: giveAchievement("We couldn't afford 9"); break;
                case 7: giveAchievement("Not a luck related achievement"); break;
                case 8: giveAchievement("90 degrees to infinity"); break;
            }
        }

        if (player.eightAmount.round().eq(99)) {
            giveAchievement("The 9th Dimension is a lie");
        }

        player.postC6Tier = tier;
        postc10Mult = new Decimal(1)
        if (tier != 8) player.dimlife = false
        if (tier != 1) player.dead = false


    }

    function dimBought(tier) {
        return player[TIER_NAMES[tier]+"Bought"] % 10;
    }

    function recordBought (name, num) {
        player[name + 'Bought'] += num;
        player[name + 'TotalBought'] += num;
    }

    function costIncreaseActive (cost) {
      return cost.gte(Number.MAX_VALUE) || player.currentChallenge === 'postc2';
    }

    function getDimensionCostMultiplierIncrease (adjust) {
      let ret = player.dimensionMultDecrease + (adjust || 0);
      if (player.currentChallenge === 'postc2') {
        ret = Math.pow(ret, .5);
      } else if (player.challenges.includes('postc2')) {
        ret = Math.pow(ret, .95);
      }
      return ret;
    }

    function buyOneDimension(tier) {
        var name = TIER_NAMES[tier];
        var cost = player[name + 'Cost'];
        auto = false;

        if (player.currentChallenge != "challenge10" && player.currentChallenge != "postc4") {
            if (!canBuyDimension(tier)) {
                return false;
            }
        } else {
            if (tier >= 3) {
                if (player[TIER_NAMES[tier-2] + 'Amount'].lt(cost)) return false
            }
            else if (!canBuyDimension(tier)) {
                return false;
            } else if (tier < 3 && !canAfford(cost)){
                return false;
            }
        }



        if (player.currentChallenge != "challenge10" && player.currentChallenge != "postc4") {
            if (!canAfford(cost)) {
                return false;
            }
        }


        if ((player.currentChallenge != "challenge10" && player.currentChallenge != "postc4") || tier < 3) {
            player.money = player.money.minus(cost);
        } else {
            player[TIER_NAMES[tier-2] + 'Amount'] = player[TIER_NAMES[tier-2] + 'Amount'].minus(cost)
        }

        player[name + 'Amount'] = player[name + 'Amount'].plus(1);
        recordBought(name, 1)

        if (dimBought(tier) === 0) {
            player[name + 'Pow']  = player[name + 'Pow'].times(getDimensionPowerMultiplier(tier));
            if (player.currentChallenge != "challenge5" && player.currentChallenge != "postc7") player[name + 'Cost'] = player[name + 'Cost'].times(getDimensionCostMultiplier(tier));
            else if (player.currentChallenge == "postc7") multiplyPC5Costs(player[name + 'Cost'], tier)
            else multiplySameCosts(cost);
            if (costIncreaseActive(player[name + 'Cost'])) player.costMultipliers[tier-1] = player.costMultipliers[tier-1].times(getDimensionCostMultiplierIncrease())
            floatText(name+"D", "x" + shortenMoney(getDimensionPowerMultiplier(tier)))
        }

        if (player.currentChallenge == "challenge2" || player.currentChallenge == "postc4") player.chall2Pow = 0;
        if (player.currentChallenge == "challenge8" || player.currentChallenge == "postc4") clearDimensions(tier-1);

        onBuyDimension(tier);


        return true;
    }

    function buyManyDimension(tier) {
        var name = TIER_NAMES[tier];
        var cost = player[name + 'Cost'].times(10 - dimBought(tier));

        auto = false;

        if ((player.currentChallenge == "challenge12" || player.currentChallenge == "postc4" || player.currentChallenge == "postc6") && player.matter.equals(0)) player.matter = new Decimal(1);
        if (player.currentChallenge != "challenge10" && player.currentChallenge != "postc4") {
            if (!canBuyDimension(tier)) {
                return false;
            }
        } else {
            if (tier >= 3) {
                if (!canBuyDimension(tier)) return false
                if (player[TIER_NAMES[tier-2] + 'Amount'].lt(cost)) return false
            }
            else if (!canBuyDimension(tier)) {
                return false;
            } else if (tier < 3 && !canAfford(cost)){
                return false;
            }
        }



        if (player.currentChallenge != "challenge10" && player.currentChallenge != "postc4") {
            if (!canAfford(cost)) {
                return false;
            }
        }

        if ((player.currentChallenge != "challenge10" && player.currentChallenge != "postc4") || tier < 3) {
            player.money = player.money.minus(cost);
        } else {
            player[TIER_NAMES[tier-2] + 'Amount'] = player[TIER_NAMES[tier-2] + 'Amount'].minus(cost)
        }

        player[name + 'Amount'] = player[name + 'Amount'].plus(10 - dimBought(tier));
        recordBought(name, 10 - dimBought(tier));
        player[name + 'Pow']  = player[name + 'Pow'].times(getDimensionPowerMultiplier(tier));
        if (player.currentChallenge != "challenge5" && player.currentChallenge != "postc7" ) player[name + 'Cost'] = player[name + 'Cost'].times((getDimensionCostMultiplier(tier)));
        else if (player.currentChallenge == "postc7") multiplyPC5Costs(player[name + 'Cost'], tier)
        else multiplySameCosts(player[name + 'Cost']);
        if (costIncreaseActive(player[name + 'Cost'])) player.costMultipliers[tier-1] = player.costMultipliers[tier-1].times(getDimensionCostMultiplierIncrease())
        if (player.currentChallenge == "challenge2" || player.currentChallenge == "postc4") player.chall2Pow = 0;
        if (player.currentChallenge == "challenge8" || player.currentChallenge == "postc4") clearDimensions(tier-1);
        floatText(name+"D", "x" + shortenMoney(getDimensionPowerMultiplier(tier)))
        onBuyDimension(tier);

        return true;
    }


    const initCost = [null, new Decimal(10), new Decimal(1e2), new Decimal(1e4), new Decimal(1e6), new Decimal(1e9), new Decimal(1e12), new Decimal(1e18), new Decimal(1e24)]
    const costMults = [null, new Decimal(1e3), new Decimal(1e4), new Decimal(1e5), new Decimal(1e6), new Decimal(1e8), new Decimal(1e10), new Decimal(1e12), new Decimal(1e15)]
    function buyManyDimensionAutobuyer(tier, bulk) {

        var name = TIER_NAMES[tier];
        var cost = player[name + 'Cost'].times(10 - dimBought(tier))
        if (!player.break && player.money.gt(Number.MAX_VALUE)) return false;

        if (tier >= 3 && (player.currentChallenge == "challenge10" || player.currentChallenge == "postc4")) {
            if (!canBuyDimension(tier)) return false
            if (player[TIER_NAMES[tier-2] + 'Amount'].lt(cost)) return false
                if (canBuyDimension(tier)) {
                    if (cost.lt(player[TIER_NAMES[tier-2]+"Amount"]) && dimBought(tier) != 0) {
                        player[TIER_NAMES[tier-2]+"Amount"] = player[TIER_NAMES[tier-2]+"Amount"].minus(cost)
                        player[name + "Amount"] = Decimal.round(player[name + "Amount"].plus(10 - dimBought(tier)))
                        recordBought(name, 10 - dimBought(tier));
                        player[name + 'Pow']  = player[name + 'Pow'].times(getDimensionPowerMultiplier(tier))
                        player[name + "Cost"] = player[name + "Cost"].times(getDimensionCostMultiplier(tier))
                    }
                    var x = bulk
                    while (player[TIER_NAMES[tier-2]+"Amount"].gt(player[name + "Cost"].times(10)) && x > 0) {
                        player[TIER_NAMES[tier-2]+"Amount"] = player[TIER_NAMES[tier-2]+"Amount"].minus(player[name + "Cost"].times(10))
                        player[name + "Cost"] = player[name + "Cost"].times(getDimensionCostMultiplier(tier))
                        player[name + "Amount"] = Decimal.round(player[name + "Amount"].plus(10))
                        recordBought(name, 10)
                        player[name + "Pow"] = player[name + "Pow"].times(getDimensionPowerMultiplier(tier))
                        if (costIncreaseActive(player[name + 'Cost'])) player.costMultipliers[tier-1] = player.costMultipliers[tier-1].times(getDimensionCostMultiplierIncrease())
                        x--;
                    }


                    onBuyDimension(tier);
                }
        } else {
            if (!canBuyDimension(tier)) return false
                if (cost.lt(player.money) && dimBought(tier) != 0) {
                    player.money = player.money.minus(cost)
                    player[name + "Amount"] = Decimal.round(player[name + "Amount"].plus(10 - dimBought(tier)))
                    recordBought(name, 10 - dimBought(tier));
                    player[name + 'Pow']  = player[name + 'Pow'].times(getDimensionPowerMultiplier(tier))
                    player[name + "Cost"] = player[name + "Cost"].times(getDimensionCostMultiplier(tier))
                }
                if (player.money.lt(player[name + "Cost"].times(10))) return false
                var x = bulk

            if ((player.dimensionMultDecrease > 3 || player.currentChallenge == "postc7" || player.currentChallenge == "challenge5")) {
                while (player.money.gte(player[name + "Cost"].times(10)) && x > 0) {
                        player.money = player.money.minus(player[name + "Cost"].times(10))
                        if (player.currentChallenge != "challenge5" && player.currentChallenge != "postc7") player[name + "Cost"] = player[name + "Cost"].times(getDimensionCostMultiplier(tier))
                        else if (player.currentChallenge == "postc7") multiplyPC5Costs(player[name + 'Cost'], tier)
                        else multiplySameCosts(player[name + 'Cost'])
                        player[name + "Amount"] = Decimal.round(player[name + "Amount"].plus(10))
                        recordBought(name, 10)
                        player[name + "Pow"] = player[name + "Pow"].times(getDimensionPowerMultiplier(tier))
                        if (costIncreaseActive(player[name + 'Cost'])) player.costMultipliers[tier-1] = player.costMultipliers[tier-1].times(getDimensionCostMultiplierIncrease())
                        if (player.currentChallenge == "challenge8") clearDimensions(tier-1)
                        x--;
                }
            } else {
                if (!costIncreaseActive(player[name + "Cost"])) {
                    let failsafe = 0
                    while (player.money.gt(player[name + "Cost"].times(10)) && x > 0 && player[name + "Cost"].lte(Number.MAX_VALUE) && failsafe < 150) {
                        player.money = player.money.minus(player[name + "Cost"].times(10))
                        if (player.currentChallenge != "challenge5" && player.currentChallenge != "postc7") player[name + "Cost"] = player[name + "Cost"].times(getDimensionCostMultiplier(tier))
                        else if (player.currentChallenge == "postc7") multiplyPC5Costs(player[name + 'Cost'], tier)
                        else multiplySameCosts(player[name + 'Cost'])
                        player[name + "Amount"] = Decimal.round(player[name + "Amount"].plus(10))
                        recordBought(name, 10)
                        player[name + "Pow"] = player[name + "Pow"].times(getDimensionPowerMultiplier(tier))
                        if (costIncreaseActive(player[name + 'Cost'])) player.costMultipliers[tier-1] = player.costMultipliers[tier-1].times(getDimensionCostMultiplierIncrease())
                        if (player.currentChallenge == "challenge8") clearDimensions(tier-1)
                        x--;
                        failsafe++;
                    }
                }
                if (costIncreaseActive(player[name + "Cost"])) {
                    var a = Math.log10(Math.sqrt(getDimensionCostMultiplierIncrease()))
                    var b = player.costMultipliers[tier-1].dividedBy(Math.sqrt(getDimensionCostMultiplierIncrease())).log10()
                    var c = player[name + "Cost"].dividedBy(player.money).log10()
                    var discriminant = Math.pow(b, 2) - (c *a* 4)
                    if (discriminant < 0) return false
                    var buying = Math.floor((Math.sqrt(Math.pow(b, 2) - (c *a *4))-b)/(2 * a))+1
                    if (buying <= 0) return false
                    if (buying > bulk) buying = bulk
                    player[name+"Amount"] = Decimal.round(player[name+"Amount"].plus(10*buying))
                    preInfBuy = Math.floor(1 + (308 - initCost[tier].log10()) / costMults[tier].log10())
                    postInfBuy = player[name + 'Bought']/10+buying - preInfBuy - 1
                    postInfInitCost = initCost[tier].times(Decimal.pow(costMults[tier], preInfBuy))
                    recordBought(name, 10*buying)
                    player[name + "Pow"] = player[name + "Pow"].times(Decimal.pow(getDimensionPowerMultiplier(tier), buying))

                    newCost = postInfInitCost.times(Decimal.pow(costMults[tier], postInfBuy)).times(Decimal.pow(getDimensionCostMultiplierIncrease(), postInfBuy * (postInfBuy+1)/2))
                    newMult = costMults[tier].times(Decimal.pow(getDimensionCostMultiplierIncrease(), postInfBuy+1))

                    player[name + "Cost"] = newCost
                    player.costMultipliers[tier-1] = newMult
                    if (player.money.gte(player[name + "Cost"])) player.money = player.money.minus(player[name + "Cost"])
                    player[name + "Cost"] = player[name + "Cost"].times(player.costMultipliers[tier-1])
                    player.costMultipliers[tier-1] = player.costMultipliers[tier-1].times(getDimensionCostMultiplierIncrease());
                }
            }
        }
    initMatter();
    if (player.currentChallenge == "challenge2" || player.currentChallenge == "postc4") player.chall2Pow = 0;
    if (player.currentChallenge == "postc4") clearDimensions(tier-1);
    player.postC6Tier = tier;
    if (tier != 8) player.dimlife = false
    if (tier != 1) player.dead = false
}


function canAfford(cost) {
    return ((cost.lt(new Decimal("1.79e308")) && !player.break) || player.break) && cost.lte(player.money);
}

function initMatter () {
  if ((player.currentChallenge == "challenge12" || player.currentChallenge == "postc4" || player.currentChallenge == "postc8") && player.matter.equals(0)) player.matter = new Decimal(1);
}


document.getElementById("first").onclick = function () {
    if (buyOneDimension(1)) {
        // This achievement is granted only if the buy one button is pressed.
        if (player.firstAmount >= 1e150) {
            giveAchievement("There's no point in doing that");
        }
        initMatter();
    }
    if (player.firstAmount.lt(1)) {
        player.money = new Decimal("0")
        player.firstAmount = player.firstAmount.plus(1);
        player.firstBought += 1;
        giveAchievement("You gotta start somewhere");
    }
};

document.getElementById("second").onclick = function () {
    buyOneDimension(2);
    initMatter();
};

document.getElementById("third").onclick = function () {
    buyOneDimension(3);
    initMatter();
};

document.getElementById("fourth").onclick = function () {
    buyOneDimension(4);
    initMatter();
};

document.getElementById("fifth").onclick = function () {
    buyOneDimension(5);
    initMatter();
};

document.getElementById("sixth").onclick = function () {
    buyOneDimension(6);
    initMatter();
};

document.getElementById("seventh").onclick = function () {
    buyOneDimension(7);
    initMatter();
};

document.getElementById("eight").onclick = function () {
    buyOneDimension(8);
    initMatter();
};

document.getElementById("firstMax").onclick = function () {
    buyManyDimension(1);
    initMatter();
};

document.getElementById("secondMax").onclick = function () {
    buyManyDimension(2);
    initMatter();
};

document.getElementById("thirdMax").onclick = function () {
    buyManyDimension(3);
    initMatter();
};

document.getElementById("fourthMax").onclick = function () {
    buyManyDimension(4);
    initMatter();
};

document.getElementById("fifthMax").onclick = function () {
    buyManyDimension(5);
    initMatter();
};

document.getElementById("sixthMax").onclick = function () {
    buyManyDimension(6);
    initMatter();
};

document.getElementById("seventhMax").onclick = function () {
    buyManyDimension(7);
    initMatter();
};

document.getElementById("eightMax").onclick = function () {
    buyManyDimension(8);
    initMatter();
};


function timeMult() {
    var mult = new Decimal(1);
    if (player.infinityUpgrades.includes("timeMult")) mult = mult.times(timeMultNum);
    if (player.infinityUpgrades.includes("timeMult2")) mult = mult.times(timeMultNum2);
    if (player.achievements.includes("r76")) mult = mult.times(Math.pow(player.totalTimePlayed / (600*60*48), 0.1));
    return mult;
}

function dimMults() {
    if (player.timestudy.studies.includes(31)) return Decimal.pow(1 + (getInfinitied() * 0.2), 8)
    else return Decimal.pow(1 + (getInfinitied() * 0.2), 2)
}

function getDimensionProductionPerSecond(tier) {
    let ret = Decimal.floor(player[TIER_NAMES[tier] + 'Amount']).times(getDimensionFinalMultiplier(tier)).times(1000).dividedBy(player.tickspeed)
    if (player.currentChallenge == "challenge2" || player.currentChallenge == "postc4") ret = ret.times(player.chall2Pow)
    // if (player.dilation.active) {
        let tick = new Decimal(player.tickspeed)
        tick = Decimal.pow(10, Math.pow((tick.log10()*-1)+3, 0.75))
        if (player.dilation.upgrades.includes(9)) {
            tick = Decimal.pow(10, Math.pow((tick.log10()*-1)+3, 1.05))
          }
        tick = new Decimal(1).dividedBy(tick)
        ret = Decimal.floor(player[TIER_NAMES[tier] + 'Amount']).times(getDimensionFinalMultiplier(tier)).dividedBy(tick)
    // }
    return ret;
}
