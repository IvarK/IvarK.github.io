package o1.clicker
import scala.math._
/**
 * @author Ivar
 */
class point(amount: Double, notification: String) {
  override def toString = {
    if (notification == "Scales") {
    if (amount > 1e57) rint(amount/1e57* 1000) / 1000 + " Infinities"
    else if (amount > 1e54) rint(amount/1e54* 1000) / 1000 + " Impossibilities"
    else if (amount > 1e51) rint(amount/1e51* 1000) / 1000 + " Imaginations"
    else if (amount > 1e48) rint(amount/1e48* 1000) / 1000 + " Fantasies"
    else if (amount > 1e45) rint(amount/1e45* 1000) / 1000 + " Realitys"
    else if (amount > 1e42) rint(amount/1e42* 1000) / 1000 + " Universes"
    else if (amount > 1e39) rint(amount/1e39* 1000) / 1000 + " Supercluster Complexes"
    else if (amount > 1E33) (math rint amount/1E33* 1000) / 1000 + " Canis Major Galaxies"
    else if (amount > 1E30) (math rint amount/1E30* 1000) / 1000 + " Ring Nebulas"
    else if (amount > 1E27) (math rint amount/1E27* 1000) / 1000 + " Kuiper Belts"
    else if (amount > 1E24) (math rint amount/1E24* 1000) / 1000 + " Suns"
    else if (amount > 1E21) (math rint amount/1E21* 1000) / 1000 + " Planets"
    else if (amount > 1E18) (math rint amount/1E18* 1000) / 1000 + " Countries"
    else if (amount > 1E15) (math rint amount/1E15* 1000) / 1000 + " Forests"
    else if (amount > 1E12) (math rint amount/1E12* 1000) / 1000 + " Trees"
    else if (amount > 1E9) (math rint amount/1E9* 1000) / 1000 + " Plants"
    else if (amount > 1E6) (math rint amount/1E6* 1000) / 1000 + " Amoebas"
    else if (amount > 1E3) (math rint amount/1E3* 1000) / 1000 + " Viruses"
    else (math rint amount * 10) / 10 + " Atoms"
    } else if (notification == "Scientific") {
      if (amount > 1e57) rint(amount/1e57* 1000) / 1000 + " *10e57 Atoms"
    else if (amount > 1e54) rint(amount/1e54* 1000) / 1000 + " *10e54 Atoms"
    else if (amount > 1e51) rint(amount/1e51* 1000) / 1000 + " *10e51 Atoms"
    else if (amount > 1e48) rint(amount/1e48* 1000) / 1000 + " *10e48 Atoms"
    else if (amount > 1e45) rint(amount/1e45* 1000) / 1000 + " *10e45 Atoms"
    else if (amount > 1e42) rint(amount/1e42* 1000) / 1000 + " *10e42 Atoms"
    else if (amount > 1e39) rint(amount/1e39* 1000) / 1000 + " *10e39 Atoms"
    else if (amount > 1e36) rint(amount/1e36* 1000) / 1000 + " *10e36 Atoms"
    else if (amount > 1E33) (math rint amount/1E33* 1000) / 1000 + " *10e33 Atoms"
    else if (amount > 1E30) (math rint amount/1E30* 1000) / 1000 + " *10e30 Atoms"
    else if (amount > 1E27) (math rint amount/1E27* 1000) / 1000 + " *10e27 Atoms"
    else if (amount > 1E24) (math rint amount/1E24* 1000) / 1000 + " *10e24 Atoms"
    else if (amount > 1E21) (math rint amount/1E21* 1000) / 1000 + " *10e21 Atoms"
    else if (amount > 1E18) (math rint amount/1E18* 1000) / 1000 + " *10e18 Atoms"
    else if (amount > 1E15) (math rint amount/1E15* 1000) / 1000 + " *10e15 Atoms"
    else if (amount > 1E12) (math rint amount/1E12* 1000) / 1000 + " *10e12 Atoms"
    else if (amount > 1E9) (math rint amount/1E9* 1000) / 1000 + " *10e9 Atoms"
    else if (amount > 1E6) (math rint amount/1E6* 1000) / 1000 + " *10e6 Atoms"
    else if (amount > 1E3) (math rint amount/1E3* 1000) / 1000 + " *10e3 Atoms"
    else (math rint amount * 10) / 10 + " Atoms"
    } else if (notification == "Longs") {
      if (amount > 1e57) rint(amount/1e57* 1000) / 1000 + " octodecillion Atoms"
    else if (amount > 1e54) rint(amount/1e54* 1000) / 1000 + " septendecillion Atoms"
    else if (amount > 1e51) rint(amount/1e51* 1000) / 1000 + " sexdecillion Atoms"
    else if (amount > 1e48) rint(amount/1e48* 1000) / 1000 + " quinquadecillion Atoms"
    else if (amount > 1e45) rint(amount/1e45* 1000) / 1000 + " quattordecillion Atoms"
    else if (amount > 1e42) rint(amount/1e42* 1000) / 1000 + " tredecillion Atoms"
    else if (amount > 1e39) rint(amount/1e39* 1000) / 1000 + " duodecillion Atoms"
    else if (amount > 1e36) rint(amount/1e36* 1000) / 1000 + " undecillion Atoms"
    else if (amount > 1E33) (math rint amount/1E33* 1000) / 1000 + " decillion Atoms"
    else if (amount > 1E30) (math rint amount/1E30* 1000) / 1000 + " nonillion Atoms"
    else if (amount > 1E27) (math rint amount/1E27* 1000) / 1000 + " octillion Atoms"
    else if (amount > 1E24) (math rint amount/1E24* 1000) / 1000 + " septillion Atoms"
    else if (amount > 1E21) (math rint amount/1E21* 1000) / 1000 + " sextillion Atoms"
    else if (amount > 1E18) (math rint amount/1E18* 1000) / 1000 + " quintillion Atoms"
    else if (amount > 1E15) (math rint amount/1E15* 1000) / 1000 + " quadrillion Atoms"
    else if (amount > 1E12) (math rint amount/1E12* 1000) / 1000 + " trillion Atoms"
    else if (amount > 1E9) (math rint amount/1E9* 1000) / 1000 + " billion Atoms"
    else if (amount > 1E6) (math rint amount/1E6* 1000) / 1000 + " million Atoms"
    else if (amount > 1E3) (math rint amount/1E3* 1000) / 1000 + " thousand Atoms"
    else (math rint amount * 10) / 10 + " Atoms"
    } else {
      if (amount > 1e57) rint(amount/1e57* 1000) / 1000 + "OcD Atoms"
    else if (amount > 1e54) rint(amount/1e54* 1000) / 1000 + "SpD Atoms"
    else if (amount > 1e51) rint(amount/1e51* 1000) / 1000 + "SxD Atoms"
    else if (amount > 1e48) rint(amount/1e48* 1000) / 1000 + "QtD Atoms"
    else if (amount > 1e45) rint(amount/1e45* 1000) / 1000 + "QdD Atoms"
    else if (amount > 1e42) rint(amount/1e42* 1000) / 1000 + "Td Atoms"
    else if (amount > 1e39) rint(amount/1e39* 1000) / 1000 + "Dd Atoms"
    else if (amount > 1e36) rint(amount/1e36* 1000) / 1000 + "Ud Atoms"
    else if (amount > 1E33) (math rint amount/1E33* 1000) / 1000 + "Dc Atoms"
    else if (amount > 1E30) (math rint amount/1E30* 1000) / 1000 + "Nn Atoms"
    else if (amount > 1E27) (math rint amount/1E27* 1000) / 1000 + "Oc Atoms"
    else if (amount > 1E24) (math rint amount/1E24* 1000) / 1000 + "Sp Atoms"
    else if (amount > 1E21) (math rint amount/1E21* 1000) / 1000 + "Sx Atoms"
    else if (amount > 1E18) (math rint amount/1E18* 1000) / 1000 + "Qt Atoms"
    else if (amount > 1E15) (math rint amount/1E15* 1000) / 1000 + "Qd Atoms"
    else if (amount > 1E12) (math rint amount/1E12* 1000) / 1000 + "T Atoms"
    else if (amount > 1E9) (math rint amount/1E9* 1000) / 1000 + "B Atoms"
    else if (amount > 1E6) (math rint amount/1E6* 1000) / 1000 + "M Atoms"
    else if (amount > 1E3) (math rint amount/1E3* 1000) / 1000 + "K Atoms"
    else (math rint amount * 10) / 10 + " Atoms"
    }
  }
}

/*
Atoms are the smallest scale
1000 atoms is a virus                 K   E3
1000 viruses is a amoeba              M   E6
1000 amoeba is a plant                B   E9
1000 plant is small ecosystem         T   E12
1000 small ecosystems is a forest     Qd  E15
1000 forests is a country             Qn  E18
1000 countries is a planet            Sx  E21
1000 planets is a solar system        Sp  E24
1000 solar systems is a galaxy        Oc  E27
1000 galaxies is a galaxy cluster     Nn  E30
1000 galaxy clusters is an universe   Dc  E33

* 
*/
