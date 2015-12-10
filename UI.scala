package o1.clicker

import java.util.Timer
import java.awt.Font
import java.util.TimerTask
import scala.swing._
import scala.swing.event.ButtonClicked
import javax.swing.UIManager
import scala.math._
import scala.math.BigInt
import java.math.BigInteger
import java.awt.Color
import javax.swing.border.Border._
/**
 * @author Ivar
 */
object UI extends SimpleSwingApplication {
  UIManager.setLookAndFeel(UIManager.getSystemLookAndFeelClassName)
  var points = 10.0
  var tickBoostCost = 10000.0
  var boosterAmount = 0.0
  var secondBoosterAmount = 0.0
  var thirdBoosterAmount = 0.0
  var fourthBoosterAmount = 0.0
  var fifthBoosterAmount = 0.0
  var sixthBoosterAmount = 0.0
  var seventhBoosterAmount = 0.0
  var eightBoosterAmount = 0.0
  var ppsBoostCost = 10.0
  var secondBoostCost = 1000.0
  var thirdBoostCost = 20000.0
  var fourthBoostCost = 400000.0
  var fifthBoostCost = 10000000.0
  var sixthBoostCost = 200000000.0
  var seventhBoostCost = 4000000000.0
  var eightBoostCost = 2e11
  var tickspeed = 10.0
  var resetCount = 0
  var notification = "Scales"
  def multiplier = pow(2, resetCount).toInt
  
  def ticks = floor(tickspeed * 10) / 10
  
  def round(x: Int) = rint( x * 100) / 100
  def round(x: Long) = rint( x * 100) / 100
  def round(x: Double) = rint( x * 100) / 100
  val K = 1000.0
  val M = K*1000
  val B = M*1000
  val T = B*1000
  val Qd = T*1000
  val Qt = Qd*1000
  val Sx = Qt*1000
  val Sp = Sx*1000
  
  
  
  
  def number(x: Int): String = {
    if (x >= K && x < M) x/1000.0 + "K"
    else if (x >= M && x < B) round(x/1000000.0) + "M"
    else if (x >= B) round(x/1000000000.0) + "B"
    else x.toString()
  }
  def number(x: Long): String = {
    if (x >= K && x < M) round(x/1000.0) + "K"
    else if (x >= M && x < B) round(x/1000000.0) + "M"
    else if (x >= B && x < T) round(x/1000000000.0) + "B"
    else if (x >= T && x < Qd) round(1.0 * x/1000000000000L) + "T"
    else if (x >= Qd) round(1.0 * x/1000000000000000L) + "Q"
    else x.toString()
  }
  def number(x: Double): String = {
    if (x >= K && x < M) round(x/1000.00) + "K"
    else if (x >= M && x < B) round(x/1000000.00) + "M"
    else if (x >= B && x < T) (round(x/1000000000.00)) + "B"
    else if (x >= T && x < Qd)(round(1.00 * x/1e12)) + "T"
    else if (x >= Qd && x < Qt) (round(1.00 * x/1e15)) + "Qd"
    else if (x >= Qt && x < Sx) (round(1.00 * x/1e18)) + "Qt"
    else if (x >= Sx && x < Sp) (round(1.00 * x/1e21)) + "Sx"
    else if (x >= Sp) (math rint (1.00 * x/1e24)) + "Sp"
    else math.floor(x).toLong.toString()
  }
  
  
  val pointLabel = new Label(new point(points, notification).toString())
  pointLabel.font = new Font("Fixedsys", Font.BOLD, 30)
  
  val gemaName = new Label("Build the Universe") {
    font = new Font("Century Gothic", Font.PLAIN, 60)
    foreground = new Color(0, 102, 51)
    
  }
  
  val ppsLabel = new Label(new point(boosterAmount*(10/tickspeed), notification).toString() + " per second") {
    font = new Font ("Fixedsys", Font.PLAIN, 20)
  }
  val tickBoostLabel = new Label("Makes ticks 10% faster")
  val tickSpeedLabel = new Label("Tickspeed: " + rint(tickspeed*100 *100.00)/100.00)
  
