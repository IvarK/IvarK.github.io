function purchaseIP() {
  console.log("purchase ip")
  kongregate.mtx.purchaseItems(['doubleip'], onPurchaseResult)
}

function purchaseDimMult() {
  kongregate.mtx.purchaseItems(['doublemult'], onPurchaseResult)
}

function purchaseAllDimMult() {
  kongregate.mtx.purchaseItems(['alldimboost'], onPurchaseResult)
}


function purchaseTimeSkip() {
  kongregate.mtx.purchaseItems(['timeskip'], onPurchaseTimeSkip)
}

function purchaseEP() {
  kongregate.mtx.purchaseItems(['tripleep'], onPurchaseResult)
}


function onPurchaseResult(result) {
  console.log("purchasing...")
  if (result.success) {
      console.log("purchase successfull!")
      updateKongPurchases()
  }
}


function onPurchaseTimeSkip(result) {
  if (result.success) {
      simulateTime(21600)
  }
}






function updateKongPurchases() {
  console.log("updating kong purchases")
  try {
      kongregate.mtx.requestUserItemList("", items)

  } catch(e) {console.log(e)}

  function items(result) {
      console.log("checking for all items")
      let ipmult = 0
      let dimmult = 1
      let epmult = 0
      let alldimmult = 1
      for(var i = 0; i < result.data.length; i++) {
          var item = result.data[i];
          console.log((i+1) + ". " + item.identifier + ", " +
          item.id + "," + item.data);
          if (item.identifier == "doublemult") dimmult *= 2
          if (item.identifier == "doubleip") ipmult += 2
          if (item.identifier == "tripleep") epmult +=3
          if (item.identifier == "alldimboost") alldimmult = (alldimmult < 32) ? alldimmult * 2 : alldimmult + 32

      }
      kongDimMult = dimmult
      kongAllDimMult = alldimmult
      if (ipmult !== 0) kongIPMult = ipmult
      else kongIPMult = 1
      if (epmult !== 0) kongEPMult = epmult
      else kongEPMult = 1
  }

  document.getElementById("kongip").textContent = "Double your IP gain from all sources (additive). Forever. Currently: x"+kongIPMult+", next: x"+(kongIPMult==1? 2: kongIPMult+2)
  document.getElementById("kongep").textContent = "Triple your EP gain from all sources (additive). Forever. Currently: x"+kongEPMult+", next: x"+(kongEPMult==1? 3: kongEPMult+3)
  document.getElementById("kongdim").textContent = "Double all your normal dimension multipliers (multiplicative). Forever. Currently: x"+kongDimMult+", next: x"+(kongDimMult*2)
  document.getElementById("kongalldim").textContent = "Double ALL the dimension multipliers (Normal, Infinity, Time) (multiplicative until 32x). Forever. Currently: x"+kongAllDimMult+", next: x"+((kongAllDimMult < 32) ? kongAllDimMult * 2 : kongAllDimMult + 32)
}