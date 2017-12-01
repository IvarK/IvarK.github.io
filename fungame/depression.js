var game = {
  costs: [1],
  amounts: [0.0],
  depression: 1.0,
  prestige: [1]
}



function formatValue(x, places) {
  var power = Math.floor(Math.log10(x))
  var matissa = x / Math.pow(10, power)
  if (x < 1000) return x.toFixed(0)
  else return ((matissa).toFixed(places) + "e" + power)
}


function insertAfter(newElement,targetElement) {
    // target is what you want it to go after. Look for this elements parent.
    var parent = targetElement.parentNode;

    // if the parents lastchild is the targetElement...
    if (parent.lastChild == targetElement) {
        // add the newElement after the target element.
        parent.appendChild(newElement);
    } else {
        // else the target has siblings, insert the new element between the target and it's next sibling.
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}



function buyStuff(id) {
  var elem = document.getElementById(id)
  var i = id-1
  
  if (game.depression >= game.costs[i]) {
    var next = document.getElementById(id+1)
    if (next == null) {
    var btn = document.createElement("button")
    var br = document.createElement("br")
    btn.innerHTML = "Amount: 0<br>Cost:"+formatValue(game.costs[i]*100, 2)
    btn.id = id+1
    btn.className = "btn"
    btn.onclick = function() {buyStuff(id+1);}
    insertAfter(br, elem)
    insertAfter(btn, br)
    game.costs.push(game.costs[i]*100)
    game.amounts.push(0.0)
    if (game.prestige[id] === undefined) game.prestige[id] = 1
    
    if (id > 5) {
      var pbtn = document.createElement("button")
      var otherbtn = document.getElementById(id-5)
      pbtn.id = id-5+"prestige"
      pbtn.className = "prestigebtn"
      pbtn.onclick = function() {prestige(parseInt(this.id));}
      insertAfter(pbtn, otherbtn)
      for (var i=1; i<game.costs.length-5; i++) document.getElementById(i+"prestige").innerHTML = "Reset for "+Math.max(Math.pow(2, game.costs.length-i-5)/game.prestige[i-1],1)+"x boost."
    }
    

    
  }
  game.amounts[i] += 1
  game.depression -= game.costs[i]
  game.costs[i] *= 2
  }
}


function hardreset() {
  game = {
    costs: [1],
    amounts: [0.0],
    depression: 1.0,
    prestige: [1]
  }
}


function prestige(id) {
  console.log(id)
  game.prestige[id-1] = Math.max(Math.pow(2, game.costs.length-id-5)/game.prestige[id-1], 1)
  for (var i=2; i<=game.costs.length; i++) {
    var btn = document.getElementById(i)
    btn.parentNode.removeChild(btn)
  }
  var prestiges = document.getElementsByClassName("prestigebtn")
  while(prestiges[0]) prestiges[0].parentNode.removeChild(prestiges[0])
  var brs = document.getElementsByTagName("br")
  while(brs[0]) brs[0].parentNode.removeChild(brs[0])
  game = {
    costs: [1],
    amounts: [0.0],
    depression: 1.0,
    prestige: game.prestige
  }
  for (var i=1; i<game.costs.length-5; i++) document.getElementById(i+"prestige").innerHTML = "Reset for "+Math.max(Math.pow(2, game.costs.length-id-5)/game.prestige[id-1], 1)+"x boost."
}


function save() {
  localStorage.setItem("funsave",JSON.stringify(game));
}

function load() {
  var save = JSON.parse(localStorage.getItem("funsave"))
  if (save) game = save
  var elem = document.getElementById("1")
  for (var i=1; i<game.costs.length; i++) {
    var btn = document.createElement("button")
    var br = document.createElement("br")
    btn.innerHTML = "Amount: 0<br>Cost:"+formatValue(game.costs[i])
    btn.id = i+1
    btn.className = "btn"
    btn.onclick = function() {buyStuff(parseInt(this.id));}
    insertAfter(br, elem)
    insertAfter(btn, br)
    elem = btn
  }
  for (var i=1; i<game.costs.length-5; i++) {
    var pbtn = document.createElement("button")
    var otherbtn = document.getElementById(i)
    pbtn.innerHTML = "Reset for "+Math.max(Math.pow(2, game.costs.length-i-5)/game.prestige[i-1], 1)+"x boost."
    pbtn.id = i+"prestige"
    pbtn.className = "prestigebtn"
    pbtn.onclick = function() {prestige(parseInt(this.id));}
    insertAfter(pbtn, otherbtn)
  }
}






setInterval(function() {
  game.depression += game.amounts[0]*game.prestige[0]/33
  document.getElementById("1").innerHTML = "Amount: "+formatValue(game.amounts[0], 2)+"<br>Power: "+formatValue(game.prestige[0], 2)+"x<br>Cost:"+formatValue(game.costs[0], 2)
  for (var i=2; i <= game.costs.length; i++) {
    document.getElementById(i).innerHTML = "Amount: "+formatValue(game.amounts[i-1], 2)+"<br>Power: "+formatValue(game.prestige[i-1], 2)+"x<br>Cost:"+formatValue(game.costs[i-1], 2)
    game.amounts[i-2] += game.amounts[i-1]*game.prestige[i-1]/33
  }
  
  /*if (game.amounts[game.amounts.length-2] < 5) document.getElementById(game.amounts.length-1).click()
  else document.getElementById(game.amounts.length).click()*/
  
  document.getElementById("amount").innerHTML = formatValue(Math.floor(game.depression), 2)
}, 33)


setInterval(function() { save() }, 10000)



load()