  val boosterLabel = new Label("You own " + number(boosterAmount))
  val secondBoosterLabel = new Label("You own " + number(secondBoosterAmount))
  val thirdBoosterLabel = new Label("You own " + number(thirdBoosterAmount))
  val fourthBoosterLabel = new Label("You own " + number(fourthBoosterAmount))
  val fifthBoosterLabel = new Label("You own " + number(fifthBoosterAmount))
  val sixthBoosterLabel = new Label("You own " + number(sixthBoosterAmount))
  val seventhBoosterLabel = new Label("You own " + number(seventhBoosterAmount))
  val eightBoosterLabel = new Label("You own " + number(eightBoosterAmount))
  val resetLabel = new Label("")
  
  val firstLabel = new Label(s"Gives you ${multiplier} atom per tick")
  val secondLabel = new Label(s"Gives you 1 Particle accelerator per ${round(this.ticks)} seconds")
  val thirdLabel = new Label(s"Gives you 1 Scientist per ${round(this.ticks)} seconds")
  val fourthLabel = new Label(s"Gives you 1 Research centre per ${round(this.ticks)} seconds")
  val fifthLabel = new Label(s"Gives you 1 Funds per ${round(this.ticks)} seconds")
  val sixthLabel = new Label(s"Gives you 1 Leader per ${round(this.ticks)} seconds")
  val seventhLabel = new Label(s"Gives you 1 Greed per ${round(this.ticks)} seconds")
  val eightLabel = new Label(s"Gives you 1 Civilization per ${round(this.ticks)} seconds")
  
  
  val buyTickBoost = new Button("Cost:" + new point(tickBoostCost, notification).toString())
  val buyPPSBoost = new Button("Cost: " + new point(ppsBoostCost, notification).toString())
  val buySecondBooster = new Button("Cost: " + new point(secondBoostCost, notification).toString())
  val buyThirdBooster = new Button("Cost: " + new point(thirdBoostCost, notification).toString())
  val buyFourthBooster = new Button("Cost: " + new point(fourthBoostCost, notification).toString())
  val buyFifthBooster = new Button("Cost: " + new point(fifthBoostCost, notification).toString())
  val buySixthBooster = new Button("Cost: " + new point(sixthBoostCost, notification).toString())
  val buySeventhBooster = new Button("Cost: " + new point(seventhBoostCost, notification).toString())
  val buyEightBooster = new Button("Cost: " + new point(eightBoostCost, notification).toString())
  val unlock1Button = new Button("Unlocks Civilizations and resets your game. Costs 1 countries.")
  val unlock2Button = new Button("Unlocks God and resets your game. Costs 1 Canis Major Galaxies")
  
  this.updateView()
  
  
  
