function fixSave() {
  var data = document.getElementById("brokenSave").value
  var v2Used = false
  var save
  try {
    save = atob(data)
  } catch (e) {
    v2Used = true
    save = LZString.decompressFromBase64(data)
  }
  
  var fixed = save.replace(/NaN/gi, "10")
  var stillToDo = JSON.parse(fixed)
  for (var i=0; i<stillToDo.autobuyers.length; i++) stillToDo.autobuyers[i].isOn = false
  
  document.getElementById("fixed").value = v2Used ? LZString.compressToBase64(JSON.stringify(stillToDo)) : btoa(JSON.stringify(stillToDo))
}