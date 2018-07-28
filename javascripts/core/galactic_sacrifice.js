function getGSAmount() {
    return Math.min(player.galaxies + player.replicanti.galaxies + player.dilation.freeGalaxies,player.eightAmount.div(50).floor())
}