  this.listenTo(buyTickBoost)
  this.listenTo(buyPPSBoost)
  this.listenTo(buySecondBooster)
  this.listenTo(buyThirdBooster)
  this.listenTo(buyFourthBooster)
  this.listenTo(buyFifthBooster)
  this.listenTo(buySixthBooster)
  this.listenTo(buySeventhBooster)
  this.listenTo(buyEightBooster)
  this.listenTo(unlock1Button)
  this.listenTo(unlock2Button)
  this.reactions += {
    case ButtonClicked(x) =>
      if (x == buyPPSBoost && points >= ppsBoostCost) {
        points -= ppsBoostCost
        ppsBoostCost = (ppsBoostCost * 1.1).toDouble
        boosterAmount += 1
        buyPPSBoost.text = "Cost: " + new point(ppsBoostCost, notification).toString()
        boosterLabel.text = "You own " + number(boosterAmount)
      }
      if (x == buySecondBooster && points >= secondBoostCost) {
        points -= secondBoostCost
        secondBoostCost = (secondBoostCost * 1.15).toDouble
        secondBoosterAmount += 1
        buySecondBooster.text = "Cost: " + new point(secondBoostCost, notification).toString()
        secondBoosterLabel.text = "You own " + number(secondBoosterAmount)
        progressBar.visible = true
      }
      if (x == buyThirdBooster && points >= thirdBoostCost) {
        points -= thirdBoostCost
        thirdBoostCost = (thirdBoostCost * 1.2).toDouble
        thirdBoosterAmount += 1
        buyThirdBooster.text = "Cost: " + new point(thirdBoostCost, notification).toString()
        thirdBoosterLabel.text = "You own " + number(thirdBoosterAmount)
      }
      if (x == buyFourthBooster && points >= fourthBoostCost) {
        points -= fourthBoostCost
        fourthBoostCost = (fourthBoostCost * 1.25).toDouble
        fourthBoosterAmount += 1
        buyFourthBooster.text = "Cost: " + new point(fourthBoostCost, notification).toString()
        fourthBoosterLabel.text = "You own " + number(fourthBoosterAmount)
      }
     if (x == buyFifthBooster && points >= fifthBoostCost) {
        points -= fifthBoostCost
        fifthBoostCost = (fifthBoostCost * 1.3).toDouble
        fifthBoosterAmount += 1
        buyFifthBooster.text = "Cost: " + new point(fifthBoostCost, notification).toString()
        fifthBoosterLabel.text = "You own " + number(fifthBoosterAmount)
      }
      if (x == buySixthBooster && points >= sixthBoostCost) {
        points -= sixthBoostCost
        sixthBoostCost = (sixthBoostCost * 1.35).toDouble
        sixthBoosterAmount += 1
        buySixthBooster.text = "Cost: " + new point(sixthBoostCost, notification).toString()
        sixthBoosterLabel.text = "You own " + number(sixthBoosterAmount)
      }
      if (x == buySeventhBooster && points >= seventhBoostCost) {
        points -= seventhBoostCost
        seventhBoostCost = (seventhBoostCost * 1.4).toDouble
        seventhBoosterAmount += 1
        buySeventhBooster.text = "Cost: " + new point(seventhBoostCost, notification).toString()
        seventhBoosterLabel.text = "You own " + number(seventhBoosterAmount)
      }
      if (x == buyEightBooster && points >= eightBoostCost) {
        points -= eightBoostCost
        eightBoostCost = (eightBoostCost * 1.35).toDouble
        eightBoosterAmount += 1
        buyEightBooster.text = "Cost: " + new point(eightBoostCost, notification).toString()
        eightBoosterLabel.text = "You own " + number(eightBoosterAmount)
      }
      if (x == unlock1Button && points >= 1e18) {
        this.resetGame
        names.rows = 9
        buttons.rows = 9
        labels.rows = 9
        owned.rows = 9
        names.contents += new Label("Civilization:")
        buttons.contents += buySeventhBooster
        labels.contents += seventhLabel
        owned.contents += seventhBoosterLabel
        everything.contents -= unlock1Panel
        everything.contents += unlock2Panel
        main.contents = everything
        resetCount += 1
        firstLabel.text = s"Gives you ${multiplier} atom per tick"
        progressBar.max = (tickspeed*10).toInt
        progressBar.visible = false
        tickSpeedLabel.text = "Tickspeed: " + rint(tickspeed*100 *100.00)/100.00
      }
      if (x == unlock2Button && points >= 1e33) {
        this.resetGame
        names.rows = 10
        buttons.rows = 10
        labels.rows = 10
        owned.rows = 10
        names.contents += new Label("God:")
        buttons.contents += buyEightBooster
        labels.contents += eightLabel
        owned.contents += eightBoosterLabel
        everything.contents -= unlock2Panel
        resetCount += 1
        firstLabel.text = s"Gives you ${multiplier} atom per tick"
        main.contents = everything
        progressBar.max = (tickspeed*10).toInt
        progressBar.visible = false
        tickSpeedLabel.text = "Tickspeed: " + rint(tickspeed*100 *100.00)/100.00
      }
      if (x == buyTickBoost && points >= tickBoostCost) {
        tickspeed = tickspeed * 0.9
        points -= tickBoostCost
        tickBoostCost = tickBoostCost * 5
        tickSpeedLabel.text = "Tickspeed: " + rint(tickspeed*100 *100.00)/100.00
        buyTickBoost.text = "Cost: " + new point(tickBoostCost, notification).toString()
        progressBar.max = (tickspeed*10).toInt
        }
  
      
    this.updateView()
  }
  
