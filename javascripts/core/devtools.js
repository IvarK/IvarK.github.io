var dev = {};

dev.giveAllAchievements = function() {
    Object.keys(allAchievements).forEach( function(key) {
        giveAchievement(allAchievements[key])
    })
}

dev.doubleEverything = function() {
    Object.keys(player).forEach( function(key) {
        if (typeof player[key] === "number") player[key] *= 2;
        if (typeof player[key] === "object" && player[key].constructor !== Object) player[key] = player[key].times(2);
        if (typeof player[key] === "object" && !isFinite(player[key])) {
            Object.keys(player[key]).forEach( function(key2) {
                if (typeof player[key][key2] === "number") player[key][key2] *= 2
                if (typeof player[key][key2] === "object" && player[key][key2].constructor !== Object) player[key][key2] = player[key][key2].times(2)
            })
        }
    })
}

dev.spin3d = function() {
    if (document.getElementById("body").style.animation === "") document.getElementById("body").style.animation = "spin3d 2s infinite"
    else document.getElementById("body").style.animation = ""
}

dev.cancerize = function() {
    player.options.theme = "S4";
    player.options.secretThemeKey = "Cancer";
    setTheme(player.options.theme);
    player.options.notation = "Emojis"
    document.getElementById("theme").textContent = "SO"
    document.getElementById("notation").textContent = "BEAUTIFUL"
}