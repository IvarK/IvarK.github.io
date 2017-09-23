function changestate(n) {
    var classes = document.getElementById('div'+n).classList
    if(classes.contains('hidden')){
		classes.remove('hidden');
	    classes.add('shown');
	}
    else{
		classes.remove('shown');
		classes.add('hidden');
	}
}