  val names = new GridPanel (8, 1) {
    contents += new Label("Motivation:")
    contents += new Label("Particle Accelerator:")
    contents += new Label("Scientist:")
    contents += new Label("Research centre:")
    contents += new Label("Funds:")
    contents += new Label("Leader:")
    contents += new Label("Greed:")
  }
  val buttons = new GridPanel(8, 1) {
    contents += buyTickBoost
    contents += buyPPSBoost
    contents += buySecondBooster
    contents += buyThirdBooster
    contents += buyFourthBooster
    contents += buyFifthBooster
    contents += buySixthBooster
  }
  val labels = new GridPanel(8, 1) {
    contents += tickBoostLabel
    contents += firstLabel
    contents += secondLabel
    contents += thirdLabel
    contents += fourthLabel
    contents += fifthLabel
    contents += sixthLabel
  }
  val owned = new GridPanel(8, 1) {
    contents += tickSpeedLabel
    contents += boosterLabel
    contents += secondBoosterLabel
    contents += thirdBoosterLabel
    contents += fourthBoosterLabel
    contents += fifthBoosterLabel
    contents += sixthBoosterLabel
  }
  
    val thisName = new FlowPanel {
      contents += gemaName
    }
    
    val pointPanel = new FlowPanel {
      contents += pointLabel
    }
    
    val ppsPanel = new FlowPanel {
      contents += ppsLabel
    }
    val progressBar = new ProgressBar {
      this.min = 0
      this.max = (tickspeed*10).toInt
      this.visible = false
    }
    
    val unlock1Panel = new FlowPanel {
      contents += unlock1Button
    }
    val unlock2Panel = new FlowPanel {
      contents += unlock2Button
    }
    
  
  val layout = new BoxPanel(Orientation.Horizontal) {
    contents += names
    contents += labels
    contents += buttons
    contents += owned
    
  }
  val everything = new BoxPanel(Orientation.Vertical) {
    contents += thisName
    contents += pointPanel
    contents += ppsPanel
    contents += layout
    contents += progressBar
    contents += unlock1Panel
  }
  

