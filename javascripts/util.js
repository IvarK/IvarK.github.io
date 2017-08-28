function set_cookie(cookie_name,value) {
    expiry = new Date();   
    expiry.setTime(new Date().getTime() + (365*24*60*60*1000)); 
    var c_value=escape(btoa(JSON.stringify(value))) + 
    "; expires="+expiry.toUTCString();
    document.cookie=cookie_name + "=" + c_value;
}

function get_cookie(cookie_name) {
    var c_value = document.cookie;
    var c_start = c_value.indexOf(" " + cookie_name + "=");
    if (c_start == -1) {
        c_start = c_value.indexOf(cookie_name + "=");
    }
    if (c_start == -1) return false;
    c_start = c_value.indexOf("=", c_start) + 1;
    var c_end = c_value.indexOf(";", c_start);
    if (c_end == -1) {
        c_end = c_value.length;
    }
    c_value = atob(unescape(c_value.substring(c_start,c_end)));
    return JSON.parse(c_value);
}

function save_game() {
    set_cookie('dimensionSave', player);
    $.notify("Game saved", "info")
}

function load_game() {
    var save_data = get_cookie('dimensionSave');
      if (!save_data) return;
    	player = save_data;
      if (player.totalmoney === undefined) player.totalmoney = player.money;
      if (player.options === undefined) {
        player.options = {
			    scientific: false,
			    animationOn: true
      	}
      }
      if (player.options.invert === undefined) player.options.invert = false;
      if (player.options.logoVisible === undefined) player.options.logoVisible = true;
      if (player.achievements === undefined) player.achievements = []; 
      if (player.sacrificed === undefined) player.sacrificed = 0;
	    if (player.infinityUpgrades === undefined) player.infinityUpgrades = [];
      if (player.infinityPoints === undefined) player.infinityPoints = 0;
	    if (player.infinitied === undefined) player.infinitied = 0;
	    if (player.totalTimePlayed === undefined) player.totalTimePlayed = 0;
	    if (player.bestInfinityTime === undefined) player.bestInfinityTime = 9999999999;
	    if (player.thisInfinityTime === undefined) player.thisInfinityTime = 9999999999;
	    if (player.galaxies === undefined) player.galaxies = 0;
      if (player.lastUpdate === undefined) player.lastUpdate = new Date().getTime();
    	if (player.firstAmount !== 0) document.getElementById("secondRow").style.display = "table-row";
    	if (player.secondAmount !== 0) { 
    	document.getElementById("thirdRow").style.display = "table-row";
  		document.getElementById("tickSpeed").style.visibility = "visible";
      document.getElementById("tickSpeedMax").style.visibility = "visible";
  		document.getElementById("tickLabel").style.visibility = "visible";
  		document.getElementById("tickSpeedAmount").style.visibility = "visible";
    	}
	
    	if (player.thirdAmount !== 0) document.getElementById("fourthRow").style.display = "table-row";
    	if (player.fourthAmount !== 0) if (player.resets > 0) document.getElementById("fifthRow").style.display = "table-row";
    	if (player.fifthAmount !== 0) if (player.resets > 1) document.getElementById("sixthRow").style.display = "table-row";
    	if (player.sixthAmount !== 0) if (player.resets > 2) document.getElementById("seventhRow").style.display = "table-row";
    	if (player.seventhAmount !== 0) if (player.resets > 3) document.getElementById("eightRow").style.display = "table-row";
    	updateCosts();
      updateTickSpeed();
      
      var achievements = document.getElementsByClassName('achievement');
      var achievement;
      for (var i = 0; i < achievements.length; i++) {
        achievement = achievements.item(i);
        if (player.achievements.includes(achievement.id)) {
            achievement.className = 'achievement achievementunlocked';
        } else {
						achievement.className = 'achievement achievementlocked';
	}
      }
      
}
