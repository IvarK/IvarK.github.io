function fixSave() {
  var save = atob(document.getElementById("brokenSave").value)
  
  var fixed = save.replace(/NaN/gi, "10")
  var stillToDo = JSON.parse(fixed)
  for (var i=0; i<fixed.autobuyers.length; i++) stillToDo.autobuyers[i].isOn = false
  
  document.getElementById("fixed").value = btoa(stillToDo)
}