  val main = new MainFrame {
    minimumSize = new Dimension(700, 500)
    title = "Gema"
    contents = everything
    this.menuBar = new MenuBar {
      contents += new Menu("Notification") {
        contents += new MenuItem(Action("Scientific") {
          notification = "Scientific"
          buyPPSBoost.text = "Cost: " + new point(ppsBoostCost, notification).toString()
          buySecondBooster.text = "Cost: " + new point(secondBoostCost, notification).toString()
          buyThirdBooster.text = "Cost: " + new point(thirdBoostCost, notification).toString()
          buyFourthBooster.text = "Cost: " + new point(fourthBoostCost, notification).toString()
          buyFifthBooster.text = "Cost: " + new point(fifthBoostCost, notification).toString()
          buySixthBooster.text = "Cost: " + new point(sixthBoostCost, notification).toString()
          buySeventhBooster.text = "Cost: " + new point(seventhBoostCost, notification).toString()
          buyEightBooster.text = "Cost: " + new point(eightBoostCost, notification).toString()
          })
        contents += new MenuItem(Action("Default") {
          notification = "Scales"
          buyPPSBoost.text = "Cost: " + new point(ppsBoostCost, notification).toString()
          buySecondBooster.text = "Cost: " + new point(secondBoostCost, notification).toString()
          buyThirdBooster.text = "Cost: " + new point(thirdBoostCost, notification).toString()
          buyFourthBooster.text = "Cost: " + new point(fourthBoostCost, notification).toString()
          buyFifthBooster.text = "Cost: " + new point(fifthBoostCost, notification).toString()
          buySixthBooster.text = "Cost: " + new point(sixthBoostCost, notification).toString()
          buySeventhBooster.text = "Cost: " + new point(seventhBoostCost, notification).toString()
          buyEightBooster.text = "Cost: " + new point(eightBoostCost, notification).toString()
          })
        contents += new MenuItem(Action("Long scale") {
          notification = "Longs"
          buyPPSBoost.text = "Cost: " + new point(ppsBoostCost, notification).toString()
          buySecondBooster.text = "Cost: " + new point(secondBoostCost, notification).toString()
          buyThirdBooster.text = "Cost: " + new point(thirdBoostCost, notification).toString()
          buyFourthBooster.text = "Cost: " + new point(fourthBoostCost, notification).toString()
          buyFifthBooster.text = "Cost: " + new point(fifthBoostCost, notification).toString()
          buySixthBooster.text = "Cost: " + new point(sixthBoostCost, notification).toString()
          buySeventhBooster.text = "Cost: " + new point(seventhBoostCost, notification).toString()
          buyEightBooster.text = "Cost: " + new point(eightBoostCost, notification).toString()
          })
        contents += new MenuItem(Action("Short scale") {
          notification = "Shorts"
          buyPPSBoost.text = "Cost: " + new point(ppsBoostCost, notification).toString()
          buySecondBooster.text = "Cost: " + new point(secondBoostCost, notification).toString()
          buyThirdBooster.text = "Cost: " + new point(thirdBoostCost, notification).toString()
          buyFourthBooster.text = "Cost: " + new point(fourthBoostCost, notification).toString()
          buyFifthBooster.text = "Cost: " + new point(fifthBoostCost, notification).toString()
          buySixthBooster.text = "Cost: " + new point(sixthBoostCost, notification).toString()
          buySeventhBooster.text = "Cost: " + new point(seventhBoostCost, notification).toString()
          buyEightBooster.text = "Cost: " + new point(eightBoostCost, notification).toString()
          })
      }
      contents += new Menu("Developer tools") {
        contents += new MenuItem(Action("Give a Galaxy") {points += 1E33})
        
      }
    }
    
  }
  
