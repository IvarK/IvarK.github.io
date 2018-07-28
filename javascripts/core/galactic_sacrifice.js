function getGSAmount() {
    return Decimal.min(new Decimal(player.galaxies + player.replicanti.galaxies + player.dilation.freeGalaxies),player.eightAmount.div(50).floor())
}

function galacticSacrifice() {
    player.infinityPoints = player.infinityPoints.add(getGSAmount())
    player.galaxies = -1
    galaxyReset()
}
