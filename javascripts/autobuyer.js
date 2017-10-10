/*class Autobuyer {
  constructor(target) {
    this.target = target;
    this.cost = 1
    this.interval = 5000;
    this.priority = 1;
    this.ticks = 0;
    this.isOn = false;
    this.tier = 1;
    this.bulk = 1;
  }

}*/


var Autobuyer = function Autobuyer(target,interval) {
    this.target = target
    this.cost = new Decimal(1)
    this.interval = interval*1000
    this.priority = 1;
    this.ticks = 0;
    this.isOn = false;
    if (target < 9) this.tier = target;
    else this.tier = 1; //i dont know what tier is used for but just in case, you know
    this.bulk = 1;
}