  def updateView() = {
    this.pointLabel.text = new point(points, notification).toString()
    this.ppsLabel.text = new point(boosterAmount*(10/tickspeed)*multiplier, notification).toString() + " per second"
    boosterLabel.text = "You own " + number(boosterAmount)
    secondLabel.text = (s"Gives you 1 Particle accelerator per ${this.ticks} seconds")
    thirdLabel.text = (s"Gives you 1 Scientist per ${this.ticks} seconds")
    fourthLabel.text = (s"Gives you 1 Research centre per ${this.ticks} seconds")
    fifthLabel.text = (s"Gives you 1 Funds per ${this.ticks} seconds")
    sixthLabel.text = (s"Gives you 1 Leader per ${this.ticks} seconds")
    seventhLabel.text = (s"Gives you 1 Greed per ${this.ticks} seconds")
    eightLabel.text = (s"Gives you 1 Civilization per ${this.ticks} seconds")
    secondBoosterLabel.text = "You own " + number(secondBoosterAmount)
    thirdBoosterLabel.text = "You own " + number(thirdBoosterAmount)
    fourthBoosterLabel.text = "You own " + number(fourthBoosterAmount)
    fifthBoosterLabel.text = "You own " + number(fifthBoosterAmount)
    sixthBoosterLabel.text = "You own " + number(sixthBoosterAmount)
    seventhBoosterLabel.text = "You own " + number(seventhBoosterAmount)
    eightBoosterLabel.text = "You own " + number(eightBoosterAmount)
    
    if (ppsBoostCost > points && buyPPSBoost.enabled) {
      buyPPSBoost.enabled = false
    }
    if (ppsBoostCost <= points && !buyPPSBoost.enabled) {
      buyPPSBoost.enabled = true
    }
    
    if (secondBoostCost > points && buySecondBooster.enabled) {
      buySecondBooster.enabled = false
    }
    if (secondBoostCost <= points && !buySecondBooster.enabled) {
      buySecondBooster.enabled = true
    }
    
    if (thirdBoostCost > points && buyThirdBooster.enabled) {
      buyThirdBooster.enabled = false
    }
    if (thirdBoostCost <= points && !buyThirdBooster.enabled) {
      buyThirdBooster.enabled = true
    }
    
    if (fourthBoostCost > points && buyFourthBooster.enabled) {
      buyFourthBooster.enabled = false
    }
    if (fourthBoostCost <= points && !buyFourthBooster.enabled) {
      buyFourthBooster.enabled = true
    }
    
    if (fifthBoostCost > points && buyFifthBooster.enabled) {
      buyFifthBooster.enabled = false
    }
    if (fifthBoostCost <= points && !buyFifthBooster.enabled) {
      buyFifthBooster.enabled = true
    }
    
    if (sixthBoostCost > points && buySixthBooster.enabled) {
      buySixthBooster.enabled = false
    }
    if (sixthBoostCost <= points && !buySixthBooster.enabled) {
      buySixthBooster.enabled = true
    }
    
    if (seventhBoostCost > points && buySeventhBooster.enabled) {
      buySeventhBooster.enabled = false
    }
    if (seventhBoostCost <= points && !buySeventhBooster.enabled) {
      buySeventhBooster.enabled = true
    }
    
    if (eightBoostCost > points && buyEightBooster.enabled) {
      buyEightBooster.enabled = false
    }
    if (eightBoostCost <= points && !buyEightBooster.enabled) {
      buyEightBooster.enabled = true
    }
    
    if (tickBoostCost > points && buyTickBoost.enabled) {
      buyTickBoost.enabled = false
    }
    if (tickBoostCost <= points && !buyTickBoost.enabled) {
      buyTickBoost.enabled = true
    }
    
    if (1e18 > points && unlock1Button.enabled) {
      unlock1Button.enabled = false
    }
    if (1e18 <= points && !unlock1Button.enabled) {
      unlock1Button.enabled = true
    }
    
    if (1e33 > points && unlock2Button.enabled) {
      unlock2Button.enabled = false
    }
    if (1e33 <= points && !unlock2Button.enabled) {
      unlock2Button.enabled = true
    }
  }
  
  def resetGame {
    points = 10.0
    tickBoostCost = 10000.0
    boosterAmount = 0.0
    secondBoosterAmount = 0.0
    thirdBoosterAmount = 0.0
    fourthBoosterAmount = 0.0
    fifthBoosterAmount = 0.0
    sixthBoosterAmount = 0.0
    seventhBoosterAmount = 0.0
    eightBoosterAmount = 0.0
    ppsBoostCost = 10.0
    secondBoostCost = 1000.0
    thirdBoostCost = 20000.0
    fourthBoostCost = 400000.0
    fifthBoostCost = 10000000.0
    sixthBoostCost = 200000000.0
    seventhBoostCost = 4000000000.0
    eightBoostCost = 2e11
    tickspeed = 10.0
  }
  
  
  
  var laskin = 0
  val refresh = new Timer
  val refreshTask = new TimerTask {
    def run() = {
      updateView()
      points += (boosterAmount / tickspeed) * multiplier
      if (laskin > tickspeed*10) {
        boosterAmount += secondBoosterAmount
        secondBoosterAmount += thirdBoosterAmount
        thirdBoosterAmount += fourthBoosterAmount
        fourthBoosterAmount += fifthBoosterAmount
        fifthBoosterAmount += sixthBoosterAmount
        sixthBoosterAmount += seventhBoosterAmount
        seventhBoosterAmount += eightBoosterAmount
        laskin = -1
      }
      laskin += 1
      progressBar.value = laskin
    }
  }
  refresh.schedule(refreshTask, 100L, 100L)

  def top = main
}
