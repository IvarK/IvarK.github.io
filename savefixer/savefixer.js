function fixSave() {
  var save = atob(document.getElementById("brokenSave").value)
  
  var fixed = save.replace(/NaN/gi, "10")
  
  document.getElementById("fixed").value = btoa(fixed)
}